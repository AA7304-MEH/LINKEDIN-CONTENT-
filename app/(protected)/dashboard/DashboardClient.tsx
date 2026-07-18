"use client";

import { useState, useEffect } from 'react';
import ContentForm from '@/components/ContentForm';
import PostDisplay from '@/components/PostDisplay';
import UpgradeModal from '@/components/UpgradeModal';
import toast from 'react-hot-toast';
import styles from './page.module.css';

interface DashboardClientProps {
    initialPosts: any[];
    userPlan: string;
    creditsUsed: number;
    creditsLimit: number;
}

export default function DashboardClient({ 
    initialPosts, 
    userPlan,
    creditsUsed: initialCreditsUsed,
    creditsLimit: initialCreditsLimit
}: DashboardClientProps) {
    const [posts, setPosts] = useState(initialPosts);
    const [generatedPost, setGeneratedPost] = useState<any>(null);
    const [hookScore, setHookScore] = useState<number | null>(null);
    const [hookFeedback, setHookFeedback] = useState<string>('');
    const [isGenerating, setIsGenerating] = useState(false);
    const [creditsUsed, setCreditsUsed] = useState(initialCreditsUsed);
    const [creditsLimit, setCreditsLimit] = useState(initialCreditsLimit);
    const [isUpgradeOpen, setIsUpgradeOpen] = useState(false);
    const [copiedPostId, setCopiedPostId] = useState<string | null>(null);
    const [publishingToLinkedIn, setPublishingToLinkedIn] = useState(false);
    const [linkedInStatus, setLinkedInStatus] = useState<any>(null);
    const [publishedUrl, setPublishedUrl] = useState<string | null>(null);
    const [showLinkedInModal, setShowLinkedInModal] = useState(false);

    useEffect(() => {
        const fetchStatus = async () => {
            try {
                const res = await fetch('/api/linkedin/status');
                if (res.ok) {
                    const data = await res.json();
                    setLinkedInStatus(data);
                }
            } catch (err) {
                console.error("Error fetching linkedin status in dashboard client:", err);
            }
        };
        fetchStatus();
    }, []);

    const TRENDING_TOPICS = [
        '🤖 AI replacing jobs',
        '🚀 My startup journey',
        '💡 Leadership lesson',
        '📊 Why data beats opinion',
        '🙅 Unpopular career truth',
        '💰 Lesson from a failure',
        '🌍 Remote work reality',
        '⚡ Morning routine myth',
    ];

    const [selectedTopic, setSelectedTopic] = useState('');

    const handleGenerate = async (formData: any) => {
        // Rate limiting check: Free plan post limit check (creditsUsed >= creditsLimit)
        if (userPlan === 'FREE' && creditsUsed >= creditsLimit) {
            setIsUpgradeOpen(true);
            toast.error("You've used all your posts for today/month. Upgrade to Pro for unlimited.");
            return;
        }

        setIsGenerating(true);
        setGeneratedPost(null);
        setPublishedUrl(null);
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
                if (res.status === 429 || data.error?.includes("limit reached") || data.error?.includes("used all")) {
                    setIsUpgradeOpen(true);
                }
                throw new Error(data.error || 'Failed to generate post.');
            }

            setGeneratedPost(data);
            setHookScore(data.hookScore ?? null);
            setHookFeedback(data.hookFeedback ?? '');
            setCreditsUsed(prev => prev + 1);
            toast.success("LinkedIn post generated successfully!");

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
            toast.error(error.message || 'AI generation error. Try again in 30 seconds.');
        } finally {
            setIsGenerating(false);
        }
    };

    const handlePublishToLinkedIn = async () => {
        if (!generatedPost?.content || !generatedPost?.id) return;

        // If not connected, show the connect modal
        if (!linkedInStatus?.connected) {
            setShowLinkedInModal(true);
            return;
        }

        // Check LinkedIn character limits
        if (generatedPost.content.length > 3000) {
            toast.error("Post exceeds LinkedIn's 3,000 character limit.");
            return;
        }

        setPublishingToLinkedIn(true);
        setPublishedUrl(null);
        try {
            const res = await fetch('/api/linkedin/publish', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ postId: generatedPost.id, content: generatedPost.content }),
            });
            const data = await res.json();
            if (!res.ok) {
                if (data.error?.includes('not connected')) {
                    setShowLinkedInModal(true);
                } else {
                    throw new Error(data.error);
                }
            } else {
                toast.success('Published to LinkedIn!');
                setPublishedUrl(`https://www.linkedin.com/feed/update/${data.linkedinPostId}`);
            }
        } catch (err: any) {
            toast.error(err.message || 'Publishing failed. Try again.');
        } finally {
            setPublishingToLinkedIn(false);
        }
    };

    const handleSaveDraft = async (draftData: any) => {
        try {
            const res = await fetch('/api/posts', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(draftData)
            });

            const data = await res.json();

            if (!res.ok) {
                throw new Error(data.error || 'Failed to save draft');
            }

            toast.success("Draft saved successfully!");
            
            if (data.post) {
                setPosts((prev: any[]) => [data.post, ...prev]);
            }
        } catch (error: any) {
            toast.error(error.message || 'Connection failed. Please check your internet.');
        }
    };

    const handleCopyPost = async (id: string, content: string) => {
        try {
            await navigator.clipboard.writeText(content);
            setCopiedPostId(id);
            toast.success("Copied to clipboard!");
            setTimeout(() => setCopiedPostId(null), 2000);
        } catch (err) {
            toast.error("Failed to copy text.");
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
            <UpgradeModal isOpen={isUpgradeOpen} onClose={() => setIsUpgradeOpen(false)} />
            
            {showLinkedInModal && (
                <div style={{
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    backgroundColor: 'rgba(0,0,0,0.8)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    zIndex: 1000,
                    backdropFilter: 'blur(5px)'
                }}>
                    <div style={{
                        background: '#0a0a0a',
                        border: '1px solid rgba(255, 255, 255, 0.08)',
                        borderRadius: '20px',
                        padding: '2.5rem',
                        maxWidth: '450px',
                        width: '90%',
                        boxShadow: '0 20px 50px rgba(0,0,0,0.5)',
                        textAlign: 'center'
                    }}>
                        <h3 style={{ fontSize: '1.25rem', color: '#fff', margin: '0 0 1rem 0', fontWeight: 700 }}>
                            Connect LinkedIn to publish directly
                        </h3>
                        <p style={{ color: '#94a3b8', fontSize: '0.9rem', lineHeight: 1.5, marginBottom: '2rem' }}>
                            Use the official LinkedIn API to post safely without risking your account.
                        </p>
                        <a
                            href="/settings/linkedin"
                            style={{
                                display: 'block',
                                background: 'linear-gradient(135deg, #0077b5 0%, #00e5ff 100%)',
                                color: '#fff',
                                textDecoration: 'none',
                                padding: '0.85rem',
                                borderRadius: '10px',
                                fontSize: '0.95rem',
                                fontWeight: 700,
                                marginBottom: '1rem',
                                boxShadow: '0 4px 15px rgba(0, 229, 255, 0.2)'
                            }}
                        >
                            Connect LinkedIn →
                        </a>
                        <button
                            onClick={() => setShowLinkedInModal(false)}
                            style={{
                                background: 'transparent',
                                border: 'none',
                                color: '#64748b',
                                fontSize: '0.85rem',
                                cursor: 'pointer'
                            }}
                        >
                            Maybe later
                        </button>
                    </div>
                </div>
            )}
            
            <div className={styles.mainColumn}>
                {/* Trending Topics */}
                <div className={styles.card}>
                    <h3 style={{ margin: '0 0 0.75rem 0', fontSize: '0.95rem', color: '#94a3b8' }}>
                        🔥 Trending Topics — click to use
                    </h3>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                        {TRENDING_TOPICS.map((topic) => (
                            <button
                                key={topic}
                                onClick={() => setSelectedTopic(topic.replace(/^[^ ]+ /, ''))}
                                style={{
                                    background: selectedTopic === topic.replace(/^[^ ]+ /, '') ? 'rgba(6,182,212,0.18)' : '#1f2937',
                                    border: `1px solid ${selectedTopic === topic.replace(/^[^ ]+ /, '') ? '#06b6d4' : '#374151'}`,
                                    color: selectedTopic === topic.replace(/^[^ ]+ /, '') ? '#22d3ee' : '#94a3b8',
                                    padding: '0.35rem 0.85rem',
                                    borderRadius: '999px',
                                    fontSize: '0.82rem',
                                    fontWeight: 500,
                                    cursor: 'pointer',
                                    transition: 'all 0.15s',
                                }}
                            >
                                {topic}
                            </button>
                        ))}
                    </div>
                </div>

                <div className={styles.card}>
                    <h2>Post Generator</h2>
                    <ContentForm onGenerate={handleGenerate} onSaveDraft={handleSaveDraft} prefillTopic={selectedTopic} />
                </div>

                {isGenerating && (
                    <div className={styles.loadingState}>
                        <div className={styles.spinner} />
                        <p>Crafting your post with AI DNA…</p>
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
                        {/* LinkedIn Publish Button */}
                        <div style={{ marginTop: '1.5rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                            {generatedPost.content && generatedPost.content.length > 3000 && (
                                <div style={{ color: '#ef4444', fontSize: '0.8rem', display: 'flex', alignItems: 'center', gap: '0.25rem', marginBottom: '0.25rem' }}>
                                    <span>⚠️ Warning: Post exceeds LinkedIn&apos;s 3,000 character limit ({generatedPost.content.length} chars).</span>
                                </div>
                            )}

                            <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap', alignItems: 'center' }}>
                                {publishedUrl ? (
                                    <a
                                        href={publishedUrl}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        style={{
                                            display: 'inline-flex',
                                            alignItems: 'center',
                                            gap: '0.5rem',
                                            background: 'rgba(34, 197, 94, 0.1)',
                                            border: '1px solid rgba(34, 197, 94, 0.3)',
                                            color: '#22c55e',
                                            borderRadius: '10px',
                                            padding: '0.6rem 1.25rem',
                                            fontWeight: 700,
                                            fontSize: '0.9rem',
                                            textDecoration: 'none',
                                            transition: 'all 0.2s',
                                        }}
                                    >
                                        ✅ Published! View on LinkedIn →
                                    </a>
                                ) : (
                                    <button
                                        onClick={handlePublishToLinkedIn}
                                        disabled={publishingToLinkedIn || (generatedPost.content && generatedPost.content.length > 3000)}
                                        style={{
                                            background: linkedInStatus?.connected ? '#0077b5' : '#475569',
                                            color: '#fff',
                                            border: 'none',
                                            borderRadius: '10px',
                                            padding: '0.6rem 1.25rem',
                                            fontWeight: 700,
                                            fontSize: '0.9rem',
                                            cursor: publishingToLinkedIn ? 'not-allowed' : 'pointer',
                                            opacity: publishingToLinkedIn || (generatedPost.content && generatedPost.content.length > 3000) ? 0.6 : 1,
                                            transition: 'all 0.2s',
                                        }}
                                    >
                                        {publishingToLinkedIn ? '⏳ Publishing...' : '🚀 Publish to LinkedIn'}
                                    </button>
                                )}
                            </div>
                        </div>
                    </div>
                )}
            </div>

            <div className={styles.sideColumn}>
                <div className={styles.card}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                        <h3 style={{ margin: 0 }}>Recent Posts</h3>
                        <span style={{ fontSize: '0.8rem', color: '#888' }}>
                            Credits: {creditsUsed} / {creditsLimit}
                        </span>
                    </div>
                    {posts.length === 0 ? (
                        <p style={{ color: '#888', fontStyle: 'italic' }}>No history yet.</p>
                    ) : (
                        <ul className={styles.historyList}>
                            {posts.slice(0, 5).map((post: any) => (
                                <li key={post.id} className={styles.historyItem} style={{ position: 'relative' }}>
                                    <div className={styles.historyMeta} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                        <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                                            <span className={styles.historyType}>{post.type || 'Post'}</span>
                                            {post.provider && (
                                                <span className={post.provider === 'groq-llama3-70b' ? styles.historyProviderBadgeLlama : styles.historyProviderBadge}>
                                                    {post.provider === 'groq-llama3-70b' ? 'Llama 3' : post.provider === 'draft' ? 'Draft' : 'Gemini'}
                                                </span>
                                            )}
                                        </div>
                                        <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                                            <span className={styles.historyDate} suppressHydrationWarning>
                                                {new Date(post.createdAt).toLocaleDateString()}
                                            </span>
                                            <button
                                                onClick={() => handleCopyPost(post.id, post.content)}
                                                style={{
                                                    background: 'transparent',
                                                    border: 'none',
                                                    cursor: 'pointer',
                                                    fontSize: '0.9rem',
                                                    padding: '0.2rem',
                                                    color: copiedPostId === post.id ? '#22c55e' : '#888'
                                                }}
                                                title="Copy post content"
                                            >
                                                {copiedPostId === post.id ? '✓' : '📋'}
                                            </button>
                                        </div>
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
