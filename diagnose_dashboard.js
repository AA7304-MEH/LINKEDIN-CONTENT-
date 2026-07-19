const { PrismaClient } = require('@prisma/client');
require('dotenv').config();

const prisma = new PrismaClient();

async function run() {
    console.log("Starting dashboard query diagnostics...");
    const testUserId = "user_2ZzQJk3S8gO3fH1r8D2jK5o4p7q"; // Mock or dummy ID to test queries
    
    // We also want to find a real user ID in the database to see if query works on real records
    try {
        const users = await prisma.user.findMany({ take: 1 });
        console.log("Database connection successful. Total users in DB:", users.length);
        const userId = users.length > 0 ? users[0].id : testUserId;
        console.log(`Testing query pipeline using User ID: ${userId}`);

        console.log("1. Querying posts...");
        const posts = await prisma.post.findMany({
            where: { userId },
            orderBy: { createdAt: 'desc' },
            take: 10
        });
        console.log(`Success: Found ${posts.length} posts`);

        console.log("2. Querying post count...");
        const totalPosts = await prisma.post.count({ where: { userId } });
        console.log(`Success: Total posts is ${totalPosts}`);

        console.log("3. Querying posts with hook scores...");
        const postsWithScores = await prisma.post.findMany({
            where: {
                userId,
                hookScore: { not: null }
            },
            select: { hookScore: true }
        });
        console.log(`Success: Found ${postsWithScores.length} posts with hook scores`);

        console.log("4. Querying saved hooks count...");
        const savedHooksCount = await prisma.hookAnalysis.count({ where: { userId } });
        console.log(`Success: Total saved hooks is ${savedHooksCount}`);

        console.log("5. Querying user record...");
        const dbUser = await prisma.user.findUnique({ where: { id: userId } });
        console.log("Success: User details:", {
            id: dbUser?.id,
            plan: dbUser?.plan,
            creditsUsed: dbUser?.creditsUsed,
            creditsResetAt: dbUser?.creditsResetAt
        });

        console.log("\nAll dashboard queries completed successfully!");
    } catch (err) {
        console.error("\nQUERY PIPELINE FAILED:", err);
    } finally {
        await prisma.$disconnect();
    }
}

run();
