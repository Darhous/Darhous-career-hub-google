import { motion } from "motion/react";
import { LayoutTemplate, CheckCircle2, Download, Eye } from "lucide-react";
import { Button } from "../components/ui/Button";

const TEMPLATES = [
  {
    id: "modern",
    name: "عصري (Modern ATS)",
    description: "تصميم أنيق ونظيف مقسم بوضوح، مثالي للوظائف التقنية الحديثة.",
    isPremium: false,
    recommended: true,
    color: "bg-surface-container"
  },
  {
    id: "classic",
    name: "كلاسيكي احترافي",
    description: "تنسيق تقليدي صارم متوافق بنسبة 100% مع أقدم أنظمة ATS.",
    isPremium: false,
    recommended: false,
    color: "bg-surface-container-high"
  },
  {
    id: "creative",
    name: "إبداعي (Creative)",
    description: "الأفضل لمصممي UI/UX والمجالات الإبداعية لإبراز الهوية الشخصية.",
    isPremium: true,
    recommended: false,
    color: "bg-gradient-to-br from-tertiary/10 to-surface-container"
  }
];

export function Templates() {
  return (
    <div className="max-w-5xl mx-auto space-y-8 pb-16">
      <header className="mb-8 text-center">
        <div className="w-16 h-16 rounded-2xl bg-secondary/10 flex items-center justify-center mb-6 mx-auto">
          <LayoutTemplate className="w-8 h-8 text-secondary" />
        </div>
        <h1 className="text-3xl font-bold text-on-surface mb-4">
          مكتبة القوالب (ATS-Optimized)
        </h1>
        <p className="text-on-surface-variant max-w-2xl mx-auto leading-relaxed">
          جميع قوالبنا مصممة خصيصاً لاجتياز أنظمة الفرز الآلي (ATS) مع الحفاظ على مظهر جمالي احترافي يبهر مديري التوظيف.
        </p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {TEMPLATES.map((tpl, i) => (
          <motion.div 
            key={tpl.id}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.1 }}
            className={`glass-panel rounded-3xl overflow-hidden border border-outline-variant/30 relative flex flex-col group ${tpl.recommended ? 'ring-2 ring-primary/50' : ''}`}
          >
             {tpl.recommended && (
                <div className="absolute top-4 right-0 bg-primary text-primary-container-lowest text-[10px] font-bold px-3 py-1 rounded-l-full z-10 shadow-lg">
                   الموصى به للتقنيين
                </div>
             )}
             
             {/* Thumbnail Mock */}
             <div className={`h-64 ${tpl.color} relative overflow-hidden flex items-center justify-center border-b border-outline-variant/30`}>
                <div className="w-3/4 h-5/6 bg-white shadow-2xl rounded flex flex-col p-4 opacity-80 group-hover:opacity-100 transition-opacity transform group-hover:-translate-y-2 duration-300">
                   <div className="w-1/2 h-2 bg-slate-800 mb-4" />
                   <div className="w-full h-px bg-slate-200 mb-2" />
                   <div className="w-3/4 h-1 bg-slate-300 mb-1" />
                   <div className="w-2/3 h-1 bg-slate-300 mb-4" />
                   
                   <div className="flex gap-2 h-full">
                     <div className="w-1/3 flex flex-col gap-2 border-r border-slate-100 pr-2">
                        <div className="w-full h-1 bg-slate-300" />
                        <div className="w-full h-1 bg-slate-300" />
                     </div>
                     <div className="w-2/3 flex flex-col gap-2">
                        <div className="w-full h-1.5 bg-slate-700 mb-1" />
                        <div className="w-full h-1 bg-slate-200" />
                        <div className="w-full h-1 bg-slate-200" />
                        <div className="w-4/5 h-1 bg-slate-200 mb-2" />
                     </div>
                   </div>
                </div>

                <div className="absolute inset-0 bg-surface/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2 backdrop-blur-sm">
                   <Button variant="secondary" size="icon" className="rounded-full shadow-lg">
                      <Eye className="w-5 h-5" />
                   </Button>
                </div>
             </div>

             <div className="p-6 flex-col flex flex-1">
                <div className="flex justify-between items-start mb-2">
                   <h3 className="font-bold text-lg text-on-surface">{tpl.name}</h3>
                   {tpl.isPremium && (
                      <span className="text-[10px] font-bold bg-tertiary/10 text-tertiary px-2 py-0.5 rounded border border-tertiary/20">
                         Premium
                      </span>
                   )}
                </div>
                <p className="text-sm text-on-surface-variant leading-relaxed mb-6 flex-1">
                   {tpl.description}
                </p>
                
                <div className="flex items-center gap-3 w-full">
                   <Button className="flex-1 font-bold opacity-50 cursor-not-allowed">
                      استخدام القالب (قريباً)
                   </Button>
                </div>
             </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
