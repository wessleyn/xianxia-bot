'use server';

import { prisma } from '@repo/db';


export type TrendingGenre = {
  name: string;
  count: number;
};

/**
 * Get trending genres based on reading activity
 */
export async function getTrendingGenres(): Promise<TrendingGenre[]> {
  try {
    const oneWeekAgo = new Date();
    oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);

    // Find novels with recent reading activity
    const recentlyReadNovels = await prisma.readNovel.findMany({
      where: {
        lastReadAt: {
          gte: oneWeekAgo
        }
      },
      select: {
        id: true,
        novel: {
          select: {
            genre: true
          }
        }
      },
      distinct: ['novelId']
    });

    // Count genre occurrences
    const genreCounts: Record<string, number> = {};

    recentlyReadNovels.forEach(read => {
      if (read.novel.genre) {
        read.novel.genre.forEach(genre => {
          genreCounts[genre] = (genreCounts[genre] || 0) + 1;
        });
      }
    });

    // Convert to array, sort by count, and take top 10 directly in the query
    const trendingGenres = Object.entries(genreCounts)
      .map(([name, count]) => ({ name, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 10);

    return trendingGenres;
  } catch (error) {
    console.error("Failed to fetch trending genres:", error);
    return [];
  }
}