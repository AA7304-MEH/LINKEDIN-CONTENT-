"use client";

import Link from 'next/link';
import styles from './SocialProof.module.css';

const testimonials = [
    {
        quote: "Saved 5 hours a week! That's time I could spend on my actual business instead of staring at a blank screen.",
        author: "Sarah Jenkins",
        role: "Marketing Director @ TechFlow",
        rating: 5
    },
    {
        quote: "3x more engagement! The hook scoring feature is incredible. My posts are finally reaching the right audience.",
        author: "David Chen",
        role: "Founder @ Scaleup AI",
        rating: 5
    },
    {
        quote: "Hook scores improved by 87%! Resonate knows exactly how to tweak my opening lines for maximum viral impact.",
        author: "Emily Rossi",
        role: "Senior Content Creator",
        rating: 5
    }
];

const pressLogos = [
    { name: "TechCrunch", url: "https://techcrunch.com", style: { fontWeight: 700 } },
    { name: "Forbes", url: "https://forbes.com", style: { fontWeight: 600, fontStyle: 'italic', fontFamily: 'serif' } },
    { name: "IndieHackers", url: "https://indiehackers.com", style: { fontWeight: 800, letterSpacing: '-1px' } },
    { name: "ProductHunt", url: "https://producthunt.com", style: { fontWeight: 700 } }
];

export default function SocialProof() {
    return (
        <section className={styles.section} id="testimonials">
            <div className={styles.container}>
                <div className={styles.grid}>
                    {testimonials.map((t, i) => (
                        <div key={i} className={styles.card}>
                            <p className={styles.quote}>"{t.quote}"</p>
                            <div className={styles.authorInfo}>
                                <div className={styles.meta}>
                                    <span className={styles.name}>— {t.author}, {t.role}</span>
                                    <div className={styles.stars}>
                                        {[...Array(t.rating)].map((_, index) => (
                                            <span key={index}>★</span>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                <div className={styles.pressSection}>
                    <h3 className={styles.pressLabel}>AS FEATURED IN</h3>
                    <div className={styles.featuredLogos}>
                        {pressLogos.map((logo, i) => (
                            <Link
                                key={i}
                                href={logo.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className={styles.logoLink}
                            >
                                <span className={styles.logoPlaceholder} style={logo.style as any}>
                                    {logo.name}
                                </span>
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
