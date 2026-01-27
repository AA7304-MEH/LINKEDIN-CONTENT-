"use client";

import { motion } from "framer-motion";

interface ProgressBarProps {
    current: number;
    total: number;
}

export default function ProgressBar({ current, total }: ProgressBarProps) {
    const progress = (current / total) * 100;

    return (
        <div className="w-full max-w-2xl mx-auto mb-8">
            <div className="flex justify-between text-xs font-semibold text-slate-400 uppercase tracking-widest mb-3">
                <span>Progress</span>
                <span>{Math.round(progress)}%</span>
            </div>
            <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                <motion.div
                    className="h-full bg-indigo-600 rounded-full"
                    initial={{ width: 0 }}
                    animate={{ width: `${progress}%` }}
                    transition={{ duration: 0.5, ease: "easeInOut" }}
                />
            </div>
            <div className="text-right mt-2 text-xs text-slate-400 font-medium">
                Step {current} of {total}
            </div>
        </div>
    );
}
