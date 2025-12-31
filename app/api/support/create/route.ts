import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
// Email notifications removed from public repo (Engines split)

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const { email, subject, message, userId } = body;

        if (!email || !subject || !message) {
            return NextResponse.json({ error: "Missing fields" }, { status: 400 });
        }

        // Create Ticket
        const ticket = await prisma.supportTicket.create({
            data: {
                userId, // Nullable
                email,
                subject,
                message,
                status: 'open',
                events: {
                    create: {
                        eventType: 'created',
                        actor: userId ? 'user' : 'system',
                        message: 'Ticket created via support form'
                    }
                }
            }
        });

        // Note: Admin notification removed from public repo. AdminRepo watches for new tickets.

        return NextResponse.json({ success: true, ticketId: ticket.id });

    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
