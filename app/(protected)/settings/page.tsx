"use client";

import { useUser, UserProfile } from "@clerk/nextjs";
import styles from "./page.module.css";
import Link from 'next/link';

export default function SettingsPage() {
    const { user } = useUser();

    if (!user) return null;

    return (
        <div className={styles.container}>
            <header className={styles.header}>
                <h1 className={styles.title}>Account Settings</h1>
                <p className={styles.subtitle}>
                    Manage your profile, preferences, and subscription.
                </p>

                <div className={styles.quickLinks}>
                    <Link href="/extension" className={styles.quickLinkItem}>
                        <span className={styles.icon}>🧩</span> Download Chrome Extension
                    </Link>
                </div>
            </header>

            <div className={styles.settingsGrid}>
                {/* Profile Section */}
                <section className={styles.section}>
                    <UserProfile routing="hash" />
                </section>

                {/* Preference Section (Placeholder for now) */}
                <section className={styles.section}>
                    <div className={styles.card}>
                        <h2>Application Preferences</h2>
                        <div className={styles.formGroup}>
                            <label>Default Post Tone</label>
                            <select className={styles.select}>
                                <option>Professional</option>
                                <option>Casual</option>
                                <option>Data-Driven</option>
                            </select>
                        </div>
                        <div className={styles.formGroup}>
                            <label>Content Focus</label>
                            <input type="text" placeholder="e.g. B2B Sales, Leadership" className={styles.input} />
                        </div>
                        <button className={styles.saveBtn}>Save Preferences</button>
                    </div>
                </section>
            </div>
        </div>
    );
}
