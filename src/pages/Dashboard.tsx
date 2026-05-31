import { motion } from "motion/react";
import { 
  BarChart2, FileText, Briefcase, Map, Star, 
  Clock, TrendingUp, AlertCircle, Plus, ChevronLeft
} from "lucide-react";
import { Button } from "../components/ui/Button";
import { cn } from "../lib/utils";

// Mock Data (Structured for future Supabase integration)
const USER_STATS = {
  atsScoreAvg: 78,
  savedJobs: 12,
  activeApplications: 3,
  completedRoadmapSteps: 4
};

const RECENT_APPLICATIONS = [
  { company: "TechNova", role: "Senior Frontend", status: "interview", date: "منذ يومين", color: "tertiary" },
  { company: "Digital Next", role: "React Developer", status: "applied", date: "منذ 4 أيام", color: "secondary" },
  { company: "E-Com Plus", role: "UI Engineer", status: "rejected", date: "منذ أسبوع", color: "error" }
];

const SAVED_CVS = [
  { title: "cv_frontend_senior.pdf", date: "تم التحديث اليوم", score: 85 },
  { title: "cv_react_developer.pdf", date: "منذ أسبوع", score: 72 }
];

export function Dashboard() {
  return (
    <div className="max-w-6xl mx-auto space-y-8 pb-16">
      <header className="mb-8 flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
           <div className="flex items-center gap-3 mb-2">
             <h1 className="text-3xl font-bold text-on-surface">أهلاً بك، أحمد 👋</h1>
             <span className="bg-tertiary/10 text-tertiary border border-tertiary/20 text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-wider">
               بيانات تجريبية
             </span>
           </div>
           <p className="text-on-surface-variant">
             إليك ملخص نشاطك المهني وحالة التقديمات الأخيرة.
           </p>
        </div>
        <Button className="gap-2 shadow-lg shadow-primary/20 shrink-0">
           <Plus className="w-4 h-4" /> إنشاء سيرة ذاتية جديدة
        </Button>
      </header>

      {/* KPI Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
         <div className="glass-panel p-5 rounded-2xl flex flex-col hover:border-primary/30 transition-all cursor-default">
            <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center mb-3">
               <FileText className="w-5 h-5 text-primary" />
            </div>
            <div className="text-2xl font-bold text-on-surface font-mono">{USER_STATS.atsScoreAvg}%</div>
            <div className="text-xs text-on-surface-variant">متوسط درجة ATS</div>
         </div>
         <div className="glass-panel p-5 rounded-2xl flex flex-col hover:border-secondary/30 transition-all cursor-default">
            <div className="w-10 h-10 rounded-xl bg-secondary/10 flex items-center justify-center mb-3">
               <Briefcase className="w-5 h-5 text-secondary" />
            </div>
            <div className="text-2xl font-bold text-on-surface font-mono">{USER_STATS.activeApplications}</div>
            <div className="text-xs text-on-surface-variant">تقديمات نشطة</div>
         </div>
         <div className="glass-panel p-5 rounded-2xl flex flex-col hover:border-tertiary/30 transition-all cursor-default">
            <div className="w-10 h-10 rounded-xl bg-tertiary/10 flex items-center justify-center mb-3">
               <Map className="w-5 h-5 text-tertiary" />
            </div>
            <div className="text-2xl font-bold text-on-surface font-mono">{USER_STATS.completedRoadmapSteps}</div>
            <div className="text-xs text-on-surface-variant">خطوات مسار مكتملة</div>
         </div>
         <div className="glass-panel p-5 rounded-2xl flex flex-col hover:border-outline-variant/50 transition-all cursor-default">
            <div className="w-10 h-10 rounded-xl bg-surface-container-high flex items-center justify-center mb-3">
               <Star className="w-5 h-5 text-on-surface-variant" />
            </div>
            <div className="text-2xl font-bold text-on-surface font-mono">{USER_STATS.savedJobs}</div>
            <div className="text-xs text-on-surface-variant">وظائف محفوظة</div>
         </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left Column (2/3 width) */}
        <div className="lg:col-span-2 space-y-6">
           
           {/* Application Tracker */}
           <div className="glass-panel p-6 rounded-[2rem] border-outline-variant/30">
              <div className="flex justify-between items-center mb-6">
                 <h2 className="text-lg font-bold flex items-center gap-2">
                    <Briefcase className="w-5 h-5 text-secondary" />
                    متتبع التقديمات (Application Tracker)
                 </h2>
                 <Button variant="ghost" size="sm" className="text-secondary hover:bg-secondary/10">عرض الكل</Button>
              </div>
              
              <div className="space-y-3">
                 {RECENT_APPLICATIONS.map((app, i) => (
                    <motion.div 
                      key={i}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.1 }}
                      className="flex items-center justify-between p-4 rounded-xl bg-surface-container hover:bg-surface-container-high transition-colors border border-outline-variant/20 group"
                    >
                       <div className="flex items-center gap-4">
                          <div className={cn("w-2 h-10 rounded-full", `bg-${app.color}`)} />
                          <div>
                             <h4 className="font-bold text-sm text-on-surface group-hover:text-primary transition-colors">{app.role}</h4>
                             <p className="text-xs text-on-surface-variant flex items-center gap-2">
                               {app.company} <span className="opacity-50">•</span> {app.date}
                             </p>
                          </div>
                       </div>
                       
                       <div className="flex items-center gap-3">
                          <span className={cn(
                             "text-[10px] font-bold px-2.5 py-1 rounded-md uppercase tracking-wider",
                             app.status === "interview" ? "bg-tertiary/10 text-tertiary border border-tertiary/20" :
                             app.status === "applied" ? "bg-secondary/10 text-secondary border border-secondary/20" :
                             "bg-error/10 text-error border border-error/20"
                          )}>
                             {app.status === "interview" ? "مقابلة" : app.status === "applied" ? "تم التقديم" : "مرفوض"}
                          </span>
                          <Button variant="ghost" size="icon" className="w-8 h-8 opacity-0 group-hover:opacity-100 transition-opacity">
                             <ChevronLeft className="w-4 h-4" />
                          </Button>
                       </div>
                    </motion.div>
                 ))}
                 
                 <Button variant="outline" className="w-full border-dashed py-6 text-on-surface-variant hover:text-secondary hover:border-secondary/50 hover:bg-secondary/5 mt-2">
                    <Plus className="w-4 h-4 ml-2" /> إضافة تقديم يدوي
                 </Button>
              </div>
           </div>

           {/* AI Roadmap Progress Snapshot */}
           <div className="glass-panel p-6 rounded-[2rem] border-tertiary/20 bg-gradient-to-br from-tertiary/5 to-transparent">
              <div className="flex justify-between items-center mb-6">
                 <h2 className="text-lg font-bold flex items-center gap-2 text-tertiary">
                    <Map className="w-5 h-5" />
                    المسار المهني الذكي
                 </h2>
                 <Button variant="outline" size="sm" className="border-tertiary/30 text-tertiary hover:bg-tertiary/10">متابعة المسار</Button>
              </div>
              
              <div className="flex items-center gap-4 p-4 bg-surface-container rounded-xl border border-outline-variant/30">
                 <div className="w-12 h-12 rounded-full border-4 border-surface bg-surface flex items-center justify-center relative shadow-sm shrink-0">
                    <svg className="absolute inset-0 w-full h-full transform -rotate-90">
                      <circle cx="20" cy="20" r="18" stroke="currentColor" strokeWidth="4" fill="transparent" className="text-surface-container" />
                      <circle cx="20" cy="20" r="18" stroke="currentColor" strokeWidth="4" fill="transparent" strokeDasharray="113" strokeDashoffset="56" className="text-tertiary" />
                    </svg>
                    <span className="font-bold text-xs font-mono">50%</span>
                 </div>
                 <div className="flex-1">
                    <h4 className="font-bold text-sm mb-1">الخطوة الحالية: بناء معرض أعمال احترافي</h4>
                    <p className="text-xs text-on-surface-variant">لديك مهمتان معلقتان في هذه المرحلة. قم بإتمامهما لزيادة نسبة المطابقة الوظيفية.</p>
                 </div>
              </div>
           </div>
           
        </div>

        {/* Right Column (1/3 width) - Mini Widgets */}
        <div className="space-y-6">
           
           {/* Saved CVs */}
           <div className="glass-panel p-6 rounded-3xl border-outline-variant/30">
              <h2 className="text-base font-bold mb-4 flex items-center gap-2">
                 <FileText className="w-4 h-4 text-primary" />
                 نسخ السير الذاتية
              </h2>
              <div className="space-y-3">
                 {SAVED_CVS.map((cv, i) => (
                    <div key={i} className="p-3 rounded-xl bg-surface-container-low border border-outline-variant/30 hover:border-primary/30 transition-colors flex items-center justify-between cursor-pointer group">
                       <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                             <FileText className="w-4 h-4 text-primary" />
                          </div>
                          <div>
                             <h4 className="text-xs font-bold text-on-surface" dir="ltr">{cv.title}</h4>
                             <p className="text-[10px] text-on-surface-variant">{cv.date}</p>
                          </div>
                       </div>
                       <div className="text-[10px] font-bold font-mono text-primary bg-primary/10 px-2 py-1 rounded">
                          {cv.score}%
                       </div>
                    </div>
                 ))}
              </div>
              <Button variant="ghost" size="sm" className="w-full mt-2 text-primary hover:bg-primary/5 text-xs">
                 عرض كل النسخ
              </Button>
           </div>
           
           {/* Skill Summary Mini */}
           <div className="glass-panel p-6 rounded-3xl border-error/20 bg-error/5">
              <h2 className="text-base font-bold mb-4 flex items-center gap-2 text-error">
                 <AlertCircle className="w-4 h-4" />
                 تنبيهات الفجوة
              </h2>
              <p className="text-xs text-on-surface-variant mb-4 leading-relaxed">
                 استناداً إلى آخر تحليل، تنقصك هذه المهارات المهمة للوظائف التي تستهدفها:
              </p>
              <div className="flex flex-wrap gap-2">
                 {["Micro-frontends", "GraphQL", "Jest"].map((skill, i) => (
                    <span key={i} className="px-2 py-1 bg-surface-container text-[10px] font-mono text-on-surface font-medium border border-error/20 rounded">
                       {skill}
                    </span>
                 ))}
              </div>
              <Button size="sm" variant="outline" className="w-full mt-4 border-error/30 text-error hover:bg-error/10 text-xs">
                 تحليل التفاصيل
              </Button>
           </div>

        </div>

      </div>
    </div>
  );
}
