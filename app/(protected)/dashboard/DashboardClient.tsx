"use client";

import { useState } from 'react';
import ContentForm from '@/components/ContentForm';
import PostDisplay from '@/components/PostDisplay';
import styles from './page.module.css';

interface DashboardClientProps {
    initialPosts: any[];
    userPlan: string;
}

export default function DashboardClient({ initialPosts, userPlan }: DashboardClientProps) {
    const [posts, setPosts] = useState(initialPosts);
    const [generatedPost, setGeneratedPost] = useState<any>(null);
    const [hookScore, setHookScore] = useState<number | null>(null);
    const [hookFeedback, setHookFeedback] = useState<string>('');
    const [isGenerating, setIsGenerating] = useState(false);
    const [errorMsg, setErrorMsg] = useState<string | null>(null);

    const handleGenerate = async (formData: any) => {
        setIsGenerating(true);
        setErrorMsg(null);
        setGeneratedPost(null);
        setHookScore(null);
        setHookFeedback('');

        try {
            const res = await fetch('/api/generate', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });

            const data = await res.json();

            if (!res.ok) {
                throw new Error(data.error || 'Failed to generate post.');
            }

            setGeneratedPost(data);
            setHookScore(data.hookScore ?? null);
            setHookFeedback(data.hookFeedback ?? '');

            // Prepend new post to recent history list
            if (data.id) {
                const newPost = {
                    id: data.id,
                    content: data.content,
                    type: formData.type || 'Educational',
                    createdAt: new Date().toISOString(),
                    provider: data.provider,
                };
                setPosts((prev: any[]) => [newPost, ...prev]);
            }
        } catch (error: any) {
            setErrorMsg(error.message || 'An unexpected error occurred.');
        } finally {
            setIsGenerating(false);
        }
    };

    const scoreColor = hookScore
        ? hookScore >= 8
            ? '#22c55e'
            : hookScore >= 6
            ? '#f59e0b'
            : '#ef4444'
        : '#888';

    return (
        <div className={styles.dashboardGrid}>
            <div className={styles.mainColumn}>
                <div className={styles.card}>
                    <h2>Post Generator</h2>
                    <ContentForm onGenerate={handleGenerate} />
                </div>

                {errorMsg && (
                    <div className={styles.errorBanner}>
                        ⚠️ {errorMsg}
                    </div>
                )}

                {isGenerating && (
                    <div className={styles.loadingState}>
                        <div className={styles.spinner} />
                        <p>Crafting your post with AI…</p>
                    </div>
                )}

                {generatedPost && !isGenerating && (
                    <div className={styles.resultsArea}>
                        {hookScore !== null && (
                            <div className={styles.hookScoreCard}>
                                <div className={styles.scoreCircle} style={{ borderColor: scoreColor }}>
                                    <span className={styles.scoreNumber} style={{ color: scoreColor }}>
                                        {hookScore}
                                    </span>
                                    <span className={styles.scoreLabel}>Hook Score</span>
                                </div>
                                <div className={styles.scoreFeedback}>
                                    <h4>Viral Potential</h4>
                                    <p>{hookFeedback || 'Strong opening. Engage your audience!'}</p>
                                </div>
                            </div>
                        )}
                        {generatedPost.provider && (
                            <div className={styles.providerBadge}>
                                🤖 Powered by <strong>{generatedPost.provider === 'groq-llama3-70b' ? 'Llama 3.3 70B (Groq)' : 'Gemini 2.5 Flash'}</strong>
                            </div>
                        )}
                        <PostDisplay
                            content={generatedPost.content}
                            hashtags={generatedPost.hashtags}
                            isFree={userPlan === 'FREE'}
                        />
                    </div>
                )}
            </div>

            <div className={styles.sideColumn}>
                <div className={styles.card}>
                    <h3>Recent Posts</h3>
                    {posts.length === 0 ? (
                        <p style={{ color: '#888', fontStyle: 'italic' }}>No history yet.</p>
                    ) : (
                        <ul className={styles.historyList}>
                            {posts.map((post: any) => (
                                <li key={post.id} className={styles.historyItem}>
                                    <div className={styles.historyMeta}>
                                        <span className={styles.historyType}>{post.type || 'Post'}</span>
                                        {post.provider && (
                                            <span className={post.provider === 'groq-llama3-70b' ? styles.historyProviderBadgeLlama : styles.historyProviderBadge}>
                                                {post.provider === 'groq-llama3-70b' ? 'Llama 3' : 'Gemini'}
                                            </span>
                                        )}
                                        <span className={styles.historyDate} suppressHydrationWarning>
                                            {new Date(post.createdAt).toLocaleDateString()}
                                        </span>
                                    </div>
                                    <p className={styles.historyPreview}>
                                        {post.content.substring(0, 60)}...
                                    </p>
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
            </div>
        </div>
    );
}
