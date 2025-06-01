import { localReadings } from '@constants/storage';
import { formatDistance } from 'date-fns';

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


/**
 * Fetch current readings from storage and update local cache
 */
export const fetchCurrentReadings = async () => {
    // Get readings from local storage
    const storedReadings = await localReadings.getValue();

    const activeReadings = storedReadings.filter(reading => reading.lastReadingAt !== undefined);

    // Sort by most recently read
    activeReadings.sort((a, b) => {
        const dateA = new Date(a.lastReadingAt || 0);
        const dateB = new Date(b.lastReadingAt || 0);
        return dateB.getTime() - dateA.getTime();
    });

    // Map to the expected format
    return activeReadings.map((reading, index) => {
        // Calculate progress based on actual totalChapters field
        const progress = reading.totalChapters > 0
            ? Math.min(100, (reading.currentChapter / reading.totalChapters) * 100)
            : 0;


        return {
            id: index + 1, // Use index+1 as ID for now
            title: reading.novelName,
            author: reading.novelAuthor || 'Unknown Author', 
            coverUrl: reading.coverImage || 'https://via.placeholder.com/60x80',
            currentChapter: reading.currentChapter,
            totalChapters: reading.totalChapters,
            progress: parseFloat(progress.toFixed(1)),
            lastReadDate: formatDistance(new Date(reading.lastReadingAt!), new Date(), { addSuffix: true })
        };
    });
};
