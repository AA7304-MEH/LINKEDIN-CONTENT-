import { NextResponse } from 'next/server';
import Razorpay from 'razorpay';

const getKeyId = () => {
    const envKey = process.env.RAZORPAY_KEY_ID || process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID || process.env.VITE_RAZORPAY_KEY_ID;
    if (envKey && envKey.trim().length > 0 && envKey.trim().startsWith('rzp_live_TGap')) {
        return envKey.trim();
    }
    return 'rzp_live_TGapFevpWRxIzW';
};

const getKeySecret = () => {
    const envSecret = process.env.RAZORPAY_KEY_SECRET;
    if (envSecret && envSecret.trim().length > 0 && envSecret.trim().startsWith('dCfa')) {
        return envSecret.trim();
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
