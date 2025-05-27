import { storage } from '#imports';
import { toast } from 'react-hot-toast';
import { delay } from '../../../../utils/common';

export interface ChapterData {
    id: number;
    title: string;
    chapterNumber: number;
    size: string; // in MB
    downloadDate?: string;
    lastReadDate?: string;
    isRead?: boolean;
}

export interface NovelData {
    id: number;
    title: string;
    author: string;
    coverUrl: string;
    downloadedChapters: number;
    totalSize: string;
    isExpanded: boolean;
    downloadOrder: number; // Added for sorting by recency without showing dates
    // New field to colocate chapters with their parent novel
    chapters?: ChapterData[];
}

export interface StorageUsageData {
    totalStorageUsed: number; // in MB
    maxStorage: number; // in MB
    usagePercentage: number; // 0-100
    freeStorage: number; // in MB
}

export interface DownloadedNovelsState {
    novels: NovelData[];
    // Chapters are now stored directly with their novels
    storageUsage: StorageUsageData;
    lastUpdated: string;
}

export const DEFAULT_STORAGE_USAGE: StorageUsageData = {
    totalStorageUsed: 0,
    maxStorage: 1000, // 1GB max storage
    usagePercentage: 0,
    freeStorage: 1000
};

export const DEFAULT_STATE: DownloadedNovelsState = {
    novels: [],
    storageUsage: DEFAULT_STORAGE_USAGE,
    lastUpdated: new Date().toISOString()
};

// Store everything in a single location
export const novelLibrary = storage.defineItem<DownloadedNovelsState>(
    'local:xianxu_novel_library',
    {
        fallback: DEFAULT_STATE,
    }
);

/**
 * Get the full novel library state from storage
 */
export const getNovelLibrary = async (): Promise<DownloadedNovelsState> => {
    try {
        return await novelLibrary.getValue();
    } catch (error) {
        console.error('Error fetching novel library from storage:', error);
        toast.error('Error accessing novel library');
        return DEFAULT_STATE;
    }
};

/**
 * Get downloaded novels from local storage
 */
export const getDownloadedNovelsFromStorage = async (): Promise<NovelData[]> => {
    try {
        const library = await novelLibrary.getValue();
        return library.novels;
    } catch (error) {
        toast.error('Error fetching downloaded novels from storage: ' + (error instanceof Error ? error.message : 'Unknown error'));
        return [];
    }
};

/**
 * Save the entire library state
 */
export const saveNovelLibrary = async (state: DownloadedNovelsState): Promise<void> => {
    try {
        await novelLibrary.setValue({
            ...state,
            lastUpdated: new Date().toISOString()
        });
    } catch (error) {
        console.error('Error saving novel library to storage:', error);
        toast.error('Error saving novel library');
    }
};

/**
 * Save downloaded novels to local storage
 */
export const saveDownloadedNovelsToStorage = async (novels: NovelData[]): Promise<void> => {
    try {
        const library = await novelLibrary.getValue();
        await novelLibrary.setValue({
            ...library,
            novels,
            lastUpdated: new Date().toISOString()
        });
    } catch (error) {
        console.error('Error saving downloaded novels to storage:', error);
        toast.error('Error saving downloaded novels');
    }
};

/**
 * Calculate storage usage from downloaded novels
 */
export const calculateStorageUsage = async (): Promise<StorageUsageData> => {
    try {
        const novels = await getDownloadedNovelsFromStorage();

        // Calculate total storage used in MB
        const totalStorageUsed = novels.reduce((acc, novel) => {
            // Convert string like "24.5 MB" to number 24.5
            const size = parseFloat(novel.totalSize);
            return acc + size;
        }, 0);

        const maxStorage = 1000; // 1GB max storage
        const freeStorage = maxStorage - totalStorageUsed;
        const usagePercentage = (totalStorageUsed / maxStorage) * 100;

        const usage = {
            totalStorageUsed,
            maxStorage,
            usagePercentage,
            freeStorage
        };

        // Update the storage usage in the library
        const library = await novelLibrary.getValue();
        await novelLibrary.setValue({
            ...library,
            storageUsage: usage,
            lastUpdated: new Date().toISOString()
        });

        return usage;
    } catch (error) {
        console.error('Error calculating storage usage:', error);
        return DEFAULT_STORAGE_USAGE;
    }
};

/**
 * Get chapters for a specific novel
 */
export const getNovelChapters = async (novelId: number): Promise<ChapterData[]> => {
    try {
        const library = await novelLibrary.getValue();
        const novel = library.novels.find(n => n.id === novelId);

        if (!novel) {
            return [];
        }

        // Return the chapters if they exist
        if (novel.chapters && novel.chapters.length > 0) {
            return novel.chapters;
        }

        // Generate mock chapters if not found
        const mockChapters = [...Array(novel.downloadedChapters)].map((_, i) => {
            const chapterNumber = i + 1;
            return {
                id: i + 1,
                title: `${novel.title} Chapter ${chapterNumber}`,
                chapterNumber,
                size: `${(0.1 + (i % 5) * 0.02).toFixed(1)} MB`,
                downloadDate: new Date(Date.now() - (i * 86400000)).toISOString(),
                lastReadDate: i < novel.downloadedChapters / 2 ? new Date(Date.now() - (i * 86400000)).toISOString() : undefined,
                isRead: i < novel.downloadedChapters / 2
            };
        });

        // Update the novel with the generated chapters
        const updatedNovels = library.novels.map(n => {
            if (n.id === novelId) {
                return { ...n, chapters: mockChapters };
            }
            return n;
        });

        // Save the updated library
        await novelLibrary.setValue({
            ...library,
            novels: updatedNovels,
            lastUpdated: new Date().toISOString()
        });

        return mockChapters;
    } catch (error) {
        console.error('Error fetching chapters for novel:', error);
        return [];
    }
};

/**
 * Get recent chapters (last 5) for a specific novel
 */
export const getRecentNovelChapters = async (novelId: number): Promise<ChapterData[]> => {
    try {
        const chapters = await getNovelChapters(novelId);
        return chapters.slice(-5); // Return just the last 5 chapters
    } catch (error) {
        console.error('Error fetching recent chapters:', error);
        return [];
    }
};

/**
 * Delete a downloaded novel from storage
 */
export const deleteDownloadedNovel = async (id: number): Promise<{ success: boolean, error: string | null }> => {
    try {
        const library = await novelLibrary.getValue();
        const updatedNovels = library.novels.filter(novel => novel.id !== id);

        await novelLibrary.setValue({
            ...library,
            novels: updatedNovels,
            lastUpdated: new Date().toISOString()
        });

        // Recalculate storage usage
        await calculateStorageUsage();

        return { success: true, error: null };
    } catch (error) {
        console.error('Error deleting downloaded novel:', error);
        toast.error('Error deleting downloaded novel');
        return {
            success: false,
            error: error instanceof Error ? error.message : 'Unknown error'
        };
    }
};

/**
 * Add or update a chapter in a novel
 */
export const updateNovelChapter = async (
    novelId: number,
    chapter: ChapterData
): Promise<{ success: boolean, error: string | null }> => {
    try {
        const library = await novelLibrary.getValue();
        const updatedNovels = library.novels.map(novel => {
            if (novel.id === novelId) {
                const existingChapters = novel.chapters || [];
                const chapterIndex = existingChapters.findIndex(ch => ch.id === chapter.id);

                let updatedChapters;
                if (chapterIndex >= 0) {
                    // Update existing chapter
                    updatedChapters = [
                        ...existingChapters.slice(0, chapterIndex),
                        chapter,
                        ...existingChapters.slice(chapterIndex + 1)
                    ];
                } else {
                    // Add new chapter
                    updatedChapters = [...existingChapters, chapter];
                }

                return {
                    ...novel,
                    chapters: updatedChapters,
                    downloadedChapters: updatedChapters.length
                };
            }
            return novel;
        });

        await novelLibrary.setValue({
            ...library,
            novels: updatedNovels,
            lastUpdated: new Date().toISOString()
        });

        return { success: true, error: null };
    } catch (error) {
        console.error('Error updating novel chapter:', error);
        return {
            success: false,
            error: error instanceof Error ? error.message : 'Unknown error'
        };
    }
};

/**
 * Mark a chapter as read/unread
 */
export const toggleChapterReadStatus = async (
    novelId: number,
    chapterId: number
): Promise<{ success: boolean, error: string | null }> => {
    try {
        const library = await novelLibrary.getValue();
        const novel = library.novels.find(n => n.id === novelId);

        if (!novel || !novel.chapters) {
            return { success: false, error: 'Novel or chapters not found' };
        }

        const chapterIndex = novel.chapters.findIndex(ch => ch.id === chapterId);

        if (chapterIndex === -1) {
            return { success: false, error: 'Chapter not found' };
        }

        const chapter = novel.chapters[chapterIndex];
        const updatedChapter = {
            ...chapter,
            isRead: !chapter.isRead,
            lastReadDate: !chapter.isRead ? new Date().toISOString() : chapter.lastReadDate
        };

        return await updateNovelChapter(novelId, updatedChapter);
    } catch (error) {
        console.error('Error toggling chapter read status:', error);
        return {
            success: false,
            error: error instanceof Error ? error.message : 'Unknown error'
        };
    }
};

/**
 * Recalculate and update downloaded novels from storage
 */
export const recalculateDownloadedNovels = async (): Promise<{ data: NovelData[], error: string | null }> => {
    await delay(2);

    try {
        // Mock data for downloaded novels with chapters colocated
        const novels: NovelData[] = [
            {
                id: 1,
                title: "Against the Gods",
                author: "Mars Gravity",
                coverUrl: "https://via.placeholder.com/60x80/6366F1/FFFFFF?text=ATG",
                downloadedChapters: 530,
                totalSize: "24.5 MB",
                isExpanded: false,
                downloadOrder: 2,
                chapters: [...Array(530)].map((_, i) => {
                    const chapterNumber = i + 1;
                    return {
                        id: chapterNumber,
                        title: `Against the Gods Chapter ${chapterNumber}`,
                        chapterNumber,
                        size: `${(0.1 + (i % 5) * 0.02).toFixed(1)} MB`,
                        downloadDate: new Date(Date.now() - (i * 86400000)).toISOString(),
                        lastReadDate: i < 300 ? new Date(Date.now() - (i * 86400000)).toISOString() : undefined,
                        isRead: i < 300
                    };
                })
            },
            {
                id: 2,
                title: "Martial World",
                author: "Cocooned Cow",
                coverUrl: "https://via.placeholder.com/60x80/8B5CF6/FFFFFF?text=MW",
                downloadedChapters: 214,
                totalSize: "9.8 MB",
                isExpanded: false,
                downloadOrder: 1,
                chapters: [...Array(214)].map((_, i) => {
                    const chapterNumber = i + 1;
                    return {
                        id: chapterNumber,
                        title: `Martial World Chapter ${chapterNumber}`,
                        chapterNumber,
                        size: `${(0.1 + (i % 5) * 0.02).toFixed(1)} MB`,
                        downloadDate: new Date(Date.now() - (i * 86400000)).toISOString(),
                        lastReadDate: i < 150 ? new Date(Date.now() - (i * 86400000)).toISOString() : undefined,
                        isRead: i < 150
                    };
                })
            },
            {
                id: 3,
                title: "Desolate Era",
                author: "I Eat Tomatoes",
                coverUrl: "https://via.placeholder.com/60x80/EC4899/FFFFFF?text=DE",
                downloadedChapters: 327,
                totalSize: "14.2 MB",
                isExpanded: false,
                downloadOrder: 3,
                chapters: [...Array(327)].map((_, i) => {
                    const chapterNumber = i + 1;
                    return {
                        id: chapterNumber,
                        title: `Desolate Era Chapter ${chapterNumber}`,
                        chapterNumber,
                        size: `${(0.1 + (i % 5) * 0.02).toFixed(1)} MB`,
                        downloadDate: new Date(Date.now() - (i * 86400000)).toISOString(),
                        lastReadDate: i < 200 ? new Date(Date.now() - (i * 86400000)).toISOString() : undefined,
                        isRead: i < 200
                    };
                })
            }
        ];

        // Calculate storage usage
        const totalStorageUsed = novels.reduce((acc, novel) => acc + parseFloat(novel.totalSize), 0);
        const maxStorage = 1000;
        const freeStorage = maxStorage - totalStorageUsed;
        const usagePercentage = (totalStorageUsed / maxStorage) * 100;

        // Save everything in a single location
        await novelLibrary.setValue({
            novels,
            storageUsage: {
                totalStorageUsed,
                maxStorage,
                usagePercentage,
                freeStorage
            },
            lastUpdated: new Date().toISOString()
        });

        return { data: novels, error: null };
    } catch (error) {
        const library = await novelLibrary.getValue();
        return {
            data: library.novels,
            error: error instanceof Error ? error.message : 'Unknown error'
        };
    }
};

/**
 * Get storage usage information
 */
export const getStorageUsage = async (): Promise<StorageUsageData> => {
    const library = await novelLibrary.getValue();
    return library.storageUsage || DEFAULT_STORAGE_USAGE;
};