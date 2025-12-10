import { NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { auth, currentUser } from '@clerk/nextjs/server';
import { prisma } from '@/lib/prisma';
import { withRetry } from '@/lib/ai-helper';

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_GENERATIVE_AI_API_KEY || '');

export async function POST(request: Request) {
    try {
        const { topic, tone, type, length, includeHook, includeStory } = await request.json();
        const { userId } = await auth();
        const user = await currentUser();

        let userVoiceProfile = null;
        let userStories = [];
        let userPerspective = '';

        if (userId && user) {
            const email = user.emailAddresses[0]?.emailAddress;
            if (email) {
                await prisma.user.upsert({
                    where: { id: userId },
                    update: {},
                    create: { id: userId, email },
                });
            }

            const dbUser = await prisma.user.findUnique({
                where: { id: userId },
                include: { posts: true }
            });

            if (dbUser) {
                // TRIAL LOGIC: 14 Days Free
                const ONE_DAY = 24 * 60 * 60 * 1000;
                const daysSinceCreation = Math.floor((Date.now() - new Date(dbUser.createdAt).getTime()) / ONE_DAY);
                const isTrialActive = daysSinceCreation < 14;
                const isPro = dbUser.plan === 'PRO' || dbUser.plan === 'BUSINESS';

                // LIMIT LOGIC: 5 Posts per month if not in trial AND not Pro
                if (!isTrialActive && !isPro) {
                    // Check posts in last 30 days
                    const thirtyDaysAgo = new Date();
                    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

                    const postCount = await prisma.post.count({
                        where: {
                            userId: userId,
                            createdAt: {
                                gte: thirtyDaysAgo
                            }
                        }
                    });

                    if (postCount >= 5) {
                        return NextResponse.json(
                            { error: 'Free plan limit reached (5 posts/mo). Please upgrade to Pro.' },
                            { status: 403 }
                        );
                    }
                }

                // Voice DNA Gating
                if (dbUser.voiceProfile) {
                    try {
                        const profile = JSON.parse(dbUser.voiceProfile);
                        userVoiceProfile = profile;
                        userStories = profile.stories || [];
                        userPerspective = profile.perspective || '';
                    } catch (e) {
                        console.error("Error parsing voice profile", e);
                    }
                }
            }
        }

        // Using gemini-flash-latest as it is confirmed working for this project
        const model = genAI.getGenerativeModel({ model: "gemini-flash-latest" });

        let prompt = `Generate a LinkedIn post about "${topic}".
        
        Parameters:
        - Tone: ${tone || (userVoiceProfile ? userVoiceProfile.tone : 'Professional')}
        - Type: ${type || 'Educational'}
        - Length: ${length || 'Medium'}
        `;

        if (userPerspective) {
            prompt += `\n- Incorporate this unique perspective/philosophy: "${userPerspective}"`;
        }

        if (includeStory && userStories.length > 0) {
            const randomStory = userStories[Math.floor(Math.random() * userStories.length)];
            prompt += `\n- Weave in this personal story: "${randomStory.title} - ${randomStory.summary}"`;
        }

        if (includeHook) {
            prompt += `\n- Start with a viral-style hook (curiosity gap or strong statement).`;
        } else {
            prompt += `\n- Start with a clear professional opening.`;
        }

        prompt += `\n\nReturn the output in the following JSON format (no markdown):
        {
            "content": "The full post content...",
            "hashtags": {
                "broad": ["#tag1", "#tag2"],
                "niche": ["#tag3", "#tag4"],
                "community": ["#tag5", "#tag6"]
            }
        }
        
        Hashtag Strategy:
        - Broad: High volume tags (e.g. #marketing)
        - Niche: Specific to the topic (e.g. #seo)
        - Community: Specific groups (e.g. #marketers)
        `;

        const result = await withRetry(async () => {
            return await model.generateContent(prompt);
        });
        const response = await result.response;
        let text = response.text();

        // Clean markdown if present
        text = text.replace(/```json/g, '').replace(/```/g, '').trim();

        let data;
        try {
            data = JSON.parse(text);
        } catch (e) {
            // Fallback if JSON parsing fails
            data = { content: text, hashtags: { broad: [], niche: [], community: [] } };
        }

        // Save to DB if user is logged in
        if (userId) {
            await prisma.post.create({
                data: {
                    content: data.content,
                    tone: tone || (userVoiceProfile ? userVoiceProfile.tone : 'Professional'),
                    type: type || 'Educational',
                    userId: userId,
                },
            });
        }

        return NextResponse.json(data);
    } catch (error) {
        console.error("Generation error:", error);
        return NextResponse.json(
            { error: 'Failed to generate content' },
            { status: 500 }
        );
    }
}
