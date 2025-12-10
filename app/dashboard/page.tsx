import { auth, currentUser } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';
import Link from 'next/link';
import { prisma } from '@/lib/prisma';
import styles from './page.module.css';

export default async function DashboardPage() {
    const { userId } = await auth();
    const user = await currentUser();

    if (!userId || !user) {
        redirect('/sign-in');
    }

    let dbUser;
    try {
        // Fetch db user to check onboarding
        dbUser = await prisma.user.findUnique({
            where: { id: userId },
            include: {
                posts: {
                    orderBy: { createdAt: 'desc' },
                    take: 5,
                },
                hookAnalyses: {
                    select: { score: true },
                },
            },
        });
    } catch (error: any) {
        console.error("Dashboard Error:", error);
        return (
            <main className={styles.main}>
                <div className={styles.container}>
                    <div className={styles.header}>
                        <h1 style={{ color: 'red' }}>Server Error</h1>
                        <p>Something went wrong loading your dashboard.</p>
                    </div>
                    <div style={{
                        background: '#1a1a1a',
                        padding: '1rem',
                        borderRadius: '8px',
                        marginTop: '1rem',
                        overflow: 'auto'
                    }}>
                        <pre style={{ color: '#ff6b6b' }}>
                            {error?.message || JSON.stringify(error, null, 2)}
                        </pre>
                    </div>
                </div>
            </main>
        );
    }

    const posts = dbUser?.posts || [];
    const hookScores = dbUser?.hookAnalyses?.map((h: any) => h.score) || [];
    const avgHookScore = hookScores.length > 0
        ? (hookScores.reduce((a: number, b: number) => a + b, 0) / hookScores.length).toFixed(1)
        : 'N/A';

    const onboardingComplete = dbUser?.onboardingComplete;

    return (
        <main className={styles.main}>
            <div className={styles.container}>
                <div className={styles.header}>
                    <h1>Welcome back, {user.firstName || 'Creator'}</h1>
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

                <div className={styles.actionSection}>
                    <Link href="/" className={styles.generateButton}>
                        + Generate New Post
                    </Link>
                    <Link href="/hook-analyzer" className={styles.secondaryButton}>
                        Analyze a Hook
                    </Link>
                </div>

                <div className={styles.recentPosts}>
                    <h2>Recent Posts</h2>
                    {posts.length === 0 ? (
                        <p className={styles.emptyState}>No posts generated yet.</p>
                    ) : (
                        <div className={styles.postList}>
                            {posts.map((post) => (
                                <div key={post.id} className={styles.postCard}>
                                    <p className={styles.postPreview}>{post.content.substring(0, 100)}...</p>
                                    <div className={styles.postMeta}>
                                        <span className={styles.tag}>{post.type || 'General'}</span>
                                        <span className={styles.date}>{post.createdAt.toLocaleDateString()}</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </main>
    );
}
