"use client";

import { useState, useEffect } from 'react';
import ContentForm from '@/components/ContentForm';
import PostDisplay from '@/components/PostDisplay';
import UpgradeModal from '@/components/UpgradeModal';
import toast from 'react-hot-toast';
import styles from './page.module.css';
import dynamic from 'next/dynamic';

const AnalyticsChart = dynamic(() => import('@/components/AnalyticsChart'), {
    ssr: false,
    loading: () => <div style={{ height: '300px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#64748b', fontStyle: 'italic' }}>Loading chart...</div>
});

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

    // Component 4: Performance Analytics tab state
    const [activeTab, setActiveTab] = useState<'generator' | 'performance'>('generator');
    const [analytics, setAnalytics] = useState<any>(null);
    const [analyticsLoading, setAnalyticsLoading] = useState(false);
    const [apiPendingBanner, setApiPendingBanner] = useState(false);
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
        const params = new URLSearchParams(window.location.search);
        if (params.get('upgrade') === 'pro') {
            setIsUpgradeOpen(true);
            // Clean up the URL parameter immediately to prevent infinite reload loops
            window.history.replaceState({}, '', window.location.pathname);
        }
    }, []);

    const fetchAnalyticsSummary = async () => {
        setAnalyticsLoading(true);
        try {
            // First fetch latest social actions
            await fetch('/api/analytics/fetch');
            const res = await fetch('/api/analytics/summary');
            if (res.ok) {
                const data = await res.json();
                setAnalytics(data);
                if (data.apiPending) {
                    setApiPendingBanner(true);
                } else {
                    setApiPendingBanner(false);
                }
            }
        } catch (err) {
            console.error("Error loading summary:", err);
        } finally {
            setAnalyticsLoading(false);
        }
    };

    useEffect(() => {
        if (activeTab === 'performance') {
            fetchAnalyticsSummary();
        }
    }, [activeTab]);

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
        // Rate limiting check
        if (userPlan === 'FREE' && creditsUsed >= 5) {
            setIsUpgradeOpen(true);
            toast.error("You've reached your free monthly limit of 5 posts. Upgrade to Pro for unlimited posts.");
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
                if (res.status === 429) {
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
        : '#64748b';

    const getEngagementColor = (rate: number) => {
        if (rate >= 3) return '#10b981'; // Green
        if (rate >= 1) return '#f59e0b'; // Amber
        return '#ef4444'; // Red
    };

    return (
        <div style={{ width: '100%' }}>
            {/* Upgrade Plan Modal */}
            <UpgradeModal isOpen={isUpgradeOpen} onClose={() => setIsUpgradeOpen(false)} />

            {/* Tab Selector Buttons */}
            <div style={{ display: 'flex', gap: '1rem', marginBottom: '1.5rem', borderBottom: '1px solid rgba(255,255,255,0.08)', paddingBottom: '0.5rem' }}>
                <button
                    onClick={() => setActiveTab('generator')}
                    style={{
                        background: 'transparent',
                        border: 'none',
                        borderBottom: activeTab === 'generator' ? '3px solid #06b6d4' : '3px solid transparent',
                        color: activeTab === 'generator' ? '#22d3ee' : '#94a3b8',
                        padding: '0.5rem 1.25rem',
                        fontSize: '0.95rem',
                        fontWeight: 700,
                        cursor: 'pointer',
                        transition: 'all 0.2s',
                        outline: 'none'
                    }}
                >
                    ✍️ Post Generator
                </button>
                <button
                    onClick={() => setActiveTab('performance')}
                    style={{
                        background: 'transparent',
                        border: 'none',
                        borderBottom: activeTab === 'performance' ? '3px solid #06b6d4' : '3px solid transparent',
                        color: activeTab === 'performance' ? '#22d3ee' : '#94a3b8',
                        padding: '0.5rem 1.25rem',
                        fontSize: '0.95rem',
                        fontWeight: 700,
                        cursor: 'pointer',
                        transition: 'all 0.2s',
                        outline: 'none'
                    }}
                >
                    📈 Performance Analytics
                </button>
            </div>

            {/* LinkedIn Redirect popup */}
            {showLinkedInModal && (
                <div className={styles.linkedinOverlay}>
                    <div className={styles.linkedinModal}>
                        <div style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>🔌</div>
                        <h3>Connect Your LinkedIn Account</h3>
                        <p style={{ color: '#64748b', fontSize: '0.85rem', marginBottom: '1.5rem', lineHeight: 1.4 }}>
                            To post directly from Resodin AI to your LinkedIn profile, you need to authorize our secure integration once.
                        </p>
                        <a
                            href="/api/linkedin/auth"
                            style={{
                                background: '#0077b5',
                                color: '#fff',
                                textDecoration: 'none',
                                padding: '0.75rem 1.5rem',
                                borderRadius: '10px',
                                fontWeight: 700,
                                display: 'block',
                                textAlign: 'center',
                                marginBottom: '0.5rem',
                                fontSize: '0.9rem',
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

            {activeTab === 'generator' ? (
                /* Tab 1: Original Generator View */
                <div className={styles.container}>
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
                                    Credits: {creditsUsed} / {userPlan === 'FREE' ? 5 : creditsLimit}
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
            ) : (
                /* Tab 2: Performance Analytics View */
                <div style={{ width: '100%', color: '#f8fafc', paddingBottom: '3rem' }}>
                    
                    {/* Synchronizing Spinner */}
                    {analyticsLoading && (
                        <div style={{ textAlign: 'center', padding: '3rem' }}>
                            <div className={styles.spinner} style={{ margin: '0 auto 1rem auto' }} />
                            <p style={{ color: '#94a3b8' }}>Syncing metrics with LinkedIn social graph...</p>
                        </div>
                    )}

                    {!analyticsLoading && (
                        <div>
                            {/* API Pending Warning Banner */}
                            {apiPendingBanner && (
                                <div style={{
                                    background: 'rgba(245, 158, 11, 0.1)',
                                    border: '1px solid rgba(245, 158, 11, 0.25)',
                                    color: '#f59e0b',
                                    padding: '1rem 1.5rem',
                                    borderRadius: '16px',
                                    marginBottom: '2rem',
                                    fontSize: '0.9rem',
                                    lineHeight: 1.5
                                }}>
                                    ⚠️ Analytics pending LinkedIn API approval. Showing estimated data. Real data activates once LinkedIn approves our analytics scope.
                                </div>
                            )}

                            {analytics && (
                                <div>
                                    {/* KPI Stats Grid */}
                                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1.5rem', marginBottom: '2.5rem' }}>
                                        
                                        {/* Card 1: Total Impressions */}
                                        <div style={{ background: '#0f172a', border: '1px solid rgba(255,255,255,0.06)', borderRadius: '16px', padding: '1.5rem' }}>
                                            <span style={{ fontSize: '0.8rem', color: '#64748b', textTransform: 'uppercase', fontWeight: 700, letterSpacing: '0.05em' }}>Total Impressions</span>
                                            <h2 style={{ fontSize: '2rem', fontWeight: 800, margin: '0.5rem 0', color: '#fff' }}>
                                                {analytics.summary.totalImpressions.toLocaleString()}
                                            </h2>
                                            <span style={{ fontSize: '0.78rem', color: '#10b981', fontWeight: 600 }}>
                                                📈 {analytics.summary.trend}
                                            </span>
                                        </div>

                                        {/* Card 2: Avg Engagement Rate */}
                                        <div style={{ background: '#0f172a', border: '1px solid rgba(255,255,255,0.06)', borderRadius: '16px', padding: '1.5rem' }}>
                                            <span style={{ fontSize: '0.8rem', color: '#64748b', textTransform: 'uppercase', fontWeight: 700, letterSpacing: '0.05em' }}>Avg Engagement Rate</span>
                                            <h2 style={{ 
                                                fontSize: '2rem', 
                                                fontWeight: 800, 
                                                margin: '0.5rem 0', 
                                                color: getEngagementColor(analytics.summary.avgEngagementRate) 
                                            }}>
                                                {analytics.summary.avgEngagementRate}%
                                            </h2>
                                            <span style={{ fontSize: '0.78rem', color: '#94a3b8' }}>
                                                {analytics.summary.avgEngagementRate >= 3 ? 'Excellent reach' : analytics.summary.avgEngagementRate >= 1 ? 'Good interest' : 'Needs hook tweaking'}
                                            </span>
                                        </div>

                                        {/* Card 3: Posts Published */}
                                        <div style={{ background: '#0f172a', border: '1px solid rgba(255,255,255,0.06)', borderRadius: '16px', padding: '1.5rem' }}>
                                            <span style={{ fontSize: '0.8rem', color: '#64748b', textTransform: 'uppercase', fontWeight: 700, letterSpacing: '0.05em' }}>Posts Published</span>
                                            <h2 style={{ fontSize: '2rem', fontWeight: 800, margin: '0.5rem 0', color: '#fff' }}>
                                                {analytics.summary.postsPublishedThisMonth}
                                            </h2>
                                            <span style={{ fontSize: '0.78rem', color: '#94a3b8' }}>
                                                Active scheduler tracking
                                            </span>
                                        </div>

                                        {/* Card 4: Best Post */}
                                        <div style={{ background: '#0f172a', border: '1px solid rgba(255,255,255,0.06)', borderRadius: '16px', padding: '1.5rem', gridColumn: 'span 1' }}>
                                            <span style={{ fontSize: '0.8rem', color: '#64748b', textTransform: 'uppercase', fontWeight: 700, letterSpacing: '0.05em' }}>Top Post Impressions</span>
                                            {analytics.summary.bestPost ? (
                                                <>
                                                    <h2 style={{ fontSize: '2rem', fontWeight: 800, margin: '0.5rem 0', color: '#22d3ee' }}>
                                                        {analytics.summary.bestPost.impressions.toLocaleString()}
                                                    </h2>
                                                    <p style={{ fontSize: '0.8rem', color: '#94a3b8', margin: 0, textOverflow: 'ellipsis', overflow: 'hidden', whiteSpace: 'nowrap' }}>
                                                        &ldquo;{analytics.summary.bestPost.content.substring(0, 60)}...&rdquo;
                                                    </p>
                                                </>
                                            ) : (
                                                <p style={{ color: '#64748b', fontSize: '0.85rem', margin: '0.75rem 0 0 0', fontStyle: 'italic' }}>No posts published yet.</p>
                                            )}
                                        </div>
                                    </div>

                                    {/* Chart and History Section */}
                                    <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '2rem' }}>
                                        {/* Chart Card */}
                                        <div style={{ background: '#0f172a', border: '1px solid rgba(255,255,255,0.06)', borderRadius: '16px', padding: '2rem' }}>
                                            <h3 style={{ margin: '0 0 1.5rem 0', color: '#fff' }}>Impressions Trend</h3>
                                            
                                            {isMounted && analytics.history?.length > 0 ? (
                                                <AnalyticsChart history={analytics.history} />
                                            ) : (
                                                <div style={{ height: '300px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#64748b', fontStyle: 'italic' }}>
                                                    Publish posts to build tracking trends!
                                                </div>
                                            )}
                                        </div>

                                        {/* Side breakdown list */}
                                        <div style={{ background: '#0f172a', border: '1px solid rgba(255,255,255,0.06)', borderRadius: '16px', padding: '1.5rem' }}>
                                            <h3 style={{ margin: '0 0 1rem 0', color: '#fff', fontSize: '1.1rem' }}>Metrics Breakdown</h3>
                                            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginTop: '1.5rem' }}>
                                                <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid rgba(255,255,255,0.04)', paddingBottom: '0.5rem' }}>
                                                    <span style={{ color: '#94a3b8', fontSize: '0.85rem' }}>Total Reactions:</span>
                                                    <strong style={{ color: '#fff' }}>{analytics.summary.totalReactions}</strong>
                                                </div>
                                                <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid rgba(255,255,255,0.04)', paddingBottom: '0.5rem' }}>
                                                    <span style={{ color: '#94a3b8', fontSize: '0.85rem' }}>Total Comments:</span>
                                                    <strong style={{ color: '#fff' }}>{analytics.summary.totalComments}</strong>
                                                </div>
                                                <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid rgba(255,255,255,0.04)', paddingBottom: '0.5rem' }}>
                                                    <span style={{ color: '#94a3b8', fontSize: '0.85rem' }}>Total Clicks:</span>
                                                    <strong style={{ color: '#fff' }}>{analytics.summary.totalClicks}</strong>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}
