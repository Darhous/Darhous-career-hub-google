import { Link } from "react-router-dom";
import { motion } from "motion/react";
import { FileText, Briefcase, Map, ArrowLeft, Sparkles, TrendingUp, Target } from "lucide-react";
import { Button } from "../components/ui/Button";

export function Home() {
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 24 } }
  };

  return (
    <div className="flex flex-col h-full space-y-10 pb-16">
      {/* Hero Section */}
      <motion.section 
        className="glass-panel p-10 lg:p-14 text-center rounded-[3rem] relative overflow-hidden"
        variants={itemVariants}
        initial="hidden"
        animate="show"
      >
        <div className="absolute top-0 right-0 w-64 h-64 bg-primary/20 rounded-full blur-3xl -z-10 translate-x-1/2 -translate-y-1/2 opacity-50 ai-pulse" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-secondary/20 rounded-full blur-3xl -z-10 -translate-x-1/2 translate-y-1/2 opacity-50" />
        
        <div className="inline-flex items-center justify-center space-x-2 space-x-reverse px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-medium mb-8">
          <Sparkles className="w-4 h-4" />
          <span>منصة مدعومة بالذكاء الاصطناعي</span>
        </div>
        
        <h1 className="text-4xl lg:text-6xl font-bold mb-6 leading-tight tracking-tight">
          من سيرتك الذاتية إلى <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-l from-primary via-secondary to-tertiary">
            وظيفتك القادمة
          </span>
        </h1>
        
        <p className="text-lg text-on-surface-variant max-w-2xl mx-auto mb-10 leading-relaxed">
          نحلل سيرتك الذاتية، نطابقها مع أفضل الوظائف المناسبة لك، ونرسم لك مساراً مهنياً متكاملاً بخطة ذكية واحدة.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link to="/cv-analyzer">
            <Button size="lg" className="rounded-full gap-3 shadow-xl shadow-primary/20">
              <FileText className="w-5 h-5" />
              <span>ابدأ بتحليل سيرتك</span>
              <ArrowLeft className="w-4 h-4" />
            </Button>
          </Link>
          <Link to="/jobs">
            <Button variant="outline" size="lg" className="rounded-full gap-2">
              <Briefcase className="w-5 h-5" />
              <span>تصفح الوظائف المستهدفة</span>
            </Button>
          </Link>
        </div>
      </motion.section>

      {/* Features Grid */}
      <motion.section 
        className="grid grid-cols-1 md:grid-cols-3 gap-6"
        variants={containerVariants}
        initial="hidden"
        animate="show"
      >
        <motion.div variants={itemVariants} className="glass-panel p-8 rounded-3xl hover:-translate-y-1 transition-transform duration-300">
          <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-6 border border-primary/20">
            <Target className="w-6 h-6 text-primary" />
          </div>
          <h3 className="text-xl font-bold mb-3 text-on-surface">تقييم ATS ذكي</h3>
          <p className="text-on-surface-variant text-sm leading-relaxed">
            اختبر توافق سيرتك الذاتية مع أنظمة تتبع المتقدمين واكتشف الكلمات المفتاحية الناقصة لزيادة فرص قبولك.
          </p>
        </motion.div>

        <motion.div variants={itemVariants} className="glass-panel p-8 rounded-3xl hover:-translate-y-1 transition-transform duration-300">
          <div className="w-12 h-12 rounded-xl bg-secondary/10 flex items-center justify-center mb-6 border border-secondary/20">
            <Briefcase className="w-6 h-6 text-secondary" />
          </div>
          <h3 className="text-xl font-bold mb-3 text-on-surface">مطابقة الوظائف</h3>
          <p className="text-on-surface-variant text-sm leading-relaxed">
            محرك ذكي يقرأ خبراتك ويرشح لك الوظائف المتاحة الأقرب لمؤهلاتك لتقليل وقت البحث والمجهود.
          </p>
        </motion.div>

        <motion.div variants={itemVariants} className="glass-panel p-8 rounded-3xl hover:-translate-y-1 transition-transform duration-300">
          <div className="w-12 h-12 rounded-xl bg-tertiary/10 flex items-center justify-center mb-6 border border-tertiary/20">
            <TrendingUp className="w-6 h-6 text-tertiary" />
          </div>
          <h3 className="text-xl font-bold mb-3 text-on-surface">مسار التطور</h3>
          <p className="text-on-surface-variant text-sm leading-relaxed">
            خطة مخصصة لك لتطوير مهاراتك وسد الفجوات للحصول على وظيفة أحلامك بناءً على معطيات السوق الحالي.
          </p>
        </motion.div>
      </motion.section>
    </div>
  );
}
