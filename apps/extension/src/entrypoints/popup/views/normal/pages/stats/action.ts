import { searchNovels } from "@repo/db/supabase";

interface ReadingStats {
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

const fetchUserStats = async () => {
    const { data, error } = await searchNovels('path');
    if (error) {
        console.error('Error fetching user stats:', error);
        return null;
    }
    console.log('Fetched data:', data);
    return data;
}
