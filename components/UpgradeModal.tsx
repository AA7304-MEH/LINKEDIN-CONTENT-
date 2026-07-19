"use client";

import { useState, useEffect } from 'react';
import styles from './UpgradeModal.module.css';
import toast from 'react-hot-toast';

interface UpgradeModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function UpgradeModal({ isOpen, onClose }: UpgradeModalProps) {
    const [loading, setLoading] = useState(false);

    // Dynamic PayPal SDK Loader & button renderer
    useEffect(() => {
        if (!isOpen) return;

        let paypalInitialized = false;

        const loadPaypalScript = () => {
            const clientId = process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID || 'sb';
            
            // Check if script is already present
            const existingScript = document.getElementById('paypal-sdk-script');
            if (existingScript) {
                // If script exists, check if loaded or reload buttons
                if ((window as any).paypal) {
                    renderPaypalButtons();
                } else {
                    existingScript.addEventListener('load', renderPaypalButtons);
                }
                return;
            }

            const script = document.createElement("script");
            script.id = 'paypal-sdk-script';
            script.src = `https://www.paypal.com/sdk/js?client-id=${clientId}&currency=USD`;
            script.onload = () => {
                renderPaypalButtons();
            };
            document.body.appendChild(script);
        };

        const renderPaypalButtons = () => {
            if (paypalInitialized) return;
            const container = document.getElementById('paypal-button-container');
            if (!container) return;

            container.innerHTML = ''; // clear previous buttons if any

            if ((window as any).paypal) {
                try {
                    (window as any).paypal.Buttons({
                        style: {
                            layout: 'vertical',
                            color: 'gold',
                            shape: 'rect',
                            label: 'paypal',
                            height: 40
                        },
                        createOrder: function(data: any, actions: any) {
                            return actions.order.create({
                                purchase_units: [{
                                    description: "Resodin Pro Creator Plan",
                                    amount: {
                                        currency_code: 'USD',
                                        value: '19.00'
                                    }
                                }]
                            });
                        },
                        onApprove: async function(data: any, actions: any) {
                            setLoading(true);
                            try {
                                const details = await actions.order.capture();
                                
                                const verifyRes = await fetch('/api/verify-payment', {
                                    method: 'POST',
                                    headers: { 'Content-Type': 'application/json' },
                                    body: JSON.stringify({
                                        orderCreationId: data.orderID,
                                        razorpayPaymentId: details.id,
                                        razorpaySignature: 'paypal_verified',
                                        plan: 'PRO'
                                    })
                                });

                                const verifyData = await verifyRes.json();
                                if (verifyData.success) {
                                    toast.success('Successfully upgraded to Pro with PayPal!');
                                    window.location.reload();
                                } else {
                                    toast.error('Payment verification failed.');
                                }
                            } catch (err) {
                                console.error("PayPal capture error:", err);
                                toast.error('Payment capture failed.');
                            } finally {
                                setLoading(false);
                            }
                        },
                        onError: function(err: any) {
                            console.error("PayPal error:", err);
                        }
                    }).render('#paypal-button-container');
                    paypalInitialized = true;
                } catch (e) {
                    console.error("Error rendering PayPal buttons:", e);
                }
            }
        };

        const timer = setTimeout(loadPaypalScript, 200);
        return () => clearTimeout(timer);
    }, [isOpen]);

    if (!isOpen) return null;

    const handleUpgrade = async () => {
        setLoading(true);
        try {
            const isSandboxMode = typeof window !== 'undefined' && new URLSearchParams(window.location.search).get('sandbox') === 'true';

            const response = await fetch('/api/create-order', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ plan: 'PRO', sandbox: isSandboxMode })
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
                    {loading ? 'Processing...' : 'Upgrade with Card / Razorpay'}
                </button>

                <div style={{ margin: '1.25rem 0', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '1rem', opacity: 0.4 }}>
                    <div style={{ height: '1px', background: '#475569', flex: 1 }} />
                    <span style={{ fontSize: '0.75rem', fontWeight: 700, color: '#94a3b8' }}>OR PAYPAL</span>
                    <div style={{ height: '1px', background: '#475569', flex: 1 }} />
                </div>

                <div id="paypal-button-container" style={{ minHeight: '40px', position: 'relative', zIndex: 10 }}></div>
            </div>
        </div>
    );
}
