const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
    try {
        const result = await prisma.$queryRaw`SELECT column_name, data_type FROM information_schema.columns WHERE table_name = 'User'`;
        console.log('Columns in User table:');
        console.table(result);
    } catch (error) {
        console.error('Error fetching columns:', error);
    } finally {
        await prisma.$disconnect();
    }
}

main();
