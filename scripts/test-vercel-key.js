const { GoogleGenerativeAI } = require('@google/generative-ai');
const apiKey = "AIzaSyDHPCYabbNjrxMN9rImrp8D57TpgYateuE";
const genAI = new GoogleGenerativeAI(apiKey);
const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

model.generateContent('Say hello!')
    .then(r => console.log('✅ Response:', r.response.text()))
    .catch(e => console.error('❌ Error:', e.message));
