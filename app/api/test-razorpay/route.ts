import { NextResponse } from 'next/server';
import Razorpay from 'razorpay';

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

export async function GET() {
    const keyId = getKeyId();
    const keySecret = getKeySecret();

    try {
        const razorpay = new Razorpay({
            key_id: keyId,
            key_secret: keySecret,
        });

        // Attempt a basic test order creation
        const order = await razorpay.orders.create({
            amount: 100, // 1 INR (100 paise)
            currency: 'INR',
            receipt: `test_receipt_${Date.now()}`
        });

        return NextResponse.json({
            success: true,
            message: "Razorpay successfully authenticated and created a Live order!",
            orderId: order.id,
            key_id_used: keyId
        });
    } catch (err: any) {
        console.error("Direct Razorpay test failed:", err);
        return NextResponse.json({
            success: false,
            error_message: err?.message || "Unknown error",
            error_details: err?.error || err,
            keys_used: {
                key_id: `${keyId.substring(0, 8)}... (length: ${keyId.length})`,
                key_secret: `PRESENT (length: ${keySecret.length})`
            }
        });
    }
}
