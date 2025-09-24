import express from 'express';
import { queryHuggingFace } from '../utils/huggingface.js';
import { queryGemini } from '../utils/gemini.js';
import { JournalService } from '../utils/supabase.js';

const router = express.Router();

// Helper function for streak messages
function getStreakMessage(streak) {
  const messages = {
    0: "Start your journey today! ✨",
    1: "Great start! Keep it going tomorrow! 🌟",
    2: "Two days in a row! You're building a habit! 💪",
    3: "3-day streak! You're on fire! 🔥",
    7: "One week! Amazing consistency! 🎯",
    14: "Two weeks strong! You're incredible! 🌈",
    21: "Three weeks! You're building a powerful habit! ⚡",
    30: "One month! You're a journaling master! 🏆"
  };

  for (const [threshold, message] of Object.entries(messages).sort((a, b) => b[0] - a[0])) {
    if (streak >= parseInt(threshold)) {
      return message;
    }
  }
  
  return `Amazing ${streak}-day streak! Keep going! 🚀`;
}

// POST /api/report - Analyze text and store journal
router.post("/", async (req, res) => {
  try {
    const { text, userId = 'anonymous' } = req.body;
    
    if (!text) {
      return res.status(400).json({ 
        error: "No text provided",
        example: {
          text: "I am feeling good today",
          userId: "user-123"
        }
      });
    }

    console.log("📥 Received analysis request from user:", userId);

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
        const geminiResult = await queryGemini(text);
        summary = geminiResult?.summary || "No summary generated";
        insights = geminiResult?.insights || ["No insights generated"];
        console.log("✅ Gemini analysis completed");
      } catch (geminiError) {
        console.warn("⚠️ Gemini analysis failed");
        summary = "Advanced analysis unavailable";
        insights = ["Basic emotion analysis only"];
      }
    }

    // Prepare analysis data
    const analysisData = {
      confidence: emotions[0]?.score ? Math.round(emotions[0].score * 100) : 0,
      text_length: text.length
    };

    // 3️⃣ Store in Supabase (if configured)
    let storedJournal = null;
    let streakData = null;
    let storageSuccess = false;
    
    if (JournalService.isConfigured()) {
      try {
        storedJournal = await JournalService.storeJournalEntry(userId, {
          text,
          emotions,
          summary,
          insights,
          analysis: analysisData
        });
        console.log("💾 Journal stored in Supabase");

        // Update user streak
        streakData = await JournalService.updateUserStreak(userId);
        console.log("🔥 Streak updated");

        storageSuccess = true;
        
      } catch (dbError) {
        console.warn("⚠️ Database storage failed:", dbError.message);
        storageSuccess = false;
      }
    } else {
      console.warn("⚠️ Supabase not configured - using fallback storage");
      storageSuccess = false;
    }

    // Prepare current date/time for response
    const now = new Date();
    const currentDate = now.toISOString().split('T')[0];
    const currentTime = now.toTimeString().split(' ')[0];
    const primaryFeeling = emotions[0]?.label || 'unknown';

    // Prepare response
    const response = {
      journalId: storedJournal?.id || `memory-${Date.now()}`,
      date: currentDate,
      time: currentTime,
      feeling: primaryFeeling,
      text: text.substring(0, 100) + (text.length > 100 ? '...' : ''),
      emotions: emotions.map(emotion => ({
        label: emotion.label,
        score: Math.round(emotion.score * 10000) / 10000
      })),
      confidence: analysisData.confidence,
      streak: streakData ? {
        current_streak: streakData.current_streak,
        longest_streak: streakData.longest_streak,
        total_entries: streakData.total_entries,
        message: getStreakMessage(streakData.current_streak)
      } : {
        current_streak: 1,
        longest_streak: 1,
        total_entries: 1,
        message: getStreakMessage(1),
        note: "Streak calculated locally"
      },
      stored: storageSuccess,
      storage_type: storageSuccess ? "supabase" : "memory",
      timestamp: now.toISOString()
    };

    console.log("📤 Sending response - Storage:", response.storage_type);
    res.json(response);

  } catch (error) {
    console.error("💥 Server error:", error);
    res.status(500).json({ 
      error: "Internal server error",
      message: error.message 
    });
  }
});

// GET /api/report/journals/:userId - Get user's journals
router.get("/journals/:userId", async (req, res) => {
  try {
    const { userId } = req.params;
    const { limit = 10 } = req.query;

    let journals = [];
    let storageType = "memory";

    if (JournalService.isConfigured()) {
      try {
        journals = await JournalService.getUserJournals(userId, parseInt(limit));
        storageType = "supabase";
      } catch (error) {
        console.warn("⚠️ Failed to fetch from Supabase:", error.message);
        storageType = "error";
      }
    }

    res.json({
      userId,
      count: journals.length,
      storage_type: storageType,
      journals: journals.map(journal => ({
        id: journal.id,
        date: journal.date,
        time: journal.time,
        feeling: journal.feeling,
        text: journal.text,
        confidence: journal.confidence_score,
        created_at: journal.created_at
      }))
    });

  } catch (error) {
    console.error("💥 Error fetching journals:", error);
    res.status(500).json({ 
      error: "Failed to fetch journals",
      message: error.message 
    });
  }
});

// GET /api/report/streak/:userId - Get user streak information
router.get("/streak/:userId", async (req, res) => {
  try {
    const { userId } = req.params;

    let streakInfo = {
      current_streak: 0,
      longest_streak: 0,
      last_entry_date: null,
      total_entries: 0
    };
    let storageType = "memory";

    if (JournalService.isConfigured()) {
      try {
        streakInfo = await JournalService.getUserStreak(userId);
        storageType = "supabase";
      } catch (error) {
        console.warn("⚠️ Failed to fetch streak from Supabase:", error.message);
        storageType = "error";
      }
    }

    res.json({
      user_id: userId,
      ...streakInfo,
      motivational_message: getStreakMessage(streakInfo.current_streak),
      storage_type: storageType
    });

  } catch (error) {
    console.error("💥 Error fetching streak:", error);
    res.status(500).json({ 
      error: "Failed to fetch streak information",
      message: error.message 
    });
  }
});

export default router;