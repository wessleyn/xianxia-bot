import { faker } from "@faker-js/faker";
import type { Novel, NovelChapter } from "../../../generated/prisma";
import { prisma } from '../../../src/client';

export async function seedChapters(novels: Novel[]): Promise<Map<string, NovelChapter[]>> {
    console.log("Seeding chapters...");

    const novelChaptersMap = new Map<string, NovelChapter[]>();

    for (const novel of novels) {
        const chapterCount = faker.number.int({ min: 10, max: 50 });
        const chapters = await Promise.all(
            Array(chapterCount).fill(0).map(async (_, i) => {
                return prisma.novelChapter.create({
                    data: {
                        novelId: novel.id,
                        number: i + 1,
                        title: `Chapter ${i + 1}: ${faker.lorem.words({ min: 3, max: 6 })}`,
                        content: faker.lorem.paragraphs({ min: 10, max: 20 }),
                    }
                });
            })
        );

        novelChaptersMap.set(novel.id, chapters);
        console.log(`Created ${chapters.length} chapters for novel: ${novel.title}`);
    }

    return novelChaptersMap;
}
