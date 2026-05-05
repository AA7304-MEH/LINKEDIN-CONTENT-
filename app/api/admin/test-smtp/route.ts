import { NextRequest, NextResponse } from "next/server";
import { sendEmail } from "@/lib/email";
import { requireAdmin, handleAuthError } from "@/lib/security/authz";

export async function POST(req: NextRequest) {
    try {
        await requireAdmin();

        const { to, subject, html } = await req.json();

        await sendEmail({
            to: to || "resodin.admin8153@protonmail.com",
            subject: subject || "SMTP Test Link",
            html: html || "<p>This is a test email from Resodin.</p>",
        });

        return NextResponse.json({ success: true, message: "Email sent" });
    } catch (error) {
        return handleAuthError(error);
    }
}
