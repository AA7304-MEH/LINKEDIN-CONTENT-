"use client";

import { motion } from 'framer-motion';
import { useState } from 'react';

export default function ProductDemoSection() {
    const [topic, setTopic] = useState('How AI is changing personal branding');
    const [tone, setTone] = useState('Professional');
    const [postType, setPostType] = useState('Educational');

    const mockPost = `The game has changed for personal branding in 2026. 🚀

Most people think AI is just for automation. But the real winners are using it for *amplification*. 

I've been using Resodin to decode my own professional voice, and the results have been staggering:
• 10x content consistency
• 40% higher engagement
• 0 hours of writer's block

It's not about replacing yourself; it's about scaling your unique perspective.

How are you using AI in your workflow this year? 👇

#PersonalBranding #AI #FutureOfWork #Resodin`;

    return (
        <section className="py-32 bg-[#030303] relative">
            <div className="absolute top-1/2 left-0 -translate-y-1/2 w-full h-[400px] bg-[#00e5ff]/5 blur-[120px] rounded-full -z-10" />
            
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-24">
                    <h2 className="text-5xl font-black text-white mb-6 tracking-tighter">Your voice, <span className="text-gradient">amplified</span></h2>
                    <p className="text-slate-400 text-xl font-medium max-w-2xl mx-auto">Generate high-authority posts that sound exactly like you, with zero creative friction.</p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                    {/* Left side: Input Card */}
                    <motion.div 
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="p-10 rounded-[2.5rem] premium-glass shadow-2xl relative overflow-hidden group"
                    >
                        <div className="space-y-8 relative z-10">
                            <div>
                                <label className="block text-xs font-black text-slate-500 uppercase tracking-widest mb-3">Target Topic</label>
                                <textarea 
                                    className="w-full bg-[#030303]/50 border border-white/10 rounded-2xl p-5 text-white focus:outline-none focus:border-[#00e5ff] transition-all text-lg font-medium"
                                    rows={3}
                                    value={topic}
                                    onChange={(e) => setTopic(e.target.value)}
                                    placeholder="What do you want to talk about?"
                                />
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-xs font-black text-slate-500 uppercase tracking-widest mb-3">Creator Persona</label>
                                    <select 
                                        className="w-full bg-[#030303]/50 border border-white/10 rounded-2xl p-4 text-white focus:outline-none focus:border-[#00e5ff]"
                                        value={tone}
                                        onChange={(e) => setTone(e.target.value)}
                                    >
                                        <option>Professional</option>
                                        <option>Thought-Provoking</option>
                                        <option>Bold & Direct</option>
                                        <option>Technical</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-xs font-black text-slate-500 uppercase tracking-widest mb-3">Content Framework</label>
                                    <select 
                                        className="w-full bg-[#030303]/50 border border-white/10 rounded-2xl p-4 text-white focus:outline-none focus:border-[#00e5ff]"
                                        value={postType}
                                        onChange={(e) => setPostType(e.target.value)}
                                    >
                                        <option>Educational</option>
                                        <option>Contrarian</option>
                                        <option>Story-driven</option>
                                        <option>Listicle</option>
                                    </select>
                                </div>
                            </div>

                            <button className="w-full py-5 bg-white text-[#030303] hover:bg-[#00e5ff] font-black text-lg rounded-2xl transition-all shadow-[0_10px_30px_rgba(255,255,255,0.1)] active:scale-[0.98]">
                                Analyze & Generate
                            </button>
                        </div>
                        <div className="absolute bottom-0 right-0 w-48 h-48 bg-[#00e5ff]/5 blur-[60px] -mr-24 -mb-24 rounded-full group-hover:bg-[#00e5ff]/10 transition-all duration-700" />
                    </motion.div>

                    {/* Right side: LinkedIn Mockup */}
                    <motion.div 
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        className="relative"
                    >
                        {/* Decorative background element */}
                        <div className="absolute -top-16 -right-16 w-80 h-80 bg-[#00e5ff]/10 blur-[100px] rounded-full -z-10 animate-pulse" />
                        
                        <div className="max-w-md mx-auto bg-white rounded-3xl shadow-[0_40px_100px_rgba(0,0,0,0.5)] overflow-hidden scale-105 border border-white/20">
                            <div className="p-6 border-b border-gray-100 flex items-center gap-4">
                                <div className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center font-bold text-slate-400">
                                    AI
                                </div>
                                <div>
                                    <div className="text-sm font-black text-gray-900 tracking-tight">Personal Voice Engine</div>
                                    <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Model: RESODIN-v4</div>
                                </div>
                                <div className="ml-auto text-gray-300">•••</div>
                            </div>
                            <div className="p-6 text-[13px] text-gray-700 whitespace-pre-wrap leading-relaxed font-sans font-medium">
                                {mockPost}
                            </div>
                            <div className="p-4 border-t border-gray-50 flex justify-between px-8 text-slate-400 text-[10px] font-black uppercase tracking-widest">
                                <div className="hover:text-[#00e5ff] cursor-pointer">Agree</div>
                                <div className="hover:text-[#00e5ff] cursor-pointer">Insight</div>
                                <div className="hover:text-[#00e5ff] cursor-pointer">Expand</div>
                                <div className="hover:text-[#00e5ff] cursor-pointer">Share</div>
                            </div>
                        </div>

                        {/* Floater Badge */}
                        <motion.div 
                            animate={{ y: [0, -12, 0] }}
                            transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
                            className="absolute -bottom-10 -left-6 md:-left-16 bg-black/80 backdrop-blur-xl p-6 rounded-[2rem] shadow-2xl border border-white/10 flex items-center gap-5"
                        >
                            <div className="w-12 h-12 rounded-2xl bg-[#00e5ff]/20 flex items-center justify-center text-2xl shadow-[0_0_20px_rgba(0,229,255,0.2)]">🔥</div>
                            <div>
                                <div className="text-[10px] font-black text-[#00e5ff] uppercase tracking-[0.2em] mb-1">Viral Score</div>
                                <div className="text-2xl font-black text-white leading-none">9.8<span className="text-sm text-slate-500">/10</span></div>
                            </div>
                        </motion.div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
