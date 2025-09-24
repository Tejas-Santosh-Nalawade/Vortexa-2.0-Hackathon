import fetch from "node-fetch";

export async function queryHuggingFace(data) {
  if (!process.env.HF_TOKEN) {
    throw new Error("HuggingFace token not configured");
  }

  try {
    const response = await fetch(
      "https://api-inference.huggingface.co/models/j-hartmann/emotion-english-distilroberta-base",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${process.env.HF_TOKEN}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
        timeout: 30000, // 30 second timeout
      }
    );

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`HuggingFace API error: ${response.status} - ${errorText}`);
    }

    const result = await response.json();
    
    // Handle different response formats
    if (Array.isArray(result) && result.length > 0) {
      return Array.isArray(result[0]) ? result[0] : result;
    }
    
    return result;

  } catch (error) {
    console.error("HuggingFace API error:", error.message);
    throw error;
  }
}