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
                    <h2 className="text-4xl md:text-6xl font-black text-white mb-6 tracking-tighter">Velocity of <span className="text-[#00e5ff]">influence</span></h2>
                    <p className="text-slate-400 text-xl font-medium max-w-2xl mx-auto tracking-tight">Join 2,000+ top-tier professionals scaling their presence with precision.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {testimonials.map((t, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: index * 0.1 }}
                            className="p-10 rounded-[2.5rem] premium-glass group flex flex-col h-full"
                        >
                            <div className="flex items-center gap-5 mb-8">
                                <div className={`w-14 h-14 rounded-2xl ${t.color} flex items-center justify-center text-white font-black text-xl shadow-2xl transition-all duration-300 group-hover:scale-110`}>
                                    {t.initials}
                                </div>
                                <div className="text-left">
                                    <h3 className="text-white font-bold text-lg leading-tight">{t.name}</h3>
                                    <p className="text-slate-500 text-[10px] font-black uppercase tracking-widest mt-1">{t.title}</p>
                                </div>
                            </div>
                            <p className="text-slate-300 font-medium italic mb-10 leading-relaxed text-lg opacity-90 flex-grow">
                                "{t.quote}"
                            </p>
                            <div className="pt-8 border-t border-white/5 flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <div className="w-2.5 h-2.5 rounded-full bg-[#00e5ff] shadow-[0_0_10px_rgba(0,229,255,0.8)]"></div>
                                    <span className="text-white font-black text-[10px] uppercase tracking-widest">Verified Growth</span>
                                </div>
                                <div className="text-[#00e5ff] font-black text-xs tracking-tighter">
                                    {t.metric}
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
