"use client";

import { useState } from 'react';
import ContentForm from '@/components/ContentForm';
import ContentCalendar from '@/components/ContentCalendar';

import styles from './page.module.css';

export default function VideoDemoPage() {
    const [generatedPost, setGeneratedPost] = useState<any>(null);
    const [scene, setScene] = useState<'demo' | 'features' | 'feed'>('demo');

    const handleGenerate = async (data: any) => {
        // Simulate loading
        await new Promise(resolve => setTimeout(resolve, 2000));

        setGeneratedPost({
            ...data,
            content: `Remote work isn't the future. It's the present.\n\nI've spoken to 50+ founders in the last month.\n90% of them are hiring remote-first.\n\nWhy? Access to global talent, lower overhead, and happier employees.\n\nIf you're still mandating RTO, you're fighting a losing battle.`,
            hookScore: 8.5,
            hashtags: ['#RemoteWork', '#Leadership', '#FutureOfWork']
        });
    };

    return (
        <main style={{ minHeight: '100vh', background: '#f3f4f6', padding: '2rem' }}>
            <div style={{ marginBottom: '2rem', display: 'flex', gap: '1rem' }}>
                <button onClick={() => setScene('demo')} style={{ padding: '0.5rem 1rem', background: scene === 'demo' ? '#0077b5' : '#ddd', color: scene === 'demo' ? 'white' : 'black', border: 'none', borderRadius: '4px' }}>Solution Demo</button>
                <button onClick={() => setScene('features')} style={{ padding: '0.5rem 1rem', background: scene === 'features' ? '#0077b5' : '#ddd', color: scene === 'features' ? 'white' : 'black', border: 'none', borderRadius: '4px' }}>Key Features</button>
                <button onClick={() => setScene('feed')} style={{ padding: '0.5rem 1rem', background: scene === 'feed' ? '#0077b5' : '#ddd', color: scene === 'feed' ? 'white' : 'black', border: 'none', borderRadius: '4px' }}>Feed Scroll</button>
            </div>

            {scene === 'demo' && (
                <div style={{ maxWidth: '800px', margin: '0 auto', background: 'white', padding: '2rem', borderRadius: '8px', boxShadow: '0 4px 6px rgba(0,0,0,0.1)' }}>
                    <h1 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '1.5rem', color: '#1f2937' }}>New Post</h1>

                    {!generatedPost ? (
                        <ContentForm onGenerate={handleGenerate} />
                    ) : (
                        <div className="animate-fade-in">
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem', paddingBottom: '1rem', borderBottom: '1px solid #e5e7eb' }}>
                                <span style={{ fontWeight: '600', color: '#059669' }}>Success! Post Generated</span>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                    <span style={{ fontSize: '0.9rem', color: '#6b7280' }}>Hook Score:</span>
                                    <span style={{ background: '#10b981', color: 'white', padding: '0.2rem 0.6rem', borderRadius: '999px', fontWeight: 'bold' }}>{generatedPost.hookScore}/10</span>
                                </div>
                            </div>

                            <div style={{ whiteSpace: 'pre-wrap', lineHeight: '1.6', color: '#374151', marginBottom: '1.5rem' }}>
                                {generatedPost.content}
                            </div>

                            <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                                {generatedPost.hashtags.map((tag: string) => (
                                    <span key={tag} style={{ color: '#0077b5', fontWeight: '500' }}>{tag}</span>
                                ))}
                            </div>

                            <button
                                onClick={() => setGeneratedPost(null)}
                                style={{ marginTop: '2rem', color: '#6b7280', textDecoration: 'underline', background: 'none', border: 'none', cursor: 'pointer' }}
                            >
                                Reset Demo
                            </button>
                        </div>
                    )}
                </div>
            )}

            {scene === 'features' && (
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '2rem', maxWidth: '1200px', margin: '0 auto' }}>
                    {/* Feature 1: Gauge */}
                    <div style={{ background: 'white', padding: '2rem', borderRadius: '12px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', boxShadow: '0 4px 6px rgba(0,0,0,0.05)' }}>
                        <div style={{ width: '150px', height: '75px', background: 'linear-gradient(90deg, #ef4444 0%, #f59e0b 50%, #10b981 100%)', borderTopLeftRadius: '150px', borderTopRightRadius: '150px', position: 'relative', marginBottom: '1rem' }}>
                            <div style={{ position: 'absolute', bottom: '0', left: '50%', width: '4px', height: '60px', background: 'white', transformOrigin: 'bottom center', transform: 'rotate(60deg)', border: '2px solid #374151' }}></div>
                        </div>
                        <h3 style={{ fontSize: '1.25rem', fontWeight: 'bold' }}>Hook Score</h3>
                        <p style={{ color: '#6b7280', textAlign: 'center' }}>Real-time impact analysis</p>
                    </div>

                    {/* Feature 2: DNA */}
                    <div style={{ background: 'white', padding: '2rem', borderRadius: '12px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', boxShadow: '0 4px 6px rgba(0,0,0,0.05)' }}>
                        <div style={{ width: '80px', height: '80px', background: '#e0f2fe', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1rem' }}>
                            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#0077b5" strokeWidth="2">
                                <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                            </svg>
                        </div>
                        <h3 style={{ fontSize: '1.25rem', fontWeight: 'bold' }}>Personal DNA</h3>
                        <p style={{ color: '#6b7280', textAlign: 'center' }}>Clones your unique voice</p>
                    </div>

                    {/* Feature 3: Calendar */}
                    <div style={{ background: 'white', padding: '1rem', borderRadius: '12px', display: 'flex', flexDirection: 'column', boxShadow: '0 4px 6px rgba(0,0,0,0.05)', overflow: 'hidden', height: '300px' }}>
                        <h3 style={{ fontSize: '1.1rem', fontWeight: 'bold', marginBottom: '0.5rem', textAlign: 'center' }}>Smart One-Click Schedule</h3>
                        <div style={{ flex: 1, position: 'relative', zoom: '0.6' }}>
                            <ContentCalendar />
                        </div>
                    </div>
                </div>
            )}

            {scene === 'feed' && (
                <div style={{ maxWidth: '600px', margin: '0 auto' }}>
                    {[1, 2, 3].map((i) => (
                        <div key={i} style={{ background: 'white', borderRadius: '8px', padding: '1rem', marginBottom: '1rem', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
                            <div style={{ display: 'flex', gap: '0.75rem', marginBottom: '0.75rem' }}>
                                <div style={{ width: '48px', height: '48px', borderRadius: '50%', background: '#e5e7eb' }}></div>
                                <div>
                                    <div style={{ fontWeight: '600', width: '120px', height: '16px', background: '#f3f4f6', marginBottom: '4px' }}></div>
                                    <div style={{ fontSize: '0.875rem', color: '#6b7280', width: '80px', height: '12px', background: '#f3f4f6' }}></div>
                                </div>
                            </div>
                            <div style={{ height: '80px', background: '#f9fafb', marginBottom: '1rem', borderRadius: '4px' }}></div>
                            <div style={{ display: 'flex', justifyContent: 'space-around', borderTop: '1px solid #e5e7eb', paddingTop: '0.5rem', color: '#6b7280' }}>
                                <span>Like</span>
                                <span>Comment</span>
                                <span>Share</span>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </main>
    );
}
