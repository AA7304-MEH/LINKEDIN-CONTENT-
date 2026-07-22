import { NextRequest, NextResponse } from 'next/server';
import Razorpay from 'razorpay';
import { getSessionUser } from '@/lib/security/authz';

export async function POST(req: NextRequest) {
    try {
        const sessionUser = await getSessionUser();
        // Allow public order creation for Razorpay verification checkers
        const userId = sessionUser?.id || "user_public_demo_testing";
        const { amount, currency = 'USD', plan, sandbox } = await req.json();

        let finalAmount = amount;
        if (plan === 'PRO') {
            finalAmount = 19;
        } else if (plan === 'BUSINESS' || plan === 'Business') {
            finalAmount = 49;
        }

        if (!finalAmount) {
            return NextResponse.json({ error: 'Amount or plan is required' }, { status: 400 });
        }

        const options = {
            amount: finalAmount * 100, // amount in smallest currency unit
            currency,
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

        const keyId = (process.env.RAZORPAY_KEY_ID || process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID || process.env.VITE_RAZORPAY_KEY_ID || 'rzp_live_SlC9ofGIOSE4iy').trim();

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
