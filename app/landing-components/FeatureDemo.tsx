"use client";

import { useState } from 'react';
import styles from './FeatureDemo.module.css';

const steps = [
    {
        id: 1,
        title: "Input a Topic",
        description: "Simply type what you want to write about. 'Future of remote work', 'AI in Marketing', etc."
    },
    {
        id: 2,
        title: "Get Viral Hooks",
        description: "Our AI generates high-converting hooks based on proven viral frameworks, scored by potential."
    },
    {
        id: 3,
        title: "Generate Full Post",
        description: "Select your favorite hook and watch Resonate write the entire post in your specific tone."
    },
    {
        id: 4,
        title: "Schedule & Publish",
        description: "Add to your content calendar and sync directly with LinkedIn."
    }
];

export default function FeatureDemo() {
    const [activeStep, setActiveStep] = useState(1);

    return (
        <section className={styles.section} id="how-it-works">
            <div className={styles.container}>
                <div className={styles.header}>
                    <h2 className={styles.title}>See the Magic in Action</h2>
                    <p className={styles.subtitle}>From idea to scheduled post in under 60 seconds.</p>
                </div>

                <div className={styles.content}>
                    <div className={styles.steps}>
                        {steps.map((step) => (
                            <div
                                key={step.id}
                                className={`${styles.step} ${activeStep === step.id ? styles.active : ''}`}
                                onMouseEnter={() => setActiveStep(step.id)}
                            >
                                <div className={styles.stepNumber}>{step.id}</div>
                                <div className={styles.stepContent}>
                                    <h4>{step.title}</h4>
                                    <p>{step.description}</p>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className={styles.preview}>
                        {activeStep === 1 && (
                            <div className={styles.videoContainer} style={{ width: '100%', borderRadius: '8px', overflow: 'hidden', boxShadow: '0 4px 6px rgba(0,0,0,0.1)' }}>
                                <img
                                    src="/demo-video.webp"
                                    alt="Resonate Solution Demo"
                                    style={{ width: '100%', display: 'block' }}
                                />
                                <div style={{ padding: '1rem', background: '#f9fafb', fontSize: '0.9rem', color: '#6b7280', textAlign: 'center' }}>
                                    Watch how Resonate generates viral content in seconds
                                </div>
                            </div>
                        )}

                        {activeStep === 2 && (
                            <div>
                                <div className={styles.hookCard}>
                                    <span>Remote work isn't the future. It's the present. Here's why...</span>
                                    <span className={styles.hookScore}>9.8</span>
                                </div>
                                <div className={styles.hookCard}>
                                    <span>Stop forcing your team back to the office.</span>
                                    <span className={styles.hookScore}>8.5</span>
                                </div>
                                <div className={styles.hookCard}>
                                    <span>5 remote work myths that are holding you back.</span>
                                    <span className={styles.hookScore}>9.2</span>
                                </div>
                            </div>
                        )}

                        {activeStep === 3 && (
                            <div className={styles.finalPost}>
                                <p>Remote work isn't the future. It's the present.</p>
                                <br />
                                <p>I've spoken to 50+ founders in the last month.</p>
                                <p>90% of them are hiring remote-first.</p>
                                <br />
                                <p>Why? Access to global talent, lower overhead, and happier employees.</p>
                                <br />
                                <p>If you're still mandating RTO, you're fighting a losing battle.</p>
                                <p className={styles.hashtags}>#RemoteWork #Leadership #FutureOfWork</p>
                            </div>
                        )}

                        {activeStep === 4 && (
                            <div className={styles.calendarView}>
                                {[...Array(28)].map((_, i) => (
                                    <div key={i} className={`${styles.calendarDay} ${i === 12 ? styles.scheduled : ''}`}>
                                        {i === 12 ? 'POST' : ''}
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </section>
    );
}
