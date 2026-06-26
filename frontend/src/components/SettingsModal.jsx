import { X, Sun, Moon, RotateCcw, LayoutGrid, Sparkles } from "lucide-react";
import { useTheme } from "../context/ThemeContext";

export default function SettingsModal() {
  const {
    theme,
    darkMode,
    updateSetting,
    resetSettings,
    isSettingsOpen,
    setIsSettingsOpen,
  } = useTheme();

  if (!isSettingsOpen) return null;

  const themes = [
    {
      id: "arctic",
      name: "Arctic Pearl",
      colors: ["bg-[#4F7CFF]", "bg-[#94A3B8]", "bg-[#F8FAFC]"],
      darkColors: ["bg-[#4F7CFF]", "bg-[#475569]", "bg-[#080C14]"],
    },
    {
      id: "quartz",
      name: "Royal Quartz",
      colors: ["bg-[#6C63FF]", "bg-[#A78BFA]", "bg-[#F7F6FF]"],
      darkColors: ["bg-[#6C63FF]", "bg-[#A78BFA]", "bg-[#0D0C1A]"],
    },
    {
      id: "ivory",
      name: "Ivory Luxe",
      colors: ["bg-[#C89B3C]", "bg-[#8D6E63]", "bg-[#FAF8F4]"],
      darkColors: ["bg-[#C89B3C]", "bg-[#8D6E63]", "bg-[#11100E]"],
    },
    {
      id: "indigo",
      name: "Modern Indigo",
      colors: ["bg-[#6366f1]", "bg-[#818cf8]", "bg-[#ffffff]"],
      darkColors: ["bg-[#6366f1]", "bg-[#818cf8]", "bg-[#09090b]"],
    },
    {
      id: "blue",
      name: "Enterprise Blue",
      colors: ["bg-[#2563eb]", "bg-[#60a5fa]", "bg-[#ffffff]"],
      darkColors: ["bg-[#2563eb]", "bg-[#60a5fa]", "bg-[#0f172a]"],
    },
    {
      id: "onyx",
      name: "Midnight Onyx",
      colors: ["bg-[#000000]", "bg-[#52525b]", "bg-[#fafafa]"],
      darkColors: ["bg-[#fafafa]", "bg-[#a1a1aa]", "bg-[#000000]"],
    },
  ];

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-slate-950/40 backdrop-blur-md transition-opacity duration-300"
        onClick={() => setIsSettingsOpen(false)}
      />

      {/* Modal Container */}
      <div className="relative w-full max-w-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-2xl flex flex-col max-h-[85vh] animate-scale-in overflow-hidden z-10 transition-colors duration-300">
        
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200 dark:border-slate-800">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 flex items-center justify-center">
              <Sparkles className="w-4.5 h-4.5" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-slate-900 dark:text-white">
                Appearance Settings
              </h2>
              <p className="text-xs text-slate-500">
                Tailor JobShield to your premium workspace aesthetic.
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={resetSettings}
              className="p-1.5 rounded-lg text-slate-500 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-all flex items-center gap-1.5 text-xs font-semibold"
              title="Reset to factory settings"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              Reset
            </button>
            <button
              onClick={() => setIsSettingsOpen(false)}
              className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-all"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto p-6 space-y-8">
          
          {/* Section 1: Themes */}
          <div className="space-y-3.5">
            <h3 className="text-sm font-bold text-slate-800 dark:text-slate-200 uppercase tracking-widest flex items-center gap-2">
              <LayoutGrid className="w-4 h-4 text-slate-400" />
              1. Visual Themes
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {themes.map((t) => {
                const isActive = theme === t.id;
                const activeDots = darkMode ? t.darkColors : t.colors;
                return (
                  <button
                    key={t.id}
                    onClick={() => updateSetting("theme", t.id)}
                    className={`flex flex-col items-start p-3.5 rounded-xl border text-left transition-all relative group cursor-pointer ${
                      isActive
                        ? "border-indigo-500 bg-indigo-50/20 dark:bg-indigo-950/20 ring-2 ring-indigo-500/20"
                        : "border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 bg-white dark:bg-slate-900/60"
                    }`}
                  >
                    <div className="flex items-center gap-1.5 mb-2.5">
                      {activeDots.map((dot, idx) => (
                        <span key={idx} className={`w-3.5 h-3.5 rounded-full ${dot} shadow-sm border border-black/5 dark:border-white/5`} />
                      ))}
                    </div>
                    <span className="text-sm font-bold text-slate-800 dark:text-slate-200">
                      {t.name}
                    </span>
                    {isActive && (
                      <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-indigo-500" />
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Section 2: Mode */}
          <div className="space-y-3.5">
            <h3 className="text-sm font-bold text-slate-800 dark:text-slate-200 uppercase tracking-widest flex items-center gap-2">
              {darkMode ? <Moon className="w-4 h-4 text-slate-400" /> : <Sun className="w-4 h-4 text-slate-400" />}
              2. Color Mode
            </h3>
            <div className="grid grid-cols-2 gap-4">
              <button
                onClick={() => updateSetting("darkMode", false)}
                className={`flex items-center gap-3 p-4 rounded-xl border text-left transition-all cursor-pointer ${
                  !darkMode
                    ? "border-indigo-500 bg-indigo-50/20 dark:bg-indigo-950/20 ring-2 ring-indigo-500/20"
                    : "border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 bg-white dark:bg-slate-900/60"
                }`}
              >
                <div className="w-9 h-9 rounded-lg bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 flex items-center justify-center">
                  <Sun className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-sm font-bold text-slate-800 dark:text-slate-200">Light Mode</p>
                  <p className="text-xs text-slate-500">Soft warm glow backgrounds</p>
                </div>
              </button>

              <button
                onClick={() => updateSetting("darkMode", true)}
                className={`flex items-center gap-3 p-4 rounded-xl border text-left transition-all cursor-pointer ${
                  darkMode
                    ? "border-indigo-500 bg-indigo-50/20 dark:bg-indigo-950/20 ring-2 ring-indigo-500/20"
                    : "border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 bg-white dark:bg-slate-900/60"
                }`}
              >
                <div className="w-9 h-9 rounded-lg bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 flex items-center justify-center">
                  <Moon className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-sm font-bold text-slate-800 dark:text-slate-200">Dark Mode</p>
                  <p className="text-xs text-slate-500">Premium deep dark palettes</p>
                </div>
              </button>
            </div>
          </div>



        </div>

        {/* Footer info */}
        <div className="px-6 py-3 bg-slate-50 dark:bg-slate-900/80 border-t border-slate-200 dark:border-slate-800 flex justify-between items-center text-[10px] text-slate-400 font-bold uppercase tracking-widest">
          <span>JobShield Customization Engine</span>
          <span>Saves Automatically</span>
        </div>
      </div>
    </div>
  );
}
