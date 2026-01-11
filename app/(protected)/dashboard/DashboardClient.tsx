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
        // DEMO MOCK GENERATION
        try {
            // Simulate API delay
            await new Promise(resolve => setTimeout(resolve, 2000));

            const mockContent = `🚀 The Future of ${formData.topic} is Here\n\nWe often think about AI as a replacement tool. But the real magic happens when we treat it as a collaborator.\n\nI've been experimenting with ${formData.topic} workflows lately, and the results are mind-blowing.\n\nIt allows us to focus on STRATEGY while automation handles the EXECUTION.\n\nWhat are your thoughts on this shift?\n\n👇 Let me know in the comments.`;

            const data = {
                content: mockContent,
                hashtags: {
                    broad: ["#Innovation", "#FutureOfWork"],
                    niche: ["#AI", "#Productivity"],
                    community: ["#TechLeaders"]
                }
            };

            setGeneratedPost(data);
            setHookScore(9.2);

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
