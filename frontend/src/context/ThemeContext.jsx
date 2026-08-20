import { createContext, useContext, useState, useEffect } from "react";

const ThemeContext = createContext();

const DEFAULT_SETTINGS = {
  theme: "arctic",
  darkMode: false,
  font: "outfit",
  radius: "squircle",
  glassmorphism: "glassy",
  backgroundPattern: "grids",
  animations: "smooth",
};

export function ThemeProvider({ children }) {
  const [settings, setSettings] = useState(() => {
    try {
      const stored = localStorage.getItem("jobshield-settings");
      if (stored) {
        const parsed = JSON.parse(stored);
        return {
          ...DEFAULT_SETTINGS,
          theme: parsed.theme || "arctic",
          darkMode: parsed.darkMode !== undefined ? parsed.darkMode : false,
        };
      }
    } catch (e) {
      console.error("Failed to parse stored settings, using defaults.");
    }
    // Fallback to old theme state if present (for seamless migration)
    const oldTheme = localStorage.getItem("jobshield-theme");
    if (oldTheme) {
      return { ...DEFAULT_SETTINGS, darkMode: oldTheme === "dark" };
    }
    return DEFAULT_SETTINGS;
  });

  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  useEffect(() => {
    // Always force Light Warm Paper Mode
    const root = document.documentElement;
    root.classList.remove("dark");
    localStorage.removeItem("jobshield-theme");
    localStorage.removeItem("jobshield-settings");
  }, [settings]);

  const updateSetting = (key, value) => {
    setSettings((prev) => ({ ...prev, [key]: value }));
  };

  const resetSettings = () => {
    setSettings(DEFAULT_SETTINGS);
  };

  const value = {
    ...settings,
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

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
}
