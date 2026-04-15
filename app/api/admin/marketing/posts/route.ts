import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAdmin, handleAuthError } from "@/lib/security/authz";

export async function GET() {
    try {
        await requireAdmin();
        const posts = await prisma.marketingPost.findMany({
            orderBy: { createdAt: "desc" },
            take: 50,
        });
        return NextResponse.json(posts);
    } catch (error) {
        return handleAuthError(error);
    }
}
