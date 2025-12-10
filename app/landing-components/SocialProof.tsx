import styles from './SocialProof.module.css';

export default function SocialProof() {
    return (
        <section className={styles.section} id="testimonials">
            <div className={styles.container}>
                <div className={styles.rating}>
                    <div className={styles.stars}>★★★★★</div>
                    <span>4.9/5 Average Rating</span>
                </div>

                <div className={styles.grid}>
                    <div className={styles.card}>
                        <p className={styles.quote}>"Saved 5 hours/week! That's time I could spend on my actual business instead of staring at a blank screen."</p>
                        <div className={styles.author}>
                            <div className={styles.avatar} style={{ background: '#ccc' }}></div>
                            <div className={styles.meta}>
                                <span className={styles.name}>Sarah Jenkins</span>
                                <span className={styles.title}>Marketing Director</span>
                            </div>
                        </div>
                    </div>

                    <div className={styles.card}>
                        <p className={styles.quote}>"3x more engagement! The hook scoring feature is incredible. My posts are finally reaching the right audience."</p>
                        <div className={styles.author}>
                            <div className={styles.avatar} style={{ background: '#bbb' }}></div>
                            <div className={styles.meta}>
                                <span className={styles.name}>David Chen</span>
                                <span className={styles.title}>Founder</span>
                            </div>
                        </div>
                    </div>

                    <div className={styles.card}>
                        <p className={styles.quote}>"Hook scores improved 87%! Resonate knows exactly how to tweak my opening lines for maximum impact."</p>
                        <div className={styles.author}>
                            <div className={styles.avatar} style={{ background: '#aaa' }}></div>
                            <div className={styles.meta}>
                                <span className={styles.name}>Emily Rossi</span>
                                <span className={styles.title}>Content Creator</span>
                            </div>
                        </div>
                    </div>
                </div>

                <div className={styles.featuredLogos}>
                    {/* Using text placeholders for logos as per standard practice when real assets aren't provided */}
                    <span className={styles.logoPlaceholder}>TechCrunch</span>
                    <span className={styles.logoPlaceholder}>Forbes</span>
                    <span className={styles.logoPlaceholder}>IndieHackers</span>
                    <span className={styles.logoPlaceholder}>ProductHunt</span>
                </div>
            </div>
        </section>
    );
}
