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

export interface NovelInfo {
    slug: string;
    title: string;
    source: string;
    sourceUrl: string; // Full URL to the novel on the source site
}
