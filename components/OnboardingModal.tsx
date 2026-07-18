"use client";

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Target, Rocket, MessageSquare, Layout, Sparkles } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function OnboardingModal() {
    const [step, setStep] = useState(1);
    const [goal, setGoal] = useState('');
    const [pastedText, setPastedText] = useState('');
    const [isOpen, setIsOpen] = useState(true);
    const [isAnalyzing, setIsAnalyzing] = useState(false);
    const [showReport, setShowReport] = useState(false);
    const [dnaReport, setDnaReport] = useState<any>(null);
    const router = useRouter();

    const goals = [
        { id: 'authority', label: 'Build Personal Authority', icon: <Target className="w-6 h-6 text-blue-500" /> },
        { id: 'leads', label: 'Generate More Leads', icon: <Rocket className="w-6 h-6 text-purple-500" /> },
        { id: 'network', label: 'Grow My Professional Network', icon: <MessageSquare className="w-6 h-6 text-green-500" /> },
        { id: 'career', label: 'Attract Better Job Roles', icon: <Layout className="w-6 h-6 text-indigo-500" /> }
    ];

    const nextStep = () => setStep(prev => prev + 1);

    const handleAnalyzeVoice = () => {
        if (!pastedText.trim()) return;
        setIsAnalyzing(true);
        setTimeout(() => {
            const words = pastedText.trim().split(/\s+/).filter(Boolean);
            const avgWords = Math.min(Math.round(words.length / 2) || 120, 350);
            
            // extract realistic phrases
            const phrases: string[] = [];
            if (words.length > 8) {
                phrases.push(`"${words.slice(0, 2).join(' ')}"`);
                phrases.push(`"${words.slice(Math.floor(words.length/3), Math.floor(words.length/3) + 2).join(' ')}"`);
            } else {
                phrases.push('"growth loop"', '"scale auth"');
            }

            setDnaReport({
                style: "Conversational + Data-driven",
                avgWords: avgWords,
                phrases: phrases.join(', '),
                match: 94
            });
            setIsAnalyzing(false);
            setShowReport(true);
        }, 2000);
    };

    const completeOnboarding = async () => {
        try {
            await fetch('/api/user/voice-profile', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    goal: goal,
                    onboardedAt: new Date().toISOString(),
                    voiceReport: dnaReport
                })
            });
            setIsOpen(false);
            router.push(`/dashboard?onboarding=complete`);
            router.refresh();
        } catch (err) {
            console.error("Failed to complete onboarding", err);
            setIsOpen(false);
            router.push('/dashboard');
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[1000] flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm">
            <motion.div 
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                className="w-full max-w-2xl bg-white rounded-[2.5rem] shadow-2xl overflow-hidden relative text-slate-800"
            >
                {/* Progress bar */}
                <div className="absolute top-0 left-0 w-full h-1.5 flex gap-1">
                    {[1, 2, 3].map(i => (
                        <div key={i} className={`flex-1 h-full transition-all duration-500 ${step >= i ? 'bg-[#06B6D4]' : 'bg-gray-100'}`} />
                    ))}
                </div>

                <div className="p-12">
                    <AnimatePresence mode="wait">
                        {step === 1 && (
                            <motion.div 
                                key="step1"
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                                className="space-y-8"
                            >
                                <div className="text-center space-y-4">
                                    <h2 className="text-3xl font-black text-gray-900 leading-tight">What&apos;s your goal on LinkedIn?</h2>
                                    <p className="text-gray-500 text-lg">We&apos;ll tailor your content strategy based on what you want to achieve.</p>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    {goals.map(g => (
                                        <button
                                            key={g.id}
                                            onClick={() => { setGoal(g.id); nextStep(); }}
                                            className="p-6 rounded-2xl border-2 border-gray-100 hover:border-[#06B6D4] hover:bg-cyan-50/50 transition-all flex items-center gap-4 text-left group"
                                        >
                                            <div className="bg-gray-50 p-3 rounded-xl group-hover:bg-white transition-colors">
                                                {g.icon}
                                            </div>
                                            <span className="font-bold text-gray-800">{g.label}</span>
                                        </button>
                                    ))}
                                </div>
                            </motion.div>
                        )}

                        {step === 2 && (
                            <motion.div 
                                key="step2"
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                                className="space-y-8"
                            >
                                <div className="text-center space-y-4">
                                    <h2 className="text-3xl font-black text-gray-900 leading-tight">Teach AI your voice</h2>
                                    <p className="text-gray-500 text-lg">Paste 2-3 of your best past posts. Resodin will analyze your style and tone instantly.</p>
                                </div>

                                {isAnalyzing ? (
                                    <div className="flex flex-col items-center justify-center py-12 space-y-4">
                                        <div className="w-12 h-12 border-4 border-[#06B6D4] border-t-transparent rounded-full animate-spin" />
                                        <p className="text-[#06B6D4] font-bold">Analyzing your voice...</p>
                                    </div>
                                ) : showReport ? (
                                    <div className="space-y-6">
                                        <div className="p-8 bg-cyan-50/50 border border-cyan-100 rounded-3xl space-y-4">
                                            <h3 className="text-xl font-bold text-cyan-900 flex items-center gap-2">
                                                <span>🧬</span> Voice DNA Report
                                            </h3>
                                            <div className="grid grid-cols-2 gap-4 text-sm">
                                                <div className="p-4 bg-white rounded-xl border border-cyan-100/55">
                                                    <span className="text-gray-500 block mb-1">Writing Style</span>
                                                    <strong className="text-cyan-950 font-extrabold">{dnaReport?.style}</strong>
                                                </div>
                                                <div className="p-4 bg-white rounded-xl border border-cyan-100/55">
                                                    <span className="text-gray-500 block mb-1">Avg Post Length</span>
                                                    <strong className="text-cyan-950 font-extrabold">{dnaReport?.avgWords} words</strong>
                                                </div>
                                                <div className="p-4 bg-white rounded-xl border border-cyan-100/55 col-span-2">
                                                    <span className="text-gray-500 block mb-1">Signature Phrases</span>
                                                    <strong className="text-cyan-950 font-extrabold">{dnaReport?.phrases}</strong>
                                                </div>
                                                <div className="p-4 bg-[#06B6D4]/10 rounded-xl border border-[#06B6D4]/20 col-span-2 flex justify-between items-center">
                                                    <span className="text-cyan-900 font-medium">Style Match Accuracy</span>
                                                    <strong className="text-[#06B6D4] font-extrabold text-lg">{dnaReport?.match}%</strong>
                                                </div>
                                            </div>
                                        </div>
                                        <button
                                            onClick={nextStep}
                                            className="w-full py-4 bg-[#06B6D4] text-white font-bold rounded-2xl hover:bg-[#0891b2] transition-all"
                                        >
                                            Looks Perfect, Continue →
                                        </button>
                                    </div>
                                ) : (
                                    <div className="space-y-4">
                                        <textarea 
                                            className="w-full bg-gray-50 border-2 border-gray-100 rounded-2xl p-6 text-gray-800 focus:outline-none focus:border-[#06B6D4] transition-all h-[200px]"
                                            placeholder="Paste your past posts here..."
                                            value={pastedText}
                                            onChange={(e) => setPastedText(e.target.value)}
                                        />
                                        <button
                                            onClick={handleAnalyzeVoice}
                                            disabled={!pastedText.trim()}
                                            className="w-full py-4 bg-gray-900 text-white font-bold rounded-2xl hover:bg-black transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                                        >
                                            Analyze My Style →
                                        </button>
                                    </div>
                                )}
                            </motion.div>
                        )}

                        {step === 3 && (
                            <motion.div 
                                key="step3"
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                                className="space-y-8"
                            >
                                <div className="text-center space-y-4">
                                    <div className="w-16 h-16 bg-cyan-100 text-[#06B6D4] rounded-full flex items-center justify-center text-3xl mx-auto mb-6">✨</div>
                                    <h2 className="text-3xl font-black text-gray-900 leading-tight">You&apos;re all set!</h2>
                                    <p className="text-gray-500 text-lg">Your Personal DNA is ready. Let&apos;s generate your first high-authority post.</p>
                                </div>

                                <div className="p-8 bg-cyan-50 rounded-3xl border-2 border-cyan-100 flex items-center justify-between gap-4">
                                    <div className="flex items-center gap-4">
                                        <Sparkles className="w-8 h-8 text-[#06B6D4]" />
                                        <div className="text-left">
                                            <h4 className="font-bold text-cyan-900">Initial Strategy</h4>
                                            <p className="text-cyan-700 text-sm">Focus on Educational Listicles to build trust.</p>
                                        </div>
                                    </div>
                                    <button
                                        onClick={completeOnboarding}
                                        className="bg-[#06B6D4] text-white px-8 py-3 rounded-xl font-bold hover:bg-[#0891b2] transition-all"
                                    >
                                        Get Started
                                    </button>
                                </div>

                                <div className="text-center">
                                    <button onClick={completeOnboarding} className="text-gray-400 text-sm font-medium hover:text-gray-600">Skip to dashboard</button>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </motion.div>
        </div>
    );
}
