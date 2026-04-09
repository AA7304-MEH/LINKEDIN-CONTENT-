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
                <div className={`${styles.proCard} flex flex-col justify-between relative overflow-hidden group min-h-[250px] md:min-h-[300px]`}>
                    <div className="absolute top-0 right-0 p-4 md:p-6 opacity-20 group-hover:opacity-40 transition-opacity">
                        <span className="text-6xl md:text-8xl">📈</span>
                    </div>
                    <div>
                        <h3 className="text-gray-500 font-bold text-xs md:text-sm w-full uppercase tracking-widest border-b border-[#2a2a30] pb-3 md:pb-4 mb-4 md:mb-6">
                            Content DNA Score
                        </h3>
                        <div className="flex items-baseline gap-2">
                            <span className="text-6xl md:text-9xl font-black text-white tracking-tighter">{hookScore}</span>
                            <span className="text-lg md:text-2xl text-gray-500 font-medium">/ 100</span>
                        </div>
                    </div>
                    <div className="mt-auto pt-6 md:pt-8 flex justify-between items-end">
                        <div className="flex-1 mr-4">
                            <div className="w-full h-2 md:h-3 bg-[#1a1a20] rounded-full overflow-hidden">
                                <motion.div
                                    initial={{ width: 0 }}
                                    animate={{ width: `${hookScore}%` }}
                                    transition={{ duration: 1.5, ease: "easeOut" }}
                                    className="h-full bg-[#00aaff] shadow-[0_0_20px_#00aaff]"
                                />
                            </div>
                        </div>
                        <button 
                            onClick={() => {
                                const text = `I just got a Content DNA score of ${hookScore}/100 on Resodin! 🚀 Check your LinkedIn potential here: ${window.location.origin}/audit`;
                                window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(window.location.origin)}&text=${encodeURIComponent(text)}`, '_blank');
                            }}
                            className="bg-[#0077b5] text-white px-4 py-2 rounded-lg text-sm font-bold hover:bg-[#00669c] transition-colors"
                        >
                            Share Score
                        </button>
                    </div>
                </div>

                {/* Plan Unlock Card - List Focus */}
                <div className={`${styles.proCard} relative flex flex-col justify-between border-l-4 border-l-[#00aaff] bg-[#1d1d24] min-h-[300px]`}>
                    <div className="space-y-8 relative z-10 w-full">
                        <h3 className="text-gray-500 font-bold text-sm uppercase tracking-widest border-b border-[#2a2a30] pb-4 mb-4">
                            3 Personalized Recommendations
                        </h3>

                        <ul className="space-y-5">
                            {[
                                "Improve Hook engagement by using 'curiosity gaps'",
                                "Leverage your unique 'Voice DNA' to stand out",
                                "Post 3x weekly using educational listicle formats"
                            ].map((item, i) => (
                                <li key={i} className="flex items-center gap-4">
                                    <div className="w-2 h-2 rounded-full bg-blue-500 shadow-[0_0_10px_rgba(0,170,255,0.5)]"></div>
                                    <span className="text-gray-200 text-lg font-medium">{item}</span>
                                </li>
                            ))}
                        </ul>

                        <div className="pt-6 border-t border-[#2a2a30] mt-auto">
                            <div className="flex items-center gap-3 text-white font-bold text-lg">
                                <span className="text-[#00aaff] bg-[#00aaff]/10 w-8 h-8 flex items-center justify-center rounded-full">✓</span>
                                <span>Join Resodin Pro to implement these today.</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="max-w-xl mx-auto mt-12 md:mt-16 relative z-10 space-y-6 text-center px-4">
                <Link href="/sign-up" className="block w-full">
                    <button className={`${styles.btnPrimary} w-full py-5 md:py-6 text-xl md:text-2xl shadow-[0_10px_50px_rgba(0,170,255,0.2)] uppercase tracking-wide hover:scale-[1.02] active:scale-[0.98] font-black border-2 border-[#00aaff]/20`}>
                        Get Started for Free
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
