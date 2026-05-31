import { motion, AnimatePresence } from "motion/react";
import { Map, Flag, Compass, BookOpen, Trophy, ArrowLeft, Clock, CheckCircle2, Circle } from "lucide-react";
import { Button } from "../components/ui/Button";
import { useState } from "react";
import { cn } from "../lib/utils";

const ROADMAP_STEPS = [
  {
    id: 1,
    title: "تأسيس المهارات التقنية (Foundation)",
    description: "بناء أساس قوي في تقنيات الواجهات الأمامية المطلوبة للسوق.",
    icon: BookOpen,
    status: "completed",
    duration: "4 أسابيع",
    tasks: [
      { text: "إتقان معماريات React المتقدمة", done: true },
      { text: "فهم أساسيات إدارة الحالة (Zustand/Redux)", done: true }
    ],
    skills: ["React", "TypeScript", "Tailwind CSS"],
  },
  {
    id: 2,
    title: "مرحلة التطبيق والمشاريع (Portfolio)",
    description: "تطبيق عملي: بناء موقع يعرض مشاريعك بتصميم متجاوب.",
    icon: Compass,
    status: "active",
    duration: "3 أسابيع",
    tasks: [
      { text: "برمجة لوحة تحكم تفاعلية متكاملة", done: true },
      { text: "ربط واجهات برمجة التطبيقات (APIs)", done: false },
      { text: "نشر المشروع على Vercel أو منصات أخرى", done: false }
    ],
    skills: ["Vite", "API Integration", "Deployment"],
  },
  {
    id: 3,
    title: "الشهادات والاعتمادات (Certifications)",
    description: "اجتياز الدورة والحصول على الشهادة لتعزيز السيرة الذاتية.",
    icon: Trophy,
    status: "pending",
    duration: "أسبوعان",
    tasks: [
      { text: "الحصول على شهادة Meta Frontend Developer", done: false },
      { text: "إتمام تحديات LeetCode (الخوارزميات)", done: false }
    ],
    skills: ["Algorithms", "Problem Solving"],
  },
  {
    id: 4,
    title: "التقديم الوظيفي والمقابلات (Applications)",
    description: "البدء في استخدام المطابقة الذكية للتقديم على وظائف تناسب خبرتك الحالية.",
    icon: Flag,
    status: "pending",
    duration: "مستمر",
    tasks: [
      { text: "تحديث السيرة الذاتية باستخدام المحلل الذكي", done: false },
      { text: "التقديم على 5 وظائف مطابقة أسبوعياً", done: false },
      { text: "تدريب على أسئلة المقابلات السلوكية (STAR)", done: false }
    ],
    skills: ["Interview Prep", "Negotiation", "ATS Optimization"],
  }
];

export function Roadmap() {
  const [expandedId, setExpandedId] = useState<number | null>(2);

  return (
    <div className="max-w-5xl mx-auto space-y-8 pb-16">
      <header className="mb-12 flex flex-col items-center text-center">
        <div className="w-16 h-16 rounded-2xl bg-tertiary/10 flex items-center justify-center mb-6">
          <Map className="w-8 h-8 text-tertiary" />
        </div>
        <h1 className="text-3xl font-bold text-on-surface mb-3">
          المسار المهني الذكي
        </h1>
        <p className="text-on-surface-variant max-w-2xl">
          هذه الخطة مخصصة لك بناءً على تحليل سيرتك الفجوات الموجودة بين مهاراتك ومتطلبات (Frontend Developer).
        </p>
      </header>

      <div className="relative mt-8">
        {/* Connection Line */}
        <div className="absolute top-0 bottom-0 right-[4.5rem] md:right-1/2 w-0.5 bg-outline-variant/30 transform md:translate-x-px" />

        <div className="space-y-6">
          {ROADMAP_STEPS.map((step, index) => {
            const isCompleted = step.status === "completed";
            const isActive = step.status === "active";
            const isExpanded = expandedId === step.id;
            
            return (
              <motion.div
                key={step.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className={`relative flex flex-col md:flex-row items-start md:items-center gap-6 md:gap-12 ${
                  index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                }`}
              >
                <div className={`md:w-1/2 flex ${index % 2 === 0 ? "md:justify-end" : "md:justify-start"} w-full pr-[6.5rem] md:pr-0 pl-4 md:pl-0 z-10`}>
                  <div 
                    onClick={() => setExpandedId(isExpanded ? null : step.id)}
                    className={cn(
                      "glass-panel p-6 rounded-3xl w-full max-w-md transition-all duration-300 cursor-pointer overflow-hidden relative",
                      isActive ? "border-secondary/50 shadow-[0_0_30px_rgba(3,181,211,0.1)] bg-surface-container-high" : "hover:bg-surface-container-high hover:border-outline-variant/50"
                    )}
                  >
                    <div className="flex justify-between items-start mb-3">
                       <h3 className={`text-lg font-bold ${isCompleted ? "text-tertiary" : isActive ? "text-secondary" : "text-on-surface"}`}>
                         {step.title}
                       </h3>
                       <div className="flex items-center gap-1.5 text-xs font-mono font-medium text-on-surface-variant bg-surface-container px-2 py-1 rounded">
                         <Clock className="w-3 h-3" /> {step.duration}
                       </div>
                    </div>
                    
                    <p className="text-sm text-on-surface-variant leading-relaxed mb-4">
                      {step.description}
                    </p>

                    <AnimatePresence>
                      {isExpanded && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          className="overflow-hidden"
                        >
                          <div className="pt-4 border-t border-outline-variant/30 space-y-4">
                            <div>
                               <h4 className="text-xs font-bold text-on-surface mb-2">المهام المطلوبة:</h4>
                               <ul className="space-y-2">
                                 {step.tasks.map((task, i) => (
                                   <li key={i} className="flex gap-2 text-sm items-start">
                                      {task.done ? (
                                        <CheckCircle2 className="w-4 h-4 text-tertiary shrink-0 mt-0.5" />
                                      ) : (
                                        <Circle className="w-4 h-4 text-on-surface-variant shrink-0 mt-0.5" />
                                      )}
                                      <span className={task.done ? "text-on-surface-variant line-through opacity-70" : "text-on-surface"}>{task.text}</span>
                                   </li>
                                 ))}
                               </ul>
                            </div>
                            
                            <div>
                               <h4 className="text-xs font-bold text-on-surface mb-2">المهارات المكتسبة:</h4>
                               <div className="flex flex-wrap gap-2">
                                 {step.skills.map((skill, i) => (
                                   <span key={i} className="px-2 py-1 bg-surface-container text-xs text-on-surface-variant border border-outline-variant/30 rounded-md font-mono">
                                     {skill}
                                   </span>
                                 ))}
                               </div>
                            </div>

                            {isActive && (
                              <Button size="sm" variant="outline" className="w-full gap-2 mt-4 border-secondary/50 text-secondary hover:bg-secondary/10">
                                <span>أكمل المرحلة الحالية</span>
                                <ArrowLeft className="w-4 h-4" />
                              </Button>
                            )}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </div>

                {/* Center Node */}
                <div className="absolute right-[4.5rem] md:right-1/2 translate-x-1/2 flex items-center justify-center top-6 md:top-1/2 md:-translate-y-1/2">
                  <div className={`w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center border-4 border-background z-10 ${
                    isCompleted ? "bg-tertiary" : isActive ? "bg-secondary" : "bg-surface-container-high"
                  }`}>
                    <step.icon className={`w-4 h-4 md:w-5 md:h-5 ${isCompleted ? "text-tertiary-container-lowest text-black" : isActive ? "text-background text-black" : "text-on-surface-variant"}`} />
                  </div>
                  {isActive && (
                    <div className="absolute inset-0 rounded-full border-2 border-secondary animate-ping opacity-50" />
                  )}
                </div>

                <div className="md:w-1/2 hidden md:block" />
              </motion.div>
            );
          })}
        </div>
      </div>
      
      <div className="text-center mt-16 pt-8 border-t border-outline-variant/30 glass-panel rounded-3xl p-8 mb-8 bg-gradient-to-t from-primary/5 to-transparent">
         <h2 className="text-xl font-bold mb-4 flex items-center justify-center gap-2">
            <Trophy className="w-6 h-6 text-primary" /> هل أكملت مسار تعلم جديد؟
         </h2>
         <p className="text-sm text-on-surface-variant mb-6 max-w-lg mx-auto">
           قم بتحديث سيرتك الذاتية ليعكس المحلل الذكي مهاراتك الجديدة ويقوم بتوليد مسار متقدم أكثر يطابق مستواك الحالي.
         </p>
         <Button className="gap-2 shadow-lg shadow-primary/20">
            تحديث وإعادة بناء المسار
         </Button>
      </div>
    </div>
  );
}
