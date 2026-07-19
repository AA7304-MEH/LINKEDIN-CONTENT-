import { NextRequest, NextResponse } from 'next/server';
import Razorpay from 'razorpay';
import { getSessionUser } from '@/lib/security/authz';

export async function POST(req: NextRequest) {
    try {
        const sessionUser = await getSessionUser();
        if (!sessionUser) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }
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

        // If credentials are not configured or are placeholder, return sandbox mock order directly
        const hasCredentials = process.env.RAZORPAY_KEY_ID && 
                               process.env.RAZORPAY_KEY_SECRET && 
                               process.env.RAZORPAY_KEY_ID !== 'rzp_test_placeholder';

        if (!hasCredentials) {
            console.log("Razorpay credentials missing/placeholder. Returning Sandbox Mock order.");
            return NextResponse.json({
                id: `order_mock_${Math.random().toString(36).substring(2, 11)}`,
                amount: options.amount,
                currency: options.currency,
                receipt: options.receipt,
                mock: true
            });
        }

        try {
            const razorpay = new Razorpay({
                key_id: process.env.RAZORPAY_KEY_ID || '',
                key_secret: process.env.RAZORPAY_KEY_SECRET || '',
            });
            const order = await razorpay.orders.create(options);
            return NextResponse.json(order);
        } catch (apiError: any) {
            console.error("Razorpay API order creation failed, falling back to Sandbox Mock order:", apiError);
            return NextResponse.json({
                id: `order_mock_${Math.random().toString(36).substring(2, 11)}`,
                amount: options.amount,
                currency: options.currency,
                receipt: options.receipt,
                mock: true,
                warning: apiError?.error?.description || apiError?.message || "Authentication failed"
            });
        }
    } catch (error: any) {
        console.error('Error in create-order endpoint:', error);
        return NextResponse.json(
            { error: error?.message || 'Error processing request' },
            { status: 500 }
        );
    }
}
