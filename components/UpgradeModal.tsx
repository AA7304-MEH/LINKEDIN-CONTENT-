"use client";

import { useState } from 'react';
import styles from './UpgradeModal.module.css';
import toast from 'react-hot-toast';

interface UpgradeModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function UpgradeModal({ isOpen, onClose }: UpgradeModalProps) {
    const [loading, setLoading] = useState(false);

    if (!isOpen) return null;

    const handleUpgrade = async () => {
        setLoading(true);
        try {
            const response = await fetch('/api/create-order', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ plan: 'PRO' })
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || 'Failed to create order');
            }

            const order = await response.json();

            // Handle sandbox mock bypass if credentials failed API check
            if (order.mock) {
                toast.success(
                    order.warning 
                        ? `Sandbox Mode (${order.warning}). Upgrading automatically...` 
                        : "Sandbox Mode: Simulating checkout payment...",
                    { duration: 4000 }
                );

                await new Promise((resolve) => setTimeout(resolve, 1500));

                const verifyRes = await fetch('/api/verify-payment', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        orderCreationId: order.id,
                        razorpayPaymentId: `pay_mock_${Math.random().toString(36).substring(2, 11)}`,
                        razorpaySignature: 'mock_signature',
                        plan: 'PRO'
                    })
                });

                const data = await verifyRes.json();
                if (data.success) {
                    toast.success('Successfully upgraded to Pro!');
                    window.location.reload();
                } else {
                    throw new Error('Sandbox verification failed.');
                }
                return;
            }

            // Load real Razorpay script dynamically
            const loadScript = () => {
                return new Promise((resolve) => {
                    const script = document.createElement("script");
                    script.src = "https://checkout.razorpay.com/v1/checkout.js";
                    script.onload = () => resolve(true);
                    script.onerror = () => resolve(false);
                    document.body.appendChild(script);
                });
            };

            const isLoaded = await loadScript();
            if (!isLoaded) {
                alert("Razorpay SDK failed to load. Are you online?");
                setLoading(false);
                return;
            }

            const options = {
                key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID || 'rzp_test_placeholder',
                amount: order.amount,
                currency: order.currency,
                name: "Resodin AI",
                description: "Pro Monthly Subscription",
                order_id: order.id,
                handler: async function (response: any) {
                    try {
                        const verifyRes = await fetch('/api/verify-payment', {
                            method: 'POST',
                            headers: { 'Content-Type': 'application/json' },
                            body: JSON.stringify({
                                orderCreationId: order.id,
                                razorpayPaymentId: response.razorpay_payment_id,
                                razorpaySignature: response.razorpay_signature,
                                plan: 'PRO'
                            })
                        });

                        const data = await verifyRes.json();
                        if (data.success) {
                            toast.success(`Success! Welcome to Resodin Pro.`);
                            window.location.reload();
                        } else {
                            alert('Verification failed.');
                        }
                    } catch (err) {
                        alert('Verification failed.');
                    }
                },
                theme: {
                    color: "#06B6D4"
                }
            };

            const rzp = new (window as any).Razorpay(options);
            rzp.open();
        } catch (error: any) {
            alert(error.message || 'Payment initiation failed.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className={styles.overlay}>
            <div className={styles.modal}>
                <button className={styles.closeBtn} onClick={onClose}>✕</button>
                <div className={styles.badge}>PRO FEATURE</div>
                <h2 className={styles.title}>Upgrade to unlock premium features 🎉</h2>
                <p className={styles.desc}>
                    Get unlimited AI generations, Voice DNA profile card, weekly growth summaries, advanced analytics, and custom post scheduling.
                </p>
                <button className={styles.cta} onClick={handleUpgrade} disabled={loading}>
                    {loading ? 'Processing...' : 'Upgrade to Pro — $19/month'}
                </button>
            </div>
        </div>
    );
}
