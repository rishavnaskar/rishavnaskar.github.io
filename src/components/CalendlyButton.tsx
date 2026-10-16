"use client";

import { useRef, useState } from "react";
import { SITE } from "@/lib/site";
import { cn } from "@/lib/utils";
import { Arrow, BUTTON_BASE, buttonStyles, type ButtonVariant } from "./ui";

type CalendlyGlobal = { initPopupWidget: (opts: { url: string }) => void };

const WIDGET_JS = "https://assets.calendly.com/assets/external/widget.js";
const WIDGET_CSS = "https://assets.calendly.com/assets/external/widget.css";

/**
 * Loads Calendly's popup widget once, on demand. Resolves when its global is
 * ready; rejects if the script is blocked or fails.
 */
let widget: Promise<CalendlyGlobal> | null = null;
function loadWidget(): Promise<CalendlyGlobal> {
  if (widget) return widget;
  widget = new Promise((resolve, reject) => {
    const existing = (window as unknown as { Calendly?: CalendlyGlobal }).Calendly;
    if (existing?.initPopupWidget) return resolve(existing);

    const css = document.createElement("link");
    css.rel = "stylesheet";
    css.href = WIDGET_CSS;
    document.head.appendChild(css);

    const js = document.createElement("script");
    js.src = WIDGET_JS;
    js.async = true;
    js.onload = () => {
      const C = (window as unknown as { Calendly?: CalendlyGlobal }).Calendly;
      if (C?.initPopupWidget) resolve(C);
      else reject(new Error("Calendly global missing"));
    };
    js.onerror = () => reject(new Error("Calendly widget failed to load"));
    document.body.appendChild(js);
  });
  widget.catch(() => {
    widget = null; // allow a retry on the next intent
  });
  return widget;
}

/**
 * Opens the Calendly scheduling popup.
 *
 * The widget used to load on mount — a third-party script and stylesheet
 * fetched by every visitor, on every page load, for a button most never press.
 * Now it is fetched on intent: hovering, focusing or touching the button warms
 * it up, so by the time the click lands the popup is usually ready. If it is
 * not — the script is blocked, or the tap was faster than the network — the
 * click opens the booking page in a new tab instead, so booking always works.
 */
export default function CalendlyButton({
  children = "Book a quick call",
  className,
  variant = "solid",
}: {
  children?: React.ReactNode;
  className?: string;
  variant?: ButtonVariant;
}) {
  const [ready, setReady] = useState<CalendlyGlobal | null>(null);
  const warmed = useRef(false);

  const warm = () => {
    if (warmed.current) return;
    warmed.current = true;
    loadWidget().then(setReady, () => {});
  };

  const open = () => {
    if (ready) ready.initPopupWidget({ url: SITE.calendly });
    else {
      warm();
      window.open(SITE.calendly, "_blank", "noopener");
    }
  };

  return (
    <button
      type="button"
      onClick={open}
      onPointerEnter={warm}
      onFocus={warm}
      onTouchStart={warm}
      data-track="book_call"
      className={cn(BUTTON_BASE, buttonStyles[variant], className)}
    >
      {children}
      <Arrow />
    </button>
  );
}
