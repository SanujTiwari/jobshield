import { createContext, useContext, useState, useEffect } from "react";

const ThemeContext = createContext();

const DEFAULT_SETTINGS = {
  theme: "indigo",
  darkMode: false,
  font: "sans",
  radius: "sleek",
  glassmorphism: "glassy",
  backgroundPattern: "grids",
  animations: "smooth",
};

/** Provides global theme/settings state to the application. */
export function ThemeProvider({ children }) {
  const [settings, setSettings] = useState(() => {
    try {
      const stored = localStorage.getItem("jobshield-settings");
      if (stored) {
        return {
          ...DEFAULT_SETTINGS,
          ...JSON.parse(stored),
        };
      }
    } catch (e) {
      console.error("Failed to parse stored settings, using defaults.");
    }
    return DEFAULT_SETTINGS;
  });

  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  useEffect(() => {
    const root = document.documentElement;
    if (settings.darkMode) {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
    localStorage.setItem("jobshield-settings", JSON.stringify(settings));
  }, [settings]);

  /** Update a single setting by key. */
  const updateSetting = (key, value) => {
    setSettings((prev) => ({ ...prev, [key]: value }));
  };

  /** Reset all settings to their defaults. */
  const resetSettings = () => {
    setSettings(DEFAULT_SETTINGS);
  };

  const value = {
    ...settings,
    /** Semantic alias for darkMode — prefer this in components. */
    isDark: settings.darkMode,
    updateSetting,
    resetSettings,
    isSettingsOpen,
    setIsSettingsOpen,
  };

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
}

/**
 * useTheme - Consume the ThemeContext.
 * Must be used inside a <ThemeProvider>.
 */
export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
}
