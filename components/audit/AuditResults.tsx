"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import styles from "./ResonateAudit.module.css";
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
            <div className="text-center space-y-4 mb-8">
                <span className="inline-block py-1 px-3 rounded-full bg-[#00aaff]/10 text-[#00aaff] text-xs font-bold tracking-widest uppercase border border-[#00aaff]/20">
                    Audit Complete
                </span>
                <h1 className={`${styles.headingXl} mb-2`}>
                    Your Content DNA: <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-400">{archetype}</span>
                </h1>
                <p className={`${styles.textBody} max-w-2xl mx-auto`}>
                    We've indexed your goals against 10M+ viral posts. The data suggests you have high authority potential but are missing key engagement drivers.
                </p>
            </div>

            {/* Dashboard Cards */}
            {/* Dashboard Cards (Minimalist Professional) */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                {/* Score Card - Typographic Focus */}
                <div className={`${styles.proCard} flex flex-col justify-between relative overflow-hidden group min-h-[300px]`}>
                    <div className="absolute top-0 right-0 p-6 opacity-20 group-hover:opacity-40 transition-opacity">
                        <span className="text-8xl">📈</span>
                    </div>
                    <div>
                        <h3 className="text-gray-500 font-bold text-sm w-full uppercase tracking-widest border-b border-[#2a2a30] pb-4 mb-6">
                            Viral Potential Index
                        </h3>
                        <div className="flex items-baseline gap-2">
                            <span className="text-9xl font-black text-white tracking-tighter">{hookScore}</span>
                            <span className="text-2xl text-gray-500 font-medium">/ 100</span>
                        </div>
                    </div>
                    <div className="mt-auto pt-8">
                        <div className="w-full h-3 bg-[#1a1a20] rounded-full overflow-hidden">
                            <motion.div
                                initial={{ width: 0 }}
                                animate={{ width: `${hookScore}%` }}
                                transition={{ duration: 1.5, ease: "easeOut" }}
                                className="h-full bg-[#00aaff] shadow-[0_0_20px_#00aaff]"
                            />
                        </div>
                        <p className="mt-4 text-sm text-[#00aaff] font-bold flex items-center gap-2 bg-[#00aaff]/10 py-2 px-3 rounded inline-block">
                            <span className="w-2 h-2 rounded-full bg-[#00aaff] animate-pulse"></span>
                            Top 15% of Creators
                        </p>
                    </div>
                </div>

                {/* Plan Unlock Card - List Focus */}
                <div className={`${styles.proCard} relative flex flex-col justify-between border-l-4 border-l-[#00aaff] bg-[#1d1d24] min-h-[300px]`}>
                    <div className="space-y-8 relative z-10 w-full">
                        <h3 className="text-gray-500 font-bold text-sm uppercase tracking-widest border-b border-[#2a2a30] pb-4 mb-4">
                            Strategic Gaps Identified
                        </h3>

                        <ul className="space-y-5">
                            {[
                                "Missing Hook Structure",
                                "Inconsistent Posting Frequency",
                                "Low Audience Engagement"
                            ].map((item, i) => (
                                <li key={i} className="flex items-center gap-4">
                                    <div className="w-2 h-2 rounded-full bg-red-500 shadow-[0_0_10px_rgba(239,68,68,0.5)]"></div>
                                    <span className="text-gray-200 text-xl font-medium">{item}</span>
                                </li>
                            ))}
                        </ul>

                        <div className="pt-6 border-t border-[#2a2a30] mt-auto">
                            <div className="flex items-center gap-3 text-white font-bold text-lg">
                                <span className="text-[#00aaff] bg-[#00aaff]/10 w-8 h-8 flex items-center justify-center rounded-full">✓</span>
                                <span>Solution: {archetype} Action Plan</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="max-w-xl mx-auto mt-16 relative z-10 space-y-6 text-center">
                <Link href="/pricing" className="block w-full">
                    <button className={`${styles.btnPrimary} w-full py-6 text-2xl shadow-[0_10px_50px_rgba(0,170,255,0.2)] uppercase tracking-wide hover:scale-[1.02] active:scale-[0.98] font-black border-2 border-[#00aaff]/20`}>
                        Unlock Full Strategy & Trial
                    </button>
                </Link>
                <div className="flex flex-wrap justify-center gap-x-8 gap-y-2 text-sm text-gray-400 font-medium">
                    <span className="flex items-center gap-2">🔒 14-Day Free Trial</span>
                    <span className="flex items-center gap-2">💳 Cancel Anytime</span>
                    <span className="flex items-center gap-2">🛡️ Money Back Guarantee</span>
                </div>
            </div>
        </motion.div>
    );
}
