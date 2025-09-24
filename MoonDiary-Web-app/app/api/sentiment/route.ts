import { NextRequest, NextResponse } from "next/server";

// Simple keyword-based sentiment as placeholder; integrate HuggingFace/OpenAI later
export async function POST(req: NextRequest) {
  try {
    const { text } = await req.json();
    if (!text || typeof text !== "string") {
      return NextResponse.json({ error: "Invalid text" }, { status: 400 });
    }

    const lower = text.toLowerCase();
    const positive = ["happy", "great", "good", "love", "excited", "grateful"];
    const negative = ["sad", "bad", "angry", "anxious", "stress", "depress", "overwhelm"];

    let score = 0;
    positive.forEach((w) => { if (lower.includes(w)) score += 1; });
    negative.forEach((w) => { if (lower.includes(w)) score -= 1; });

    const sentiment = score > 0 ? "positive" : score < 0 ? "negative" : "neutral";

    return NextResponse.json({ sentiment, score });
  } catch (e) {
    return NextResponse.json({ error: "Failed to analyze sentiment" }, { status: 500 });
  }
}


