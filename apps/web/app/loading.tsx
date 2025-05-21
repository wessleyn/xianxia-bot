import { Skeleton } from "@/app/_components/skeleton";
export default function DashboardLayoutLoading() {
    return (
        <div className="flex h-screen">
            {/* Sidebar Skeleton */}
            <div className="hidden w-64 border-r bg-background md:block">
                <div className="flex h-16 items-center border-b px-6">
                    <Skeleton className="h-8 w-[140px]" />
                </div>
                <div className="p-6 space-y-4">
                    <Skeleton className="h-6 w-[120px]" />
                    <div className="space-y-2">
                        {Array(5).fill(0).map((_, i) => (
                            <Skeleton key={i} className="h-10 w-full" />
                        ))}
                    </div>
                    <div className="pt-4">
                        <Skeleton className="h-6 w-[120px]" />
                        <div className="mt-2 space-y-2">
                            {Array(3).fill(0).map((_, i) => (
                                <Skeleton key={i} className="h-10 w-full" />
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Content Skeleton */}
            <div className="flex-1 p-8">
                <div className="mx-auto max-w-7xl">
                    <Skeleton className="h-12 w-[200px] mb-8" />
                    <div className="space-y-6">
                        <Skeleton className="h-[140px] w-full" />
                        <Skeleton className="h-[200px] w-full" />
                        <Skeleton className="h-[180px] w-full" />
                        <Skeleton className="h-[240px] w-full" />
                    </div>
                </div>
            </div>
        </div>
    );
}
