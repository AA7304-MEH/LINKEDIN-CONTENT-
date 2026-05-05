const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient({
    datasources: {
        db: {
            url: "postgresql://postgres.ykrldhznjmlcuaqpenjw:linkedin1234gen%40@aws-1-ap-south-1.pooler.supabase.com:5432/postgres"
        }
    }
});

async function main() {
    try {
        console.log("Testing direct connection...");
        const userCount = await prisma.user.count();
        console.log(`✅ Success! User count: ${userCount}`);
    } catch (error) {
        console.error("❌ Failed:", error);
    } finally {
        await prisma.$disconnect();
    }
}
main();
