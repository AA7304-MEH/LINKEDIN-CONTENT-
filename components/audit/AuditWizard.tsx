"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import QuestionCard from "./QuestionCard";
import AuditResults from "./AuditResults";
import ProgressBar from "./ProgressBar";

export type QuestionType = "choice" | "scale" | "text";

export interface Question {
    id: string;
    text: string;
    type: QuestionType;
    options?: string[]; // For 'choice'
    placeholder?: string; // For 'text'
}

const QUESTIONS: Question[] = [
    {
        id: "goal",
        text: "What's your primary goal on LinkedIn right now?",
        type: "choice",
        options: [
            "Lead Generation & Sales",
            "Personal Branding & Authority",
            "Networking & Partnerships",
            "Recruiting / Job Seeking",
        ],
    },
    {
        id: "frustration",
        text: "What's your biggest frustration with creating content?",
        type: "choice",
        options: [
            "Takes too much time",
            "AI tools sound robotic",
            "I run out of ideas",
            "Low engagement/reach",
        ],
    },
    {
        id: "frequency",
        text: "How often do you currently post?",
        type: "choice",
        options: [
            "Daily (5+ times/week)",
            "Weekly (1-3 times/week)",
            "Sporadically / When I feel like it",
            "Rarely / Never",
        ],
    },
    {
        id: "authenticity",
        text: "On a scale of 1-5, how 'you' does your current content sound?",
        type: "scale",
    },
    {
        id: "audience",
        text: "Who specifically are you trying to reach? (e.g. 'SaaS Founders', 'HR Directors')",
        type: "text",
        placeholder: "e.g., Marketing Managers in Tech...",
    },
];

export default function AuditWizard() {
    const [step, setStep] = useState<number>(0); // 0 = Welcome, 1..N = Questions, N+1 = Analyzing, N+2 = Results
    const [answers, setAnswers] = useState<Record<string, any>>({});
    const [isAnalyzing, setIsAnalyzing] = useState(false);

    const totalSteps = QUESTIONS.length;
    const currentQuestionIndex = step - 1;

    const handleStart = () => {
        setStep(1);
    };

    const handleAnswer = (questionId: string, answer: any) => {
        setAnswers((prev) => ({ ...prev, [questionId]: answer }));

        // Slight delay to allow animation of selection before moving next
        setTimeout(() => {
            if (step < totalSteps) {
                setStep((prev) => prev + 1);
            } else {
                finishAudit();
            }
        }, 400); // 400ms delay for better UX on selection
    };

    const finishAudit = () => {
        setIsAnalyzing(true);
        // Simulate thinking/analyzing time
        setTimeout(() => {
            setIsAnalyzing(false);
            setStep(totalSteps + 1);
        }, 2500);
    };

    if (isAnalyzing) {
        return (
            <div className="flex flex-col items-center justify-center text-center space-y-6 max-w-md mx-auto p-8 rounded-2xl bg-slate-900/50 border border-slate-700/50 backdrop-blur-xl shadow-2xl">
                <div className="relative w-24 h-24">
                    <div className="absolute inset-0 border-t-4 border-indigo-500 border-solid rounded-full animate-spin"></div>
                    <div className="absolute inset-2 border-t-4 border-purple-500 border-solid rounded-full animate-spin reverse-spin opacity-70"></div>
                    <div className="absolute inset-0 flex items-center justify-center">
                        <span className="text-2xl">🧠</span>
                    </div>
                </div>
                <h2 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-purple-400">
                    Analyzing your Content DNA...
                </h2>
                <p className="text-slate-400">Comparing your goals against 10M+ viral posts...</p>
            </div>
        );
    }

    if (step > totalSteps) {
        return <AuditResults answers={answers} />;
    }

    return (
        <div className="w-full max-w-2xl mx-auto">
            <AnimatePresence mode="wait">
                {step === 0 ? (
                    <motion.div
                        key="welcome"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="text-center space-y-8 p-8 md:p-12 rounded-3xl bg-slate-900/40 border border-slate-700/30 backdrop-blur-md shadow-2xl"
                    >
                        <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 shadow-lg shadow-indigo-500/20 mb-4">
                            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" /><polyline points="17 8 12 3 7 8" /><line x1="12" x2="12" y1="3" y2="15" /></svg>
                        </div>

                        <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-white">
                            Discover Your <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400">
                                Content DNA
                            </span>
                        </h1>

                        <p className="text-lg text-slate-300 max-w-lg mx-auto leading-relaxed">
                            Take our 2-minute interactive audit to analyze your LinkedIn strategy, validte your voice, and unlock actionable growth insights.
                        </p>

                        <button
                            onClick={handleStart}
                            className="group relative px-8 py-4 bg-white text-slate-900 font-bold rounded-xl text-lg shadow-xl shadow-white/10 hover:shadow-white/20 hover:scale-105 transition-all duration-300 overflow-hidden"
                        >
                            <span className="relative z-10 flex items-center gap-2">
                                Start Free Audit
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="group-hover:translate-x-1 transition-transform"><path d="M5 12h14" /><path d="m12 5 7 7-7 7" /></svg>
                            </span>
                        </button>

                        <div className="flex items-center justify-center gap-6 text-sm text-slate-500 pt-4">
                            <span className="flex items-center gap-1.5"><span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span> Free</span>
                            <span className="flex items-center gap-1.5"><span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span> Instant Analysis</span>
                            <span className="flex items-center gap-1.5"><span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span> Actionable</span>
                        </div>
                    </motion.div>
                ) : (
                    <motion.div
                        key="question-container"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="relative"
                    >
                        <ProgressBar current={step} total={totalSteps} />

                        <div className="mt-8">
                            <QuestionCard
                                question={QUESTIONS[currentQuestionIndex]}
                                onAnswer={handleAnswer}
                                defaultValue={answers[QUESTIONS[currentQuestionIndex].id]}
                            />
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
