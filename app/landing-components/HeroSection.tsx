"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import styles from './HeroSection.module.css';

export default function HeroSection() {
    const [topic, setTopic] = useState('');
    const [score, setScore] = useState<number | null>(null);
    const [loading, setLoading] = useState(false);
    const [showVideo, setShowVideo] = useState(false);
    const router = useRouter();

    const handleAnalyze = () => {
        if (!topic) return;
        setLoading(true);
        // Simulate analysis
        setTimeout(() => {
            setScore(Math.floor(Math.random() * 3) + 8); // Random score between 8-10
            setLoading(false);
            // Redirect to sign up after showing score briefly
            setTimeout(() => {
                router.push(`/sign-up?topic=${encodeURIComponent(topic)}`);
            }, 1500);
        }, 1500);
    };

    return (
        <section className={styles.hero}>
            <div className={styles.container}>
                <div className={styles.leftContent}>
                    <h1 className={styles.headline}>
                        Stop Guessing. <span className={styles.highlight}>Start Growing.</span>
                    </h1>
                    <p className={styles.subheadline}>
                        The first AI content engine that decodes your personal voice to create high-impact LinkedIn posts that actually convert.
                    </p>

                    <div className={styles.ctaGroup}>
                        <Link href="/sign-up" className={styles.primaryBtn}>
                            Analyze My Voice
                        </Link>
                        <button className={styles.secondaryBtn} onClick={() => setShowVideo(true)}>
                            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" height="20" width="20" strokeWidth="2">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                                <path strokeLinecap="round" strokeLinejoin="round" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            Explore Demo
                        </button>
                    </div>

                    <div className={styles.trust}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                            <div style={{ display: 'flex', marginLeft: '0.5rem' }}>
                                {[1, 2, 3, 4].map(i => (
                                    <div key={i} style={{ width: '28px', height: '28px', borderRadius: '50%', border: '2px solid #030303', background: '#1a1a20', marginLeft: '-8px' }}></div>
                                ))}
                            </div>
                            <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Trusted by 2,000+ creators</span>
                        </div>
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
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                            <div style={{ width: '40%', height: '10px', background: 'rgba(255,255,255,0.1)', borderRadius: '10px' }}></div>
                            <div style={{ width: '85%', height: '10px', background: 'rgba(255,255,255,0.05)', borderRadius: '10px' }}></div>
                            <div style={{ width: '70%', height: '10px', background: 'rgba(255,255,255,0.05)', borderRadius: '10px' }}></div>
                            <div style={{ marginTop: '1.5rem', width: '100%', height: '140px', background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.05)', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: 'rgba(0, 229, 255, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                    <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: 'var(--primary)', boxShadow: '0 0 15px var(--primary)' }}></div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className={styles.demoWidget}>
                        <div className={styles.widgetTitle}>Viral Hook Score (Beta)</div>
                        <div className={styles.inputGroup}>
                            <input
                                type="text"
                                className={styles.input}
                                style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.1)', color: 'white' }}
                                placeholder="Enter a topic..."
                                value={topic}
                                onChange={(e) => setTopic(e.target.value)}
                            />
                            <button
                                onClick={handleAnalyze}
                                className={styles.analyzeBtn}
                                disabled={loading}
                            >
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

            {/* Video Modal */}
            {showVideo && (
                <div style={{
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    backgroundColor: 'rgba(0,0,0,0.8)',
                    zIndex: 1000,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: '2rem'
                }} onClick={() => setShowVideo(false)}>
                    <div style={{
                        position: 'relative',
                        width: '100%',
                        maxWidth: '900px',
                        background: '#000',
                        borderRadius: '12px',
                        overflow: 'hidden',
                        boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)'
                    }} onClick={e => e.stopPropagation()}>
                        <button
                            onClick={() => setShowVideo(false)}
                            style={{
                                position: 'absolute',
                                top: '1rem',
                                right: '1rem',
                                background: 'rgba(255,255,255,0.2)',
                                border: 'none',
                                color: 'white',
                                width: '30px',
                                height: '30px',
                                borderRadius: '50%',
                                cursor: 'pointer',
                                zIndex: 10,
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center'
                            }}
                        >
                            ✕
                        </button>
                        <img
                            src="/demo-video.webp"
                            alt="Resodin Demo Video"
                            style={{ width: '100%', height: 'auto', display: 'block' }}
                        />
                    </div>
                </div>
            )}
        </section>
    );
}
