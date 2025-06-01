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

  // Count total chapters read across all books
  const chaptersRead = activeReadings.reduce((total, reading) => {
    return total + (reading.readChapters?.length || 0);
  }, 0);

  // Calculate total hours read (estimate based on chapters)
  // Assuming average of 15 minutes per chapter
  const totalHoursRead = Math.round((chaptersRead * 15) / 60);

  // Calculate words read (estimate based on chapters)
  // Assuming average of 2500 words per chapter
  const wordsRead = chaptersRead * 2500;

  // Calculate reading time for the last week
  const oneWeekAgo = new Date();
  oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);

  const lastWeekChapters = activeReadings.reduce((total, reading) => {
    const recentChapters = reading.readChapters?.filter(chapter => {
      if (!chapter.lastReadAt) return false;
      const readDate = new Date(chapter.lastReadAt);
      return readDate > oneWeekAgo;
    }) || [];
    return total + recentChapters.length;
  }, 0);

  // Estimate last week reading time in hours (15 min per chapter)
  const lastWeekReadingTime = Math.round((lastWeekChapters * 15) / 60);

  // Calculate weekly streak (simple implementation)
  // True streak calculation would require more detailed data
  const weeklyStreak = Math.min(Math.max(1, Math.round(lastWeekChapters / 7)), 52);

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

  // Generate monthly activity data (last 28 days)
  const monthlyActivity = Array(28).fill(0);

  // Populate activity data based on chapter reading history
  activeReadings.forEach(reading => {
    reading.readChapters?.forEach(chapter => {
      if (chapter.lastReadAt) {
        const readDate = new Date(chapter.lastReadAt);
        const today = new Date();
        const daysDiff = Math.floor((today.getTime() - readDate.getTime()) / (1000 * 60 * 60 * 24));

        // If within the last 28 days, increment the counter for that day
        if (daysDiff >= 0 && daysDiff < 28) {
          monthlyActivity[daysDiff]++;
        }
      }
    });
  });

  // Determine favorite genre by counting occurrences across all readings
  const genreCounts: Record<string, number> = {};

  // Count genres from all active readings
  activeReadings.forEach(reading => {
    // Check if reading has novelGenres and it's an array
    if (reading.novelGenres.length > 0) {
      reading.novelGenres.forEach(genre => {
        const trimmedGenre = genre.trim();
        if (trimmedGenre) {
          genreCounts[trimmedGenre] = (genreCounts[trimmedGenre] || 0) + 1;
        }
      });
    }
  });

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

  return stats
};
