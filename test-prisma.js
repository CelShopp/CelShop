const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
    try {
        const collections = await prisma.collection.findMany();
        console.log("Found collections:", collections.length);
        if (collections.length > 0) {
            console.log("Keys on first collection:", Object.keys(collections[0]));
        }
    } catch (e) {
        console.error("Prisma error:", e);
    } finally {
        await prisma.$disconnect();
    }
}

main();
