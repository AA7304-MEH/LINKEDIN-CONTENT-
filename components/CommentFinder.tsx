"use client";

import { useState } from 'react';
import styles from './CommentFinder.module.css';

// Mock Data for "Trending Posts" since we don't have live LinkedIn API access
const MOCK_POSTS = [
    {
        id: 1,
        author: "Sara Blakely",
        title: "Founder, Spanx",
        content: "Failure is not the outcome - failure is not trying. Don't be afraid to fail.",
        likes: "12,453",
        comments: "452"
    },
    {
        id: 2,
        author: "Simon Sinek",
        title: "Optimist & Author",
        content: "Leadership is not about being in charge. It is about taking care of those in your charge.",
        likes: "8,921",
        comments: "312"
    },
    {
        id: 3,
        author: "Gary Vaynerchuk",
        title: "Chairman, VaynerX",
        content: "Stop worrying about what others think. The only person you need to impress is yourself in 10 years.",
        likes: "15,234",
        comments: "891"
    }
];

interface GeneratedComments {
    valueAdd: string;
    question: string;
    story: string;
}

export default function CommentFinder() {
    const [activePostId, setActivePostId] = useState<number | string | null>(null);
    const [loading, setLoading] = useState(false);
    const [generatedComments, setGeneratedComments] = useState<GeneratedComments | null>(null);
    const [copied, setCopied] = useState<string | null>(null);

    // Custom post state
    const [customMode, setCustomMode] = useState(false);
    const [customContent, setCustomContent] = useState('');
    const [customError, setCustomError] = useState<string | null>(null);

    const handleGenerate = async (postId: number | string, postContent: string, postAuthor: string) => {
        setActivePostId(postId);
        setLoading(true);
        setGeneratedComments(null);

        try {
            const res = await fetch('/api/generate-comment', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ postContent, postAuthor }),
            });

            if (!res.ok) {
                const errorData = await res.json();
                throw new Error(errorData.error || 'Failed to generate comments');
            }
            const data = await res.json();
            setGeneratedComments(data);
        } catch (e: any) {
            alert(e.message || 'Error generating comments');
            setActivePostId(null);
        } finally {
            setLoading(false);
        }
    };

    const handleCustomGenerate = () => {
        setCustomError(null);
        if (!customContent.trim()) {
            setCustomError('Please paste a LinkedIn post before generating.');
            return;
        }
        handleGenerate('custom', customContent.trim(), 'Custom Post');
    };

    const copyToClipboard = (text: string, key: string) => {
        navigator.clipboard.writeText(text);
        setCopied(key);
        setTimeout(() => setCopied(null), 2000);
    };

    return (
        <div className={styles.container}>
            {/* Mode Tabs */}
            <div className={styles.modeTabs}>
                <button
                    className={`${styles.modeTab} ${!customMode ? styles.modeTabActive : ''}`}
                    onClick={() => { setCustomMode(false); setGeneratedComments(null); setActivePostId(null); }}
                >
                    🔥 Trending Posts
                </button>
                <button
                    className={`${styles.modeTab} ${customMode ? styles.modeTabActive : ''}`}
                    onClick={() => { setCustomMode(true); setGeneratedComments(null); setActivePostId(null); }}
                >
                    ✏️ Custom Post
                </button>
            </div>

            {/* Custom Post Input */}
            {customMode && (
                <div className={styles.customSection}>
                    <label className={styles.customLabel}>
                        Paste any LinkedIn post below to generate smart comments:
                    </label>
                    <textarea
                        className={styles.customTextarea}
                        rows={6}
                        placeholder="Paste a LinkedIn post here..."
                        value={customContent}
                        onChange={(e) => setCustomContent(e.target.value)}
                    />
                    {customError && <p className={styles.customError}>{customError}</p>}
                    <button
                        className={styles.generateButton}
                        onClick={handleCustomGenerate}
                        disabled={loading && activePostId === 'custom'}
                    >
                        {loading && activePostId === 'custom' ? 'Thinking…' : '⚡ Generate Smart Comments'}
                    </button>

                    {activePostId === 'custom' && generatedComments && (
                        <div className={styles.commentsSection}>
                            {[
                                { key: 'valueAdd', badge: styles.webadge, label: 'Value Add', text: generatedComments.valueAdd },
                                { key: 'question', badge: styles.qbadge, label: 'Question', text: generatedComments.question },
                                { key: 'story', badge: styles.sbadge, label: 'Story', text: generatedComments.story },
                            ].map(({ key, badge, label, text }) => (
                                <div key={key} className={styles.commentOption}>
                                    <div className={styles.optionHeader}>
                                        <span className={badge}>{label}</span>
                                        <button onClick={() => copyToClipboard(text, key)}>
                                            {copied === key ? '✅ Copied' : 'Copy'}
                                        </button>
                                    </div>
                                    <p>{text}</p>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            )}

            {/* Trending Posts List */}
            {!customMode && (
                <div className={styles.results}>
                    {MOCK_POSTS.map(post => (
                        <div key={post.id} className={styles.postCard}>
                            <div className={styles.postHeader}>
                                <div className={styles.avatar}>{post.author[0]}</div>
                                <div>
                                    <h4 className={styles.authorName}>{post.author}</h4>
                                    <p className={styles.authorTitle}>{post.title}</p>
                                </div>
                            </div>
                            <p className={styles.postContent}>"{post.content}"</p>
                            <div className={styles.metrics}>
                                <span>👍 {post.likes}</span>
                                <span>💬 {post.comments} comments</span>
                            </div>

                            <button
                                className={styles.generateButton}
                                onClick={() => handleGenerate(post.id, post.content, post.author)}
                                disabled={loading && activePostId === post.id}
                            >
                                {loading && activePostId === post.id ? 'Thinking…' : '⚡ Generate Smart Comments'}
                            </button>

                            {activePostId === post.id && generatedComments && (
                                <div className={styles.commentsSection}>
                                    {[
                                        { key: `va-${post.id}`, badge: styles.webadge, label: 'Value Add', text: generatedComments.valueAdd },
                                        { key: `q-${post.id}`, badge: styles.qbadge, label: 'Question', text: generatedComments.question },
                                        { key: `s-${post.id}`, badge: styles.sbadge, label: 'Story', text: generatedComments.story },
                                    ].map(({ key, badge, label, text }) => (
                                        <div key={key} className={styles.commentOption}>
                                            <div className={styles.optionHeader}>
                                                <span className={badge}>{label}</span>
                                                <button onClick={() => copyToClipboard(text, key)}>
                                                    {copied === key ? '✅ Copied' : 'Copy'}
                                                </button>
                                            </div>
                                            <p>{text}</p>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
