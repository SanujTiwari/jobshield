import { createContext, useContext, useState, useEffect } from "react";

const ThemeContext = createContext();

const DEFAULT_SETTINGS = {
  theme: "indigo",
  darkMode: false,
  font: "inter",
  radius: "sleek",
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
        return { ...DEFAULT_SETTINGS, ...parsed };
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
    // Sync settings to localStorage
    localStorage.setItem("jobshield-settings", JSON.stringify(settings));
    // Also sync the legacy item just in case
    localStorage.setItem("jobshield-theme", settings.darkMode ? "dark" : "light");

    // Apply settings to document.documentElement
    const root = document.documentElement;
    root.setAttribute("data-theme", settings.theme);
    root.setAttribute("data-font", settings.font);
    root.setAttribute("data-radius", settings.radius);
    root.setAttribute("data-glassmorphism", settings.glassmorphism);
    root.setAttribute("data-bg-pattern", settings.backgroundPattern);
    root.setAttribute("data-animations", settings.animations);

    if (settings.darkMode) {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
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
