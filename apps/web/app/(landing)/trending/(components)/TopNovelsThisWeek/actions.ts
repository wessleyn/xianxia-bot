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