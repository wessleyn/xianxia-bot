"use server";

import { getCurrentUserId } from "@repo/auth/utils";
import { prisma } from "@repo/db";

export async function fetchLastReadNovel() {
    try {
        // Get the most recently read novel
        const lastRead = await prisma.readNovel.findFirst({
            where: {
                userId: await getCurrentUserId()
            },
            orderBy: {
                lastReadAt: 'desc'
            },
            include: {
                novel: true,
                currentChapter: true
            }
        });

        if (!lastRead) {
            return null;
        }

        // Calculate progress
        const totalChapters = await prisma.novelChapter.count({
            where: { novelId: lastRead.novelId }
        });

        const readChapters = await prisma.readStreak.groupBy({
            by: ['chapterId'],
            where: {
                chapter: {
                    novelId: lastRead.novelId
                }
            },
            _count: {
                id: true
            }
        });

        const progress = totalChapters > 0
            ? Math.round((readChapters.length / totalChapters) * 100)
            : 0;

        return {
            id: lastRead.novel.id,
            title: lastRead.novel.title,
            coverImage: lastRead.novel.coverImage,
            author: lastRead.novel.author,
            description: lastRead.novel.description,
            currentChapter: lastRead.currentChapter?.title || "Chapter 1",
            chapterNumber: lastRead.currentChapter?.number || 1,
            lastRead: formatLastRead(lastRead.lastReadAt),
            progress
        };
    } catch (error) {
        console.error("Error fetching last read novel:", error);
        return null;
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
