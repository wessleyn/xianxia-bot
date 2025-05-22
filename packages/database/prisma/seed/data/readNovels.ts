import { faker } from "@faker-js/faker";
import type { Novel, NovelChapter } from "../../../generated/prisma";
import { prisma } from '../../../src/client';

export async function seedReadNovels(
    novels: Novel[],
    chaptersMap: Map<string, NovelChapter[]>,
    userId: string
): Promise<void> {
    console.log("Seeding reading records...");

    for (const novel of novels) {
        const chapters = chaptersMap.get(novel.id) || [];
        if (chapters.length === 0) continue;

        // For each novel, calculate how many chapters have been read (30-80%)
        const readChapterCount = Math.floor(chapters.length * faker.number.float({ min: 0.3, max: 0.8 }));

        // Sort chapters by number to make sure we read them in order
        const sortedChapters = [...chapters].sort((a, b) => a.number - b.number);
        const chaptersToRead = sortedChapters.slice(0, readChapterCount);

        // Create a reading record
        if (chaptersToRead.length > 0) {
            const lastChapter = chaptersToRead[chaptersToRead.length - 1];
            const previousChapter = chaptersToRead.length > 1 ? chaptersToRead[chaptersToRead.length - 2] : null;

            try {
                await prisma.readNovel.create({
                    data: {
                        userId,
                        novelId: novel.id,
                        currentChapterId: lastChapter.id,
                        previousChapterId: previousChapter?.id || null,
                        lastReadAt: faker.date.recent({ days: 7 }),
                    }
                });

                console.log(`Created reading record for novel: ${novel.title}`);
            } catch (error) {
                console.error(`Error creating read novel for: ${novel.title}`, error);
            }
        }
    }
}
