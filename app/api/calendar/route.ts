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

        const entries = await prisma.calendarEntry.findMany({
            where: { userId },
            include: { post: true },
            orderBy: { scheduledAt: 'asc' }
        });

        return NextResponse.json({ entries });
    } catch (err: any) {
        console.error("Error fetching calendar entries:", err);
        return NextResponse.json({ error: "Failed to fetch calendar entries" }, { status: 500 });
    }
}

export async function POST(request: Request) {
    try {
        const session = await auth();
        const userId = session?.userId;
        if (!userId) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const { id, postId, scheduledAt, title, status } = await request.json();

        if (id) {
            // Security check: verify this entry belongs to the user
            const existing = await prisma.calendarEntry.findUnique({
                where: { id }
            });
            if (!existing || existing.userId !== userId) {
                return NextResponse.json({ error: "Forbidden" }, { status: 403 });
            }

            const updated = await prisma.calendarEntry.update({
                where: { id },
                data: {
                    postId: postId || null,
                    scheduledAt: new Date(scheduledAt),
                    title,
                    status: status || 'scheduled'
                }
            });
            return NextResponse.json({ entry: updated });
        } else {
            const created = await prisma.calendarEntry.create({
                data: {
                    userId,
                    postId: postId || null,
                    scheduledAt: new Date(scheduledAt),
                    title,
                    status: status || 'scheduled'
                }
            });
            return NextResponse.json({ entry: created });
        }
    } catch (err: any) {
        console.error("Error saving calendar entry:", err);
        return NextResponse.json({ error: "Failed to save calendar entry" }, { status: 500 });
    }
}

export async function DELETE(request: Request) {
    try {
        const session = await auth();
        const userId = session?.userId;
        if (!userId) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const { searchParams } = new URL(request.url);
        const id = searchParams.get('id');

        if (!id) {
            return NextResponse.json({ error: "ID is required" }, { status: 400 });
        }

        // Security check: verify the entry belongs to the authenticated user
        const entry = await prisma.calendarEntry.findUnique({
            where: { id }
        });

        if (!entry) {
            return NextResponse.json({ error: "Entry not found" }, { status: 404 });
        }

        if (entry.userId !== userId) {
            return NextResponse.json({ error: "Forbidden" }, { status: 403 });
        }

        await prisma.calendarEntry.delete({
            where: { id }
        });

        return NextResponse.json({ success: true });
    } catch (err: any) {
        console.error("Error deleting calendar entry:", err);
        return NextResponse.json({ error: "Failed to delete calendar entry" }, { status: 500 });
    }
}
