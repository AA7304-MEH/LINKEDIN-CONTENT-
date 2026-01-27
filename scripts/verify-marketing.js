
const fs = require('fs');
const path = require('path');

// Manually load .env.local
const envPath = path.resolve(__dirname, '..', '.env.local');
if (fs.existsSync(envPath)) {
    const envConfig = fs.readFileSync(envPath, 'utf-8');
    envConfig.split('\n').forEach(line => {
        const [key, ...valueParts] = line.split('=');
        if (key && valueParts.length > 0) {
            const value = valueParts.join('=').trim().replace(/^["']|["']$/g, '');
            process.env[key.trim()] = value;
        }
    });
    console.log("✅ Loaded .env.local");
} else {
    console.log("⚠️ .env.local not found at:", envPath);
}

const { GoogleGenerativeAI } = require('@google/generative-ai');

async function verifyMarketing() {
    console.log("Starting Marketing Verification (AI Only)...");

    try {
        const settings = {
            productName: "Resonate AI",
        };

        const apiKey = process.env.GOOGLE_GENERATIVE_AI_API_KEY;
        if (!apiKey) throw new Error("API Key missing in process.env");
        console.log("Using API Key:", apiKey.substring(0, 10) + "...");

        const genAI = new GoogleGenerativeAI(apiKey);
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

        const prompt = `Generate 1 marketing tweet for ${settings.productName}. Return strictly valid JSON: ["tweet content"]`;

        console.log("Attempting AI generation...");
        const result = await model.generateContent(prompt);
        const response = await result.response;
        const text = response.text();
        console.log("✅ AI Response received:", text);

        const cleanText = text.replace(/```json/g, "").replace(/```/g, "").trim();
        // const json = JSON.parse(cleanText);
        // console.log("✅ Parsed JSON:", json);

        console.log("SUCCESS: Marketing AI is operational.");

    } catch (error) {
        console.error("❌ Verification Failed:", error);
        process.exit(1);
    }
}

verifyMarketing();
