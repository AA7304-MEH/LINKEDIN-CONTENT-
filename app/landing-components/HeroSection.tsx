"use client";

import { useState } from 'react';
import Link from 'next/link';
import styles from './HeroSection.module.css';

export default function HeroSection() {
    const [topic, setTopic] = useState('');
    const [score, setScore] = useState<number | null>(null);
    const [loading, setLoading] = useState(false);

    const handleAnalyze = () => {
        if (!topic) return;
        setLoading(true);
        // Simulate analysis
        setTimeout(() => {
            setScore(Math.floor(Math.random() * 3) + 8); // Random score between 8-10
            setLoading(false);
        }, 1500);
    };

    return (
        <section className={styles.hero}>
            <div className={styles.container}>
                <div className={styles.leftContent}>
                    <h1 className={styles.headline}>
                        Stop Struggling with LinkedIn. <span className={styles.highlight}>Start Growing.</span>
                    </h1>
                    <p className={styles.subheadline}>
                        AI-powered content generation that understands your personal voice and creates scroll-stopping posts in 30 seconds.
                    </p>

                    <div className={styles.ctaGroup}>
                        <Link href="/sign-up" className={`${styles.primaryBtn} pulse-button`}>
                            Start Free Trial
                        </Link>
                        <button className={styles.secondaryBtn}>
                            <svg fill="currentColor" viewBox="0 0 24 24" height="20" width="20">
                                <path d="M8 5v14l11-7z" />
                            </svg>
                            Watch Demo
                        </button>
                    </div>
                    {/* Testimonial added below CTA */}
                    <div style={{ textAlign: 'center', margin: '1rem 0', fontSize: '0.9rem', color: '#666' }}>
                        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', margin: '0.5rem' }}>
                            <span style={{ color: 'gold' }}>★★★★★</span>
                            <span>"Generated 3 viral posts in first week!"</span>
                        </div>
                    </div>

                    <div className={styles.trust}>
                        Trusted by 1,000+ marketers, founders, and professionals
                    </div>
                </div>

                <div className={styles.rightContent}>
                    <div className={styles.dashboardMockup}>
                        <div className={styles.mockupHeader}>
                            <div className={`${styles.dot} ${styles.red}`}></div>
                            <div className={`${styles.dot} ${styles.yellow}`}></div>
                            <div className={`${styles.dot} ${styles.green}`}></div>
                        </div>
                        {/* Abstract representation of content */}
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                            <div style={{ width: '60%', height: '12px', background: '#f0f0f0', borderRadius: '4px' }}></div>
                            <div style={{ width: '80%', height: '12px', background: '#f0f0f0', borderRadius: '4px' }}></div>
                            <div style={{ width: '90%', height: '12px', background: '#f0f0f0', borderRadius: '4px' }}></div>
                            <div style={{ width: '75%', height: '12px', background: '#f0f0f0', borderRadius: '4px' }}></div>
                            <div style={{ marginTop: '1rem', width: '100%', height: '100px', background: '#f8f9fa', borderRadius: '8px' }}></div>
                        </div>
                    </div>

                    <div className={styles.demoWidget}>
                        <div className={styles.widgetTitle}>Test Your Hook Score</div>
                        <div className={styles.inputGroup}>
                            <input
                                type="text"
                                className={styles.input}
                                placeholder="Topic (e.g. Remote Work)"
                                value={topic}
                                onChange={(e) => setTopic(e.target.value)}
                            />
                            <button className={styles.analyzeBtn} onClick={handleAnalyze} disabled={loading}>
                                {loading ? '...' : 'Analyze'}
                            </button>
                        </div>

                        {score !== null && (
                            <div className={styles.scoreResult}>
                                <span className={styles.scoreLabel}>Viral Potential</span>
                                <span className={styles.scoreValue}>{score}/10 🚀</span>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </section>
    );
}
