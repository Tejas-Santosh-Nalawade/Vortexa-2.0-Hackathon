import fetch from "node-fetch";

export async function queryHuggingFace(data) {
  const response = await fetch(
    "https://api-inference.huggingface.co/models/j-hartmann/emotion-english-distilroberta-base",
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.HF_TOKEN}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }
  );

  if (!response.ok) throw new Error(`HF API error: ${response.status} ${response.statusText}`);

  return await response.json(); // returns [{label, score}, ...]
}
