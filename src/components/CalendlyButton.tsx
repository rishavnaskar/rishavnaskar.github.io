"use client";

import { useEffect, useState } from "react";
import { ArrowUpRight } from "lucide-react";
import { SITE } from "@/lib/site";
import { cn } from "@/lib/utils";

type CalendlyGlobal = { initPopupWidget: (opts: { url: string }) => void };

/**
 * Opens the Calendly scheduling popup, lazily loading the widget the first time
 * it's needed. Falls back to opening the link in a new tab if the script is
 * blocked, so booking always works.
 */
export default function CalendlyButton({
  children = "Book a quick call",
  className,
  variant = "primary",
}: {
  children?: React.ReactNode;
  className?: string;
  variant?: "primary" | "ghost";
}) {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (document.getElementById("calendly-widget-js")) {
      setReady(true);
      return;
    }
    const css = document.createElement("link");
    css.rel = "stylesheet";
    css.href = "https://assets.calendly.com/assets/external/widget.css";
    document.head.appendChild(css);

    const js = document.createElement("script");
    js.id = "calendly-widget-js";
    js.src = "https://assets.calendly.com/assets/external/widget.js";
    js.async = true;
    js.onload = () => setReady(true);
    document.body.appendChild(js);
  }, []);

  const open = () => {
    const C = (window as unknown as { Calendly?: CalendlyGlobal }).Calendly;
    if (ready && C?.initPopupWidget) C.initPopupWidget({ url: SITE.calendly });
    else window.open(SITE.calendly, "_blank", "noopener");
  };

  const base =
    "group inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 font-display text-sm font-medium transition-all duration-300";
  const styles =
    variant === "primary"
      ? "bg-gradient-to-r from-violet to-violet-bright text-white shadow-[0_12px_30px_-12px_var(--color-violet)] hover:-translate-y-0.5 hover:shadow-[0_20px_40px_-14px_var(--color-violet)]"
      : "border border-border bg-surface/50 text-fg hover:-translate-y-0.5 hover:border-accent hover:text-accent";

  return (
    <button type="button" onClick={open} data-track="book_call" className={cn(base, styles, className)}>
      {children}
      <ArrowUpRight className="size-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
    </button>
  );
}
