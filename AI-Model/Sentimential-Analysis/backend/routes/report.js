import express from 'express';
import { queryHuggingFace } from '../utils/huggingface.js';
import { queryGemini } from '../utils/gemini.js';

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const { text } = req.body;
    
    if (!text) {
      return res.status(400).json({ 
        error: "No text provided",
        example: {
          text: "I have been feeling really anxious about work lately..."
        }
      });
    }

    if (text.length > 1000) {
      return res.status(400).json({ 
        error: "Text too long", 
        max_length: 1000,
        current_length: text.length 
      });
    }

    console.log("📥 Received analysis request, text length:", text.length);

    // 1️⃣ Hugging Face Emotion Analysis
    let emotions = [];
    try {
      const hfResult = await queryHuggingFace({ inputs: text });
      emotions = Array.isArray(hfResult[0]) ? hfResult[0] : hfResult;
      console.log("✅ HuggingFace analysis completed");
    } catch (hfError) {
      console.error("❌ HuggingFace error:", hfError.message);
      return res.status(500).json({ 
        error: "Emotion analysis failed",
        details: hfError.message 
      });
    }

    // 2️⃣ Gemini Analysis
    let summary = "";
    let insights = [];
    
    if (process.env.GEMINI_API_KEY) {
      try {
        console.log("🔮 Calling Gemini for insights...");
        const geminiResult = await queryGemini(text);
        summary = geminiResult?.summary || "No summary generated";
        insights = geminiResult?.insights || ["No insights generated"];
        console.log("✅ Gemini analysis completed");
      } catch (geminiError) {
        console.warn("⚠️ Gemini analysis failed:", geminiError.message);
        summary = "Advanced analysis unavailable";
        insights = ["Basic emotion analysis only"];
      }
    } else {
      console.warn("⚠️ No Gemini API key provided");
      summary = "Enable Gemini API for detailed insights";
      insights = ["Emotion analysis available"];
    }

    // Prepare response
    const response = {
      emotions: emotions.map(emotion => ({
        label: emotion.label,
        score: Math.round(emotion.score * 10000) / 10000 // Round to 4 decimals
      })),
      summary,
      insights,
      analysis: {
        primary_emotion: emotions[0]?.label || "unknown",
        confidence: emotions[0]?.score ? Math.round(emotions[0].score * 100) : 0,
        text_length: text.length
      }
    };

    console.log("📤 Sending response");
    res.json(response);

  } catch (error) {
    console.error("💥 Server error:", error);
    res.status(500).json({ 
      error: "Internal server error",
      message: error.message 
    });
  }
});

// GET endpoint for testing
router.get("/", (req, res) => {
  res.json({ 
    message: "Use POST method to analyze text",
    example: {
      method: "POST",
      url: "/api/report",
      body: {
        text: "Your text to analyze here..."
      }
    }
  });
});

export default router;