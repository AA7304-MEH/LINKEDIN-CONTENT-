"use client";

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Share2, ClipboardCheck, Sparkles, BookOpen, Anchor, BarChart2 } from 'lucide-react';
import toast from 'react-hot-toast';

interface VoiceDnaAnalysis {
    writingStyle: string;
    avgLength: number;
    strongestHook: string;
    toneCharacteristics: string[];
    signaturePhrases: string[];
    dnaScore: number;
    summary: string;
}

interface VoiceDnaCardProps {
    analysis: VoiceDnaAnalysis;
}

export default function VoiceDnaCard({ analysis }: VoiceDnaCardProps) {
    const [copied, setCopied] = useState(false);

    const {
        writingStyle = 'Punchy, conversational',
        avgLength = 350,
        strongestHook = 'Contrarian question',
        toneCharacteristics = ['Direct', 'Authentic'],
        signaturePhrases = ['Let\'s look at the numbers:', 'Unpopular opinion:'],
        dnaScore = 85,
        summary = 'Highly optimized structure.'
    } = analysis;

    const handleShare = () => {
        const textToCopy = `My LinkedIn Voice DNA 🧬
Style: ${writingStyle}
Strongest hook: ${strongestHook}
DNA Score: ${dnaScore}/100
Analyzed by Resodin AI → resodin.vercel.app`;

        navigator.clipboard.writeText(textToCopy);
        setCopied(true);
        toast.success('Shareable Voice DNA copied to clipboard!');
        setTimeout(() => setCopied(false), 3000);
    };

    // Calculate SVG circular stroke offset
    const radius = 40;
    const circumference = 2 * Math.PI * radius;
    const strokeDashoffset = circumference - (dnaScore / 100) * circumference;

    return (
        <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            style={{
                background: '#0A0F1E',
                border: '1px solid rgba(6, 182, 212, 0.25)',
                boxShadow: '0 8px 32px rgba(6, 182, 212, 0.08), 0 0 20px rgba(6, 182, 212, 0.03)',
                borderRadius: '24px',
                padding: '2.5rem 2rem',
                color: '#f8fafc',
                maxWidth: '650px',
                margin: '1.5rem auto',
                position: 'relative',
                overflow: 'hidden',
                fontFamily: 'Inter, system-ui, sans-serif'
            }}
        >
            {/* Glow Decorative Background Elements */}
            <div style={{
                position: 'absolute',
                top: '-50px',
                right: '-50px',
                width: '150px',
                height: '150px',
                background: 'rgba(6, 182, 212, 0.15)',
                filter: 'blur(50px)',
                borderRadius: '50%',
                zIndex: 0
            }} />
            <div style={{
                position: 'absolute',
                bottom: '-50px',
                left: '-50px',
                width: '150px',
                height: '150px',
                background: 'rgba(99, 102, 241, 0.1)',
                filter: 'blur(50px)',
                borderRadius: '50%',
                zIndex: 0
            }} />

            {/* Header */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem', position: 'relative', zIndex: 1 }}>
                <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#06B6D4', fontSize: '0.85rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '0.25rem' }}>
                        <Sparkles size={14} />
                        Personalized Analysis
                    </div>
                    <h2 style={{ fontSize: '1.75rem', fontWeight: 800, margin: 0, background: 'linear-gradient(135deg, #fff 0%, #a5f3fc 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                        Your Content DNA
                    </h2>
                </div>

                {/* Circular Score */}
                <div style={{ position: 'relative', width: '96px', height: '96px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <svg width="96" height="96" viewBox="0 0 100 100" style={{ transform: 'rotate(-90deg)', width: '100%', height: '100%' }}>
                        <circle
                            cx="50"
                            cy="50"
                            r={radius}
                            fill="transparent"
                            stroke="rgba(255, 255, 255, 0.05)"
                            strokeWidth="8"
                        />
                        <motion.circle
                            cx="50"
                            cy="50"
                            r={radius}
                            fill="transparent"
                            stroke="#06B6D4"
                            strokeWidth="8"
                            strokeDasharray={circumference}
                            initial={{ strokeDashoffset: circumference }}
                            animate={{ strokeDashoffset }}
                            transition={{ duration: 1.5, ease: 'easeOut', delay: 0.3 }}
                            strokeLinecap="round"
                        />
                    </svg>
                    <div style={{ position: 'absolute', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                        <span style={{ fontSize: '1.4rem', fontWeight: 900, color: '#fff' }}>{dnaScore}</span>
                        <span style={{ fontSize: '0.55rem', textTransform: 'uppercase', color: '#64748b', fontWeight: 700 }}>DNA Score</span>
                    </div>
                </div>
            </div>

            {/* DNA Metrics */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', marginBottom: '2rem', position: 'relative', zIndex: 1 }}>
                
                {/* Style Card */}
                <div style={{ background: 'rgba(255, 255, 255, 0.02)', border: '1px solid rgba(255, 255, 255, 0.05)', borderRadius: '14px', padding: '1rem', display: 'flex', gap: '0.75rem' }}>
                    <BookOpen style={{ color: '#06B6D4', flexShrink: 0 }} size={20} />
                    <div>
                        <div style={{ fontSize: '0.75rem', color: '#64748b', fontWeight: 600, textTransform: 'uppercase', marginBottom: '0.2rem' }}>Writing Style</div>
                        <div style={{ fontSize: '0.9rem', color: '#e2e8f0', lineHeight: 1.4 }}>{writingStyle}</div>
                    </div>
                </div>

                {/* Hook Card */}
                <div style={{ background: 'rgba(255, 255, 255, 0.02)', border: '1px solid rgba(255, 255, 255, 0.05)', borderRadius: '14px', padding: '1rem', display: 'flex', gap: '0.75rem' }}>
                    <Anchor style={{ color: '#06B6D4', flexShrink: 0 }} size={20} />
                    <div>
                        <div style={{ fontSize: '0.75rem', color: '#64748b', fontWeight: 600, textTransform: 'uppercase', marginBottom: '0.2rem' }}>Strongest Hook</div>
                        <div style={{ fontSize: '0.9rem', color: '#e2e8f0', lineHeight: 1.4 }}>{strongestHook}</div>
                    </div>
                </div>

                {/* Length Card */}
                <div style={{ background: 'rgba(255, 255, 255, 0.02)', border: '1px solid rgba(255, 255, 255, 0.05)', borderRadius: '14px', padding: '1rem', display: 'flex', gap: '0.75rem' }}>
                    <BarChart2 style={{ color: '#06B6D4', flexShrink: 0 }} size={20} />
                    <div>
                        <div style={{ fontSize: '0.75rem', color: '#64748b', fontWeight: 600, textTransform: 'uppercase', marginBottom: '0.2rem' }}>Average Post Length</div>
                        <div style={{ fontSize: '0.9rem', color: '#e2e8f0', lineHeight: 1.4 }}>{avgLength} characters</div>
                    </div>
                </div>

                {/* Tone Characteristics Card */}
                <div style={{ background: 'rgba(255, 255, 255, 0.02)', border: '1px solid rgba(255, 255, 255, 0.05)', borderRadius: '14px', padding: '1rem', display: 'flex', gap: '0.75rem' }}>
                    <Sparkles style={{ color: '#06B6D4', flexShrink: 0 }} size={20} />
                    <div>
                        <div style={{ fontSize: '0.75rem', color: '#64748b', fontWeight: 600, textTransform: 'uppercase', marginBottom: '0.2rem' }}>Tone Markers</div>
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.25rem', marginTop: '0.25rem' }}>
                            {toneCharacteristics.map((tone) => (
                                <span key={tone} style={{ background: 'rgba(6, 182, 212, 0.1)', color: '#22d3ee', fontSize: '0.75rem', padding: '0.15rem 0.5rem', borderRadius: '999px', fontWeight: 500 }}>
                                    {tone}
                                </span>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* Signature Phrases */}
            <div style={{ marginBottom: '2rem', position: 'relative', zIndex: 1 }}>
                <h4 style={{ fontSize: '0.75rem', color: '#64748b', textTransform: 'uppercase', margin: '0 0 0.5rem 0', fontWeight: 600 }}>Signature Phrases</h4>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                    {signaturePhrases.map((phrase, idx) => (
                        <div key={idx} style={{ padding: '0.6rem 0.8rem', background: 'rgba(255,255,255,0.01)', borderLeft: '3px solid #06B6D4', color: '#cbd5e1', fontSize: '0.85rem', fontStyle: 'italic', borderRadius: '0 8px 8px 0' }}>
                            &ldquo;{phrase}&rdquo;
                        </div>
                    ))}
                </div>
            </div>

            {/* DNA Summary */}
            <div style={{ padding: '1rem', background: 'rgba(6, 182, 212, 0.04)', border: '1px dashed rgba(6, 182, 212, 0.2)', borderRadius: '16px', marginBottom: '2rem', fontSize: '0.9rem', color: '#cbd5e1', lineHeight: 1.5, position: 'relative', zIndex: 1 }}>
                {summary}
            </div>

            {/* Share CTA */}
            <div style={{ display: 'flex', gap: '1rem', position: 'relative', zIndex: 1 }}>
                <button
                    onClick={handleShare}
                    style={{
                        flex: 1,
                        background: 'linear-gradient(135deg, #06B6D4 0%, #0891b2 100%)',
                        color: '#fff',
                        border: 'none',
                        borderRadius: '12px',
                        padding: '0.8rem 1.5rem',
                        fontWeight: 700,
                        fontSize: '0.95rem',
                        cursor: 'pointer',
                        display: 'inline-flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '0.5rem',
                        transition: 'opacity 0.2s',
                        boxShadow: '0 4px 15px rgba(6, 182, 212, 0.3)'
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.opacity = '0.9'}
                    onMouseLeave={(e) => e.currentTarget.style.opacity = '1'}
                >
                    {copied ? <ClipboardCheck size={18} /> : <Share2 size={18} />}
                    {copied ? 'Copied DNA!' : 'Share My DNA'}
                </button>
            </div>
        </motion.div>
    );
}
