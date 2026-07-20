import { NextResponse } from 'next/server';
import Razorpay from 'razorpay';

export async function GET() {
    const keyId = (process.env.RAZORPAY_KEY_ID || process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID || process.env.VITE_RAZORPAY_KEY_ID || '').trim();
    const keySecret = (process.env.RAZORPAY_KEY_SECRET || '').trim();

    if (!keyId || !keySecret) {
        return NextResponse.json({
            success: false,
            error: "Environment variables are missing or empty on Vercel."
        });
    }

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
            orderId: order.id
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
