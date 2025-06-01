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
    added: string;
    lastVisited: string;
}

export interface ChapterData {
    slug: string;
    chapterNumber: number;
    chapterName?: string;
    lastReadAt: string;
}

export interface LocalReading {
    // assuming we have'nt synced yet     
    novelId: string | undefined;
    novelName: string;
    coverImage: string | undefined;

    // assuming we have'nt synced yet     
    readingSourceId: string | undefined;
    // but we need an anchor point
    readingSourceUrl: string // can't be un-defined

    currentChapter: number;
    previousChapter: number;

    // New field to store chapter history/info
    chapters: ChapterData[];

    startedVisitOn: string;
    lastVisitedAt: string;

    // this is for ch readings
    startedReadingOn: string | undefined;
    lastReadingAt: string | undefined;
}