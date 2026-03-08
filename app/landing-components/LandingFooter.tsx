import Link from 'next/link';
import { Linkedin, Twitter } from 'lucide-react';
import styles from './FooterCTA.module.css';

export default function LandingFooter() {
    return (
        <footer className={styles.footer}>
            <div className={styles.footerContainer}>
                {/* Column 1: Brand */}
                <div className={styles.footerBrand}>
                    <Link href="/" className={styles.footerLogo}>
                        {/* Simple SVG Logo */}
                        <svg fill="currentColor" viewBox="0 0 24 24" height="28" width="28" xmlns="http://www.w3.org/2000/svg">
                            <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.32 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.79M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z"></path>
                        </svg>
                        <span>Resodin</span>
                    </Link>
                    <p className={styles.footerDesc}>
                        AI-powered content generation for LinkedIn professionals. Grow your personal brand with consistency and quality.
                    </p>
                </div>

                {/* Column 2: Navigation Links */}
                <nav className={styles.footerNav}>
                    <div>
                        <h3 className={styles.navHeading}>Product</h3>
                        <ul className={styles.footerLinks}>
                            <li><Link href="#features" className={styles.footerLink}>Features</Link></li>
                            <li><Link href="#pricing" className={styles.footerLink}>Pricing</Link></li>
                            <li><Link href="/audit" className={styles.footerLink}>Free Audit</Link></li>
                            <li><Link href="/sign-in" className={styles.footerLink}>Log In</Link></li>
                        </ul>
                    </div>
                    <div>
                        <h3 className={styles.navHeading}>Resources</h3>
                        <ul className={styles.footerLinks}>
                            <li><Link href="#" className={styles.footerLink}>Blog</Link></li>
                            <li><Link href="#" className={styles.footerLink}>Help Center</Link></li>
                            <li><Link href="#" className={styles.footerLink}>Case Studies</Link></li>
                            <li><Link href="#" className={styles.footerLink}>API</Link></li>
                        </ul>
                    </div>
                    <div>
                        <h3 className={styles.navHeading}>Company</h3>
                        <ul className={styles.footerLinks}>
                            <li><Link href="#" className={styles.footerLink}>About</Link></li>
                            <li><Link href="#" className={styles.footerLink}>Careers</Link></li>
                            <li><Link href="#" className={styles.footerLink}>Contact</Link></li>
                            <li><Link href="#" className={styles.footerLink}>Privacy</Link></li>
                        </ul>
                    </div>
                </nav>

                {/* Column 3: Social & Legal */}
                <div className={styles.footerExtra}>
                    <div>
                        <h3 className={styles.socialHeading}>Connect</h3>
                        <div className={styles.socialLinks}>
                            <Link href="https://www.linkedin.com/company/resodin-ai" target="_blank" rel="noopener noreferrer" className={styles.socialIconLink} aria-label="LinkedIn">
                                <Linkedin size={20} />
                            </Link>
                            <Link href="https://x.com/Resonate462882" target="_blank" rel="noopener noreferrer" className={styles.socialIconLink} aria-label="Twitter">
                                <Twitter size={20} />
                            </Link>
                        </div>
                    </div>
                    <div className={styles.legal}>
                        <p>&copy; {new Date().getFullYear()} Resodin Inc. All rights reserved.</p>
                    </div>
                </div>
            </div>
        </footer>
    );
}
