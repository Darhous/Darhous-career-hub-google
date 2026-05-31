import { Link, Outlet, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "motion/react";
import { 
  FileText, Briefcase, Map, Menu, X, Home as HomeIcon, 
  PenTool, LineChart, MessageSquare, LayoutDashboard, LayoutTemplate, Settings
} from "lucide-react";
import { useState } from "react";
import { cn } from "../lib/utils";
import { Footer } from "./Footer";

const NAV_ITEMS = [
  { path: "/", label: "الرئيسية", icon: HomeIcon },
  { path: "/dashboard", label: "لوحة التحكم", icon: LayoutDashboard },
  { path: "/builder", label: "بناء السيرة", icon: PenTool },
  { path: "/cv-analyzer", label: "تحليل السيرة", icon: FileText },
  { path: "/jobs", label: "البحث عن وظائف", icon: Briefcase },
  { path: "/roadmap", label: "المسار المهني", icon: Map },
  { path: "/skills", label: "فجوة المهارات", icon: LineChart },
  { path: "/interview", label: "مقابلات العمل", icon: MessageSquare },
  { path: "/templates", label: "القوالب", icon: LayoutTemplate },
  { path: "/settings", label: "الإعدادات", icon: Settings },
];

export function Layout() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  return (
    <div className="flex h-screen overflow-hidden bg-background">
      {/* Desktop Sidebar */}
      <aside className="hidden lg:flex w-72 flex-col glass-panel m-4 overflow-hidden shadow-2xl relative z-10">
        <div className="p-6">
          <div className="mb-8 flex items-center space-x-3 space-x-reverse">
            <div className="w-10 h-10 rounded-xl bg-primary/20 flex items-center justify-center glow">
              <span className="text-primary font-bold text-xl">D</span>
            </div>
            <div>
              <h1 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-l from-primary to-secondary">
                درهوس
              </h1>
              <p className="text-xs text-on-surface-variant font-medium tracking-wide">المنصة المهنية الذكية</p>
            </div>
          </div>

          <nav className="flex-1 space-y-1.5 hide-scrollbar overflow-y-auto max-h-[calc(100vh-250px)] pb-4">
            {NAV_ITEMS.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={cn(
                  "flex items-center space-x-3 space-x-reverse px-4 py-3 rounded-xl transition-all duration-300 relative overflow-hidden group",
                  location.pathname === item.path
                    ? "bg-primary/10 text-primary font-bold shadow-[inset_0_0_20px_rgba(208,188,255,0.05)]"
                    : "text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface hover:shadow-lg"
                )}
              >
                {location.pathname === item.path && (
                  <motion.div
                    layoutId="sidebar-active"
                    className="absolute right-0 top-0 bottom-0 w-1 bg-primary rounded-l-full"
                    initial={false}
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}
                <item.icon className={cn("w-5 h-5 shrink-0", location.pathname === item.path ? "text-primary" : "text-on-surface-variant group-hover:text-primary")} />
                <span>{item.label}</span>
              </Link>
            ))}
          </nav>
        </div>
      </aside>

      {/* Mobile nav trigger & Sidebar */}
      <div className="lg:hidden fixed top-0 w-full z-50 glass-panel border-x-0 border-t-0 rounded-none h-16 flex items-center justify-between px-4">
        <div className="flex items-center space-x-2 space-x-reverse">
          <div className="w-8 h-8 rounded-lg bg-primary/20 flex items-center justify-center glow">
            <span className="text-primary font-bold text-sm">D</span>
          </div>
          <span className="font-bold text-primary">درهوس</span>
        </div>
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="p-2 -mr-2 text-on-surface"
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 50 }}
            className="fixed inset-y-0 right-0 w-64 glass-panel m-0 rounded-none z-40 flex flex-col p-6 pt-24 lg:hidden shadow-2xl"
          >
            <nav className="flex-1 space-y-2 overflow-y-auto hide-scrollbar">
              {NAV_ITEMS.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={cn(
                    "flex items-center space-x-3 space-x-reverse px-4 py-3 rounded-xl transition-all duration-300",
                    location.pathname === item.path
                      ? "bg-primary/10 text-primary font-bold border-r-2 border-primary"
                      : "text-on-surface-variant hover:bg-surface-container-high"
                  )}
                >
                  <item.icon className="w-5 h-5 shrink-0" />
                  <span>{item.label}</span>
                </Link>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Content Area */}
      <main className="flex-1 overflow-y-auto hide-scrollbar flex flex-col w-full h-full relative">
        <div className="flex-1 p-4 lg:p-8 pt-20 lg:pt-8 w-full max-w-6xl mx-auto h-full flex flex-col">
          <AnimatePresence mode="wait">
            <motion.div
              key={location.pathname}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="flex-1 flex flex-col h-full"
            >
              <Outlet />
            </motion.div>
          </AnimatePresence>
          <Footer />
        </div>
      </main>
    </div>
  );
}
