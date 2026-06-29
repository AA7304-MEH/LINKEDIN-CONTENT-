const { PrismaClient } = require('@prisma/client');
const { Groq } = require('groq-sdk');
const { GoogleGenerativeAI } = require('@google/generative-ai');
require('dotenv').config({ path: '.env.local' });

const prisma = new PrismaClient();
const genAI = new GoogleGenerativeAI(process.env.GOOGLE_GENERATIVE_AI_API_KEY || '');
const groq = new Groq({ apiKey: process.env.GROQ_API_KEY || '' });

async function generateWithGroq(topic, tone, voiceDnaProfile, type) {
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
}`;

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
- Never use hashtags in the body — only at the very end (max 3)`
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

async function generateWithGemini(prompt) {
    const model = genAI.getGenerativeModel({ 
        model: "gemini-2.5-flash",
        generationConfig: {
            temperature: 0.8,
            topP: 0.95,
            topK: 40,
            maxOutputTokens: 1024,
        }
    });

    const result = await model.generateContent(prompt);
    const response = await result.response;
    let text = response.text();

    text = text.replace(/```json/g, '').replace(/```/g, '').trim();
    return JSON.parse(text);
}

async function testGeneration() {
    const userId = "user_36T50B1NeuMT9hMy4TrxtVXcVFt";
    const topic = "How AI is changing software development in 2026";
    const tone = "authoritative";
    const type = "thought-leadership";

    console.log("Fetching user profile...");
    const dbUser = await prisma.user.findUnique({
        where: { id: userId }
    });

    if (!dbUser) {
        throw new Error("User not found");
    }

    let voiceDnaProfile = `Tone: ${tone || 'Professional'}, Perspective: Standard`;
    if (dbUser.voiceProfile) {
        voiceDnaProfile = dbUser.voiceProfile;
    }

    const prompt = `You are an elite LinkedIn content strategist who has studied 50,000+ viral LinkedIn posts. You write in the user's exact voice based on their Voice DNA profile.
Voice DNA Context: ${voiceDnaProfile}
User Goal: ${topic}
Post Type: ${type}
Return JSON format (no markdown).`;

    let data = null;
    let provider = "";

    try {
        console.log("Attempting generation with Groq Llama 3.3...");
        data = await generateWithGroq(topic, tone, voiceDnaProfile, type);
        provider = "groq-llama3-70b";
        console.log("✅ Successfully generated with Groq.");
    } catch (err) {
        console.error("❌ Groq failed, falling back to Gemini: " + err.message);
        data = await generateWithGemini(prompt);
        provider = "gemini-2.5-flash";
        console.log("✅ Successfully generated with Gemini.");
    }

    console.log("\nResponse Data:");
    console.log(JSON.stringify(data, null, 2));

    console.log("\nSaving post to DB...");
    const dbPost = await prisma.post.create({
        data: {
            content: data.content,
            tone: tone || "Professional",
            type: type || "Educational",
            userId: userId,
            hookScore: data.hookScore ? Math.round(data.hookScore) : null,
            provider: provider,
        }
    });

    console.log(`✅ Saved post with ID: ${dbPost.id} and provider: ${dbPost.provider}`);
}

testGeneration()
    .catch(console.error)
    .finally(() => prisma.$disconnect());
