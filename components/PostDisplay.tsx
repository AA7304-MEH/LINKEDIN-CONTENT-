"use client";

import { useState } from 'react';
import styles from './PostDisplay.module.css';

interface Hashtags {
    broad: string[];
    niche: string[];
    community: string[];
}

interface PostDisplayProps {
    content: string;
    hashtags?: Hashtags;
    isFree?: boolean;
}

export default function PostDisplay({ content, hashtags, isFree = true }: PostDisplayProps) {
    const [copied, setCopied] = useState(false);

    const handleCopy = async () => {
        let textToCopy = content;
        if (hashtags) {
            const allTags = [...(hashtags.broad || []), ...(hashtags.niche || []), ...(hashtags.community || [])].join(' ');
            if (allTags) textToCopy += `\n\n${allTags}`;
        }
        if (isFree) {
            textToCopy += `\n\n✨ Created with Resodin.ai — Try free → ${window.location.origin}`;
        }
        await navigator.clipboard.writeText(textToCopy);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const handleOpenLinkedIn = () => {
        const linkedInUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(window.location.origin)}`;
        window.open('https://www.linkedin.com/feed/', '_blank');
    };

    const handleDownload = () => {
        let textToDownload = content;
        if (isFree) {
            textToDownload += `\n\n✨ Created with Resodin.ai — Try free → ${window.location.origin}`;
        }
        const element = document.createElement("a");
        const file = new Blob([textToDownload], { type: 'text/plain' });
        element.href = URL.createObjectURL(file);
        element.download = "linkedin-post.txt";
        document.body.appendChild(element);
        element.click();
    };

    if (!content) return null;

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <h3 className={styles.heading}>Generated Post</h3>
                <div className={styles.actions}>
                    <button className={styles.actionButton} onClick={handleDownload} title="Download .txt">
                        ⬇️
                    </button>
                    <button className={styles.actionButton} onClick={handleOpenLinkedIn} title="Open LinkedIn">
                        🔗
                    </button>
                    <button className={styles.copyButton} onClick={handleCopy}>
                        {copied ? 'Copied!' : 'Copy to Clipboard'}
                    </button>
                </div>
            </div>
            <div className={styles.content}>
                {content.split('\n').map((line, i) => (
                    <p key={i} className={styles.paragraph}>
                        {line || <br />}
                    </p>
                ))}
                
                {isFree && (
                    <div className="mt-8 pt-6 border-t border-white/5">
                        <p className="text-gray-500 text-sm italic flex items-center gap-2">
                            <span>✨</span> Created with <a href="/" className="text-blue-400 hover:underline">Resodin.ai</a> — Try free →
                        </p>
                    </div>
                )}
            </div>


            {hashtags && (
                <div className={styles.hashtagSection}>
                    <div className={styles.tagGroup}>
                        <span className={styles.tagLabel}>Broad:</span>
                        {hashtags.broad?.map(t => <span key={t} className={styles.tag}>{t}</span>)}
                    </div>
                    <div className={styles.tagGroup}>
                        <span className={styles.tagLabel}>Niche:</span>
                        {hashtags.niche?.map(t => <span key={t} className={styles.tag}>{t}</span>)}
                    </div>
                    <div className={styles.tagGroup}>
                        <span className={styles.tagLabel}>Community:</span>
                        {hashtags.community?.map(t => <span key={t} className={styles.tag}>{t}</span>)}
                    </div>
                </div>
            )}
        </div>
    );
}
