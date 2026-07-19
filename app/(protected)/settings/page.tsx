"use client";

import { useState, useEffect } from "react";
import { useUser, UserProfile } from "@clerk/nextjs";
import styles from "./page.module.css";
import Link from 'next/link';
import VoiceDnaCard from "@/components/VoiceDnaCard";

const TONE_OPTIONS = ['Professional', 'Casual', 'Data-Driven', 'Authoritative', 'Contrarian', 'Storytelling', 'Conversational'];

export default function SettingsPage() {
    const { user } = useUser();

    const [tone, setTone] = useState('Professional');
    const [contentFocus, setContentFocus] = useState('');
    const [saving, setSaving] = useState(false);
    const [saveStatus, setSaveStatus] = useState<'idle' | 'success' | 'error'>('idle');
    const [loadError, setLoadError] = useState<string | null>(null);
    const [linkedinConnected, setLinkedinConnected] = useState(false);
    const [linkedinStatus, setLinkedinStatus] = useState<'idle' | 'success' | 'error'>('idle');
    const [voiceProfile, setVoiceProfile] = useState<any>(null);

    // Check for LinkedIn status on mount
    useEffect(() => {
        const checkLinkedIn = async () => {
            try {
                const res = await fetch('/api/linkedin/status');
                if (res.ok) {
                    const data = await res.json();
                    setLinkedinConnected(data.connected);
                }
            } catch (err) {
                console.error("Error fetching linkedin status:", err);
            }
        };

        checkLinkedIn();

        const params = new URLSearchParams(window.location.search);
        const linkedin = params.get('linkedin');
        if (linkedin === 'connected' || linkedin === 'success') {
            setLinkedinConnected(true);
            setLinkedinStatus('success');
        } else if (linkedin === 'error') {
            setLinkedinStatus('error');
        }
    }, []);

    // Load preferences on mount
    useEffect(() => {
        if (!user) return;

        const loadPreferences = async () => {
            try {
                const res = await fetch('/api/user/voice-profile');
                if (!res.ok) return;
                const { voiceProfile } = await res.json();
                if (voiceProfile) {
                    setVoiceProfile(voiceProfile);
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
                body: JSON.stringify({
                    ...voiceProfile,
                    tone,
                    contentFocus
                }),
            });

            if (!res.ok) throw new Error('Failed to save');
            const data = await res.json();
            setVoiceProfile(data.voiceProfile);
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

                {/* Voice DNA Profile Card Section */}
                {voiceProfile?.analysis && (
                    <section className={styles.section} style={{ gridColumn: 'span 2' }}>
                        <div className={styles.card}>
                            <h2>LinkedIn Content Voice DNA</h2>
                            <div style={{ marginTop: '1rem' }}>
                                <VoiceDnaCard analysis={voiceProfile.analysis} />
                            </div>
                        </div>
                    </section>
                )}

                {/* Integrations Section */}
                <section className={styles.section}>
                    <div className={styles.card}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.5rem' }}>
                            <span style={{ fontSize: '1.5rem' }}>🔌</span>
                            <h2 style={{ margin: 0 }}>Integrations</h2>
                        </div>

                        {linkedinStatus === 'success' && (
                            <p style={{ color: '#22c55e', marginBottom: '1rem', fontSize: '0.875rem' }}>✅ LinkedIn connected successfully!</p>
                        )}
                        {linkedinStatus === 'error' && (
                            <p style={{ color: '#ef4444', marginBottom: '1rem', fontSize: '0.875rem' }}>❌ LinkedIn connection failed. Please try again.</p>
                        )}

                        <div style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            padding: '1.25rem',
                            background: 'rgba(255, 255, 255, 0.02)',
                            border: '1px solid rgba(255, 255, 255, 0.08)',
                            borderRadius: '12px'
                        }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                                <span style={{
                                    width: '8px',
                                    height: '8px',
                                    backgroundColor: linkedinConnected ? '#22c55e' : '#64748b',
                                    borderRadius: '50%'
                                }}></span>
                                <div>
                                    <strong style={{ display: 'block', color: '#fff', fontSize: '0.95rem' }}>LinkedIn Publishing</strong>
                                    <span style={{ color: '#94a3b8', fontSize: '0.85rem' }}>
                                        {linkedinConnected ? 'Connected & Active' : 'Not Connected'}
                                    </span>
                                </div>
                            </div>
                            <Link 
                                href="/settings/linkedin" 
                                style={{
                                    background: 'rgba(255, 255, 255, 0.05)',
                                    border: '1px solid rgba(255, 255, 255, 0.1)',
                                    color: '#fff',
                                    padding: '0.5rem 1rem',
                                    borderRadius: '8px',
                                    fontSize: '0.85rem',
                                    fontWeight: 600,
                                    textDecoration: 'none',
                                    transition: 'background 0.2s'
                                }}
                            >
                                Manage
                            </Link>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
}
