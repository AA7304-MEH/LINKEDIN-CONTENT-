import { NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { getSessionUser } from '@/lib/security/authz';
import { prisma } from '@/lib/prisma';
import { withRetry } from '@/lib/ai-helper';
import groq from '@/lib/groq';
import OpenAI from 'openai';

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

async function generateWithOpenAI(
    topic: string,
    tone: string,
    voiceDnaProfile: string,
    type: string
): Promise<any> {
    const apiKey = process.env.OPENAI_API_KEY;
    if (!apiKey) throw new Error("OpenAI API key missing");

    const openai = new OpenAI({ apiKey });

    const completion = await openai.chat.completions.create({
        model: "gpt-4o",
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
                content: `Voice DNA Context: ${voiceDnaProfile}
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
}`
            }
        ],
        response_format: { type: "json_object" }
    });

    const responseText = completion.choices[0]?.message?.content || "";
    return JSON.parse(responseText.trim());
}

async function generateWithGemini(prompt: string): Promise<any> {
    let modelName = "gemini-2.5-pro";
    let model = genAI.getGenerativeModel({ 
        model: modelName,
        generationConfig: {
            temperature: 0.8,
            topP: 0.95,
            topK: 40,
            maxOutputTokens: 1024,
        }
    });

    let result;
    try {
        result = await withRetry(async () => {
            return await model.generateContent(prompt);
        });
    } catch (proError) {
        console.warn("Gemini 2.5 Pro failed, falling back to Gemini 2.5 Flash:", proError);
        modelName = "gemini-2.5-flash";
        model = genAI.getGenerativeModel({ 
            model: modelName,
            generationConfig: {
                temperature: 0.8,
                topP: 0.95,
                topK: 40,
                maxOutputTokens: 1024,
            }
        });
        result = await withRetry(async () => {
            return await model.generateContent(prompt);
        });
    }

    const response = await result.response;
    let text = response.text();

    // Clean markdown if present
    text = text.replace(/```json/g, '').replace(/```/g, '').trim();

    try {
        const parsed = JSON.parse(text);
        return { ...parsed, provider: `gemini-2.5-${modelName === 'gemini-2.5-pro' ? 'pro' : 'flash'}` };
    } catch (e) {
        return { 
            content: text, 
            hookScore: 7.0, 
            hookFeedback: "Good post.", 
            hashtags: { broad: [], niche: [], community: [] },
            provider: `gemini-2.5-${modelName === 'gemini-2.5-pro' ? 'pro' : 'flash'}`
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
        hookFeedback: "Simulated viral hook score. Connect a free Google Gemini or Groq API key in your .env file to enable live AI generation.",
        hashtags: {
            broad: ["#productivity", "#business"],
            niche: [`#${(topic || 'growth').toLowerCase().replace(/[^a-z0-9]/g, '') || 'marketing'}`],
            community: ["#creators"]
        },
        provider: "local-mock-ai"
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

                // LIMIT LOGIC: DB-based creditsLimit check for FREE users
                if (dbUser.plan === 'FREE' && dbUser.creditsUsed >= dbUser.creditsLimit) {
                    return NextResponse.json(
                        { error: "You've used all your posts for today. Upgrade to Pro for unlimited." },
                        { status: 429 }
                    );
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

        // 1. Try Anthropic (Claude 3.5 Sonnet) - Best quality
        const hasAnthropicKey = process.env.ANTHROPIC_API_KEY && process.env.ANTHROPIC_API_KEY.trim() !== "";
        if (hasAnthropicKey) {
            try {
                console.log("Attempting generation with Anthropic (Claude 3.5 Sonnet)...");
                data = await generateWithAnthropic(topic, tone || 'Professional', voiceDnaProfile, type || 'Educational');
                provider = "anthropic-claude-3-5-sonnet";
                console.log("Successfully generated post with Anthropic.");
            } catch (anthropicError: any) {
                console.error("Anthropic generation failed, falling back:", anthropicError.message || anthropicError);
            }
        }

        // 2. Try OpenAI (GPT-4o) - Second best quality
        if (!data) {
            const hasOpenAIKey = process.env.OPENAI_API_KEY && process.env.OPENAI_API_KEY.trim() !== "";
            if (hasOpenAIKey) {
                try {
                    console.log("Attempting generation with OpenAI (gpt-4o)...");
                    data = await generateWithOpenAI(topic, tone || 'Professional', voiceDnaProfile, type || 'Educational');
                    provider = "openai-gpt-4o";
                    console.log("Successfully generated post with OpenAI.");
                } catch (openaiError: any) {
                    console.error("OpenAI generation failed, falling back:", openaiError.message || openaiError);
                }
            }
        }

        // 3. Try Groq (Llama 3.3 70B) - Third best quality (high speed)
        if (!data) {
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
            }
        }

        // 4. Try Google Gemini (Gemini 2.5 Pro / Flash) - Baseline fallbacks
        if (!data) {
            const hasGeminiKey = process.env.GOOGLE_GENERATIVE_AI_API_KEY && process.env.GOOGLE_GENERATIVE_AI_API_KEY.trim() !== "";
            if (hasGeminiKey) {
                try {
                    console.log("Attempting generation with Gemini (gemini-2.5-pro)...");
                    const geminiData = await generateWithGemini(prompt);
                    data = geminiData;
                    provider = geminiData.provider || "gemini-2.5-pro";
                    console.log(`Successfully generated post with ${provider}.`);
                } catch (geminiError: any) {
                    console.error("Gemini generation failed, falling back to local mock:", geminiError.message || geminiError);
                }
            }
        }

        // 5. Local Mock Fallback - Free / No Investment required
        if (!data) {
            console.log("No API keys found or all failed. Falling back to local mock generation.");
            data = generateLocallyMocked(topic, tone || 'Professional', type || 'Educational');
            provider = "local-mock-ai";
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
