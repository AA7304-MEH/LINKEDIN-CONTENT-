import styles from './ValueProps.module.css';

export default function ValueProps() {
    return (
        <section className={styles.section} id="features">
            <div className={styles.container}>
                <div className={styles.grid}>
                    <div className={styles.card}>
                        <div className={styles.iconWrapper}>
                            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" height="24" width="24" strokeWidth="2">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
                            </svg>
                        </div>
                        <h3 className={styles.title}>Viral Hook Engine</h3>
                        <p className={styles.description}>
                            Stop guessing. Our AI analyzes millions of top-performing posts to generate hooks scored 1-10 on viral potential before you even post.
                        </p>
                    </div>

                    <div className={styles.card}>
                        <div className={styles.iconWrapper}>
                            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" height="24" width="24" strokeWidth="2">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 11c0 3.517-1.009 6.799-2.753 9.571m-3.44-2.04l.054-.09A13.916 13.916 0 008 11a4 4 0 118 0c0 1.017-.07 2.019-.203 3m-2.118 6.844A21.88 21.88 0 0015.171 17m3.839 1.132c.645-2.266.99-4.659.99-7.132A8 8 0 008 4.07M3 15.364c.64-1.319 1-2.8 1-4.364 0-1.457.39-2.823 1.07-4" />
                            </svg>
                        </div>
                        <h3 className={styles.title}>Personal Content DNA</h3>
                        <p className={styles.description}>
                            We don't just generate generic content. Resonate learns your writing style, tone, and expertise to create posts that sound exactly like you.
                        </p>
                    </div>

                    <div className={styles.card}>
                        <div className={styles.iconWrapper}>
                            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" height="24" width="24" strokeWidth="2">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                            </svg>
                        </div>
                        <h3 className={styles.title}>One-Click Repurposing</h3>
                        <p className={styles.description}>
                            Turn a YouTube video, blog post, or tweet into a month's worth of LinkedIn content. Sync automatically with your favorite scheduling tools.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
}
