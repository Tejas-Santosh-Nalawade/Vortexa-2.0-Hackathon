import express from "express";
import { queryHuggingFace } from "../utils/huggingface.js";
import { queryGPT } from "../utils/gpt.js"; // optional for summary/insights

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const { text } = req.body;

    if (!text) return res.status(400).json({ error: "No text provided" });

    // 1️⃣ Call Hugging Face for emotion detection
    const emotions = await queryHuggingFace({ inputs: text });

    // 2️⃣ Call GPT to generate summary and insights (optional)
    const { summary, insights } = await queryGPT(text);

    // 3️⃣ Return a complete report
    res.json({
      emotions,    // array of {label, score}
      summary,     // string
      insights     // array of suggestions
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

export default router;
