"use client";

import { motion } from 'framer-motion';

const testimonials = [
    {
        name: "Sarah Jenkins",
        title: "Founder, GrowthScale",
        quote: "Resodin changed my LinkedIn game. I used to spend 2 hours a week ideating; now it takes 5 minutes to generate a week's worth of high-authority content.",
        metric: "↑ 42K impressions on first AI post",
        initials: "SJ",
        color: "bg-blue-500",
    },
    {
        name: "Marcus Chen",
        title: "SaaS Consultant",
        quote: "The Personal DNA feature is spooky accurate. It captured my exact tone—slightly technical but approachable. My engagement rate has doubled since I started using it.",
        metric: "↑ 12% Engagement Rate",
        initials: "MC",
        color: "bg-purple-500",
    },
    {
        name: "Elena Rodriguez",
        title: "Creative Director",
        quote: "I was skeptical about AI writing, but Resodin is different. The posts don't feel like a bot wrote them. The multi-profile support is a lifesaver for my agency.",
        metric: "50+ Leads in 30 days",
        initials: "ER",
        color: "bg-indigo-500",
    }
];

export default function TestimonialsSection() {
    return (
        <section className="py-32 bg-[#030303] border-y border-white/5 relative overflow-hidden">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-24">
                    <h2 className="text-4xl md:text-5xl font-black text-white mb-6 tracking-tighter">Velocity of <span className="text-gradient">influence</span></h2>
                    <p className="text-slate-400 text-xl font-medium max-w-2xl mx-auto tracking-tight">Join 2,000+ top-tier professionals scaling their presence with precision.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {testimonials.map((t, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, scale: 0.95 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            className="p-10 rounded-[2rem] premium-glass relative group"
                        >
                            <div className="flex items-center gap-5 mb-8">
                                <div className={`w-14 h-14 rounded-2xl ${t.color} flex items-center justify-center text-white font-black text-xl shadow-2xl rotate-3 group-hover:rotate-0 transition-transform duration-300`}>
                                    {t.initials}
                                </div>
                                <div className="text-left">
                                    <h3 className="text-white font-bold text-lg leading-tight">{t.name}</h3>
                                    <p className="text-slate-500 text-xs font-black uppercase tracking-widest">{t.title}</p>
                                </div>
                            </div>
                            <p className="text-slate-300 font-medium italic mb-8 leading-relaxed text-sm opacity-90">
                                "{t.quote}"
                            </p>
                            <div className="pt-6 border-t border-white/5 flex items-center justify-between">
                                <div className="flex items-center gap-3 text-[#00e5ff] font-black text-xs tracking-widest uppercase">
                                    <span className="w-2 h-2 rounded-full bg-[#00e5ff] animate-pulse"></span>
                                    Verified Result
                                </div>
                                <div className="text-white font-black text-xs">
                                    {t.metric.split(' ')[1]} {t.metric.split(' ')[2]}
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
