import { parseHTML } from "linkedom";
import { normalizeText } from "../../utils/normalizeText";
import { Novel, NovelMetaData, NovelPageResult, SourceDefinition } from "../types";

type iconResponse = {
    hasIcon: boolean;
    url: string;
    format: string;
};

const placeholderImage = 'https://a.a/a.png'

export class NovelBin implements SourceDefinition {
    // Inbuilt Source Properties
    private name = "NovelBin";
    private baseUrl = "https://www.novelbin.me/";
    private mainCategory = "Fantasy";
    private language = "English";
    private isRaw = false;

    // Runtime Variables
    private novel: Novel = {
        id: '',
        title: '',
        link: '',
        image: '',
        genres: [],
    };

    private novelPage: Document | null = null;

    constructor() { }

    getId() {
        return normalizeText(this.name)
    }

    getMetadata() {
        return {
            name: this.name,
            baseUrl: this.baseUrl,
            mainCategory: this.mainCategory,
            language: this.language,
            isRaw: this.isRaw,
        };
    }

    async getIcon() {
        try {
            const response = await fetch(`https://favicone.com/${this.baseUrl}?s32`, { cache: 'force-cache' });
            if (!response.ok) return placeholderImage
            const data = await response.text();
            const parsedData = JSON.parse(data) as iconResponse;
            return parsedData.hasIcon ? parsedData.url : placeholderImage;
        } catch {
            return placeholderImage;
        }
    }
    async getGenres() {
        try {
            const response = await fetch(`${this.baseUrl}/novel-list`);
            const html = await response.text();

            const { document } = parseHTML(html);
            const genres: string[] = [];

            // Select all <a> tags inside .list-genre > .row > .col-xs-6
            const links = document.querySelectorAll(".list-genre .row .col-xs-6 a");

            links.forEach((el) => {
                const text = el.textContent?.trim();
                if (text) genres.push(text);
            });

            return genres;
        } catch (error) {
            console.error("Error fetching genres:", error);
            return [];
        }
    }

    async getNovelPage(link: string) {
        const response = await fetch(link || this.novel.link, {
            cache: 'force-cache'
        })

        if (!response.ok) {
            console.error("Failed to fetch novel image!");
        }

        const html = await response.text();
        const { document } = parseHTML(html);

        return document
    }

    async getNovelImage(link?: string) {
        try {
            if (!this.novelPage) {
                this.novelPage = await this.getNovelPage(link || this.novel.link);
            }

            const metaImage = this.novelPage.querySelector('meta[itemprop="image"]')?.getAttribute('content');
            if (metaImage) {
                return metaImage;
            }

            const bookImage = this.novelPage.querySelector('div.book img.lazy')?.getAttribute('src');
            if (bookImage) {
                return bookImage;
            }

            const anyImage = this.novelPage.querySelector('img.lazy[alt*="novel"]')?.getAttribute('src');
            if (anyImage) {
                return anyImage;
            }

            return placeholderImage;
        } catch (error) {
            console.error("Error fetching novel image:", error);
            return placeholderImage;
        }
    }

    async getNovelMetaData(link?: string): Promise<NovelMetaData> {
        try {
            // Get the novel page document
            if (!this.novelPage) {
                this.novelPage = await this.getNovelPage(link || this.novel.link);
            }

            // Extract metadata from the page
            const name = this.novelPage.querySelector('h3.title[itemprop="name"]')?.textContent?.trim() || '';
            const cover = await this.getNovelImage()

            // Get genres
            const genreLinks = this.novelPage.querySelectorAll('.info-meta li:nth-child(2) a');
            const genres: string[] = [];
            genreLinks.forEach(el => {
                const text = el.textContent?.trim();
                if (text) genres.push(text);
            });

            // Get status
            const statusEl = this.novelPage.querySelector('.info-meta li:nth-child(3) a')?.textContent?.trim() || 'Unknown';

            // Get author
            const author = this.novelPage.querySelector('.info li:nth-child(1) a')?.textContent?.trim() || 'Unknown';

            // Get language
            const language = this.novelPage.querySelector('meta[itemprop="inLanguage"]')?.getAttribute('content') || 'English';

            // Get rating
            const ratingValue = parseFloat(this.novelPage.querySelector('span[itemprop="ratingValue"]')?.textContent?.trim() || '0');
            const ratingMax = parseFloat(this.novelPage.querySelector('span[itemprop="bestRating"]')?.textContent?.trim() || '10');

            // Get chapter count 
            const chapterText = this.novelPage.querySelector('a.chapter-title')?.textContent?.trim() || '';
            const chapterMatch = chapterText.match(/Chapter\s+(\d+)/i);
            const chapters = chapterMatch ? chapterMatch[1] : 'Unknown';

            // Get description
            const desc = this.novelPage.querySelector('div.desc-text')?.textContent?.trim() || 'No description available';

            return {
                name,
                cover,
                source: {
                    name: this.name,
                    icon: await this.getIcon()
                },
                desc,
                genres,
                chapters,
                rating: {
                    val: ratingValue || 0,
                    outOf: ratingMax || 10,
                },
                status: statusEl,
                language,
                author,
            };
        } catch (error) {
            console.error("Error fetching novel metadata:", error);
            return {
                name: "Unknown",
                cover: placeholderImage,
                source: {
                    name: this.name,
                    icon: await this.getIcon()
                },
                desc: "Error fetching novel details",
                genres: [],
                chapters: "Unknown",
                rating: {
                    val: 0,
                    outOf: 10,
                },
                status: "Unknown",
                language: "Unknown",
                author: "Unknown",
            };
        }
    }

    async getNovels(page: number = 1): Promise<NovelPageResult> {
        const response = await fetch(`${this.baseUrl}`, {
            cache: 'reload'
        });

        if (!response.ok) {
            throw ("Failed to fetch novel list");
        }
        const html = await response.text();

        const { document } = parseHTML(html);

        const divs = document.querySelectorAll('.list-new .row')

        const novelPromises = Array.from(divs).map(async (div) => {
            const title = div.querySelector('.col-title h3 a')?.textContent?.trim() ?? '';

            const link = div.querySelector('.col-title h3 a')?.getAttribute('href')
            if (!link) return null;

            this.novel.link = link;

            const image = await this.getNovelImage()

            const time = div.querySelector('.col-time')?.textContent

            const rawGenres = div.querySelector('.col-genre');
            let genres: string[] = []

            rawGenres?.querySelectorAll('a').forEach((tagElement) => {
                const tagText = tagElement.textContent?.trim();
                if (tagText) genres.push(tagText);
            });

            return {
                id: normalizeText(title),
                title,
                image,
                genres,
                link,
                time
            };
        });

        // Wait for all promises to resolve and filter out any null values
        const results = await Promise.all(novelPromises);

        return {
            novels: results.filter(novel => novel !== null),
            hasNextPage: false
        }
    }

    async getUpdatedNovels(page: number = 1): Promise<NovelPageResult> {
        // TODO: Implement the real updated novels fetch
        return this.getNovels(page);
    }
}
