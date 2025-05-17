import { PrismaClient } from '../../generated/prisma';

const prisma = new PrismaClient();

async function main() {
    //change to reference a table in your schema
    const val = await prisma.users.findMany({
        take: 10,
        select: {
            email: true,
        }
    });
    console.log(val);
}

main()
    .then(async () => {
        await prisma.$disconnect();
    })
    .catch(async (e) => {
        console.error(e);
        await prisma.$disconnect();
        process.exit(1);
    });