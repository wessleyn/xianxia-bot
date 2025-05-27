import FilterBarSkeleton from './components/FilterBar/skeleton';
import NovelCardSkeleton from './components/NovelCard/skeleton';
import StorageUsageSkeleton from './components/StorageUsage/skeleton';

const DownloadSkeleton = () => {
    return (
        <div className="flex flex-col h-full animate-pulse">
            {/* Header skeleton */}
            <FilterBarSkeleton />

            <div className="space-y-4 flex-1">
                {[1, 2].map((i) => (
                    <NovelCardSkeleton key={i} />
                ))}
            </div>

            <StorageUsageSkeleton />
        </div>
    );
};

export default DownloadSkeleton;