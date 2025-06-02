import { Skeleton } from "@/app/_components/skeleton";

export function StatsGridSkeleton() {
    return (
        <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
            {Array(4).fill(0).map((_, i) => (
                <div key={i} className="rounded-lg  bg-card dark:bg-gray-800 p-6 shadow-sm">
                    <Skeleton className="h-5 w-[100px] mb-2" />
                    <Skeleton className="h-8 w-[80px]" />
                </div>
            ))}
        </div>
    );
}
