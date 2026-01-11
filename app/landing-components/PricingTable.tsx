"use client";

import { useEffect } from 'react';
import Link from 'next/link';
import Script from 'next/script';
import styles from './PricingTable.module.css';

declare global {
    interface Window {
        Razorpay: any;
    }
}

export default function PricingTable() {
    const handlePayment = async (plan: string, amount: number) => {
        try {
            // 1. Create Order
            const response = await fetch('/api/create-order', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ amount, currency: 'USD' }),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || 'Network response was not ok');
            }

            const order = await response.json();

            // 2. Initialize Razorpay
            const options = {
                key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID, // Enter the Key ID generated from the Dashboard
                amount: order.amount,
                currency: order.currency,
                name: "Resonate AI",
                description: `${plan} Subscription`,
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
                                plan: plan
                            })
                        });

                        const data = await verifyRes.json();
                        if (data.success) {
                            alert(`Payment Successful! You are now on the ${plan} plan.`);
                            // Force reload to update UI/Limit state
                            window.location.href = '/dashboard';
                        } else {
                            alert('Payment verification failed. Please contact support.');
                        }
                    } catch (err) {
                        console.error('Verification error', err);
                        alert('Payment verification failed.');
                    }
                },
                prefill: {
                    name: "User Name",
                    email: "user@example.com",
                    contact: "9999999999"
                },
                theme: {
                    color: "#0077B5"
                }
            };

            const rzp1 = new window.Razorpay(options);
            rzp1.on('payment.failed', function (response: any) {
                alert(response.error.description);
            });
            rzp1.open();

        } catch (error: any) {
            console.error('Payment Error:', error);
            alert(`Payment Failed: ${error.message || 'Please check your configuration.'}`);
        }
    };

    return (
        <section className={styles.section} id="pricing">
            <Script src="https://checkout.razorpay.com/v1/checkout.js" />
            <div className={styles.container}>
                <h2 className={styles.title}>Simple Pricing for Serious Growth</h2>

                <div className={styles.grid}>
                    {/* Free Tier */}
                    <div className={styles.card}>
                        <h3 className={styles.planName}>Free Starter</h3>
                        <div className={styles.price}>
                            $0<span>/mo</span>
                        </div>
                        <ul className={styles.features}>
                            <li className={styles.feature}>
                                <span className={styles.check}>✓</span> 5 posts per month
                            </li>
                            <li className={styles.feature}>
                                <span className={styles.check}>✓</span> Basic hook generator
                            </li>
                            <li className={styles.feature}>
                                <span className={styles.check}>✓</span> Standard post templates
                            </li>
                        </ul>
                        <Link href="/sign-up" className={`${styles.button} ${styles.buttonOutline}`}>
                            Start for Free
                        </Link>
                    </div>

                    {/* Pro Tier - Highlighted */}
                    <div className={`${styles.card} ${styles.popular}`}>
                        <div className={styles.badge}>MOST POPULAR</div>
                        <h3 className={styles.planName}>Pro Creator</h3>
                        <div className={styles.price}>
                            $19<span>/mo</span>
                        </div>
                        <div className={styles.trialInfo} style={{ color: '#059669', fontSize: '1rem', marginBottom: '1rem', fontWeight: 'bold' }}>
                            Start with 14-Day Free Trial
                        </div>
                        <ul className={styles.features}>
                            <li className={styles.feature}>
                                <span className={styles.check}>✓</span> Unlimited posts
                            </li>
                            <li className={styles.feature}>
                                <span className={styles.check}>✓</span> Advanced AI Voice DNA
                            </li>
                            <li className={styles.feature}>
                                <span className={styles.check}>✓</span> Viral Hook Engine access
                            </li>
                            <li className={styles.feature}>
                                <span className={styles.check}>✓</span> Content repurposing
                            </li>
                        </ul>
                        <Link
                            href="/sign-up?plan=pro"
                            className={`${styles.button} ${styles.buttonFilled}`}
                        >
                            Start 14-Day Free Trial
                        </Link>
                        <p style={{ fontSize: '0.8rem', color: '#666', marginTop: '0.5rem' }}>No credit card required for trial.</p>
                    </div>

                    {/* Business Tier */}
                    <div className={styles.card}>
                        <h3 className={styles.planName}>Business</h3>
                        <div className={styles.price}>
                            $99<span>/mo</span>
                        </div>
                        <ul className={styles.features}>
                            <li className={styles.feature}>
                                <span className={styles.check}>✓</span> Everything in Pro
                            </li>
                            <li className={styles.feature}>
                                <span className={styles.check}>✓</span> 5 Team members
                            </li>
                            <li className={styles.feature}>
                                <span className={styles.check}>✓</span> Collaborative workflow
                            </li>
                            <li className={styles.feature}>
                                <span className={styles.check}>✓</span> Priority support
                            </li>
                        </ul>
                        <button
                            onClick={() => handlePayment('Business', 99)}
                            className={`${styles.button} ${styles.buttonOutline}`}
                        >
                            Contact Sales
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
}
