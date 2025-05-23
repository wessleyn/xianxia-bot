import { storage } from '#imports';
import { delay } from '../../../../../../utils/common';
export interface ReadingData {
    id: number;
    title: string;
    author: string;
    coverUrl: string;
    currentChapter: number;
    totalChapters: number;
    progress: number;
    lastReadDate: string;
}

export const DEFAULT_CURRENT_READINGS: ReadingData[] = [];

export const currentReadings = storage.defineItem<ReadingData[]>(
    'local:xianxu_current_readings',
    {
        fallback: DEFAULT_CURRENT_READINGS,
    }
);

/**
 * Get current readings from local storage
 */
export const getCurrentReadingsFromStorage = async (): Promise<ReadingData[]> => {
    try {
        return await currentReadings.getValue();
    } catch (error) {
        console.error('Error fetching current readings from storage:', error);
        return DEFAULT_CURRENT_READINGS;
    }
};

/**
 * Save current readings to local storage
 */
export const saveCurrentReadingsToStorage = async (readings: ReadingData[]): Promise<void> => {
    try {
        await currentReadings.setValue(readings);
    } catch (error) {
        console.error('Error saving current readings to storage:', error);
    }
};

/**
 * Fetch current readings from API and update local storage
 */
export const recalculateCurrentReadings = async (): Promise<{ data: ReadingData[], error: string | null }> => {
    await delay(2)
   
    try {
        // Mock data for current readings
        const readings: ReadingData[] = [
            {
                id: 1,
                title: "Against the Gods",
                author: "Mars Gravity",
                coverUrl: "https://via.placeholder.com/60x80",
                currentChapter: 342,
                totalChapters: 1823,
                progress: 18.8,
                lastReadDate: "2 hours ago",
            },
            {
                id: 2,
                title: "Martial World",
                author: "Cocooned Cow",
                coverUrl: "https://via.placeholder.com/60x80",
                currentChapter: 984,
                totalChapters: 2345,
                progress: 42,
                lastReadDate: "Yesterday",
            },
            {
                id: 3,
                title: "Desolate Era",
                author: "I Eat Tomatoes",
                coverUrl: "https://via.placeholder.com/60x80",
                currentChapter: 156,
                totalChapters: 1324,
                progress: 11.8,
                lastReadDate: "3 days ago",
            },
        ];

        // Add some randomness to simulate updates
        if (Math.random() > 0.5) {
            readings[0].currentChapter += Math.floor(Math.random() * 5);
            readings[0].progress = Math.min(100, (readings[0].currentChapter / readings[0].totalChapters) * 100);
            readings[0].lastReadDate = "just now";
        }

        await currentReadings.setValue(readings);

        return { data: readings, error: null };
    } catch (error) {
        const existingReadings = await currentReadings.getValue();
        return {
            data: existingReadings,
            error: error instanceof Error ? error.message : 'Unknown error'
        };
    }
};
