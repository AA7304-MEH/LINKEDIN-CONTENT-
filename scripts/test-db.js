const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
    try {
        console.log("Testing Prisma connection...");
        const userCount = await prisma.user.count();
        console.log(`✅ Connection successful! User count: ${userCount}`);
        
        // Try to get one user
        const firstUser = await prisma.user.findFirst();
        if (firstUser) {
            console.log("✅ Successfully fetched a user:", firstUser.email);
        } else {
            console.log("ℹ️ No users found in database, but connection is working.");
        }
    } catch (error) {
        console.error("❌ Prisma connection failed:", error);
    } finally {
        await prisma.$disconnect();
    }
}

main();
