import fetch from "node-fetch";
import dotenv from "dotenv";

dotenv.config();

async function testHF() {
  const response = await fetch(
    "https://api-inference.huggingface.co/models/j-hartmann/emotion-english-distilroberta-base",
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.HF_TOKEN}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ inputs: "I feel excited and happy today!" }),
    }
  );

  const result = await response.json();
  console.log("Emotion Analysis Result:", result);
}

testHF();
