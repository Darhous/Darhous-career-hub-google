import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import multer from "multer";
// @ts-ignore
import pdfParse from "pdf-parse";

const upload = multer({ storage: multer.memoryStorage() });

async function startServer() {
  const app = express();
  const PORT = process.env.PORT ? parseInt(process.env.PORT) : 3000;

  app.use(express.json());

  // Initialize Gemini API
  let ai: GoogleGenAI | null = null;
  try {
    if (process.env.GEMINI_API_KEY) {
      ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
    }
  } catch (error) {
    console.error("Failed to initialize Google Gen AI:", error);
  }

  app.post("/api/upload-cv", upload.single("cv"), async (req, res) => {
    try {
      if (!req.file) {
        return res.status(400).json({ error: "No file uploaded" });
      }

      if (req.file.mimetype === "application/pdf") {
        const data = await pdfParse(req.file.buffer);
        return res.json({ text: data.text });
      } else if (req.file.mimetype === "text/plain") {
        return res.json({ text: req.file.buffer.toString("utf-8") });
      } else {
        return res.status(400).json({ error: "Unsupported file type. Please upload PDF or TXT." });
      }
    } catch (error) {
       console.error("Error parsing file:", error);
       res.status(500).json({ error: "Failed to parse document" });
    }
  });

  app.post("/api/analyze-cv", async (req, res) => {
    try {
      if (!ai) {
        return res.status(500).json({ error: "Gemini API key is not configured" });
      }

      const { text, jobDescription } = req.body;

      if (!text) {
        return res.status(400).json({ error: "CV text is required" });
      }

      const prompt = `
        You are an elite ATS (Applicant Tracking System) algorithm, career coach, and expert recruiter.
        Analyze the following CV. Please respond ENTIRELY IN ARABIC, using professional HR terminology. You may include common English technical terms (e.g. "React", "CI/CD") where they naturally occur.

        CV Text:
        ${text}

        ${jobDescription ? `Target Job Description:\n${jobDescription}` : ''}

        Evaluate the CV across multiple dimensions (0-100) and provide a detailed analysis.
        Return your response ONLY AS A VALID JSON OBJECT matching exactly this structure (no markdown, no quotes around the json):
        {
          "overall_score": 85,
          "keyword_score": 80,
          "skills_score": 90,
          "experience_score": 85,
          "formatting_score": 70,
          "readability_score": 88,
          "summary": "ملخص عام لمدى قوة السيرة الذاتية وفرصها...",
          "strengths": ["نقطة قوة 1", "نقطة قوة 2"],
          "weaknesses": ["نقطة ضعف 1", "نقطة ضعف 2"],
          "weak_bullet_points": [{"original": "عملت على المشروع...", "suggestion": "زدت المبيعات بنسبة 20% من خلال قيادة فريق المشروع..."}],
          "keywords_missing": ["كلمة مفتاحية", "Framework X"],
          "recommendations": ["توصية تحسين 1", "توصية تحسين 2"],
          ${jobDescription ? `"job_description_match_details": "تحليل لمدى مطابقة السيرة الذاتية لمتطلبات الوظيفة المدخلة...",` : ''}
          "role_optimization_suggestions": ["اقتراح تخصيص 1 للدور المستهدف", "اقتراح 2"]
        }
      `;

      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: prompt,
      });

      const responseText = response.text || "{}";
      const jsonStr = responseText.replace(/```json/gi, '').replace(/```/gi, '').trim();
      
      try {
        const jsonResponse = JSON.parse(jsonStr);
        res.json(jsonResponse);
      } catch (e) {
         console.error("JSON Parsing Error from Gemini:", e, "Raw:", jsonStr);
         res.json({
            overall_score: 0, keyword_score: 0, skills_score: 0, experience_score: 0, formatting_score: 0, readability_score: 0,
            summary: "حدث خطأ أثناء قراءة تحليل الذكاء الاصطناعي. الرجاء المحاولة مرة أخرى.",
            strengths: [], weaknesses: [], weak_bullet_points: [], keywords_missing: [], recommendations: [], role_optimization_suggestions: [],
            raw: jsonStr
         });
      }
    } catch (error) {
      console.error("Error analyzing CV:", error);
      res.status(500).json({ error: "Internal server error analyzing CV" });
    }
  });

  app.post("/api/evaluate-interview", async (req, res) => {
    try {
      if (!ai) {
        return res.status(500).json({ error: "Gemini API key is not configured" });
      }

      const { situation, task, action, result } = req.body;

      if (!situation || !task || !action || !result) {
        return res.status(400).json({ error: "All STAR components are required" });
      }

      const prompt = `
        You are an expert technical interviewer and career coach.
        Evaluate this candidate's behavioral answer formatted using the STAR method.
        
        Situation: ${situation}
        Task: ${task}
        Action: ${action}
        Result: ${result}
        
        Please respond ENTIRELY IN ARABIC. Provide constructive feedback, point out strengths, weaknesses, and a suggested improved version of the answer.
        
        Return exactly in this JSON format (no markdown, no quotes around json):
        {
          "score": 85,
          "feedback": "...",
          "strengths": ["...", "..."],
          "improvements": ["...", "..."],
          "improved_answer": "..."
        }
      `;

      const aiResponse = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: prompt,
      });

      const responseText = aiResponse.text || "{}";
      const jsonStr = responseText.replace(/```json/gi, '').replace(/```/gi, '').trim();
      
      try {
        const jsonResponse = JSON.parse(jsonStr);
        res.json(jsonResponse);
      } catch (e) {
        console.error("JSON Parsing Error from Gemini (Interview):", e, jsonStr);
        res.status(500).json({ error: "Failed to parse AI response" });
      }
    } catch (error) {
      console.error("Error evaluating interview:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
