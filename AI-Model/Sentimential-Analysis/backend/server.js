import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import reportRouter from "./routes/report.js";
import { EventEmitter } from "events";

EventEmitter.defaultMaxListeners = 20;
dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5000;

// Routes
app.use("/api/report", reportRouter);

// Health check endpoint
app.get("/health", (req, res) => {
  res.json({ 
    status: "OK", 
    gemini: !!process.env.GEMINI_API_KEY,
    huggingface: !!process.env.HF_TOKEN 
  });
});

// Root endpoint
app.get("/", (req, res) => {
  res.json({ 
    message: "Mental Health Analysis API",
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
  console.log(`📊 Health check: http://localhost:${PORT}/health`);
});