import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

/**
 * The chrome around a 3D stage, with no WebGL dependency — so the lazy
 * placeholder and the real canvas can share one frame, and the placeholder can
 * ship in the initial bundle while three.js waits for the section to scroll
 * near.
 */
export function StageFrame({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <div
      className={cn(
        "relative aspect-[16/11] w-full touch-pan-y sm:aspect-[4/3] overflow-hidden rounded-3xl border border-paper-line bg-gradient-to-b from-paper-raised/60 to-paper-warm/40",
        className,
      )}
    >
      {children}
    </div>
  );
}

/** Small status badge used by the loading / failed / drag-hint overlays. */
export function Pill({ children, tone = "muted" }: { children: ReactNode; tone?: "muted" | "faint" }) {
  return (
    <div
      className={cn(
        "flex items-center gap-2 rounded-full border border-paper-line bg-paper-raised/70 px-3 py-1.5 font-mono text-[0.6rem] tracking-wide uppercase backdrop-blur",
        tone === "faint" ? "text-ash" : "text-graphite",
      )}
    >
      {children}
    </div>
  );
}

/** Shimmer shown until the model is parsed and on screen. */
export function LoadingOverlay() {
  return (
    <div className="absolute inset-0 z-10 overflow-hidden rounded-3xl">
      <div className="absolute inset-0 bg-paper-warm/50" />
      <div className="absolute inset-0 animate-shimmer bg-[length:200%_100%] bg-[linear-gradient(110deg,transparent_38%,color-mix(in_srgb,var(--color-ember)_16%,transparent)_50%,transparent_62%)]" />
      <div className="absolute bottom-3 left-1/2 -translate-x-1/2">
        <Pill>
          <span className="size-1.5 animate-pulse rounded-full bg-ember" />
          Loading 3D
        </Pill>
      </div>
    </div>
  );
}
