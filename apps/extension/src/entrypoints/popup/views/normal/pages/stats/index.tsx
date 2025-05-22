import React, { useState } from 'react';
import { toast } from 'react-hot-toast';
import useSWR from 'swr';
import { DEFAULT_STATS, getStatsFromStorage, recalculateStats } from './action';
import ReadingActivity from './components/ReadingActivity';
import ReadingInsights from './components/ReadingInsights';
import StatCard from './components/StatCard';
import StatsHeader from './components/StatsHeader';
import StatsSkeleton from './skeleton';

const Stats: React.FC = () => {
    const [isRefreshing, setIsRefreshing] = useState(false);
    const { data: stats = DEFAULT_STATS, error, isLoading, mutate } = useSWR('reading-stats', getStatsFromStorage, {
        revalidateOnFocus: false,
        onError: (err) => {
            console.error('Error loading stats:', err);
            toast.error('Failed to load stats from storage');
        }
    });

    const handleRefresh = async () => {
        try {
            setIsRefreshing(true);
            // Start refreshing (this will set a loading state)
            await mutate(async () => {
                const result = await recalculateStats();
                if (result.error) {
                    toast.error(result.error);
                    return stats; // Return previous stats on error
                }

                // Compare new data with previous data
                const isDataChanged = JSON.stringify(result.data) !== JSON.stringify(stats);

                if (isDataChanged) {
                    toast.success('Stats updated successfully');
                } else {
                    toast.success('Stats already up to date');
                }

                return result.data;
            }, {
                revalidate: false // We don't need to revalidate since we're already updating the data
            });
        } catch (err) {
            toast.error('Error refreshing stats: ' + (err instanceof Error ? err.message : 'Unknown error'));
        } finally {
            setIsRefreshing(false);
        }
    };

    if (error) toast.error(error);


    return (isLoading || isRefreshing) ? <StatsSkeleton />
        :
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
};

export default Stats;
