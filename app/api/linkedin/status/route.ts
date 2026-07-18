import { NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
    try {
        const session = await auth();
        const userId = session?.userId;

        if (!userId) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const dbUser = await prisma.user.findUnique({
            where: { id: userId }
        });

        if (!dbUser || !dbUser.linkedinAccessToken) {
            return NextResponse.json({
                connected: false,
                name: null,
                connectedAt: null,
                tokenExpiry: null,
                postsPublished: 0
            });
        }

        const postsPublished = await prisma.post.count({
            where: {
                userId: userId,
                publishedToLinkedIn: true
            }
        });

        return NextResponse.json({
            connected: true,
            name: dbUser.linkedinName,
            connectedAt: dbUser.linkedinConnectedAt,
            tokenExpiry: dbUser.linkedinTokenExpiry,
            postsPublished: postsPublished
        });
    } catch (err: any) {
        console.error("LinkedIn status failed:", err);
        return NextResponse.json(
            { error: "Failed to fetch LinkedIn status.", details: err.message || err },
            { status: 500 }
        );
    }
}