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
        <section id="features" className="py-24 bg-[#0d0d12] relative overflow-hidden">
            {/* Ambient background glow */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[500px] bg-blue-900/10 blur-[120px] rounded-full -z-10" />
            
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-20">
                    <motion.h2 
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="text-4xl md:text-5xl font-bold text-white mb-6"
                    >
                        Everything you need to <span className="text-blue-500">dominate</span> LinkedIn
                    </motion.h2>
                    <motion.p 
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.1 }}
                        className="text-gray-400 text-xl max-w-2xl mx-auto"
                    >
                        Built for founders, creators, and business leaders who want to scale their personal brand without spending hours writing.
                    </motion.p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {features.map((feature, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            className="p-8 rounded-2xl bg-white/5 border border-white/10 hover:border-blue-500/50 transition-all duration-300 group"
                        >
                            <div className="mb-6 p-3 rounded-xl bg-white/5 w-fit group-hover:scale-110 transition-transform duration-300">
                                {feature.icon}
                            </div>
                            <h3 className="text-xl font-semibold text-white mb-4">{feature.title}</h3>
                            <p className="text-gray-400 leading-relaxed">
                                {feature.description}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
