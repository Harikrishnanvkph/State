import React, { createContext, useCallback, useMemo, useState } from "react";
import * as echarts from "echarts";

export const ThemeContext = createContext({
  themeName: "light",
  toggleTheme: () => {},
  textColor: "#111827",
  cardBg: "#ffffff",
  pageBg: "#f3f4f6",
});

const customDarkThemeName = "custom-dark";

// Register a minimal custom dark theme once
try {
  echarts.registerTheme(customDarkThemeName, {
    color: [
      "#60a5fa",
      "#34d399",
      "#f472b6",
      "#f59e0b",
      "#a78bfa",
      "#f87171",
      "#10b981",
      "#38bdf8",
    ],
    backgroundColor: "#0b1220",
    textStyle: {
      color: "#e5e7eb",
    },
    axisPointer: {
      lineStyle: { color: "#93c5fd" },
      crossStyle: { color: "#93c5fd" },
      shadowStyle: { color: "rgba(148,163,184,0.15)" },
    },
    legend: {
      textStyle: { color: "#e5e7eb" },
    },
    tooltip: {
      backgroundColor: "#111827",
      borderColor: "#374151",
      textStyle: { color: "#e5e7eb" },
    },
    grid: {
      borderColor: "#374151",
    },
    categoryAxis: {
      axisLine: { lineStyle: { color: "#6b7280" } },
      axisLabel: { color: "#d1d5db" },
      splitLine: { lineStyle: { color: "#1f2937" } },
    },
    valueAxis: {
      axisLine: { lineStyle: { color: "#6b7280" } },
      axisLabel: { color: "#d1d5db" },
      splitLine: { lineStyle: { color: "#1f2937" } },
    },
  });
} catch {}

export function ThemeProvider({ children, initial = "light" }) {
  const [themeName, setThemeName] = useState(initial);

  const toggleTheme = useCallback(() => {
    setThemeName((prev) => (prev === "light" ? "dark" : "light"));
  }, []);

  const value = useMemo(() => {
    const dark = themeName === "dark";
    return {
      themeName,
      toggleTheme,
      textColor: dark ? "#e5e7eb" : "#111827",
      cardBg: dark ? "#0f172a" : "#ffffff",
      pageBg: dark ? "#0b1220" : "#f3f4f6",
      echartsTheme: dark ? customDarkThemeName : undefined,
    };
  }, [themeName, toggleTheme]);

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}