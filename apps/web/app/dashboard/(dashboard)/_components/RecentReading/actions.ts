"use server";

import { getCurrentUserId } from "@repo/auth/utils";
import { prisma } from "@repo/db";

export async function fetchRecentNovels() {
    try {
        const novels = await prisma.readNovel.findMany({
            where: {
                userId: await getCurrentUserId()
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

                const readChapters = await prisma.readStreak.groupBy({
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

                // Format last read date
                const lastRead = formatLastRead(entry.lastReadAt);

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

function formatLastRead(date: Date): string {
    const now = new Date();
    const diff = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60 * 24));

    if (diff === 0) return "Today";
    if (diff === 1) return "Yesterday";
    if (diff < 7) return `${diff} days ago`;

    return date.toLocaleDateString();
}
