import { cn } from "@/lib/utils";

/**
 * The mark: a four-square lattice with one cell struck out of alignment and
 * lit — the same idea as the hero graphic, at 22px. Order, plus the piece
 * currently being worked on.
 */
export function Mark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={cn("size-6", className)} fill="none" aria-hidden>
      <rect x="1.5" y="1.5" width="8.5" height="8.5" rx="1.6" fill="currentColor" opacity="0.9" />
      <rect x="14" y="1.5" width="8.5" height="8.5" rx="1.6" fill="currentColor" opacity="0.38" />
      <rect x="1.5" y="14" width="8.5" height="8.5" rx="1.6" fill="currentColor" opacity="0.38" />
      <rect
        x="13.2"
        y="13.2"
        width="9.3"
        height="9.3"
        rx="1.8"
        fill="var(--color-ember)"
        transform="rotate(9 17.85 17.85)"
      />
    </svg>
  );
}

export function Logo({ className, tone = "dark" }: { className?: string; tone?: "dark" | "light" }) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-2.5",
        tone === "light" ? "text-on-ink" : "text-fg",
        className,
      )}
    >
      <Mark className="size-[22px] shrink-0" />
      {/* The space is a real character rather than margin alone: the two words
          are otherwise concatenated in the accessible name. */}
      <span className="text-[0.98rem] font-semibold tracking-[-0.02em]">
        Rishav <span className="font-normal opacity-60">Naskar</span>
      </span>
    </span>
  );
}
