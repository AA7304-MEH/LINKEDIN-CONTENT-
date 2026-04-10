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
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            width="28"
                            height="28"
                            className="text-[#00e5ff]"
                        >
                            <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
                            <line x1="8" y1="21" x2="16" y2="21" />
                            <line x1="12" y1="17" x2="12" y2="21" />
                        </svg>
                        <span className="font-bold tracking-tight">RESODIN<span className="text-[#00e5ff]">.AI</span></span>
                    </Link>
                    <p className={styles.footerDesc}>
                        The first AI content engine that decodes your personal voice for high-authority LinkedIn growth.
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
                            <li><Link href="/blog" className={styles.footerLink}>Blog</Link></li>
                            <li><Link href="/help" className={styles.footerLink}>Help Center</Link></li>
                            <li><Link href="/case-studies" className={styles.footerLink}>Case Studies</Link></li>
                            <li><Link href="/api-docs" className={styles.footerLink}>API</Link></li>
                        </ul>
                    </div>
                    <div>
                        <h3 className={styles.navHeading}>Company</h3>
                        <ul className={styles.footerLinks}>
                            <li><Link href="/about" className={styles.footerLink}>About</Link></li>
                            <li><Link href="/careers" className={styles.footerLink}>Careers</Link></li>
                            <li><Link href="/contact" className={styles.footerLink}>Contact</Link></li>
                            <li><Link href="/privacy" className={styles.footerLink}>Privacy Policy</Link></li>
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
                        <p>© 2026 Resodin Inc.</p>
                    </div>
                </div>

            </div>
        </footer>
    );
}
