import React, { useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';
import { DEFAULT_STATS, getStatsFromStorage, recalculateStats } from './action';
import ReadingActivity from './components/ReadingActivity';
import ReadingActivitySkeleton from './components/ReadingActivity/skeleton';
import ReadingInsights from './components/ReadingInsights';
import ReadingInsightsSkeleton from './components/ReadingInsights/skeleton';
import StatCard from './components/StatCard';
import StatCardSkeleton from './components/StatCard/skeleton';
import StatsHeader from './components/StatsHeader';
 
const Stats: React.FC = () => {
    const [stats, setStats] = useState(DEFAULT_STATS);
    const [isLoading, setIsLoading] = useState(true);
    const [isRefreshing, setIsRefreshing] = useState(false);
    const [error, setError] = useState<string | null>(null);

    // Load stats from local storage on component mount
    useEffect(() => {
        const loadStats = async () => {
            try {
                setIsLoading(true);
                const storedStats = await getStatsFromStorage();
                setStats(storedStats);
                setError(null);
            } catch (err) {
                setError('Failed to load stats from storage');
                console.error('Error loading stats:', err);
            } finally {
                setIsLoading(false);
            }
        };

        loadStats();
    }, []);

    const handleRefresh = async () => {
        try {
            setIsRefreshing(true);
            setError(null);
            const data = await recalculateStats();
            if (data.error) {
                toast.error(error)
                return
            }
            setStats(data.data);
            // TODO: Compare data here and show msg: "Data updated successfully" or "Already up to date"
            toast.success('Stats refreshed successfully');
        } catch (err) {
            setError('Failed to refresh stats');
            toast.error('Error refreshing stats: ' + err);
        } finally {
            setIsRefreshing(false);
        }
    };

    if (error) toast.error(error);

    if (isLoading || isRefreshing) {
        return (
            <div className="flex flex-col gap-4">
                <div className="flex justify-between items-center pb-2 border-b border-gray-200 dark:border-gray-700">
                    <div className="h-8 w-48 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
                    <div className="h-8 w-8 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <StatCardSkeleton />
                    <StatCardSkeleton />
                    <StatCardSkeleton />
                    <StatCardSkeleton />
                </div>

                <ReadingActivitySkeleton />
                <ReadingInsightsSkeleton />
            </div>
        );
    }

    return (
        <div className="flex flex-col gap-4">
            <StatsHeader onRefresh={handleRefresh} isRefreshing={isRefreshing} />
            <div className="grid grid-cols-2 gap-4">
                <StatCard title="Books Read" value={stats.booksRead} />
                <StatCard title="Chapters" value={stats.chaptersRead} />
                <StatCard title="Hours Read" value={stats.totalHoursRead || 0} />
                <StatCard title="Weekly Streak" value={`${stats.weeklyStreak || 0} ${stats.weeklyStreak === 1 ? 'week' : 'weeks'}`} />
            </div>

            <ReadingActivity monthlyActivity={stats.monthlyActivity} />
            <ReadingInsights stats={stats} />
        </div>
    );
};

export default Stats;
