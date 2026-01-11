"use client";

import styles from "./page.module.css";
import Link from 'next/link';

export default function ExtensionPage() {
    return (
        <div className={styles.container}>
            <div className={styles.hero}>
                <div className={styles.iconWrapper}>
                    <svg fill="none" viewBox="0 0 24 24" height="64" width="64" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                    </svg>
                </div>
                <h1 className={styles.title}>Resonate for Chrome</h1>
                <p className={styles.description}>
                    Bring the power of AI directly into your LinkedIn feed. Generate comments, analyze posts, and save hooks with one click.
                </p>

                <div className={styles.downloadSection}>
                    <a href="/resonate-extension.zip" download className={styles.downloadBtn} style={{ textDecoration: 'none', display: 'inline-block' }}>
                        Download Extension (.zip)
                    </a>
                    <p className={styles.versionInfo}>Version 1.0.2 • Updated Jan 11, 2026</p>
                </div>
            </div>

            <div className={styles.instructions}>
                <h2>How to Install</h2>
                <div className={styles.steps}>
                    <div className={styles.step}>
                        <div className={styles.stepNumber}>1</div>
                        <div className={styles.stepContent}>
                            <h3>Download & Unzip</h3>
                            <p>Download the .zip file above and extract it to a folder on your computer.</p>
                        </div>
                    </div>
                    <div className={styles.step}>
                        <div className={styles.stepNumber}>2</div>
                        <div className={styles.stepContent}>
                            <h3>Open Extensions</h3>
                            <p>Go to <code className={styles.code}>chrome://extensions</code> in your browser address bar.</p>
                        </div>
                    </div>
                    <div className={styles.step}>
                        <div className={styles.stepNumber}>3</div>
                        <div className={styles.stepContent}>
                            <h3>Enable Developer Mode</h3>
                            <p>Toggle the "Developer mode" switch in the top right corner.</p>
                        </div>
                    </div>
                    <div className={styles.step}>
                        <div className={styles.stepNumber}>4</div>
                        <div className={styles.stepContent}>
                            <h3>Load Unpacked</h3>
                            <p>Click "Load unpacked" and select the folder you extracted in Step 1.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
