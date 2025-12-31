import styles from './FooterCTA.module.css';

export default function CTASection() {
    return (
        <section className={styles.ctaSection}>
            <div className={styles.ctaContainer}>
                <h2 className={styles.ctaTitle}>Ready to save 5+ hours a week?</h2>
                <div style={{ marginTop: '2rem' }}>
                    <a href="/sign-up" className={styles.ctaButton} style={{ display: 'inline-block', textDecoration: 'none', lineHeight: '1.5' }}>
                        Start your free trial today
                    </a>
                </div>
                <p className={styles.ctaSub}>No credit card required. 14-day free trial on Pro plans.</p>
            </div>
        </section>
    );
}
