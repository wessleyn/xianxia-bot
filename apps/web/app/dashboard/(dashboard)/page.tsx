import type { Metadata } from "next";
import { Suspense } from "react";
import { LastReadNovel } from "./_components/LastReadNovel";
import { LastReadNovelSkeleton } from "./_components/LastReadNovel/skeleton";
import { RecentReading } from "./_components/RecentReading";
import { RecentReadingSkeleton } from "./_components/RecentReading/skeleton";
import { SourcesHeatmap } from "./_components/SourcesHeatmap";
import { SourcesHeatmapSkeleton } from "./_components/SourcesHeatmap/skeleton";
import { StatsGrid } from "./_components/StatsGrid";
import { StatsGridSkeleton } from "./_components/StatsGrid/skeleton";

export const metadata: Metadata = {
    title: "Dashboard | Xianxu",
    description: "Your personal dashboard for reading stats, recent novels, and more.",
};

export const dynamic = "force-dynamic"; // Force revalidation on every request

export default function Dashboard() {
    return (
        <div className="space-y-6">
            <Suspense fallback={<LastReadNovelSkeleton />}>
                <LastReadNovel />
            </Suspense>
            <Suspense fallback={<StatsGridSkeleton />}>

                <StatsGrid />
            </Suspense>
            <Suspense fallback={<SourcesHeatmapSkeleton />}>

                <SourcesHeatmap />
            </Suspense>
            <Suspense fallback={<RecentReadingSkeleton />}>

                <RecentReading />
            </Suspense>
        </div>
    );
}