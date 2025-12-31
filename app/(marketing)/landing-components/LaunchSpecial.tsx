"use client";

import React, { useState, useEffect } from 'react';

const LaunchSpecial = () => {
    // Initialize with a value. The snippet implies starting at 100 and dropping, 
    // but hardcodes 47 in HTML. I will simulate the "live" feel by starting at 52 
    // so it drops to 47 over time, or just stick to the script's 100.
    // Given "NOW" and "47/100", I'll make it start at 50 to seem like it's already active/low 
    // but still has a bit of movement.
    // Wait, let's stick to the user's script logic exactly for the behavior, 
    // but if the user provided snippet has `let spots = 100`, it implies it resets on load?
    // To avoid confusion, I'll follow the script: Start (internal var) at 100. 
    // BUT the displayed hardcoded value was 47. 
    // Maybe I should just set state to 47 and implement a fake drop from a slightly higher number?
    // Let's implement exactly what the script does: variable `spots` starts at 100.

    const [spots, setSpots] = useState(47); // Initial state matching the hardcoded HTML

    useEffect(() => {
        let currentSpots = 100; // Script var

        // To make it interesting immediately, let's calculate a "random" starting point 
        // or just let it run.
        // If I strictly follow the script, it starts at 100 and updates every 60s.
        // That means the user sees 100, then 98...
        // The "47" allows me to cheat and start lower if I want.
        // I'll stick to the visual 47 as the 'floor' and maybe start the counter 
        // at something like 55 to show movement if the user stays for a while, 
        // or just let it be dynamic.

        // Actually, looking at the script: `Math.max(47, spots)`.
        // It implies the number will never go below 47.
        // If I want to show urgency, I should probably start it near 47.
        // Let's modify slightly to start at 55 and drop every 5 seconds for demo purposes?
        // No, the user said "60000" (1 min).
        // I will implement the script logic but initialize the display to 47 
        // effectively ignoring the `let spots = 100` if it's not consistent with the "Launch Special" vibe.
        // Wait, the user said "Add THIS". I should add IT.
        // The HTML has `47` hardcoded. The script has `spots = 100`.
        // Changes: I'll make it start at 100 to respect the script provided.

        // Re-reading: The script updates `textContent` to `Math.max(47, spots)`.
        // So if spots starts at 100, it displays 100.
        // I will use 100.

        setSpots(100);

        const interval = setInterval(() => {
            currentSpots -= Math.floor(Math.random() * 3);
            setSpots(Math.max(47, currentSpots));
        }, 60000);

        return () => clearInterval(interval);
    }, []);

    return (
        <div style={{
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            padding: '2rem',
            borderRadius: '1rem',
            color: 'white',
            margin: '2rem 0',
            textAlign: 'center'
        }}>
            <h2 style={{ fontSize: '1.8rem', marginBottom: '1rem' }}>🚀 LAUNCH SPECIAL</h2>
            <p style={{ fontSize: '1.2rem', marginBottom: '1rem' }}>First 100 users get <strong>50% OFF forever</strong></p>
            <div style={{
                background: 'white',
                color: 'black',
                padding: '0.5rem 1rem',
                borderRadius: '2rem',
                display: 'inline-block',
                fontWeight: 'bold'
            }}>
                <span id="counter">{spots}</span>/100 spots left
            </div>
        </div>
    );
};

export default LaunchSpecial;
