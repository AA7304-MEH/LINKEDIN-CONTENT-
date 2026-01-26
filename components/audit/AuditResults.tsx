"use client";

import { motion } from "framer-motion";
import { useState } from "react";

interface AuditResultsProps {
    answers: Record<string, any>;
}

export default function AuditResults({ answers }: AuditResultsProps) {
    const [email, setEmail] = useState("");
    const [name, setName] = useState("");
    const [submitted, setSubmitted] = useState(false);
    const [loading, setLoading] = useState(false);

    // Simple heuristic generator for "Insights"
    const getInsights = () => {
        const goal = answers["goal"] || "Growth";
        const frustration = answers["frustration"] || "Time";

        let archetype = "The Strategist";
        let advice = "Your content is strategic, but you need more consistency.";

        if (goal.includes("Lead") || goal.includes("Sales")) {
            archetype = "The Conversion Architect";
            advice = "You're selling well, but you might be missing top-of-funnel awareness.";
        } else if (goal.includes("Brand")) {
            archetype = "The Thought Leader";
            advice = "Authority takes time. Focus on storytelling over simple tips.";
        }

        if (frustration.includes("Time")) {
            advice += " AI can help you scale volume without sacrificing quality.";
        } else if (frustration.includes("robotic")) {
            advice += " Injecting your 'Personal Content DNA' is crucial to stand out.";
        }

        return { archetype, advice };
    };

    const { archetype, advice } = getInsights();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        // Simulate API call or use Formspree
        // Replace this with real fetch to Formspree
        try {
            const formSpreeId = "mwejdqoj"; // Placeholder DO NOT USE IN PROD WITHOUT REPLACING
            const response = await fetch(`https://formspree.io/f/${formSpreeId}`, {
                method: 'POST',
                body: JSON.stringify({ name, email, answers }),
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            });

            // For demo purposes, we'll assume success even if the ID is invalid
            // to show the UI state
            setTimeout(() => {
                setSubmitted(true);
                setLoading(false);
            }, 1500);

        } catch (err) {
            setSubmitted(true); // Fallback for demo
            setLoading(false);
        }
    };

    if (submitted) {
        return (
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center p-12 bg-slate-900/50 border border-slate-700/50 backdrop-blur-xl rounded-3xl max-w-xl mx-auto dark:shadow-emerald-900/20 shadow-2xl"
            >
                <div className="w-20 h-20 bg-emerald-500/20 text-emerald-400 rounded-full flex items-center justify-center mx-auto mb-6">
                    <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" /><polyline points="22 4 12 14.01 9 11.01" /></svg>
                </div>
                <h2 className="text-3xl font-bold text-white mb-4">Report Sent!</h2>
                <p className="text-slate-300 text-lg mb-8">
                    Check your inbox for your full 5-page Content DNA Report. It includes tailored content prompts based on your answers.
                </p>
                <button onClick={() => window.location.reload()} className="text-slate-500 hover:text-white transition-colors">
                    Start A New Audit
                </button>
            </motion.div>
        );
    }

    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-4xl mx-auto space-y-6"
        >
            {/* Header Summary */}
            <div className="p-8 md:p-10 rounded-3xl bg-slate-900/60 border border-slate-800 backdrop-blur-xl shadow-2xl overflow-hidden relative">
                <div className="absolute top-0 right-0 p-32 bg-indigo-500/10 rounded-full blur-[80px] pointer-events-none" />

                <div className="relative z-10">
                    <div className="uppercase tracking-widest text-sm font-bold text-indigo-400 mb-2">Audit Complete</div>
                    <h2 className="text-4xl font-bold text-white mb-6">
                        Your Content Archetype:
                        <span className="block mt-2 text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400">
                            {archetype}
                        </span>
                    </h2>
                    <div className="bg-slate-800/50 p-6 rounded-2xl border border-slate-700/50">
                        <h3 className="text-slate-200 font-semibold mb-2 flex items-center gap-2">
                            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-yellow-400"><circle cx="12" cy="12" r="10" /><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" /><path d="M12 17h.01" /></svg>
                            Quick Insight
                        </h3>
                        <p className="text-slate-300 leading-relaxed text-lg">
                            {advice}
                        </p>
                    </div>
                </div>
            </div>

            {/* Locked Section */}
            <div className="relative p-1 rounded-3xl bg-gradient-to-b from-slate-700/50 to-slate-800/10">
                <div className="bg-slate-950/80 rounded-[22px] p-8 md:p-12 text-center relative overflow-hidden backdrop-blur-sm">

                    {/* Lock Icon/Overlay */}
                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-indigo-500 to-transparent opacity-50"></div>

                    <div className="max-w-md mx-auto space-y-8 relative z-10">
                        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-slate-800 border border-slate-700 shadow-xl mb-4 text-indigo-400">
                            <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2" /><path d="M7 11V7a5 5 0 0 1 10 0v4" /></svg>
                        </div>

                        <div className="space-y-3">
                            <h3 className="text-2xl font-bold text-white">Unlock Your Full Report</h3>
                            <p className="text-slate-400">
                                Get a detailed 5-page breakdown with actionable steps to improve your {answers["goal"] ? answers["goal"].split(" ")[0] : "content"}.
                            </p>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div className="text-left space-y-1">
                                <label className="text-xs font-semibold text-slate-500 ml-1 uppercase">Full Name</label>
                                <input
                                    required
                                    type="text"
                                    placeholder="Your Name"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-3 text-white focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-colors"
                                />
                            </div>
                            <div className="text-left space-y-1">
                                <label className="text-xs font-semibold text-slate-500 ml-1 uppercase">Work Email</label>
                                <input
                                    required
                                    type="email"
                                    placeholder="name@company.com"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-3 text-white focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-colors"
                                />
                            </div>

                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full py-4 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-bold rounded-xl shadow-lg shadow-indigo-500/20 transition-all transform hover:scale-[1.02] active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed"
                            >
                                {loading ? "Generating Report..." : "Unlock Full Audit"}
                            </button>
                        </form>

                        <p className="text-xs text-slate-600">
                            We respect your inbox. No spam, ever.
                        </p>
                    </div>
                </div>
            </div>
        </motion.div>
    );
}
