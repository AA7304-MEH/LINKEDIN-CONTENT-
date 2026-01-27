"use client";

import styles from './ComparisonDemo.module.css';

export default function ComparisonDemo() {
    return (
        <section className={styles.section} id="comparison-demo">
            <div className={styles.container}>
                {/* Left Side: Generic AI */}
                <div className={styles.leftPanel}>
                    <div className={styles.leftHeader}>
                        Generic AI Output
                    </div>
                    <div className={styles.leftContent}>
                        <h3 className={styles.leftHeadline}>A Critique of OKR Methodologies</h3>
                        <p className={styles.leftBody}>
                            Many organizations utilize Objectives and Key Results (OKRs) as a primary framework for goal-setting and strategic planning. However, it is worth examining potential inefficiencies. This post will explore several criticisms of the OKR model, particularly for startups, and consider alternative approaches for measuring progress and alignment.
                        </p>
                    </div>
                </div>

                {/* Right Side: Personal Content DNA */}
                <div className={styles.rightPanel}>
                    <div className={styles.rightHeader}>
                        With Personal Content DNA
                    </div>
                    <div className={styles.rightContent}>
                        <h3 className={styles.rightHeadline}>OKRs are where strategy goes to die.</h3>
                        <div className={styles.rightBody}>
                            <p style={{ marginBottom: '1rem' }}>
                                We spent 3 years trying to make them work. 12 quarters of tracking "Key Results" that were actually just "Busy Results."
                            </p>
                            <p style={{ marginBottom: '1rem' }}>
                                <strong>Here's the hard truth:</strong> Most startups don't need OKRs. They need conviction.
                            </p>
                            <p style={{ marginBottom: '1.5rem' }}>
                                We traded complex spreadsheets for a single "North Star" metric. The results?
                            </p>

                            <div className={styles.statList}>
                                <div className={styles.statItem}>
                                    <span className={styles.bullet}>{'>'}</span> 40% faster shipping cycles.
                                </div>
                                <div className={styles.statItem}>
                                    <span className={styles.bullet}>{'>'}</span> Higher team morale.
                                </div>
                                <div className={styles.statItem}>
                                    <span className={styles.bullet}>{'>'}</span> Zero time in "alignment meetings."
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
