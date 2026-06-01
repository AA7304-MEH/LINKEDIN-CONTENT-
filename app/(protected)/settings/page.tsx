"use client";

import { useState, useEffect } from "react";
import { useUser, UserProfile } from "@clerk/nextjs";
import styles from "./page.module.css";
import Link from 'next/link';

const TONE_OPTIONS = ['Professional', 'Casual', 'Data-Driven', 'Authoritative', 'Contrarian', 'Storytelling', 'Conversational'];

export default function SettingsPage() {
    const { user } = useUser();

    const [tone, setTone] = useState('Professional');
    const [contentFocus, setContentFocus] = useState('');
    const [saving, setSaving] = useState(false);
    const [saveStatus, setSaveStatus] = useState<'idle' | 'success' | 'error'>('idle');
    const [loadError, setLoadError] = useState<string | null>(null);

    // Load preferences on mount
    useEffect(() => {
        if (!user) return;

        const loadPreferences = async () => {
            try {
                const res = await fetch('/api/user/voice-profile');
                if (!res.ok) return;
                const { voiceProfile } = await res.json();
                if (voiceProfile) {
                    if (voiceProfile.tone) setTone(voiceProfile.tone);
                    if (voiceProfile.contentFocus) setContentFocus(voiceProfile.contentFocus);
                }
            } catch (err) {
                setLoadError('Could not load preferences. Please refresh.');
            }
        };

        loadPreferences();
    }, [user]);

    const handleSave = async () => {
        setSaving(true);
        setSaveStatus('idle');

        try {
            const res = await fetch('/api/user/voice-profile', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ tone, contentFocus }),
            });

            if (!res.ok) throw new Error('Failed to save');
            setSaveStatus('success');
        } catch {
            setSaveStatus('error');
        } finally {
            setSaving(false);
            setTimeout(() => setSaveStatus('idle'), 3000);
        }
    };

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

                {/* Preferences Section */}
                <section className={styles.section}>
                    <div className={styles.card}>
                        <h2>Application Preferences</h2>

                        {loadError && (
                            <p style={{ color: '#ef4444', marginBottom: '1rem', fontSize: '0.875rem' }}>
                                ⚠️ {loadError}
                            </p>
                        )}

                        <div className={styles.formGroup}>
                            <label>Default Post Tone</label>
                            <select
                                className={styles.select}
                                value={tone}
                                onChange={(e) => setTone(e.target.value)}
                            >
                                {TONE_OPTIONS.map(t => (
                                    <option key={t} value={t}>{t}</option>
                                ))}
                            </select>
                        </div>

                        <div className={styles.formGroup}>
                            <label>Content Focus</label>
                            <input
                                type="text"
                                placeholder="e.g. B2B Sales, Leadership, AI & Tech"
                                className={styles.input}
                                value={contentFocus}
                                onChange={(e) => setContentFocus(e.target.value)}
                            />
                        </div>

                        <div className={styles.saveRow}>
                            <button
                                className={styles.saveBtn}
                                onClick={handleSave}
                                disabled={saving}
                            >
                                {saving ? 'Saving…' : 'Save Preferences'}
                            </button>

                            {saveStatus === 'success' && (
                                <span className={styles.statusMsg} style={{ color: '#22c55e' }}>
                                    ✅ Preferences saved!
                                </span>
                            )}
                            {saveStatus === 'error' && (
                                <span className={styles.statusMsg} style={{ color: '#ef4444' }}>
                                    ❌ Failed to save. Please try again.
                                </span>
                            )}
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
}
