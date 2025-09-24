import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { EventEmitter } from "events";

// Load environment variables FIRST
dotenv.config();

// Check if Supabase variables are loaded
console.log("🔍 Environment Check:");
console.log("SUPABASE_URL:", process.env.SUPABASE_URL ? "Loaded ✅" : "Missing ❌");
console.log("SUPABASE_ANON_KEY:", process.env.SUPABASE_ANON_KEY ? "Loaded ✅" : "Missing ❌");

// Only import Supabase if variables are present
let reportRouter;
if (process.env.SUPABASE_URL && process.env.SUPABASE_ANON_KEY) {
  reportRouter = (await import("./routes/report.js")).default;
} else {
  console.warn("⚠️ Supabase variables missing - database features disabled");
}

EventEmitter.defaultMaxListeners = 20;

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5000;

// Routes (only if Supabase is configured)
if (reportRouter) {
  app.use("/api/report", reportRouter);
} else {
  // Basic route without database functionality
  app.post("/api/report", (req, res) => {
    res.status(500).json({ 
      error: "Database not configured",
      message: "Please set SUPABASE_URL and SUPABASE_ANON_KEY in .env file" 
    });
  });
}

// Health check endpoint
app.get("/health", (req, res) => {
  res.json({ 
    status: "OK", 
    gemini: !!process.env.GEMINI_API_KEY,
    huggingface: !!process.env.HF_TOKEN,
    supabase: !!(process.env.SUPABASE_URL && process.env.SUPABASE_ANON_KEY)
  });
});

// Root endpoint
app.get("/", (req, res) => {
  res.json({ 
    message: "Mental Health Analysis API",
    database: !!(process.env.SUPABASE_URL && process.env.SUPABASE_ANON_KEY) ? "Connected ✅" : "Not Configured ❌",
    endpoints: {
      health: "GET /health",
      analyze: "POST /api/report"
    }
  });
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log("🔑 Gemini API Key:", process.env.GEMINI_API_KEY ? "Loaded ✅" : "Not found ❌");
  console.log("🔑 HuggingFace Token:", process.env.HF_TOKEN ? "Loaded ✅" : "Not found ❌");
  console.log("🗄️ Supabase:", (process.env.SUPABASE_URL && process.env.SUPABASE_ANON_KEY) ? "Connected ✅" : "Not configured ❌");
});