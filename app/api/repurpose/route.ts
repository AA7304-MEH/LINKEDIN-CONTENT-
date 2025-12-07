import { NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { auth } from '@clerk/nextjs/server';
import { prisma } from '@/lib/prisma'; // Ensure prisma is imported

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_GENERATIVE_AI_API_KEY || '');

export async function POST(request: Request) {
    try {
        const { sourceText, url } = await request.json();
        const { userId } = await auth();

        if (userId) {
            const dbUser = await prisma.user.findUnique({ where: { id: userId } });
            if (dbUser) {
                const ONE_DAY = 24 * 60 * 60 * 1000;
                const daysSinceCreation = Math.floor((Date.now() - new Date(dbUser.createdAt).getTime()) / ONE_DAY);
                const isTrialActive = daysSinceCreation < 14;
                const isPro = dbUser.plan === 'PRO' || dbUser.plan === 'BUSINESS';

                if (!isTrialActive && !isPro) {
                    return NextResponse.json(
                        { error: 'Content Repurposing is a Pro feature. Please upgrade.' },
                        { status: 403 }
                    );
                }
            }
        }

        // Basic validation
        if (!sourceText && !url) {
            return NextResponse.json({ error: 'Text or URL is required' }, { status: 400 });
        }

        let textToProcess = sourceText;

        // TODO: Implement actual URL scraping if URL provided
        // For now, if URL is provided but no text, we just treat URL as text (or mock fetch)
        // We'll rely on user pasting text for phase 1 of this feature to be robust
        if (url && !sourceText) {
            // Mock fetch placeholder
            textToProcess = `Content from ${url}`;
        }

        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

        const prompt = `Repurpose the following content into LinkedIn formats:
    Content: "${textToProcess.substring(0, 5000)}"

    Output JSON with 3 keys:
    1. "thread": A twitter/linkedin thread (array of strings).
    2. "carousel": Outline for a document carousel (5 slides, title + content).
    3. "question": An engaging discussion question based on the content.

    Return JSON only.`;

        const result = await model.generateContent(prompt);
        const response = await result.response;
        let text = response.text();
        text = text.replace(/```json/g, '').replace(/```/g, '').trim();

        const data = JSON.parse(text);

        return NextResponse.json(data);
    } catch (error) {
        console.error("Repurpose error:", error);
        return NextResponse.json(
            { error: 'Failed to repurpose content' },
            { status: 500 }
        );
    }
}
