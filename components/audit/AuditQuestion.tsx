import { motion } from "framer-motion";
import { Question } from "./AuditWizard";
import { useState, useEffect } from "react";

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
            <div className="bg-white/[0.03] backdrop-blur-[16px] border border-white/[0.08] rounded-[24px] p-6 md:p-12 transition-all duration-300 shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
                <div className="space-y-8">
                    <h3 className="text-xl md:text-3xl font-bold text-white text-center md:text-left leading-tight">
                        {question.text}
                    </h3>

                    <div className="space-y-4 pt-2">
                        {question.type === "choice" && question.options?.map((option) => (
                            <div
                                key={option}
                                onClick={() => setSelected(option)}
                                className={`bg-white/[0.03] backdrop-blur-[8px] border rounded-xl p-5 md:p-7 transition-all duration-300 cursor-pointer text-left flex items-center justify-between mb-4 hover:border-[#555] hover:bg-[#222] hover:-translate-y-0.5 hover:scale-[1.01] hover:shadow-lg ${selected === option ? 'border-[#00e5ff] bg-[#00e5ff]/5 shadow-[0_0_20px_rgba(0,229,255,0.2),inset_0_0_0_1px_#00e5ff] -translate-y-0.5 scale-[1.01]' : 'border-white/[0.08]'}`}
                            >
                                <span className={`text-lg md:text-xl font-medium ${selected === option ? "text-white" : "text-gray-300"}`}>
                                    {option}
                                </span>

                                <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors
                                    ${selected === option ? "border-[#00e5ff] bg-[#00e5ff]" : "border-gray-600"}`}
                                >
                                    {selected === option && (
                                        <svg className="w-3.5 h-3.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" /></svg>
                                    )}
                                </div>
                            </div>
                        ))}

                        {question.type === "scale" && (
                            <div className="flex flex-wrap md:flex-nowrap gap-3 md:gap-4 justify-between pt-10">
                                {[1, 2, 3, 4, 5].map((num) => (
                                    <button
                                        key={num}
                                        onClick={() => setSelected(num)}
                                        className={`rounded-3xl font-black border transition-all duration-300 transform active:scale-95 flex-1 min-w-[50px] min-h-[120px] md:min-h-[160px] text-4xl md:text-5xl
                                            ${selected === num
                                                ? "bg-[#00e5ff] border-[#00e5ff] text-[#030303] shadow-[0_10px_40px_rgba(0,229,255,0.4)] scale-105 z-10"
                                                : "bg-white/5 border-white/10 text-slate-500 hover:border-white/20 hover:text-white hover:bg-white/10"
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
                                    className="w-full rounded-2xl bg-white/5 border border-white/10 text-white focus:border-[#00e5ff] focus:ring-4 focus:ring-[#00e5ff]/20 focus:outline-none transition-all placeholder:text-slate-700 font-bold text-2xl md:text-3xl p-6 md:p-8"
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

                    <div className="pt-12 flex justify-center">
                        <button
                            onClick={handleNext}
                            disabled={!selected}
                            className={`bg-[#00e5ff] text-[#030303] font-bold text-lg rounded-2xl md:w-auto px-12 py-5 transition-all hover:bg-[#33fcff] hover:-translate-y-0.5 shadow-[0_4px_15px_rgba(0,170,255,0.3)] hover:shadow-[0_8px_25px_rgba(0,170,255,0.4)] disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none disabled:shadow-none disabled:bg-[#2a2a30] disabled:text-[#666] w-full tracking-tight`}
                        >
                            Next Step
                        </button>
                    </div>
                </div>
            </div>
        </motion.div>
    );
}
