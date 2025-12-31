"use client";

import { useState } from 'react';
import Link from 'next/link';
import styles from './LandingNavbar.module.css';

export default function LandingNavbar() {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <nav className={styles.navbar}>
            <div className={styles.logoConfig}>
                <svg fill="currentColor" viewBox="0 0 24 24" height="24" width="24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.32 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.79M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z"></path>
                </svg>
                <span>Resonate</span>
            </div>

            <button className={styles.hamburger} onClick={() => setIsOpen(!isOpen)} aria-label="Toggle menu">
                <span></span>
                <span></span>
                <span></span>
            </button>

            <ul className={`${styles.navLinks} ${isOpen ? styles.open : ''}`}>
                <li><Link href="/#features" className={styles.navLink} onClick={() => setIsOpen(false)}>Features</Link></li>
                <li><Link href="/#pricing" className={styles.navLink} onClick={() => setIsOpen(false)}>Pricing</Link></li>
                <li><Link href="/#testimonials" className={styles.navLink} onClick={() => setIsOpen(false)}>Testimonials</Link></li>
                <li><Link href="/#faq" className={styles.navLink} onClick={() => setIsOpen(false)}>FAQ</Link></li>

                {/* Mobile only auth buttons if needed, or keep top right */}
                {isOpen && (
                    <div className={styles.authButtonsMobile}>
                        <Link href="/sign-in" className={styles.loginBtn}>Login</Link>
                        <Link href="/sign-up" className={styles.getStartedBtn}>Get Started</Link>
                    </div>
                )}
            </ul>

            <div className={styles.authButtons} style={{ display: isOpen ? 'none' : 'flex' }}>
                <Link href="/sign-in" className={styles.loginBtn}>
                    Login
                </Link>
                <Link href="/sign-up" className={styles.getStartedBtn}>
                    Get Started
                </Link>
            </div>
        </nav>
    );
}
