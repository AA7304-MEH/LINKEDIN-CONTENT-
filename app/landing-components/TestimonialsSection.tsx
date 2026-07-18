"use client";

import { motion } from 'framer-motion';

const useCases = [
    {
        title: "For Founders",
        icon: "🚀",
        description: "Generate thought leadership posts that build authority and attract investors, partners, and talent.",
        benefit: "Position yourself as the expert in your space",
        color: "from-blue-500/10 to-cyan-500/10",
        borderColor: "border-blue-500/20",
        iconBg: "bg-blue-500",
    },
    {
        title: "For Creators",
        icon: "✨",
        description: "Grow your audience with consistent, on-brand content that sounds like you wrote it on your best day.",
        benefit: "Never stare at a blank screen again",
        color: "from-purple-500/10 to-pink-500/10",
        borderColor: "border-purple-500/20",
        iconBg: "bg-purple-500",
    },
    {
        title: "For Agencies",
        icon: "🏢",
        description: "Manage multiple client voices from one dashboard. Each profile sounds completely distinct.",
        benefit: "Scale your content operation without scaling headcount",
        color: "from-emerald-500/10 to-teal-500/10",
        borderColor: "border-emerald-500/20",
        iconBg: "bg-emerald-500",
    }
];

export default function TestimonialsSection() {
    return (
        <section className="py-32 bg-[#030303] border-y border-white/5 relative overflow-hidden">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-24">
                    <p className="text-[#00e5ff] text-[10px] font-black tracking-widest uppercase mb-4">Who It&apos;s Built For</p>
                    <h2 className="text-4xl md:text-6xl font-black text-white mb-6 tracking-tighter">
                        What we&apos;re building <span className="text-[#00e5ff]">for you</span>
                    </h2>
                    <p className="text-slate-400 text-xl font-medium max-w-2xl mx-auto tracking-tight">
                        Resodin is designed for professionals who know that LinkedIn presence matters — and want AI that sounds like them, not like a bot.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {useCases.map((item, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: index * 0.1 }}
                            className={`p-10 rounded-[2.5rem] bg-gradient-to-br ${item.color} border ${item.borderColor} group flex flex-col h-full hover:border-[#00e5ff]/30 transition-all duration-300`}
                        >
                            <div className="flex items-center gap-5 mb-8">
                                <div className={`w-14 h-14 rounded-2xl ${item.iconBg} flex items-center justify-center text-2xl shadow-2xl transition-all duration-300 group-hover:scale-110`}>
                                    {item.icon}
                                </div>
                                <div className="text-left">
                                    <h3 className="text-white font-bold text-xl leading-tight">{item.title}</h3>
                                </div>
                            </div>
                            <p className="text-slate-300 font-medium mb-8 leading-relaxed text-lg flex-grow">
                                {item.description}
                            </p>
                            <div className="pt-8 border-t border-white/5">
                                <div className="flex items-center gap-3">
                                    <div className="w-2.5 h-2.5 rounded-full bg-[#00e5ff] shadow-[0_0_10px_rgba(0,229,255,0.8)]"></div>
                                    <span className="text-[#00e5ff] font-semibold text-sm">{item.benefit}</span>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
