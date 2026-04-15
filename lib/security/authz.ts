import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { sign, verify } from "@/lib/security/jwt";
export { sign, verify };
import { logSecurityEvent } from "@/lib/security/audit";
import { currentUser, auth } from "@clerk/nextjs/server";

// --- ENV Utility ---
function getEnv(key: string): string {
    const val = process.env[key];
    if (!val) {
        if (key === "ADMIN_USER_IDS" || key === "ADMIN_EMAIL_ALLOWLIST") {
            // We allow missing in dev but warn
            if (process.env.NODE_ENV === "production") {
                throw new Error(`Security configuration error: ${key} is missing.`);
            }
        }
        return "";
    }
    return val;
}

const ADMIN_EMAIL = getEnv("ADMIN_EMAIL_ALLOWLIST");
const ADMIN_USER_IDS = getEnv("ADMIN_USER_IDS");
const SESSION_SECRET = getEnv("AUTH_SESSION_SECRET");
const CRON_SECRET = getEnv("INTERNAL_CRON_SECRET");
const WEBHOOK_SECRET = getEnv("MAKE_SOCIAL_CALLBACK_SECRET");

// --- Types ---
export interface SessionUser {
    id: string;
    email: string;
    role: "user" | "admin";
}

// --- Combined Session Helper ---

export async function getSessionUser(): Promise<SessionUser | null> {
    const user = await currentUser();
    if (!user) return null;

    const email = user.emailAddresses[0]?.emailAddress || "";
    const isAdmin = ADMIN_USER_IDS.split(',').includes(user.id) || email === ADMIN_EMAIL;

    return {
        id: user.id,
        email,
        role: isAdmin ? "admin" : "user",
    };
}

export async function requireUser() {
    const user = await getSessionUser();
    if (!user) {
        throw new Error("UNAUTHORIZED_USER");
    }
    return user;
}

export async function requireAdmin() {
    const { userId } = await auth();
    if (!userId) {
        throw new Error("UNAUTHORIZED_ADMIN");
    }

    const adminIds = ADMIN_USER_IDS.split(',').filter(Boolean);
    
    // Check if ID is in list
    if (!adminIds.includes(userId)) {
        // Fallback to email check if needed, but primary is ID
        const user = await currentUser();
        if (user && user.emailAddresses[0]?.emailAddress === ADMIN_EMAIL) {
            return {
                id: user.id,
                email: user.emailAddresses[0].emailAddress,
                role: "admin"
            } as SessionUser;
        }
        throw new Error("UNAUTHORIZED_ADMIN");
    }

    const user = await currentUser();
    return {
        id: userId,
        email: user?.emailAddresses[0]?.emailAddress || "",
        role: "admin",
    } as SessionUser;
}

export function isAdminEmail(email: string) {
    return email === ADMIN_EMAIL;
}

export function requireCron(req: NextRequest) {
    const authHeader = req.headers.get("x-cron-secret");
    if (authHeader !== CRON_SECRET) {
        throw new Error("UNAUTHORIZED_CRON");
    }
}

export async function requireWebhook(req: NextRequest, provider: "make" = "make") {
    if (provider === "make") {
        const secret = req.headers.get("x-webhook-secret") || req.nextUrl.searchParams.get("secret");
        if (secret !== WEBHOOK_SECRET) {
            throw new Error("UNAUTHORIZED_WEBHOOK");
        }
    }
}

// --- Response Helpers ---

export async function deny(req?: NextRequest) {
    if (req) {
        await logSecurityEvent("ACCESS_DENIED_GENERIC", { path: req.nextUrl.pathname });
    }
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
}

export async function handleAuthError(err: any, req?: NextRequest) {
    const meta = req ? { path: req.nextUrl.pathname } : {};

    if (err.message === "UNAUTHORIZED_USER") {
        await logSecurityEvent("AUTH_FAIL_USER", meta);
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    if (err.message === "UNAUTHORIZED_ADMIN") {
        await logSecurityEvent("AUTH_FAIL_ADMIN", meta);
        return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }
    if (err.message === "UNAUTHORIZED_CRON") {
        await logSecurityEvent("AUTH_FAIL_CRON", meta);
        return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }
    if (err.message === "UNAUTHORIZED_WEBHOOK") {
        await logSecurityEvent("AUTH_FAIL_WEBHOOK", meta);
        return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    // Log unexpected errors
    await logSecurityEvent("AUTH_FAIL_UNKNOWN", { ...meta, error: err.message });
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
}

// Custom session JWTs are deprecated in favor of Clerk but kept for compatibility if needed elsewhere
export async function getAdminSession(): Promise<SessionUser | null> {
    const { userId } = await auth();
    if (!userId) return null;
    const adminIds = ADMIN_USER_IDS.split(',').filter(Boolean);
    if (!adminIds.includes(userId)) return null;
    
    const user = await currentUser();
    return {
        id: userId,
        email: user?.emailAddresses[0]?.emailAddress || "",
        role: "admin"
    };
}
