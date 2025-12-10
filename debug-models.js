const { GoogleGenerativeAI } = require("@google/generative-ai");

const API_KEY = "AIzaSyDHPCYabbNjrxMN9rImrp8D57TpgYateuE";
const genAI = new GoogleGenerativeAI(API_KEY);

async function run() {
    console.log("Testing gemini-flash-latest...");
    try {
        const model = genAI.getGenerativeModel({ model: "gemini-flash-latest" });
        const result = await model.generateContent("Hello");
        console.log("SUCCESS: " + result.response.text());
    } catch (error) {
        console.log("FAILED: " + error.message);
    }
}

run();
