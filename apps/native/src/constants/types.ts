import { ReactNode } from "react";

export type Novel = {
    [x: string]: ReactNode;
    id: string;
    title: string;
    link: string
    image: string;
    genres: string[];
};

export interface NovelMetaData {
    name: string;
    cover: string
    desc: string;
    genres: string[];
    chapters: string;
    status: string;
    language: string;
    author: string;
    rating: { val: number; outOf: number; };
    source: {
        name: string;
        icon: string;
    }
}

export type Source = {
    id: string;
    name: string;
    icon: string;
    isRaw: boolean;
    enabled: boolean;
    language: string;
    mainCategory: string;
    genres: string; // Stored as JSON string
    last_updated: string;
};

export interface FilterOption {
    id: string;
    label: string;
    icon?: string;
}

export interface NovelPageResult {
    novels: Novel[];
    hasNextPage: boolean;
}

export type NovelSourceMetadata = {
    name: string,
    baseUrl: string,
    mainCategory: string,
    language: string,
    isRaw: boolean,
}

export type ChapterContent = {
    content: string[];
    title: string;
    link: string
    prevChapter: string | null;
    nextChapter: string | null;
    nextChapterTitle: string | null;
}

export interface SourceDefinition {
    supportedHostnames?: string[];
    getId(): string;
    getMetadata(): NovelSourceMetadata;
    getIcon(): Promise<string>;
    getGenres(): Promise<string[]>;

    getRandomNovel?(): Promise<string>;
    getNovelMetaData(link?: string): Promise<NovelMetaData>
    getNovelImage(link: string): string;
    getNovelChapters(link: string): Promise<{ title: string; link: string; date?: Date; }[]>;
    getNovelChapterContent(link: string): Promise<ChapterContent>;
    getNovels(page?: number): Promise<NovelPageResult>;

    // Optional filter methods
    getUpdatedNovels?(page?: number): Promise<NovelPageResult>;
    getNewestNovels?(page?: number): Promise<NovelPageResult>;
    getCompletedNovels?(page?: number): Promise<NovelPageResult>;
    getHighestRatedNovels?(page?: number): Promise<NovelPageResult>;
    getNovelsWithChapters?(minChapters: number, page?: number): Promise<NovelPageResult>;
    getOldestNovels?(page?: number): Promise<NovelPageResult>;
    getCompletedNovels?(page?: number): Promise<NovelPageResult>;
}
