import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAdmin, handleAuthError } from "@/lib/security/authz";

export async function GET() {
    try {
        await requireAdmin();
        const settings = await prisma.marketingSettings.findFirst();
        return NextResponse.json(settings || {});
    } catch (error) {
        return handleAuthError(error);
    }
}

export async function POST(req: NextRequest) {
    try {
        await requireAdmin();
        const data = await req.json();
        
        const existing = await prisma.marketingSettings.findFirst();
        
        if (existing) {
            const updated = await prisma.marketingSettings.update({
                where: { id: existing.id },
                data: {
                    productName: data.productName,
                    productDescription: data.productDescription,
                    targetAudience: data.targetAudience,
                    brandVoice: data.brandVoice,
                    primaryWebsiteUrl: data.primaryWebsiteUrl,
                    enabledPlatforms: data.enabledPlatforms,
                    postsPerDay: data.postsPerDay,
                    automationConfig: data.automationConfig,
                    timeZone: data.timeZone,
                }
            });
            return NextResponse.json(updated);
        } else {
            const created = await prisma.marketingSettings.create({
                data: {
                    productName: data.productName,
                    productDescription: data.productDescription,
                    targetAudience: data.targetAudience,
                    brandVoice: data.brandVoice,
                    primaryWebsiteUrl: data.primaryWebsiteUrl,
                    enabledPlatforms: data.enabledPlatforms,
                    postsPerDay: data.postsPerDay,
                    automationConfig: data.automationConfig,
                    timeZone: data.timeZone,
                }
            });
            return NextResponse.json(created);
        }
    } catch (error) {
        return handleAuthError(error);
    }
}
