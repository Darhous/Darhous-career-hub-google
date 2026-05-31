import { User, Bell, Shield, Key, DownloadCloud, LogOut, Code, Activity, Github } from "lucide-react";
import { Button } from "../components/ui/Button";

export function Settings() {
  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-16">
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-on-surface mb-2">إعدادات الحساب</h1>
        <p className="text-on-surface-variant">
          إدارة تفضيلاتك، الأمان، وتفاصيل حسابك الشخصي.
        </p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
         <div className="space-y-2">
            {[
              { id: "profile", label: "الملف الشخصي", icon: User },
              { id: "notifications", label: "التنبيهات", icon: Bell },
              { id: "security", label: "الأمان والخصوصية", icon: Shield },
              { id: "developer", label: "إعدادات المطورين", icon: Code },
              { id: "data", label: "تصدير البيانات", icon: DownloadCloud },
            ].map((tab, i) => (
               <button 
                 key={i} 
                 className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-colors ${i === 0 ? "bg-surface-container-high text-primary font-bold" : "text-on-surface hover:bg-surface-container hover:text-on-surface"}`}
               >
                 <tab.icon className={`w-5 h-5 ${i === 0 ? "text-primary" : "text-on-surface-variant"}`} />
                 {tab.label}
               </button>
            ))}

            <div className="pt-8 mt-4 border-t border-outline-variant/30">
               <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-error hover:bg-error/10 transition-colors">
                 <LogOut className="w-5 h-5" />
                 تسجيل الخروج
               </button>
            </div>
         </div>

         <div className="md:col-span-3 space-y-8">
            <div className="glass-panel p-8 rounded-3xl border-outline-variant/30">
               <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
                 <User className="w-5 h-5 text-primary" /> المعلومات الأساسية
               </h2>
               
               <div className="flex items-center gap-6 mb-8">
                  <div className="w-24 h-24 rounded-full bg-surface-container-highest border-2 border-primary/20 flex items-center justify-center text-3xl font-bold text-primary">
                    أ م
                  </div>
                  <div className="space-y-2">
                     <Button variant="outline" size="sm">تغيير الصورة</Button>
                     <p className="text-xs text-on-surface-variant">يفضل استخدام صورة احترافية واضحة ذات خلفية محايدة.</p>
                  </div>
               </div>

               <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-on-surface-variant mb-1.5">الاسم كاملاً</label>
                    <input type="text" className="w-full bg-surface-container-low border border-outline-variant/30 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all" defaultValue="أحمد محمد" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-on-surface-variant mb-1.5">المسمى الوظيفي المستهدف</label>
                    <input type="text" className="w-full bg-surface-container-low border border-outline-variant/30 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all" defaultValue="مطور واجهات أمامية Senior" />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-on-surface-variant mb-1.5">نبذة مختصرة (Bio)</label>
                    <textarea className="w-full bg-surface-container-low border border-outline-variant/30 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all min-h-[100px] resize-none" defaultValue="شغوف بالتطوير الموجه نحو جودة المستخدم..." />
                  </div>
               </div>
               
               <div className="mt-8 flex justify-end">
                  <Button className="font-bold px-8">حفظ التغييرات</Button>
               </div>
            </div>

            <div className="glass-panel p-8 rounded-3xl border-outline-variant/30">
               <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
                 <Github className="w-5 h-5 text-on-surface" /> الحسابات المرتبطة
               </h2>
               
               <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 bg-surface-container-low rounded-xl border border-outline-variant/30">
                     <div className="flex items-center gap-3">
                        <Github className="w-6 h-6" />
                        <div>
                           <h4 className="font-bold text-sm text-on-surface">GitHub</h4>
                           <p className="text-xs text-on-surface-variant">ahmed-dev (مرتبط)</p>
                        </div>
                     </div>
                     <Button variant="outline" size="sm" className="text-error border-error/30 hover:bg-error/10">إلغاء الربط</Button>
                  </div>
                  
                  <div className="flex items-center justify-between p-4 bg-surface-container-low rounded-xl border border-outline-variant/30">
                     <div className="flex items-center gap-3">
                        <div className="w-6 h-6 flex items-center justify-center font-bold font-serif bg-blue-600 text-white rounded">in</div>
                        <div>
                           <h4 className="font-bold text-sm text-on-surface">LinkedIn</h4>
                           <p className="text-xs text-on-surface-variant">غير مرتبط حتى الآن</p>
                        </div>
                     </div>
                     <Button variant="secondary" size="sm">ربط الحساب</Button>
                  </div>
               </div>
            </div>
         </div>
      </div>
    </div>
  );
}
