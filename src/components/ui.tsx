"use client";

import { useEffect, useRef, type CSSProperties, type ReactNode } from "react";
import { cn } from "@/lib/utils";

/* -------------------------------------------------------------------------- */
/* Reveal primitives                                                          */
/*                                                                            */
/* Both of these animate in CSS, and both leave the markup in its VISIBLE      */
/* resting state. JS only arms elements that are still below the fold after    */
/* hydration — see the long note in globals.css for why that matters on a      */
/* statically exported site.                                                   */
/* -------------------------------------------------------------------------- */

/** Adds `armed`, then `is-in` once the element scrolls up into view. */
function useArmedReveal(armedClass: string, enabled = true) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || !enabled) return;

    // Already on screen when we booted: it has been read by now, so revealing
    // it would mean hiding something the visitor is already looking at.
    if (el.getBoundingClientRect().top < window.innerHeight) return;

    el.classList.add(armedClass);
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        el.classList.add("is-in");
        io.disconnect();
      },
      { rootMargin: "0px 0px -8% 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [armedClass, enabled]);

  return ref;
}

type RiseTag = "div" | "section" | "li" | "span" | "article" | "dd";

/**
 * Fades and lifts its children into view once, on first intersection.
 * `delay` is an index, not seconds — pass the item's position in a list.
 */
export function Rise({
  children,
  delay = 0,
  className,
  as: Comp = "div",
  style,
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
  as?: RiseTag;
  style?: CSSProperties;
}) {
  const ref = useArmedReveal("reveal");
  return (
    <Comp
      ref={ref as React.Ref<never>}
      className={className}
      style={{ ...style, "--i": delay } as CSSProperties}
    >
      {children}
    </Comp>
  );
}

/**
 * Splits a headline into lines that clip upward into place. Each entry in
 * `lines` becomes its own overflow-hidden row.
 *
 * `eager` runs the animation at first paint instead of on intersection — use
 * it above the fold, where waiting for an observer only means waiting for
 * hydration.
 */
export function ClipLines({
  lines,
  className,
  lineClassName,
  delay = 0,
  eager = false,
}: {
  lines: readonly string[];
  className?: string;
  lineClassName?: string;
  delay?: number;
  eager?: boolean;
}) {
  const ref = useArmedReveal("clip-armed", !eager);

  return (
    <span ref={ref as React.Ref<never>} className={cn(eager && "clip-eager", className)}>
      {lines.map((line, i) => (
        <span key={line + i} className="clip-row">
          <span
            className={cn("clip-line", lineClassName)}
            style={{ "--i": i, "--clip-delay": `${delay}s` } as CSSProperties}
          >
            {line}
          </span>
        </span>
      ))}
    </span>
  );
}

/* -------------------------------------------------------------------------- */
/* Chrome                                                                     */
/* -------------------------------------------------------------------------- */

/** The monospaced section label, with its struck-square bullet. */
export function Eyebrow({
  children,
  tone = "dark",
  className,
}: {
  children: ReactNode;
  tone?: "dark" | "light";
  className?: string;
}) {
  return (
    <div
      className={cn(
        "eyebrow flex items-center gap-2.5",
        tone === "dark" ? "text-ember-deep" : "text-ember-lit",
        className,
      )}
    >
      <span aria-hidden className="inline-block size-[7px] rotate-45 bg-current" />
      {children}
    </div>
  );
}

const BUTTON_BASE =
  "group relative inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 font-sans text-[0.925rem] font-medium tracking-[-0.01em] transition-all duration-300 will-change-transform hover:-translate-y-px active:translate-y-0";

export const buttonStyles = {
  solid:
    "bg-fg text-paper shadow-[0_1px_0_rgba(255,255,255,.16)_inset,0_10px_24px_-12px_rgba(11,11,12,.7)] hover:bg-ember hover:text-white hover:shadow-[0_10px_30px_-10px_rgba(240,82,28,.65)]",
  outline: "border border-paper-line bg-transparent text-fg hover:border-fg/40 hover:bg-fg/[0.03]",
  light: "bg-on-ink text-ink hover:bg-ember hover:text-white shadow-[0_10px_30px_-14px_rgba(0,0,0,.6)]",
  ghost: "border border-white/15 bg-white/[0.04] text-white hover:border-white/35 hover:bg-white/[0.09]",
} as const;

export type ButtonVariant = keyof typeof buttonStyles;

/** The trailing arrow shared by every call to action. */
export function Arrow({ className }: { className?: string }) {
  return (
    <svg
      aria-hidden
      viewBox="0 0 16 16"
      className={cn("size-3.5 transition-transform duration-300 group-hover:translate-x-0.5", className)}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M3 8h10M9 4l4 4-4 4" />
    </svg>
  );
}

export function Button({
  href,
  children,
  variant = "solid",
  external = false,
  className,
  ...rest
}: {
  href: string;
  children: ReactNode;
  variant?: ButtonVariant;
  external?: boolean;
  className?: string;
} & React.AnchorHTMLAttributes<HTMLAnchorElement>) {
  return (
    <a
      href={href}
      className={cn(BUTTON_BASE, buttonStyles[variant], className)}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      {...rest}
    >
      {children}
      <Arrow />
    </a>
  );
}

export { BUTTON_BASE };

/** Eyebrow + headline + lede, the opening of every section. */
export function SectionHead({
  eyebrow,
  headline,
  lede,
  tone = "dark",
  align = "left",
  className,
}: {
  eyebrow: string;
  headline: string;
  lede?: string;
  tone?: "dark" | "light";
  align?: "left" | "center";
  className?: string;
}) {
  const centered = align === "center";
  return (
    <div className={cn(centered && "mx-auto max-w-3xl text-center", className)}>
      <Rise>
        <Eyebrow tone={tone} className={centered ? "justify-center" : undefined}>
          {eyebrow}
        </Eyebrow>
      </Rise>
      <Rise delay={1}>
        <h2
          className={cn(
            "display-lg mt-5 max-w-[19ch] sm:mt-6",
            centered && "mx-auto max-w-[22ch]",
            tone === "light" ? "text-on-ink" : "text-fg",
          )}
        >
          {headline}
        </h2>
      </Rise>
      {lede ? (
        <Rise delay={2}>
          <p
            className={cn(
              "lede mt-5 max-w-[54ch] sm:mt-6",
              centered && "mx-auto",
              tone === "light" && "text-white/55",
            )}
          >
            {lede}
          </p>
        </Rise>
      ) : null}
    </div>
  );
}

/** Small pill used for tech tags across the page. */
export function Tag({ children, tone = "dark" }: { children: ReactNode; tone?: "dark" | "light" }) {
  return (
    <li
      className={cn(
        "rounded-full px-2.5 py-1 font-mono text-[0.7rem] tracking-tight",
        tone === "light" ? "bg-white/[0.07] text-white/60" : "bg-fg/[0.05] text-graphite",
      )}
    >
      {children}
    </li>
  );
}

/* -------------------------------------------------------------------------- */
/* Disclosure                                                                 */
/*                                                                            */
/* Every "show more" on the page — the About bio, a project on a phone, a      */
/* role in the timeline — is the same three parts: a toggle, a chevron or     */
/* plus that turns, and a panel that animates to its own height while keeping */
/* its copy in the DOM. Defined once here so they stay in step.               */
/* -------------------------------------------------------------------------- */

/** The chevron on an inline text toggle. Rotates when `open`. */
export function Chevron({ open = false, className }: { open?: boolean; className?: string }) {
  return (
    <svg
      aria-hidden
      viewBox="0 0 16 16"
      className={cn("size-3.5 transition-transform duration-300", open && "rotate-180", className)}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M4 6l4 4 4-4" />
    </svg>
  );
}

/** The plus that turns into a cross on an accordion row. */
export function PlusIcon({ open = false, tone = "dark" }: { open?: boolean; tone?: "dark" | "light" }) {
  return (
    <span
      aria-hidden
      className={cn(
        "flex size-7 shrink-0 items-center justify-center rounded-full border transition-all duration-300",
        open
          ? "rotate-45 border-ember bg-ember text-white"
          : tone === "light"
            ? "border-white/15 text-white/45 group-hover:border-white/40"
            : "border-fg/15 text-fg/45 group-hover:border-fg/40",
      )}
    >
      <svg viewBox="0 0 12 12" className="size-3" stroke="currentColor" strokeWidth="1.6" fill="none" strokeLinecap="round">
        <path d="M6 1.5v9M1.5 6h9" />
      </svg>
    </span>
  );
}

/**
 * Inline "show more" text button. The label is small, so the hit area is
 * padded out to the 40px a thumb needs; callers sit it a step closer
 * (`mt-3` rather than `mt-5`) so the visible gap is unchanged.
 */
export function TextToggle({
  open,
  onClick,
  children,
  tone = "dark",
  className,
  ...rest
}: {
  open: boolean;
  onClick: () => void;
  children: ReactNode;
  tone?: "dark" | "light";
  className?: string;
} & Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "onClick" | "children">) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-expanded={open}
      className={cn(
        "inline-flex items-center gap-1.5 py-2 text-[0.86rem] font-medium",
        tone === "light" ? "text-ember-lit" : "text-ember",
        className,
      )}
      {...rest}
    >
      {children}
      <Chevron open={open} />
    </button>
  );
}

/**
 * Height-animated collapse that never unmounts its children.
 *
 * A 0fr/1fr grid row animates to the content's own height with nothing
 * measured, and because the copy stays in the markup it remains crawlable and
 * findable-in-page while closed. `inert` keeps the links inside a closed panel
 * out of the tab order, so keyboard users are not sent through invisible text.
 */
export function Collapse({
  open,
  children,
  className,
  id,
}: {
  open: boolean;
  children: ReactNode;
  className?: string;
  id?: string;
}) {
  return (
    <div
      id={id}
      className={cn(
        "grid transition-[grid-template-rows] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]",
        open ? "grid-rows-[1fr]" : "grid-rows-[0fr]",
        className,
      )}
    >
      <div className="overflow-hidden">
        <div className={cn("transition-opacity duration-300", open ? "opacity-100" : "opacity-0")} inert={!open || undefined}>
          {children}
        </div>
      </div>
    </div>
  );
}
