import DashboardSidebar from "@/components/DashboardSidebar";
import OnboardingModal from "@/components/OnboardingModal";
import { getSessionUser } from "@/lib/security/authz";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";

async function ensureUserSynced(sessionUser: any) {
    if (!sessionUser) return;

    // Check if user exists
    const user = await prisma.user.findUnique({
        where: { id: sessionUser.id }
    });

    if (!user) {
        // First time login - sync user to DB
        await prisma.user.create({
            data: {
                id: sessionUser.id,
                email: sessionUser.email,
                plan: "FREE",
                createdAt: new Date(),
                onboardingComplete: false
            }
        });
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

