import { NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs/server';
import { prisma } from '@/lib/prisma';

export async function POST() {
    try {
        const session = await auth();
        const userId = session?.userId;

        if (!userId) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        await prisma.user.update({
            where: { id: userId },
            data: {
                linkedinAccessToken: null,
                linkedinProfileId: null,
                linkedinName: null,
                linkedinConnectedAt: null,
                linkedinTokenExpiry: null
            }
        });

        return NextResponse.json({ success: true });
    } catch (err: any) {
        console.error("LinkedIn disconnect failed:", err);
        return NextResponse.json(
            { error: "Failed to disconnect LinkedIn account.", details: err.message || err },
            { status: 500 }
        );
    }
}