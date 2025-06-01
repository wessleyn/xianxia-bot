"use server";

import { getCurrentUserId } from "@repo/auth/utils";
import { prisma } from "@repo/db";

export async function fetchReadingStats() {
    try {
        const userId = await getCurrentUserId();

        // Get streak (count of consecutive days with reading activity)
        const now = new Date();
        const oneWeekAgo = new Date(now);
        oneWeekAgo.setDate(now.getDate() - 7);

        // Group reading activity by date
        const streakDays = await prisma.readChapter.groupBy({
            by: ['lastReadAt'],
            where: {
                reading: {
                    userId
                },
                lastReadAt: {
                    gte: oneWeekAgo
                }
            },
            _count: {
                id: true
            }
        });

        // Count consecutive days
        let streak = 0;
        const dateMap = new Map();

        streakDays.forEach((day) => {
            const dateStr = new Date(day.lastReadAt).toDateString();
            dateMap.set(dateStr, true);
        });

        // Count consecutive days from today backwards
        for (let i = 0; i < 7; i++) {
            const checkDate = new Date(now);
            checkDate.setDate(now.getDate() - i);
            const checkDateStr = checkDate.toDateString();

            if (dateMap.has(checkDateStr)) {
                streak++;
            } else if (streak > 0) {
                break;
            }
        }

        // Get total chapters read (count unique chapters)
        const chaptersRead = await prisma.readChapter.groupBy({
            by: ['chapterId'],
            where: {
                reading: {
                    userId
                }
            },
            _count: {
                id: true
            }
        });

        // Get time spent reading (estimate based on chapters read)
        // Since we don't have minutesRead field, we'll estimate 10 minutes per chapter
        const totalChapters = await prisma.readChapter.count({
            where: {
                reading: {
                    userId
                }
            }
        });
        const estimatedMinutes = totalChapters * 10; // Estimating 10 minutes per chapter

        // Get bookmarks count
        const bookmarks = await prisma.bookmark.count({
            where: {
                readingNovel: {
                    userId
                }
            }
        });

        return [
            {
                name: "Reading Streak",
                value: `${streak} days`
            },
            {
                name: "Chapters Read",
                value: chaptersRead.length.toString()
            },
            {
                name: "Time Spent Reading",
                value: formatReadingTime(estimatedMinutes)
            },
            {
                name: "Bookmarks",
                value: bookmarks.toString()
            }
        ];
    } catch (error) {
        console.error("Error fetching reading stats:", error);
        return [
            { name: "Reading Streak", value: "0 days" },
            { name: "Chapters Read", value: "0" },
            { name: "Time Spent Reading", value: "0 hrs" },
            { name: "Bookmarks", value: "0" },
        ];
    }
}

function formatReadingTime(minutes: number): string {
    if (minutes < 60) {
        return `${minutes} mins`;
    }

    const hours = Math.floor(minutes / 60);
    return `${hours} hrs`;
}
