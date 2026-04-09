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
        <section className="py-24 bg-[#0d0d12] border-y border-white/5">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Trusted by the next generation of leaders</h2>
                    <p className="text-gray-400">Join 2,000+ professionals building their authority with Resodin.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {testimonials.map((t, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            className="p-8 rounded-2xl bg-[#13131a] border border-white/5 hover:bg-[#161620] transition-colors"
                        >
                            <div className="flex items-center gap-4 mb-6">
                                <div className={`w-12 h-12 rounded-full ${t.color} flex items-center justify-center text-white font-bold text-lg shadow-lg`}>
                                    {t.initials}
                                </div>
                                <div>
                                    <h3 className="text-white font-semibold">{t.name}</h3>
                                    <p className="text-gray-500 text-sm">{t.title}</p>
                                </div>
                            </div>
                            <p className="text-gray-300 italic mb-6 leading-relaxed">
                                "{t.quote}"
                            </p>
                            <div className="pt-6 border-t border-white/5 text-blue-400 font-medium flex items-center gap-2">
                                <span className="text-lg">📈</span> {t.metric}
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
