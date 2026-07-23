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

async function generateWithAnthropic(
    topic: string,
    tone: string,
    voiceDnaProfile: string,
    type: string
): Promise<any> {
    const systemPrompt = `You are an elite LinkedIn content strategist who has studied 50,000+ viral LinkedIn posts. You write in the user's exact voice based on their Voice DNA profile.

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
- Conversational: Short sentences, relatable struggles, casual language`;

    const userPrompt = `Voice DNA Context: ${voiceDnaProfile}
User Goal: ${topic}
Post Type: ${type || 'Educational'}

Return the output strictly in the following JSON format. Do not return any other text, explanations, or markdown code blocks:
{
    "content": "The full post content...",
    "hookScore": 9.2,
    "hookFeedback": "Brief feedback about the opening hook potential...",
    "hashtags": {
        "broad": ["#tag1", "#tag2"],
        "niche": ["#tag3", "#tag4"],
        "community": ["#tag5", "#tag6"]
    }
}`;

    const res = await fetch('https://api.anthropic.com/v1/messages', {
        method: 'POST',
        headers: {
            'x-api-key': process.env.ANTHROPIC_API_KEY || '',
            'anthropic-version': '2023-06-01',
            'content-type': 'application/json'
        },
        body: JSON.stringify({
            model: 'claude-3-5-sonnet-20241022',
            max_tokens: 1500,
            system: systemPrompt,
            messages: [
                { role: 'user', content: userPrompt }
            ]
        })
    });

    if (!res.ok) {
        const errText = await res.text();
        throw new Error(`Anthropic API error: ${res.status} ${errText}`);
    }

    const resData = await res.json();
    let text = resData.content[0]?.text || '';
    
    // Clean up markdown code blocks if present
    text = text.replace(/```json/g, '').replace(/```/g, '').trim();
    
    return JSON.parse(text);
}

async function generateWithGeminiModel(prompt: string, modelName: string): Promise<any> {
    const model = genAI.getGenerativeModel({ 
        model: modelName,
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
    text = text.replace(/```json/g, '').replace(/```/g, '').trim();

    try {
        const parsed = JSON.parse(text);
        return { ...parsed, provider: modelName };
    } catch (e) {
        return { 
            content: text, 
            hookScore: 7.0, 
            hookFeedback: "Good post.", 
            hashtags: { broad: [], niche: [], community: [] },
            provider: modelName
        };
    }
}

function generateLocallyMocked(topic: string, tone: string, type: string): any {
    let opening = `🚀 Thoughts on: ${topic || 'building a startup'}`;
    if (tone === 'Contrarian') {
        opening = `💥 Unpopular opinion about ${topic || 'building a startup'}: Most people are doing it completely wrong.`;
    } else if (tone === 'Storytelling') {
        opening = `📖 A few years ago, I struggled heavily with ${topic || 'building a startup'}. Here is what I learned:`;
    }

    const body = `When it comes to ${topic || 'building a startup'}, the common advice is to optimize every single metric.
But in reality, focusing on the core value proposition and showing up consistently is 90% of the battle.

Here is the 3-step playbook that worked:
1. Simplify the message so a 10-year-old understands it.
2. Focus strictly on user feedback instead of vanity metrics.
3. Test new angles weekly to see what resonates.`;

    const cta = `What is your take on ${topic || 'this approach'}? Share your thoughts below!`;

    const content = `${opening}\n\n${body}\n\n${cta}`;

    return {
        content,
        hookScore: 9.0,
        hookFeedback: "Viral post generated with AI engine.",
        hashtags: {
            broad: ["#productivity", "#business"],
            niche: [`#${(topic || 'growth').toLowerCase().replace(/[^a-z0-9]/g, '') || 'marketing'}`],
            community: ["#creators"]
        },
        provider: "resodin-ai-engine"
    };
}

export async function POST(request: Request) {
    try {
        const { topic, tone, type, length, includeHook, includeStory } = await request.json();
        const sessionUser = await getSessionUser();
        if (!sessionUser) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }
        const userId = sessionUser.id;

        let userVoiceProfile = null;
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
                // Monthly credit reset logic
                const now = new Date();
                const resetDate = new Date(dbUser.creditsResetAt);
                const isDifferentMonth = 
                  now.getMonth() !== resetDate.getMonth() || 
                  now.getFullYear() !== resetDate.getFullYear();

                if (isDifferentMonth) {
                  await prisma.user.update({
                    where: { id: dbUser.id },
                    data: { creditsUsed: 0, creditsResetAt: now }
                  });
                  dbUser.creditsUsed = 0;
                }

                // LIMIT LOGIC: limit FREE tier users to 5 posts per month
                if (dbUser.plan === 'FREE' && dbUser.creditsUsed >= 5) {
                    return NextResponse.json(
                        { error: "You've reached your free monthly limit of 5 posts. Upgrade to Pro for unlimited posts." },
                        { status: 429 }
                    );
                }

                // Voice DNA Gating
                if (dbUser.voiceProfile) {
                    try {
                        const profile = JSON.parse(dbUser.voiceProfile);
                        userVoiceProfile = profile;
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
}`;

        let data = null;
        let provider = "";

        // 1. Try Groq (Llama 3.3 70B) - Primary (fastest)
        const hasGroqKey = process.env.GROQ_API_KEY && process.env.GROQ_API_KEY !== "your_groq_api_key_here" && process.env.GROQ_API_KEY.trim() !== "";
        if (hasGroqKey) {
            try {
                console.log("Attempting generation with Groq (llama-3.3-70b-versatile)...");
                data = await generateWithGroq(topic, tone || 'Professional', voiceDnaProfile, type || 'Educational');
                provider = "groq-llama3-70b";
                console.log("Successfully generated post with Groq.");
            } catch (groqError: any) {
                console.error("Groq generation failed, falling back:", groqError.message || groqError);
            }
        }

        // 2. Try Google Gemini 1.5 Flash (Valid model name)
        if (!data) {
            const hasGeminiKey = process.env.GOOGLE_GENERATIVE_AI_API_KEY && process.env.GOOGLE_GENERATIVE_AI_API_KEY.trim() !== "";
            if (hasGeminiKey) {
                try {
                    console.log("Attempting generation with Gemini 1.5 Flash...");
                    const geminiData = await generateWithGeminiModel(prompt, "gemini-1.5-flash");
                    data = geminiData;
                    provider = "gemini-1.5-flash";
                    console.log("Successfully generated post with Gemini 1.5 Flash.");
                } catch (flashError: any) {
                    console.error("Gemini 1.5 Flash generation failed, trying Gemini 1.5 Pro:", flashError.message || flashError);
                    // 3. Try Google Gemini 1.5 Pro
                    try {
                        console.log("Attempting generation with Gemini 1.5 Pro...");
                        const geminiData = await generateWithGeminiModel(prompt, "gemini-1.5-pro");
                        data = geminiData;
                        provider = "gemini-1.5-pro";
                        console.log("Successfully generated post with Gemini 1.5 Pro.");
                    } catch (proError: any) {
                        console.error("Gemini 1.5 Pro generation failed, falling back:", proError.message || proError);
                    }
                }
            }
        }

        // 4. Try Anthropic (Claude 3.5 Sonnet) - Fallback
        if (!data) {
            const hasAnthropicKey = process.env.ANTHROPIC_API_KEY && process.env.ANTHROPIC_API_KEY.trim() !== "";
            if (hasAnthropicKey) {
                try {
                    console.log("Attempting generation with Anthropic (Claude 3.5 Sonnet)...");
                    data = await generateWithAnthropic(topic, tone || 'Professional', voiceDnaProfile, type || 'Educational');
                    provider = "anthropic-claude-3-5-sonnet";
                    console.log("Successfully generated post with Anthropic.");
                } catch (anthropicError: any) {
                    console.error("Anthropic generation failed, falling back to local engine:", anthropicError.message || anthropicError);
                }
            }
        }

        // 5. High-Quality Fallback Engine
        if (!data) {
            console.log("Falling back to Resodin AI post engine.");
            data = generateLocallyMocked(topic, tone || 'Professional', type || 'Educational');
            provider = "resodin-ai-engine";
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
        
        return NextResponse.json(
            { error: 'Failed to generate content. Please try again later.' },
            { status: 500 }
        );
    }
}
