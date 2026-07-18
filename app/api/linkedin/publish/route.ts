import { NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs/server';
import { prisma } from '@/lib/prisma';

export async function POST(request: Request) {
    try {
        const { postId, content } = await request.json();

        if (!postId || !content) {
            return NextResponse.json({ error: "Post ID and content are required." }, { status: 400 });
        }

        const session = await auth();
        const userId = session?.userId;

        if (!userId) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        // Fetch credentials
        const dbUser = await prisma.user.findUnique({
            where: { id: userId }
        });

        if (!dbUser || !dbUser.linkedinAccessToken || !dbUser.linkedinProfileId) {
            return NextResponse.json({ error: "LinkedIn account is not connected." }, { status: 400 });
        }

        // Token Expiry Verification
        if (dbUser.linkedinTokenExpiry && new Date() > new Date(dbUser.linkedinTokenExpiry)) {
            return NextResponse.json({ error: "LinkedIn token has expired. Please reconnect." }, { status: 401 });
        }

        const linkedinUrl = 'https://api.linkedin.com/v2/ugcPosts';
        const authorUrn = `urn:li:person:${dbUser.linkedinProfileId}`;

        const postBody = {
            author: authorUrn,
            lifecycleState: "PUBLISHED",
            specificContent: {
                "com.linkedin.ugc.ShareContent": {
                    shareCommentary: { text: content },
                    shareMediaCategory: "NONE"
                }
            },
            visibility: {
                "com.linkedin.ugc.MemberNetworkVisibility": "PUBLIC"
            }
        };

        const publishRes = await fetch(linkedinUrl, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${dbUser.linkedinAccessToken}`,
                'Content-Type': 'application/json',
                'X-Restli-Protocol-Version': '2.0.0'
            },
            body: JSON.stringify(postBody)
        });

        if (!publishRes.ok) {
            const errText = await publishRes.text();
            console.error("LinkedIn publish error response:", errText);
            let errorMessage = `LinkedIn API error: ${publishRes.statusText}`;
            try {
                const parsed = JSON.parse(errText);
                if (parsed.message) errorMessage = parsed.message;
            } catch (e) {}
            return NextResponse.json({ error: errorMessage }, { status: publishRes.status });
        }

        const resData = await publishRes.json();
        const rawId = resData.id;
        const linkedinPostId = rawId ? rawId.replace('urn:li:share:', '') : 'published';

        // Update post metadata in DB
        await prisma.post.update({
            where: { id: postId },
            data: {
                publishedToLinkedIn: true,
                linkedinPostId: linkedinPostId,
                publishedAt: new Date()
            }
        });

        return NextResponse.json({ success: true, linkedinPostId });
    } catch (err: any) {
        console.error("LinkedIn publish endpoint failed:", err);
        return NextResponse.json(
            { error: "Failed to publish post to LinkedIn.", details: err.message || err },
            { status: 500 }
        );
    }
}