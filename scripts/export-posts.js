const { PrismaClient } = require('@prisma/client');
const fs = require('fs');
const path = require('path');
require('dotenv').config({ path: '.env.local' });

const prisma = new PrismaClient();

async function exportData() {
    console.log("Fetching posts data for model training...");
    
    // Fetch all posts with user association if needed
    const posts = await prisma.post.findMany({
        orderBy: { createdAt: 'desc' }
    });

    console.log(`Found ${posts.length} posts.`);

    // Map to a clean format suitable for fine-tuning/training
    const formattedData = posts.map(post => ({
        id: post.id,
        userId: post.userId,
        tone: post.tone || "unknown",
        type: post.type || "unknown",
        hookScore: post.hookScore,
        provider: post.provider || "gemini-2.5-flash",
        createdAt: post.createdAt,
        content: post.content
    }));

    const outputPath = path.join(__dirname, '../posts_export.json');
    fs.writeFileSync(outputPath, JSON.stringify(formattedData, null, 2), 'utf-8');
    
    console.log(`✅ Data successfully exported to: ${path.resolve(outputPath)}`);
}

exportData()
    .catch(console.error)
    .finally(() => prisma.$disconnect());
