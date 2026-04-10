require('dotenv').config({ path: '.env.local' });
const { GoogleGenerativeAI } = require('@google/generative-ai');

async function testAI() {
    console.log("Starting Minimal AI Test...");
    try {
        const apiKey = process.env.GOOGLE_GENERATIVE_AI_API_KEY;
        if (!apiKey) {
            console.error("❌ Error: GOOGLE_GENERATIVE_AI_API_KEY not found in .env.local");
            return;
        }

        console.log("Using API Key from environment...");

        const genAI = new GoogleGenerativeAI(apiKey);
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

        const prompt = "Say hello!";

        console.log("Sending prompt to gemini-1.5-flash...");
        const result = await model.generateContent(prompt);
        const response = await result.response;
        console.log("✅ Response received:", response.text());

    } catch (error) {
        const errorMsg = error.message?.toLowerCase() || "";
        if (errorMsg.includes("leaked") || errorMsg.includes("revoked") || error.status === 403) {
            console.error("\n❌ CRITICAL: API Key is LEAKED and REVOKED. Please generate a new key at https://aistudio.google.com/app/apikey");
        } else if (errorMsg.includes("invalid") || errorMsg.includes("expired") || error.status === 400) {
            console.error("\n❌ ERROR: API Key is INVALID or EXPIRED. Please get a fresh key at https://aistudio.google.com/app/apikey");
        } else if (errorMsg.includes("not found") || error.status === 404) {
            console.error("\n❌ ERROR: Model not found. Check if gemini-1.5-flash is available for your key.");
        } else {
            console.error("\n❌ Test Failed:", error.message || error);
        }
    }
}

testAI();
