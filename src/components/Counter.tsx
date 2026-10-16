"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Counts up to `value` once it scrolls into view.
 *
 * Renders the FINAL number on the server and starts from zero only after JS
 * has decided to animate. The obvious implementation — state initialised to 0
 * — exports "0" into the static HTML, so every metric on the page reads zero
 * to a crawler, to a reader with JS off, and for however long hydration takes.
 * Here the number is correct from first paint and the count-up is the
 * enhancement on top.
 */
export default function Counter({
  value,
  decimals = 0,
  format,
}: {
  value: number;
  decimals?: number;
  format?: (n: number) => string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const [display, setDisplay] = useState(value);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let raf = 0;
    let start: number | null = null;
    const duration = 1500;

    const tick = (t: number) => {
      if (start === null) start = t;
      const p = Math.min((t - start) / duration, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      setDisplay(value * eased);
      if (p < 1) raf = requestAnimationFrame(tick);
      else setDisplay(value);
    };

    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        io.disconnect();
        setDisplay(0);
        raf = requestAnimationFrame(tick);
      },
      { rootMargin: "0px 0px -40px 0px" },
    );
    io.observe(el);

    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
    };
  }, [value]);

  return <span ref={ref}>{format ? format(display) : display.toFixed(decimals)}</span>;
}

/** Indian-grouping currency formatter, e.g. 482560 → "4,82,560". */
export function inr(n: number): string {
  return Math.round(n).toLocaleString("en-IN");
}
