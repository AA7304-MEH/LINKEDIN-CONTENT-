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
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        width="24"
                        height="24"
                        className="text-[#00e5ff]"
                    >
                        <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
                        <line x1="8" y1="21" x2="16" y2="21" />
                        <line x1="12" y1="17" x2="12" y2="21" />
                    </svg>
                    <span className="font-bold tracking-tight">RESODIN<span className="text-[#00e5ff]">.AI</span></span>
                </Link>

                {/* Desktop Navigation */}
                <div className={styles.desktopNav}>
                    <ul className={styles.navLinks}>
                        <li><Link href="/#features" className={styles.navLink}>Features</Link></li>
                        <li><Link href="/#pricing" className={styles.navLink}>Pricing</Link></li>
                        <li><Link href="/audit" className={styles.navLink}>Free Audit</Link></li>
                    </ul>
                    <div className={styles.authActions}>
                        <Link href="/sign-in" className={styles.loginBtn}>
                            Log In
                        </Link>
                        <Link href="/sign-up" className={styles.ctaBtn}>
                            Get Started
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
                            <li><Link href="/audit" className={`${styles.mobileNavLink} text-indigo-400`} onClick={closeMenu}>Free Audit</Link></li>
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
