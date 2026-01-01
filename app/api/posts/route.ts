import { NextResponse } from 'next/server';
import { getSessionUser } from '@/lib/security/authz';
import { prisma } from '@/lib/prisma';

export async function GET() {
    try {
        const sessionUser = await getSessionUser();
        const userId = sessionUser?.id;

        if (!userId) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const posts = await prisma.post.findMany({
            where: { userId },
            orderBy: { createdAt: 'desc' },
        });

        return NextResponse.json({ posts });
    } catch (error) {
        return NextResponse.json(
            { error: 'Failed to fetch posts' },
            { status: 500 }
        );
    }
}
