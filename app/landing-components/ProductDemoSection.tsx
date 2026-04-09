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
        <section className="py-24 bg-[#0d0d12]">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <h2 className="text-4xl font-bold text-white mb-4">See Resodin in action</h2>
                    <p className="text-gray-400">Generate high-authority posts that sound exactly like you, in seconds.</p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                    {/* Left side: Input Card */}
                    <motion.div 
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="p-8 rounded-3xl bg-[#1a1a24] border border-white/10 shadow-2xl"
                    >
                        <div className="space-y-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-400 mb-2">Topic or Hook</label>
                                <textarea 
                                    className="w-full bg-[#0d0d12] border border-white/10 rounded-xl p-4 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                                    rows={3}
                                    value={topic}
                                    onChange={(e) => setTopic(e.target.value)}
                                    placeholder="Enter your topic..."
                                />
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-400 mb-2">Tone</label>
                                    <select 
                                        className="w-full bg-[#0d0d12] border border-white/10 rounded-xl p-3 text-white focus:outline-none"
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
                                    <label className="block text-sm font-medium text-gray-400 mb-2">Type</label>
                                    <select 
                                        className="w-full bg-[#0d0d12] border border-white/10 rounded-xl p-3 text-white focus:outline-none"
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

                            <button className="w-full py-4 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-xl transition-all shadow-[0_0_20px_rgba(37,99,235,0.3)]">
                                Generate 10 Variations →
                            </button>
                        </div>
                    </motion.div>

                    {/* Right side: LinkedIn Mockup */}
                    <motion.div 
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="relative"
                    >
                        {/* Decorative background element */}
                        <div className="absolute -top-10 -right-10 w-64 h-64 bg-blue-600/20 blur-[80px] rounded-full -z-10" />
                        
                        <div className="max-w-md mx-auto bg-white rounded-lg shadow-2xl overflow-hidden">
                            <div className="p-4 border-b border-gray-100 flex items-center gap-3">
                                <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center font-bold text-blue-600">
                                    YOU
                                </div>
                                <div>
                                    <div className="text-sm font-bold text-gray-900">Your Name (AI Generated)</div>
                                    <div className="text-xs text-gray-500">Expert in {topic.split(' ')[0]} • 1m</div>
                                </div>
                                <div className="ml-auto text-gray-400">•••</div>
                            </div>
                            <div className="p-4 text-sm text-gray-800 whitespace-pre-wrap leading-relaxed font-sans">
                                {mockPost}
                            </div>
                            <div className="p-3 border-t border-gray-50 flex justify-between px-6 text-gray-500 text-sm">
                                <div className="flex items-center gap-1 hover:text-blue-600 cursor-pointer">👍 Like</div>
                                <div className="flex items-center gap-1 hover:text-blue-600 cursor-pointer">💬 Comment</div>
                                <div className="flex items-center gap-1 hover:text-blue-600 cursor-pointer">🔄 Repost</div>
                                <div className="flex items-center gap-1 hover:text-blue-600 cursor-pointer">📤 Send</div>
                            </div>
                        </div>

                        {/* Floater Badge */}
                        <motion.div 
                            animate={{ y: [0, -10, 0] }}
                            transition={{ repeat: Infinity, duration: 3 }}
                            className="absolute -bottom-6 -left-6 md:-left-12 bg-white p-4 rounded-2xl shadow-xl border border-blue-50 flex items-center gap-3"
                        >
                            <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center text-xl">🚀</div>
                            <div>
                                <div className="text-xs font-bold text-gray-900">Viral Potential</div>
                                <div className="text-lg font-black text-blue-600">9.4/10</div>
                            </div>
                        </motion.div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
