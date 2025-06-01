"use server";

import { getCurrentUserId } from "@repo/auth/utils";
import { prisma } from "@repo/db";
import { formatDistance } from "date-fns";

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
            select: {
                readingSourceUrl: true,
                novel: true,
                lastReadAt: true,
                currentChapter: true,
                novelId: true
            }
        });

        if (!lastRead) {
            return null;
        }

        // Calculate progress
        const totalChapters = await prisma.novelChapter.count({
            where: { novelId: lastRead.novelId }
        });

        const readChapters = await prisma.readChapter.groupBy({
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
            link: lastRead.readingSourceUrl,
            author: lastRead.novel.author,
            description: lastRead.novel.description,
            currentChapter: lastRead.currentChapter?.title || "Chapter 1",
            chapterNumber: lastRead.currentChapter?.number || 1,
            lastRead: formatDistance(new Date(lastRead.lastReadAt!), new Date()),
            progress
        };
    } catch (error) {
        console.error("Error fetching last read novel:", error);
        return null;
    }
}