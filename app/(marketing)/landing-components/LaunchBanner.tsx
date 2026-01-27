"use client";

import React, { useState, useEffect } from 'react';

const LaunchBanner = () => {
    const [spots, setSpots] = useState(100);

    useEffect(() => {
        // Start with 100 spots
        setSpots(100);

        const interval = setInterval(() => {
            // Decrease spots randomly
            setSpots((prev) => {
                const drop = Math.floor(Math.random() * 3);
                const newSpots = Math.max(47, prev - drop);
                return newSpots;
            });
        }, 60000);

        return () => clearInterval(interval);
    }, []);

    return (
        <div className="launch-banner">
            🚀 LAUNCH SPECIAL: First 100 users get 50% OFF forever!
            <span style={{ marginLeft: '1rem', background: 'white', color: '#0077B5', padding: '0.2rem 0.8rem', borderRadius: '1rem' }}>
                <span id="counter">{spots}</span>/100 spots left
            </span>
        </div>
    );
};

export default LaunchBanner;
