export interface NovelData {
    id: number;
    title: string;
    author: string;
    coverUrl: string;
    downloadedChapters: number;
    totalSize: string;
    isExpanded: boolean;
    downloadOrder: number; // Added for sorting by recency without showing dates
}
