"use server";

import { getCurrentUserId } from "@repo/auth/utils";
import { prisma } from "@repo/db";

export async function fetchSourcesData() {
    try {
        // Get all read streaks with their associated chapters and novels
        const readStreaks = await prisma.readStreak.findMany({
            where: {
                userId: await getCurrentUserId()
            },
            include: {
                chapter: {
                    include: {
                        novel: true
                    }
                }
            }
        });

        // Count by novel title to create a heatmap of reading activity
        const novelCounts: { [key: string]: number } = {};

        readStreaks.forEach(streak => {
            const novelTitle = streak.chapter.novel.title;
            novelCounts[novelTitle] = (novelCounts[novelTitle] || 0) + 1;
        });

        // Convert to array and sort by count
        const sortedNovels = Object.entries(novelCounts)
            .map(([site, visits]) => ({ site, visits }))
            .sort((a, b) => b.visits - a.visits)
            .slice(0, 8);

        // Generate a gradient of purple colors
        const colors = [
            "bg-purple-900", "bg-purple-800", "bg-purple-700", "bg-purple-600",
            "bg-purple-500", "bg-purple-400", "bg-purple-300", "bg-purple-200"
        ];

        return sortedNovels.map((source, index) => ({
            site: source.site,
            visits: source.visits,
            color: colors[index % colors.length] || "bg-purple-900" // Provide default color
        }));
    } catch (error) {
        console.error("Error fetching sources data:", error);
        return [];
    }
}
