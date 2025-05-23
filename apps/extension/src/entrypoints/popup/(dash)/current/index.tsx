import React, { useState } from 'react';
import { toast } from 'react-hot-toast';
import useSWR from 'swr';
import { DEFAULT_CURRENT_READINGS, getCurrentReadingsFromStorage, recalculateCurrentReadings } from './action';
import BrowseLibraryButton from './components/BrowseLibrary';
import CurrentHeader from './components/CurrentHeader';
import ReadingCard from './components/ReadingCard';
import CurrentSkeleton from './skeleton';
import useDashStore from '../../stores/useDashStore';

const Current: React.FC = () => {
    const [isRefreshing, setIsRefreshing] = useState(false);
    const { isSyncing } = useDashStore()

    // Use SWR hook for data fetching with automatic error handling and revalidation
    const { data: currentReadings = DEFAULT_CURRENT_READINGS, error, isLoading, mutate } = useSWR('current-readings', getCurrentReadingsFromStorage, {
        revalidateOnFocus: false,
        onError: (err) => {
            console.error('Error loading current readings:', err);
            toast.error('Failed to load current readings');
        }
    });

    const handleRefresh = async () => {
        try {
            setIsRefreshing(true);

            // Use mutate to update the data
            await mutate(async () => {
                const result = await recalculateCurrentReadings();
                if (result.error) {
                    toast.error(result.error);
                    return currentReadings; // Return previous readings on error
                }

                // Compare new data with previous data
                const isDataChanged = JSON.stringify(result.data) !== JSON.stringify(currentReadings);

                if (isDataChanged) {
                    toast.success('Current readings updated successfully');
                } else {
                    toast.success('Current readings already up to date');
                }

                return result.data;
            }, {
                revalidate: false // We don't need to revalidate since we're already updating the data
            });
        } catch (err) {
            toast.error('Error refreshing current readings: ' + (err instanceof Error ? err.message : 'Unknown error'));
        } finally {
            setIsRefreshing(false);
        }
    };

    if (error) toast.error(String(error));


    return (isLoading || isRefreshing || isSyncing) ? (
        <CurrentSkeleton />
    ) : (
        <div className="flex flex-col gap-4">
            <CurrentHeader onRefresh={handleRefresh} isRefreshing={isRefreshing} />

            {currentReadings.length > 0 ? (
                currentReadings.map((book) => (
                    <ReadingCard key={book.id} book={book} />
                ))
            ) : (
                <div className="text-center py-8">
                    <p className="text-gray-500 dark:text-gray-400">No current readings found.</p>
                </div>
            )}

            <BrowseLibraryButton />
        </div>
    );
};

export default Current;
