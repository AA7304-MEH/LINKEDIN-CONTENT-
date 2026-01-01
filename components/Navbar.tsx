"use client";

import Link from "next/link";
import styles from "./Navbar.module.css";

export default function Navbar() {
    return (
        <nav className={styles.navbar}>
            <Link href="/" className={styles.logo}>
                Resonate
            </Link>
            <div className={styles.navLinks}>
                <Link href="/dashboard" className={styles.link}>
                    Dashboard
                </Link>
                <Link href="/pricing" className={styles.link}>
                    Pricing
                </Link>
                <Link href="/hook-analyzer" className={styles.link}>
                    Hook Engine
                </Link>
                <Link href="/repurpose" className={styles.link}>
                    Repurpose
                </Link>
                <Link href="/comments" className={styles.link}>
                    Comments
                </Link>
                <Link href="/calendar" className={styles.link}>
                    Calendar
                </Link>
                <Link href="/extension" className={styles.link}>
                    Extension
                </Link>
                <Link href="/admin/marketing" className={styles.link}>
                    Admin Dashboard
                </Link>
            </div>
        </nav>
    );
}

