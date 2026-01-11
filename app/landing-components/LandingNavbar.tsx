"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import styles from './LandingNavbar.module.css';

export default function LandingNavbar() {
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 20) {
                setScrolled(true);
            } else {
                setScrolled(false);
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
        // Prevent scroll when menu is open
        if (!isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
    };

    const closeMenu = () => {
        setIsOpen(false);
        document.body.style.overflow = 'unset';
    };

    return (
        <header className={`${styles.header} ${scrolled ? styles.scrolled : ''}`}>
            <nav className={styles.navbar}>
                <Link href="/#" className={styles.logo} onClick={closeMenu}>
                    <svg fill="currentColor" viewBox="0 0 24 24" height="32" width="32" xmlns="http://www.w3.org/2000/svg">
                        <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.32 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.79M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z"></path>
                    </svg>
                    <span>Resonate</span>
                </Link>

                {/* Desktop Navigation */}
                <div className={styles.desktopNav}>
                    <ul className={styles.navLinks}>
                        <li><Link href="/#features" className={styles.navLink}>Features</Link></li>
                        <li><Link href="/#pricing" className={styles.navLink}>Pricing</Link></li>
                        <li><Link href="/#faq" className={styles.navLink}>FAQ</Link></li>
                    </ul>
                    <div className={styles.authActions}>
                        <Link href="/sign-in" className={styles.loginBtn}>
                            Log In
                        </Link>
                        <Link href="/sign-up" className={styles.ctaBtn}>
                            Start Free Trial
                        </Link>
                    </div>
                </div>

                {/* Mobile Hamburger Button */}
                <button
                    className={`${styles.hamburger} ${isOpen ? styles.hamburgerActive : ''}`}
                    onClick={toggleMenu}
                    aria-label="Toggle menu"
                >
                    <span></span>
                    <span></span>
                    <span></span>
                </button>

                {/* Mobile Drawer Overlay */}
                <div className={`${styles.mobileDrawer} ${isOpen ? styles.drawerOpen : ''}`}>
                    <div className={styles.drawerContent}>
                        <ul className={styles.mobileNavLinks}>
                            <li><Link href="/#features" className={styles.mobileNavLink} onClick={closeMenu}>Features</Link></li>
                            <li><Link href="/#pricing" className={styles.mobileNavLink} onClick={closeMenu}>Pricing</Link></li>
                            <li><Link href="/#faq" className={styles.mobileNavLink} onClick={closeMenu}>FAQ</Link></li>
                        </ul>
                        <div className={styles.mobileAuthActions}>
                            <Link href="/sign-in" className={styles.mobileLoginBtn} onClick={closeMenu}>
                                Log In
                            </Link>
                            <Link href="/sign-up" className={styles.mobileCtaBtn} onClick={closeMenu}>
                                Start Free Trial
                            </Link>
                        </div>
                    </div>
                </div >
                {isOpen && <div className={styles.overlay} onClick={closeMenu}></div>}
            </nav>
        </header>
    );
}
