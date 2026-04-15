import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAdmin, handleAuthError } from "@/lib/security/authz";
import { generateMarketingArticle } from "@/services/marketing/articleGenerator";

export async function GET() {
    try {
        await requireAdmin();
        const articles = await prisma.marketingArticle.findMany({
            orderBy: { createdAt: "desc" },
        });
        return NextResponse.json(articles);
    } catch (error) {
        return handleAuthError(error);
    }
}

export async function POST(req: NextRequest) {
    try {
        await requireAdmin();
        const { topic, platform } = await req.json();
        
        const article = await generateMarketingArticle({ topic, platform });
        
        return NextResponse.json(article);
    } catch (error: any) {
        console.error("Article generation error:", error);
        return handleAuthError(error);
    }
}
