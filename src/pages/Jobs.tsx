import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Briefcase, Building, MapPin, Search, Star, ExternalLink, Filter, AlertCircle, TrendingUp, DollarSign } from "lucide-react";
import { Button } from "../components/ui/Button";
import { cn } from "../lib/utils";
import type { JobTarget } from "../types";

const MOCK_JOBS: JobTarget[] = [
  {
    id: "1",
    title: "Senior Product Designer",
    company: "TechNova Solutions",
    location: "الرياض (هجين)",
    type: "دوام كامل",
    matchScore: 92,
    salary: "SAR 25,000 - 32,000",
    description: "نبحث عن مصمم منتجات مبدع بخبرة لا تقل عن 5 سنوات في واجهات الاستخدام وبناء تجارب مستخدم لمنتجات SaaS.",
    missingSkills: ["Framer", "Design Systems Architecture"],
    matchReasons: ["خبرة سابقة في مجال التقنية المالية (FinTech)", "إتقان Figma بدرجة احترافية"],
    cvSuggestions: ["أضف مشروع نظام التصميم الأخير الخاص بك إلى المقدمة", "استخدم الكلمات المفتاحية: SaaS, B2B, Micro-interactions"]
  },
  {
    id: "2",
    title: "Frontend Developer (React)",
    company: "البنك الرقمي المستقبلي",
    location: "دبي (عن بعد)",
    type: "دوام كامل",
    matchScore: 85,
    salary: "$4,500 - $6,500",
    description: "انضم لفريقنا المتميز في بناء واجهات تطبيقات بنكية حديثة وأمنية باستخدام React, TypeScript و Tailwind CSS.",
    missingSkills: ["Web3.js", "Jest Testing"],
    matchReasons: ["تطابق ممتاز في تقنيات React و TypeScript", "خبرة سابقة في التطبيقات عالية الأداء"],
    cvSuggestions: ["أبرز خبرتك في بناء تطبيقات الصفحة الواحدة سريعة الاستجابة", "أضف تفاصيل أكثر عن كيفية تقليلك لحجم الحزمة (Bundle Size)"]
  },
  {
    id: "3",
    title: "UX Researcher",
    company: "Global E-Com",
    location: "القاهرة (مكتبي)",
    type: "عقد",
    matchScore: 78,
    salary: "EGP 40,000 - 60,000",
    description: "إجراء مقابلات واختبارات لسهولة الاستخدام مع قاعدة مستخدمين في منطقة الشرق الأوسط وشمال أفريقيا.",
    missingSkills: ["SPSS", "Quantitative Analysis"],
    matchReasons: ["خبرة عملية في إجراء أبحاث المستخدمين للسوق الخليجي"],
    cvSuggestions: ["ركز على مقاييس قابلية الاستخدام التي حسنتها سابقاً"]
  }
];

export function Jobs() {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState<"matched" | "explore">("matched");
  const [selectedJob, setSelectedJob] = useState<JobTarget | null>(null);

  const filteredJobs = MOCK_JOBS.filter(job => 
    job.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
    job.company.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="max-w-6xl mx-auto space-y-8 pb-16 flex flex-col h-full">
      <header className="mb-4">
        <h1 className="text-3xl font-bold text-on-surface mb-2 flex items-center gap-3">
          <Briefcase className="w-8 h-8 text-secondary" />
          بوابة الوظائف الذكية
        </h1>
        <p className="text-on-surface-variant">
          نستخلص مهاراتك ونطابقك مع أفضل الفرص في السوق (Provider Architecture Mock).
        </p>
      </header>

      <div className="flex flex-col sm:flex-row gap-4 mb-4">
        <div className="flex-1 relative flex items-center">
          <Search className="w-5 h-5 absolute right-4 text-on-surface-variant z-10 pointer-events-none" />
          <input
            type="text"
            placeholder="ابحث عن مسمى وظيفي أو شركة..."
            className="w-full bg-surface-container/50 border border-outline-variant/30 rounded-xl py-3 pr-12 pl-4 text-sm focus:outline-none focus:ring-2 focus:ring-secondary focus:border-transparent transition-all relative z-0"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <Button variant="outline" className="gap-2 h-[46px] rounded-xl shrink-0">
          <Filter className="w-4 h-4" />
          <span>تصفية النتائج</span>
        </Button>
      </div>

      <div className="flex gap-2 mb-2 border-b border-outline-variant/30 pb-4">
        <button
          onClick={() => setActiveTab("matched")}
          className={cn(
            "px-6 py-2 rounded-full text-sm font-bold transition-all relative overflow-hidden",
            activeTab === "matched" ? "text-primary bg-primary/10" : "text-on-surface-variant hover:text-on-surface hover:bg-surface-container"
          )}
        >
          {activeTab === "matched" && (
            <motion.div layoutId="jobtab" className="absolute inset-0 border border-primary/30 rounded-full" />
          )}
          الوظائف المطابقة (90%+)
        </button>
        <button
          onClick={() => setActiveTab("explore")}
          className={cn(
            "px-6 py-2 rounded-full text-sm font-bold transition-all relative overflow-hidden",
            activeTab === "explore" ? "text-primary bg-primary/10" : "text-on-surface-variant hover:text-on-surface hover:bg-surface-container"
          )}
        >
          {activeTab === "explore" && (
            <motion.div layoutId="jobtab" className="absolute inset-0 border border-primary/30 rounded-full" />
          )}
          استكشاف الكل
        </button>
      </div>

      <div className="flex-1 flex gap-6 mt-4 relative">
        {/* Job List */}
        <div className={cn(
          "flex-1 flex flex-col gap-4 overflow-y-auto hide-scrollbar pb-8 transition-all duration-300",
          selectedJob ? "lg:w-1/2 lg:flex-none" : "w-full"
        )}>
          {filteredJobs.map((job) => (
            <motion.div
              key={job.id}
              layout
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              onClick={() => setSelectedJob(job)}
              className={cn(
                "glass-panel p-5 rounded-2xl cursor-pointer hover:border-secondary/30 transition-all group relative overflow-hidden",
                selectedJob?.id === job.id ? "border-secondary ring-1 ring-secondary shadow-[0_0_20px_rgba(3,181,211,0.15)] bg-surface-container-high" : ""
              )}
            >
              {job.matchScore >= 90 && (
                <div className="absolute top-0 right-0 left-0 h-1 bg-gradient-to-l from-primary via-secondary to-tertiary opacity-70" />
              )}
              
              <div className="flex justify-between items-start mb-3">
                <h3 className="font-bold text-lg text-on-surface group-hover:text-secondary transition-colors">{job.title}</h3>
                <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-secondary/10 border border-secondary/20 text-secondary text-xs font-bold shrink-0">
                  <Star className="w-3.5 h-3.5 fill-current" />
                  <span dir="ltr">{job.matchScore}%</span>
                </div>
              </div>

              <p className="text-on-surface-variant text-sm mb-3 font-medium flex items-center gap-2">
                 <Building className="w-4 h-4" /> {job.company}
              </p>

              <div className="flex flex-wrap gap-2 mb-3">
                <span className="flex items-center gap-1 text-xs px-2 py-1 bg-surface-container rounded-md text-on-surface-variant border border-outline-variant/20">
                  <MapPin className="w-3.5 h-3.5" />
                  {job.location}
                </span>
                <span className="flex items-center gap-1 text-xs px-2 py-1 bg-surface-container rounded-md text-on-surface-variant border border-outline-variant/20">
                  <Briefcase className="w-3.5 h-3.5" />
                  {job.type}
                </span>
                {job.salary && (
                  <span className="flex items-center gap-1 text-xs px-2 py-1 bg-primary/5 rounded-md text-primary font-mono border border-primary/20">
                    <DollarSign className="w-3.5 h-3.5" />
                    {job.salary}
                  </span>
                )}
              </div>
              <p className="text-xs text-on-surface-variant/70 leading-relaxed line-clamp-2">
                {job.description}
              </p>
            </motion.div>
          ))}
          {filteredJobs.length === 0 && (
             <div className="text-center py-12 text-on-surface-variant">
               لم يتم العثور على وظائف بهذ الاسم.
             </div>
          )}
        </div>

        {/* Job Details Sidebar (Desktop) */}
        <AnimatePresence>
          {selectedJob && (
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20, transition: { duration: 0.2 } }}
              className="hidden lg:flex w-1/2 flex-col glass-panel rounded-3xl p-6 sticky top-0 h-[calc(100vh-280px)] overflow-y-auto hide-scrollbar border-secondary/30 shadow-[0_0_40px_rgba(3,181,211,0.05)]"
            >
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h2 className="text-2xl font-bold text-on-surface mb-2">{selectedJob.title}</h2>
                  <p className="text-on-surface-variant font-medium flex items-center gap-2 text-lg">
                    <Building className="w-5 h-5 text-secondary" />
                    {selectedJob.company}
                  </p>
                </div>
                <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-secondary/10 border border-secondary/20 text-secondary font-bold text-sm">
                  <Star className="w-4 h-4 fill-current" />
                  <span>توافق {selectedJob.matchScore}%</span>
                </div>
              </div>

              <div className="flex flex-wrap gap-3 mb-8">
                <span className="flex items-center gap-1.5 text-sm px-3 py-1.5 bg-surface-container rounded-lg text-on-surface border border-outline-variant/30">
                  <MapPin className="w-4 h-4 text-on-surface-variant" />
                  {selectedJob.location}
                </span>
                <span className="flex items-center gap-1.5 text-sm px-3 py-1.5 bg-surface-container rounded-lg text-on-surface border border-outline-variant/30">
                  <Briefcase className="w-4 h-4 text-on-surface-variant" />
                  {selectedJob.type}
                </span>
              </div>

              <div className="space-y-6">
                <div>
                  <h3 className="font-bold text-on-surface mb-2">وصف الوظيفة</h3>
                  <p className="text-sm text-on-surface-variant leading-relaxed">
                    {selectedJob.description}
                  </p>
                </div>

                <div className="glass-panel p-4 rounded-xl border-secondary/20 bg-secondary/5">
                   <h4 className="font-bold text-secondary mb-3 flex items-center gap-2">
                     <TrendingUp className="w-4 h-4" /> أسباب المطابقة (Why it's a match)
                   </h4>
                   <ul className="space-y-2">
                     {selectedJob.matchReasons?.map((reason, i) => (
                       <li key={i} className="text-sm text-on-surface-variant flex gap-2">
                          <span className="text-secondary shrink-0">•</span>
                          <span>{reason}</span>
                       </li>
                     ))}
                   </ul>
                </div>

                <div className="glass-panel p-4 rounded-xl border-error/20 bg-error/5">
                   <h4 className="font-bold text-error mb-3 flex items-center gap-2">
                     <AlertCircle className="w-4 h-4" /> فجوة المهارات المطلوبة (Missing Skills)
                   </h4>
                   <div className="flex flex-wrap gap-2">
                     {selectedJob.missingSkills?.map((skill, i) => (
                       <span key={i} className="px-2 py-1 rounded bg-surface-container-highest text-error text-xs font-mono font-medium border border-error/20">
                          {skill}
                       </span>
                     ))}
                   </div>
                </div>

                <div className="glass-panel p-4 rounded-xl border-primary/20 bg-primary/5">
                   <h4 className="font-bold text-primary mb-3 flex items-center gap-2">
                     <Star className="w-4 h-4" /> نصائح لتخصيص سيرتك الذاتية (CV Tweaks)
                   </h4>
                   <ul className="space-y-2">
                     {selectedJob.cvSuggestions?.map((sugg, i) => (
                       <li key={i} className="text-sm text-on-surface-variant flex gap-2">
                          <span className="text-primary shrink-0 font-bold">{i+1}.</span>
                          <span>{sugg}</span>
                       </li>
                     ))}
                   </ul>
                </div>
              </div>

              <div className="mt-8 pt-6 border-t border-outline-variant/30 flex gap-3">
                 <Button className="flex-1 gap-2 font-bold shadow-lg shadow-primary/20 hover:shadow-primary/40">
                   تقديم الآن
                   <ExternalLink className="w-4 h-4" />
                 </Button>
                 <Button variant="outline" className="flex-1 gap-2">
                   نسخ خطة التقديم
                 </Button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
