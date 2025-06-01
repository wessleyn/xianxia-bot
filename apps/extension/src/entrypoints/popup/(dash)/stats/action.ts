import { storage } from '#imports';
import { localReadings } from '@constants/storage';

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
  'local:reading_stats',
  {
    fallback: DEFAULT_STATS,
  }
);

/**
 * Fetch current readings from storage and calculate stats
 */
export const recalculateStats = async () => {
  // Get readings from local storage
  const storedReadings = await localReadings.getValue();

  // Count only readings with lastReadingAt (books that were actually read)
  const activeReadings = storedReadings.filter(reading => reading.lastReadingAt);

  // Count total books read
  const booksRead = activeReadings.length;

  // Prepare data structures for calculations
  let chaptersRead = 0;
  let totalReadingTimeMinutes = 0;
  const readingDays = new Set<string>();
  const monthlyActivity = Array(28).fill(0);
  const genreCounts: Record<string, number> = {};

  // Calculate stats based on reading history
  activeReadings.forEach(reading => {
    // Add to chapter count
    chaptersRead += reading.readChapters?.length || 0;

    // Process each chapter for time calculations and activity tracking
    reading.readChapters?.forEach(chapter => {
      if (chapter.startedAt && chapter.lastReadAt) {
        // Calculate actual reading time for this chapter
        const startTime = new Date(chapter.startedAt).getTime();
        const endTime = new Date(chapter.lastReadAt).getTime();

        // If reading time is reasonable (between 1 min and 2 hours), use it
        // Otherwise fall back to the 15-minute estimate
        const chapterMinutes = Math.max(1, Math.min(120, (endTime - startTime) / (1000 * 60))) || 15;
        totalReadingTimeMinutes += chapterMinutes;

        // Track which days had reading activity (for streak calculation)
        const readDate = new Date(chapter.lastReadAt);
        readingDays.add(readDate.toISOString().split('T')[0]);

        // Record activity for monthly heatmap
        const today = new Date();
        const daysDiff = Math.floor((today.getTime() - readDate.getTime()) / (1000 * 60 * 60 * 24));
        if (daysDiff >= 0 && daysDiff < 28) {
          monthlyActivity[daysDiff]++;
        }
      }
    });

    // Count genres for favorite calculation
    if (reading.novelGenres.length > 0) {
      reading.novelGenres.forEach(genre => {
        const trimmedGenre = genre.trim();
        if (trimmedGenre) {
          genreCounts[trimmedGenre] = (genreCounts[trimmedGenre] || 0) + 1;
        }
      });
    }
  });

  // Convert total reading time to hours
  const totalHoursRead = Math.round(totalReadingTimeMinutes / 60);

  // Calculate words read (estimate based on chapters)
  const wordsRead = chaptersRead * 2500;

  // Calculate reading time for the last week
  const oneWeekAgo = new Date();
  oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
  const oneWeekAgoStr = oneWeekAgo.toISOString().split('T')[0];

  // Calculate weekly streak based on consecutive days of reading
  const sortedReadingDays = Array.from(readingDays).sort();
  const lastWeekReadingDays = sortedReadingDays.filter(day => day >= oneWeekAgoStr);
  const lastWeekReadingTime = Math.round(
    lastWeekReadingDays.length * (totalReadingTimeMinutes / readingDays.size || 15) / 60
  );

  // Simple weekly streak calculation based on reading frequency
  const weeklyStreak = Math.min(52, Math.max(1, lastWeekReadingDays.length));

  // Calculate completion rate based on current/total chapters
  const booksWithTotalChapters = activeReadings.filter(book => book.totalChapters > 0);
  let completionRate = 0;

  if (booksWithTotalChapters.length > 0) {
    const totalCompletionRate = booksWithTotalChapters.reduce((sum, book) => {
      const bookProgress = Math.min(100, (book.currentChapter / book.totalChapters) * 100);
      return sum + bookProgress;
    }, 0);
    completionRate = Math.round(totalCompletionRate / booksWithTotalChapters.length);
  }

  // Find the genre with the highest count
  let favoriteGenre = 'Unknown';
  let maxCount = 0;

  Object.entries(genreCounts).forEach(([genre, count]) => {
    if (count > maxCount) {
      favoriteGenre = genre;
      maxCount = count;
    }
  });

  // If no genres found or all readings have empty genre arrays, default to 'Xianxia'
  if (favoriteGenre === 'Unknown' && activeReadings.length > 0) {
    favoriteGenre = 'Xianxia';
  }

  // Assemble the stats object
  const stats: ReadingStats = {
    booksRead,
    chaptersRead,
    totalHoursRead,
    wordsRead,
    lastWeekReadingTime,
    weeklyStreak,
    favoriteGenre,
    completionRate,
    monthlyActivity,
  };

  // Save the calculated stats
  await readingStats.setValue(stats);

  return stats;
};
