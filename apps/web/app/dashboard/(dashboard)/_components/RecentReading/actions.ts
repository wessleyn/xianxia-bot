"use server";

import { getCurrentUserId } from "@repo/auth/utils";
import { prisma } from "@repo/db";
import { formatDistance } from "date-fns";

export async function fetchRecentNovels() {
    try {
        const novels = await prisma.readNovel.findMany({
            where: {
                userId: await getCurrentUserId(),
                lastReadAt: {
                    not: null
                }
            },
            orderBy: {
                lastReadAt: 'desc'
            },
            take: 4,
            include: {
                novel: true
            }
        });

        // Calculate progress for each novel
        const novelsWithProgress = await Promise.all(
            novels.map(async (entry) => {
                const totalChapters = await prisma.novelChapter.count({
                    where: { novelId: entry.novelId }
                });

                const readChapters = await prisma.readChapter.groupBy({
                    by: ['chapterId'],
                    where: {
                        chapter: {
                            novelId: entry.novelId
                        }
                    },
                    _count: {
                        id: true
                    }
                });

                const progress = totalChapters > 0
                    ? Math.round((readChapters.length / totalChapters) * 100)
                    : 0;

                const lastRead = formatDistance(new Date(entry.lastReadAt!), new Date());

                return {
                    id: entry.novel.id,
                    title: entry.novel.title,
                    coverImage: entry.novel.coverImage,
                    lastRead,
                    progress
                };
            })
        );

        return novelsWithProgress;
    } catch (error) {
        console.error("Error fetching recent novels:", error);
        return [];
    }
}
