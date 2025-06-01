import { NovelPattern } from "../types";

export const novelBin: NovelPattern = {
    homepage: "novelbin.me",
    homepageRegex: /^https?:\/\/(?:www\.)?novelbin\.(me|com)\/?$/,
    novelTocRegex: /^https?:\/\/(?:www\.)?novelbin\.(me|com)\/novel-book\/[^\/]+(?:#tab-chapters-title)?$/,
    novelChRegex: /^https?:\/\/(?:www\.)?novelbin\.(me|com)\/(?:b|novel-book)\/[^\/]+\/(?:c+)?chapter-[^\/]+$/,
    extractNovelSlug: (url: string) => {
        // Handle extraction from table of contents 
        const tocMatch = url.match(/^https?:\/\/(?:www\.)?novelbin\.(me|com)\/novel-book\/([^\/]+)(?:#tab-chapters-title)?$/);
        if (tocMatch) return tocMatch[2];

        const chapterMatch = url.match(/^https?:\/\/(?:www\.)?novelbin\.(me|com)\/(?:b|novel-book)\/([^\/]+)\/(?:c+)?chapter-[^\/]+$/);
        return chapterMatch ? chapterMatch[2] : null;
    },
    extractChapSlug: (url: string) => {
        const match = url.match(/^https?:\/\/(?:www\.)?novelbin\.(me|com)\/(?:b|novel-book)\/([^\/]+)\/(?:c+)?chapter-[^\/]+$/);
        return match ? match[2] : null;
    }
}