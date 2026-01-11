"use client";

import { useState } from 'react';
import styles from './FeatureDemo.module.css';

export default function FeatureDemo() {
    const [demoState, setDemoState] = useState<'IDLE' | 'GENERATING' | 'DONE'>('IDLE');
    const [topic, setTopic] = useState('');

    const handleMockGenerate = () => {
        if (!topic.trim()) return;
        setDemoState('GENERATING');
        setTimeout(() => {
            setDemoState('DONE');
        }, 1500);
    };

    return (
        <section className={styles.section} id="features">
            <div className={styles.container}>
                <div className={styles.header}>
                    <h2 className={styles.title}>See the Magic in Action</h2>
                    <p className={styles.subtitle}>Try the generator right here. No sign-up required.</p>
                </div>

                <div style={{
                    maxWidth: '800px',
                    margin: '0 auto',
                    background: 'white',
                    borderRadius: '12px',
                    padding: '2rem',
                    boxShadow: '0 10px 30px rgba(0,0,0,0.1)'
                }}>
                    <div style={{ display: 'flex', gap: '1rem', marginBottom: '2rem' }}>
                        <input
                            type="text"
                            placeholder="Type a topic (e.g. 'Consistent Writing')"
                            style={{
                                flex: 1,
                                padding: '1rem',
                                border: '1px solid #e5e7eb',
                                borderRadius: '8px',
                                fontSize: '1rem'
                            }}
                            value={topic}
                            onChange={(e) => setTopic(e.target.value)}
                        />
                        <button
                            onClick={handleMockGenerate}
                            disabled={demoState === 'GENERATING' || !topic.trim()}
                            style={{
                                background: '#0077B5',
                                color: 'white',
                                border: 'none',
                                padding: '0 2rem',
                                borderRadius: '8px',
                                fontWeight: 'bold',
                                cursor: 'pointer',
                                opacity: !topic.trim() ? 0.7 : 1
                            }}
                        >
                            {demoState === 'GENERATING' ? 'Writing...' : 'Generate Demo'}
                        </button>
                    </div>

                    {demoState === 'DONE' && (
                        <div style={{ animation: 'fadeIn 0.5s ease' }}>
                            <div style={{
                                background: 'linear-gradient(135deg, #0077B5 0%, #00a0dc 100%)',
                                color: 'white',
                                padding: '1rem',
                                borderRadius: '8px',
                                display: 'inline-flex',
                                alignItems: 'center',
                                gap: '1rem',
                                marginBottom: '1.5rem',
                                boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
                            }}>
                                <span style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>8.8</span>
                                <span style={{ fontSize: '0.9rem', opacity: 0.9 }}>HOOK SCORE</span>
                            </div>

                            <div style={{
                                background: '#f9fafb',
                                padding: '1.5rem',
                                borderRadius: '8px',
                                border: '1px solid #e5e7eb',
                                textAlign: 'left',
                                lineHeight: '1.6',
                                color: '#374151'
                            }}>
                                <p style={{ fontWeight: 'bold', marginBottom: '1rem' }}>
                                    Stop trying to be perfect. Start being consistent.
                                </p>
                                <p style={{ marginBottom: '1rem' }}>
                                    I used to spend 3 hours on a single LinkedIn post. I wanted it to be a masterpiece.
                                    The result? I posted once a month.
                                </p>
                                <p style={{ marginBottom: '1rem' }}>
                                    Then I changed my mindset. I committed to "good enough" but every single day.
                                    In 30 days, my engagement tripled.
                                </p>
                                <p style={{ marginBottom: '1rem' }}>
                                    Perfectionism is just procrastination in a fancy suit.
                                    Show up. Press publish. Repeat.
                                </p>
                                <p style={{ color: '#0077B5', fontWeight: 600 }}>
                                    #{topic.replace(/\s+/g, '') || 'Writing'} #Growth #Consistency
                                </p>
                            </div>

                            <div style={{ marginTop: '1.5rem', textAlign: 'center' }}>
                                <a href="/sign-up" style={{ color: '#0077B5', fontWeight: 'bold', textDecoration: 'none' }}>
                                    Start your free trial to write more &rarr;
                                </a>
                            </div>
                        </div>
                    )}
                </div>
            </div>
            <style jsx>{`
                @keyframes fadeIn {
                    from { opacity: 0; transform: translateY(10px); }
                    to { opacity: 1; transform: translateY(0); }
                }
            `}</style>
        </section>
    );
}
