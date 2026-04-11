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

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {/* Bento Row 1 */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        className="md:col-span-2 p-12 rounded-[3rem] premium-glass relative group min-h-[400px] flex flex-col justify-between"
                    >
                        <div className="relative z-10">
                            <div className="mb-8 p-4 rounded-2xl bg-[#00e5ff]/10 w-fit">
                                <Fingerprint className="w-12 h-12 text-[#00e5ff]" />
                            </div>
                            <h3 className="text-4xl font-black text-white mb-6 tracking-tight">Personal Voice DNA</h3>
                            <p className="text-slate-400 text-xl leading-relaxed max-w-xl">
                                Our proprietary AI engine decodes your unique tone, professional vocabulary, and sentence structure to generate content that is indistinguishable from your own writing.
                            </p>
                        </div>
                        <div className="flex gap-4 mt-10">
                            <div className="px-6 py-2 rounded-full bg-white/5 border border-white/10 text-xs font-black text-[#00e5ff] uppercase tracking-widest">98.4% Accuracy</div>
                            <div className="px-6 py-2 rounded-full bg-white/5 border border-white/10 text-xs font-black text-slate-500 uppercase tracking-widest">Neural Learning</div>
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="p-10 rounded-[3rem] premium-glass flex flex-col justify-center"
                    >
                        <div className="mb-6 p-4 rounded-2xl bg-yellow-500/10 w-fit">
                            <Zap className="w-8 h-8 text-yellow-500" />
                        </div>
                        <h3 className="text-2xl font-black text-white mb-4">Instant Velocity</h3>
                        <p className="text-slate-400 text-lg leading-relaxed">
                            Generate infinite variations of every post with a single click. Never stare at a blank screen again.
                        </p>
                    </motion.div>

                    {/* Bento Row 2 */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                        className="p-10 rounded-[3rem] premium-glass flex flex-col justify-center"
                    >
                        <div className="mb-6 p-4 rounded-2xl bg-[#00ff9d]/10 w-fit">
                            <Edit3 className="w-8 h-8 text-[#00ff9d]" />
                        </div>
                        <h3 className="text-2xl font-black text-white mb-4">Smart Editor</h3>
                        <p className="text-slate-400 text-lg leading-relaxed">
                            The system learns from every edit you make, continuously refining your identity profile.
                        </p>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.3 }}
                        className="md:col-span-2 p-12 rounded-[3rem] premium-glass flex flex-col md:flex-row items-center justify-between"
                    >
                        <div className="max-w-md">
                            <div className="mb-8 p-4 rounded-2xl bg-purple-500/10 w-fit">
                                <Users className="w-12 h-12 text-purple-500" />
                            </div>
                            <h3 className="text-3xl font-black text-white mb-4">Multi-Profile Sync</h3>
                            <p className="text-slate-400 text-lg">
                                Manage personal and corporate identities with separate training data and distinct professional voices.
                            </p>
                        </div>
                        <div className="flex -space-x-4 mt-8 md:mt-0">
                            {[1, 2, 3, 4].map(i => (
                                <div key={i} className="w-16 h-16 rounded-full border-4 border-[#030303] bg-slate-800 flex items-center justify-center text-xs font-black text-slate-600">P{i}</div>
                            ))}
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
