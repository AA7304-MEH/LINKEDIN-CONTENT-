"use client";

import { useState } from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import styles from './HeroSection.module.css';

export default function HeroSection() {
    const [topic, setTopic] = useState('');
    const [score, setScore] = useState<number | null>(null);
    const [loading, setLoading] = useState(false);
    const [showVideo, setShowVideo] = useState(false);
    const router = useRouter();

    const handleAnalyze = () => {
        if (!topic) return;
        setLoading(true);
        // Simulate analysis
        setTimeout(() => {
            setScore(Math.floor(Math.random() * 3) + 8); // Random score between 8-10
            setLoading(false);
            // Redirect to sign up after showing score briefly
            setTimeout(() => {
                router.push(`/sign-up?topic=${encodeURIComponent(topic)}`);
            }, 1500);
        }, 1500);
    };

    return (
        <section className="relative pt-32 pb-24 md:pt-48 md:pb-40 overflow-hidden bg-[#030303]">
            {/* Dynamic Background Elements */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full max-w-7xl -z-10">
                <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-[#00e5ff]/10 blur-[120px] rounded-full" />
                <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-[#0077b5]/10 blur-[100px] rounded-full" />
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="flex flex-col items-center text-center max-w-4xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                    >
                        {/* Elite Badge */}
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-md mb-10 group hover:border-[#00e5ff]/30 transition-all duration-300">
                            <span className="relative flex h-2 w-2">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#00e5ff] opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#00e5ff]"></span>
                            </span>
                            <span className="text-white/60 text-[10px] font-black tracking-widest uppercase">The Future of Authority</span>
                        </div>

                        {/* High-Impact Typography */}
                        <h1 className="text-6xl md:text-8xl lg:text-[7.5rem] font-[900] text-white leading-[0.9] mb-10 tracking-tighter">
                            Your voice. <br/>
                            <span className="text-[#00e5ff] accent-glow">AI Scale.</span>
                        </h1>

                        <p className="text-slate-400 text-xl md:text-2xl mb-12 max-w-2xl mx-auto font-medium leading-relaxed">
                            Resodin is the first AI content engine that decodes your professional voice to generate high-authority LinkedIn growth on autopilot.
                        </p>

                        {/* Integrated CTA Area */}
                        <div className="flex flex-col sm:flex-row items-center justify-center gap-6 mb-20">
                            <motion.button
                                whileHover={{ scale: 1.05, y: -4 }}
                                whileTap={{ scale: 0.98 }}
                                className="w-full sm:w-auto px-12 py-5 bg-white text-[#030303] text-xl font-black rounded-3xl shadow-[0_20px_50px_rgba(255,255,255,0.15)] hover:bg-[#00e5ff] transition-all"
                            >
                                Get Started Free
                            </motion.button>
                            <Link href="/audit">
                                <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    className="w-full sm:w-auto px-10 py-5 bg-transparent border-2 border-white/10 text-white text-lg font-bold rounded-3xl hover:bg-white/5 transition-all"
                                >
                                    Try AI Diagnostic →
                                </motion.button>
                            </Link>
                        </div>
                    </motion.div>

                    {/* Sophisticated Layered Mockup */}
                    <motion.div
                        initial={{ opacity: 0, y: 100 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1.2, delay: 0.2 }}
                        className="relative w-full max-w-5xl mx-auto"
                    >
                        <div className="relative premium-glass rounded-[3rem] p-4 shadow-2xl border-white/10 group overflow-hidden">
                            <div className="absolute inset-0 bg-gradient-to-br from-[#00e5ff]/5 via-transparent to-[#0077b5]/5 -z-10" />
                            <div className="bg-[#030303] rounded-[2.5rem] p-4 md:p-8 aspect-[16/9] md:aspect-auto overflow-hidden">
                                <div className="flex items-center gap-4 border-b border-white/5 pb-6 mb-8">
                                    <div className="w-12 h-12 rounded-full bg-slate-800" />
                                    <div className="flex-1 text-left">
                                        <div className="h-3 w-32 bg-slate-800 rounded-full mb-2" />
                                        <div className="h-2 w-20 bg-slate-900 rounded-full" />
                                    </div>
                                    <div className="flex gap-2">
                                        <div className="w-3 h-3 rounded-full bg-red-500/20" />
                                        <div className="w-3 h-3 rounded-full bg-yellow-500/20" />
                                        <div className="w-3 h-3 rounded-full bg-green-500/20" />
                                    </div>
                                </div>
                                <div className="space-y-6">
                                    <div className="h-4 w-full bg-slate-800 rounded-full" />
                                    <div className="h-4 w-[90%] bg-slate-800 rounded-full opacity-60" />
                                    <div className="h-4 w-[95%] bg-slate-800 rounded-full" />
                                    <div className="h-4 w-[40%] bg-[#00e5ff]/20 rounded-full" />
                                </div>
                            </div>
                        </div>

                        {/* Floating elements for depth */}
                        <div className="absolute -top-12 -left-12 md:-left-20 premium-glass p-6 rounded-3xl shadow-2xl border-white/10 hidden md:block backdrop-blur-3xl animate-float">
                            <div className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-2">Authority Score</div>
                            <div className="text-3xl font-black text-[#00e5ff]">98.4%</div>
                        </div>
                        <div className="absolute -bottom-10 -right-10 md:-right-20 premium-glass p-6 rounded-3xl shadow-2xl border-white/10 hidden md:block backdrop-blur-3xl animate-float-delayed">
                            <div className="flex items-center gap-4">
                                <div className="w-10 h-10 rounded-2xl bg-[#00e5ff]/10 flex items-center justify-center">
                                    <div className="w-4 h-4 rounded-full bg-[#00e5ff]" />
                                </div>
                                <div className="text-left">
                                    <div className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Active Analysis</div>
                                    <div className="text-lg font-bold text-white leading-none">Voice DNA Ready</div>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>

            {/* Video Modal */}
            {showVideo && (
                <div style={{
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    backgroundColor: 'rgba(0,0,0,0.8)',
                    zIndex: 1000,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: '2rem'
                }} onClick={() => setShowVideo(false)}>
                    <div style={{
                        position: 'relative',
                        width: '100%',
                        maxWidth: '900px',
                        background: '#000',
                        borderRadius: '12px',
                        overflow: 'hidden',
                        boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)'
                    }} onClick={e => e.stopPropagation()}>
                        <button
                            onClick={() => setShowVideo(false)}
                            style={{
                                position: 'absolute',
                                top: '1rem',
                                right: '1rem',
                                background: 'rgba(255,255,255,0.2)',
                                border: 'none',
                                color: 'white',
                                width: '30px',
                                height: '30px',
                                borderRadius: '50%',
                                cursor: 'pointer',
                                zIndex: 10,
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center'
                            }}
                        >
                            ✕
                        </button>
                        <img
                            src="/demo-video.webp"
                            alt="Resodin Demo Video"
                            style={{ width: '100%', height: 'auto', display: 'block' }}
                        />
                    </div>
                </div>
            )}
        </section>
    );
}
