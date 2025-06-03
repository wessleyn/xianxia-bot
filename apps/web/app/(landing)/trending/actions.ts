'use server';


// Helper function to create a delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

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

export type TrendingGenre = {
    name: string;
    count: number;
};

/**
 * Get top novels based on reading activity from the past week
 */
export async function getTopNovelsThisWeek(): Promise<TrendingNovel[]> {
    // Add a 5-second delay to demonstrate loading state
    await delay(5000);

    // In a real implementation, this would use Prisma to query the database
    // For now, we'll return mock data structured like it would come from ReadNovel model

    const oneWeekAgo = new Date();
    oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);

    try {
        // This is where you would write a real Prisma query using the db client
        // Example (commented out) of what the actual query might look like:

        /*
        const readings = await db.readNovel.findMany({
          where: {
            lastReadAt: {
              gte: oneWeekAgo
            }
          },
          include: {
            novel: true,
            bookmarks: true,
          },
          orderBy: {
            lastReadAt: 'desc',
          },
          take: 5,
        });
    
        return readings.map(reading => ({
          id: reading.novel.id,
          title: reading.novel.title,
          author: reading.novel.author,
          coverUrl: reading.novel.coverUrl,
          description: reading.novel.description,
          tags: reading.novel.tags,
          rating: reading.rating || 0,
          readCount: reading._count.readChapter,
          bookmarkCount: reading._count.bookmarks,
          url: `/novel/${reading.novel.id}`,
        }));
        */

        // Mock data for development
        return [
            {
                id: "novel-1",
                title: "Immortal Mountain",
                author: "Dao Master Chen",
                description: "A young cultivator discovers an ancient mountain with secrets that could change the cultivation world forever.",
                coverUrl: "https://via.placeholder.com/300x450",
                tags: ["Cultivation", "Adventure", "Romance", "Mystery"],
                rating: 4.7,
                readCount: 12435,
                bookmarkCount: 874,
                url: "/novel/immortal-mountain"
            },
            {
                id: "novel-2",
                title: "Path to Ascension",
                author: "Heavenly Scribe",
                description: "Follow the journey of Lin Feng as he climbs the ranks of cultivation and challenges the heavens themselves.",
                coverUrl: "https://via.placeholder.com/300x450",
                tags: ["Cultivation", "Action", "Fantasy", "Martial Arts"],
                rating: 4.5,
                readCount: 9864,
                bookmarkCount: 632,
                url: "/novel/path-to-ascension"
            },
            {
                id: "novel-3",
                title: "Nine Heavens Sword Saint",
                author: "Sword Dreamer",
                description: "The tale of a young blacksmith who forges a legendary sword, beginning his journey to become the greatest sword cultivator.",
                coverUrl: "https://via.placeholder.com/300x450",
                tags: ["Cultivation", "Swordplay", "Fantasy", "Crafting"],
                rating: 4.8,
                readCount: 7853,
                bookmarkCount: 598,
                url: "/novel/nine-heavens-sword-saint"
            }
        ];
    } catch (error) {
        console.error("Failed to fetch top novels:", error);
        return [];
    }
}

/**
 * Get trending genres based on reading activity
 */
export async function getTrendingGenres(): Promise<TrendingGenre[]> {
    // Add a 5-second delay to demonstrate loading state
    await delay(5000);

    // In a real implementation, this would aggregate tags from the ReadNovel model

    try {
        // Example (commented out) of what the actual query might look like:

        /*
        const oneWeekAgo = new Date();
        oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
        
        // This would be a more complex query with grouping and counting
        const genreCounts = await db.$queryRaw`
          SELECT 
            unnest(n.tags) as genre, 
            COUNT(*) as count
          FROM 
            "ReadNovel" r
          JOIN 
            "Novel" n ON r."novelId" = n.id
          WHERE 
            r."lastReadAt" >= ${oneWeekAgo}
          GROUP BY 
            genre
          ORDER BY 
            count DESC
          LIMIT 10
        `;
        
        return genreCounts.map((genre: any) => ({
          name: genre.genre,
          count: Number(genre.count)
        }));
        */

        // Mock data for development
        return [
            { name: "Cultivation", count: 2437 },
            { name: "Martial Arts", count: 1853 },
            { name: "Romance", count: 1542 },
            { name: "Alchemy", count: 1246 },
            { name: "Reincarnation", count: 1125 },
            { name: "System", count: 987 },
            { name: "Sect", count: 876 },
            { name: "Hidden Realm", count: 742 }
        ];
    } catch (error) {
        console.error("Failed to fetch trending genres:", error);
        return [];
    }
}