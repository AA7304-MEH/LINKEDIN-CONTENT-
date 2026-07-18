import { NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { getSessionUser } from '@/lib/security/authz';
import { prisma } from '@/lib/prisma';
import { withRetry } from '@/lib/ai-helper';

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_GENERATIVE_AI_API_KEY || '');

export async function POST(request: Request) {
    try {
        const { hook } = await request.json();
        const sessionUser = await getSessionUser();
        if (!sessionUser) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }
        const userId = sessionUser.id;

        const apiKey = process.env.GOOGLE_GENERATIVE_AI_API_KEY;
        if (!apiKey || apiKey.trim() === "" || apiKey === "your_api_key_here") {
            console.log("Gemini API key missing, generating mock hook analysis.");
            const score = hook.length > 150 ? 5 : hook.includes('opinion') || hook.includes('truth') || hook.includes('secret') ? 9 : 7;
            const color = score >= 8 ? 'green' : score >= 6 ? 'yellow' : 'red';
            const mockAnalysis = {
                score,
                color,
                badges: [
                    score >= 8 ? "Curiosity gap detected" : "Generic opening detected",
                    hook.length < 150 ? "Optimal length" : "Too verbose warning"
                ],
                feedback: `Simulated hook feedback for: "${hook}". Connect your Gemini API Key in your .env file to enable live AI analysis.`,
                alternatives: [
                    `Unpopular opinion: ${hook.replace(/^Unpopular opinion: /i, '')}`,
                    `Nobody talks about this: ${hook}`,
                    `Why is everyone wrong about this: ${hook}`
                ]
            };
            return NextResponse.json(mockAnalysis);
        }

        if (!hook) {
            return NextResponse.json({ error: 'Hook text is required' }, { status: 400 });
        }

        if (userId) {
            const dbUser = await prisma.user.findUnique({ where: { id: userId } });
            if (dbUser) {
                const ONE_DAY = 24 * 60 * 60 * 1000;
                const daysSinceCreation = Math.floor((Date.now() - new Date(dbUser.createdAt).getTime()) / ONE_DAY);
                const isTrialActive = daysSinceCreation < 14;
                const isPro = dbUser.plan === 'PRO' || dbUser.plan === 'BUSINESS';

                if (!isTrialActive && !isPro) {
                    return NextResponse.json(
                        { error: 'Viral Hook Engine is a Pro feature. Please upgrade.' },
                        { status: 403 }
                    );
                }
            }
        }

        const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

        const prompt = `Analyze this LinkedIn post opening line (hook): "${hook}"

    Return a JSON object with the following structure (do not include markdown formatting):
    {
      "score": number (1-10),
      "color": "green" | "yellow" | "red",
      "badges": ["string (e.g., Curiosity gap detected, Emotional trigger present, Question fatigue warning, Generic opening detected)"],
      "feedback": "string (Why this score?)",
      "alternatives": ["string (Alternative hook 1)", "string (Alternative hook 2)", "string (Alternative hook 3)"]
    }

    Scoring criteria:
    - 8-10 (Green): High curiosity, strong emotion, or specific benefit.
    - 5-7 (Yellow): Good but could be sharper.
    - 1-4 (Red): Generic, boring, or too long.`;

        const result = await withRetry(async () => {
            return await model.generateContent(prompt);
        });
        const response = await result.response;
        let text = response.text();

        // Clean up markdown code blocks if present (handle ```json and ```)
        text = text.replace(/```(?:json)?/g, '').replace(/```/g, '').trim();

        let analysis;
        try {
            analysis = JSON.parse(text);
        } catch (e) {
            console.error("Failed to parse LLM response:", text);
            return NextResponse.json(
                { error: 'Failed to parse AI response. Please try again.' },
                { status: 500 }
            );
        }

        // Save to DB if logged in
        if (userId && sessionUser) {
            try {
                // Ensure user exists in DB first (upsert)
                await prisma.user.upsert({
                    where: { id: userId },
                    update: {},
                    create: { id: userId, email: sessionUser.email },
                });

                await prisma.hookAnalysis.create({
                    data: {
                        hookText: hook,
                        score: analysis.score,
                        feedback: JSON.stringify(analysis),
                        userId: userId,
                    },
                });
            } catch (dbError) {
                console.error("Database error saving analysis:", dbError);
                // Don't fail the request if saving to DB fails, just log it
            }
        }

        return NextResponse.json(analysis);
    } catch (error: any) {
        console.error("Hook analysis error:", error);

        const errorMsg = error.message?.toLowerCase() || "";
        
        if (errorMsg.includes('leaked') || errorMsg.includes('revoked') || error.status === 403) {
            return NextResponse.json(
                { error: 'AI API Key is invalid or revoked. Please update configuration.' },
                { status: 403 }
            );
        }

        if (errorMsg.includes('invalid') || errorMsg.includes('expired') || error.status === 400) {
            return NextResponse.json(
                { error: 'AI API Key is expired or invalid. Please provide a new key.' },
                { status: 400 }
            );
        }

        if (errorMsg.includes('not found') || error.status === 404) {
            return NextResponse.json(
                { error: 'AI Model not found. Please check model name and API key access.' },
                { status: 404 }
            );
        }

        return NextResponse.json(
            { error: error instanceof Error ? error.message : 'Failed to analyze hook. Please try again later.' },
            { status: 500 }
        );
    }
}
