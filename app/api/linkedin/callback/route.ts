import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(request: Request) {
    try {
        const { searchParams } = new URL(request.url);
        const code = searchParams.get('code');
        const state = searchParams.get('state');
        const error = searchParams.get('error');

        const client_id = process.env.LINKEDIN_CLIENT_ID;
        const client_secret = process.env.LINKEDIN_CLIENT_SECRET;
        const redirect_uri = process.env.LINKEDIN_REDIRECT_URI;

        if (error || !code) {
            console.error("LinkedIn OAuth error returned:", error);
            return NextResponse.redirect(new URL('/settings?linkedin=error', request.url));
        }

        if (!client_id || !client_secret || !redirect_uri) {
            console.error("LinkedIn environment variables are missing in callback");
            return NextResponse.json(
                { error: "LinkedIn OAuth configuration is incomplete: client ID, secret, or redirect URI is missing." },
                { status: 500 }
            );
        }

        if (!state) {
            return NextResponse.redirect(new URL('/settings?linkedin=error', request.url));
        }

        // Verify state matches a real Clerk user
        const userExists = await prisma.user.findUnique({
            where: { id: state }
        });

        if (!userExists) {
            console.error(`LinkedIn callback state ${state} does not match any registered User ID`);
            return NextResponse.redirect(new URL('/settings?linkedin=error', request.url));
        }

        // Exchange code for token
        const tokenRes = await fetch('https://www.linkedin.com/oauth/v2/accessToken', {
            method: 'POST',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            body: new URLSearchParams({
                grant_type: 'authorization_code',
                code,
                redirect_uri,
                client_id,
                client_secret,
            })
        });

        if (!tokenRes.ok) {
            const errText = await tokenRes.text();
            throw new Error(`LinkedIn Token exchange failed: ${tokenRes.status} ${errText}`);
        }

        const tokenData = await tokenRes.json();
        const access_token = tokenData.access_token;

        // Fetch User Info (OIDC Endpoint)
        const profileRes = await fetch('https://api.linkedin.com/v2/userinfo', {
            headers: {
                Authorization: `Bearer ${access_token}`
            }
        });

        if (!profileRes.ok) {
            const errText = await profileRes.text();
            throw new Error(`LinkedIn profile fetch failed: ${profileRes.status} ${errText}`);
        }

        const profileData = await profileRes.json();
        const profileId = profileData.sub;
        const name = profileData.name || `${profileData.given_name || ''} ${profileData.family_name || ''}`.trim();
        const expiryDate = new Date(Date.now() + 60 * 24 * 60 * 60 * 1000); // 60 days

        // Save credentials to User record
        await prisma.user.update({
            where: { id: state },
            data: {
                linkedinAccessToken: access_token,
                linkedinProfileId: profileId,
                linkedinName: name,
                linkedinConnectedAt: new Date(),
                linkedinTokenExpiry: expiryDate
            }
        });

        return NextResponse.redirect(new URL('/settings?linkedin=connected', request.url));
    } catch (err: any) {
        console.error("LinkedIn OAuth callback failed:", err);
        return NextResponse.redirect(new URL('/settings?linkedin=error', request.url));
    }
}