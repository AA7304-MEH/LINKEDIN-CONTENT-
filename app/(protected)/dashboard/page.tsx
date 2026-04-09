import { getSessionUser } from '@/lib/security/authz';
import { redirect } from 'next/navigation';
import Link from 'next/link';
import { prisma } from '@/lib/prisma';

import DashboardClient from './DashboardClient';
import styles from './page.module.css';

export default async function DashboardPage() {
    const sessionUser = await getSessionUser();

    if (!sessionUser) {
        redirect("/sign-in");
    }

    // Fetch real posts from DB
    const posts = await prisma.post.findMany({
        where: { userId: sessionUser.id },
        orderBy: { createdAt: 'desc' },
        take: 10
    });

    // Calculate stats
    const totalPosts = await prisma.post.count({ where: { userId: sessionUser.id } });

    // Calculate Avg Hook Score
    const postsWithScores = await prisma.post.findMany({
        where: {
            userId: sessionUser.id,
            hookScore: { not: null }
        },
        select: { hookScore: true }
    });

    const avgHookScore = postsWithScores.length > 0
        ? (postsWithScores.reduce((acc, p) => acc + (p.hookScore || 0), 0) / postsWithScores.length).toFixed(1)
        : "N/A";

    const savedHooksCount = await prisma.hookAnalysis.count({ where: { userId: sessionUser.id } });

    // Check onboarding status (optional, assuming User record exists)
    const dbUser = await prisma.user.findUnique({ where: { id: sessionUser.id } });
    const onboardingComplete = dbUser?.onboardingComplete || false;
    const userPlan = dbUser?.plan || "FREE";
    const firstName = sessionUser.email.split('@')[0]; // Fallback if name not available

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <h1>Welcome back, <span style={{ textTransform: 'capitalize' }}>{firstName}</span></h1>
                <p>Here's what's happening with your content.</p>
            </div>

            {/* Viral Referral Banner */}
            <div className="mb-8 p-6 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-3xl text-white shadow-xl relative overflow-hidden group">
                <div className="relative z-10 flex flex-col md:flex-row justify-between items-center gap-6">
                    <div>
                        <h2 className="text-2xl font-bold mb-2">Invite 2 friends → unlock 10 bonus posts/month</h2>
                        <p className="text-blue-100 italic">Grow together and stack up your generation limits forever.</p>
                    </div>
                    <Link href="/referral" className="bg-white text-blue-600 px-8 py-3 rounded-full font-bold hover:bg-blue-50 transition-all shadow-lg whitespace-nowrap">
                        Grab My Link →
                    </Link>
                </div>
                {/* Decorative background element */}
                <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 blur-[60px] rounded-full translate-x-1/2 -translate-y-1/2 group-hover:scale-110 transition-transform duration-500" />
            </div>

            {!onboardingComplete && (
                <div className={styles.onboardingAlert}>
                    <div className={styles.alertContent}>
                        <h3>⚠️ Voice Profile Incomplete</h3>
                        <p>Set up your Personal Content DNA to generate posts that sound like you.</p>
                    </div>
                    <Link href="/onboarding" className={styles.alertButton}>
                        Complete Profile
                    </Link>
                </div>
            )}

            <div className={styles.statsGrid}>
                <div className={styles.statCard}>
                    <h3>Total Posts</h3>
                    <p className={styles.statValue}>{totalPosts}</p>
                </div>
                <div className={styles.statCard}>
                    <h3>Avg Hook Score</h3>
                    <p className={styles.statValue}>{avgHookScore}</p>
                </div>
                <div className={styles.statCard}>
                    <h3>Saved Hooks</h3>
                    <p className={styles.statValue}>{savedHooksCount}</p>
                </div>
            </div>

            <DashboardClient initialPosts={posts} userPlan={userPlan} />
        </div>
    );
}

