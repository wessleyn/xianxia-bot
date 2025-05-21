import { Skeleton } from "@/app/_components/skeleton";

export function SourcesHeatmapSkeleton() {
    return (
        <div className="rounded-lg bg-card p-6 shadow-sm">
            <Skeleton className="h-6 w-[180px] mb-4" />
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {Array(8).fill(0).map((_, i) => (
                    <Skeleton key={i} className="h-[60px] w-full rounded-md" />
                ))}
            </div>
        </div>
    );
}
