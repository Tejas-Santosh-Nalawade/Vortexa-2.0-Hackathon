import { GoogleGenerativeAI } from '@google/generative-ai';
import dotenv from 'dotenv';

dotenv.config();

async function testGemini() {
  if (!process.env.GEMINI_API_KEY) {
    console.log("❌ No GEMINI_API_KEY found");
    return;
  }

  console.log("🔑 API Key found (first 10 chars):", process.env.GEMINI_API_KEY.substring(0, 10) + "...");

  try {
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    
    // Test available models
    console.log("📋 Checking available models...");
    const models = await genAI.listModels();
    console.log("Available models:", models.models.map(m => m.name));
    
  } catch (error) {
    console.error("❌ Error testing Gemini:", error.message);
  }
}

testGemini();