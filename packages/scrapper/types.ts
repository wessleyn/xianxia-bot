export interface NovelPattern {
    homepage: string;
    homepageRegex: RegExp;
    novelTocRegex: RegExp;
    novelChRegex: RegExp;
    extractNovelSlug: (url: string) => string | null
    extractChapSlug: (url: string) => string | null
}

// Chapter information return type
export interface ChapterInfo {
    slug: string;
    formattedTitle?: string;
    chapterNumber?: number;
    chapterName?: string;
}
