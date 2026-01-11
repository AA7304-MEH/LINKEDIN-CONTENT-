"use client";

import styles from './LiveDemoSamples.module.css';

const samples = [
    {
        topic: "Remote Leadership",
        tone: "Controversial",
        hook: "Stop forcing your team back to the office. It's killing your retention.",
        content: "I've seen 5 top engineers quit this month. Why? Because their boss demanded 3 days a week in the cubicle farm.\n\nRemote work isn't a perk anymore. It's the baseline.\n\nIf you can't trust your team to work from home, you don't have a location problem. You have a management problem.",
        score: 94
    },
    {
        topic: "SaaS Growth",
        tone: "Educational",
        hook: "Your SaaS pricing is probably wrong. Here's exactly how to fix it.",
        content: "Most founders price based on their costs. Smart founders price based on customer value.\n\nIf your tool saves a company $10k/month, why are you charging $29?\n\nStop underselling your impact. Start charging for results.",
        score: 92
    }
];

export default function LiveDemoSamples() {
    return (
        <section className={styles.section}>
            <div className={styles.container}>
                <div className={styles.header}>
                    <h2>See What Resonate Creates</h2>
                    <p>Real examples of high-viral posts generated in seconds.</p>
                </div>

                <div className={styles.grid}>
                    {samples.map((sample, i) => (
                        <div key={i} className={styles.card}>
                            <div className={styles.cardHeader}>
                                <span className={styles.badge}>{sample.tone}</span>
                                <div className={styles.score}>
                                    <span className={styles.scoreIcon}>⚡</span>
                                    <span>{sample.score}/100 Hook Score</span>
                                </div>
                            </div>

                            <div className={styles.input}>
                                <span className={styles.label}>Topic:</span> {sample.topic}
                            </div>

                            <div className={styles.content}>
                                <p className={styles.hook}>{sample.hook}</p>
                                <p className={styles.body}>{sample.content}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
