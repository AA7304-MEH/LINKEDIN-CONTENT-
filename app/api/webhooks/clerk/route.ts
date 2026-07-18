import { NextResponse } from 'next/server';
import { sendEmail } from '@/lib/email';

export async function POST(request: Request) {
    try {
        const payload = await request.json();
        
        // Log webhook arrival
        console.log("Clerk webhook event received:", payload?.type);

        // Check if the event is user.created
        if (payload?.type === 'user.created') {
            const data = payload.data;
            const primaryEmailObj = data.email_addresses?.find(
                (email: any) => email.id === data.primary_email_address_id
            ) || data.email_addresses?.[0];

            const email = primaryEmailObj?.email_address;
            const name = data.first_name || 'there';

            if (email) {
                console.log(`Sending welcome email to ${email}`);
                
                const welcomeHtml = `
                    <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #0b0f19; color: #f3f4f6; border-radius: 12px; border: 1px solid #1f2937;">
                        <h2 style="color: #00E5FF; text-align: center; font-size: 24px; margin-bottom: 20px;">Welcome to Resodin AI, ${name}!</h2>
                        
                        <p style="font-size: 16px; line-height: 1.6; color: #d1d5db;">
                            We're thrilled to help you grow your personal brand and build LinkedIn authority with AI that actually sounds like you.
                        </p>
                        
                        <div style="background-color: #111827; padding: 20px; border-radius: 8px; margin: 24px 0; border: 1px solid #374151;">
                            <h3 style="color: #ffffff; margin-top: 0; font-size: 18px;">🚀 Quick Start Guide</h3>
                            <ol style="padding-left: 20px; margin-bottom: 0; color: #9ca3af; line-height: 1.8;">
                                <li>
                                    <strong style="color: #f3f4f6;">Complete Onboarding:</strong> Teach our AI your unique voice by pasting past posts. 
                                    <a href="https://resodin.vercel.app/onboarding" style="color: #00E5FF; text-decoration: underline;">Build Voice DNA Report</a>
                                </li>
                                <li>
                                    <strong style="color: #f3f4f6;">Generate Your First Post:</strong> Enter a topic, select your tone, and generate a post in seconds.
                                    <a href="https://resodin.vercel.app/dashboard" style="color: #00E5FF; text-decoration: underline;">Go to Dashboard</a>
                                </li>
                                <li>
                                    <strong style="color: #f3f4f6;">Analyze Your Hook:</strong> Test your opening line to maximize reach before you hit publish.
                                    <a href="https://resodin.vercel.app/hook-analyzer" style="color: #00E5FF; text-decoration: underline;">Test Hook Score</a>
                                </li>
                            </ol>
                        </div>
                        
                        <p style="font-size: 15px; line-height: 1.6; color: #9ca3af; text-align: center; margin-top: 30px;">
                            Have questions or need help? Hit reply to this email or reach us at <a href="mailto:support@resodin.ai" style="color: #00E5FF; text-decoration: none;">support@resodin.ai</a>.
                        </p>
                    </div>
                `;

                await sendEmail({
                    to: email,
                    subject: "Welcome to Resodin — here's how to get started",
                    html: welcomeHtml
                });
            }
        }

        return NextResponse.json({ success: true });
    } catch (err: any) {
        console.error("Clerk Webhook Error:", err.message || err);
        return NextResponse.json({ error: err.message || 'Webhook Error' }, { status: 500 });
    }
}
