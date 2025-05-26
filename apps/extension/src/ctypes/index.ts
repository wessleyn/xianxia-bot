import { NovelChapter } from "@repo/db";

export interface NovelPattern {
    homepage: string;
    homepageRegex: RegExp;
    novelTocRegex: RegExp;
    novelChRegex: RegExp;
}

export type PopView = 'dashboard' | 'novelSite' | 'novelToc' | 'novelCh';

export interface ExtensionSettings {
    autoSync: boolean;
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