"use client";

import { useState } from "react";

interface CopyButtonProps {
    link: string;
}

export default function CopyButton({ link }: CopyButtonProps) {
    const [copied, setCopied] = useState(false);

    const handleCopy = async () => {
        try {
            await navigator.clipboard.writeText(link);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch (err) {
            console.error("Failed to copy link", err);
        }
    };

    return (
        <button
            onClick={handleCopy}
            className="bg-blue-600 text-white px-8 py-4 rounded-xl font-bold hover:bg-blue-500 transition-all shadow-lg active:scale-95"
        >
            {copied ? "Copied!" : "Copy Link"}
        </button>
    );
}
