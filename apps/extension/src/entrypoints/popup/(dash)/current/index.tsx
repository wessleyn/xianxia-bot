import React, { useState } from 'react';
import { toast } from 'react-hot-toast';
import useSWR from 'swr';
import useDashStore from '../../stores/useDashStore';
import { fetchCurrentReadings } from './action';
import BrowseLibraryButton from './components/BrowseLibrary';
import CurrentHeader from './components/CurrentHeader';
import ReadingCard from './components/ReadingCard';
import CurrentSkeleton from './skeleton';

const Current: React.FC = () => {
    const [isRefreshing, setIsRefreshing] = useState(false);
    const { isSyncing } = useDashStore()

    const { data: currentReadings = [], error, isLoading, mutate } = useSWR('current-readings', fetchCurrentReadings, {
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
                const result = await fetchCurrentReadings();

                // Compare new data with previous data
                const isDataChanged = JSON.stringify(result) !== JSON.stringify(currentReadings);

                if (isDataChanged) {
                    toast.success('Current readings updated successfully');
                } else {
                    toast.success('Current readings already up to date');
                }

                return result;
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
        <div className="flex flex-col h-full justify-between gap-4">
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
