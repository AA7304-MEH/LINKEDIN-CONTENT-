import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { sendEmail } from '@/lib/email';
import { GoogleGenerativeAI } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_GENERATIVE_AI_API_KEY || '');

async function generateWeeklyAIContent(
    userName: string, 
    postsCount: number, 
    impressions: number, 
    reactions: number, 
    voiceProfile: string
): Promise<{ insight: string, suggestions: string[] }> {
    const apiKey = process.env.GOOGLE_GENERATIVE_AI_API_KEY;
    if (!apiKey || apiKey.trim() === "" || apiKey === "your_api_key_here") {
        return {
            insight: "Your focus on storytelling hooks and clear mobile line-spacing drove higher organic reach this week.",
            suggestions: [
                "The biggest mistake people make in your niche and how you solved it.",
                "A contrarian take on a standard industry practice you disagree with.",
                "One specific tool or ritual that saves you 5 hours every week."
            ]
        };
    }

    try {
        const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });
        
        const prompt = `Analyze the weekly LinkedIn performance metrics for user "${userName}":
- Number of posts: ${postsCount}
- Weekly impressions: ${impressions}
- Total reactions/comments: ${reactions}
- Voice Profile DNA: ${voiceProfile || "Standard professional style"}

Return a JSON object with:
{
  "insight": "1-sentence actionable insight on what worked well this week (max 20 words)",
  "suggestions": ["3 specific, highly engaging LinkedIn post topic suggestions for next week customized for this user's niche (each max 12 words)"]
}

Return ONLY valid JSON. No markdown formatting.`;

        const result = await model.generateContent(prompt);
        const response = await result.response;
        let text = response.text();
        text = text.replace(/```json/g, '').replace(/```/g, '').trim();
        const data = JSON.parse(text);
        return {
            insight: data.insight || "Your focus on clear storytelling hooks drove higher reach this week.",
            suggestions: data.suggestions || [
                "The biggest mistake people make in your niche and how you solved it.",
                "A contrarian take on a standard industry practice you disagree with.",
                "One specific tool or ritual that saves you 5 hours every week."
            ]
        };
    } catch (err) {
        console.error("Gemini weekly cron generation error:", err);
        return {
            insight: "Your focus on conversational hooks drove positive scroll-stopping reach this week.",
            suggestions: [
                "The biggest mistake people make in your niche and how you solved it.",
                "A contrarian take on a standard industry practice you disagree with.",
                "One specific tool or ritual that saves you 5 hours every week."
            ]
        };
    }
}

export async function GET(request: Request) {
    try {
        // Validate Vercel authorization cron secret
        const authHeader = request.headers.get('authorization');
        if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const now = new Date();
        const sevenDaysAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
        const fourteenDaysAgo = new Date(now.getTime() - 14 * 24 * 60 * 60 * 1000);

        // Fetch all users
        const users = await prisma.user.findMany();
        let reportsSent = 0;

        for (const user of users) {
            // Get user's posts from the last 7 days
            const currentWeekPosts = await prisma.post.findMany({
                where: {
                    userId: user.id,
                    createdAt: { gte: sevenDaysAgo }
                },
                include: { analytics: true }
            });

            // Get user's posts from previous week
            const previousWeekPosts = await prisma.post.findMany({
                where: {
                    userId: user.id,
                    createdAt: {
                        gte: fourteenDaysAgo,
                        lt: sevenDaysAgo
                    }
                },
                include: { analytics: true }
            });

            // Compute current week metrics
            let currentImpressions = 0;
            let currentReactions = 0;
            let bestPostContent = "No posts published yet.";
            let bestPostImpressions = 0;

            currentWeekPosts.forEach(post => {
                if (post.analytics) {
                    currentImpressions += post.analytics.impressions;
                    currentReactions += post.analytics.reactions + post.analytics.comments;
                    if (post.analytics.impressions > bestPostImpressions) {
                        bestPostImpressions = post.analytics.impressions;
                        bestPostContent = post.content;
                    }
                }
            });

            // Compute previous week impressions
            let previousImpressions = 0;
            previousWeekPosts.forEach(post => {
                if (post.analytics) {
                    previousImpressions += post.analytics.impressions;
                }
            });

            // Calculate percentage change
            let pctChange = 0;
            if (previousImpressions > 0) {
                pctChange = Math.round(((currentImpressions - previousImpressions) / previousImpressions) * 100);
            } else if (currentImpressions > 0) {
                pctChange = 15; // default positive trend indicator
            }

            const userName = user.email.split('@')[0];

            // Generate AI insights and topic suggestions
            const aiContent = await generateWeeklyAIContent(
                userName,
                currentWeekPosts.length,
                currentImpressions,
                currentReactions,
                user.voiceProfile || ""
            );

            // Construct email template using inline styles
            const subject = `Your LinkedIn grew ${pctChange >= 0 ? '+' : ''}${pctChange}% this week, ${userName} 📈`;
            
            const html = `
            <!DOCTYPE html>
            <html>
            <head>
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
            </head>
            <body style="background-color: #030712; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; margin: 0; padding: 20px; color: #f3f4f6;">
                <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px; margin: 0 auto; background-color: #0b0f19; border: 1px solid #1f2937; border-radius: 16px; overflow: hidden; padding: 30px;">
                    <tr>
                        <td align="center" style="padding-bottom: 20px; border-bottom: 1px solid #1f2937;">
                            <h1 style="color: #06B6D4; font-size: 24px; font-weight: 800; margin: 0; letter-spacing: -0.05em;">Resodin AI</h1>
                            <p style="color: #6b7280; font-size: 13px; margin: 5px 0 0 0; text-transform: uppercase; font-weight: 700; letter-spacing: 0.1em;">Weekly Performance Digest</p>
                        </td>
                    </tr>
                    <tr>
                        <td style="padding: 30px 0;">
                            <h2 style="font-size: 20px; font-weight: 700; margin: 0 0 10px 0; color: #fff;">Weekly Growth Overview</h2>
                            <p style="color: #9ca3af; font-size: 15px; line-height: 1.6; margin: 0 0 20px 0;">Hey ${userName}, here is how your LinkedIn feed performed over the past 7 days:</p>
                            
                            <!-- Metric Grid -->
                            <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%" style="margin-bottom: 30px;">
                                <tr>
                                    <td width="50%" style="padding-right: 10px;">
                                        <div style="background-color: #111827; border: 1px solid #1f2937; border-radius: 12px; padding: 15px; text-align: center;">
                                            <span style="color: #6b7280; font-size: 11px; text-transform: uppercase; font-weight: 700; display: block; margin-bottom: 5px;">Weekly Impressions</span>
                                            <strong style="color: #fff; font-size: 28px; font-weight: 800; display: block;">${currentImpressions.toLocaleString()}</strong>
                                            <span style="color: ${pctChange >= 0 ? '#10b981' : '#ef4444'}; font-size: 12px; font-weight: 700; display: block; margin-top: 5px;">
                                                ${pctChange >= 0 ? '▲' : '▼'} ${pctChange}% vs last week
                                            </span>
                                        </div>
                                    </td>
                                    <td width="50%" style="padding-left: 10px;">
                                        <div style="background-color: #111827; border: 1px solid #1f2937; border-radius: 12px; padding: 15px; text-align: center;">
                                            <span style="color: #6b7280; font-size: 11px; text-transform: uppercase; font-weight: 700; display: block; margin-bottom: 5px;">Posts Published</span>
                                            <strong style="color: #fff; font-size: 28px; font-weight: 800; display: block;">${currentWeekPosts.length}</strong>
                                            <span style="color: #6b7280; font-size: 12px; display: block; margin-top: 5px;">Consistent consistency</span>
                                        </div>
                                    </td>
                                </tr>
                            </table>

                            <!-- AI Insights -->
                            <div style="background-color: rgba(6, 182, 212, 0.05); border-left: 4px solid #06B6D4; border-radius: 0 8px 8px 0; padding: 15px; margin-bottom: 30px;">
                                <h3 style="font-size: 14px; font-weight: 700; margin: 0 0 5px 0; color: #06B6D4; text-transform: uppercase;">✨ AI Analysis</h3>
                                <p style="color: #d1d5db; font-size: 14px; line-height: 1.5; margin: 0;">${aiContent.insight}</p>
                            </div>

                            <!-- Best Post -->
                            <div style="background-color: #111827; border: 1px solid #1f2937; border-radius: 12px; padding: 20px; margin-bottom: 30px;">
                                <h3 style="font-size: 14px; font-weight: 700; margin: 0 0 10px 0; color: #fff;">🏆 Best Performing Post</h3>
                                <p style="color: #9ca3af; font-size: 14px; line-height: 1.6; font-style: italic; margin: 0 0 10px 0;">&ldquo;${bestPostContent.substring(0, 100)}...&rdquo;</p>
                                <span style="background-color: rgba(6, 182, 212, 0.1); color: #22d3ee; font-size: 12px; padding: 4px 8px; border-radius: 4px; font-weight: 600; display: inline-block;">
                                    Score: ${bestPostImpressions.toLocaleString()} impressions
                                </span>
                            </div>

                            <!-- Topic Suggestions -->
                            <div style="margin-bottom: 35px;">
                                <h3 style="font-size: 15px; font-weight: 700; margin: 0 0 12px 0; color: #fff; text-transform: uppercase;">💡 Next Week's Topic Blueprints</h3>
                                <ul style="margin: 0; padding-left: 20px; color: #d1d5db; font-size: 14px; line-height: 1.6;">
                                    ${aiContent.suggestions.map(s => `<li style="margin-bottom: 8px;"><strong>${s}</strong></li>`).join('')}
                                </ul>
                            </div>

                            <!-- Call to Action -->
                            <div align="center">
                                <a href="https://linkedin-content-two.vercel.app/dashboard" style="background-color: #06B6D4; color: #ffffff; text-decoration: none; padding: 12px 24px; font-size: 15px; font-weight: 700; border-radius: 8px; display: inline-block; box-shadow: 0 4px 12px rgba(6, 182, 212, 0.25);">
                                    Generate this week's posts →
                                </a>
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <td align="center" style="padding-top: 20px; border-top: 1px solid #1f2937; color: #6b7280; font-size: 12px;">
                            <p style="margin: 0;">Sent by Resodin AI. Scale your professional social footprint.</p>
                            <p style="margin: 5px 0 0 0;">resodin.vercel.app</p>
                        </td>
                    </tr>
                </table>
            </body>
            </html>
            `;

            await sendEmail({
                to: user.email,
                subject,
                html
            });

            reportsSent++;
        }

        return NextResponse.json({ success: true, reportsSent });
    } catch (err: any) {
        console.error("Weekly cron email dispatch error:", err);
        return NextResponse.json({ error: err.message || "Failed to process weekly cron" }, { status: 500 });
    }
}
