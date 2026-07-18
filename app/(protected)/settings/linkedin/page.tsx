"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { CheckCircle, AlertCircle, ArrowLeft, Linkedin, ShieldCheck, Lock, LogOut } from 'lucide-react';

export default function LinkedInSettingsPage() {
    const [status, setStatus] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [disconnecting, setDisconnecting] = useState(false);

    const fetchStatus = async () => {
        try {
            const res = await fetch('/api/linkedin/status');
            if (res.ok) {
                const data = await res.json();
                setStatus(data);
            }
        } catch (err) {
            console.error("Error fetching status:", err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchStatus();
    }, []);

    const handleDisconnect = async () => {
        if (!confirm("Are you sure you want to disconnect your LinkedIn account?")) return;
        setDisconnecting(true);
        try {
            const res = await fetch('/api/linkedin/disconnect', { method: 'POST' });
            if (res.ok) {
                await fetchStatus();
            } else {
                alert("Failed to disconnect.");
            }
        } catch (err) {
            console.error("Disconnect failed:", err);
        } finally {
            setDisconnecting(false);
        }
    };

    if (loading) {
        return (
            <div style={{ padding: '3rem', color: '#94a3b8', textAlign: 'center' }}>
                <p>Loading settings...</p>
            </div>
        );
    }

    return (
        <div style={{ maxWidth: '650px', margin: '0 auto', padding: '2rem 1.5rem' }}>
            <Link 
                href="/settings" 
                style={{ 
                    display: 'inline-flex', 
                    alignItems: 'center', 
                    gap: '0.5rem', 
                    color: '#94a3b8', 
                    textDecoration: 'none', 
                    fontSize: '0.9rem',
                    marginBottom: '2rem',
                    transition: 'color 0.2s'
                }}
            >
                <ArrowLeft size={16} /> Back to Settings
            </Link>

            <div style={{
                background: '#0A0A0A',
                border: '1px solid rgba(255, 255, 255, 0.08)',
                borderRadius: '1.25rem',
                padding: '2.5rem',
                boxShadow: '0 10px 30px -10px rgba(0, 0, 0, 0.7)'
            }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem' }}>
                    <div style={{
                        width: '48px',
                        height: '48px',
                        background: '#0077b5',
                        borderRadius: '10px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: '#fff'
                    }}>
                        <Linkedin size={24} fill="currentColor" stroke="none" />
                    </div>
                    <div>
                        <h1 style={{ fontSize: '1.5rem', margin: 0, fontWeight: 700, color: '#fff' }}>LinkedIn Integration</h1>
                        <p style={{ margin: '0.25rem 0 0 0', color: '#94a3b8', fontSize: '0.9rem' }}>Direct publishing via the official LinkedIn API</p>
                    </div>
                </div>

                {status?.connected ? (
                    <div>
                        <div style={{ 
                            display: 'inline-flex', 
                            alignItems: 'center', 
                            gap: '0.5rem', 
                            background: 'rgba(34, 197, 94, 0.1)', 
                            color: '#22c55e', 
                            border: '1px solid rgba(34, 197, 94, 0.2)', 
                            padding: '0.35rem 0.75rem', 
                            borderRadius: '9999px',
                            fontSize: '0.8rem',
                            fontWeight: 600,
                            marginBottom: '2rem'
                        }}>
                            <CheckCircle size={14} /> Connected
                        </div>

                        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '2rem' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid rgba(255, 255, 255, 0.05)', paddingBottom: '0.75rem' }}>
                                <span style={{ color: '#94a3b8', fontSize: '0.9rem' }}>Publishing as:</span>
                                <strong style={{ color: '#fff', fontSize: '0.9rem' }}>{status.name || 'Connected Profile'}</strong>
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid rgba(255, 255, 255, 0.05)', paddingBottom: '0.75rem' }}>
                                <span style={{ color: '#94a3b8', fontSize: '0.9rem' }}>Connected on:</span>
                                <span style={{ color: '#cbd5e1', fontSize: '0.9rem' }}>{status.connectedAt ? new Date(status.connectedAt).toLocaleDateString() : 'N/A'}</span>
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid rgba(255, 255, 255, 0.05)', paddingBottom: '0.75rem' }}>
                                <span style={{ color: '#94a3b8', fontSize: '0.9rem' }}>Token valid until:</span>
                                <span style={{ color: '#cbd5e1', fontSize: '0.9rem' }}>{status.tokenExpiry ? new Date(status.tokenExpiry).toLocaleDateString() : 'N/A'}</span>
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'space-between', paddingBottom: '0.5rem' }}>
                                <span style={{ color: '#94a3b8', fontSize: '0.9rem' }}>Posts published:</span>
                                <span style={{ color: '#00e5ff', fontSize: '0.9rem', fontWeight: 700 }}>{status.postsPublished} posts via Resodin</span>
                            </div>
                        </div>

                        <div style={{ 
                            background: 'rgba(239, 68, 68, 0.05)', 
                            border: '1px solid rgba(239, 68, 68, 0.15)', 
                            padding: '1rem', 
                            borderRadius: '10px', 
                            display: 'flex', 
                            gap: '0.75rem', 
                            marginBottom: '2rem' 
                        }}>
                            <AlertCircle size={20} style={{ color: '#ef4444', flexShrink: 0 }} />
                            <p style={{ margin: 0, fontSize: '0.85rem', color: '#fca5a5', lineHeight: 1.5 }}>
                                <strong>Warning:</strong> Disconnecting your account will immediately disable direct-to-LinkedIn publishing.
                            </p>
                        </div>

                        <button
                            onClick={handleDisconnect}
                            disabled={disconnecting}
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                gap: '0.5rem',
                                width: '100%',
                                padding: '0.85rem',
                                background: '#1e293b',
                                border: '1px solid #334155',
                                color: '#94a3b8',
                                borderRadius: '10px',
                                fontSize: '0.95rem',
                                fontWeight: 600,
                                cursor: 'pointer',
                                transition: 'all 0.2s'
                            }}
                        >
                            {disconnecting ? 'Disconnecting...' : 'Disconnect Account'}
                        </button>
                    </div>
                ) : (
                    <div>
                        <h2 style={{ fontSize: '1.25rem', color: '#fff', fontWeight: 600, margin: '0 0 1rem 0' }}>Connect LinkedIn Account</h2>
                        <p style={{ color: '#cbd5e1', fontSize: '0.95rem', lineHeight: 1.6, margin: '0 0 2rem 0' }}>
                            Publish directly to LinkedIn using the official API. No Chrome extension. No account risk. Your account stays 100% safe.
                        </p>

                        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '2.5rem' }}>
                            <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'flex-start' }}>
                                <ShieldCheck size={18} style={{ color: '#00e5ff', flexShrink: 0, marginTop: '2px' }} />
                                <span style={{ color: '#e2e8f0', fontSize: '0.9rem', lineHeight: 1.4 }}>Official LinkedIn API — not a browser extension</span>
                            </div>
                            <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'flex-start' }}>
                                <Lock size={18} style={{ color: '#00e5ff', flexShrink: 0, marginTop: '2px' }} />
                                <span style={{ color: '#e2e8f0', fontSize: '0.9rem', lineHeight: 1.4 }}>Your credentials are encrypted and never shared</span>
                            </div>
                            <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'flex-start' }}>
                                <CheckCircle size={18} style={{ color: '#00e5ff', flexShrink: 0, marginTop: '2px' }} />
                                <span style={{ color: '#e2e8f0', fontSize: '0.9rem', lineHeight: 1.4 }}>Revoke access anytime from LinkedIn settings</span>
                            </div>
                        </div>

                        <a
                            href="/api/linkedin/auth"
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                gap: '0.5rem',
                                width: '100%',
                                padding: '1rem',
                                background: 'linear-gradient(135deg, #0077b5 0%, #00e5ff 100%)',
                                color: '#fff',
                                textDecoration: 'none',
                                borderRadius: '10px',
                                fontSize: '1rem',
                                fontWeight: 700,
                                textAlign: 'center',
                                boxShadow: '0 4px 15px rgba(0, 229, 255, 0.25)',
                                transition: 'all 0.2s'
                            }}
                        >
                            Connect LinkedIn →
                        </a>
                    </div>
                )}
            </div>
        </div>
    );
}