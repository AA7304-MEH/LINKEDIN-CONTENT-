"use client";

import { motion } from "framer-motion";

interface AuditWelcomeProps {
    onStart: () => void;
}

export default function AuditWelcome({ onStart }: AuditWelcomeProps) {
    return (
        <section
            className="flex flex-col items-center justify-center relative w-full overflow-hidden bg-[#030303] px-6 py-20 md:px-8 md:py-32 min-h-[70vh] md:min-h-[85vh]"
        >
            {/* Glossy Accents */}
            <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-[#00e5ff]/10 blur-[120px] rounded-full pointer-events-none" />
            <div className="absolute bottom-[-10%] right-[-10%] w-[30%] h-[30%] bg-[#0077b5]/10 blur-[100px] rounded-full pointer-events-none" />

            {/* Content Container */}
            <div className="relative z-10 max-w-5xl w-full text-center mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                >
                    {/* Futuristic Badge */}
                    <div className="inline-flex items-center gap-3 px-5 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-md mb-12 group hover:border-[#00e5ff]/30 transition-all duration-300">
                        <span className="relative flex h-2 w-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#00e5ff] opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-[#00e5ff]"></span>
                        </span>
                        <span className="text-[#00e5ff] text-xs font-bold tracking-[0.2em] uppercase">
                            AI Content Diagnostic v2.0
                        </span>
                    </div>

                    {/* Elite Headline */}
                    <h1 className="text-6xl md:text-8xl font-black text-white leading-[0.9] mb-10 tracking-tighter">
                        Decode Your <br/>
                        <span className="text-gradient accent-glow">Content DNA</span>
                    </h1>

                    {/* Precision Subheadline */}
                    <p className="text-slate-400 text-xl md:text-2xl max-w-2xl mx-auto mb-16 font-medium leading-relaxed">
                        Stop guessing your strategy. Our diagnostic engine reverse-engineers your unique inputs into an authority-building growth plan.
                    </p>

                    {/* Glassmorphic Action Area */}
                    <div className="flex flex-col items-center gap-10">
                        <motion.button
                            onClick={onStart}
                            whileHover={{ scale: 1.05, y: -4 }}
                            whileTap={{ scale: 0.98 }}
                            className="bg-white text-[#030303] text-xl font-black px-12 py-6 rounded-3xl shadow-[0_20px_50px_rgba(255,255,255,0.15)] hover:bg-[#00e5ff] transition-colors duration-300"
                        >
                            Begin Diagnostic Tool
                        </motion.button>

                        <div className="flex items-center gap-4 text-slate-500 font-semibold tracking-wide">
                            <div className="flex -space-x-3">
                                {[1, 2, 3, 4].map((i) => (
                                    <div key={i} className="w-10 h-10 rounded-full border-4 border-[#030303] bg-slate-800" />
                                ))}
                            </div>
                            <span>Join 2,000+ top-tier creators</span>
                        </div>
                    </div>

                    {/* Metrics Footer */}
                    <div className="mt-32 pt-16 border-t border-white/5 grid grid-cols-3 gap-8 max-w-3xl mx-auto">
                        {[
                            { value: '2m', label: 'Diagnostic' },
                            { value: '100', label: 'Archetypes' },
                            { value: '0$', label: 'Commitment' }
                        ].map((stat) => (
                            <div key={stat.label} className="flex flex-col items-center">
                                <div className="text-3xl font-black text-white mb-2">{stat.value}</div>
                                <div className="text-[10px] font-bold text-slate-600 uppercase tracking-widest">{stat.label}</div>
                            </div>
                        ))}
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
