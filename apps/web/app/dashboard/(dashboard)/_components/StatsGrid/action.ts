"use server";

import { prisma } from "@repo/db";

export async function fetchReadingStats() {
    try {
        // Get streak (count of consecutive days with reading activity)
        const now = new Date();
        const oneWeekAgo = new Date(now);
        oneWeekAgo.setDate(now.getDate() - 7);

        // Group streak days by date
        const streakDays = await prisma.readStreak.groupBy({
            by: ['date'],
            where: {
                date: {
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

        streakDays.forEach(day => {
            const dateStr = new Date(day.date).toDateString();
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
                // Break on first day with no reading after finding a streak
                break;
            }
        }

        // Get total chapters read (count unique chapters with reading streaks)
        const chaptersRead = await prisma.readStreak.groupBy({
            by: ['chapterId'],
            _count: {
                id: true
            }
        });

        // Get time spent reading (in minutes)
        const timeSpent = await prisma.readStreak.aggregate({
            _sum: {
                minutesRead: true
            }
        });

        // Get bookmarks count
        const bookmarks = await prisma.bookmark.count();

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
                value: formatReadingTime(timeSpent._sum.minutesRead || 0)
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
