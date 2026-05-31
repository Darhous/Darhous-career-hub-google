import React, { useState, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { FileUp, FileText, CheckCircle2, AlertCircle, Sparkles, Loader2, Target, BarChart2, Briefcase } from "lucide-react";
import { Button } from "../components/ui/Button";
import { cn } from "../lib/utils";
import type { CVAnalysisResult } from "../types";

export function CVAnalyzer() {
  const [cvText, setCvText] = useState("");
  const [jobDescription, setJobDescription] = useState("");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [result, setResult] = useState<CVAnalysisResult | null>(null);
  
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    const formData = new FormData();
    formData.append("cv", file);

    try {
      const res = await fetch("/api/upload-cv", {
        method: "POST",
        body: formData,
      });
      const data = await res.json();
      if (res.ok) {
        setCvText(data.text);
      } else {
        alert("فشل تحميل أو قراءة الملف: " + (data.error || ""));
      }
    } catch (e) {
      console.error(e);
      alert("حدث خطأ أثناء تحميل الملف.");
    } finally {
      setIsUploading(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }
  };

  const handleAnalyze = async () => {
    if (!cvText.trim()) return;

    setIsAnalyzing(true);
    try {
      const res = await fetch("/api/analyze-cv", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: cvText, jobDescription }),
      });
      const data = await res.json();
      if (res.ok) {
        setResult(data);
      } else {
        console.error("Analysis failed:", data);
        alert("فشل التحليل. الرجاء المحاولة مرة أخرى.");
      }
    } catch (e) {
      console.error(e);
      alert("حدث خطأ في الاتصال بالخادم.");
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-16">
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-on-surface mb-2 flex items-center gap-3">
          <Target className="w-8 h-8 text-primary" />
          محلل أنظمة التتبع (ATS) الذكي
        </h1>
        <p className="text-on-surface-variant">
          قم برفع ملف سيرتك الذاتية (PDF/TXT) أو لصق محتواها لمعرفة نسبة توافقك وتحديد نقاط الضعف ونواقص الكلمات المفتاحية.
        </p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div className="glass-panel p-6 rounded-3xl flex flex-col h-[400px]">
            <div className="flex items-center justify-between mb-3">
              <label className="text-sm font-semibold flex items-center gap-2">
                <FileText className="w-4 h-4 text-primary" />
                محتوى السيرة الذاتية <span className="text-error">*</span>
              </label>
              
              <input 
                type="file" 
                ref={fileInputRef} 
                onChange={handleFileUpload} 
                accept=".pdf,.txt" 
                className="hidden" 
              />
              <Button 
                variant="outline" 
                size="sm" 
                className="gap-2 border-primary/30 text-primary hover:bg-primary/10"
                onClick={() => fileInputRef.current?.click()}
                disabled={isUploading}
              >
                {isUploading ? <Loader2 className="w-4 h-4 animate-spin" /> : <FileUp className="w-4 h-4" />}
                <span>رفع ملف (PDF/TXT)</span>
              </Button>
            </div>
            
            <textarea
              className="flex-1 w-full bg-surface-container-low/50 border border-outline-variant/30 rounded-xl p-4 text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all resize-none z-10"
              placeholder="ألصق محتوى سيرتك الذاتية هنا، أو قم برفع ملف..."
              value={cvText}
              onChange={(e) => setCvText(e.target.value)}
              dir="auto"
            />
          </div>
        </div>

        <div className="space-y-4">
          <div className="glass-panel p-6 rounded-3xl flex flex-col h-[400px]">
            <label className="text-sm font-semibold mb-3 flex items-center gap-2">
              <Briefcase className="w-4 h-4 text-secondary" />
               الوصف الوظيفي المستهدف <span className="text-on-surface-variant text-xs font-normal">(اختياري)</span>
            </label>
            <textarea
              className="flex-1 w-full bg-surface-container-low/50 border border-outline-variant/30 rounded-xl p-4 text-sm focus:outline-none focus:ring-2 focus:ring-secondary focus:border-transparent transition-all resize-none z-10"
              placeholder="شروط الوظيفة، المتطلبات، والمهام..."
              value={jobDescription}
              onChange={(e) => setJobDescription(e.target.value)}
              dir="auto"
            />
          </div>
        </div>
      </div>

      <div className="flex justify-center pt-4">
        <Button 
          size="lg" 
          className="w-full max-w-sm rounded-full py-6 text-lg font-bold shadow-lg shadow-primary/20 gap-3 relative overflow-hidden"
          onClick={handleAnalyze}
          disabled={!cvText.trim() || isAnalyzing}
        >
          {isAnalyzing ? (
            <Loader2 className="w-6 h-6 animate-spin" />
          ) : (
            <>
              <Sparkles className="w-6 h-6" />
              <span>ابدأ التحليل الذكي</span>
            </>
          )}
          {isAnalyzing && (
            <div className="absolute inset-0 bg-primary/20 ai-pulse pointer-events-none" />
          )}
        </Button>
      </div>

      <AnimatePresence>
        {result && (
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6 pt-10"
          >
            <div className="glass-panel p-8 rounded-[2rem] border-primary/20 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-full h-1 bg-gradient-to-l from-primary via-secondary to-tertiary" />
              
              <div className="flex flex-col md:flex-row items-center gap-8 mb-8 border-b border-outline-variant/30 pb-8">
                <div className="relative shrink-0 flex items-center justify-center">
                  <svg className="w-32 h-32 transform -rotate-90">
                    <circle
                      cx="64"
                      cy="64"
                      r="56"
                      stroke="currentColor"
                      strokeWidth="8"
                      fill="transparent"
                      className="text-surface-container-high"
                    />
                    <motion.circle
                      cx="64"
                      cy="64"
                      r="56"
                      stroke="currentColor"
                      strokeWidth="8"
                      fill="transparent"
                      strokeDasharray="351.858"
                      initial={{ strokeDashoffset: 351.858 }}
                      animate={{ strokeDashoffset: 351.858 - (351.858 * result.overall_score) / 100 }}
                      transition={{ duration: 1.5, ease: "easeOut" }}
                      className={cn(
                        result.overall_score >= 80 ? "text-tertiary" : result.overall_score >= 60 ? "text-secondary" : "text-error"
                      )}
                    />
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className="text-3xl font-bold font-mono tracking-tighter">{result.overall_score}%</span>
                    <span className="text-[10px] text-on-surface-variant uppercase tracking-wider">ATS Score</span>
                  </div>
                </div>

                <div className="flex-1">
                  <h3 className="text-2xl font-bold mb-2 flex items-center gap-2">
                    <BarChart2 className="w-6 h-6 text-primary" />
                    التقييم العام
                  </h3>
                  <p className="text-on-surface-variant leading-relaxed text-sm md:text-base">
                    {result.summary}
                  </p>
                  
                  <div className="grid grid-cols-2 md:grid-cols-5 gap-3 mt-6">
                    {[
                      { label: "الكلمات المفتاحية", score: result.keyword_score },
                      { label: "المهارات", score: result.skills_score },
                      { label: "الخبرة", score: result.experience_score },
                      { label: "التنسيق", score: result.formatting_score },
                      { label: "المقروئية", score: result.readability_score },
                    ].map((item, idx) => (
                      <div key={idx} className="bg-surface-container p-3 rounded-xl border border-outline-variant/30 text-center">
                        <div className={cn(
                          "text-xl font-bold font-mono mb-1",
                          item.score >= 80 ? "text-tertiary" : item.score >= 60 ? "text-secondary" : "text-error"
                        )}>{item.score}%</div>
                        <div className="text-[10px] text-on-surface-variant">{item.label}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {result.job_description_match_details && (
                <div className="mb-8 glass-panel p-6 rounded-2xl bg-primary/5 border-primary/20">
                  <h4 className="font-bold flex items-center gap-2 text-primary mb-3">
                    <Target className="w-5 h-5" /> تحليل مطابقة الوظيفة
                  </h4>
                  <p className="text-sm text-on-surface-variant leading-relaxed">
                    {result.job_description_match_details}
                  </p>
                </div>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Strengths */}
                <div className="space-y-4">
                  <h4 className="font-bold flex items-center gap-2 text-tertiary">
                    <CheckCircle2 className="w-5 h-5" /> نقاط القوة
                  </h4>
                  <ul className="space-y-3">
                    {result.strengths.map((str, i) => (
                      <li key={i} className="flex gap-3 text-sm text-on-surface bg-tertiary/5 border border-tertiary/10 p-3 rounded-lg">
                        <span className="text-tertiary shrink-0 mt-0.5">•</span>
                        <span>{str}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Weaknesses */}
                <div className="space-y-4">
                  <h4 className="font-bold flex items-center gap-2 text-error">
                    <AlertCircle className="w-5 h-5" /> الفجوات ونقاط الضعف
                  </h4>
                  <ul className="space-y-3">
                    {result.weaknesses.map((weak, i) => (
                      <li key={i} className="flex gap-3 text-sm text-on-surface bg-error/5 border border-error/10 p-3 rounded-lg">
                        <span className="text-error shrink-0 mt-0.5">•</span>
                        <span>{weak}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {result.weak_bullet_points && result.weak_bullet_points.length > 0 && (
                <div className="mt-8 space-y-4">
                  <h4 className="font-bold flex items-center gap-2 text-secondary">
                    <Sparkles className="w-5 h-5" /> نقاط تحتاج لإعادة صياغة
                  </h4>
                  <div className="grid grid-cols-1 gap-4">
                    {result.weak_bullet_points.map((point, i) => (
                      <div key={i} className="glass-panel p-4 rounded-xl grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="bg-surface-container-highest p-3 rounded-lg border border-error/20 inline-flex flex-col">
                           <span className="text-error text-[10px] uppercase font-bold mb-1 block">الحالية</span>
                           <span className="text-xs text-on-surface-variant strike line-through opacity-70">{point.original}</span>
                        </div>
                        <div className="bg-tertiary/5 p-3 rounded-lg border border-tertiary/20 inline-flex flex-col">
                           <span className="text-tertiary text-[10px] uppercase font-bold mb-1 block">المقترحة</span>
                           <span className="text-xs text-tertiary/90 font-medium">{point.suggestion}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
                 {/* Missing Keywords */}
                 <div className="space-y-4 glass-panel p-5 rounded-2xl bg-surface-container-low/30">
                  <h4 className="font-bold flex items-center gap-2 text-primary">
                    <AlertCircle className="w-5 h-5" /> الكلمات المفتاحية الناقصة (ATS)
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {result.keywords_missing.map((kw, i) => (
                      <span key={i} className="px-3 py-1.5 rounded-md bg-surface-container border border-outline-variant/30 text-xs text-on-surface font-medium">
                        {kw}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Recommendations */}
                <div className="space-y-4 glass-panel p-5 rounded-2xl bg-secondary/5 border-secondary/10">
                  <h4 className="font-bold flex items-center gap-2 text-secondary">
                    <CheckCircle2 className="w-5 h-5" /> توصيات التحسين الرئيسية
                  </h4>
                  <ul className="space-y-3">
                    {result.recommendations.map((rec, i) => (
                      <li key={i} className="flex gap-3 text-sm">
                        <span className="text-secondary shrink-0 font-bold">{i+1}.</span>
                        <span className="text-on-surface/90">{rec}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              
              {result.role_optimization_suggestions && result.role_optimization_suggestions.length > 0 && (
                <div className="mt-8 p-6 rounded-2xl bg-gradient-to-r from-surface-container to-surface-container-high border border-outline-variant/30">
                  <h4 className="font-bold mb-4 flex items-center gap-2 text-on-surface">
                    <Briefcase className="w-5 h-5 text-primary" /> تخصيص السيرة الذاتية للدور المستهدف
                  </h4>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                     {result.role_optimization_suggestions.map((sugg, i) => (
                       <li key={i} className="flex gap-3 text-sm text-on-surface-variant items-start">
                         <Target className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                         <span>{sugg}</span>
                       </li>
                     ))}
                  </ul>
                </div>
              )}

            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
