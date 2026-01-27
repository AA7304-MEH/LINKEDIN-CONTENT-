"use client";

import { motion } from "framer-motion";

interface AuditWelcomeProps {
    onStart: () => void;
}

export default function AuditWelcome({ onStart }: AuditWelcomeProps) {
    return (
        <section
            style={{
                position: 'relative',
                width: '100%',
                minHeight: '85vh',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: '#0d0d12',
                overflow: 'hidden',
                padding: '4rem 2rem'
            }}
        >
            {/* Glow Orb - Teal */}
            <div
                style={{
                    position: 'absolute',
                    top: '-150px',
                    left: '-150px',
                    width: '500px',
                    height: '500px',
                    background: 'radial-gradient(circle, rgba(0,170,255,0.25) 0%, transparent 60%)',
                    borderRadius: '50%',
                    filter: 'blur(80px)',
                    pointerEvents: 'none'
                }}
            />

            {/* Glow Orb - Purple */}
            <div
                style={{
                    position: 'absolute',
                    bottom: '-150px',
                    right: '-150px',
                    width: '500px',
                    height: '500px',
                    background: 'radial-gradient(circle, rgba(138,43,226,0.2) 0%, transparent 60%)',
                    borderRadius: '50%',
                    filter: 'blur(80px)',
                    pointerEvents: 'none'
                }}
            />

            {/* Grid Pattern Overlay */}
            <div
                style={{
                    position: 'absolute',
                    inset: 0,
                    backgroundImage: `
                        linear-gradient(rgba(40, 40, 50, 0.4) 1px, transparent 1px),
                        linear-gradient(90deg, rgba(40, 40, 50, 0.4) 1px, transparent 1px)
                    `,
                    backgroundSize: '60px 60px',
                    maskImage: 'radial-gradient(circle at center, black 30%, transparent 70%)',
                    WebkitMaskImage: 'radial-gradient(circle at center, black 30%, transparent 70%)',
                    pointerEvents: 'none',
                    zIndex: 0
                }}
            />

            {/* Main Content */}
            <div
                style={{
                    position: 'relative',
                    zIndex: 10,
                    maxWidth: '900px',
                    width: '100%',
                    textAlign: 'center'
                }}
            >
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7 }}
                >
                    {/* Badge */}
                    <div
                        style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '8px',
                            padding: '8px 16px',
                            borderRadius: '9999px',
                            backgroundColor: 'rgba(0,170,255,0.1)',
                            border: '1px solid rgba(0,170,255,0.3)',
                            marginBottom: '2rem'
                        }}
                    >
                        <span
                            style={{
                                width: '8px',
                                height: '8px',
                                borderRadius: '50%',
                                backgroundColor: '#00aaff',
                                animation: 'pulse 2s infinite'
                            }}
                        />
                        <span style={{ color: '#00aaff', fontSize: '14px', fontWeight: 600 }}>
                            Free Content Strategy Audit
                        </span>
                    </div>

                    {/* Headline */}
                    <h1
                        style={{
                            fontSize: 'clamp(2.5rem, 8vw, 5rem)',
                            fontWeight: 800,
                            color: 'white',
                            lineHeight: 1.1,
                            marginBottom: '1.5rem',
                            letterSpacing: '-0.02em'
                        }}
                    >
                        Decode Your{' '}
                        <span
                            style={{
                                background: 'linear-gradient(135deg, #00aaff 0%, #00ffff 100%)',
                                WebkitBackgroundClip: 'text',
                                WebkitTextFillColor: 'transparent',
                                backgroundClip: 'text'
                            }}
                        >
                            Content DNA
                        </span>
                    </h1>

                    {/* Subheadline */}
                    <p
                        style={{
                            fontSize: 'clamp(1.1rem, 2.5vw, 1.4rem)',
                            color: '#a0a0a0',
                            maxWidth: '650px',
                            margin: '0 auto 2.5rem',
                            lineHeight: 1.6
                        }}
                    >
                        Stop guessing what works. Our AI analyzes your unique goals to reverse-engineer a content strategy that actually converts.
                    </p>

                    {/* CTA Button */}
                    <motion.button
                        onClick={onStart}
                        whileHover={{ scale: 1.05, y: -3 }}
                        whileTap={{ scale: 0.98 }}
                        style={{
                            background: 'linear-gradient(135deg, #00aaff 0%, #0088cc 100%)',
                            color: 'white',
                            fontSize: '1.3rem',
                            fontWeight: 700,
                            padding: '1.2rem 3.5rem',
                            borderRadius: '14px',
                            border: 'none',
                            cursor: 'pointer',
                            boxShadow: '0 10px 50px rgba(0,170,255,0.4), 0 0 0 3px rgba(0,170,255,0.15)',
                            marginBottom: '2rem'
                        }}
                    >
                        Start My Free Audit →
                    </motion.button>

                    {/* Social Proof */}
                    <div
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            gap: '12px',
                            marginBottom: '3rem'
                        }}
                    >
                        <div style={{ display: 'flex' }}>
                            {[1, 2, 3, 4].map((i) => (
                                <div
                                    key={i}
                                    style={{
                                        width: '32px',
                                        height: '32px',
                                        borderRadius: '50%',
                                        backgroundColor: '#3a3a45',
                                        border: '2px solid #0d0d12',
                                        marginLeft: i > 1 ? '-8px' : 0
                                    }}
                                />
                            ))}
                        </div>
                        <span style={{ color: '#888', fontSize: '15px' }}>
                            Trusted by <span style={{ color: 'white', fontWeight: 600 }}>12,000+ Creators</span>
                        </span>
                    </div>

                    {/* Stats Row */}
                    <div
                        style={{
                            display: 'flex',
                            justifyContent: 'center',
                            gap: '4rem',
                            borderTop: '1px solid #2a2a35',
                            paddingTop: '2rem',
                            flexWrap: 'wrap'
                        }}
                    >
                        {[
                            { value: '2 Min', label: 'Analysis' },
                            { value: '100%', label: 'Personalized' },
                            { value: 'Free', label: 'Report' }
                        ].map((stat) => (
                            <div key={stat.label} style={{ textAlign: 'center' }}>
                                <div style={{ fontSize: '2rem', fontWeight: 700, color: 'white' }}>
                                    {stat.value}
                                </div>
                                <div style={{ fontSize: '0.85rem', color: '#666', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
                                    {stat.label}
                                </div>
                            </div>
                        ))}
                    </div>
                </motion.div>
            </div>

            {/* Pulse Animation Keyframes */}
            <style jsx global>{`
                @keyframes pulse {
                    0%, 100% { opacity: 1; }
                    50% { opacity: 0.5; }
                }
            `}</style>
        </section>
    );
}
