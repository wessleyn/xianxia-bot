import parseRelativeTime from "@utils/parseRelativeTime";
import { parseHTML } from "linkedom";
import { normalizeText } from "../../utils/normalizeText";
import { ChapterContent, Novel, NovelMetaData, NovelPageResult, SourceDefinition } from "../types";

type iconResponse = {
    hasIcon: boolean;
    url: string;
    format: string;
};

const placeholderImage = 'https://a.a/a.png'

export class NovelBin implements SourceDefinition {
    // Inbuilt Source Properties
    public supportedHostnames = ["novelbin.me", "novelbin.com"];
    private name = "NovelBin";
    private baseUrl = "https://novelbin.me";
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

    async fetchPage(url: string, cache: RequestCache) {
        try {
            const response = await fetch(`${url}`, {
                cache
            });

            if (!response.ok) {
                throw ("Network access failed.");
            }
            const html = await response.text();

            const { document } = parseHTML(html);

            return document
        } catch (error) {
            console.error("Error fetching page:", error);
            throw error
        }
    }

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

    getNovelImage(link?: string) {
        // try {
        //     if (!this.novelPage) {
        //         this.novelPage = await this.fetchPage(link || this.novel.link, "force-cache");
        //     }

        //     const metaImage = this.novelPage.querySelector('meta[itemprop="image"]')?.getAttribute('content');
        //     if (metaImage) {
        //         return metaImage;
        //     }

        //     const bookImage = this.novelPage.querySelector('div.book img.lazy')?.getAttribute('src');
        //     if (bookImage) {
        //         return bookImage;
        //     }

        //     const anyImage = this.novelPage.querySelector('img.lazy[alt*="novel"]')?.getAttribute('src');
        //     if (anyImage) {
        //         return anyImage;
        //     }

        //     return placeholderImage;
        // } catch (error) {
        //     console.error("Error fetching novel image:", error);
        //     return placeholderImage;
        // }

        try {
            const u = new URL(link ?? this.novel.link);
            const novelId = u.pathname.split('/')[2];
            const imageUrl = `${this.baseUrl}/media/novel/${novelId}.jpg`;
            return imageUrl;
        } catch (error) {
            return placeholderImage;
        }
    }

    async getLatestCh(link?: string) {
        try {
            // Get the novel page document
            if (!this.novelPage) {
                this.novelPage = await this.fetchPage(link || this.novel.link, "force-cache");
            }

            const time = this.novelPage.querySelector('.item-time')?.textContent?.trim() || '';
            return parseRelativeTime(time);
        } catch (error) {
            console.error("Error fetching latest chapter:", error);
            throw error;
        }
    }

    async getNovelMetaData(link?: string): Promise<NovelMetaData> {
        try {
            // Get the novel page document
            if (!this.novelPage) {
                this.novelPage = await this.fetchPage(link || this.novel.link, "force-cache");
            }

            // Extract metadata from the page
            const name = this.novelPage.querySelector('h3.title[itemprop="name"]')?.textContent?.trim() || '';
            const cover = await this.getNovelImage(link ?? this.novel.link);

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

    async getNovelChapterContent(link: string): Promise<ChapterContent> {
        try {
            const document = await this.fetchPage(link, 'force-cache');

            const paragraphs = document.querySelectorAll('#chr-content p');
            const content = Array.from(paragraphs).map(p => p.textContent?.trim()) || 'No content available';
           
            const titleEl = document.querySelector('#chr-content h4') || document.querySelector('.chr-title');
            const title = titleEl?.textContent?.trim() || 'No title';

            const prevChapterElement = document.querySelector('#prev_chap');
            let prevChapter: string | null = null;
            if (prevChapterElement) {
                const isDisabled = prevChapterElement.hasAttribute('disabled');
                const href = prevChapterElement.getAttribute('href') || '';

                if (!isDisabled && href && !href.includes('/null')) {
                    prevChapter = href;
                }
            }

            const nextChapter = document.querySelector('#next_chap')?.getAttribute('href') || null;
            const nextChapterTitle = document.querySelector('#next_chap')?.getAttribute('title') || null;

            return { content, title, link, prevChapter, nextChapter, nextChapterTitle };
        } catch (error) {
            console.log(error);
            throw error;
        }
    }

    async getNovelChapters(link?: string): Promise<{ title: string; link: string; }[]> {
        try {
            const novelUrl = new URL(link || this.novel.link);
            const pathSegments = novelUrl.pathname.split('/');
            const novelId = pathSegments[pathSegments.length - 1];

            const apiUrl = `https://novelbin.me/ajax/chapter-archive?novelId=${novelId}`;

            const response = await fetch(apiUrl, {
                headers: {
                    'X-Requested-With': 'XMLHttpRequest',
                    'Referer': this.baseUrl
                },
                cache: 'force-cache'
            });

            if (!response.ok) {
                throw new Error(`API request failed with status: ${response.status}`);
            }

            const html = await response.text();
            const { document } = parseHTML(html);

            // Find all chapter links in the response
            const chapterElements = document.querySelectorAll('.list-chapter a');

            const chapters = Array.from(chapterElements).map(el => ({
                title: el.querySelector('.chapter-title')?.textContent?.trim().replace(/\s+/g, ' ') || 'No title',
                link: el.getAttribute('href') || ''
            }));

            return chapters;
        } catch (error) {
            console.error("Error fetching chapters:", error);
            throw error
        }
    }

    async getNovels(page: number = 1): Promise<NovelPageResult> {
        const document = await this.fetchPage(this.baseUrl, 'reload')

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

    async getRandomNovel(): Promise<string> {

        const randomPageNum = Math.floor(Math.random() * 5);

        const novels = await this.getCompletedNovels(
            randomPageNum == 0 ? 1 : randomPageNum,
            Math.floor(Math.random() * 28)
        );

        return novels.novels[0].link
    }

    async getUpdatedNovels(page: number = 1): Promise<NovelPageResult> {
        // TODO: Implement the real updated novels fetch
        return this.getNovels(page);
    }

    async getCompletedNovels(page: number = 1, rand?: number): Promise<NovelPageResult> {

        const url = this.baseUrl + `/sort/novelbin-complete?page=${page}`;

        const html = await this.fetchPage(url, 'force-cache');

        const novelsLinks = html.querySelectorAll('.list.list-novel .row h3 a');

        const novelsArray = Array.from(novelsLinks);
        if (rand !== undefined) {
            return {
                novels: [
                    {
                        link: novelsArray[rand].getAttribute("href")
                    } as Novel
                ]

            } as NovelPageResult
        }

        const novelPromises = novelsArray.map(async (linkElement, index) => {
            const link = linkElement.getAttribute('href')!;

            try {
                const metaData = await this.getNovelMetaData(link);

                return {
                    id: normalizeText(metaData.name),
                    title: metaData.name,
                    image: metaData.cover,
                    genres: metaData.genres,
                    chapters: metaData.chapters,
                    link,
                };
            } catch (error) {
                console.error(`[NovelBin] getCompletedNovels: Error processing novel at ${link}:`, error);
                return null;
            }
        });

        // TODO: pragmatically check this instead of hardcoding
        let currentPage = 1, maxPage = 136;

        const results = await Promise.all(novelPromises);
        const filteredResults = results.filter(novel => novel !== null);

        console.log(`[NovelBin] getCompletedNovels: Has next page: ${currentPage < maxPage}`);

        return {
            novels: filteredResults,
            hasNextPage: currentPage < maxPage
        };
    }



}
