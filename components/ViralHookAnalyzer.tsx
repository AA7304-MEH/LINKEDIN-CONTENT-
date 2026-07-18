"use client";

import { useState } from 'react';
import toast from 'react-hot-toast';
import styles from './ViralHookAnalyzer.module.css';

interface AnalysisResult {
    score: number;
    color: 'green' | 'yellow' | 'red';
    badges: string[];
    feedback: string;
    alternatives: string[];
}

const TEMPLATES = [
    "I [action] for [time]. Here's what happened:",
    "Unpopular opinion: [bold claim]",
    "Nobody talks about [hidden truth]",
    "[Number] years ago, I [failed/learned/discovered]",
    "The [industry] industry has a problem.",
    "Stop [common advice]. Do this instead:"
];

const classifyHookType = (text: string): string => {
    const t = text.toLowerCase().trim();
    if (!t) return "";
    if (t.includes("nobody talks about") || t.includes("secret") || t.includes("hidden") || t.includes("nobody tells you")) {
        return "Pattern Interrupt 🎯";
    }
    if (t.includes("unpopular opinion") || t.includes("contrarian") || t.includes("disagree") || t.includes("everyone is wrong")) {
        return "Contrarian 💥";
    }
    if (t.includes("what if") || t.includes("why do") || t.includes("how does") || t.endsWith("?")) {
        return "Question ❓";
    }
    if (t.includes("is dead") || t.includes("must stop") || t.includes("the truth about") || t.includes("problem")) {
        return "Bold Statement 📢";
    }
    if (t.includes("years ago") || t.includes("yesterday") || t.includes("i was 20") || t.includes("my first") || t.includes("three years")) {
        return "Story Opener 📖";
    }
    return "General Hook ✨";
};

export default function ViralHookAnalyzer() {
    const [hook, setHook] = useState('');
    const [result, setResult] = useState<AnalysisResult | null>(null);
    const [loading, setLoading] = useState(false);
    const [showExplanation, setShowExplanation] = useState(false);

    const classifiedType = classifyHookType(hook);

    const handleAnalyze = async () => {
        if (!hook.trim()) return;

        setLoading(true);
        setResult(null);

        try {
            const res = await fetch('/api/analyze-hook', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ hook }),
            });

            if (!res.ok) {
                const errorData = await res.json();
                throw new Error(errorData.error || 'Failed to analyze');
            }

            const data = await res.json();
            setResult(data);
            toast.success("Hook analyzed successfully!");
        } catch (error: any) {
            toast.error(error.message || 'Failed to analyze hook. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className={styles.container}>
            <h2 className={styles.title}>Viral Hook Engine</h2>
            <p className={styles.subtitle}>Test your opening line before you post.</p>

            <div className={styles.inputGroup} style={{ marginBottom: '0.5rem' }}>
                <textarea
                    className={styles.textarea}
                    value={hook}
                    onChange={(e) => setHook(e.target.value)}
                    placeholder="Paste your hook here..."
                    rows={3}
                />
                <button
                    className={styles.analyzeButton}
                    onClick={handleAnalyze}
                    disabled={loading || !hook.trim()}
                >
                    {loading ? 'Analyzing...' : 'Analyze Hook'}
                </button>
            </div>

            <div className={styles.charCount}>
                <span className={hook.length > 150 ? styles.warningLimit : ''}>
                    {hook.length} / 150 characters {hook.length > 150 && "(LinkedIn optimal hook is under 150 chars)"}
                </span>
                {classifiedType && (
                    <span className={styles.classifiedType}>
                        Type: {classifiedType}
                    </span>
                )}
            </div>

            <div className={styles.templatesSection}>
                <h3 className={styles.templatesTitle}>💡 Trending Hook Templates</h3>
                <div className={styles.templatesGrid}>
                    {TEMPLATES.map((tpl) => (
                        <button
                            key={tpl}
                            type="button"
                            className={styles.templateCard}
                            onClick={() => setHook(tpl)}
                        >
                            {tpl}
                        </button>
                    ))}
                </div>
            </div>

            {result && (
                <div className={styles.resultContainer} style={{ marginTop: '2rem' }}>
                    <div className={`${styles.scoreCircle} ${styles[result.color]}`}>
                        <span className={styles.scoreValue}>{result.score}</span>
                        <span className={styles.scoreLabel}>/ 10</span>
                    </div>

                    <div className={styles.badges}>
                        {result.badges.map((badge, index) => (
                            <span key={index} className={styles.badge}>
                                {badge.includes('warning') || badge.includes('Generic') ? '⚠️' : '✅'} {badge}
                            </span>
                        ))}
                    </div>

                    <div className={styles.explanationToggle}>
                        <button onClick={() => setShowExplanation(!showExplanation)}>
                            {showExplanation ? 'Hide Explanation' : 'Why this score?'}
                        </button>
                        {showExplanation && <p className={styles.feedback}>{result.feedback}</p>}
                    </div>

                    <div className={styles.alternatives}>
                        <h3>Try these instead:</h3>
                        <ul>
                            {result.alternatives.map((alt, i) => (
                                <li key={i}>{alt}</li>
                            ))}
                        </ul>
                    </div>
                </div>
            )}
        </div>
    );
}
