import { Skeleton } from "@/app/_components/skeleton";
import { LastReadNovelSkeleton } from "./dashboard/(dashboard)/_components/LastReadNovel/skeleton";

export default function DashboardLayoutLoading() {
    return (
        <div className="flex h-screen bg-gray-50 dark:bg-gray-900">
            {/* Sidebar Skeleton */}
            <div className="hidden w-64 border-r bg-background dark:bg-gray-800 md:block">
                <div className="flex h-16 items-center border-b px-6">
                    <Skeleton className="h-8 w-[140px]" />
                </div>
                <div className="p-6 space-y-4">
                    <Skeleton className="h-6 w-[120px]" />
                    <div className="space-y-2">
                        {Array(4).fill(0).map((_, i) => (
                            <Skeleton key={i} className="h-10 w-full rounded-md" />
                        ))}
                    </div>
                    <div className="pt-4">
                        <Skeleton className="h-6 w-[120px]" />
                        <div className="mt-2 space-y-2">
                            {Array(3).fill(0).map((_, i) => (
                                <Skeleton key={i} className="h-10 w-full rounded-md" />
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Content Area */}
            <div className="flex flex-col flex-1 overflow-hidden">
                {/* Header Skeleton */}
                <header className="flex flex-col border-b bg-white dark:bg-gray-800">
                    {/* Top part of header */}
                    <div className="flex h-16 items-center justify-between px-4 md:px-6">
                        <div className="flex items-center">
                            {/* Mobile menu button - only shows on mobile */}
                            <div className="block md:hidden mr-4">
                                <Skeleton className="h-8 w-8 rounded-md" />
                            </div>
                            <Skeleton className="h-8 w-[180px]" />
                        </div>

                        {/* Desktop search bar */}
                        <div className="hidden md:block flex-1 mx-10 max-w-xl">
                            <Skeleton className="h-10 w-full rounded-md" />
                        </div>

                        <div className="flex items-center gap-4">
                            <Skeleton className="h-8 w-8 rounded-full" />
                            <Skeleton className="h-8 w-8 rounded-full" />
                            <Skeleton className="h-10 w-10 rounded-full" />
                        </div>
                    </div>

                    {/* Mobile search bar */}
                    <div className="md:hidden px-4 pb-4">
                        <Skeleton className="h-10 w-full rounded-md" />
                    </div>
                </header>

                {/* Main Content Skeleton with Scroll */}
                <main className="flex-1 overflow-y-auto p-4 md:p-6">
                    <div className="mx-auto max-w-7xl">
                        <Skeleton className="h-12 w-[200px] mb-6" />

                        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4 mb-6">
                            {Array(4).fill(0).map((_, i) => (
                                <div key={i} className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm">
                                    <Skeleton className="h-4 w-[60%] mb-2" />
                                    <Skeleton className="h-8 w-[40%] mb-4" />
                                    <Skeleton className="h-2 w-full" />
                                </div>
                            ))}
                        </div>

                        {/* Last Read Novel Skeleton */}
                        <LastReadNovelSkeleton />

                        {/* Recent Activity Skeleton */}
                        <div className="mt-6 bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm">
                            <Skeleton className="h-8 w-[180px] mb-4" />
                            <div className="space-y-4">
                                {Array(5).fill(0).map((_, i) => (
                                    <div key={i} className="flex items-center gap-3">
                                        <Skeleton className="h-10 w-10 rounded-full" />
                                        <div className="flex-1">
                                            <Skeleton className="h-5 w-[60%] mb-2" />
                                            <Skeleton className="h-4 w-[40%]" />
                                        </div>
                                        <Skeleton className="h-5 w-[60px]" />
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
}
