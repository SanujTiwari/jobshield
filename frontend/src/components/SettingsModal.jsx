import { X, Sun, Moon, RotateCcw, Type, Square, LayoutGrid, Zap, Sparkles } from "lucide-react";
import { useTheme } from "../context/ThemeContext";

export default function SettingsModal() {
  const {
    theme,
    darkMode,
    font,
    radius,
    glassmorphism,
    backgroundPattern,
    animations,
    updateSetting,
    resetSettings,
    isSettingsOpen,
    setIsSettingsOpen,
  } = useTheme();

  if (!isSettingsOpen) return null;

  const themes = [
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
    {
      id: "minimal",
      name: "Monochrome Zinc",
      colors: ["bg-[#27272a]", "bg-[#71717a]", "bg-[#ffffff]"],
      darkColors: ["bg-[#ffffff]", "bg-[#d4d4d8]", "bg-[#09090b]"],
    },
  ];

  const fonts = [
    { id: "inter", name: "Inter", desc: "Neo-grotesque, tech neutral" },
    { id: "outfit", name: "Outfit", desc: "Geometric, premium tech" },
    { id: "space-grotesk", name: "Space Grotesk", desc: "Wide editorial, creative" },
    { id: "jetbrains-mono", name: "JetBrains Mono", desc: "Technical monospace" },
  ];

  const radii = [
    { id: "sharp", name: "Sharp", desc: "Architectural (0px)" },
    { id: "subtle", name: "Subtle", desc: "Minimalist (6px)" },
    { id: "sleek", name: "Sleek", desc: "Contemporary (12px)" },
    { id: "squircle", name: "Squircle", desc: "Organic / Cozy (24px)" },
  ];

  const glassOptions = [
    { id: "glassy", name: "Glassmorphism", desc: "Translucent backdrop blurs" },
    { id: "solid", name: "Solid Premium", desc: "High contrast flat panels" },
  ];

  const backgroundPatterns = [
    { id: "gradients", name: "Organic Blobs", desc: "Fluid glowing background blobs" },
    { id: "grids", name: "Brutalist Grids", desc: "Technical layout grids" },
    { id: "flat", name: "Clean Flat", desc: "Solid background only" },
  ];

  const animationOptions = [
    { id: "rich", name: "Rich Motion", desc: "Floating widgets, full transitions" },
    { id: "smooth", name: "Smooth Classic", desc: "Basic fades, reduced graphics load" },
    { id: "none", name: "Static Mode", desc: "Reduced motion, instant states" },
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

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Section 3: Typography */}
            <div className="space-y-3.5">
              <h3 className="text-sm font-bold text-slate-800 dark:text-slate-200 uppercase tracking-widest flex items-center gap-2">
                <Type className="w-4 h-4 text-slate-400" />
                3. Typography
              </h3>
              <div className="space-y-2">
                {fonts.map((f) => (
                  <button
                    key={f.id}
                    onClick={() => updateSetting("font", f.id)}
                    className={`w-full flex items-center justify-between p-3.5 rounded-xl border text-left transition-all cursor-pointer ${
                      font === f.id
                        ? "border-indigo-500 bg-indigo-50/20 dark:bg-indigo-950/20 ring-1 ring-indigo-500"
                        : "border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 bg-white dark:bg-slate-900/40"
                    }`}
                  >
                    <div>
                      <p className="text-sm font-bold text-slate-800 dark:text-slate-200">{f.name}</p>
                      <p className="text-xs text-slate-500">{f.desc}</p>
                    </div>
                    <span className="text-xs px-2.5 py-1 rounded bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 font-semibold uppercase tracking-wider">
                      Aa
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Section 4: Radii */}
            <div className="space-y-3.5">
              <h3 className="text-sm font-bold text-slate-800 dark:text-slate-200 uppercase tracking-widest flex items-center gap-2">
                <Square className="w-4 h-4 text-slate-400" />
                4. Card Corners
              </h3>
              <div className="space-y-2">
                {radii.map((r) => (
                  <button
                    key={r.id}
                    onClick={() => updateSetting("radius", r.id)}
                    className={`w-full flex items-center justify-between p-3.5 rounded-xl border text-left transition-all cursor-pointer ${
                      radius === r.id
                        ? "border-indigo-500 bg-indigo-50/20 dark:bg-indigo-950/20 ring-1 ring-indigo-500"
                        : "border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 bg-white dark:bg-slate-900/40"
                    }`}
                  >
                    <div>
                      <p className="text-sm font-bold text-slate-800 dark:text-slate-200">{r.name}</p>
                      <p className="text-xs text-slate-500">{r.desc}</p>
                    </div>
                    <div className="w-6 h-6 border-2 border-slate-300 dark:border-slate-600 rounded flex-shrink-0"
                         style={{ 
                           borderRadius: r.id === "sharp" ? "0px" : r.id === "subtle" ? "4px" : r.id === "sleek" ? "8px" : "14px"
                         }} 
                    />
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Section 5: Transparency & Background */}
            <div className="space-y-3.5">
              <h3 className="text-sm font-bold text-slate-800 dark:text-slate-200 uppercase tracking-widest flex items-center gap-2">
                <LayoutGrid className="w-4 h-4 text-slate-400" />
                5. Background & Glass
              </h3>
              <div className="space-y-4">
                {/* Background Pattern */}
                <div className="space-y-2">
                  <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Backdrop Texture</p>
                  <div className="space-y-2">
                    {backgroundPatterns.map((bp) => (
                      <button
                        key={bp.id}
                        onClick={() => updateSetting("backgroundPattern", bp.id)}
                        className={`w-full flex items-center justify-between p-3 rounded-xl border text-left transition-all cursor-pointer ${
                          backgroundPattern === bp.id
                            ? "border-indigo-500 bg-indigo-50/15 dark:bg-indigo-950/15"
                            : "border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 bg-white dark:bg-slate-900/40"
                        }`}
                      >
                        <div>
                          <p className="text-xs font-bold text-slate-800 dark:text-slate-200">{bp.name}</p>
                          <p className="text-[10px] text-slate-500">{bp.desc}</p>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Glassmorphism */}
                <div className="space-y-2">
                  <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Transparency Style</p>
                  <div className="space-y-2">
                    {glassOptions.map((g) => (
                      <button
                        key={g.id}
                        onClick={() => updateSetting("glassmorphism", g.id)}
                        className={`w-full flex items-center justify-between p-3 rounded-xl border text-left transition-all cursor-pointer ${
                          glassmorphism === g.id
                            ? "border-indigo-500 bg-indigo-50/15 dark:bg-indigo-950/15"
                            : "border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 bg-white dark:bg-slate-900/40"
                        }`}
                      >
                        <div>
                          <p className="text-xs font-bold text-slate-800 dark:text-slate-200">{g.name}</p>
                          <p className="text-[10px] text-slate-500">{g.desc}</p>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Section 6: Animations */}
            <div className="space-y-3.5">
              <h3 className="text-sm font-bold text-slate-800 dark:text-slate-200 uppercase tracking-widest flex items-center gap-2">
                <Zap className="w-4 h-4 text-slate-400" />
                6. Animations Rig
              </h3>
              <div className="space-y-2">
                {animationOptions.map((ao) => (
                  <button
                    key={ao.id}
                    onClick={() => updateSetting("animations", ao.id)}
                    className={`w-full flex items-center justify-between p-3.5 rounded-xl border text-left transition-all cursor-pointer ${
                      animations === ao.id
                        ? "border-indigo-500 bg-indigo-50/20 dark:bg-indigo-950/20 ring-1 ring-indigo-500"
                        : "border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 bg-white dark:bg-slate-900/40"
                    }`}
                  >
                    <div>
                      <p className="text-sm font-bold text-slate-800 dark:text-slate-200">{ao.name}</p>
                      <p className="text-xs text-slate-500">{ao.desc}</p>
                    </div>
                  </button>
                ))}
              </div>
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
