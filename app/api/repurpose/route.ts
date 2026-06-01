import { NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { getSessionUser } from '@/lib/security/authz';
import { prisma } from '@/lib/prisma';
import { withRetry } from '@/lib/ai-helper';
import * as cheerio from 'cheerio';

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_GENERATIVE_AI_API_KEY || '');

async function scrapeUrl(url: string): Promise<string> {
    const res = await fetch(url, {
        headers: {
            'User-Agent':
                'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0 Safari/537.36',
            'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
        },
        signal: AbortSignal.timeout(10000),
    });

    if (!res.ok) {
        throw new Error(`Failed to fetch URL: ${res.status} ${res.statusText}`);
    }

    const html = await res.text();
    const $ = cheerio.load(html);

    // Remove noise elements
    $('script, style, nav, header, footer, aside, noscript, iframe, form, [role="navigation"], [role="banner"], [role="complementary"]').remove();

    // Try semantic containers first, then fall back to body
    let text = '';
    const candidates = ['article', 'main', '[role="main"]', '.post-content', '.article-body', '.entry-content', 'body'];
    for (const selector of candidates) {
        const el = $(selector);
        if (el.length) {
            text = el
                .find('p, h1, h2, h3, h4, h5, h6, li, blockquote')
                .map((_: number, e: any) => $(e).text().trim())
                .get()
                .filter((t: string) => t.length > 30)
                .join('\n\n');
            if (text.length > 200) break;
        }
    }

    if (!text || text.length < 100) {
        throw new Error('Could not extract meaningful content from this URL. Try pasting the text directly.');
    }

    return text.substring(0, 6000);
}

export async function POST(request: Request) {
    try {
        const { sourceText, url } = await request.json();
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
                        { error: 'Content Repurposing is a Pro feature. Please upgrade.' },
                        { status: 403 }
                    );
                }
            }
        }

        if (!sourceText && !url) {
            return NextResponse.json({ error: 'Text or URL is required' }, { status: 400 });
        }

        let textToProcess = sourceText || '';

        if (url && !sourceText) {
            try {
                textToProcess = await scrapeUrl(url);
            } catch (scrapeErr: any) {
                return NextResponse.json({ error: scrapeErr.message || 'Failed to scrape URL.' }, { status: 422 });
            }
        }

        const model = genAI.getGenerativeModel({ model: 'gemini-2.5-flash' });

        const prompt = `Repurpose the following content into LinkedIn formats:
Content: "${textToProcess.substring(0, 5000)}"

Output JSON with 3 keys:
1. "thread": A linkedin thread (array of strings, each ~200 chars, 4-6 items).
2. "carousel": Outline for a document carousel (array of objects with "title" and "content", 4-6 slides).
3. "question": An engaging discussion question based on the content (single string).

Return JSON only, no markdown.`;

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
            console.error('JSON parse error:', text);
            throw new Error('Invalid JSON from AI');
        }

        if (!data.thread || !Array.isArray(data.thread)) data.thread = [];
        if (!data.carousel || !Array.isArray(data.carousel)) data.carousel = [];
        if (!data.question) data.question = 'What are your thoughts on this?';

        return NextResponse.json(data);
    } catch (error: any) {
        console.error('Repurpose error:', error);

        const errorMsg = error.message?.toLowerCase() || '';

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
            { error: 'Failed to repurpose content. Please try again later.' },
            { status: 500 }
        );
    }
}
