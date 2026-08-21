import { X, Sun, Moon, RotateCcw, Sparkles } from "lucide-react";
import { useTheme } from "../context/ThemeContext";

export default function SettingsModal() {
  const {
    darkMode,
    updateSetting,
    resetSettings,
    isSettingsOpen,
    setIsSettingsOpen,
  } = useTheme();

  if (!isSettingsOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-slate-950/40 dark:bg-black/60 backdrop-blur-sm transition-opacity duration-300"
        onClick={() => setIsSettingsOpen(false)}
      />

      {/* Modal Container */}
      <div className="relative w-full max-w-md bg-[var(--panel)] border border-[var(--line)] rounded-2xl shadow-2xl flex flex-col max-h-[85vh] animate-scale-in overflow-hidden z-10 transition-colors duration-300">
        
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[var(--line)]">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 flex items-center justify-center">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-sm font-bold text-[var(--ink)]">
                Appearance Settings
              </h2>
              <p className="text-[11px] text-[var(--ink-dim)]">
                Tailor JobShield to your workspace preference.
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={resetSettings}
              className="p-1.5 rounded-lg text-[var(--ink-dim)] hover:text-[var(--ink)] hover:bg-[var(--panel-secondary)] transition-all flex items-center gap-1.5 text-[11px] font-semibold cursor-pointer"
              title="Reset to defaults"
            >
              <RotateCcw className="w-3 h-3" />
              Reset
            </button>
            <button
              onClick={() => setIsSettingsOpen(false)}
              className="p-1.5 rounded-lg text-[var(--ink-dim)] hover:text-[var(--ink)] hover:bg-[var(--panel-secondary)] transition-all cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {/* Theme Settings */}
          <div className="space-y-3">
            <h3 className="text-xs font-bold text-[var(--ink-dim)] uppercase tracking-wider">
              Theme Palette
            </h3>
            <div className="grid grid-cols-2 gap-3">
              {[
                { id: "indigo", label: "Indigo Accent", color: "bg-indigo-600" },
                { id: "blue", label: "Blue Accent", color: "bg-blue-600" }
              ].map((t) => (
                <button
                  key={t.id}
                  onClick={() => updateSetting("theme", t.id)}
                  className="flex items-center gap-2.5 p-3 rounded-xl border border-[var(--line)] bg-[var(--panel-secondary)]/50 hover:bg-[var(--panel-secondary)] text-[var(--ink)] text-xs font-semibold cursor-pointer transition-all"
                >
                  <span className={`w-3.5 h-3.5 rounded-full ${t.color}`} />
                  {t.label}
                </button>
              ))}
            </div>
          </div>

          {/* Color Mode */}
          <div className="space-y-3">
            <h3 className="text-xs font-bold text-[var(--ink-dim)] uppercase tracking-wider">
              Color Mode
            </h3>
            <div className="grid grid-cols-2 gap-4">
              <button
                onClick={() => updateSetting("darkMode", false)}
                className={`flex items-center gap-3 p-4 rounded-xl border transition-all cursor-pointer ${
                  !darkMode
                    ? "border-indigo-500 bg-indigo-50/10 dark:bg-indigo-950/10 ring-1 ring-indigo-500/20"
                    : "border-[var(--line)] bg-[var(--panel-secondary)]/35 hover:bg-[var(--panel-secondary)]"
                }`}
              >
                <div className="w-9 h-9 rounded-lg bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 flex items-center justify-center">
                  <Sun className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xs font-bold text-[var(--ink)]">Light Mode</p>
                  <p className="text-[10px] text-[var(--ink-dim)]">Clean and crisp</p>
                </div>
              </button>

              <button
                onClick={() => updateSetting("darkMode", true)}
                className={`flex items-center gap-3 p-4 rounded-xl border transition-all cursor-pointer ${
                  darkMode
                    ? "border-indigo-500 bg-indigo-50/10 dark:bg-indigo-950/10 ring-1 ring-indigo-500/20"
                    : "border-[var(--line)] bg-[var(--panel-secondary)]/35 hover:bg-[var(--panel-secondary)]"
                }`}
              >
                <div className="w-9 h-9 rounded-lg bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 flex items-center justify-center">
                  <Moon className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xs font-bold text-[var(--ink)]">Dark Mode</p>
                  <p className="text-[10px] text-[var(--ink-dim)]">Obsidian theme</p>
                </div>
              </button>
            </div>
          </div>
        </div>

        {/* Footer info */}
        <div className="px-6 py-3 bg-[var(--panel-secondary)] border-t border-[var(--line)] flex justify-between items-center text-[9px] text-[var(--ink-dim)] font-bold uppercase tracking-wider">
          <span>Appearance Console</span>
          <span>Saved Automatically</span>
        </div>
      </div>
    </div>
  );
}
