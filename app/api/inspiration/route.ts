import { NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { getSessionUser } from '@/lib/security/authz';
import { withRetry } from '@/lib/ai-helper';
import { prisma } from '@/lib/prisma';

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_GENERATIVE_AI_API_KEY || '');

export async function POST(request: Request) {
    try {
        const sessionUser = await getSessionUser();
        if (!sessionUser) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const { postText } = await request.json();
        if (!postText || postText.trim().length < 50) {
            return NextResponse.json({ error: 'Please paste a LinkedIn post (at least 50 characters)' }, { status: 400 });
        }

        // Fetch user voice profile to generate a similar post in their voice
        const dbUser = await prisma.user.findUnique({ where: { id: sessionUser.id } });
        const voiceProfile = dbUser?.voiceProfile ? JSON.parse(dbUser.voiceProfile) : null;
        const voiceContext = voiceProfile ? JSON.stringify(voiceProfile) : 'Professional and authentic LinkedIn voice';

        const apiKey = process.env.GOOGLE_GENERATIVE_AI_API_KEY;
        if (!apiKey || apiKey.trim() === "" || apiKey === "your_api_key_here") {
            console.log("Gemini API key missing, generating mock inspired post.");
            const mockInspiration = {
                analysis: {
                    hookType: "Pattern Interrupt Opener",
                    structure: "Hook ➔ Contrarian Concept ➔ 3 Bullet Takeaways ➔ Comment CTA",
                    whyItWorks: "This style interrupts the user's scroll by challenging standard beliefs and breaks content down into digestible, clean bullet items.",
                    keyTechniques: ["scroll interruption", "spacing", "contrarian opinion"]
                },
                similarPost: `🚀 Rethinking standard processes:\n\nMost teams spend 90% of their time planning and 10% executing.\nHere is how we inverted the ratio:\n\n1. Stop holding alignment meetings.\n2. Prototype inside the production codebase directly.\n3. Ship daily micro-releases.\n\nWhat is your team's biggest operational bottleneck?`
            };
            return NextResponse.json(mockInspiration);
        }

        const model = genAI.getGenerativeModel({ model: 'gemini-2.5-flash' });

        const prompt = `You are a LinkedIn content expert. Analyze the following post and then generate a similar post in the user's voice.

Inspiring Post:
"${postText.substring(0, 3000)}"

User's Voice DNA:
${voiceContext}

Return a JSON object with these keys:
{
  "analysis": {
    "hookType": "e.g. Pattern Interrupt",
    "structure": "e.g. Hook → Story → Lesson → CTA",
    "whyItWorks": "2-3 sentences explaining what made this post perform well",
    "keyTechniques": ["technique 1", "technique 2", "technique 3"]
  },
  "similarPost": "A full LinkedIn post inspired by the structure and style, but written in the user's voice and on a related topic. Do NOT copy the original."
}

Return JSON only, no markdown.`;

        const result = await withRetry(async () => await model.generateContent(prompt));
        const response = await result.response;
        let text = response.text();
        text = text.replace(/```json/g, '').replace(/```/g, '').trim();

        const data = JSON.parse(text);

        return NextResponse.json(data);
    } catch (error: any) {
        console.error('Inspiration analysis error:', error);
        return NextResponse.json(
            { error: error.message || 'Failed to analyze post.' },
            { status: 500 }
        );
    }
}
