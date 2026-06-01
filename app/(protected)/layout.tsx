import DashboardSidebar from "@/components/DashboardSidebar";
import OnboardingModal from "@/components/OnboardingModal";
import { getSessionUser } from "@/lib/security/authz";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";

async function ensureUserSynced(sessionUser: any) {
    if (!sessionUser) return;

    // Check if user exists
    const user = await prisma.user.findUnique({
        where: { id: sessionUser.id }
    });

    if (!user) {
        let refCode: string | undefined = undefined;
        let referrerId: string | undefined = undefined;

        try {
            const cookieStore = await cookies();
            refCode = cookieStore.get("ref_code")?.value;

            if (refCode) {
                // Find who matches the referralCode
                const referrer = await prisma.user.findUnique({
                    where: { referralCode: refCode }
                });

                if (referrer) {
                    referrerId = referrer.id;
                }
            }
        } catch (cookieErr) {
            console.error("Error reading referral cookies:", cookieErr);
        }

        // First time login - sync user to DB
        await prisma.user.create({
            data: {
                id: sessionUser.id,
                email: sessionUser.email,
                plan: "FREE",
                createdAt: new Date(),
                onboardingComplete: false,
                referredBy: refCode || null,
            }
        });

        // Register the referral and reward if referrer exists
        if (referrerId && refCode) {
            try {
                await prisma.referral.create({
                    data: {
                        referrerId: referrerId,
                        referredId: sessionUser.id
                    }
                });

                const referrer = await prisma.user.findUnique({
                    where: { id: referrerId },
                    select: { referralCount: true }
                });

                if (referrer) {
                    const newCount = referrer.referralCount + 1;
                    const milestoneReached = newCount % 2 === 0;

                    await prisma.user.update({
                        where: { id: referrerId },
                        data: {
                            referralCount: { increment: 1 },
                            ...(milestoneReached ? {
                                bonusPosts: { increment: 10 },
                                creditsLimit: { increment: 10 }
                            } : {})
                        }
                    });
                }

                // Clean up the cookie
                const cookieStore = await cookies();
                cookieStore.set("ref_code", "", { maxAge: 0 });
            } catch (refErr) {
                console.error("Error updating referral stats:", refErr);
            }
        }
    }
}

export default async function ProtectedLayout({

    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const sessionUser = await getSessionUser();

    if (!sessionUser) {
        redirect("/sign-in");
    }

    // Sync user to DB on every protected page load (optimized in production with internal check)
    await ensureUserSynced(sessionUser);

    // Fetch up-to-date user data
    const dbUser = await prisma.user.findUnique({
        where: { id: sessionUser.id },
        select: { creditsUsed: true, creditsLimit: true, plan: true, onboardingComplete: true }
    });

    const creditsUsed = dbUser?.creditsUsed || 0;
    const creditsLimit = dbUser?.creditsLimit || 10;
    const userPlan = dbUser?.plan || "Free";
    const onboardingComplete = dbUser?.onboardingComplete || false;

    return (
        <div style={{ display: 'flex', minHeight: '100vh', background: '#f8fafc' }}>
            {!onboardingComplete && <OnboardingModal />}
            <DashboardSidebar
                creditsUsed={creditsUsed}
                creditsLimit={creditsLimit}
                userPlan={userPlan}
            />
            <main className="flex-1 w-full p-8 md:pl-[312px] pt-16 md:pt-8 max-w-[1920px]">
                {children}
            </main>
        </div>
    );
}

