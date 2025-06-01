import { useState } from 'react';
import toast from 'react-hot-toast';
import useSWR from 'swr';
import useDashStore from '../../stores/useDashStore';
import { reCalcBookmarks } from './action';
import BookmarkCard from './components/BookmarkCard';
import BookmarkHeader from './components/BookmarkHeader';
import BookmarksEmptyState from './components/EmptyState';
import BookMarksSkeleton from './skeleton';

const Bookmarks = () => {
    const [isRefreshing, setIsRefreshing] = useState(false);
    const { isSyncing } = useDashStore()
    const { data: bookmarks = [], error, isLoading, mutate } = useSWR('current-bookmarks', reCalcBookmarks, {
        revalidateOnFocus: false,
        onError: (err) => {
            console.error('Error loading current bookmarks:', err);
            toast.error('Failed to load current bookmarks');
        }
    });

    const handleRefresh = async () => {
        try {
            setIsRefreshing(true);

            // Use mutate to update the data
            await mutate(async () => {
                const result = await reCalcBookmarks();

                // Compare new data with previous data
                const isDataChanged = JSON.stringify(result) !== JSON.stringify(bookmarks);

                if (isDataChanged) {
                    toast.success('Current bookmarks updated successfully');
                } else {
                    toast.success('Current bookmarks already up to date');
                }

                return result;
            }, {
                revalidate: false // We don't need to revalidate since we're already updating the data
            });
        } catch (err) {
            toast.error('Error refreshing current bookmarks: ' + (err instanceof Error ? err.message : 'Unknown error'));
        } finally {
            setIsRefreshing(false);
        }
    };

    if (error) toast.error(String(error));

    return (isLoading || isRefreshing || isSyncing) ? <BookMarksSkeleton />
        :
        <div className="flex flex-col gap-4 h-full">
            <BookmarkHeader onRefresh={handleRefresh} isRefreshing={isRefreshing} />
            {bookmarks.length > 0 ? (
                <div className="space-y-4">
                    {bookmarks.map((bookmark) => (
                        <BookmarkCard key={bookmark.id} bookmark={bookmark} />
                    ))}
                </div>
            ) : (
               <BookmarksEmptyState />
            )}
        </div>
};

export default Bookmarks;
