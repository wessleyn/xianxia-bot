import { faker } from "@faker-js/faker";
import type { Novel, NovelChapter } from "../../../generated/prisma";
import { prisma } from '../../../src/client';

export async function seedBookmarks(
    novels: Novel[],
    chaptersMap: Map<string, NovelChapter[]>,
    userId: string
): Promise<void> {
    console.log("Seeding bookmarks...");

    for (const novel of novels) {
        const chapters = chaptersMap.get(novel.id) || [];
        if (chapters.length === 0) continue;

        // Create some bookmarks (0-3 per novel)
        const bookmarkCount = faker.number.int({ min: 0, max: 3 });
        if (bookmarkCount > 0) {
            const randomChapters = faker.helpers.arrayElements(chapters, bookmarkCount);
            for (const chapter of randomChapters) {
                try {
                    await prisma.bookmark.create({
                        data: {
                            userId,
                            chapterId: chapter.id,
                            position: faker.number.int({ min: 1, max: 20 }),
                            note: faker.helpers.maybe(() => faker.lorem.sentence({ min: 2, max: 8 })),
                        }
                    });
                } catch (error) {
                    console.error(`Error creating bookmark for chapter ${chapter.id}`, error);
                }
            }

            console.log(`Created ${bookmarkCount} bookmarks for novel: ${novel.title}`);
        }
    }
}
