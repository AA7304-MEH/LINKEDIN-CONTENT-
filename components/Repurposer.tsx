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
    const [inputMode, setInputMode] = useState<'text' | 'url'>('text');
    const [textInput, setTextInput] = useState('');
    const [urlInput, setUrlInput] = useState('');
    const [result, setResult] = useState<RepurposeResult | null>(null);
    const [loading, setLoading] = useState(false);
    const [errorMsg, setErrorMsg] = useState<string | null>(null);
    const [activeTab, setActiveTab] = useState<'thread' | 'carousel' | 'question'>('thread');

    useEffect(() => {
        const textParam = searchParams.get('text');
        if (textParam) {
            setTextInput(textParam);
            setInputMode('text');
        }
        const urlParam = searchParams.get('url');
        if (urlParam) {
            setUrlInput(urlParam);
            setInputMode('url');
        }
    }, [searchParams]);

    const isValid = inputMode === 'text' ? textInput.trim().length > 0 : urlInput.trim().length > 0;

    const handleGenerate = async () => {
        if (!isValid) return;
        setLoading(true);
        setErrorMsg(null);
        setResult(null);

        try {
            const body =
                inputMode === 'url'
                    ? { url: urlInput.trim() }
                    : { sourceText: textInput.trim() };

            const res = await fetch('/api/repurpose', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(body),
            });

            const data = await res.json();

            if (!res.ok) {
                throw new Error(data.error || 'Failed to repurpose content.');
            }

            setResult(data);
            setActiveTab('thread');
        } catch (e: any) {
            setErrorMsg(e.message || 'An unexpected error occurred.');
        } finally {
            setLoading(false);
        }
    };

    const copyText = (text: string) => {
        navigator.clipboard.writeText(text);
    };

    return (
        <div className={styles.container}>
            {/* Mode Toggle */}
            <div className={styles.modeToggle}>
                <button
                    className={`${styles.modeBtn} ${inputMode === 'text' ? styles.modeBtnActive : ''}`}
                    onClick={() => { setInputMode('text'); setErrorMsg(null); }}
                >
                    📝 Paste Text
                </button>
                <button
                    className={`${styles.modeBtn} ${inputMode === 'url' ? styles.modeBtnActive : ''}`}
                    onClick={() => { setInputMode('url'); setErrorMsg(null); }}
                >
                    🔗 From URL
                </button>
            </div>

            <div className={styles.inputSection}>
                {inputMode === 'text' ? (
                    <textarea
                        className={styles.textarea}
                        value={textInput}
                        onChange={(e) => setTextInput(e.target.value)}
                        placeholder="Paste article text, blog content, or notes here..."
                        rows={6}
                    />
                ) : (
                    <div className={styles.urlInputWrapper}>
                        <input
                            type="url"
                            className={styles.urlInput}
                            value={urlInput}
                            onChange={(e) => setUrlInput(e.target.value)}
                            placeholder="https://example.com/article-to-repurpose"
                        />
                        <p className={styles.urlHint}>
                            We'll scrape the article content and repurpose it for LinkedIn.
                        </p>
                    </div>
                )}

                {errorMsg && (
                    <div className={styles.errorBanner}>⚠️ {errorMsg}</div>
                )}

                <button
                    className={styles.button}
                    onClick={handleGenerate}
                    disabled={loading || !isValid}
                >
                    {loading ? 'Repurposing…' : 'Generate All Formats'}
                </button>
            </div>

            {result && (
                <div className={styles.resultSection}>
                    <div className={styles.tabs}>
                        <button
                            className={`${styles.tab} ${activeTab === 'thread' ? styles.active : ''}`}
                            onClick={() => setActiveTab('thread')}
                        >
                            Thread
                        </button>
                        <button
                            className={`${styles.tab} ${activeTab === 'carousel' ? styles.active : ''}`}
                            onClick={() => setActiveTab('carousel')}
                        >
                            Carousel
                        </button>
                        <button
                            className={`${styles.tab} ${activeTab === 'question' ? styles.active : ''}`}
                            onClick={() => setActiveTab('question')}
                        >
                            Question
                        </button>
                    </div>

                    <div className={styles.tabContent}>
                        {activeTab === 'thread' && (
                            <div className={styles.thread}>
                                {result.thread?.map((tweet, i) => (
                                    <div key={i} className={styles.tweet}>
                                        <div className={styles.tweetHeader}>
                                            <span className={styles.counter}>{i + 1}/{result.thread.length}</span>
                                            <button className={styles.copyBtn} onClick={() => copyText(tweet)} title="Copy">📋</button>
                                        </div>
                                        <p>{tweet}</p>
                                    </div>
                                ))}
                            </div>
                        )}

                        {activeTab === 'carousel' && (
                            <div className={styles.carousel}>
                                {result.carousel?.map((slide, i) => (
                                    <div key={i} className={styles.slide}>
                                        <div className={styles.slideHeader}>
                                            <h4>Slide {i + 1}: {slide.title}</h4>
                                            <button className={styles.copyBtn} onClick={() => copyText(`${slide.title}\n\n${slide.content}`)} title="Copy">📋</button>
                                        </div>
                                        <p>{slide.content}</p>
                                    </div>
                                ))}
                            </div>
                        )}

                        {activeTab === 'question' && (
                            <div className={styles.question}>
                                <h3>Engagement Starter</h3>
                                <p>{result.question}</p>
                                <button className={styles.copyBtn} onClick={() => copyText(result.question)}>📋 Copy Question</button>
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
