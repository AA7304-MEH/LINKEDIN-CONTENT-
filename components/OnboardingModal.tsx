"use client";

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Target, MessageSquare, Rocket, Layout, Sparkles } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function OnboardingModal() {
    const [step, setStep] = useState(1);
    const [goal, setGoal] = useState('');
    const [isOpen, setIsOpen] = useState(true);
    const router = useRouter();

    const goals = [
        { id: 'authority', label: 'Build Personal Authority', icon: <Target className="w-6 h-6 text-blue-500" /> },
        { id: 'leads', label: 'Generate More Leads', icon: <Rocket className="w-6 h-6 text-purple-500" /> },
        { id: 'network', label: 'Grow My Professional Network', icon: <MessageSquare className="w-6 h-6 text-green-500" /> },
        { id: 'career', label: 'Attract Better Job Roles', icon: <Layout className="w-6 h-6 text-indigo-500" /> }
    ];

    const nextStep = () => setStep(prev => prev + 1);

    const completeOnboarding = async () => {
        try {
            await fetch('/api/user/voice-profile', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    goal: goal,
                    onboardedAt: new Date().toISOString(),
                    // In a real app, we'd send the sample posts content here too
                })
            });
            setIsOpen(false);
            router.push(`/dashboard?onboarding=complete`);
            router.refresh(); // Refresh to update ProtectedLayout state
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
                className="w-full max-w-2xl bg-white rounded-[2.5rem] shadow-2xl overflow-hidden relative"
            >
                {/* Header / Progress bar */}
                <div className="absolute top-0 left-0 w-full h-1.5 flex gap-1">
                    {[1, 2, 3].map(i => (
                        <div key={i} className={`flex-1 h-full transition-all duration-500 ${step >= i ? 'bg-blue-600' : 'bg-gray-100'}`} />
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
                                    <h2 className="text-3xl font-black text-gray-900 leading-tight">What's your goal on LinkedIn?</h2>
                                    <p className="text-gray-500 text-lg">We'll tailor your content strategy based on what you want to achieve.</p>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    {goals.map(g => (
                                        <button
                                            key={g.id}
                                            onClick={() => { setGoal(g.id); nextStep(); }}
                                            className="p-6 rounded-2xl border-2 border-gray-100 hover:border-blue-500 hover:bg-blue-50 transition-all flex items-center gap-4 text-left group"
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

                                <div className="space-y-4">
                                    <textarea 
                                        className="w-full bg-gray-50 border-2 border-gray-100 rounded-2xl p-6 text-gray-800 focus:outline-none focus:border-blue-500 transition-all h-[200px]"
                                        placeholder="Paste your past posts here..."
                                    />
                                    <button
                                        onClick={nextStep}
                                        className="w-full py-4 bg-gray-900 text-white font-bold rounded-2xl hover:bg-black transition-all"
                                    >
                                        Analyze My Style →
                                    </button>
                                </div>
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
                                    <div className="w-16 h-16 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-3xl mx-auto mb-6">✨</div>
                                    <h2 className="text-3xl font-black text-gray-900 leading-tight">You're all set!</h2>
                                    <p className="text-gray-500 text-lg">Your Personal DNA is ready. Let's generate your first high-authority post.</p>
                                </div>

                                <div className="p-8 bg-blue-50 rounded-3xl border-2 border-blue-100 flex items-center justify-between gap-4">
                                    <div className="flex items-center gap-4">
                                        <Sparkles className="w-8 h-8 text-blue-600" />
                                        <div>
                                            <h4 className="font-bold text-blue-900">Initial Strategy</h4>
                                            <p className="text-blue-700 text-sm">Focus on Educational Listicles to build trust.</p>
                                        </div>
                                    </div>
                                    <button
                                        onClick={completeOnboarding}
                                        className="bg-blue-600 text-white px-8 py-3 rounded-xl font-bold hover:bg-blue-700 transition-all"
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
