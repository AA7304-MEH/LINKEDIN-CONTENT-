import { NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { getSessionUser } from '@/lib/security/authz';
import { prisma } from '@/lib/prisma';
import { withRetry } from '@/lib/ai-helper';
import groq from '@/lib/groq';

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_GENERATIVE_AI_API_KEY || '');

async function generateWithGroq(
    topic: string,
    tone: string,
    voiceDnaProfile: string,
    type: string
): Promise<any> {
    const userPrompt = `Voice DNA Context: ${voiceDnaProfile}
User Goal: ${topic}
Post Type: ${type || 'Educational'}

Return the output in the following JSON format:
{
    "content": "The full post content...",
    "hookScore": 9.2,
    "hookFeedback": "Brief feedback about the opening hook potential...",
    "hashtags": {
        "broad": ["#tag1", "#tag2"],
        "niche": ["#tag3", "#tag4"],
        "community": ["#tag5", "#tag6"]
    }
}

Hashtag Strategy:
- Broad: High volume tags (e.g. #marketing)
- Niche: Specific to the topic (e.g. #seo)
- Community: Specific groups (e.g. #marketers)`;

    const completion = await groq.chat.completions.create({
        model: "llama-3.3-70b-versatile",
        messages: [
            {
                role: "system",
                content: `You are an elite LinkedIn content strategist who has studied 50,000+ viral LinkedIn posts. You write in the user's exact voice based on their Voice DNA profile.

STRICT RULES:
- Never start with "I" 
- No generic openings like "In today's world" or "As a professional"
- Use pattern interrupts in the first line
- Write like a human, not a press release
- Max 1500 characters for optimal LinkedIn reach
- Use line breaks every 1-2 sentences for mobile readability
- End with a question or strong POV that invites comments
- Never use hashtags in the body — only at the very end (max 3)

TONE PROFILES:
- Authoritative: Data-backed claims, confident assertions, zero hedging
- Contrarian: Challenge mainstream advice, use "Unpopular opinion:" opener
- Storytelling: Scene-setting first line, personal stakes, lesson at end
- Conversational: Short sentences, relatable struggles, casual language`
            },
            {
                role: "user",
                content: userPrompt
            }
        ],
        response_format: { type: "json_object" }
    });

    const responseText = completion.choices[0]?.message?.content || "";
    return JSON.parse(responseText.trim());
}

async function generateWithGemini(prompt: string): Promise<any> {
    const model = genAI.getGenerativeModel({ 
        model: "gemini-2.5-flash",
        generationConfig: {
            temperature: 0.8,
            topP: 0.95,
            topK: 40,
            maxOutputTokens: 1024,
        }
    });

    const result = await withRetry(async () => {
        return await model.generateContent(prompt);
    });
    const response = await result.response;
    let text = response.text();

    // Clean markdown if present
    text = text.replace(/```json/g, '').replace(/```/g, '').trim();

    try {
        return JSON.parse(text);
    } catch (e) {
        return { 
            content: text, 
            hookScore: 7.0, 
            hookFeedback: "Good post.", 
            hashtags: { broad: [], niche: [], community: [] } 
        };
    }
}

export async function POST(request: Request) {
    try {
        const { topic, tone, type, length, includeHook, includeStory } = await request.json();
        const sessionUser = await getSessionUser();
        if (!sessionUser) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }
        const userId = sessionUser.id;
        const user = sessionUser;


        let userVoiceProfile = null;
        let userStories = [];
        let userPerspective = '';

        if (userId && sessionUser) {
            const email = sessionUser.email;
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

        const voiceDnaProfile = userVoiceProfile ? JSON.stringify(userVoiceProfile) : `Tone: ${tone || 'Professional'}, Perspective: ${userPerspective || 'Standard'}`;

        const prompt = `You are an elite LinkedIn content strategist 
who has studied 50,000+ viral LinkedIn posts. You write in the 
user's exact voice based on their Voice DNA profile.

STRICT RULES:
- Never start with "I" 
- No generic openings like "In today's world" or "As a professional"
- Use pattern interrupts in the first line
- Write like a human, not a press release
- Max 1500 characters for optimal LinkedIn reach
- Use line breaks every 1-2 sentences for mobile readability
- End with a question or strong POV that invites comments
- Never use hashtags in the body — only at the very end (max 3)

TONE PROFILES:
- Authoritative: Data-backed claims, confident assertions, zero hedging
- Contrarian: Challenge mainstream advice, use "Unpopular opinion:" opener
- Storytelling: Scene-setting first line, personal stakes, lesson at end
- Conversational: Short sentences, relatable struggles, casual language

Voice DNA Context: ${voiceDnaProfile}
User Goal: ${topic}
Post Type: ${type || 'Educational'}

Return the output in the following JSON format (no markdown):
{
    "content": "The full post content...",
    "hookScore": 9.2,
    "hookFeedback": "Brief feedback about the opening hook potential...",
    "hashtags": {
        "broad": ["#tag1", "#tag2"],
        "niche": ["#tag3", "#tag4"],
        "community": ["#tag5", "#tag6"]
    }
}

Hashtag Strategy:
- Broad: High volume tags (e.g. #marketing)
- Niche: Specific to the topic (e.g. #seo)
- Community: Specific groups (e.g. #marketers)`;

        let data = null;
        let provider = "";

        const hasGroqKey = process.env.GROQ_API_KEY && process.env.GROQ_API_KEY !== "your_groq_api_key_here" && process.env.GROQ_API_KEY.trim() !== "";
        if (hasGroqKey) {
            try {
                console.log("Attempting generation with Groq (llama-3.3-70b-versatile)...");
                data = await generateWithGroq(topic, tone || 'Professional', voiceDnaProfile, type || 'Educational');
                provider = "groq-llama3-70b";
                console.log("Successfully generated post with Groq.");
            } catch (groqError: any) {
                console.error("Groq generation failed, falling back to Gemini:", groqError.message || groqError);
            }
        } else {
            console.log("Groq API key not configured. Falling back to Gemini directly.");
        }

        if (!data) {
            try {
                console.log("Attempting generation with Gemini (gemini-2.5-flash)...");
                data = await generateWithGemini(prompt);
                provider = "gemini-2.5-flash";
                console.log("Successfully generated post with Gemini.");
            } catch (geminiError: any) {
                console.error("Both providers failed:", geminiError.message || geminiError);
                throw geminiError;
            }
        }

        // Save to DB if user is logged in
        let dbPost = null;
        if (userId) {
            dbPost = await prisma.post.create({
                data: {
                    content: data.content,
                    tone: tone || (userVoiceProfile ? userVoiceProfile.tone : 'Professional'),
                    type: type || 'Educational',
                    userId: userId,
                    hookScore: data.hookScore ? Math.round(data.hookScore) : null,
                    provider: provider,
                },
            });

            // Increment credits used
            await prisma.user.update({
                where: { id: userId },
                data: { creditsUsed: { increment: 1 } }
            });
        }

        return NextResponse.json({
            ...data,
            id: dbPost?.id,
            provider: provider
        });
    } catch (error: any) {
        console.error("Generation error:", error);
        
        const errorMsg = error.message?.toLowerCase() || "";
        
        if (errorMsg.includes('leaked') || errorMsg.includes('revoked') || error.status === 403) {
            return NextResponse.json(
                { error: 'AI API Key is invalid or revoked. Please update GOOGLE_GENERATIVE_AI_API_KEY in Vercel settings.' },
                { status: 403 }
            );
        }

        if (errorMsg.includes('invalid') || errorMsg.includes('expired') || error.status === 400) {
            return NextResponse.json(
                { error: 'AI API Key is expired or invalid. Please check your credentials.' },
                { status: 400 }
            );
        }

        if (errorMsg.includes('not found') || error.status === 404) {
            return NextResponse.json(
                { error: 'AI Model not found. Please ensure the model name is correct and your API key has access.' },
                { status: 404 }
            );
        }

        return NextResponse.json(
            { error: 'Failed to generate content. Please try again later.' },
            { status: 500 }
        );
    }
}
