"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
    LayoutDashboard,
    anchor, // Hook icon proxy?
    Repeat, // Repurpose
    Calendar,
    MessageSquare, // Comments
    Settings,
    Sparkles,
    Zap
} from 'lucide-react';
import { UserButton, useUser } from '@clerk/nextjs';
import styles from './DashboardSidebar.module.css';

interface DashboardSidebarProps {
    creditsUsed?: number;
    creditsLimit?: number;
    userPlan?: string;
}

export default function DashboardSidebar({
    creditsUsed = 0,
    creditsLimit = 10,
    userPlan = "Free"
}: DashboardSidebarProps) {
    const pathname = usePathname();
    const { user } = useUser();

    const isActive = (path: string) => pathname === path;
    const usagePercentage = Math.min((creditsUsed / creditsLimit) * 100, 100);

    return (
        <aside className={styles.sidebar}>
            <div className={styles.header}>
                <div className={styles.logo}>
                    <div className={styles.logoIcon}>
                        <Zap size={20} fill="currentColor" stroke="none" />
                    </div>
                    <span className={styles.logoText}>Resonate</span>
                </div>
            </div>

            <div className={styles.userSection}>
                <div className={styles.userProfile}>
                    <UserButton afterSignOutUrl="/" />
                    <div className={styles.userInfo}>
                        <p className={styles.userName}>{user?.fullName || 'Creator'}</p>
                        <p className={styles.userPlan}>{userPlan} Plan</p>
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
                </div>
            </nav>

            <div className={styles.footer}>
                <div className={styles.credits}>
                    <div className={styles.creditsBar}>
                        <div
                            className={styles.creditsFill}
                            style={{
                                width: `${usagePercentage}%`,
                                background: usagePercentage >= 100 ? '#ef4444' : 'linear-gradient(90deg, #2563eb, #60a5fa)'
                            }}
                        ></div>
                    </div>
                    <p>{creditsUsed} / {creditsLimit} Credits Used</p>
                    {usagePercentage >= 90 && (
                        <Link href="/settings" style={{ display: 'block', fontSize: '0.75rem', color: '#ef4444', marginTop: '0.25rem', textAlign: 'right', fontWeight: 600 }}>
                            {usagePercentage >= 100 ? 'Limit Reached • Upgrade' : 'Running Low • Upgrade'}
                        </Link>
                    )}
                </div>
            </div>
        </aside>
    );
}
