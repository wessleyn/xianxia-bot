import { delay } from "../../../../utils/common";

export interface BookmarkData {
    id: number;
    novel: string;
    chapter: number;
    chapterTitle: string;
    excerpt: string;
    dateAdded: string;
    color: string;
    textColor: string;
}


export const DEFAULT_CURRENT_BOOKMARKS: BookmarkData[] = [];

export const bookmarksStore = storage.defineItem<BookmarkData[]>(
    'local:xianxu_current_bookmarks',
    {
        fallback: DEFAULT_CURRENT_BOOKMARKS,
    }
);

/**
 * Get current bookmarks from local storage
 */
export const getBookmarksFromStorage = async (): Promise<BookmarkData[]> => {
    try {
        return await bookmarksStore.getValue();
    } catch (error) {
        console.error('Error fetching current bookmarks from storage:', error);
        return DEFAULT_CURRENT_BOOKMARKS;
    }
};

/**
 * Save current bookmarks to local storage
 */
export const saveBookmarksToStorage = async (bookmarks: BookmarkData[]): Promise<void> => {
    try {
        await bookmarksStore.setValue(bookmarks);
    } catch (error) {
        console.error('Error saving current bookmarks to storage:', error);
    }
};

/**
 * Fetch current bookmarks from API and update local storage
 */
export const reCalcBookmarks = async (): Promise<{ data: BookmarkData[], error: string | null }> => {
    await delay(2)
    try {
        // Mock data for current bookmarks
        const bookmarks: BookmarkData[] = [
            {
                id: 1,
                novel: "Against the Gods",
                chapter: 341,
                chapterTitle: "Heavenly Profound Treasure",
                excerpt: "The Overlord Pellet was known as the number one pellet within the Blue Wind Empire...",
                dateAdded: "2025-05-12",
                color: "bg-red-100",
                textColor: "text-red-700"
            },
            {
                id: 2,
                novel: "Martial World",
                chapter: 984,
                chapterTitle: "Divine Phoenix Island",
                excerpt: "The ancient Phoenix was a mythical divine beast, said to be unrivaled under the heavens...",
                dateAdded: "2025-05-10",
                color: "bg-blue-100",
                textColor: "text-blue-700"
            },
            {
                id: 3,
                novel: "Desolate Era",
                chapter: 155,
                chapterTitle: "The Bloodcloud Hall",
                excerpt: "The Diremonsters were divided into nine separate grades, just like magic treasures...",
                dateAdded: "2025-05-08",
                color: "bg-green-100",
                textColor: "text-green-700"
            },
            {
                id: 4,
                novel: "Martial World",
                chapter: 982,
                chapterTitle: "The Final Trial",
                excerpt: "The divine tree had nine branches and nine roots, symbolizing the nine heavens and nine earths...",
                dateAdded: "2025-05-06",
                color: "bg-purple-100",
                textColor: "text-purple-700"
            },
        ];

        // Add some randomness to simulate updates
        if (Math.random() > 0.5) {
            bookmarks[0].chapter += Math.floor(Math.random() * 5);
        }

        await bookmarksStore.setValue(bookmarks);

        return { data: bookmarks, error: null };
    } catch (error) {
        const existingddbookmarks = await bookmarksStore.getValue();
        return {
            data: existingddbookmarks,
            error: error instanceof Error ? error.message : 'Unknown error'
        };
    }
};
