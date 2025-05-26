"use server";

import { toast } from'react-hot-toast';
import { getCurrentUserId } from "@repo/auth/utils";
import { prisma } from "@repo/db";

export async function fetchSourcesData() {
    try {
        const sourcesData = await prisma.sourceVisit.findMany({
            where: {
                userId: await getCurrentUserId()
            },
            select: {
                count: true,
                source: {
                    select: {
                        name: true,
                        url: true
                    }
                }
            },
            orderBy: {
                count: 'desc'
            },
            take: 8
        });

            // TODO: allow the user to select the theme here
            // Generate a gradient of purple colors
            const colors = [
            "bg-purple-900", "bg-purple-800", "bg-purple-700", "bg-purple-600",
            "bg-purple-500", "bg-purple-400", "bg-purple-300", "bg-purple-200"
        ];

        return sourcesData.map((data, index) => ({
            site: data.source.name,
            visits: data.count,
            url: data.source.url,
            color: colors[index % colors.length] || "bg-purple-900" // Provide default color
        }));
    } catch (error) {
        console.error("Error fetching sources data:", error);
        toast.error("Error fetching sources data:");
        return [];
    }
}
