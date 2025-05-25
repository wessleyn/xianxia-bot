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
            {bookmarks.length > 0 ? (
                <div className="space-y-4">
                    {bookmarks.map((bookmark) => (
                        <BookmarkCard key={bookmark.id} bookmark={bookmark} />
                    ))}
                </div>
            ) : (
                <div className="flex flex-col items-center justify-center py-12 text-center">
                    <div className="w-16 h-16 mb-4 text-gray-300 dark:text-gray-600">
                        <svg xmlns="http://www.w3.org/2000/svg" className="w-full h-full" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                            <path d="M9 4h6a2 2 0 0 1 2 2v14l-5 -3l-5 3v-14a2 2 0 0 1 2 -2" />
                        </svg>
                    </div>
                    <h3 className="text-lg font-medium text-gray-700 dark:text-gray-300">No Bookmarks Found</h3>
                    <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                        Start adding bookmarks to your favorite novels<br />so you can easily find them later.
                    </p>
                    <button
                        className="mt-6 px-4 py-2 text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 rounded-md transition-colors"
                        onClick={handleRefresh}
                    >
                        Refresh Bookmarks
                    </button>
                </div>
            )}
        </div>
};

export default Bookmarks;
