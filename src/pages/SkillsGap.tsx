import { motion } from "motion/react";
import { Radar, Hexagon, TrendingUp, AlertTriangle, Book, ExternalLink, Activity } from "lucide-react";
import { Button } from "../components/ui/Button";
import { cn } from "../lib/utils";

const SKILL_GAPS = [
  { category: "أطر العمل والتطوير (Frameworks)", current: 85, required: 95, label: "React / Vue" },
  { category: "أدوات التصميم المتكامل (UI/UX)", current: 40, required: 80, label: "Figma / Design Systems" },
  { category: "إدارة الحالة (State Management)", current: 70, required: 90, label: "Redux / Zustand" },
  { category: "الأداء والتحسين (Performance)", current: 50, required: 85, label: "Web Vitals" },
  { category: "هندسة النظم (Architecture)", current: 30, required: 75, label: "Micro-frontends" }
];

const SUGGESTED_COURSES = [
  {
    title: "Advanced React Design Patterns",
    platform: "Frontend Masters",
    duration: "4 hours",
    type: "Course",
    targetSkill: "هندسة النظم (Architecture)",
    matchScore: 98
  },
  {
    title: "Mastering Core Web Vitals",
    platform: "Google Web Dev",
    duration: "2 hours",
    type: "Article / Interactive",
    targetSkill: "الأداء والتحسين (Performance)",
    matchScore: 95
  }
];

export function SkillsGap() {
  return (
    <div className="max-w-5xl mx-auto space-y-8 pb-16">
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-on-surface mb-2 flex items-center gap-3">
          <Activity className="w-8 h-8 text-error" />
          تحليل فجوة المهارات
        </h1>
        <p className="text-on-surface-variant max-w-2xl">
          مقارنة بين مهاراتك الحالية (بناءً على السيرة الذاتية) والمهارات المطلوبة لدور <span className="font-bold text-secondary">Senior Frontend Engineer</span>.
        </p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
        {/* Radar/Radar Mock */}
        <div className="glass-panel p-8 rounded-[2rem] flex flex-col items-center justify-center min-h-[400px] border-outline-variant/30 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-error/5 to-transparent pointer-events-none" />
          <h3 className="font-bold text-xl mb-8 relative z-10">مؤشر الكفاءة (Skill Radar)</h3>
          
          <div className="w-full max-w-[300px] space-y-6 relative z-10 w-full">
             {SKILL_GAPS.map((skill, i) => (
                <div key={i}>
                  <div className="flex justify-between text-xs mb-2">
                    <span className="font-medium flex items-center gap-1.5"><Hexagon className="w-3 h-3 text-on-surface-variant"/> {skill.category}</span>
                    <span className="font-mono text-on-surface-variant">{skill.current}% / {skill.required}%</span>
                  </div>
                  <div className="h-2 w-full bg-surface-container rounded-full overflow-hidden relative border border-outline-variant/20">
                     {/* Required Base */}
                     <div className="absolute top-0 right-0 bottom-0 bg-error/10" style={{ width: `${skill.required}%` }} />
                     {/* Required marker */}
                     <div className="absolute top-0 bottom-0 w-0.5 bg-error z-10" style={{ right: `${skill.required}%` }} />
                     {/* Current Progress */}
                     <motion.div 
                        initial={{ width: 0 }}
                        animate={{ width: `${skill.current}%` }}
                        transition={{ duration: 1, delay: i * 0.1, ease: "easeOut" }}
                        className={cn(
                          "absolute top-0 right-0 bottom-0 rounded-full",
                          skill.current >= skill.required ? "bg-tertiary" : skill.current >= skill.required - 15 ? "bg-secondary" : "bg-primary"
                        )}
                      />
                  </div>
                </div>
             ))}
          </div>
          
          <div className="flex gap-4 mt-8 text-xs font-medium relative z-10">
             <span className="flex items-center gap-1.5"><div className="w-3 h-3 rounded-full bg-primary" /> مستواك الحالي</span>
             <span className="flex items-center gap-1.5"><div className="w-3 h-3 rounded-full bg-error" /> المستوى المطلوب</span>
          </div>
        </div>

        <div className="space-y-6">
          <div className="glass-panel p-6 rounded-3xl border-error/20 bg-error/5">
            <h3 className="font-bold text-lg text-error mb-4 flex items-center gap-2">
              <AlertTriangle className="w-5 h-5" /> فجوات حرجة تتطلب انتباهاً
            </h3>
            <p className="text-sm text-on-surface-variant leading-relaxed mb-4">
              لاحظنا فجوة كبيرة (أكثر من 40%) في مجالات هندسة النظم وتصميم واجهات المستخدم المتقدمة. هذه المهارات حاسمة للانتقال إلى مستوى Senior.
            </p>
            <ul className="space-y-3">
              {SKILL_GAPS.filter(s => s.required - s.current > 20).map((skill, i) => (
                <li key={i} className="flex items-center gap-3 text-sm font-medium p-3 bg-surface-container-high rounded-xl border border-error/10">
                   <div className="w-8 h-8 rounded-lg bg-error/10 text-error flex items-center justify-center font-mono font-bold text-xs">
                     -{skill.required - skill.current}
                   </div>
                   <div className="flex flex-col">
                     <span className="text-on-surface">{skill.category}</span>
                     <span className="text-xs text-on-surface-variant font-mono">{skill.label}</span>
                   </div>
                </li>
              ))}
            </ul>
          </div>

          <div className="glass-panel p-6 rounded-3xl">
             <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-tertiary" /> مهارات ناضجة (قابلة للتسويق)
             </h3>
             <ul className="space-y-3">
              {SKILL_GAPS.filter(s => s.required - s.current <= 10).map((skill, i) => (
                <li key={i} className="flex items-center gap-3 text-sm font-medium p-3 bg-surface-container-high rounded-xl border border-tertiary/20">
                   <div className="w-8 h-8 rounded-lg bg-tertiary/20 text-tertiary flex items-center justify-center font-mono font-bold text-xs">
                     {skill.current}%
                   </div>
                   <div className="flex flex-col">
                     <span className="text-on-surface">{skill.category}</span>
                     <span className="text-xs text-tertiary">{skill.label}</span>
                   </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <div>
        <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
           <Book className="w-6 h-6 text-primary" />
           مسارات تعليمية مقترحة (لسد الفجوة)
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {SUGGESTED_COURSES.map((course, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="glass-panel p-5 rounded-2xl hover:border-primary/50 transition-colors group flex flex-col"
            >
               <div className="flex justify-between items-start mb-3">
                 <div className="px-2 py-1 bg-surface-container text-xs rounded-md font-medium text-on-surface-variant">
                   يعالج: <span className="text-on-surface font-bold">{course.targetSkill}</span>
                 </div>
                 <div className="text-secondary font-bold text-sm bg-secondary/10 px-2 py-1 rounded">
                   {course.matchScore}% تطابق
                 </div>
               </div>
               
               <h3 className="font-bold text-lg mb-1 group-hover:text-primary transition-colors">{course.title}</h3>
               <p className="text-sm text-on-surface-variant mb-4">{course.platform} • {course.duration}</p>
               
               <div className="mt-auto pt-4 border-t border-outline-variant/20">
                 <Button variant="ghost" size="sm" className="w-full justify-between hover:bg-primary/10 hover:text-primary">
                    عرض المورد التعليمي
                    <ExternalLink className="w-4 h-4 ml-2" />
                 </Button>
               </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
