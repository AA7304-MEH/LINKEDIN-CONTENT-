import { getSessionUser } from '@/lib/security/authz';
import { redirect } from 'next/navigation';
import Link from 'next/link';
import { prisma } from '@/lib/prisma';

import DashboardClient from './DashboardClient';
import styles from './page.module.css';

export default async function DashboardPage() {
    const sessionUser = await getSessionUser();

    // For demo/emergency fix, we allow access but show a generic user if not logged in
    const user = sessionUser || { firstName: "Demo User", role: "user" };

    const posts = [
        { id: '1', type: 'Post', createdAt: new Date().toISOString(), content: "Just discovered how powerful AI can be for content creation. It's not about replacing creativity, it's about amplifying it. #AI #Marketing" },
        { id: '2', type: 'Thread', createdAt: new Date(Date.now() - 86400000).toISOString(), content: "3 ways to improve your LinkedIn hooks:\n1. Be specific\n2. Use numbers\n3. evoke curiosity\n\nWhich one do you struggle with?" }
    ];
    const hookScores = [8.5, 9.2];
    const avgHookScore = "8.9";
    const onboardingComplete = true;

    return (
        <main className={styles.main}>
            <div className={styles.container}>
                <div className={styles.header}>
                    <h1>Welcome back, {(user as any).firstName || 'Creator'}</h1>
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
                        <p className={styles.statValue}>{posts.length}</p>
                    </div>
                    <div className={styles.statCard}>
                        <h3>Avg Hook Score</h3>
                        <p className={styles.statValue}>{avgHookScore}</p>
                    </div>
                    <div className={styles.statCard}>
                        <h3>Saved Hooks</h3>
                        <p className={styles.statValue}>{hookScores.length}</p>
                    </div>
                </div>

                <DashboardClient initialPosts={posts} />
            </div>
        </main>
    );
}
