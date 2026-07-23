import { NextResponse } from 'next/server';
import { getSessionUser } from '@/lib/security/authz';
import { prisma } from '@/lib/prisma';
import groq from '@/lib/groq';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { withRetry } from '@/lib/ai-helper';

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_GENERATIVE_AI_API_KEY || '');

async function boostWithGroq(postContent: string, voiceDnaProfile: string): Promise<any> {
    const userPrompt = `Voice DNA Context: ${voiceDnaProfile}
Original Full Post:
"""
${postContent}
"""

Instructions:
Analyze the opening hook (first 1-3 lines) of the post above.
Generate 3 distinct, high-converting hook variations optimized for LinkedIn.

Rules for variations:
1. Maximize curiosity gap, specificity, emotional pull, and scroll-stopping power.
2. Maintain the user's voice DNA, tone, and authentic perspective.
3. Keep short-line readability for mobile screens.
4. Avoid cringe bro-marketing, fake hype, or robotic AI clichés ("In today's fast-paced world", "Unlocking success").

Return strictly a JSON object with this format (no markdown):
{
    "originalHook": "The isolated current opening line(s)",
    "isHighOriginalScore": false,
    "variations": [
        {
            "hookText": "Rewritten opening hook 1...",
            "explanation": "Why this works (e.g., Creates a strong curiosity gap and data-backed pattern interrupt).",
            "estimatedScore": 9.4
        },
        {
            "hookText": "Rewritten opening hook 2...",
            "explanation": "Why this works (e.g., Uses a contrarian angle to challenge common assumptions).",
            "estimatedScore": 9.2
        },
        {
            "hookText": "Rewritten opening hook 3...",
            "explanation": "Why this works (e.g., Focuses on immediate tangible outcome and high-stakes problem).",
            "estimatedScore": 9.6
        }
    ]
}`;

    const completion = await groq.chat.completions.create({
        model: "llama-3.3-70b-versatile",
        messages: [
            {
                role: "system",
                content: "You are an expert LinkedIn copywriting coach specializing in scroll-stopping viral hooks. Output valid JSON only."
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

async function boostWithGemini(postContent: string, voiceDnaProfile: string): Promise<any> {
    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });
    const prompt = `Voice DNA Context: ${voiceDnaProfile}
Original Full Post:
"""
${postContent}
"""

Instructions:
Analyze the opening hook (first 1-3 lines) of the post above.
Generate 3 distinct, high-converting hook variations optimized for LinkedIn.

Return strictly a JSON object (no markdown):
{
    "originalHook": "The isolated current opening line(s)",
    "isHighOriginalScore": false,
    "variations": [
        {
            "hookText": "Rewritten opening hook 1...",
            "explanation": "Why this works...",
            "estimatedScore": 9.4
        },
        {
            "hookText": "Rewritten opening hook 2...",
            "explanation": "Why this works...",
            "estimatedScore": 9.2
        },
        {
            "hookText": "Rewritten opening hook 3...",
            "explanation": "Why this works...",
            "estimatedScore": 9.6
        }
    ]
}`;

    const result = await withRetry(async () => {
        return await model.generateContent(prompt);
    });

    const response = await result.response;
    let text = response.text().replace(/```json/g, '').replace(/```/g, '').trim();
    return JSON.parse(text);
}

function boostLocallyMocked(postContent: string): any {
    const lines = postContent.split('\n').filter(Boolean);
    const originalHook = lines[0] || postContent.substring(0, 80);

    return {
        originalHook,
        isHighOriginalScore: false,
        variations: [
            {
                hookText: `Unpopular opinion: Most people get ${originalHook.toLowerCase().replace(/^(🚀|💡|📖|💥)\s*/, '')} completely wrong.`,
                explanation: "Uses a contrarian pattern interrupt to trigger immediate curiosity.",
                estimatedScore: 9.5
            },
            {
                hookText: `I spent 3 years failing at this before realizing 1 simple truth: ${originalHook.toLowerCase().replace(/^(🚀|💡|📖|💥)\s*/, '')}`,
                explanation: "Leverages personal stakes and story-driven vulnerability.",
                estimatedScore: 9.3
            },
            {
                hookText: `Here is the #1 mistake holding creators back from ${originalHook.toLowerCase().replace(/^(🚀|💡|📖|💥)\s*/, '')}:`,
                explanation: "Specific outcome focus with loss-aversion trigger.",
                estimatedScore: 9.6
            }
        ]
    };
}

export async function POST(request: Request) {
    try {
        const { postContent, currentHookScore } = await request.json();
        const sessionUser = await getSessionUser();

        if (!sessionUser) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        if (!postContent || postContent.trim() === '') {
            return NextResponse.json({ error: "Post content is required" }, { status: 400 });
        }

        const userId = sessionUser.id;
        let userVoiceProfile = null;

        if (userId) {
            const dbUser = await prisma.user.findUnique({
                where: { id: userId }
            });

            if (dbUser && dbUser.voiceProfile) {
                try {
                    userVoiceProfile = JSON.parse(dbUser.voiceProfile);
                } catch (e) {
                    console.error("Error parsing voice profile", e);
                }
            }
        }

        const voiceDnaProfile = userVoiceProfile
            ? JSON.stringify(userVoiceProfile)
            : "Tone: Professional, Clear, Direct";

        let resultData = null;

        // 1. Try Groq (Llama 3.3 70B)
        const hasGroqKey = process.env.GROQ_API_KEY && process.env.GROQ_API_KEY.trim() !== "" && process.env.GROQ_API_KEY !== "your_groq_api_key_here";
        if (hasGroqKey) {
            try {
                resultData = await boostWithGroq(postContent, voiceDnaProfile);
            } catch (err) {
                console.error("Groq hook boost failed, trying Gemini:", err);
            }
        }

        // 2. Try Gemini
        if (!resultData) {
            const hasGeminiKey = process.env.GOOGLE_GENERATIVE_AI_API_KEY && process.env.GOOGLE_GENERATIVE_AI_API_KEY.trim() !== "";
            if (hasGeminiKey) {
                try {
                    resultData = await boostWithGemini(postContent, voiceDnaProfile);
                } catch (err) {
                    console.error("Gemini hook boost failed:", err);
                }
            }
        }

        // 3. Fallback to local mock generator
        if (!resultData) {
            resultData = boostLocallyMocked(postContent);
        }

        if (currentHookScore && currentHookScore >= 8.5) {
            resultData.isHighOriginalScore = true;
        }

        return NextResponse.json(resultData);
    } catch (error: any) {
        console.error("Hook boost endpoint error:", error);
        return NextResponse.json(
            { error: error?.message || "Failed to boost hook. Please try again." },
            { status: 500 }
        );
    }
}
