export type Novel = {
    id: string;
    title: string;
    link: string
    image: string;
    genres: string[];
};

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

export interface SourceDefinition {
    getId: () => string
    getMetadata: () => {
        name: string
        baseUrl: string
        mainCategory: string
        language: string
        isRaw: boolean
    }

    getIcon: () => Promise<string>

    getGenres: () => Promise<string[]>
    getNovels: () => Promise<Novel[]>
    getNovelImage: () => Promise<string>
    // fetchNovelDetails: (novelId: string) => Promise<Novel>
    // fetchChapters: (novelId: string) => Promise<any>
    // fetchChapterContent: (novelId: string, chapterId: string) => Promise<string>
}
