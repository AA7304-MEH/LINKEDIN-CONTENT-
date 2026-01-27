"use client";

import { motion } from "framer-motion";
import { Question, QuestionType } from "./AuditWizard";
import { useState } from "react";

interface QuestionCardProps {
    question: Question;
    onAnswer: (questionId: string, answer: any) => void;
    defaultValue?: any;
}

export default function QuestionCard({
    question,
    onAnswer,
    defaultValue,
}: QuestionCardProps) {
    const [textValue, setTextValue] = useState(defaultValue || "");

    const containerVariants = {
        hidden: { opacity: 0, x: 50 },
        visible: { opacity: 1, x: 0, transition: { duration: 0.4, ease: "easeOut" } },
        exit: { opacity: 0, x: -50, transition: { duration: 0.3 } },
    };

    const renderInput = () => {
        switch (question.type) {
            case "choice":
                return (
                    <div className="grid gap-3">
                        {question.options?.map((option, idx) => (
                            <motion.button
                                key={option}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: idx * 0.1 }}
                                onClick={() => onAnswer(question.id, option)}
                                className={`w-full text-left p-4 rounded-xl border transition-all duration-200 group relative
                  ${defaultValue === option
                                        ? "bg-indigo-600 border-indigo-500 shadow-indigo-500/20 shadow-lg text-white"
                                        : "bg-slate-800/50 border-slate-700 hover:bg-slate-800 hover:border-slate-600 text-slate-200"
                                    }
                `}
                            >
                                <div className="flex items-center justify-between">
                                    <span className="font-medium text-lg">{option}</span>
                                    {defaultValue === option && (
                                        <motion.svg
                                            initial={{ scale: 0 }}
                                            animate={{ scale: 1 }}
                                            className="w-5 h-5 text-white"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                            strokeWidth={3}
                                        >
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                                        </motion.svg>
                                    )}
                                </div>
                            </motion.button>
                        ))}
                    </div>
                );

            case "scale":
                return (
                    <div className="flex flex-col items-center space-y-8 pt-4">
                        <div className="flex justify-between w-full max-w-sm px-2">
                            {[1, 2, 3, 4, 5].map((num) => (
                                <button
                                    key={num}
                                    onClick={() => onAnswer(question.id, num)}
                                    className={`flex items-center justify-center w-12 h-12 rounded-full text-xl font-bold transition-all duration-300
                    ${defaultValue === num
                                            ? "bg-indigo-600 text-white scale-110 shadow-lg shadow-indigo-500/30"
                                            : "bg-slate-800 text-slate-400 hover:bg-slate-700 hover:text-white"
                                        }
                  `}
                                >
                                    {num}
                                </button>
                            ))}
                        </div>
                        <div className="flex justify-between w-full text-sm text-slate-500 px-4">
                            <span>Not me at all</span>
                            <span>It's perfect</span>
                        </div>
                    </div>
                );

            case "text":
                return (
                    <div className="space-y-4">
                        <input
                            type="text"
                            className="w-full bg-slate-900/50 border border-slate-700 rounded-xl p-4 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                            placeholder={question.placeholder}
                            value={textValue}
                            onChange={(e) => setTextValue(e.target.value)}
                            onKeyDown={(e) => {
                                if (e.key === 'Enter' && textValue.trim()) {
                                    onAnswer(question.id, textValue);
                                }
                            }}
                            autoFocus
                        />
                        <button
                            disabled={!textValue.trim()}
                            onClick={() => onAnswer(question.id, textValue)}
                            className="w-full py-4 bg-white text-slate-900 font-bold rounded-xl disabled:opacity-50 disabled:cursor-not-allowed hover:bg-indigo-50 transition-colors"
                        >
                            Next Step →
                        </button>
                    </div>
                );

            default:
                return null;
        }
    };

    return (
        <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="w-full bg-slate-900/40 backdrop-blur-md border border-slate-800/50 p-6 md:p-10 rounded-3xl shadow-2xl"
        >
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-8 leading-snug">
                {question.text}
            </h2>
            {renderInput()}
        </motion.div>
    );
}
