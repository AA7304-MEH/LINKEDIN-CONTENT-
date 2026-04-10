"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import styles from "./ResodinAudit.module.css";
import Link from 'next/link';

interface AuditResultsProps {
    answers: Record<string, any>;
}

export default function AuditResults({ answers }: AuditResultsProps) {
    const [loading, setLoading] = useState(false);

    // Derived archetype logic (mocked for demo)
    const score = answers['rating'] || 3;
    const archetype = score > 3 ? "The Authority Builder" : "The Growth Seeker";
    const hookScore = Math.floor(Math.random() * (95 - 78) + 78);

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="w-full max-w-5xl mx-auto space-y-12"
        >
            <div className="text-center space-y-6 mb-16">
                <div className="inline-flex items-center gap-3 px-5 py-2 rounded-full bg-[#00e5ff]/5 border border-[#00e5ff]/20 backdrop-blur-md">
                    <span className="relative flex h-2 w-2">
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-[#00e5ff]"></span>
                    </span>
                    <span className="text-[#00e5ff] text-[10px] font-black tracking-[0.2em] uppercase">
                        Diagnostic Result Attached
                    </span>
                </div>
                <h1 className="text-5xl md:text-7xl font-black text-white leading-tight tracking-tighter">
                    Your Content DNA: <br/>
                    <span className="text-gradient accent-glow">{archetype}</span>
                </h1>
                <p className="text-slate-400 text-xl font-medium max-w-2xl mx-auto leading-relaxed">
                    We've indexed your goals against 10M+ patterns. You possess high authority potential with critical engagement gaps.
                </p>
            </div>

            {/* Dashboard Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 px-4">
                {/* Score Card */}
                <div className="premium-glass p-12 rounded-[3rem] flex flex-col justify-between relative overflow-hidden group">
                    <div className="absolute -top-10 -right-10 w-40 h-40 bg-[#00e5ff]/5 blur-[60px] rounded-full group-hover:bg-[#00e5ff]/10 transition-all duration-700" />
                    <div>
                        <h3 className="text-slate-500 font-black text-[10px] uppercase tracking-[0.3em] mb-10">
                            Creator Potential Index
                        </h3>
                        <div className="flex items-baseline gap-4">
                            <span className="text-9xl font-black text-white tracking-tighter">{hookScore}</span>
                            <span className="text-3xl text-slate-600 font-black">/ 100</span>
                        </div>
                    </div>
                    <div className="mt-12">
                        <div className="w-full h-1 bg-white/5 rounded-full overflow-hidden mb-8">
                            <motion.div
                                initial={{ width: 0 }}
                                animate={{ width: `${hookScore}%` }}
                                transition={{ duration: 2, ease: "easeOut" }}
                                className="h-full bg-[#00e5ff] shadow-[0_0_30px_rgba(0,229,255,0.6)]"
                            />
                        </div>
                        <button 
                            onClick={() => {
                                const text = `I just got a Content DNA score of ${hookScore}/100 on Resodin! 🚀 Check your LinkedIn potential here: ${window.location.origin}/audit`;
                                window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(window.location.origin)}&text=${encodeURIComponent(text)}`, '_blank');
                            }}
                            className="w-full py-4 rounded-2xl bg-white/5 border border-white/10 text-white font-bold text-sm hover:bg-white/10 transition-all"
                        >
                            Broadcast My Score
                        </button>
                    </div>
                </div>

                {/* Recommendations Card */}
                <div className="premium-glass p-12 rounded-[3rem] relative overflow-hidden">
                    <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-[#00e5ff]/5 blur-[60px] rounded-full" />
                    <h3 className="text-slate-500 font-black text-[10px] uppercase tracking-[0.3em] mb-10 pb-4 border-b border-white/5">
                        Strategic Interventions
                    </h3>

                    <ul className="space-y-8">
                        {[
                            "Engage Curiosity Gaps in your Hook logic",
                            "Isolate your unique 'Voice DNA' patterns",
                            "Deploy the 'Authority-First' educational frame"
                        ].map((item, i) => (
                            <li key={i} className="flex items-start gap-4">
                                <div className="mt-1.5 w-2 h-2 rounded-full bg-[#00e5ff] shadow-[0_0_15px_rgba(0,229,255,0.8)]"></div>
                                <span className="text-white text-lg font-bold leading-tight">{item}</span>
                            </li>
                        ))}
                    </ul>

                    <div className="mt-16 pt-8 border-t border-white/5">
                        <div className="flex items-center gap-4 text-slate-400 font-bold">
                            <span className="text-[#00e5ff] text-xl font-black">AI Unlocked</span>
                            <span className="text-[10px] uppercase tracking-widest opacity-50">Precision Insights Ready</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Bottom Action Area */}
            <div className="max-w-2xl mx-auto mt-20 text-center px-4 space-y-10">
                <Link href="/sign-up" className="block transform hover:scale-[1.02] transition-transform">
                    <button className="w-full py-6 md:py-8 bg-white text-[#030303] text-2xl md:text-3xl font-black rounded-3xl shadow-[0_40px_100px_rgba(255,255,255,0.1)] hover:bg-[#00e5ff] transition-colors">
                        Deploy My Full Strategy
                    </button>
                </Link>

                <div className="flex flex-wrap justify-center gap-10 text-[10px] font-black text-slate-600 uppercase tracking-[0.2em]">
                    <span>🔒 7-Day Precision Trial</span>
                    <span>💳 High-Volume API Access</span>
                    <span>🛡️ Full Authority Sync</span>
                </div>
            </div>
        </motion.div>
    );
}
