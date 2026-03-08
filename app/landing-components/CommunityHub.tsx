"use client";

import { useState } from 'react';
import styles from './CommunityHub.module.css';

const socialLinks = [
    {
        platform: 'twitter',
        name: 'X (Twitter)',
        url: 'https://x.com/Resonate462882',
        followers: 'Follow for daily tips & updates',
        buttonText: 'Follow →',
        tooltip: 'Join the conversation on X',
        icon: (
            <svg viewBox="0 0 24 24" width="32" height="32" fill="currentColor">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
            </svg>
        )
    },
    {
        platform: 'linkedin',
        name: 'LinkedIn',
        url: 'https://www.linkedin.com/company/resodin-ai',
        followers: 'Join our professional community',
        buttonText: 'Follow →',
        tooltip: 'Connect with us on LinkedIn',
        icon: (
            <svg viewBox="0 0 24 24" width="32" height="32" fill="currentColor">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
            </svg>
        )
    }
];

export default function CommunityHub() {
    const [email, setEmail] = useState('');
    const [isSubscribed, setIsSubscribed] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!email || !isValidEmail(email)) {
            alert('Please enter a valid email address.');
            return;
        }

        setIsLoading(true);
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000));
        setIsLoading(false);
        setIsSubscribed(true);
        setEmail('');

        // Reset after 3 seconds
        setTimeout(() => {
            setIsSubscribed(false);
        }, 3000);
    };

    function isValidEmail(email: string) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }

    return (
        <section className={styles.communitySection}>
            <div className={styles.container}>
                {/* Header */}
                <div className={styles.sectionHeader}>
                    <span className={styles.sectionBadge}>Join The Community</span>
                    <h2 className={styles.sectionTitle}>Connect with <span className={styles.gradientText}>Resodin AI</span></h2>
                    <p className={styles.sectionSubtitle}>Follow us for daily tips, AI insights, and exclusive content.</p>
                </div>

                {/* Social Cards Grid (2 Cards Only) */}
                <div className={styles.socialGrid}>
                    {socialLinks.map((link) => (
                        <a
                            key={link.platform}
                            href={link.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={styles.socialCard}
                            data-platform={link.platform}
                        >
                            <div className={`${styles.socialIcon} ${styles[link.platform + 'Icon']}`}>
                                {link.icon}
                            </div>
                            <div className={styles.socialInfo}>
                                <h3 className={styles.socialName}>{link.name}</h3>
                                <p className={styles.socialFollowers}>{link.followers}</p>
                            </div>
                            <span className={styles.followButton}>{link.buttonText}</span>
                            <div className={styles.tooltip}>{link.tooltip}</div>
                        </a>
                    ))}
                </div>

                {/* Newsletter Signup */}
                <div className={styles.newsletterBonus}>
                    <div className={styles.bonusContent}>
                        <h3 className={styles.bonusTitle}>📬 Join our newsletter</h3>
                        <p className={styles.bonusText}>Get weekly LinkedIn growth tips, AI insights, and exclusive content delivered to your inbox.</p>
                        <form className={styles.bonusForm} onSubmit={handleSubmit}>
                            <input
                                type="email"
                                placeholder="Your email address"
                                className={styles.bonusInput}
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                disabled={isLoading || isSubscribed}
                            />
                            <button
                                type="submit"
                                className={styles.bonusButton}
                                style={isSubscribed ? { background: '#00cc66' } : {}}
                                disabled={isLoading || isSubscribed}
                            >
                                {isLoading ? 'Subscribing...' : isSubscribed ? '✓ Subscribed!' : 'Subscribe'}
                            </button>
                        </form>
                        <p className={styles.bonusNote}>Join 5,000+ creators. No spam, ever.</p>
                    </div>
                </div>
            </div>
        </section>
    );
}
