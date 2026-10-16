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
  if (typeof window === "undefined") return "light";
  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

/** Stamp the choice on <html>, which is what every themed token reads from. */
function stamp(t: Theme) {
  document.documentElement.setAttribute("data-theme", t);
  document.documentElement.style.colorScheme = t;
}

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  // Light is the design's home state, so it is also the safe SSR guess.
  const [theme, setThemeState] = useState<Theme>("light");

  // Resolve from whatever the no-flash script already set on <html>, else the
  // stored choice, else the OS — and stamp it, so from here on the attribute
  // is always present and the CSS that keys off it is deterministic.
  useEffect(() => {
    const attr = document.documentElement.getAttribute("data-theme") as Theme | null;
    let stored: Theme | null = null;
    try {
      const s = localStorage.getItem("theme");
      if (s === "light" || s === "dark") stored = s;
    } catch {}
    const resolved = attr ?? stored ?? systemTheme();
    // One deliberate post-mount correction: the server has no way to know the
    // visitor's theme, and reading it during render would mismatch hydration.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setThemeState(resolved);
    stamp(resolved);
  }, []);

  const apply = useCallback((t: Theme) => {
    setThemeState(t);
    stamp(t);
    try {
      localStorage.setItem("theme", t);
    } catch {}
  }, []);

  const setTheme = useCallback((t: Theme) => apply(t), [apply]);
  const toggle = useCallback(() => apply(theme === "dark" ? "light" : "dark"), [apply, theme]);

  // Follow the OS as long as the visitor has not chosen a theme themselves.
  useEffect(() => {
    const mq = window.matchMedia("(prefers-color-scheme: dark)");
    const onChange = () => {
      try {
        if (localStorage.getItem("theme")) return;
      } catch {}
      const next: Theme = mq.matches ? "dark" : "light";
      setThemeState(next);
      stamp(next);
    };
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  return <Ctx.Provider value={{ theme, toggle, setTheme }}>{children}</Ctx.Provider>;
}

export function useTheme() {
  const ctx = useContext(Ctx);
  if (!ctx) return { theme: "light" as Theme, toggle: () => {}, setTheme: () => {} };
  return ctx;
}
