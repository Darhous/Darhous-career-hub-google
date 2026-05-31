import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  User, Briefcase, GraduationCap, Code, 
  ChevronLeft, ChevronRight, FileDown,
  LayoutTemplate, Check, FileText, Sparkles
} from "lucide-react";
import { Button } from "../components/ui/Button";
import { cn } from "../lib/utils";

const STEPS = [
  { id: "personal", label: "المعلومات الشخصية", icon: User },
  { id: "experience", label: "الخبرات العلمية", icon: Briefcase },
  { id: "education", label: "التعليم", icon: GraduationCap },
  { id: "skills", label: "المهارات", icon: Code },
  { id: "summary", label: "الملخص الاحترافي", icon: FileText }
];

export function CVBuilder() {
  const [activeStep, setActiveStep] = useState(0);

  const [formData, setFormData] = useState({
    fullName: "أحمد محمد",
    title: "مطور واجهات أمامية",
    email: "ahmed@example.com",
    phone: "+966 50 000 0000",
    location: "الرياض، السعودية",
    summary: "مطور واجهات أمامية شغوف ببناء تجارب مستخدم تفاعلية باستخدام تقنيات حديثة...",
    experience: [{ company: "شركة التقنية المتقدمة", role: "Senior Frontend", period: "2021 - الآن", desc: "تطوير لوحة تحكم..." }],
    education: [{ degree: "بكالوريوس علوم الحاسب", school: "جامعة الملك سعود", period: "2016 - 2020" }],
    skills: ["React", "TypeScript", "Tailwind CSS", "Next.js"]
  });

  const nextStep = () => setActiveStep(prev => Math.min(prev + 1, STEPS.length - 1));
  const prevStep = () => setActiveStep(prev => Math.max(prev - 1, 0));

  return (
    <div className="max-w-7xl mx-auto pb-16 h-[calc(100vh-100px)] flex flex-col">
      <header className="mb-6 flex items-center justify-between">
        <div>
           <h1 className="text-2xl font-bold text-on-surface mb-2 flex items-center gap-3">
             <LayoutTemplate className="w-7 h-7 text-primary" />
             الصانع الذكي للسيرة الذاتية
           </h1>
           <p className="text-on-surface-variant text-sm">
             أدخل بياناتك خطوة بخطوة وقم بتصدير سيرة متوافقة مع أنظمة ATS.
           </p>
        </div>
        
        <div className="flex items-center gap-3">
          <Button variant="outline" size="sm" className="gap-2 shrink-0">
             حفظ كمسودة
          </Button>
          <Button size="sm" className="gap-2 shrink-0 bg-secondary hover:bg-secondary/90 text-secondary-container-lowest">
             <FileDown className="w-4 h-4" /> تصدير PDF
          </Button>
        </div>
      </header>

      <div className="flex flex-1 gap-6 min-h-0">
        
        {/* Wizard Form */}
        <div className="w-full lg:w-1/2 flex flex-col h-full bg-surface-container rounded-[2rem] border border-outline-variant/30 overflow-hidden">
           
           {/* Stepper Header */}
           <div className="px-6 py-4 bg-surface-container-high border-b border-outline-variant/30 flex justify-between items-center overflow-x-auto hide-scrollbar">
              {STEPS.map((step, idx) => {
                 const isActive = idx === activeStep;
                 const isPast = idx < activeStep;
                 return (
                    <button 
                      key={step.id}
                      onClick={() => setActiveStep(idx)}
                      className={cn(
                        "flex items-center gap-2 shrink-0 text-sm font-medium transition-colors px-3 py-2 rounded-xl",
                        isActive ? "text-primary bg-primary/10" : isPast ? "text-on-surface" : "text-on-surface-variant/50 hover:text-on-surface-variant"
                      )}
                    >
                      <div className={cn(
                         "w-6 h-6 rounded-full flex items-center justify-center text-[10px]",
                         isActive ? "bg-primary text-primary-container-lowest" : isPast ? "bg-on-surface text-surface" : "bg-surface-container-highest text-on-surface-variant"
                      )}>
                         {isPast ? <Check className="w-3 h-3" /> : idx + 1}
                      </div>
                      <span className="hidden sm:inline">{step.label}</span>
                    </button>
                 );
              })}
           </div>

           {/* Form Area */}
           <div className="flex-1 overflow-y-auto p-6 md:p-8 hide-scrollbar">
              <AnimatePresence mode="wait">
                 <motion.div
                   key={activeStep}
                   initial={{ opacity: 0, x: 20 }}
                   animate={{ opacity: 1, x: 0 }}
                   exit={{ opacity: 0, x: -20 }}
                   transition={{ duration: 0.2 }}
                 >
                    {activeStep === 0 && (
                       <div className="space-y-5">
                          <h2 className="text-xl font-bold mb-4">المعلومات الشخصية</h2>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                             <div>
                                <label className="block text-sm font-medium text-on-surface-variant mb-1.5">الاسم الكامل</label>
                                <input type="text" className="w-full bg-surface-container-low border border-outline-variant/30 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all" value={formData.fullName} onChange={e => setFormData({...formData, fullName: e.target.value})} />
                             </div>
                             <div>
                                <label className="block text-sm font-medium text-on-surface-variant mb-1.5">المسمى المهني</label>
                                <input type="text" className="w-full bg-surface-container-low border border-outline-variant/30 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all" value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} />
                             </div>
                             <div>
                                <label className="block text-sm font-medium text-on-surface-variant mb-1.5">البريد الإلكتروني</label>
                                <input type="email" className="w-full bg-surface-container-low border border-outline-variant/30 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all text-left" dir="ltr" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} />
                             </div>
                             <div>
                                <label className="block text-sm font-medium text-on-surface-variant mb-1.5">رقم الهاتف</label>
                                <input type="text" className="w-full bg-surface-container-low border border-outline-variant/30 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all text-left" dir="ltr" value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})} />
                             </div>
                             <div className="md:col-span-2">
                                <label className="block text-sm font-medium text-on-surface-variant mb-1.5">العنوان</label>
                                <input type="text" className="w-full bg-surface-container-low border border-outline-variant/30 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all" value={formData.location} onChange={e => setFormData({...formData, location: e.target.value})} />
                             </div>
                          </div>
                       </div>
                    )}

                    {activeStep === 1 && (
                       <div className="space-y-5">
                          <h2 className="text-xl font-bold mb-4">الخبرات العملية</h2>
                          {formData.experience.map((exp, idx) => (
                             <div key={idx} className="glass-panel p-5 rounded-2xl border-outline-variant/30 mb-4 p-4 border relative">
                                <Button 
                                  variant="ghost" 
                                  size="sm" 
                                  className="absolute top-2 left-2 text-error hover:bg-error/10 w-8 h-8 p-0 flex items-center justify-center rounded-full"
                                  onClick={() => setFormData({...formData, experience: formData.experience.filter((_, i) => i !== idx)})}
                                >
                                  &times;
                                </Button>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                                   <div>
                                      <label className="block text-xs font-medium text-on-surface-variant mb-1">المسمى الوظيفي</label>
                                      <input type="text" className="w-full bg-surface-container-low border border-outline-variant/30 rounded-lg px-3 py-2 text-sm focus:ring-1 focus:ring-primary" value={exp.role} onChange={(e) => {
                                         const newExp = [...formData.experience];
                                         newExp[idx].role = e.target.value;
                                         setFormData({...formData, experience: newExp});
                                      }} />
                                   </div>
                                   <div>
                                      <label className="block text-xs font-medium text-on-surface-variant mb-1">جهة العمل</label>
                                      <input type="text" className="w-full bg-surface-container-low border border-outline-variant/30 rounded-lg px-3 py-2 text-sm focus:ring-1 focus:ring-primary" value={exp.company} onChange={(e) => {
                                         const newExp = [...formData.experience];
                                         newExp[idx].company = e.target.value;
                                         setFormData({...formData, experience: newExp});
                                      }} />
                                   </div>
                                </div>
                                <div>
                                   <label className="block text-xs font-medium text-on-surface-variant mb-1">الوصف والإنجازات</label>
                                   <textarea className="w-full bg-surface-container-low border border-outline-variant/30 rounded-lg px-3 py-2 text-sm focus:ring-1 focus:ring-primary h-24 resize-none" value={exp.desc} onChange={(e) => {
                                         const newExp = [...formData.experience];
                                         newExp[idx].desc = e.target.value;
                                         setFormData({...formData, experience: newExp});
                                   }} />
                                   <div className="flex justify-end mt-2">
                                      <Button variant="outline" size="sm" className="text-[10px] h-6 px-2 text-tertiary border-tertiary/30 hover:bg-tertiary/10">أعد صياغة بـ AI</Button>
                                   </div>
                                </div>
                             </div>
                          ))}
                          <Button 
                            variant="outline" 
                            className="w-full border-dashed border-2 py-6 text-on-surface-variant hover:text-primary hover:border-primary/50 hover:bg-primary/5"
                            onClick={() => setFormData({...formData, experience: [...formData.experience, { company: "", role: "", period: "", desc: "" }]})}
                          >
                             + إضافة خبرة جديدة
                          </Button>
                       </div>
                    )}
                    
                    {activeStep === 2 && (
                       <div className="space-y-5">
                          <h2 className="text-xl font-bold mb-4">التعليم</h2>
                          {formData.education.map((edu, idx) => (
                             <div key={idx} className="glass-panel p-5 rounded-2xl border border-outline-variant/30 mb-4 bg-surface-container-low/50 relative">
                                <Button 
                                  variant="ghost" 
                                  size="sm" 
                                  className="absolute top-2 left-2 text-error hover:bg-error/10 w-8 h-8 p-0 flex items-center justify-center rounded-full"
                                  onClick={() => setFormData({...formData, education: formData.education.filter((_, i) => i !== idx)})}
                                >
                                  &times;
                                </Button>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                   <div>
                                      <label className="block text-xs font-medium text-on-surface-variant mb-1">الدرجة والتخصص</label>
                                      <input type="text" className="w-full bg-surface-container-low border border-outline-variant/30 rounded-lg px-3 py-2 text-sm focus:ring-1 focus:ring-primary" value={edu.degree} onChange={(e) => {
                                         const newEdu = [...formData.education];
                                         newEdu[idx].degree = e.target.value;
                                         setFormData({...formData, education: newEdu});
                                      }} />
                                   </div>
                                   <div>
                                      <label className="block text-xs font-medium text-on-surface-variant mb-1">المؤسسة / الجامعة</label>
                                      <input type="text" className="w-full bg-surface-container-low border border-outline-variant/30 rounded-lg px-3 py-2 text-sm focus:ring-1 focus:ring-primary" value={edu.school} onChange={(e) => {
                                         const newEdu = [...formData.education];
                                         newEdu[idx].school = e.target.value;
                                         setFormData({...formData, education: newEdu});
                                      }} />
                                   </div>
                                   <div>
                                      <label className="block text-xs font-medium text-on-surface-variant mb-1">الفترة الزمنية</label>
                                      <input type="text" className="w-full bg-surface-container-low border border-outline-variant/30 rounded-lg px-3 py-2 text-sm focus:ring-1 focus:ring-primary" value={edu.period} onChange={(e) => {
                                         const newEdu = [...formData.education];
                                         newEdu[idx].period = e.target.value;
                                         setFormData({...formData, education: newEdu});
                                      }} />
                                   </div>
                                </div>
                             </div>
                          ))}
                          <Button 
                            variant="outline" 
                            className="w-full border-dashed border-2 py-6 text-on-surface-variant hover:text-primary hover:border-primary/50 hover:bg-primary/5"
                            onClick={() => setFormData({...formData, education: [...formData.education, { degree: "", school: "", period: "" }]})}
                          >
                             + إضافة تعليم جديد
                          </Button>
                       </div>
                    )}

                    {activeStep === 3 && (
                       <div className="space-y-5">
                          <h2 className="text-xl font-bold mb-4">المهارات التقنية والشخصية</h2>
                          <div className="glass-panel p-5 rounded-2xl border border-outline-variant/30">
                             <label className="block text-sm font-medium text-on-surface-variant mb-2">أدخل المهارات (افصل بينها بفاصلة)</label>
                             <textarea 
                               className="w-full bg-surface-container-low border border-outline-variant/30 rounded-lg px-4 py-3 text-sm focus:ring-1 focus:ring-primary min-h-[120px]" 
                               placeholder="React, TypeScript, إدارة المشاريع, التواصل الفعال..."
                               value={formData.skills.join("، ")} 
                               onChange={(e) => setFormData({...formData, skills: e.target.value.split("،").map(s => s.trim()).filter(s => s)})}
                             />
                             <div className="flex flex-wrap gap-2 mt-4">
                               {formData.skills.map((skill, idx) => (
                                 <span key={idx} className="bg-primary/10 text-primary border border-primary/20 px-3 py-1 rounded-full text-xs font-medium">
                                   {skill}
                                 </span>
                               ))}
                             </div>
                          </div>
                       </div>
                    )}

                    {activeStep === 4 && (
                       <div className="space-y-5">
                          <h2 className="text-xl font-bold mb-4">الملخص الاحترافي (Summary)</h2>
                          <div className="glass-panel p-5 rounded-2xl border border-outline-variant/30 relative">
                             <textarea 
                               className="w-full bg-surface-container-low border border-outline-variant/30 rounded-lg px-4 py-3 text-sm focus:ring-1 focus:ring-primary min-h-[160px] resize-none" 
                               placeholder="اكتب ملخصاً موجزاً يبرز أهم خبراتك ونقاط قوتك المهنية..."
                               value={formData.summary} 
                               onChange={(e) => setFormData({...formData, summary: e.target.value})}
                             />
                             <div className="flex justify-end mt-4">
                               <Button variant="outline" size="sm" className="gap-2 text-tertiary border-tertiary/30 hover:bg-tertiary/10">
                                 <Sparkles className="w-4 h-4" /> صياغة بـ AI
                               </Button>
                             </div>
                          </div>
                       </div>
                    )}
                 </motion.div>
              </AnimatePresence>
           </div>

           {/* Stepper Footer */}
           <div className="p-4 bg-surface-container-high border-t border-outline-variant/30 flex justify-between items-center">
              <Button 
                variant="outline" 
                onClick={prevStep} 
                className={cn("gap-2", activeStep === 0 && "invisible")}
              >
                <ChevronRight className="w-4 h-4" />
                السابق
              </Button>
              <Button 
                onClick={nextStep} 
                className={cn("gap-2", activeStep === STEPS.length - 1 && "invisible")}
              >
                التالي
                <ChevronLeft className="w-4 h-4" />
              </Button>
           </div>
        </div>

        {/* Live Preview (Desktop) */}
        <div className="hidden lg:flex w-1/2 flex-col h-full">
           <div className="bg-surface-container-low rounded-[2rem] border border-outline-variant/30 overflow-hidden flex-1 relative flex flex-col p-6 shadow-inner">
             {/* Simple A4 PDF Preview mock */}
              <div className="bg-white text-black w-full h-full max-w-sm mx-auto shadow-2xl overflow-hidden text-[8px] sm:text-xs">
                 <div className="bg-slate-900 text-white p-4 text-center">
                    <h2 className="text-xl font-bold uppercase tracking-wider">{formData.fullName}</h2>
                    <p className="text-primary opacity-90">{formData.title}</p>
                 </div>
                 <div className="p-4 flex gap-4 h-full">
                    <div className="w-1/3 border-l border-gray-200 pl-4 h-full">
                       <h3 className="font-bold text-gray-800 border-b border-gray-200 pb-1 mb-2">Contact</h3>
                       <div className="text-gray-600 mb-4 space-y-1">
                         <p>{formData.email}</p>
                         <p>{formData.phone}</p>
                         <p>{formData.location}</p>
                       </div>
                    </div>
                    <div className="w-2/3 h-full">
                       <h3 className="font-bold text-gray-800 border-b border-gray-200 pb-1 mb-2">Summary</h3>
                       <p className="text-gray-600 mb-4 leading-relaxed">{formData.summary}</p>
                       
                       <h3 className="font-bold text-gray-800 border-b border-gray-200 pb-1 mb-2">Experience</h3>
                       {formData.experience.map((exp, i) => (
                         <div key={i} className="mb-3">
                           <h4 className="font-bold text-gray-900">{exp.role}</h4>
                           <p className="text-primary text-[10px] mb-1">{exp.company}</p>
                           <p className="text-gray-600 leading-relaxed">{exp.desc}</p>
                         </div>
                       ))}
                    </div>
                 </div>
              </div>
              
              <div className="absolute top-4 right-4 bg-surface/80 backdrop-blur-md px-3 py-1.5 rounded-lg border border-outline-variant/30 text-xs font-bold text-on-surface flex items-center gap-2">
                 معاينة حية (Live Preview)
                 <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
              </div>
           </div>
        </div>

      </div>
    </div>
  );
}
