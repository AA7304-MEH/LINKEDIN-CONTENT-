import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAdmin, handleAuthError } from "@/lib/security/authz";
import { sendPostToMake } from "@/services/marketing/makePublisher";

export async function POST(req: NextRequest) {
    try {
        await requireAdmin();
        const { postId } = await req.json();

        const post = await prisma.marketingPost.findUnique({
            where: { id: postId }
        });

        if (!post) {
            return NextResponse.json({ error: "Post not found" }, { status: 404 });
        }

        const settings = await prisma.marketingSettings.findFirst();
        if (!settings) return NextResponse.json({ error: "Settings not found" }, { status: 400 });

        // Use the makePublisher service
        const success = await sendPostToMake(post, settings);
        
        if (success) {
            await prisma.marketingPost.update({
                where: { id: postId },
                data: { 
                    status: "posted",
                    remoteStatus: "sent_to_make",
                    publishedAt: new Date()
                }
            });
            return NextResponse.json({ success: true });
        } else {
             return NextResponse.json({ error: "Webhook failed" }, { status: 500 });
        }
        
    } catch (error) {
        return handleAuthError(error);
    }
}
