
import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(req: NextRequest, { params }: { params: Promise<{ postId: string }> }) {
    const { postId } = await params;

    if (!postId) {
        return NextResponse.redirect(new URL("/", req.url));
    }

    try {
        const post = await prisma.marketingPost.findUnique({
            where: { id: postId },
        });

        if (!post) {
            return NextResponse.redirect(new URL("/", req.url));
        }

        // Log Click (Async - don't await strictly to speed up redirect? Vercel Functions might kill it though. Safer to await)
        // To handle concurrency properly in high scale, you'd use a queue, but for this scale direct DB write is fine.
        await prisma.marketingClick.create({
            data: {
                postId,
                sourceIp: req.headers.get("x-forwarded-for") || "unknown",
            },
        });

        // Get target URL (Settings)
        const settings = await prisma.marketingSettings.findFirst();
        const targetUrl = settings?.primaryWebsiteUrl || "/";

        // Append standard UTMs
        const url = new URL(targetUrl);
        url.searchParams.set("utm_source", post.platform);
        url.searchParams.set("utm_medium", "social");
        if (post.utmCampaign) {
            url.searchParams.set("utm_campaign", post.utmCampaign);
        }
        url.searchParams.set("utm_content", postId);

        return NextResponse.redirect(url);

    } catch (error) {
        console.error("Redirect error", error);
        return NextResponse.redirect(new URL("/", req.url));
    }
}
