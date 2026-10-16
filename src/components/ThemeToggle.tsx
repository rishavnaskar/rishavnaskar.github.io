"use client";

import { cn } from "@/lib/utils";
import { useTheme } from "./ThemeProvider";

/**
 * Sun/moon switch. `onDark` inverts it while the bar sits over an ink band.
 *
 * Both icons are always in the DOM; which one shows is decided in CSS from
 * `data-theme` (see globals.css), so the button is correct at first paint
 * instead of swapping once React works out the real theme.
 */
export default function ThemeToggle({
  className,
  onDark = false,
}: {
  className?: string;
  onDark?: boolean;
}) {
  const { theme, toggle } = useTheme();

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} theme`}
      className={cn(
        "relative grid size-10 place-items-center overflow-hidden rounded-full border transition-colors",
        onDark
          ? "border-white/15 text-white/60 hover:border-white/35 hover:text-white"
          : "border-paper-line text-graphite hover:border-fg/35 hover:text-fg",
        className,
      )}
    >
      <svg
        aria-hidden
        viewBox="0 0 24 24"
        className="theme-icon theme-icon-moon size-[17px]"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M20.5 14.2A8.5 8.5 0 019.8 3.5a8.5 8.5 0 1010.7 10.7z" />
      </svg>
      <svg
        aria-hidden
        viewBox="0 0 24 24"
        className="theme-icon theme-icon-sun size-[17px]"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <circle cx="12" cy="12" r="4.2" />
        <path d="M12 2.4v2.2M12 19.4v2.2M4.2 4.2l1.6 1.6M18.2 18.2l1.6 1.6M2.4 12h2.2M19.4 12h2.2M4.2 19.8l1.6-1.6M18.2 5.8l1.6-1.6" />
      </svg>
    </button>
  );
}
