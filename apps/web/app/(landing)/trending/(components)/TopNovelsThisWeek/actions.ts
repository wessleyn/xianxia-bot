'use server';

import { prisma } from '@repo/db';

export type TrendingNovel = {
    id: string;
    title: string;
    author: string;
    coverUrl: string;
    description: string;
    tags: string[];
    rating: number;
    readCount: number;
    bookmarkCount: number;
    url: string;
};

/**
 * Get top novels based on reading activity from the past week
 */
export async function getTopNovelsThisWeek(): Promise<TrendingNovel[]> {
    const oneWeekAgo = new Date();
    oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);

    try {
        // Get top novels with reads in the last week
        const readStats = await prisma.readNovel.groupBy({
            by: ['novelId'],
            where: {
                lastReadAt: {
                    gte: oneWeekAgo
                }
            },
            _count: true,
            orderBy: {
                _count: {
                    id: 'desc'
                }
            },
            take: 10
        });

        const topNovels = await Promise.all(
            readStats.map(async (stat) => {
                // Get novel with related read data in a single query
                const novel = await prisma.novel.findUnique({
                    where: { id: stat.novelId },
                    include: {
                        readers: {
                            where: {
                                lastReadAt: {
                                    gte: oneWeekAgo
                                }
                            }
                        }
                    }
                });

                if (!novel) return null;

                // Calculate average rating from included readers data
                const ratings = novel.readers
                    .map(reader => reader.rating)
                    .filter((rating): rating is number => rating !== null);

                const avgRating = ratings.length > 0
                    ? ratings.reduce((sum: number, rating: number) => sum + rating, 0) / ratings.length
                    : 0;

                // Ensure we have a valid number for rating
                const validRating = !isNaN(avgRating) ? parseFloat(avgRating.toFixed(1)) : 0;

                // Get bookmark count
                const bookmarkCount = await prisma.bookmark.count({
                    where: {
                        readingNovel: {
                            novelId: stat.novelId
                        },
                        createdAt: {
                            gte: oneWeekAgo
                        }
                    }
                });

                return {
                    id: novel.id,
                    title: novel.title,
                    author: novel.author,
                    coverUrl: novel.coverImage || '',
                    description: novel.description,
                    tags: novel.genre || [],
                    rating: validRating,
                    readCount: stat._count,
                    bookmarkCount,
                    url: `/novel/${novel.id}`
                };
            })
        );

        return topNovels.filter((novel): novel is TrendingNovel => novel !== null);
    } catch (error) {
        console.error("Failed to fetch top novels:", error);
        return [];
    }
}