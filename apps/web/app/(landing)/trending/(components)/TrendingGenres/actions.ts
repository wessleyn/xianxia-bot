'use server';

// Helper function to create a delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export type TrendingGenre = {
    name: string;
    count: number;
};

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