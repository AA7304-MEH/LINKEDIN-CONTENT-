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
    const [selectedGateway, setSelectedGateway] = useState<'razorpay' | 'paypal'>('razorpay');

    // Geolocation detection to route payment gateways automatically
    useEffect(() => {
        if (!isOpen) return;

        const detectLocation = async () => {
            try {
                // Timezone check (instant, offline fallback)
                const tz = Intl.DateTimeFormat().resolvedOptions().timeZone;
                const isIndiaTz = tz === 'Asia/Kolkata' || tz === 'Asia/Calcutta';
                setSelectedGateway(isIndiaTz ? 'razorpay' : 'paypal');

                // Live GeoIP Lookup to verify country code
                const res = await fetch('https://ipapi.co/json/');
                if (res.ok) {
                    const data = await res.json();
                    if (data.country_code) {
                        setSelectedGateway(data.country_code === 'IN' ? 'razorpay' : 'paypal');
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
        if (!isOpen || selectedGateway !== 'paypal') return;

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
                            height: 44
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
    }, [isOpen, selectedGateway]);

    if (!isOpen) return null;

    const handleRazorpayUpgrade = async () => {
        setLoading(true);
        try {
            const isSandboxMode = typeof window !== 'undefined' && new URLSearchParams(window.location.search).get('sandbox') === 'true';

            const response = await fetch('/api/create-order', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ plan: 'PRO', currency: 'INR', sandbox: isSandboxMode })
            });

            if (!response.ok) {
                const errorData = await response.json().catch(() => ({}));
                toast.error(errorData.error || 'Failed to create payment order');
                setLoading(false);
                return;
            }

            const order = await response.json();

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

            const razorpayKey = (order.keyId || 'rzp_live_TGapFevpWRxIzW').trim();

            const options: any = {
                key: razorpayKey,
                order_id: order.id,
                name: "Resodin AI",
                description: "Pro Creator Subscription",
                handler: async function (response: any) {
                    try {
                        const verifyRes = await fetch('/api/verify-payment', {
                            method: 'POST',
                            headers: { 'Content-Type': 'application/json' },
                            body: JSON.stringify({
                                orderCreationId: response.razorpay_order_id || order.id,
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
                            toast.error('Payment verification failed.');
                        }
                    } catch (err) {
                        toast.error('Payment verification failed.');
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

            // If sandbox mock order
            if (order.mock) {
                delete options.order_id;
                options.amount = order.amount || 149900;
                options.currency = order.currency || 'INR';
            }

            const rzp = new (window as any).Razorpay(options);

            rzp.on('payment.failed', async function (response: any) {
                console.warn("Razorpay payment failed:", response);
                toast.error(response?.error?.description || "Payment failed or cancelled.", { duration: 4000 });
                setLoading(false);
            });

            rzp.open();
        } catch (error: any) {
            toast.error(error.message || 'Payment initiation failed.');
            setLoading(false);
        }
    };

    return (
        <div className={styles.overlay}>
            <div className={styles.modal}>
                <button className={styles.closeBtn} onClick={onClose}>✕</button>
                <div className={styles.badge}>PRO CREATOR PLAN</div>
                <h2 className={styles.title}>Upgrade to Unlock Full AI Access 🎉</h2>
                <p className={styles.desc}>
                    Get unlimited AI post generations, Voice DNA profile card, weekly growth summaries, advanced analytics, and custom post scheduling.
                </p>

                {/* Gateway Selector Tabs */}
                <div className={styles.tabsContainer}>
                    <button 
                        className={`${styles.tabBtn} ${selectedGateway === 'razorpay' ? styles.tabBtnActive : ''}`}
                        onClick={() => setSelectedGateway('razorpay')}
                    >
                        <span>🇮🇳 Razorpay</span>
                        <span className={styles.tabSub}>UPI & Indian Cards</span>
                        <span className={styles.recBadge}>Recommended</span>
                    </button>
                    <button 
                        className={`${styles.tabBtn} ${selectedGateway === 'paypal' ? styles.tabBtnActive : ''}`}
                        onClick={() => setSelectedGateway('paypal')}
                    >
                        <span>🌎 PayPal</span>
                        <span className={styles.tabSub}>International Cards</span>
                    </button>
                </div>

                {selectedGateway === 'razorpay' ? (
                    /* Indian Gateway View (Razorpay Card / UPI) */
                    <div style={{ width: '100%' }}>
                        <div className={styles.gatewayBox}>
                            <div className={styles.gatewayHeader}>
                                <span className={styles.gatewayTitle}>⚡ Instant UPI & Cards</span>
                                <span className={styles.gatewayPrice}>₹1,499<small style={{ fontSize: '0.7rem', color: '#94a3b8' }}>/mo</small></span>
                            </div>
                            <div className={styles.supportedMethods}>
                                <span className={styles.methodPill}>🟢 Google Pay</span>
                                <span className={styles.methodPill}>🟣 PhonePe</span>
                                <span className={styles.methodPill}>🔵 Paytm / BHIM</span>
                                <span className={styles.methodPill}>💳 Debit & Credit Cards</span>
                                <span className={styles.methodPill}>🏦 Netbanking</span>
                            </div>
                        </div>

                        <button className={styles.cta} onClick={handleRazorpayUpgrade} disabled={loading}>
                            {loading ? 'Processing...' : 'Pay ₹1,499 with Razorpay (UPI / Card)'}
                        </button>
                    </div>
                ) : (
                    /* International Gateway View (PayPal Smart Buttons) */
                    <div style={{ width: '100%' }}>
                        <div className={styles.gatewayBox}>
                            <div className={styles.gatewayHeader}>
                                <span className={styles.gatewayTitle}>🌎 PayPal Checkout</span>
                                <span className={styles.gatewayPrice}>$19.00<small style={{ fontSize: '0.7rem', color: '#94a3b8' }}>/mo</small></span>
                            </div>
                            <div className={styles.supportedMethods}>
                                <span className={styles.methodPill}>🟡 PayPal Balance</span>
                                <span className={styles.methodPill}>💳 Visa / MasterCard</span>
                                <span className={styles.methodPill}>💳 American Express</span>
                            </div>
                        </div>

                        <div id="paypal-button-container" style={{ minHeight: '44px', position: 'relative', zIndex: 10 }}></div>
                    </div>
                )}

                <p className={styles.footerNote}>
                    🔒 Secure SSL Encrypted Checkout. Cancel anytime with 1-click.
                </p>
            </div>
        </div>
    );
}
