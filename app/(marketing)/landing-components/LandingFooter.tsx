import Link from 'next/link';
import styles from './FooterCTA.module.css';

export default function LandingFooter() {
    return (
        <footer className={styles.footer}>
            <div className={styles.footerContainer}>
                <div className={styles.footerTop}>
                    <div className={styles.footerBrand}>
                        <div className={styles.footerLogo}>
                            <svg fill="currentColor" viewBox="0 0 24 24" height="24" width="24" xmlns="http://www.w3.org/2000/svg">
                                <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.32 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.79M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z"></path>
                            </svg>
                            <span>Resonate</span>
                        </div>
                        <p className={styles.footerDesc}>
                            AI-powered content generation for LinkedIn professionals. Grow your personal brand with consistency and quality.
                        </p>
                    </div>

                    <div className={styles.footerCol}>
                        <h4>Product</h4>
                        <ul className={styles.footerLinks}>
                            <li><Link href="#features" className={styles.footerLink}>Features</Link></li>
                            <li><Link href="#pricing" className={styles.footerLink}>Pricing</Link></li>
                            <li><Link href="#" className={styles.footerLink}>Changelog</Link></li>
                            <li><Link href="#" className={styles.footerLink}>Roadmap</Link></li>
                        </ul>
                    </div>

                    <div className={styles.footerCol}>
                        <h4>Resources</h4>
                        <ul className={styles.footerLinks}>
                            <li><Link href="#" className={styles.footerLink}>Blog</Link></li>
                            <li><Link href="#" className={styles.footerLink}>Community</Link></li>
                            <li><Link href="#" className={styles.footerLink}>Help Center</Link></li>
                            <li><Link href="#" className={styles.footerLink}>API</Link></li>
                        </ul>
                    </div>

                    <div className={styles.footerCol}>
                        <h4>Company</h4>
                        <ul className={styles.footerLinks}>
                            <li><Link href="#" className={styles.footerLink}>About</Link></li>
                            <li><Link href="#" className={styles.footerLink}>Careers</Link></li>
                            <li><Link href="#" className={styles.footerLink}>Privacy</Link></li>
                            <li><Link href="#" className={styles.footerLink}>Terms</Link></li>
                        </ul>
                    </div>
                </div>

                <div className={styles.footerBottom}>
                    <div>&copy; {new Date().getFullYear()} Resonate Inc. All rights reserved.</div>
                    <div className={styles.socials}>
                        {/* Simple social icons */}
                        {['Tw', 'Li', 'Ig'].map(s => (
                            <div key={s} className={styles.socialIcon}>{s}</div>
                        ))}
                    </div>
                </div>
            </div>
        </footer>
    );
}
