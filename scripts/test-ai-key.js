
const { GoogleGenerativeAI } = require('@google/generative-ai');

async function testAI() {
    console.log("Starting Minimal AI Test...");
    try {
        const apiKey = "AIzaSyD3duCChdqXVT7ULXn0nbf52cqAiLFu8JU";
        console.log("Using Hardcoded API Key...");

        const genAI = new GoogleGenerativeAI(apiKey);
        const model = genAI.getGenerativeModel({ model: "gemini-flash-latest" });

        const prompt = "Say hello!";

        console.log("Sending prompt...");
        const result = await model.generateContent(prompt);
        const response = await result.response;
        console.log("✅ Response:", response.text());

    } catch (error) {
        console.error("❌ Test Failed:", error);
    }
}

testAI();
