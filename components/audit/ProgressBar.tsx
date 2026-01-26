"use client";

import { motion } from "framer-motion";

interface ProgressBarProps {
    current: number;
    total: number;
}

export default function ProgressBar({ current, total }: ProgressBarProps) {
    // progress calculation: current step (1-indexed) map to percentage
    // If we are at step 1 of 5, progress is roughly 20%? Or 0% going to 20%?
    // Let's make it show "Question X of Y".
    const progress = (current / total) * 100;

    return (
        <div className="w-full space-y-2">
            <div className="flex justify-between text-xs font-medium text-slate-400 uppercase tracking-wider">
                <span>Question {current} <span className="text-slate-600">/ {total}</span></span>
                <span>{Math.round(progress)}% Complete</span>
            </div>
            <div className="h-1.5 bg-slate-800 rounded-full overflow-hidden">
                <motion.div
                    className="h-full bg-gradient-to-r from-indigo-500 to-purple-500"
                    initial={{ width: 0 }}
                    animate={{ width: `${progress}%` }}
                    transition={{ duration: 0.5, ease: "easeInOut" }}
                />
            </div>
        </div>
    );
}
