import { PrismaClient } from '../../generated/prisma';

const prisma = new PrismaClient();

async function main() {
    // Clear existing data - delete child records before parent records to avoid foreign key constraint violations


    console.log('Database has been seeded!');
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });