import TopNovelsSkeleton from "./(components)/TopNovelsThisWeek/skeleton";
import TrendingGenresSkeleton from "./(components)/TrendingGenres/skeleton";

export default function TrendingSkeleton() {
    return (
        <div className="container mx-auto px-4 py-16">
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
                <div className="lg:col-span-3">
                    <TopNovelsSkeleton />
                </div>
                <div className="lg:col-span-2">
                    <TrendingGenresSkeleton />
                </div>
            </div>
        </div>
    );
}