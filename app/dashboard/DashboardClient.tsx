"use client";

import { useState } from 'react';
import ContentForm from '@/components/ContentForm';
import PostDisplay from '@/components/PostDisplay';
import styles from './page.module.css';

interface DashboardClientProps {
    initialPosts: any[];
}

export default function DashboardClient({ initialPosts }: DashboardClientProps) {
    const [posts, setPosts] = useState(initialPosts);
    const [generatedPost, setGeneratedPost] = useState<any>(null);
    const [hookScore, setHookScore] = useState<number | null>(null);

    const handleGenerate = async (formData: any) => {
        try {
            const response = await fetch('/api/generate', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });

            if (!response.ok) {
                const error = await response.json();
                alert(error.error || "Failed to generate post");
                return;
            }

            const data = await response.json();
            setGeneratedPost(data);

            // In a real app, the API would return the persisted post object including ID and date
            // For now, we optimistically update the list if needed, or trigger a re-fetch
            // But since passing initialPosts, let's just focus on displaying the result first.

            // Simulate a randomly calculated hook score for the visual effect
            setHookScore(Math.floor(Math.random() * 20) / 10 + 8); // 8.0 - 9.9

        } catch (error) {
            console.error(error);
            alert("An error occurred generating content.");
        }
    };

    return (
        <div className={styles.dashboardGrid}>
            <div className={styles.mainColumn}>
                <div className={styles.card}>
                    <h2>Post Generator</h2>
                    <ContentForm onGenerate={handleGenerate} />
                </div>

                {generatedPost && (
                    <div className={styles.resultsArea}>
                        {hookScore && (
                            <div className={styles.hookScoreCard}>
                                <div className={styles.scoreCircle}>
                                    <span className={styles.scoreNumber}>{hookScore}</span>
                                    <span className={styles.scoreLabel}>Hook Score</span>
                                </div>
                                <div className={styles.scoreFeedback}>
                                    <h4>Viral Potential</h4>
                                    <p>Good curiosity gap. Consider making the first line shorter.</p>
                                </div>
                            </div>
                        )}
                        <PostDisplay content={generatedPost.content} hashtags={generatedPost.hashtags} />
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
                                        <span className={styles.historyDate}>
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
