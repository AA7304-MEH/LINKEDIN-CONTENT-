"use client";

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import styles from './Repurposer.module.css';

interface RepurposeResult {
    thread: string[];
    carousel: { title: string; content: string }[];
    question: string;
}

function RepurposerContent() {
    const searchParams = useSearchParams();
    const [input, setInput] = useState('');
    const [result, setResult] = useState<RepurposeResult | null>(null);
    const [loading, setLoading] = useState(false);
    const [activeTab, setActiveTab] = useState<'thread' | 'carousel' | 'question'>('thread');

    useEffect(() => {
        const textParam = searchParams.get('text');
        if (textParam) {
            setInput(textParam);
        }
    }, [searchParams]);

    const handleGenerate = async () => {
        if (!input.trim()) return;
        setLoading(true);
        try {
            const res = await fetch('/api/repurpose', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ sourceText: input }),
            });
            if (!res.ok) throw new Error('Failed');
            const data = await res.json();
            setResult(data);
        } catch (e) {
            alert('Error generating');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className={styles.container}>
            <div className={styles.inputSection}>
                <textarea
                    className={styles.textarea}
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Paste article text, blog content, or notes here..."
                    rows={6}
                />
                <button className={styles.button} onClick={handleGenerate} disabled={loading || !input.trim()}>
                    {loading ? 'Repurposing...' : 'Generate All Formats'}
                </button>
            </div>

            {result && (
                <div className={styles.resultSection}>
                    <div className={styles.tabs}>
                        <button className={`${styles.tab} ${activeTab === 'thread' ? styles.active : ''}`} onClick={() => setActiveTab('thread')}>Thread</button>
                        <button className={`${styles.tab} ${activeTab === 'carousel' ? styles.active : ''}`} onClick={() => setActiveTab('carousel')}>Carousel</button>
                        <button className={`${styles.tab} ${activeTab === 'question' ? styles.active : ''}`} onClick={() => setActiveTab('question')}>Question</button>
                    </div>

                    <div className={styles.tabContent}>
                        {activeTab === 'thread' && (
                            <div className={styles.thread}>
                                {result.thread?.map((tweet, i) => (
                                    <div key={i} className={styles.tweet}>
                                        <span className={styles.counter}>{i + 1}/{result.thread.length}</span>
                                        <p>{tweet}</p>
                                    </div>
                                ))}
                            </div>
                        )}

                        {activeTab === 'carousel' && (
                            <div className={styles.carousel}>
                                {result.carousel?.map((slide, i) => (
                                    <div key={i} className={styles.slide}>
                                        <h4>Slide {i + 1}: {slide.title}</h4>
                                        <p>{slide.content}</p>
                                    </div>
                                ))}
                            </div>
                        )}

                        {activeTab === 'question' && (
                            <div className={styles.question}>
                                <h3>Engagement Starter</h3>
                                <p>{result.question}</p>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}

export default function Repurposer() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <RepurposerContent />
        </Suspense>
    );
}
