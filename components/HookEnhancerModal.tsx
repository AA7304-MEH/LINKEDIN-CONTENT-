"use client";

interface HookVariation {
    hookText: string;
    explanation: string;
    estimatedScore: number;
}

interface HookEnhancerModalProps {
    isOpen: boolean;
    onClose: () => void;
    variations: HookVariation[];
    originalHook?: string;
    isHighOriginalScore?: boolean;
    onApplyHook: (newHookText: string) => void;
}

export default function HookEnhancerModal({
    isOpen,
    onClose,
    variations,
    originalHook,
    isHighOriginalScore,
    onApplyHook,
}: HookEnhancerModalProps) {
    if (!isOpen) return null;

    return (
        <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'rgba(0, 0, 0, 0.85)',
            backdropFilter: 'blur(8px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 10000,
            padding: '1rem'
        }}>
            <div style={{
                background: '#0f172a',
                border: '1px solid #334155',
                borderRadius: '24px',
                maxWidth: '620px',
                width: '100%',
                maxHeight: '90vh',
                overflowY: 'auto',
                padding: '2rem',
                position: 'relative',
                boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.6)'
            }}>
                <button
                    onClick={onClose}
                    style={{
                        position: 'absolute',
                        top: '1.25rem',
                        right: '1.25rem',
                        background: 'transparent',
                        border: 'none',
                        color: '#94a3b8',
                        fontSize: '1.25rem',
                        cursor: 'pointer'
                    }}
                >
                    ✕
                </button>

                <div style={{
                    display: 'inline-block',
                    background: 'rgba(6, 182, 212, 0.1)',
                    color: '#06b6d4',
                    fontSize: '0.75rem',
                    fontWeight: 700,
                    padding: '0.3rem 0.8rem',
                    borderRadius: '9999px',
                    marginBottom: '1rem',
                    border: '1px solid rgba(6, 182, 212, 0.2)',
                    letterSpacing: '0.05em'
                }}>
                    ⚡ AI HOOK ENHANCER
                </div>

                <h2 style={{ color: '#fff', fontSize: '1.5rem', fontWeight: 800, marginBottom: '0.5rem' }}>
                    3 High-Converting Hook Variations
                </h2>

                <p style={{ color: '#94a3b8', fontSize: '0.9rem', marginBottom: '1.5rem', lineHeight: 1.5 }}>
                    {isHighOriginalScore
                        ? "Your current hook is already strong! Here are 3 sharper variations to test:"
                        : "Select an optimized opening line to boost curiosity, stopping power, and mobile dwell time:"}
                </p>

                {originalHook && (
                    <div style={{
                        background: '#1e293b',
                        border: '1px dashed #475569',
                        borderRadius: '12px',
                        padding: '0.85rem 1rem',
                        marginBottom: '1.5rem',
                        fontSize: '0.85rem',
                        color: '#cbd5e1'
                    }}>
                        <span style={{ color: '#94a3b8', fontSize: '0.75rem', fontWeight: 700, display: 'block', marginBottom: '0.2rem' }}>
                            CURRENT OPENING HOOK:
                        </span>
                        &ldquo;{originalHook}&rdquo;
                    </div>
                )}

                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    {variations.map((item, idx) => (
                        <div
                            key={idx}
                            style={{
                                background: '#1e293b',
                                border: '1px solid #334155',
                                borderRadius: '16px',
                                padding: '1.25rem',
                                transition: 'all 0.2s',
                                display: 'flex',
                                flexDirection: 'column',
                                gap: '0.75rem'
                            }}
                        >
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <span style={{
                                    background: 'rgba(34, 197, 94, 0.15)',
                                    color: '#22c55e',
                                    border: '1px solid rgba(34, 197, 94, 0.3)',
                                    fontSize: '0.75rem',
                                    fontWeight: 800,
                                    padding: '0.2rem 0.6rem',
                                    borderRadius: '9999px'
                                }}>
                                    Estimated Score: {item.estimatedScore} / 10
                                </span>
                                <span style={{ color: '#64748b', fontSize: '0.75rem', fontWeight: 600 }}>
                                    Option {idx + 1}
                                </span>
                            </div>

                            <p style={{
                                color: '#f8fafc',
                                fontSize: '1rem',
                                fontWeight: 700,
                                lineHeight: 1.4,
                                margin: 0,
                                whiteSpace: 'pre-line'
                            }}>
                                {item.hookText}
                            </p>

                            <p style={{
                                color: '#94a3b8',
                                fontSize: '0.8rem',
                                lineHeight: 1.4,
                                margin: 0,
                                fontStyle: 'italic',
                                background: 'rgba(15, 23, 42, 0.5)',
                                padding: '0.5rem 0.75rem',
                                borderRadius: '8px'
                            }}>
                                💡 {item.explanation}
                            </p>

                            <button
                                onClick={() => {
                                    onApplyHook(item.hookText);
                                    onClose();
                                }}
                                style={{
                                    width: '100%',
                                    background: '#06b6d4',
                                    color: '#0f172a',
                                    fontWeight: 700,
                                    padding: '0.65rem',
                                    borderRadius: '10px',
                                    border: 'none',
                                    fontSize: '0.9rem',
                                    cursor: 'pointer',
                                    marginTop: '0.25rem',
                                    transition: 'all 0.2s'
                                }}
                            >
                                Apply This Hook to Post →
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
