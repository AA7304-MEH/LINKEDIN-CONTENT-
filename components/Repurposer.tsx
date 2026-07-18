"use client";

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import toast from 'react-hot-toast';
import styles from './Repurposer.module.css';

interface RepurposeResult {
    thread: string[];
    carousel: { title: string; content: string }[];
    question: string;
    newsletter?: string;
}

const getWordCount = (text: string) => {
    if (!text) return 0;
    return text.trim().split(/\s+/).filter(Boolean).length;
};

function RepurposerContent() {
    const searchParams = useSearchParams();
    const [inputMode, setInputMode] = useState<'text' | 'url'>('text');
    const [textInput, setTextInput] = useState('');
    const [urlInput, setUrlInput] = useState('');
    const [result, setResult] = useState<RepurposeResult | null>(null);
    const [loading, setLoading] = useState(false);
    const [errorMsg, setErrorMsg] = useState<string | null>(null);
    const [activeTab, setActiveTab] = useState<'thread' | 'carousel' | 'question' | 'newsletter'>('thread');
    const [regeneratingTab, setRegeneratingTab] = useState<string | null>(null);

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

    const handleGenerate = async (singleTabToRegen?: 'thread' | 'carousel' | 'question' | 'newsletter') => {
        if (!isValid) return;
        
        if (singleTabToRegen) {
            setRegeneratingTab(singleTabToRegen);
        } else {
            setLoading(true);
            setResult(null);
        }
        setErrorMsg(null);

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

            if (singleTabToRegen) {
                setResult(prev => {
                    if (!prev) return data;
                    return {
                        ...prev,
                        [singleTabToRegen]: data[singleTabToRegen]
                    };
                });
                toast.success(`Regenerated ${singleTabToRegen} successfully!`);
            } else {
                setResult(data);
                setActiveTab('thread');
                toast.success("Repurposed content in all formats!");
            }
        } catch (e: any) {
            setErrorMsg(e.message || 'An unexpected error occurred.');
            toast.error(e.message || 'Error occurred while repurposing.');
        } finally {
            setLoading(false);
            setRegeneratingTab(null);
        }
    };

    const copyText = (text: string) => {
        navigator.clipboard.writeText(text);
        toast.success("Copied to clipboard!");
    };

    // Calculate word counts for display
    const threadWordCount = result?.thread ? getWordCount(result.thread.join(' ')) : 0;
    const carouselWordCount = result?.carousel ? getWordCount(result.carousel.map(s => `${s.title} ${s.content}`).join(' ')) : 0;
    const questionWordCount = result?.question ? getWordCount(result.question) : 0;
    const newsletterWordCount = result?.newsletter ? getWordCount(result.newsletter) : 0;

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
                    <div className={styles.errorBanner} style={{ marginBottom: '1rem', color: '#ef4444' }}>⚠️ {errorMsg}</div>
                )}

                <button
                    className={styles.button}
                    onClick={() => handleGenerate()}
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
                            Thread ({threadWordCount} words)
                        </button>
                        <button
                            className={`${styles.tab} ${activeTab === 'carousel' ? styles.active : ''}`}
                            onClick={() => setActiveTab('carousel')}
                        >
                            Carousel ({carouselWordCount} words)
                        </button>
                        <button
                            className={`${styles.tab} ${activeTab === 'question' ? styles.active : ''}`}
                            onClick={() => setActiveTab('question')}
                        >
                            Question ({questionWordCount} words)
                        </button>
                        <button
                            className={`${styles.tab} ${activeTab === 'newsletter' ? styles.active : ''}`}
                            onClick={() => setActiveTab('newsletter')}
                        >
                            Newsletter ({newsletterWordCount} words)
                        </button>
                    </div>

                    <div className={styles.tabContent}>
                        {activeTab === 'thread' && (
                            <div className={styles.thread}>
                                <div className={styles.tabHeader}>
                                    <span className={styles.wordCountBadge}>{threadWordCount} words total</span>
                                    <button 
                                        className={styles.regenerateBtn} 
                                        onClick={() => handleGenerate('thread')}
                                        disabled={regeneratingTab !== null}
                                    >
                                        {regeneratingTab === 'thread' ? 'Regenerating...' : '🔄 Generate Again'}
                                    </button>
                                </div>
                                {result.thread?.map((tweet, i) => (
                                    <div key={i} className={styles.tweet}>
                                        <div className={styles.tweetHeader} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                                            <span className={styles.counter}>{i + 1}/{result.thread.length}</span>
                                            <button className={styles.copyBtn} style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '1rem' }} onClick={() => copyText(tweet)} title="Copy">📋</button>
                                        </div>
                                        <p style={{ color: '#e2e8f0', lineHeight: '1.6' }}>{tweet}</p>
                                    </div>
                                ))}
                            </div>
                        )}

                        {activeTab === 'carousel' && (
                            <div className={styles.carousel}>
                                <div className={styles.tabHeader}>
                                    <span className={styles.wordCountBadge}>{carouselWordCount} words total</span>
                                    <button 
                                        className={styles.regenerateBtn} 
                                        onClick={() => handleGenerate('carousel')}
                                        disabled={regeneratingTab !== null}
                                    >
                                        {regeneratingTab === 'carousel' ? 'Regenerating...' : '🔄 Generate Again'}
                                    </button>
                                </div>
                                {result.carousel?.map((slide, i) => (
                                    <div key={i} className={styles.slide}>
                                        <div className={styles.slideHeader} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                            <h4 style={{ margin: 0 }}>Slide {i + 1}: {slide.title}</h4>
                                            <button className={styles.copyBtn} style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '1rem' }} onClick={() => copyText(`${slide.title}\n\n${slide.content}`)} title="Copy">📋</button>
                                        </div>
                                        <p style={{ marginTop: '0.5rem', lineHeight: '1.5' }}>{slide.content}</p>
                                    </div>
                                ))}
                            </div>
                        )}

                        {activeTab === 'question' && (
                            <div className={styles.question}>
                                <div className={styles.tabHeader}>
                                    <span className={styles.wordCountBadge}>{questionWordCount} words total</span>
                                    <button 
                                        className={styles.regenerateBtn} 
                                        onClick={() => handleGenerate('question')}
                                        disabled={regeneratingTab !== null}
                                    >
                                        {regeneratingTab === 'question' ? 'Regenerating...' : '🔄 Generate Again'}
                                    </button>
                                </div>
                                <h3>Engagement Starter</h3>
                                <p style={{ fontSize: '1.25rem', marginBottom: '1.5rem', color: '#e2e8f0' }}>{result.question}</p>
                                <button className={styles.button} style={{ maxWidth: '200px', margin: '0 auto' }} onClick={() => copyText(result.question)}>📋 Copy Question</button>
                            </div>
                        )}

                        {activeTab === 'newsletter' && (
                            <div className={styles.question} style={{ textAlign: 'left', borderStyle: 'solid', padding: '1.5rem' }}>
                                <div className={styles.tabHeader}>
                                    <span className={styles.wordCountBadge}>{newsletterWordCount} words total</span>
                                    <button 
                                        className={styles.regenerateBtn} 
                                        onClick={() => handleGenerate('newsletter')}
                                        disabled={regeneratingTab !== null}
                                    >
                                        {regeneratingTab === 'newsletter' ? 'Regenerating...' : '🔄 Generate Again'}
                                    </button>
                                </div>
                                <h3 style={{ marginBottom: '0.5rem' }}>Newsletter Draft</h3>
                                <div style={{ background: '#0a0a0a', padding: '1.5rem', borderRadius: '8px', border: '1px solid #222', whiteSpace: 'pre-wrap', color: '#cbd5e1', lineHeight: '1.6' }}>
                                    {result.newsletter || "No newsletter generated yet. Try generating again."}
                                </div>
                                <button className={styles.button} style={{ maxWidth: '200px', marginTop: '1.5rem' }} onClick={() => copyText(result.newsletter || "")}>📋 Copy Newsletter</button>
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
