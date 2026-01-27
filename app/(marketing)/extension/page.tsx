"use client";

import Link from 'next/link';
import { Download, Puzzle, CheckCircle } from 'lucide-react';

export default function ExtensionPage() {
    return (
        <main style={{ padding: '4rem 2rem', maxWidth: '1000px', margin: '0 auto' }}>
            <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
                <h1 style={{ fontSize: '3rem', fontWeight: 'bold', marginBottom: '1rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '1rem' }}>
                    <Puzzle size={48} color="#0070f3" />
                    Resonate for Chrome
                </h1>
                <p style={{ color: '#666', fontSize: '1.25rem', maxWidth: '600px', margin: '0 auto' }}>
                    Generating content is only half the battle. Use our Chrome Extension to seamlessly integrate Resonate into your LinkedIn workflow.
                </p>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem', marginBottom: '4rem' }}>
                <div style={{ padding: '2rem', borderRadius: '12px', border: '1px solid #eaeaea', backgroundColor: '#fff' }}>
                    <h2 style={{ fontSize: '1.5rem', fontWeight: '600', marginBottom: '1rem' }}>Installation</h2>
                    <ol style={{ paddingLeft: '1.5rem', lineHeight: '1.8', color: '#444' }}>
                        <li>Download and <b>extract</b> the extension zip file.</li>
                        <li>Open Chrome and navigate to <b>chrome://extensions</b>.</li>
                        <li>Enable <b>Developer mode</b> in the top right.</li>
                        <li>Click <b>Load unpacked</b>.</li>
                        <li>Select the <code>/extension</code> folder from the project directory.</li>
                    </ol>
                </div>

                <div style={{ padding: '2rem', borderRadius: '12px', border: '1px solid #eaeaea', backgroundColor: '#fff' }}>
                    <h2 style={{ fontSize: '1.5rem', fontWeight: '600', marginBottom: '1rem' }}>Features</h2>
                    <ul style={{ listStyle: 'none', padding: 0 }}>
                        <li style={{ display: 'flex', gap: '0.75rem', marginBottom: '1rem', alignItems: 'center' }}>
                            <CheckCircle size={20} color="#10b981" />
                            <span>Instant post generation from browser</span>
                        </li>
                        <li style={{ display: 'flex', gap: '0.75rem', marginBottom: '1rem', alignItems: 'center' }}>
                            <CheckCircle size={20} color="#10b981" />
                            <span>Context-aware rewriting</span>
                        </li>
                        <li style={{ display: 'flex', gap: '0.75rem', marginBottom: '1rem', alignItems: 'center' }}>
                            <CheckCircle size={20} color="#10b981" />
                            <span>Save drafts directly to Dashboard</span>
                        </li>
                    </ul>
                </div>
            </div>

            <div style={{ textAlign: 'center' }}>
                <a href="/extension.zip" download style={{ textDecoration: 'none' }}>
                    <button style={{
                        cursor: 'pointer',
                        background: '#0070f3',
                        color: 'white',
                        padding: '1rem 2rem',
                        borderRadius: '8px',
                        border: 'none',
                        fontSize: '1.1rem',
                        fontWeight: '600',
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '0.75rem',
                        transition: 'opacity 0.2s',
                    }}
                        onMouseOver={(e) => e.currentTarget.style.opacity = '0.9'}
                        onMouseOut={(e) => e.currentTarget.style.opacity = '1'}
                    >
                        <Download size={20} />
                        Download Extension (.zip)
                    </button>
                </a>
                <p style={{ marginTop: '1rem', fontSize: '0.875rem', color: '#888' }}>
                    Currently available in local development environment only.
                </p>
            </div>
        </main>
    );
}
