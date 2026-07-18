"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
    LayoutDashboard,
    Repeat,
    Calendar,
    MessageSquare,
    Settings,
    Sparkles,
    Zap,
    Menu,
    X,
    Layers,
    Lightbulb
} from 'lucide-react';
import { useState, useEffect } from 'react';
import { UserButton, useUser } from '@clerk/nextjs';
import styles from './DashboardSidebar.module.css';

interface DashboardSidebarProps {
    creditsUsed?: number;
    creditsLimit?: number;
    userPlan?: string;
    onboardingComplete?: boolean;
}

export default function DashboardSidebar({
    creditsUsed = 0,
    creditsLimit = 10,
    userPlan = "Free",
    onboardingComplete = false
}: DashboardSidebarProps) {
    const pathname = usePathname();
    const { user } = useUser();

    const isActive = (path: string) => pathname === path;
    const usagePercentage = Math.min((creditsUsed / creditsLimit) * 100, 100);
    const [isOpen, setIsOpen] = useState(false);
    const [linkedInStatus, setLinkedInStatus] = useState<{ connected: boolean; name: string | null } | null>(null);

    useEffect(() => {
        const fetchLinkedIn = async () => {
            try {
                const res = await fetch('/api/linkedin/status');
                if (res.ok) {
                    const data = await res.json();
                    setLinkedInStatus(data);
                }
            } catch (err) {
                console.error("Error fetching linkedin status in sidebar:", err);
            }
        };
        fetchLinkedIn();
    }, []);

    // Close sidebar on route change (mobile)
    useEffect(() => {
        setIsOpen(false);
    }, [pathname]);

    const toggleSidebar = () => setIsOpen(!isOpen);

    return (
        <>
            {/* Mobile Toggle Button */}
            <button
                className={styles.mobileToggle}
                onClick={toggleSidebar}
                aria-label="Toggle Menu"
            >
                <Menu size={24} />
            </button>

            {/* Backdrop */}
            <div
                className={`${styles.backdrop} ${isOpen ? styles.visible : ''}`}
                onClick={() => setIsOpen(false)}
            />

            <aside className={`${styles.sidebar} ${isOpen ? styles.open : ''}`}>
                <div className={styles.header}>
                    <div className={styles.logo}>
                        <div className={styles.logoIcon}>
                            <Zap size={20} fill="currentColor" stroke="none" />
                        </div>
                        <span className={styles.logoText}>Resodin</span>
                    </div>
                    {/* Mobile Close Button */}
                    <button
                        className={styles.mobileToggle}
                        style={{ position: 'absolute', top: '1rem', right: '1rem', left: 'auto', background: 'transparent', border: 'none', boxShadow: 'none' }}
                        onClick={() => setIsOpen(false)}
                    >
                        <X size={24} />
                    </button>
                </div>

                <div className={styles.userSection}>
                    <div className={styles.userProfile}>
                        <UserButton afterSignOutUrl="/" />
                        <div className={styles.userInfo}>
                            <p className={styles.userName}>{user?.fullName || 'Creator'}</p>
                            <p className={styles.userPlan}>{userPlan} Plan</p>
                            {linkedInStatus?.connected ? (
                                <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', marginTop: '0.35rem', fontSize: '0.75rem', color: '#00e5ff' }}>
                                    <span style={{ width: '6px', height: '6px', backgroundColor: '#00e5ff', borderRadius: '50%' }}></span>
                                    <span>LinkedIn Connected</span>
                                </div>
                            ) : (
                                <Link href="/settings/linkedin" style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', marginTop: '0.35rem', fontSize: '0.75rem', color: '#94a3b8', textDecoration: 'none' }}>
                                    <span style={{ width: '6px', height: '6px', backgroundColor: '#94a3b8', borderRadius: '50%' }}></span>
                                    <span>Connect LinkedIn</span>
                                </Link>
                            )}
                        </div>
                    </div>
                </div>

                <nav className={styles.nav}>
                    <div className={styles.group}>
                        <h3 className={styles.groupTitle}>Create</h3>
                        <Link href="/dashboard" className={`${styles.link} ${isActive('/dashboard') ? styles.active : ''}`}>
                            <LayoutDashboard size={20} />
                            <span>Generator</span>
                        </Link>
                        <Link href="/hook-analyzer" className={`${styles.link} ${isActive('/hook-analyzer') ? styles.active : ''}`}>
                            <Sparkles size={20} />
                            <span>Hook Scorer</span>
                        </Link>
                        <Link href="/repurpose" className={`${styles.link} ${isActive('/repurpose') ? styles.active : ''}`}>
                            <Repeat size={20} />
                            <span>Repurpose</span>
                        </Link>
                        <Link href="/carousel" className={`${styles.link} ${isActive('/carousel') ? styles.active : ''}`}>
                            <Layers size={20} />
                            <span>Carousel</span>
                        </Link>
                        <Link href="/inspiration" className={`${styles.link} ${isActive('/inspiration') ? styles.active : ''}`}>
                            <Lightbulb size={20} />
                            <span>Inspiration</span>
                        </Link>
                    </div>

                    <div className={styles.group}>
                        <h3 className={styles.groupTitle}>Manage</h3>
                        <Link href="/calendar" className={`${styles.link} ${isActive('/calendar') ? styles.active : ''}`}>
                            <Calendar size={20} />
                            <span>Calendar</span>
                        </Link>
                        <Link href="/comments" className={`${styles.link} ${isActive('/comments') ? styles.active : ''}`}>
                            <MessageSquare size={20} />
                            <span>Engage</span>
                        </Link>
                        <Link href="/analytics" className={`${styles.link} ${isActive('/analytics') ? styles.active : ''}`}>
                            <span style={{ fontSize: '1.25rem', lineHeight: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', width: 20, height: 20 }}>📊</span>
                            <span>Analytics</span>
                        </Link>
                    </div>

                    <div className={styles.group}>
                        <h3 className={styles.groupTitle}>System</h3>
                        <Link href="/settings" className={`${styles.link} ${isActive('/settings') ? styles.active : ''}`}>
                            <Settings size={20} />
                            <span>Settings</span>
                        </Link>
                        <Link href="/extension" className={`${styles.link} ${isActive('/extension') ? styles.active : ''}`}>
                            <span style={{ fontSize: '1.25rem', lineHeight: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', width: 20, height: 20 }}>🧩</span>
                            <span>Extension</span>
                        </Link>
                        <Link href="/referral" className={`${styles.link} ${isActive('/referral') ? styles.active : ''}`}>
                            <span style={{ fontSize: '1.25rem', lineHeight: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', width: 20, height: 20 }}>🎁</span>
                            <span>Referrals</span>
                        </Link>
                        <Link href="/marketing" className={`${styles.link} ${isActive('/marketing') ? styles.active : ''}`}>
                            <span style={{ fontSize: '1.25rem', lineHeight: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', width: 20, height: 20 }}>📣</span>
                            <span>Marketing</span>
                        </Link>
                    </div>
                </nav>


                <div className={styles.footer}>
                    <div style={{ padding: '0.75rem 1rem', background: '#1e293b', borderRadius: '12px', marginBottom: '1rem', fontSize: '0.8rem', border: '1px solid #334155' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem', alignItems: 'center' }}>
                            <span style={{ color: '#94a3b8' }}>Voice DNA:</span>
                            {onboardingComplete ? (
                                <span style={{ color: '#22c55e', fontWeight: 700 }}>✅ Complete</span>
                            ) : (
                                <Link href="/onboarding" style={{ color: '#f59e0b', fontWeight: 700, textDecoration: 'underline' }}>⚠️ Incomplete</Link>
                            )}
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <span style={{ color: '#94a3b8' }}>Posting Streak:</span>
                            <span style={{ color: '#f97316', fontWeight: 800 }}>🔥 3 days</span>
                        </div>
                    </div>

                    <div className={styles.credits}>
                        <div className={styles.creditsBar}>
                            <div
                                className={styles.creditsFill}
                                style={{
                                    width: `${usagePercentage}%`,
                                    background: usagePercentage >= 100 ? '#ef4444' : 'linear-gradient(90deg, #06b6d4, #0891b2)'
                                }}
                            ></div>
                        </div>
                        <p>Posts: {creditsUsed} / {userPlan === 'PRO' ? '∞' : creditsLimit}</p>
                        {usagePercentage >= 90 && userPlan !== 'PRO' && (
                            <Link href="/settings" style={{ display: 'block', fontSize: '0.75rem', color: '#ef4444', marginTop: '0.25rem', textAlign: 'right', fontWeight: 600 }}>
                                {usagePercentage >= 100 ? 'Limit Reached • Upgrade' : 'Running Low • Upgrade'}
                            </Link>
                        )}
                    </div>
                </div>
            </aside>
        </>
    );
}
