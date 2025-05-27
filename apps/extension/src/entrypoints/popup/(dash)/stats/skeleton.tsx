import ReadingActivitySkeleton from "./components/ReadingActivity/skeleton"
import ReadingInsightsSkeleton from "./components/ReadingInsights/skeleton"
import StatCardSkeleton from "./components/StatCard/skeleton"

const StatsSkeleton = () => {
    return (
        <div className="flex flex-col gap-4">
            <div className="flex justify-between items-center pb-2 border-b border-gray-200 dark:border-gray-700">
                <div className="h-8 w-48 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
                <div className="h-8 w-8 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
            </div>

            <div className="grid grid-cols-2 gap-4">
                {Array.from({ length: 4 }).map((_, index) => (
                    <StatCardSkeleton key={`${index}`} />
                ))}
            </div>

            <ReadingActivitySkeleton />
            <ReadingInsightsSkeleton />
        </div>
    )
}

export default StatsSkeleton