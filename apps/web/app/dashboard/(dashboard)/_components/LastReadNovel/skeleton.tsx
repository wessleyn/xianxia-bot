import { Skeleton } from "@/app/_components/skeleton";

export function LastReadNovelSkeleton() {
    return (
        <div className="rounded-lg  bg-card  dark:bg-gray-800  p-6 shadow-sm">
            <Skeleton className="h-6 w-[180px] mb-4" />
            <div className="flex flex-col md:flex-row gap-4">
                <Skeleton className="h-[220px] w-[160px] rounded-md" />
                <div className="flex-1 space-y-4">
                    <Skeleton className="h-8 w-[70%]" />
                    <Skeleton className="h-4 w-[40%]" />
                    <Skeleton className="h-4 w-[60%]" />
                    <div className="pt-2">
                        <Skeleton className="h-10 w-[120px]" />
                    </div>

                    <div className="pt-2">
                        <div className="flex items-center justify-between mb-1">
                            <Skeleton className="h-4 w-[100px]" />
                            <Skeleton className="h-4 w-[30px]" />
                        </div>
                        <Skeleton className="h-2.5 w-full rounded-full" />
                    </div>
                </div>
            </div>
        </div>
    );
}
