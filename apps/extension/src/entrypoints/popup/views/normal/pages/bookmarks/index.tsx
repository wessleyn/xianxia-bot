import { useState } from 'react';
import toast from 'react-hot-toast';
import useSWR from 'swr';
import useDashStore from '../../stores/useDashStore';
import { DEFAULT_CURRENT_BOOKMARKS, getBookmarksFromStorage, reCalcBookmarks } from './action';
import BookmarkCard from './components/BookmarkCard';
import BookmarkHeader from './components/BookmarkHeader';
import BookMarksSkeleton from './skeleton';

const Bookmarks = () => {
    const [isRefreshing, setIsRefreshing] = useState(false);
    const { isSyncing } = useDashStore()
    const { data: bookmarks = DEFAULT_CURRENT_BOOKMARKS, error, isLoading, mutate } = useSWR('current-bookmarks', getBookmarksFromStorage, {
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
                if (result.error) {
                    toast.error(result.error);
                    return bookmarks; // Return previous bookmarks on error
                }

                // Compare new data with previous data
                const isDataChanged = JSON.stringify(result.data) !== JSON.stringify(bookmarks);

                if (isDataChanged) {
                    toast.success('Current bookmarks updated successfully');
                } else {
                    toast.success('Current bookmarks already up to date');
                }

                return result.data;
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
        <div className="flex flex-col gap-4">
            <BookmarkHeader onRefresh={handleRefresh} isRefreshing={isRefreshing} />
            <div className="space-y-4">
                {bookmarks.map((bookmark) => (
                    <BookmarkCard key={bookmark.id} bookmark={bookmark} />
                ))}
            </div>
        </div>
};

export default Bookmarks;
