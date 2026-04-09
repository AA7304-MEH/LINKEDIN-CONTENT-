"use client";

import { useState, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import AuditWelcome from "./AuditWelcome";
import AuditQuestion from "./AuditQuestion";
import AuditResults from "./AuditResults";
import styles from "./ResodinAudit.module.css";
import LandingNavbar from "@/app/landing-components/LandingNavbar";
import LandingFooter from "@/app/landing-components/LandingFooter";
import FAQAccordion from "@/app/landing-components/FAQAccordion";
import CommunityHub from "@/app/landing-components/CommunityHub";

export type QuestionType = "choice" | "scale" | "text";

export interface Question {
    id: string;
    text: string;
    type: QuestionType;
    options?: string[];
    placeholder?: string;
    icon?: string;
}

const QUESTIONS: Question[] = [
    {
        id: "profile_info",
        text: "What is your LinkedIn profile URL and primary goal?",
        type: "text",
        placeholder: "https://linkedin.com/in/yourprofile",
        icon: "🔗"
    },
    {
        id: "goal",
        text: "Choose your primary goal on LinkedIn:",
        type: "choice",
        options: [
            "Thought Leader",
            "Job Seeker",
            "Business Owner",
            "Creator"
        ],
        icon: "🎯"
    },
    {
        id: "topics",
        text: "What topics do you post about? (Multi-select)",
        type: "choice", // Using choice with multi-select logic in AuditQuestion
        options: [
            "AI & Tech",
            "Marketing & Sales",
            "Leadership & Management",
            "Career Growth",
            "Startup Life",
            "Personal Finance",
            "Software Engineering",
            "Design & UX"
        ],
        icon: "📝"
    }
];


export default function AuditWizard() {
    const [step, setStep] = useState<number>(0);
    const [answers, setAnswers] = useState<Record<string, any>>({});
    const [isAnalyzing, setIsAnalyzing] = useState(false);
    const topRef = useRef<HTMLDivElement>(null);

    const totalSteps = QUESTIONS.length;
    const currentQuestionIndex = step - 1;

    const handleStart = () => {
        setStep(1);
        setTimeout(() => {
            topRef.current?.scrollIntoView({ behavior: 'smooth' });
        }, 100);
    };

    const handleAnswer = (questionId: string, answer: any) => {
        setAnswers((prev) => ({ ...prev, [questionId]: answer }));
        setTimeout(() => {
            if (step < totalSteps) {
                setStep((prev) => prev + 1);
            } else {
                finishAudit();
            }
        }, 300);
    };

    const finishAudit = () => {
        setIsAnalyzing(true);
        setTimeout(() => {
            setIsAnalyzing(false);
            setStep(totalSteps + 1);
        }, 2000);
    };

    return (
        <div className={`min-h-screen w-full flex flex-col ${styles.resodinNativeContainer}`}>
            {/* @ts-ignore */}
            <LandingNavbar />

            <main ref={topRef} className={`flex-grow flex flex-col items-center justify-start ${step === 0 ? '' : 'py-20 px-4'}`}>

                {/* Feature Header (Only show AFTER start) */}
                {step > 0 && (
                    <div className="text-center mb-10 max-w-2xl">
                        <h1 className={`${styles.headingLg} mb-3 tracking-tight`}>
                            Decode Your Content DNA
                        </h1>
                        <p className={`${styles.textBody} text-base md:text-lg`}>
                            Stop guessing. Our AI analyzes your inputs to reveal your unique creator archetype.
                        </p>
                    </div>
                )}

                {/* Progress Bar (Only visible during audit steps) */}
                {step > 0 && step <= totalSteps && (
                    <div className="w-full max-w-lg mb-12">
                        <div className="flex flex-row justify-between items-end mb-2 w-full">
                            <span className="text-[#00aaff] text-sm font-semibold tracking-wide whitespace-nowrap">
                                QUESTION {step} OF {totalSteps}
                            </span>
                            <span className="text-gray-500 text-xs font-mono whitespace-nowrap ml-4">
                                {Math.round(((step - 1) / totalSteps) * 100)}% COMPLETE
                            </span>
                        </div>
                        <div className={styles.progressContainer}>
                            <motion.div
                                className={styles.progressFill}
                                initial={{ width: 0 }}
                                animate={{ width: `${((step - 1) / totalSteps) * 100}%` }}
                                transition={{ duration: 0.5 }}
                            />
                        </div>
                    </div>
                )}

                {/* Dynamic Content Area */}
                <div className={`w-full ${step === 0 ? '' : 'max-w-4xl'} min-h-[400px] flex items-center justify-center`}>
                    <AnimatePresence mode="wait">
                        {step === 0 ? (
                            <AuditWelcome onStart={handleStart} />
                        ) : isAnalyzing ? (
                            <div className="w-full max-w-lg mx-auto flex flex-col items-center justify-center min-h-[400px] text-center space-y-8">
                                <div className="space-y-2">
                                    <h2 className="text-3xl font-bold text-white tracking-tight animate-pulse">
                                        Generating Report...
                                    </h2>
                                    <p className="text-gray-400 text-lg">
                                        Comparing data points...
                                    </p>
                                </div>
                                <div className="w-full h-1 bg-[#1a1a20] rounded-full overflow-hidden relative">
                                    <motion.div
                                        className="absolute top-0 left-0 h-full bg-[#00aaff] shadow-[0_0_10px_#00aaff]"
                                        initial={{ width: "0%" }}
                                        animate={{ width: "100%" }}
                                        transition={{ duration: 2, ease: "easeInOut" }}
                                    />
                                </div>
                            </div>
                        ) : step > totalSteps ? (
                            <AuditResults answers={answers} />
                        ) : (
                            <AuditQuestion
                                question={QUESTIONS[currentQuestionIndex]}
                                onAnswer={handleAnswer}
                                currentAnswer={answers[QUESTIONS[currentQuestionIndex].id]}
                            />
                        )}
                    </AnimatePresence>
                </div>
            </main>

            <FAQAccordion />
            <CommunityHub />

            {/* @ts-ignore */}
            <LandingFooter />
        </div>
    );
}
