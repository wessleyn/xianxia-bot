import { storage } from '#imports';
import { delay } from '../../../../../../utils/common';

export interface ReadingStats {
  booksRead: number;
  chaptersRead: number;
  totalHoursRead: number;
  wordsRead: number;
  lastWeekReadingTime: number;
  weeklyStreak: number;
  favoriteGenre: string;
  completionRate: number;
  monthlyActivity: number[];
}

export const DEFAULT_STATS: ReadingStats = {
  booksRead: 0,
  chaptersRead: 0,
  totalHoursRead: 0,
  wordsRead: 0,
  lastWeekReadingTime: 0,
  weeklyStreak: 0,
  favoriteGenre: 'Unknown',
  completionRate: 0,
  monthlyActivity: Array(28).fill(0),
};

export const readingStats = storage.defineItem<ReadingStats>(
  'local:xianxu_reading_stats',
  {
    fallback: DEFAULT_STATS,
  }
);

/**
 * Get reading stats from local storage
 */
export const getStatsFromStorage = async (): Promise<ReadingStats> => {
  try {
    return await readingStats.getValue();
  } catch (error) {
    console.error('Error fetching stats from storage:', error);
    return DEFAULT_STATS;
  }
};

/**
 * Save reading stats to local storage
 */
export const saveStatsToStorage = async (stats: ReadingStats): Promise<void> => {
  try {
    await readingStats.setValue(stats);
  } catch (error) {
    console.error('Error saving stats to storage:', error);
  }
};

/**
 * Fetch user stats from API and update local storage
 */
export const recalculateStats = async (): Promise<{ data: ReadingStats, error: string | null }> => {
   await delay(2)
  
  try {
    // TODO: Calculate stats based on users reading habits 
    const stats: ReadingStats = {
      booksRead: Math.floor(Math.random() * 20) + 1, // 1-20 books
      chaptersRead: Math.floor(Math.random() * 500) + 50, // 50-550 chapters
      totalHoursRead: Math.floor(Math.random() * 100) + 5, // 5-105 hours
      wordsRead: Math.floor(Math.random() * 5000000) + 500000, // 500K-5.5M words
      lastWeekReadingTime: Math.floor(Math.random() * 20) + 1, // 1-21 hours last week
      weeklyStreak: Math.floor(Math.random() * 15) + 1, // 1-16 week streak
      favoriteGenre: ['Xianxia', 'Wuxia', 'Xuanhuan', 'Cultivation', 'Martial Arts'][Math.floor(Math.random() * 5)],
      completionRate: Math.floor(Math.random() * 90) + 10, // 10-100% completion rate
      monthlyActivity: Array(28).fill(0).map(() => Math.floor(Math.random() * 120)), // Daily reading activity
    };

    await readingStats.setValue(stats);

    return { data: stats, error: null };
  } catch (error) {
    const existingStats = await readingStats.getValue();
    return { data: existingStats, error: error instanceof Error ? error.message : 'Unknown error' };
  }
};
