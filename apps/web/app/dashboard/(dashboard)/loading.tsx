import { LastReadNovelSkeleton } from "./_components/LastReadNovel/skeleton";
import { RecentReadingSkeleton } from "./_components/RecentReading/skeleton";
import { SourcesHeatmapSkeleton } from "./_components/SourcesHeatmap/skeleton";
import { StatsGridSkeleton } from "./_components/StatsGrid/skeleton";

export default function DashboardPageLoading() {
    return (
        <div className="space-y-6">
            <LastReadNovelSkeleton />
            <StatsGridSkeleton />
            <SourcesHeatmapSkeleton />
            <RecentReadingSkeleton />
        </div>
    );
}
