"use client";

import { useState } from 'react';
import toast from 'react-hot-toast';
import styles from './InspirationBoard.module.css';

interface Analysis {
    hookType: string;
    structure: string;
    whyItWorks: string;
    keyTechniques: string[];
}

interface InspirationResult {
    analysis: Analysis;
    similarPost: string;
}

export default function InspirationBoard() {
    const [postText, setPostText] = useState('');
    const [result, setResult] = useState<InspirationResult | null>(null);
    const [loading, setLoading] = useState(false);
    const [copied, setCopied] = useState(false);

    const handleAnalyze = async () => {
        if (!postText.trim() || postText.trim().length < 50) {
            toast.error('Please paste a LinkedIn post (at least 50 characters).');
            return;
        }
        setLoading(true);
        setResult(null);

        try {
            const res = await fetch('/api/inspiration', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ postText }),
            });

            const data = await res.json();
            if (!res.ok) throw new Error(data.error || 'Analysis failed');

            setResult(data);
            toast.success('Post analyzed! Your inspired version is ready.');
        } catch (err: any) {
            toast.error(err.message || 'Failed to analyze. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const handleCopy = () => {
        if (!result?.similarPost) return;
        navigator.clipboard.writeText(result.similarPost);
        setCopied(true);
        toast.success('Copied to clipboard!');
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className={styles.container}>
            <div className={styles.inputSection}>
                <label className={styles.label}>
                    Paste an inspiring LinkedIn post you found
                </label>
                <textarea
                    className={styles.textarea}
                    value={postText}
                    onChange={(e) => setPostText(e.target.value)}
                    placeholder="Paste any LinkedIn post here — from a creator you admire, a viral post you saw, or a style you want to emulate. AI will analyze WHY it worked and generate a version in your voice."
                    rows={8}
                />
                <div className={styles.charCount}>{postText.length} characters</div>

                <button
                    className={styles.analyzeBtn}
                    onClick={handleAnalyze}
                    disabled={loading || postText.trim().length < 50}
                >
                    {loading ? '🔍 Analyzing...' : '🔍 Analyze & Generate My Version'}
                </button>
            </div>

            {result && (
                <div className={styles.resultsSection}>
                    {/* Analysis Card */}
                    <div className={styles.analysisCard}>
                        <h3 className={styles.analysisTitle}>🧠 Why It Worked</h3>
                        <div className={styles.analysisGrid}>
                            <div className={styles.analysisStat}>
                                <span className={styles.statLabel}>Hook Type</span>
                                <strong className={styles.statValue}>{result.analysis.hookType}</strong>
                            </div>
                            <div className={styles.analysisStat}>
                                <span className={styles.statLabel}>Post Structure</span>
                                <strong className={styles.statValue}>{result.analysis.structure}</strong>
                            </div>
                        </div>

                        <p className={styles.whyItWorks}>{result.analysis.whyItWorks}</p>

                        <div className={styles.techniques}>
                            <span className={styles.statLabel}>Key Techniques Used</span>
                            <div className={styles.techniquesList}>
                                {result.analysis.keyTechniques.map((t, i) => (
                                    <span key={i} className={styles.techniquePill}>{t}</span>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Generated Post Card */}
                    <div className={styles.generatedCard}>
                        <div className={styles.generatedHeader}>
                            <h3 className={styles.analysisTitle}>✨ Your Inspired Version</h3>
                            <button className={styles.copyBtn} onClick={handleCopy}>
                                {copied ? '✓ Copied!' : '📋 Copy Post'}
                            </button>
                        </div>
                        <div className={styles.generatedPost}>
                            {result.similarPost.split('\n').map((line, i) => (
                                <p key={i} className={styles.postParagraph}>{line || <br />}</p>
                            ))}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
