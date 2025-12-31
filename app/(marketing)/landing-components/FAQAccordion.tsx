"use client";

import { useState } from 'react';
import styles from './FAQAccordion.module.css';

const faqs = [
    {
        q: "How does the AI understand my personal tone?",
        a: "Resonate uses a 'Personal Choice DNA' system. You upload 3-5 examples of your best previous posts, and our AI analyzes your sentence structure, vocabulary, and formatting preferences to mimic your style perfectly."
    },
    {
        q: "Can I use Resonate for company pages?",
        a: "Absolutely. The Business plan allows you to manage multiple profiles, including personal profiles and company pages, with distinct voices for each."
    },
    {
        q: "Is there a free trial?",
        a: "Yes! You can start with our Free plan to generate up to 5 posts per month forever. We also offer a 14-day free trial of the Pro plan so you can experience the full power of Resonate risk-free."
    },
    {
        q: "Does this work for other platforms?",
        a: "Our core focus is LinkedIn, but many users repost our content to Twitter/X successfully. Dedicated support for other platforms is on our roadmap for Q4."
    },
    {
        q: "What if I don't like the generated content?",
        a: "You can regenerate any post with a single click, or use our built-in editor to tweak it manually. The AI learns from your edits to get better over time."
    }
];

export default function FAQAccordion() {
    const [openIndex, setOpenIndex] = useState<number | null>(null);

    const toggleFAQ = (index: number) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    return (
        <section className={styles.section} id="faq">
            <div className={styles.container}>
                <h2 className={styles.title}>Frequently Asked Questions</h2>

                <div className={styles.accordion}>
                    {faqs.map((faq, index) => (
                        <div key={index} className={styles.item}>
                            <button
                                className={styles.question}
                                onClick={() => toggleFAQ(index)}
                            >
                                {faq.q}
                                <span className={`${styles.icon} ${openIndex === index ? styles.open : ''}`}>
                                    ▼
                                </span>
                            </button>
                            <div className={`${styles.answer} ${openIndex === index ? styles.open : ''}`}>
                                <p>{faq.a}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
