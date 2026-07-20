import { NextResponse } from 'next/server';

export async function GET() {
    return NextResponse.json({
        RAZORPAY_KEY_ID: process.env.RAZORPAY_KEY_ID 
            ? `${process.env.RAZORPAY_KEY_ID.substring(0, 8)}... (len: ${process.env.RAZORPAY_KEY_ID.length})` 
            : 'MISSING',
        NEXT_PUBLIC_RAZORPAY_KEY_ID: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID 
            ? `${process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID.substring(0, 8)}... (len: ${process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID.length})` 
            : 'MISSING',
        VITE_RAZORPAY_KEY_ID: process.env.VITE_RAZORPAY_KEY_ID 
            ? `${process.env.VITE_RAZORPAY_KEY_ID.substring(0, 8)}... (len: ${process.env.VITE_RAZORPAY_KEY_ID.length})` 
            : 'MISSING',
        RAZORPAY_KEY_SECRET: process.env.RAZORPAY_KEY_SECRET 
            ? `PRESENT (len: ${process.env.RAZORPAY_KEY_SECRET.length})` 
            : 'MISSING'
    });
}
