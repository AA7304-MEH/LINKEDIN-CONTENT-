const { Groq } = require('groq-sdk');
require('dotenv').config({ path: '.env.local' });

async function main() {
    const apiKey = process.env.GROQ_API_KEY;
    if (!apiKey) {
        console.error("❌ GROQ_API_KEY not found in .env.local");
        process.exit(1);
    }
    
    console.log("Starting Minimal Groq AI Test...");
    console.log("Using API Key from environment: " + apiKey.substring(0, 10) + "...");
    
    try {
        const groq = new Groq({ apiKey });
        const completion = await groq.chat.completions.create({
            model: "llama-3.3-70b-versatile",
            messages: [
                { role: "user", content: "Say hello!" }
            ],
            max_tokens: 10
        });
        
        console.log("✅ Response received: " + completion.choices[0]?.message?.content?.trim());
        console.log("SUCCESS: Groq key is working!");
    } catch (error) {
        console.error("❌ Groq AI call failed: " + (error.message || error));
        process.exit(1);
    }
}

main();
