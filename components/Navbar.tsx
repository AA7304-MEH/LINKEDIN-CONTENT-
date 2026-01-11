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
                <Link href="/#pricing" className={styles.link}>
                    Pricing
                </Link>
                <Link href="/sign-in" className={styles.link}>
                    Log In
                </Link>
            </div>
        </nav>
    );
}

