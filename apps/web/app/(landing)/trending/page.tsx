import { Suspense } from 'react';
import TopNovelsThisWeek from './(components)/TopNovelsThisWeek';
import TopNovelsSkeleton from './(components)/TopNovelsThisWeek/skeleton';
import TrendingGenres from './(components)/TrendingGenres';
import TrendingGenresSkeleton from './(components)/TrendingGenres/skeleton';

export const metadata = {
  title: 'Trending | Xianxia',
  description: 'Discover trending cultivation novels and stories',
};

export default async function TrendingPage() {

  return (
    <div className="container mx-auto px-4 py-16">
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
        <Suspense fallback={<TopNovelsSkeleton />}>
          <TopNovelsThisWeek />
        </Suspense>
        <Suspense fallback={<TrendingGenresSkeleton />}>
          <TrendingGenres />
        </Suspense>
      </div>
    </div>
  );
}