import { IconRefresh } from '@tabler/icons-react';
import { Suspense, useState } from 'react';
import { toast } from 'react-hot-toast';
import useSWR from 'swr';
import useDashStore from '../../stores/useDashStore';
import { DEFAULT_STATE, deleteDownloadedNovel, getDownloadedNovelsFromStorage, NovelData, recalculateDownloadedNovels } from './action';
import DownloadsEmptyState from './components/EmptyState';
import FilterBar from './components/FilterBar';
import NovelCard from './components/NovelCard';
import StorageUsage from './components/StorageUsage';
import StorageUsageSkeleton from './components/StorageUsage/skeleton';
import DownloadSkeleton from './skeleton';

const Downloads = () => {
    const [activeFilter, setActiveFilter] = useState<'all' | 'recent' | 'size'>('all');
    const { isSyncing } = useDashStore();
    const [isRefreshing, setIsRefreshing] = useState(false);

    const { data: novels = DEFAULT_STATE.novels, error, isLoading, mutate } = useSWR('downloaded-novels', getDownloadedNovelsFromStorage, {
        revalidateOnFocus: false,
        onError: (err) => {
            console.error('Error loading downloaded novels:', err);
            toast.error('Failed to load downloads');
        }
    });

    const toggleExpand = (id: number) => {
        mutate(
            novels.map((novel: NovelData) =>
                novel.id === id ? { ...novel, isExpanded: !novel.isExpanded } : novel
            ),
            { revalidate: false }
        );
    };

    const deleteDownload = async (id: number) => {
        try {
            const result = await deleteDownloadedNovel(id);
            if (result.success) {
                mutate(novels.filter((novel: NovelData) => novel.id !== id), { revalidate: false });
                toast.success('Novel deleted successfully');
            } else {
                toast.error(result.error || 'Failed to delete novel');
            }
        } catch (err) {
            toast.error('Error deleting novel');
            console.error('Error deleting novel:', err);
        }
    };

    const handleRefresh = async () => {
        try {
            setIsRefreshing(true);

            // Use mutate to update the data
            await mutate(async () => {
                const result = await recalculateDownloadedNovels();
                if (result.error) {
                    toast.error(result.error);
                    return novels; // Return previous downloads on error
                }

                // Compare new data with previous data
                const isDataChanged = JSON.stringify(result.data) !== JSON.stringify(novels);

                if (isDataChanged) {
                    toast.success('Downloaded novels updated successfully');
                } else {
                    toast.success('Downloaded novels already up to date');
                }

                return result.data;
            }, {
                revalidate: false // We don't need to revalidate since we're already updating the data
            });
        } catch (err) {
            toast.error('Error refreshing downloads: ' + (err instanceof Error ? err.message : 'Unknown error'));
        } finally {
            setIsRefreshing(false);
        }
    };

    const filteredNovels = () => {
        switch (activeFilter) {
            case 'recent':
                return [...novels].sort((a, b) =>
                    b.downloadOrder - a.downloadOrder
                );
            case 'size':
                return [...novels].sort((a, b) =>
                    parseFloat(b.totalSize) - parseFloat(a.totalSize)
                );
            default:
                return novels;
        }
    }

    if (error) toast.error(String(error));

    return (isLoading || isRefreshing || isSyncing) ?
        <DownloadSkeleton />
        : 
            <div className="flex flex-col h-full">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-bold text-gray-800 dark:text-gray-200">Downloaded Novels</h2>
                    <div className="flex items-center gap-2">
                        <button
                            onClick={handleRefresh}
                            className="p-1 text-gray-500 hover:text-indigo-600 dark:text-gray-400 dark:hover:text-indigo-400"
                            disabled={isRefreshing}
                        >
                            <IconRefresh
                                className={`w-5 h-5 ${isRefreshing ? 'animate-spin' : ''}`}
                                strokeWidth={1.5} stroke="currentColor"

                            />
                        </button>
                        <FilterBar activeFilter={activeFilter} setActiveFilter={setActiveFilter} />
                    </div>
                </div>

                <div className="flex-1 overflow-auto pr-1 custom-scrollbar">
                    {novels.length > 0 ? (
                        <div className="space-y-3">
                            {filteredNovels().map((novel) => (
                                <NovelCard
                                    key={novel.id}
                                    novel={novel}
                                    toggleExpand={toggleExpand}
                                    deleteDownload={deleteDownload}
                                />
                            ))}
                        </div>
                    ) : (
                        <DownloadsEmptyState />
                    )}
                </div>

            {novels.length > 0 && (
                <Suspense fallback={<StorageUsageSkeleton />}>
                    <StorageUsage />
                </Suspense>
            )}
            </div>
};

export default Downloads;
