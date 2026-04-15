import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAdmin, handleAuthError } from "@/lib/security/authz";

export async function GET() {
    try {
        await requireAdmin();
        
        // Clicks by platform
        const clicks = await prisma.marketingClick.findMany({
            include: { post: true }
        });
        
        const clicksByPlatform: Record<string, number> = {
            linkedin: 0,
            twitter: 0,
            reddit: 0,
            youtube_script: 0
        };
        
        clicks.forEach(c => {
            if (c.post.platform in clicksByPlatform) {
                clicksByPlatform[c.post.platform]++;
            }
        });
        
        // Top posts
        const topPostsRaw = await prisma.marketingPost.findMany({
            include: {
                _count: {
                    select: { clicks: true }
                }
            },
            orderBy: {
                clicks: { _count: 'desc' }
            },
            take: 10
        });
        
        const topPosts = topPostsRaw.map(p => ({
            id: p.id,
            platform: p.platform,
            content: p.content,
            clickCount: p._count.clicks,
            createdAt: p.createdAt
        }));
        
        return NextResponse.json({
            clicksByPlatform,
            topPosts
        });
        
    } catch (error) {
        return handleAuthError(error);
    }
}
