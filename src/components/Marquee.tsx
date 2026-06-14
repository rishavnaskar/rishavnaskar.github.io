import { MARQUEE } from "@/lib/data";

/** Infinite scrolling tech ticker between the hero and the content. */
export default function Marquee() {
  const row = [...MARQUEE, ...MARQUEE];
  return (
    <div aria-hidden className="relative overflow-hidden border-y border-border bg-bg-soft/50 py-5">
      <div className="flex w-max animate-marquee gap-12 whitespace-nowrap will-change-transform">
        {row.map((s, i) => (
          <span
            key={`${s}-${i}`}
            className="flex items-center gap-12 font-display text-lg font-semibold text-muted md:text-2xl"
          >
            {s}
            <span className="text-accent">✦</span>
          </span>
        ))}
      </div>
      <div className="pointer-events-none absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-bg to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-bg to-transparent" />
    </div>
  );
}
