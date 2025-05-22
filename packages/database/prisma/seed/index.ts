import { faker } from "@faker-js/faker";
import type { Novel } from "../../generated/prisma";
import { prisma } from '../../src/client';

// Type for novel chapter with its common properties
type NovelChapterWithRelations = {
    id: string;
    novelId: string;
    number: number;
    title: string;
    content: string;
};

// =========== SEED NOVELS ===========
async function seedNovels(): Promise<Novel[]> {
    console.log("Seeding novels...");

    // Create 10 novels
    const novels = await Promise.all(
        Array(10).fill(0).map(async (_, i) => {
            return prisma.novel.create({
                data: {
                    title: i === 0 ? "The Path to Ascension" :
                        i === 1 ? "Eternal Sacred Mountain" :
                            i === 2 ? "Nine Dragons Emperor" :
                                i === 3 ? "Martial Peak" :
                                    faker.commerce.productName(),
                    author: faker.person.fullName(),
                    description: faker.lorem.paragraphs({ min: 2, max: 3 }),
                    coverImage: `/novels/cover-${i + 1}.jpg`,
                    genre: [faker.word.sample(), faker.word.sample(), faker.word.sample()],
                    publishedAt: faker.date.past({ years: 2 }),
                }
            });
        })
    );

    console.log(`Created ${novels.length} novels`);
    return novels;
}

// =========== SEED CHAPTERS ===========
async function seedChapters(novels: Novel[]): Promise<Map<string, NovelChapterWithRelations[]>> {
    console.log("Seeding chapters...");

    const chaptersMap = new Map<string, NovelChapterWithRelations[]>();

    // Create chapters for each novel (10-50 chapters per novel)
    for (const novel of novels) {
        const chapterCount = faker.number.int({ min: 10, max: 20 }); // Reduced max chapter count
        const chapters: NovelChapterWithRelations[] = [];

        // Create chapters sequentially instead of all at once
        for (let i = 0; i < chapterCount; i++) {
            try {
                const chapter = await prisma.novelChapter.create({
                    data: {
                        novelId: novel.id,
                        number: i + 1,
                        title: `Chapter ${i + 1}: ${faker.lorem.words({ min: 3, max: 6 })}`,
                        content: faker.lorem.paragraphs({ min: 5, max: 10 }), // Reduced content size
                    }
                });

                // Map to our expected type
                chapters.push({
                    id: chapter.id,
                    novelId: chapter.novelId,
                    number: chapter.number,
                    title: chapter.title,
                    content: chapter.content
                });

                // Log progress every 5 chapters
                if ((i + 1) % 5 === 0 || i === 0) {
                    console.log(`Novel: ${novel.title} - Created chapter ${i + 1}/${chapterCount}`);
                }
            } catch (error) {
                console.error(`Error creating chapter ${i + 1} for novel ${novel.title}:`, error);
            }
        }

        chaptersMap.set(novel.id, chapters);
        console.log(`Completed ${chapters.length} chapters for novel: ${novel.title}`);
    }

    return chaptersMap;
}

// =========== SEED READ NOVELS ===========
async function seedReadNovels(
    novels: Novel[],
    chaptersMap: Map<string, NovelChapterWithRelations[]>,
    userId: string
): Promise<void> {
    console.log("Seeding read novels...");

    for (const novel of novels) {
        const chapters = chaptersMap.get(novel.id) || [];
        if (chapters.length === 0) continue;

        // Calculate how many chapters the user has read
        const readChapterCount = Math.floor(chapters.length * faker.number.float({ min: 0.3, max: 0.8 }));
        if (readChapterCount === 0) continue;

        // Sort chapters by number to ensure we read them in order
        const sortedChapters = [...chapters].sort((a, b) => a.number - b.number);
        const chaptersToRead = sortedChapters.slice(0, readChapterCount);

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

// =========== SEED READ STREAKS ===========
async function seedReadStreaks(
    novels: Novel[],
    chaptersMap: Map<string, NovelChapterWithRelations[]>,
    userId: string
): Promise<void> {
    console.log("Seeding read streaks...");

    for (const novel of novels) {
        const chapters = chaptersMap.get(novel.id) || [];
        if (chapters.length === 0) continue;

        // Calculate how many chapters the user has read
        const readChapterCount = Math.floor(chapters.length * faker.number.float({ min: 0.3, max: 0.8 }));
        if (readChapterCount === 0) continue;

        // Sort chapters by number to ensure we read them in order
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

// =========== SEED BOOKMARKS ===========
async function seedBookmarks(
    novels: Novel[],
    chaptersMap: Map<string, NovelChapterWithRelations[]>,
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

// =========== MAIN SEED FUNCTION ===========
async function main() {
    console.log("Starting main seed process...");

    try {
        // Clean up existing data in reverse order of dependencies
        await prisma.readStreak.deleteMany();
        await prisma.bookmark.deleteMany();
        await prisma.readNovel.deleteMany();
        await prisma.novelChapter.deleteMany();
        await prisma.novel.deleteMany();

        // Find user by email
        const user = await prisma.users.findFirst({
            where: {
                email: 'wessleynyakaz@gmail.com'
            }
        });

        if (!user) {
            throw new Error('You dont exist :) Please Login.');
        }

        const userId = user.id;
        console.log(`Found user with email: ${user.email} (ID: ${userId})`);

        // Seed novels
        const novels = await seedNovels();

        // Seed chapters for each novel
        const chaptersMap = await seedChapters(novels);

        // Seed read novels
        await seedReadNovels(novels, chaptersMap, userId);

        // Seed read streaks
        await seedReadStreaks(novels, chaptersMap, userId);

        // Seed bookmarks
        await seedBookmarks(novels, chaptersMap, userId);

        console.log("Seed process completed successfully!");
    } catch (error) {
        console.error("Error during seeding:", error);
        process.exit(1);
    } finally {
        await prisma.$disconnect();
    }
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
