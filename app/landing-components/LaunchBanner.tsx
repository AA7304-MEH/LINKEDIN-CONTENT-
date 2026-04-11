"use client";

import React, { useState, useEffect } from 'react';

const LaunchBanner = () => {
    const [spots, setSpots] = useState(100);

    useEffect(() => {
        setSpots(100);
        const interval = setInterval(() => {
            setSpots((prev) => {
                const drop = Math.floor(Math.random() * 3);
                const newSpots = Math.max(47, prev - drop);
                return newSpots;
            });
        }, 60000);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="bg-[#030303] border-b border-white/5 py-3 relative overflow-hidden group">
            {/* Pulsing background effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#00e5ff]/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-[2000ms] ease-in-out" />
            
            <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-center gap-4 text-center relative z-10">
                <div className="flex items-center gap-2">
                    <span className="text-lg">🚀</span>
                    <span className="text-white/80 font-bold tracking-tight text-sm uppercase italic">
                        Launch Special: <span className="text-white">First 100 users get 50% OFF forever</span>
                    </span>
                </div>
                
                <div className="flex items-center gap-3 bg-white/5 border border-white/10 px-4 py-1.5 rounded-full backdrop-blur-md">
                    <div className="flex h-2 w-2 relative">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#00e5ff] opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-[#00e5ff]"></span>
                    </div>
                    <span className="text-[10px] font-black text-[#00e5ff] uppercase tracking-widest leading-none">
                        {spots}/100 Spots Remaining
                    </span>
                </div>
            </div>
        </div>
    );
};

export default LaunchBanner;
