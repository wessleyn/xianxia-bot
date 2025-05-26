import { NovelChapter } from "@repo/db";

export interface NovelPattern {
    homepage: string;
    homepageRegex: RegExp;
    novelTocRegex: RegExp;
    novelChRegex: RegExp;
}

export type PopView = 'dashboard' | 'novelSite' | 'novelToc' | 'novelCh';
export type ReadingTheme = 'light' | 'dark' | 'system';

export interface ExtensionSettings {
    autoSync: boolean;
    readingProgress: boolean
    theme: ReadingTheme;
}

export interface LocalSource {
    id?: string;
    name: string;
    url: string;
    visits: number;
    added: string; // ISO date string
    lastVisited: string; // ISO date string
    novels?: NovelChapter[];
}