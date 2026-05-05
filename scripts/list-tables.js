const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
    try {
        const result = await prisma.$queryRaw`SELECT tablename FROM pg_catalog.pg_tables WHERE schemaname = 'public'`;
        console.log('Tables in public schema:');
        console.table(result);
    } catch (error) {
        console.error('Error fetching tables:', error);
    } finally {
        await prisma.$disconnect();
    }
}

main();
