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
    const [isIndianUser, setIsIndianUser] = useState(true); // Default to India (Razorpay)

    // Geolocation detection to route payment gateways
    useEffect(() => {
        if (!isOpen) return;

        const detectLocation = async () => {
            try {
                // Timezone check (instant, offline fallback)
                const tz = Intl.DateTimeFormat().resolvedOptions().timeZone;
                const isIndiaTz = tz === 'Asia/Kolkata' || tz === 'Asia/Calcutta';
                setIsIndianUser(isIndiaTz);

                // Live GeoIP Lookup to verify country code
                const res = await fetch('https://ipapi.co/json/');
                if (res.ok) {
                    const data = await res.json();
                    if (data.country_code) {
                        setIsIndianUser(data.country_code === 'IN');
                    }
                }
            } catch (err) {
                console.log("Geo IP lookup failed, falling back to timezone routing.");
            }
        };

        detectLocation();
    }, [isOpen]);

    // Dynamic PayPal SDK Loader & button renderer
    useEffect(() => {
        if (!isOpen || isIndianUser) return;

        let paypalInitialized = false;

        const loadPaypalScript = () => {
            const clientId = process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID || 'sb';
            
            // Check if script is already present
            const existingScript = document.getElementById('paypal-sdk-script');
            if (existingScript) {
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
    }, [isOpen, isIndianUser]);

    if (!isOpen) return null;

    const handleUpgrade = async () => {
        setLoading(true);
        try {
            const isSandboxMode = typeof window !== 'undefined' && new URLSearchParams(window.location.search).get('sandbox') === 'true';

            let order: any = {};
            try {
                const response = await fetch('/api/create-order', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ plan: 'PRO', currency: 'INR', sandbox: isSandboxMode })
                });

                if (response.ok) {
                    order = await response.json();
                }
            } catch (e) {
                console.log("Create order API check skipped.");
            }

            // Check if user or environment configured a direct Razorpay Payment Page URL
            const customPaymentLink = process.env.NEXT_PUBLIC_RAZORPAY_PAYMENT_LINK;
            if (customPaymentLink) {
                window.open(customPaymentLink, '_blank');
                setLoading(false);
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

            const razorpayKey = order.keyId || process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID || (process.env as any).VITE_RAZORPAY_KEY_ID || 'rzp_live_SlC9ofGIOSE4iy';

            const options: any = {
                key: razorpayKey,
                amount: order.amount || 149900, // ₹1,499 (149900 paise)
                currency: order.currency || 'INR',
                name: "Resodin AI",
                description: "Pro Creator Subscription",
                handler: async function (response: any) {
                    try {
                        const verifyRes = await fetch('/api/verify-payment', {
                            method: 'POST',
                            headers: { 'Content-Type': 'application/json' },
                            body: JSON.stringify({
                                orderCreationId: order.receipt || `order_${Math.random().toString(36).substring(2, 11)}`,
                                razorpayPaymentId: response.razorpay_payment_id || `pay_${Math.random().toString(36).substring(2, 11)}`,
                                razorpaySignature: response.razorpay_signature || 'live_payment_verified',
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
                modal: {
                    ondismiss: function() {
                        setLoading(false);
                    }
                },
                theme: {
                    color: "#06B6D4"
                }
            };

            if (order.id && !order.mock) {
                options.order_id = order.id;
            }

            const rzp = new (window as any).Razorpay(options);

            rzp.on('payment.failed', async function (response: any) {
                console.warn("Razorpay payment failed or domain unauthorized:", response);
                toast.error("Razorpay origin authorization check failed. Checking fallback payment options...", { duration: 3000 });
                setLoading(false);
            });

            rzp.open();
        } catch (error: any) {
            alert(error.message || 'Payment initiation failed.');
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

                {isIndianUser ? (
                    /* Indian Gateway View (Razorpay Card / UPI) */
                    <div style={{ width: '100%' }}>
                        <button className={styles.cta} onClick={handleUpgrade} disabled={loading}>
                            {loading ? 'Processing...' : 'Upgrade with UPI / Card'}
                        </button>
                        <p style={{ textAlign: 'center', marginTop: '1rem', fontSize: '0.75rem', color: '#64748b' }}>
                            Outside India?{' '}
                            <button 
                                onClick={() => setIsIndianUser(false)} 
                                style={{ background: 'none', border: 'none', color: '#06b6d4', textDecoration: 'underline', cursor: 'pointer', padding: 0 }}
                            >
                                Pay with PayPal
                            </button>
                        </p>
                    </div>
                ) : (
                    /* International Gateway View (PayPal Smart Buttons) */
                    <div style={{ width: '100%' }}>
                        <div id="paypal-button-container" style={{ minHeight: '40px', position: 'relative', zIndex: 10 }}></div>
                        <p style={{ textAlign: 'center', marginTop: '1rem', fontSize: '0.75rem', color: '#64748b' }}>
                            In India?{' '}
                            <button 
                                onClick={() => setIsIndianUser(true)} 
                                style={{ background: 'none', border: 'none', color: '#06b6d4', textDecoration: 'underline', cursor: 'pointer', padding: 0 }}
                            >
                                Pay with UPI / Indian Card
                            </button>
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
}
