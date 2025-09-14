import { parseHTML } from "linkedom";
import { normalizeText } from "../../utils/normalizeText";
import { Novel, SourceDefinition } from "../types";

type iconResponse = {
    hasIcon: boolean;
    url: string;
    format: string;
};

const placeholderImage = ''

export class NovelBin implements SourceDefinition {
    private name = "NovelBin";
    private baseUrl = "https://www.novelbin.me/";
    private mainCategory = "Fantasy";
    private language = "English";
    private isRaw = false;
    private novel: Novel = {
        id: '',
        title: '',
        link: '',
        image: '',
        genres: [],
    };

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
            const response = await fetch(`https://favicone.com/${this.baseUrl}?s32`);
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

    async getNovelImage() {
        try {
            const response = await fetch(this.novel.link)
            if (!response.ok) {
                console.error("Failed to fetch novel image");
                return placeholderImage;
            }
            const html = await response.text();
            const { document } = parseHTML(html);

            const metaImage = document.querySelector('meta[itemprop="image"]')?.getAttribute('content');
            if (metaImage) {
                return metaImage;
            }

            const bookImage = document.querySelector('div.book img.lazy')?.getAttribute('src');
            if (bookImage) {
                return bookImage;
            }

            const anyImage = document.querySelector('img.lazy[alt*="novel"]')?.getAttribute('src');
            if (anyImage) {
                return anyImage;
            }

            return placeholderImage;
        } catch (error) {
            console.error("Error fetching novel image:", error);
            return placeholderImage;
        }
    }

    async getNovels() {
        const response = await fetch(`${this.baseUrl}`);

        if (!response.ok) {
            throw ("Failed to fetch novel list");
        }
        const html = await response.text();

        let novels: { id: string; title: string; image: string; genres: string[]; link: string; }[] = [];

        const { document } = parseHTML(html);

        const divs = document.querySelectorAll('.list-new .row')
        const novelLength = divs.length

        const novelPromises = Array.from(divs).map(async (div) => {
            const title = div.querySelector('.col-title h3 a')?.textContent?.trim() ?? '';

            const link = div.querySelector('.col-title h3 a')?.getAttribute('href')
            if (!link) return null;

            this.novel.link = link;

            const image = await this.getNovelImage()

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
                link
            };
        });

        // Wait for all promises to resolve and filter out any null values
        const results = await Promise.all(novelPromises);
        return results.filter(novel => novel !== null);
    }
}
