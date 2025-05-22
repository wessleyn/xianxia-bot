import { faker } from "@faker-js/faker";
import type { Novel } from "../../../generated/prisma";
import { prisma } from '../../../src/client';

export async function seedNovels(): Promise<Novel[]> {
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
