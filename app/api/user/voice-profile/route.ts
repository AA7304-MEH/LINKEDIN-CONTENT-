import { NextResponse } from 'next/server';
import { auth, currentUser } from '@clerk/nextjs/server';
import { prisma } from '@/lib/prisma';

export async function POST(request: Request) {
    try {
        const { userId } = await auth();
        const user = await currentUser();

        if (!userId || !user) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const data = await request.json();

        // Ensure user exists
        await prisma.user.upsert({
            where: { id: userId },
            update: {},
            create: { id: userId, email: user.emailAddresses[0]?.emailAddress || 'unknown' },
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
        console.error("Profile save error:", error);
        return NextResponse.json(
            { error: 'Failed to save profile' },
            { status: 500 }
        );
    }
}
