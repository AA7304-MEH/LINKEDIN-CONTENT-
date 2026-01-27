import { motion } from "framer-motion";
import { Question } from "./AuditWizard";
import { useState, useEffect } from "react";
import styles from "./ResonateAudit.module.css";

interface AuditQuestionProps {
    question: Question;
    onAnswer: (id: string, value: any) => void;
    currentAnswer?: any;
}

export default function AuditQuestion({ question, onAnswer, currentAnswer }: AuditQuestionProps) {
    const [selected, setSelected] = useState<any>(currentAnswer);

    useEffect(() => {
        // Reset local selection when question changes unless already answered
        setSelected(currentAnswer);
    }, [currentAnswer, question.id]);

    const handleNext = () => {
        if (selected) {
            onAnswer(question.id, selected);
        }
    };

    return (
        <motion.div
            key={question.id}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="w-full max-w-4xl mx-auto px-4"
        >
            <div className={styles.proCard}>
                <div className="space-y-8">
                    <h3 className="text-3xl md:text-3xl font-bold text-white text-center md:text-left leading-tight">
                        {question.text}
                    </h3>

                    <div className="space-y-4 pt-2">
                        {question.type === "choice" && question.options?.map((option) => (
                            <div
                                key={option}
                                onClick={() => setSelected(option)}
                                className={`${styles.answerCard} ${selected === option ? styles.answerCardSelected : ''}`}
                            >
                                <span className={`text-lg md:text-xl font-medium ${selected === option ? "text-white" : "text-gray-300"}`}>
                                    {option}
                                </span>

                                <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors
                                    ${selected === option ? "border-[#00aaff] bg-[#00aaff]" : "border-gray-600"}`}
                                >
                                    {selected === option && (
                                        <svg className="w-3.5 h-3.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" /></svg>
                                    )}
                                </div>
                            </div>
                        ))}

                        {question.type === "scale" && (
                            <div className="flex gap-6 justify-between pt-10">
                                {[1, 2, 3, 4, 5].map((num) => (
                                    <button
                                        key={num}
                                        onClick={() => setSelected(num)}
                                        style={{
                                            minHeight: '180px',
                                            fontSize: '4rem',
                                            flex: 1
                                        }}
                                        className={`rounded-3xl font-black border-4 transition-all duration-300 transform active:scale-90
                                            ${selected === num
                                                ? "bg-[#00aaff] border-[#00aaff] text-white shadow-[0_0_50px_rgba(0,170,255,0.7)] scale-110 z-10"
                                                : "bg-[#1a1a20] border-[#3a3a40] text-gray-400 hover:border-white hover:text-white hover:bg-[#25252b] hover:scale-105"
                                            }`}
                                    >
                                        {num}
                                    </button>
                                ))}
                            </div>
                        )}

                        {question.type === "text" && (
                            <div className="pt-10">
                                <input
                                    type="text"
                                    placeholder={question.placeholder}
                                    value={selected || ""}
                                    onChange={(e) => setSelected(e.target.value)}
                                    style={{
                                        fontSize: '2.5rem',
                                        padding: '2rem 1.5rem',
                                        width: '100%'
                                    }}
                                    className="rounded-2xl bg-[#0d0d12] border-4 border-[#3a3a40] text-white focus:border-[#00aaff] focus:ring-4 focus:ring-[#00aaff]/30 focus:outline-none transition-all placeholder:text-gray-600 font-semibold"
                                    autoFocus
                                    onKeyDown={(e) => {
                                        if (e.key === "Enter" && selected) {
                                            handleNext();
                                        }
                                    }}
                                />
                            </div>
                        )}
                    </div>

                    <div className="pt-6 flex justify-end">
                        <button
                            onClick={handleNext}
                            disabled={!selected}
                            className={`${styles.btnPrimary} w-full md:w-auto min-w-[140px]`}
                        >
                            Next Step →
                        </button>
                    </div>
                </div>
            </div>
        </motion.div>
    );
}
