import { Skeleton } from "@/app/_components/skeleton";
import { LastReadNovelSkeleton } from "./(dashboard)/_components/LastReadNovel/skeleton";

export default function DashboardLoading() {
    return (
        <>
            <Skeleton className="h-10 w-[180px] mb-6" />

            {/* Stats Cards */}
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 mb-6">
                {Array(4).fill(0).map((_, i) => (
                    <div key={i} className="bg-white dark:bg-gray-800 p-5 rounded-lg shadow-sm">
                        <Skeleton className="h-4 w-[60%] mb-2" />
                        <Skeleton className="h-8 w-[40%] mb-2" />
                        <Skeleton className="h-2 w-full" />
                    </div>
                ))}
            </div>

            {/* Last Read Novel Section */}
            <div className="mb-6">
                <LastReadNovelSkeleton />
            </div>

            {/* Recent Activity Section */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
                <Skeleton className="h-6 w-[150px] mb-4" />
                <div className="space-y-4">
                    {Array(5).fill(0).map((_, i) => (
                        <div key={i} className="flex items-center gap-3">
                            <Skeleton className="h-10 w-10 rounded-full flex-shrink-0" />
                            <div className="flex-1">
                                <Skeleton className="h-5 w-[70%] mb-1" />
                                <Skeleton className="h-4 w-[40%]" />
                            </div>
                            <Skeleton className="h-5 w-[60px] flex-shrink-0" />
                        </div>
                    ))}
                </div>
            </div>

            {/* Recent Updates Section */}
            <div className="mt-6 bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
                <Skeleton className="h-6 w-[180px] mb-4" />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {Array(2).fill(0).map((_, i) => (
                        <div key={i} className="border dark:border-gray-700 rounded-md p-4">
                            <Skeleton className="h-5 w-[80%] mb-2" />
                            <Skeleton className="h-4 w-full mb-3" />
                            <Skeleton className="h-4 w-[90%] mb-3" />
                            <Skeleton className="h-4 w-[70%]" />
                            <div className="flex justify-between items-center mt-4">
                                <Skeleton className="h-4 w-[100px]" />
                                <Skeleton className="h-8 w-[80px] rounded-md" />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
}
