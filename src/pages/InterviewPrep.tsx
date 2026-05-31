import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { MessageSquare, Star, Key, ChevronDown, CheckCircle2, Mic, Play, PlayCircle, HelpCircle, Loader2 } from "lucide-react";
import { Button } from "../components/ui/Button";
import { cn } from "../lib/utils";

const ONDEMAND_QUESTIONS = [
  {
    category: "أسئلة سلوكية (Behavioral)",
    questions: [
      {
        q: "حدثني عن وقت واجهت فيه مشكلة تقنية معقدة وكيف قمت بحلها؟",
        hint: "استخدم أسلوب STAR (الموقف، المهمة، الإجراء، النتيجة). ركز على دورك الفعلي في الحل."
      },
      {
        q: "كيف تتعامل مع اختلاف الآراء التقنية مع زميل أو مدير في العمل؟",
        hint: "يبحثون عن احترافيتك، تواصلك الفعال، واستخدام البيانات والمنطق بدلاً من العواطف."
      }
    ]
  },
  {
    category: "أسئلة تقنية (Frontend - React)",
    questions: [
      {
        q: "ما هو الفرق بين Virtual DOM و Real DOM؟ وكيف تقوم React بتحسين الأداء؟",
        hint: "اذكر عملية الـ Reconciliation وخوارزمية Diffing واستخدم مصطلحات مثل Batching."
      },
      {
        q: "كيف تتعامل مع مشكلة تسرب الذاكرة (Memory Leak) في React useEffect؟",
        hint: "اشرح أهمية وظيفية التنظيف (Cleanup function) في useEffect وتأكد من إزالة Event Listeners."
      }
    ]
  }
];

export function InterviewPrep() {
  const [activeTab, setActiveTab] = useState<"questions" | "star">("questions");
  const [expandedQ, setExpandedQ] = useState<string | null>(null);

  // STAR Method State
  const [starData, setStarData] = useState({ situation: "", task: "", action: "", result: "" });
  const [isEvaluating, setIsEvaluating] = useState(false);
  const [evaluation, setEvaluation] = useState<any>(null);

  const handleEvaluate = async () => {
    if (!starData.situation || !starData.task || !starData.action || !starData.result) {
      alert("الرجاء تعبئة جميع حقول STAR قبل التقييم.");
      return;
    }
    
    setIsEvaluating(true);
    setEvaluation(null);

    try {
      const res = await fetch("/api/evaluate-interview", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(starData),
      });
      const data = await res.json();
      if (res.ok) {
        setEvaluation(data);
      } else {
        alert("حدث خطأ أثناء التقييم: " + (data.error || ""));
      }
    } catch (e) {
      alert("حدث خطأ في الاتصال بالخادم.");
    } finally {
      setIsEvaluating(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-16">
      <header className="mb-8 text-center bg-gradient-to-br from-surface-container-high to-surface-container rounded-3xl p-10 border border-outline-variant/30 relative overflow-hidden">
        <div className="absolute top-0 right-0 left-0 h-1 bg-gradient-to-l from-primary via-secondary to-tertiary opacity-70" />
        <div className="w-20 h-20 rounded-3xl bg-secondary/10 flex items-center justify-center mb-6 mx-auto">
          <MessageSquare className="w-10 h-10 text-secondary" />
        </div>
        <h1 className="text-3xl font-bold text-on-surface mb-4">
          مدرب المقابلات الوظيفية
        </h1>
        <p className="text-on-surface-variant max-w-2xl mx-auto leading-relaxed">
          استعد لمقابلتك القادمة بفعالية. تدرّب على أكثر الأسئلة شيوعاً في مجالك، وصمغ إجاباتك باستخدام استراتيجيات مثبتة مثل منهجية STAR.
        </p>
      </header>

      <div className="flex justify-center gap-4 mb-8">
        <Button
          variant={activeTab === "questions" ? "primary" : "outline"}
          className="rounded-full px-8"
          onClick={() => setActiveTab("questions")}
        >
          <HelpCircle className="w-4 h-4 mr-2 ml-2" /> بنك الأسئلة التقنية والسلوكية
        </Button>
        <Button
          variant={activeTab === "star" ? "secondary" : "outline"}
          className="rounded-full px-8"
          onClick={() => setActiveTab("star")}
        >
          <Star className="w-4 h-4 mr-2 ml-2" /> صانع إجابات STAR
        </Button>
      </div>

      <AnimatePresence mode="wait">
        {activeTab === "questions" && (
          <motion.div
            key="questions"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="space-y-8"
          >
            {ONDEMAND_QUESTIONS.map((group, groupIdx) => (
              <div key={groupIdx} className="space-y-4">
                <h2 className="text-xl font-bold text-on-surface border-b border-outline-variant/30 pb-3">
                   {group.category}
                </h2>
                <div className="space-y-3">
                  {group.questions.map((item, qIdx) => {
                     const isExpanded = expandedQ === `${groupIdx}-${qIdx}`;
                     return (
                        <div key={qIdx} className="glass-panel overflow-hidden rounded-2xl border-outline-variant/30 transition-all">
                           <button
                             className="w-full text-start p-5 flex justify-between items-center bg-surface-container/30 hover:bg-surface-container/80 transition-colors"
                             onClick={() => setExpandedQ(isExpanded ? null : `${groupIdx}-${qIdx}`)}
                           >
                              <span className="font-bold text-on-surface text-lg leading-relaxed">{item.q}</span>
                              <ChevronDown className={cn("w-5 h-5 text-on-surface-variant transition-transform", isExpanded && "rotate-180")} />
                           </button>
                           
                           <AnimatePresence>
                             {isExpanded && (
                               <motion.div
                                 initial={{ height: 0, opacity: 0 }}
                                 animate={{ height: "auto", opacity: 1 }}
                                 exit={{ height: 0, opacity: 0 }}
                                 className="border-t border-outline-variant/20 bg-surface-container-low"
                               >
                                 <div className="p-5 space-y-4">
                                   <div className="flex gap-3 text-sm items-start">
                                      <Key className="w-5 h-5 text-secondary shrink-0 mt-0.5" />
                                      <div>
                                        <h4 className="font-bold text-secondary mb-1">مفتاح الإجابة:</h4>
                                        <p className="text-on-surface-variant leading-relaxed">{item.hint}</p>
                                      </div>
                                   </div>
                                   
                                   <div className="pt-4 flex justify-end gap-3">
                                      <Button variant="outline" size="sm" className="gap-2">
                                         <PlayCircle className="w-4 h-4" /> تدرب مع الذكاء الاصطناعي
                                      </Button>
                                   </div>
                                 </div>
                               </motion.div>
                             )}
                           </AnimatePresence>
                        </div>
                     );
                  })}
                </div>
              </div>
            ))}
          </motion.div>
        )}

        {activeTab === "star" && (
          <motion.div
            key="star"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="grid grid-cols-1 lg:grid-cols-2 gap-6"
          >
             <div className="space-y-4">
                <div className="glass-panel p-6 rounded-3xl border-tertiary/20 relative">
                   <div className="absolute top-4 left-4 text-xs font-mono font-bold text-tertiary/40">S</div>
                   <h3 className="text-lg font-bold text-tertiary mb-2">الموقف (Situation)</h3>
                   <p className="text-sm text-on-surface-variant mb-4">ما هو السياق؟ متى حدث ذلك وما كانت المشكلة؟</p>
                   <textarea 
                     className="w-full bg-surface-container-low/50 border border-outline-variant/30 rounded-xl p-4 text-sm focus:outline-none focus:ring-2 focus:ring-tertiary focus:border-transparent resize-none h-24"
                     placeholder="أثناء عملي في شركة X، واجهنا انخفاضاً مفاجئاً في..."
                     value={starData.situation}
                     onChange={(e) => setStarData({...starData, situation: e.target.value})}
                   />
                </div>

                <div className="glass-panel p-6 rounded-3xl border-secondary/20 relative">
                   <div className="absolute top-4 left-4 text-xs font-mono font-bold text-secondary/40">T</div>
                   <h3 className="text-lg font-bold text-secondary mb-2">المهمة (Task)</h3>
                   <p className="text-sm text-on-surface-variant mb-4">ما هو دورك في هذا الموقف؟ ما الذي كان متوقعاً منك؟</p>
                   <textarea 
                     className="w-full bg-surface-container-low/50 border border-outline-variant/30 rounded-xl p-4 text-sm focus:outline-none focus:ring-2 focus:ring-secondary focus:border-transparent resize-none h-24"
                     placeholder="كان دوري هو تحديد سبب المشكلة وإيجاد حل برمجي فعال..."
                     value={starData.task}
                     onChange={(e) => setStarData({...starData, task: e.target.value})}
                   />
                </div>
                
                <div className="glass-panel p-6 rounded-3xl border-primary/20 relative">
                   <div className="absolute top-4 left-4 text-xs font-mono font-bold text-primary/40">A</div>
                   <h3 className="text-lg font-bold text-primary mb-2">الإجراء (Action)</h3>
                   <p className="text-sm text-on-surface-variant mb-4">ماذا فعلت تحديداً؟ ما هي الخطوات؟ (استخدم "أنا" وليس "نحن")</p>
                   <textarea 
                     className="w-full bg-surface-container-low/50 border border-outline-variant/30 rounded-xl p-4 text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent resize-none h-24"
                     placeholder="قمت بتحليل الأكواد المكتوبة سابقاً، واستخدمت أداة Profiler، ثم أعدت كتابة..."
                     value={starData.action}
                     onChange={(e) => setStarData({...starData, action: e.target.value})}
                   />
                </div>

                <div className="glass-panel p-6 rounded-3xl border-green-500/20 relative">
                   <div className="absolute top-4 left-4 text-xs font-mono font-bold text-green-500/40">R</div>
                   <h3 className="text-lg font-bold text-green-500 mb-2">النتيجة (Result)</h3>
                   <p className="text-sm text-on-surface-variant mb-4">ما هو تأثير أفعالك؟ (استخدم لغة الأرقام إن أمكن)</p>
                   <textarea 
                     className="w-full bg-surface-container-low/50 border border-outline-variant/30 rounded-xl p-4 text-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent resize-none h-24"
                     placeholder="أدى ذلك إلى تحسن في سرعة استجابة التطبيق بنسبة 30% وانخفاض معدل انسحاب..."
                     value={starData.result}
                     onChange={(e) => setStarData({...starData, result: e.target.value})}
                   />
                </div>
             </div>

             <div className="glass-panel border-outline-variant/30 rounded-[2rem] p-8 sticky top-6 h-fit bg-surface-container">
                <h3 className="font-bold text-xl mb-6">معاينة الإجابة</h3>
                {(starData.situation || starData.task || starData.action || starData.result) ? (
                  <div className="space-y-4 text-sm leading-relaxed text-on-surface">
                     {starData.situation && <p><span className="font-bold text-tertiary">الموقف:</span> {starData.situation}</p>}
                     {starData.task && <p><span className="font-bold text-secondary">المهمة:</span> {starData.task}</p>}
                     {starData.action && <p><span className="font-bold text-primary">الإجراء:</span> {starData.action}</p>}
                     {starData.result && <p><span className="font-bold text-green-500">النتيجة:</span> {starData.result}</p>}
                  </div>
                ) : (
                  <div className="text-center py-12 text-on-surface-variant opacity-50 flex flex-col items-center">
                    <Star className="w-12 h-12 mb-4 opacity-20" />
                     ابدأ بالكتابة في الصناديق لبناء إجابتك المنظمة
                  </div>
                )}

                <div className="mt-8 pt-6 border-t border-outline-variant/30">
                  <Button 
                    className="w-full gap-2 font-bold py-6"
                    onClick={handleEvaluate}
                    disabled={isEvaluating}
                  >
                     {isEvaluating ? <Loader2 className="w-5 h-5 animate-spin" /> : <CheckCircle2 className="w-5 h-5" />}
                     {isEvaluating ? "جاري التحليل..." : "التحقق من جودة الإجابة (بواسطة AI)"}
                  </Button>
                </div>

                {evaluation && (
                  <motion.div 
                    initial={{ opacity: 0, height: 0 }} 
                    animate={{ opacity: 1, height: 'auto' }}
                    className="mt-6 space-y-4"
                  >
                    <div className="flex items-center gap-3 bg-surface p-4 rounded-xl border border-outline-variant/30">
                      <div className="text-2xl font-bold font-mono text-primary">{evaluation.score}%</div>
                      <div className="text-sm font-medium">التقييم العام</div>
                    </div>
                    
                    <div className="bg-surface-container-low p-4 rounded-xl border border-outline-variant/30">
                      <h4 className="font-bold text-sm text-secondary mb-2">التقييم:</h4>
                      <p className="text-xs text-on-surface-variant leading-relaxed">{evaluation.feedback}</p>
                    </div>

                    <div className="bg-tertiary/10 p-4 rounded-xl border border-tertiary/30">
                      <h4 className="font-bold text-sm text-tertiary mb-2">إجابة محسنة (AI):</h4>
                      <p className="text-xs text-on-surface leading-relaxed">{evaluation.improved_answer}</p>
                    </div>
                  </motion.div>
                )}
             </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
