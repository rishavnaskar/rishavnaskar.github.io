"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { NAV_LINKS, SITE } from "@/lib/site";
import { cn } from "@/lib/utils";
import { Logo } from "./Logo";
import ThemeToggle from "./ThemeToggle";

type Zone = { top: number; bottom: number };

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [onDark, setOnDark] = useState(false);
  const [open, setOpen] = useState(false);
  const closeRef = useRef<HTMLButtonElement>(null);
  const openerRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    // Sections opt into the inverted bar with data-nav="dark". Their extents
    // are measured once (and again on resize or when a disclosure changes the
    // page height), not on every scroll frame — reading layout per frame for
    // every band was the one thing this handler did that could jank.
    let zones: Zone[] = [];
    const measureZones = () => {
      zones = Array.from(document.querySelectorAll<HTMLElement>('[data-nav="dark"]')).map((el) => {
        const top = el.getBoundingClientRect().top + window.scrollY;
        return { top, bottom: top + el.offsetHeight };
      });
    };

    let ticking = false;
    const sample = () => {
      ticking = false;
      const y = window.scrollY;
      setScrolled(y > 24);
      const probe = y + 64;
      setOnDark(zones.some((z) => probe > z.top && probe < z.bottom));
    };
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(sample);
    };
    const onResize = () => {
      measureZones();
      onScroll();
    };

    measureZones();
    sample();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize);
    // Accordions and "show more" toggles move everything below them.
    const ro = new ResizeObserver(onResize);
    ro.observe(document.body);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
      ro.disconnect();
    };
  }, []);

  // The overlay is a dialog: it locks the page scroll, takes focus, closes
  // on Escape and hands focus back to the button that opened it.
  useEffect(() => {
    if (!open) return;
    const opener = openerRef.current;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
      opener?.focus();
    };
  }, [open]);

  return (
    <>
      <header className="sticky top-0 z-40 pt-3 no-print">
        <div className="shell">
          <div
            className={cn(
              "flex items-center justify-between rounded-full pl-4 pr-2 transition-all duration-500 sm:pl-5",
              scrolled
                ? cn(
                    "py-2 backdrop-blur-xl",
                    onDark
                      ? "border border-white/12 bg-ink/85 shadow-[0_14px_40px_-24px_rgba(0,0,0,.9)]"
                      : "border border-paper-line bg-paper/90 shadow-[0_14px_40px_-24px_rgba(11,11,12,.4)]",
                  )
                : "border border-transparent py-2.5",
            )}
          >
            <a href="#top" aria-label="Rishav Naskar, top of page">
              <Logo tone={onDark ? "light" : "dark"} />
            </a>

            <nav className="hidden items-center gap-0.5 lg:flex" aria-label="Primary">
              {NAV_LINKS.map((l) => (
                <a
                  key={l.href}
                  href={l.href}
                  className={cn(
                    "rounded-full px-3 py-2 text-[0.85rem] transition-colors",
                    onDark
                      ? "text-white/60 hover:bg-white/10 hover:text-white"
                      : "text-graphite hover:bg-fg/[0.04] hover:text-fg",
                  )}
                >
                  {l.label}
                </a>
              ))}
            </nav>

            <div className="flex items-center gap-2">
              <ThemeToggle onDark={onDark} />
              <a
                href={SITE.calendly}
                target="_blank"
                rel="noopener noreferrer"
                className={cn(
                  "hidden rounded-full px-5 py-2.5 text-[0.85rem] font-medium transition-colors duration-300 hover:bg-ember hover:text-white sm:inline-flex",
                  onDark ? "bg-on-ink text-ink" : "bg-fg text-paper",
                )}
              >
                Book a call
              </a>
              <button
                ref={openerRef}
                type="button"
                onClick={() => setOpen(true)}
                aria-label="Open menu"
                aria-haspopup="dialog"
                aria-expanded={open}
                className={cn(
                  "flex size-10 items-center justify-center rounded-full border lg:hidden",
                  onDark ? "border-white/20 text-on-ink" : "border-paper-line text-fg",
                )}
              >
                <svg viewBox="0 0 18 12" className="size-4" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round">
                  <path d="M1 1h16M1 6h16M1 11h16" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {open ? (
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label="Menu"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.28 }}
            className="fixed inset-0 z-50 overflow-y-auto bg-ink text-on-ink lg:hidden"
          >
            <div className="shell flex min-h-full flex-col">
              <div className="flex items-center justify-between py-5">
                <Logo tone="light" />
                <button
                  ref={closeRef}
                  type="button"
                  onClick={() => setOpen(false)}
                  aria-label="Close menu"
                  className="flex size-10 items-center justify-center rounded-full border border-white/15"
                >
                  <svg viewBox="0 0 14 14" className="size-4" stroke="currentColor" strokeWidth="1.5" fill="none">
                    <path d="M2 2l10 10M12 2L2 12" />
                  </svg>
                </button>
              </div>

              <nav className="mt-4 flex flex-col" aria-label="Primary">
                {NAV_LINKS.map((l, i) => (
                  <motion.a
                    key={l.href}
                    href={l.href}
                    onClick={() => setOpen(false)}
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.06 + i * 0.04, duration: 0.45 }}
                    className="flex items-baseline gap-4 border-b border-white/8 py-4 text-[1.6rem] tracking-[-0.03em]"
                  >
                    <span className="eyebrow text-ember-lit">{String(i + 1).padStart(2, "0")}</span>
                    {l.label}
                  </motion.a>
                ))}
              </nav>

              <a
                href={SITE.calendly}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setOpen(false)}
                className="mt-auto mb-8 inline-flex items-center justify-center rounded-full bg-ember px-6 py-4 font-medium text-white"
              >
                Book a quick call
              </a>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
}
