"use client";

import { motion } from 'framer-motion';
import { Fingerprint, Zap, Edit3, Users } from 'lucide-react';

const features = [
    {
        title: "Personal Choice DNA",
        description: "AI learns your unique tone and professional style from 3-5 sample posts. No more generic sounding content.",
        icon: <Fingerprint className="w-8 h-8 text-blue-400" />,
    },
    {
        title: "1-Click Regenerate",
        description: "Not quite right? Get instant post variations with a single click until you find the perfect version.",
        icon: <Zap className="w-8 h-8 text-yellow-400" />,
    },
    {
        title: "Built-in Editor",
        description: "Fine-tune AI output manually. Our system learns from every edit you make to improve future generations.",
        icon: <Edit3 className="w-8 h-8 text-green-400" />,
    },
    {
        title: "Multi-Profile Support",
        description: "Seamlessly manage personal and company pages with distinct voices from a single dashboard.",
        icon: <Users className="w-8 h-8 text-purple-400" />,
    }
];

export default function FeaturesSection() {
    return (
        <section id="features" className="py-32 bg-[#030303] relative overflow-hidden">
            {/* Ambient background glow */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[600px] bg-[#00e5ff]/5 blur-[120px] rounded-full -z-10" />
            
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-24">
                    <motion.h2 
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="text-5xl md:text-6xl font-black text-white mb-6 tracking-tighter"
                    >
                        Master the art of <span className="text-[#00e5ff]">efficiency</span>
                    </motion.h2>
                    <motion.p 
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.1 }}
                        className="text-slate-400 text-xl max-w-2xl mx-auto font-medium"
                    >
                        Sophisticated tools for founders and creators who value their time as much as their influence.
                    </motion.p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-12 auto-rows-[250px] gap-6">
                    {/* Feature 1: Large Bento */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        className="md:col-span-8 md:row-span-2 p-10 rounded-[2.5rem] premium-glass relative group overflow-hidden"
                    >
                        <div className="relative z-10 flex flex-col h-full justify-between">
                            <div>
                                <div className="mb-6 p-4 rounded-2xl bg-[#00e5ff]/10 w-fit">
                                    <Fingerprint className="w-10 h-10 text-[#00e5ff]" />
                                </div>
                                <h3 className="text-3xl font-bold text-white mb-4">Personal Voice DNA</h3>
                                <p className="text-slate-400 text-lg leading-relaxed max-w-md">
                                    Our proprietary AI engine decodes your unique tone, professional slang, and sentence structure to generate content that sounds exactly like you.
                                </p>
                            </div>
                            <div className="mt-8 flex gap-3">
                                <span className="px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs font-semibold text-white">PROPRIETARY ENGINE</span>
                                <span className="px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs font-semibold text-white">98% ACCURACY</span>
                            </div>
                        </div>
                        <div className="absolute top-0 right-0 w-64 h-64 bg-[#00e5ff]/5 blur-[60px] -mr-32 -mt-32 rounded-full group-hover:bg-[#00e5ff]/10 transition-all duration-500" />
                    </motion.div>

                    {/* Feature 2: Small Bento (Top Right) */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="md:col-span-4 md:row-span-1 p-8 rounded-[2.5rem] premium-glass group flex flex-col justify-center"
                    >
                        <div className="mb-4 p-3 rounded-xl bg-yellow-500/10 w-fit">
                            <Zap className="w-6 h-6 text-yellow-500" />
                        </div>
                        <h3 className="text-xl font-bold text-white mb-2">Instant Variations</h3>
                        <p className="text-slate-400 text-sm leading-relaxed">
                            Generate infinite variations of every post with a single click.
                        </p>
                    </motion.div>

                    {/* Feature 3: Small Bento (Middle Right) */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                        className="md:col-span-4 md:row-span-1 p-8 rounded-[2.5rem] premium-glass group flex flex-col justify-center"
                    >
                        <div className="mb-4 p-3 rounded-xl bg-[#00ff9d]/10 w-fit">
                            <Edit3 className="w-6 h-6 text-[#00ff9d]" />
                        </div>
                        <h3 className="text-xl font-bold text-white mb-2">Smart Learning Editor</h3>
                        <p className="text-slate-400 text-sm leading-relaxed">
                            The system learns from every edit you make, improving your Voice DNA over time.
                        </p>
                    </motion.div>

                    {/* Feature 4: Wide Bento (Bottom Full) */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.3 }}
                        className="md:col-span-12 md:row-span-1 p-8 rounded-[2.5rem] premium-glass flex flex-col md:flex-row items-center justify-between group overflow-hidden"
                    >
                        <div className="flex items-center gap-6">
                            <div className="p-4 rounded-2xl bg-purple-500/10 w-fit">
                                <Users className="w-8 h-8 text-purple-500" />
                            </div>
                            <div>
                                <h3 className="text-2xl font-bold text-white mb-1">Multi-Profile Authority</h3>
                                <p className="text-slate-400 text-sm leading-relaxed">
                                    Manage multiple personal and corporate accounts with separate identity profiles.
                                </p>
                            </div>
                        </div>
                        <div className="mt-4 md:mt-0 flex -space-x-3">
                            {[1, 2, 3, 4, 5].map(i => (
                                <div key={i} className="w-10 h-10 rounded-full border-2 border-[#0d0d12] bg-[#1a1a20] flex items-center justify-center text-[10px] font-bold text-slate-500">U{i}</div>
                            ))}
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
