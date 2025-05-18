import React from 'react';
import ReadingActivity from './components/ReadingActivity';
import ReadingInsights from './components/ReadingInsights';
import StatCard from './components/StatCard';
import StatsHeader from './components/StatsHeader';
import { ReadingStats } from './types';

const Stats: React.FC = () => {
    // Mock reading statistics
    const stats: ReadingStats = {
        booksRead: 24,
        chaptersRead: 1834,
        totalHoursRead: 412,
        wordsRead: 2458000,
        lastWeekReadingTime: 18.5,
        weeklyStreak: 12,
        favoriteGenre: 'Cultivation',
        completionRate: 84,
        monthlyActivity: [65, 72, 45, 80, 95, 45, 60, 80, 75, 82, 90, 95, 88, 92, 75, 80, 85, 70, 65, 72, 78, 83, 90, 75, 60, 65, 70, 85]
    };

    return (
        <div className="flex flex-col gap-4">
            <StatsHeader />

            <div className="grid grid-cols-2 gap-4">
                <StatCard title="Books Read" value={stats.booksRead} />
                <StatCard title="Chapters" value={stats.chaptersRead} />
                <StatCard title="Hours Read" value={stats.totalHoursRead} />
                <StatCard title="Weekly Streak" value={`${stats.weeklyStreak} weeks`} />
            </div>

            <ReadingActivity monthlyActivity={stats.monthlyActivity} />
            <ReadingInsights stats={stats} />
        </div>
    );
};

export default Stats;
