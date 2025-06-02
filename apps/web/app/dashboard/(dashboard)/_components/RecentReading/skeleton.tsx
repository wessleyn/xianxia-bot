import { Skeleton } from "@/app/_components/skeleton";

export function RecentReadingSkeleton() {
    return (
        <div className="rounded-lg bg-card  dark:bg-gray-800  p-6 shadow-sm">
            <Skeleton className="h-6 w-[180px] mb-4" />
            <div className="space-y-4">
                {Array(4).fill(0).map((_, i) => (
                    <div key={i} className="flex items-center gap-4 py-2">
                        <Skeleton className="h-16 w-12 rounded-sm" />
                        <div className="space-y-2 flex-1">
                            <Skeleton className="h-5 w-[60%]" />
                            <Skeleton className="h-4 w-[30%]" />
                            <Skeleton className="h-2 w-full" />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
