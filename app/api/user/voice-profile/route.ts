import { NextResponse } from 'next/server';
import { getSessionUser } from '@/lib/security/authz';
import { prisma } from '@/lib/prisma';
import { GoogleGenerativeAI } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_GENERATIVE_AI_API_KEY || '');

async function analyzeVoice(bestPosts: string): Promise<any> {
    const apiKey = process.env.GOOGLE_GENERATIVE_AI_API_KEY;
    if (!apiKey || apiKey.trim() === "" || apiKey === "your_api_key_here") {
        console.log("Gemini API key missing in voice analysis, returning mock characteristics.");
        return {
            writingStyle: "Conversational with clear, spaced line breaks",
            avgLength: 350,
            strongestHook: "Contrarian patterns",
            toneCharacteristics: ["Direct", "Empathetic", "Data-focused"],
            signaturePhrases: ["Unpopular opinion:", "Here is the simple truth:"],
            dnaScore: 78,
            summary: "Your writing uses active phrasing, clear transitions, and emphasizes curiosity hooks to maximize viewer scroll-stopping rate."
        };
    }

    try {
        const model = genAI.getGenerativeModel({ 
            model: "gemini-2.5-flash",
            generationConfig: {
                temperature: 0.7,
                responseMimeType: "application/json"
            }
        });

        const prompt = `Analyze these LinkedIn posts and return JSON:
{
  "writingStyle": "Brief 1-sentence description of the writing style",
  "avgLength": number (average character length of the posts),
  "strongestHook": "The most effective type of opening hook they use",
  "toneCharacteristics": ["3-4 distinct tone descriptors (e.g. Authoritative, Conversational)"],
  "signaturePhrases": ["2-3 recurring phrases or expressions they use or would fit their style"],
  "dnaScore": number (calculated voice identity match score between 65 and 98 based on content complexity),
  "summary": "A 2-sentence summary of their writing DNA and how it fits their professional identity"
}

Posts to analyze:
"${bestPosts.substring(0, 4000)}"

Return ONLY the valid JSON object. No explanations or markdown.`;

        const result = await model.generateContent(prompt);
        const response = await result.response;
        let text = response.text();
        text = text.replace(/```json/g, '').replace(/```/g, '').trim();
        return JSON.parse(text);
    } catch (e: any) {
        console.error("Gemini voice analysis error, returning fallback metrics:", e);
        return {
            writingStyle: "Direct, professional and spacing-focused",
            avgLength: 450,
            strongestHook: "Curiosity loop opener",
            toneCharacteristics: ["Professional", "Insightful", "Encouraging"],
            signaturePhrases: ["Let's be honest:", "What most people miss:"],
            dnaScore: 82,
            summary: "Your style emphasizes readability and professional takeaways, utilizing short lines and high formatting spaces."
        };
    }
}

export async function GET() {
    try {
        const sessionUser = await getSessionUser();
        const userId = sessionUser?.id;

        if (!userId || !sessionUser) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const dbUser = await prisma.user.findUnique({
            where: { id: userId },
            select: { voiceProfile: true },
        });

        if (!dbUser) {
            return NextResponse.json({ voiceProfile: null });
        }

        let parsed = null;
        if (dbUser.voiceProfile) {
            try {
                parsed = JSON.parse(dbUser.voiceProfile);
            } catch {
                parsed = null;
            }
        }

        return NextResponse.json({ voiceProfile: parsed });
    } catch (error) {
        console.error('Voice profile GET error:', error);
        return NextResponse.json({ error: 'Failed to fetch profile' }, { status: 500 });
    }
}

export async function POST(request: Request) {
    try {
        const sessionUser = await getSessionUser();
        const userId = sessionUser?.id;

        if (!userId || !sessionUser) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const data = await request.json();

        // 1. Run the AI Voice DNA analysis based on user's best posts
        const analysis = await analyzeVoice(data.bestPosts || "");

        // 2. Merge onboarding parameters with generated analysis
        const updatedVoiceProfile = {
            ...data,
            analysis
        };

        // Ensure user exists in database
        await prisma.user.upsert({
            where: { id: userId },
            update: {},
            create: { id: userId, email: sessionUser.email },
        });

        // Save voice profile to database
        await prisma.user.update({
            where: { id: userId },
            data: {
                voiceProfile: JSON.stringify(updatedVoiceProfile),
                onboardingComplete: true,
            },
        });

        return NextResponse.json({ success: true, voiceProfile: updatedVoiceProfile });
    } catch (error) {
        console.error('Profile save error:', error);
        return NextResponse.json(
            { error: 'Failed to save profile' },
            { status: 500 }
        );
    }
}
