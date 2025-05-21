import { faker } from "@faker-js/faker";
import type { Novel, NovelChapter } from "../../../generated/prisma";
import { prisma } from '../../../src/client';

export async function seedReadStreaks(
    novels: Novel[],
    chaptersMap: Map<string, NovelChapter[]>,
    userId: string
): Promise<void> {
    console.log("Seeding reading streaks...");

    for (const novel of novels) {
        const chapters = chaptersMap.get(novel.id) || [];
        if (chapters.length === 0) continue;

        // Calculate read chapter count (30-80%)
        const readChapterCount = Math.floor(chapters.length * faker.number.float({ min: 0.3, max: 0.8 }));

        // Sort chapters by number
        const sortedChapters = [...chapters].sort((a, b) => a.number - b.number);
        const chaptersToRead = sortedChapters.slice(0, readChapterCount);

        // Create read streaks for each chapter
        const now = new Date();

        for (let i = 0; i < chaptersToRead.length; i++) {
            const chapter = chaptersToRead[i];

            // Start with older dates for earlier chapters
            const daysAgo = chaptersToRead.length - i - 1;
            const readAt = new Date(now);
            readAt.setDate(now.getDate() - daysAgo);

            try {
                // Create read streak entry
                await prisma.readStreak.create({
                    data: {
                        userId,
                        chapterId: chapter.id,
                        date: readAt,
                        minutesRead: faker.number.int({ min: 15, max: 120 }),
                    }
                });
            } catch (error) {
                console.error(`Error creating read streak for chapter ${chapter.id}`, error);
            }
        }

        console.log(`Created read streaks for novel: ${novel.title}`);
    }
}
