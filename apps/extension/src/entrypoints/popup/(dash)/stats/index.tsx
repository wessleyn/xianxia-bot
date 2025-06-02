import React, { useState } from 'react';
import { toast } from 'react-hot-toast';
import useSWR from 'swr';
import useDashStore from '../../stores/useDashStore';
import { DEFAULT_STATS, recalculateStats } from './action';
import ReadingActivity from './components/ReadingActivity';
import ReadingInsights from './components/ReadingInsights';
import StatCard from './components/StatCard';
import StatsHeader from './components/StatsHeader';
import StatsSkeleton from './skeleton';

const Stats: React.FC = () => {
    const [isRefreshing, setIsRefreshing] = useState(false);
    const { isSyncing }  = useDashStore()
    const { data: stats = DEFAULT_STATS, error, isLoading, mutate } = useSWR('reading-stats', recalculateStats, {
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

                // Compare new data with previous data
                const isDataChanged = JSON.stringify(result) !== JSON.stringify(stats);

                if (isDataChanged) {
                    toast.success('Stats updated successfully');
                } else {
                    toast.success('Stats already up to date');
                }

                return result;
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


    return (isLoading || isRefreshing || isSyncing) ? <StatsSkeleton />
        :
        <div className="flex flex-col gap-4">
            <StatsHeader onRefresh={handleRefresh} isRefreshing={isRefreshing} />
            <div className="grid grid-cols-2 gap-4">
                <StatCard title="Books Read" value={stats.booksRead} />
                <StatCard title="Chapters" value={stats.chaptersRead} />
                <StatCard title="Hours Read" value={stats.totalHoursRead || 0} />
                <StatCard title="Streak" value={`${stats.dailyStreak || 0} ${stats.dailyStreak === 1 ? 'day' : 'days'}`} />
            </div>

            <ReadingActivity monthlyActivity={stats.monthlyActivity} />
            <ReadingInsights stats={stats} />
        </div>
};

export default Stats;
