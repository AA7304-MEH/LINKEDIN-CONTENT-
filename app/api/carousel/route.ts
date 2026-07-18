import { NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { getSessionUser } from '@/lib/security/authz';
import { prisma } from '@/lib/prisma';
import { withRetry } from '@/lib/ai-helper';

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_GENERATIVE_AI_API_KEY || '');

export async function POST(request: Request) {
    try {
        const { topic, slideCount, style } = await request.json();
        const sessionUser = await getSessionUser();
        if (!sessionUser) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }
        const userId = sessionUser.id;

        if (userId) {
            const dbUser = await prisma.user.findUnique({ where: { id: userId } });
            if (dbUser) {
                const ONE_DAY = 24 * 60 * 60 * 1000;
                const daysSinceCreation = Math.floor((Date.now() - new Date(dbUser.createdAt).getTime()) / ONE_DAY);
                const isTrialActive = daysSinceCreation < 14;
                const isPro = dbUser.plan === 'PRO' || dbUser.plan === 'BUSINESS';

                if (!isTrialActive && !isPro) {
                    return NextResponse.json(
                        { error: 'Carousel Generation is a Pro feature. Please upgrade.' },
                        { status: 403 }
                    );
                }
            }
        }

        if (!topic) {
            return NextResponse.json({ error: 'Topic is required' }, { status: 400 });
        }

        const apiKey = process.env.GOOGLE_GENERATIVE_AI_API_KEY;
        if (!apiKey || apiKey.trim() === "" || apiKey === "your_api_key_here") {
            console.log("Gemini API key missing, generating mock carousel slides.");
            const mockSlides = [];
            const count = slideCount || 5;
            for (let i = 1; i <= count; i++) {
                if (i === 1) {
                    mockSlides.push({
                        slide: i,
                        headline: `How to master: ${topic}`,
                        points: ["Swipe left to learn the exact roadmap", "No fluff, just pure actionable strategy"],
                        cta: false
                    });
                } else if (i === count) {
                    mockSlides.push({
                        slide: i,
                        headline: "Summary & Action Step",
                        points: ["Start implementing these rules today", "Follow for more daily growth tips"],
                        cta: true
                    });
                } else {
                    mockSlides.push({
                        slide: i,
                        headline: `Key Concept #${i - 1}`,
                        points: [
                            `Actionable tip related to ${topic}`,
                            "Avoid the common mistakes most beginners make"
                        ],
                        cta: false
                    });
                }
            }
            return NextResponse.json({ slides: mockSlides });
        }

        const model = genAI.getGenerativeModel({ model: 'gemini-2.5-flash' });

        const prompt = `Generate a ${slideCount || 5}-slide LinkedIn carousel about: "${topic}".
Style description: ${style || 'Dark'}.

Format the response strictly as a JSON array where each item represents a slide:
[
  {"slide": 1, "headline": "Headline of Slide 1", "points": ["Point 1...", "Point 2..."], "cta": false},
  ...
  {"slide": ${slideCount || 5}, "headline": "Follow for more", "points": ["Get tips daily", "resodin.com"], "cta": true}
]

STRICT RULES:
- The first slide should be a high-impact hook slide.
- Middle slides should offer actionable value points.
- The last slide must be a Call to Action (CTA) slide.
- Return ONLY the raw JSON array (no markdown code blocks, no explanation).`;

        const result = await withRetry(async () => {
            return await model.generateContent(prompt);
        });
        const response = await result.response;
        let text = response.text();
        text = text.replace(/```json/g, '').replace(/```/g, '').trim();

        let data;
        try {
            data = JSON.parse(text);
        } catch (e) {
            console.error('JSON parse error in carousel generation:', text);
            throw new Error('Invalid JSON from AI');
        }

        return NextResponse.json({ slides: data });
    } catch (error: any) {
        console.error('Carousel error:', error);
        return NextResponse.json(
            { error: error.message || 'Failed to generate carousel.' },
            { status: 500 }
        );
    }
}
