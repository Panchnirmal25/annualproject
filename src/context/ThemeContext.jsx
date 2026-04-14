import React, { createContext, useContext, useEffect, useState } from "react";

const ThemeContext = createContext();

const THEME_CONFIGS = {
  admin: {
    name: "admin",
    label: "Admin Professional",
    primaryColor: "gray-900",
    secondaryColor: "gray-700",
    accentColor: "blue-600",
    backgroundColor: "#111827",
    textColor: "#f3f4f6",
    navbarColor: "from-gray-800 via-gray-900 to-black",
    sidebarColor: "bg-gray-900",
    cardColor: "bg-gray-800",
    borderColor: "border-gray-700",
    hoverColor: "hover:bg-gray-700",
    isDark: true,
    showAISidebar: false,
    description: "Dark, professional dashboard for administrators"
  },
  student: {
    name: "student",
    label: "Student Light",
    primaryColor: "green-500",
    secondaryColor: "green-400",
    accentColor: "green-600",
    backgroundColor: "#f8fafc",
    textColor: "#1e293b",
    navbarColor: "from-green-400 via-teal-400 to-cyan-400",
    sidebarColor: "bg-gradient-to-b from-green-50 to-teal-50",
    cardColor: "bg-white",
    borderColor: "border-green-200",
    hoverColor: "hover:bg-green-50",
    isDark: false,
    showAISidebar: true,
    description: "Light UI with AI suggestions sidebar"
  },
  teacher: {
    name: "teacher",
    label: "Teacher Structured",
    primaryColor: "blue-600",
    secondaryColor: "blue-500",
    accentColor: "indigo-600",
    backgroundColor: "#eff6ff",
    textColor: "#0c2340",
    navbarColor: "from-blue-600 via-indigo-600 to-purple-700",
    sidebarColor: "bg-gradient-to-b from-blue-600 to-indigo-700",
    cardColor: "bg-blue-50",
    borderColor: "border-blue-300",
    hoverColor: "hover:bg-blue-100",
    isDark: false,
    showAISidebar: false,
    description: "Blue UI with structured controls"
  }
};

export const ThemeProvider = ({ children }) => {
  const [currentTheme, setCurrentTheme] = useState("student");

  useEffect(() => {
    applyTheme(currentTheme);
  }, [currentTheme]);

  const applyTheme = (themeName) => {
    const theme = THEME_CONFIGS[themeName];
    if (!theme) return;

    const root = document.documentElement;
    root.style.setProperty("--bg-primary", theme.backgroundColor);
    root.style.setProperty("--text-primary", theme.textColor);
    root.style.setProperty("--color-accent", theme.accentColor);

    if (theme.isDark) {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
  };

  const setThemeByRole = (role) => {
    const roleThemeMap = {
      admin: "admin",
      student: "student",
      teacher: "teacher"
    };
    const themeName = roleThemeMap[role] || "student";
    setCurrentTheme(themeName);
  };

  const getTheme = () => THEME_CONFIGS[currentTheme];

  return (
    <ThemeContext.Provider value={{ currentTheme, setCurrentTheme, setThemeByRole, getTheme, THEME_CONFIGS }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within ThemeProvider");
  }
  return context;
};
