export type PopView = 'dashboard' | 'novelSite' | 'novelToc' | 'novelCh';
export type ReadingTheme = 'light' | 'dark' | 'system';

export interface ExtensionSettings {
    autoSync: boolean;
    readingProgress: boolean
    theme: ReadingTheme;
}

export type BookmarkLabel = 'urgent' | 'bad' | 'awesome';

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
    bookmark: {
        id: string
        label: BookmarkLabel
        excerpt: string;
        dateAdded: string;
    } | undefined;
}

export interface LocalReading {
    // assuming we have'nt synced yet     
    novelId: string | undefined;
    novelName: string;
    novelAuthor: string | undefined;
    coverImage: string | undefined;
    novelGenres: string[]

    startedVisitOn: string;
    lastVisitedAt: string;

    readingSourceId: string | undefined;
    readingSourceUrl: string
    fullUrl: string // Full URL to the novel on the source site

    currentChapter: number;
    previousChapter: number;

    totalChapters: number;
    startedReadingOn: string | undefined;
    lastReadingAt: string | undefined;
    readChapters: ChapterData[];
}