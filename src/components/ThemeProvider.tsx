"use client";

import { createContext, useCallback, useContext, useEffect, useState } from "react";

type Theme = "light" | "dark";

type ThemeCtx = {
  theme: Theme;
  toggle: () => void;
  setTheme: (t: Theme) => void;
};

const Ctx = createContext<ThemeCtx | null>(null);

function systemTheme(): Theme {
  if (typeof window === "undefined") return "dark";
  return window.matchMedia("(prefers-color-scheme: light)").matches ? "light" : "dark";
}

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  // Initialise from whatever the no-flash script already set on <html>, else system.
  const [theme, setThemeState] = useState<Theme>("dark");

  useEffect(() => {
    const attr = document.documentElement.getAttribute("data-theme") as Theme | null;
    let stored: Theme | null = null;
    try {
      const s = localStorage.getItem("theme");
      if (s === "light" || s === "dark") stored = s;
    } catch {}
    setThemeState(attr ?? stored ?? systemTheme());
  }, []);

  const apply = (t: Theme) => {
    setThemeState(t);
    document.documentElement.setAttribute("data-theme", t);
    document.documentElement.style.colorScheme = t;
    try {
      localStorage.setItem("theme", t);
    } catch {}
  };

  const setTheme = useCallback((t: Theme) => apply(t), []);
  const toggle = useCallback(() => apply(theme === "dark" ? "light" : "dark"), [theme]);

  // Follow the OS if the user has not explicitly chosen a theme this session.
  useEffect(() => {
    const mq = window.matchMedia("(prefers-color-scheme: light)");
    const onChange = () => {
      try {
        if (!localStorage.getItem("theme")) setThemeState(mq.matches ? "light" : "dark");
      } catch {}
    };
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  return <Ctx.Provider value={{ theme, toggle, setTheme }}>{children}</Ctx.Provider>;
}

export function useTheme() {
  const ctx = useContext(Ctx);
  if (!ctx) return { theme: "dark" as Theme, toggle: () => {}, setTheme: () => {} };
  return ctx;
}
