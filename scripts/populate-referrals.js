const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
    try {
        const count = await prisma.$executeRawUnsafe(`UPDATE "User" SET "referralCode" = 'ref-' || md5(random()::text) WHERE "referralCode" IS NULL`);
        console.log('Updated rows:', count);
    } catch (error) {
        console.error('Error updating users:', error);
    } finally {
        await prisma.$disconnect();
    }
}

main();
