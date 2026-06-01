import { NextResponse } from 'next/server';
import { getSessionUser } from '@/lib/security/authz';
import { prisma } from '@/lib/prisma';

export async function GET() {
    try {
        const sessionUser = await getSessionUser();
        const userId = sessionUser?.id;

        if (!userId || !sessionUser) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const dbUser = await prisma.user.findUnique({
            where: { id: userId },
            select: { voiceProfile: true },
        });

        if (!dbUser) {
            return NextResponse.json({ voiceProfile: null });
        }

        let parsed = null;
        if (dbUser.voiceProfile) {
            try {
                parsed = JSON.parse(dbUser.voiceProfile);
            } catch {
                parsed = null;
            }
        }

        return NextResponse.json({ voiceProfile: parsed });
    } catch (error) {
        console.error('Voice profile GET error:', error);
        return NextResponse.json({ error: 'Failed to fetch profile' }, { status: 500 });
    }
}

export async function POST(request: Request) {
    try {
        const sessionUser = await getSessionUser();
        const userId = sessionUser?.id;

        if (!userId || !sessionUser) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const data = await request.json();

        // Ensure user exists
        await prisma.user.upsert({
            where: { id: userId },
            update: {},
            create: { id: userId, email: sessionUser.email },
        });

        // Update voice profile
        await prisma.user.update({
            where: { id: userId },
            data: {
                voiceProfile: JSON.stringify(data),
                onboardingComplete: true,
            },
        });

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error('Profile save error:', error);
        return NextResponse.json(
            { error: 'Failed to save profile' },
            { status: 500 }
        );
    }
}
