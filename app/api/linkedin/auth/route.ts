import { NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs/server';

export async function GET() {
    try {
        const client_id = process.env.LINKEDIN_CLIENT_ID;
        const redirect_uri = process.env.LINKEDIN_REDIRECT_URI;

        if (!client_id || !redirect_uri) {
            console.error("LinkedIn environment variables are missing");
            return NextResponse.json(
                { error: "LinkedIn OAuth configuration is incomplete: LINKEDIN_CLIENT_ID or LINKEDIN_REDIRECT_URI is missing." },
                { status: 500 }
            );
        }

        const session = await auth();
        const userId = session?.userId;

        if (!userId) {
            return NextResponse.json({ error: "Unauthorized: Please log in first." }, { status: 401 });
        }

        const encodedRedirect = encodeURIComponent(redirect_uri);
        const scope = encodeURIComponent('openid profile email w_member_social');
        const state = encodeURIComponent(userId);

        const oauthUrl = `https://www.linkedin.com/oauth/v2/authorization?response_type=code&client_id=${client_id}&redirect_uri=${encodedRedirect}&state=${state}&scope=${scope}`;
        
        return NextResponse.redirect(oauthUrl);
    } catch (err: any) {
        console.error("LinkedIn Auth initialization failed:", err);
        return NextResponse.json(
            { error: "Failed to initialize LinkedIn authorization.", details: err.message || err },
            { status: 500 }
        );
    }
}
