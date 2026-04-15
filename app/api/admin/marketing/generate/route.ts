import { NextRequest, NextResponse } from "next/server";
import { requireAdmin, handleAuthError } from "@/lib/security/authz";
import { generateMarketingPosts } from "@/services/marketing/generator";

export async function POST(req: NextRequest) {
    try {
        await requireAdmin();
        const { count } = await req.json();
        
        const posts = await generateMarketingPosts({ count: count || 3 });
        
        return NextResponse.json({ success: true, count: posts.length });
    } catch (error) {
        return handleAuthError(error);
    }
}
