import { NextRequest, NextResponse } from 'next/server';
import Razorpay from 'razorpay';
import { getSessionUser } from '@/lib/security/authz';

const getKeyId = () => {
    const keys = [
        process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
        process.env.RAZORPAY_KEY_ID,
        process.env.VITE_RAZORPAY_KEY_ID,
        'rzp_live_TGapFevpWRxIzW'
    ];
    for (const k of keys) {
        if (k && k.trim().length > 0) return k.trim();
    }
    return 'rzp_live_TGapFevpWRxIzW';
};

const getKeySecret = () => {
    const secrets = [
        process.env.RAZORPAY_KEY_SECRET,
        'dCfaOk0c29AYNu8SUWam9vHp'
    ];
    for (const s of secrets) {
        if (s && s.trim().length > 0) return s.trim();
    }
    return 'dCfaOk0c29AYNu8SUWam9vHp';
};

export async function POST(req: NextRequest) {
    try {
        const sessionUser = await getSessionUser();
        const userId = sessionUser?.id || "user_public_demo_testing";
        const { amount, currency = 'INR', plan, sandbox } = await req.json();

        // Default to INR for Indian Razorpay gateway compatibility
        let finalAmountInUnits = 149900; // ₹1,499/mo (149900 paise)
        const targetCurrency = currency || 'INR';

        if (targetCurrency === 'USD') {
            if (plan === 'PRO') finalAmountInUnits = 1900; // $19.00 (1900 cents)
            if (plan === 'BUSINESS' || plan === 'Business') finalAmountInUnits = 4900; // $49.00 (4900 cents)
        } else {
            if (plan === 'PRO') finalAmountInUnits = 149900; // ₹1,499
            if (plan === 'BUSINESS' || plan === 'Business') finalAmountInUnits = 399900; // ₹3,999
        }

        const options = {
            amount: finalAmountInUnits,
            currency: targetCurrency,
            receipt: `receipt_${Date.now()}`,
        };

        if (sandbox) {
            console.log("Forced Sandbox Mode requested. Returning Mock order.");
            return NextResponse.json({
                id: `order_mock_${Math.random().toString(36).substring(2, 11)}`,
                amount: options.amount,
                currency: options.currency,
                receipt: options.receipt,
                mock: true
            });
        }

        const keyId = getKeyId();
        const keySecret = getKeySecret();

        // Server-side live Razorpay order creation
        if (keyId && keySecret) {
            try {
                const razorpay = new Razorpay({
                    key_id: keyId,
                    key_secret: keySecret,
                });
                const order = await razorpay.orders.create(options);
                return NextResponse.json({
                    ...order,
                    keyId: keyId
                });
            } catch (apiError: any) {
                console.warn("Server order creation warning:", apiError?.error?.description || apiError?.message);
            }
        }

        // Return client checkout options directly with public Key ID
        return NextResponse.json({
            keyId: keyId,
            amount: options.amount,
            currency: options.currency,
            receipt: options.receipt
        });
    } catch (error: any) {
        console.error('Error in create-order endpoint:', error);
        return NextResponse.json(
            { error: error?.message || 'Error processing request' },
            { status: 500 }
        );
    }
}
