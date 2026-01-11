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
    const firstName = sessionUser.email.split('@')[0]; // Fallback if name not available

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <h1>Welcome back, <span style={{ textTransform: 'capitalize' }}>{firstName}</span></h1>
                <p>Here's what's happening with your content.</p>
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

            <DashboardClient initialPosts={posts} />
        </div>
    );
}
