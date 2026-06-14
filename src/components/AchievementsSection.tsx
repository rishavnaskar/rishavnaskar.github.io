import { Bus, HeartPulse } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { ACHIEVEMENTS, FEATURED } from "@/lib/data";
import Reveal from "./Reveal";
import SectionHeading from "./SectionHeading";
import TiltCard from "./TiltCard";

const ICONS: Record<string, LucideIcon> = { HeartPulse, Bus };

export default function AchievementsSection() {
  return (
    <section id="achievements" className="mx-auto max-w-7xl scroll-mt-24 px-5 py-20 lg:px-8 lg:py-28">
      <SectionHeading eyebrow="02 — Beyond the résumé" title="Wins, builds &" accent="impact." />

      {/* Featured spotlights — Project YUVA & PoolCar */}
      <div className="grid gap-5 lg:grid-cols-2">
        {FEATURED.map((f, i) => {
          const Icon = ICONS[f.icon] ?? HeartPulse;
          return (
            <Reveal key={f.title} delay={i * 0.1}>
              <TiltCard intensity={4} glow={false} className="h-full">
                <div className="relative h-full overflow-hidden rounded-3xl border border-border bg-gradient-to-br from-surface-2/80 to-transparent p-7 md:p-9">
                  {/* glow accent */}
                  <div className="pointer-events-none absolute -top-16 -right-12 size-52 rounded-full [background:radial-gradient(circle,color-mix(in_srgb,var(--color-violet)_26%,transparent),transparent_65%)]" />

                  <div className="relative">
                    <div className="flex items-center justify-between">
                      <span className="grid size-12 place-items-center rounded-2xl border border-border bg-surface-2 text-accent ring-glow">
                        <Icon className="size-6" />
                      </span>
                      <span className="font-mono text-[0.7rem] tracking-[0.25em] text-accent uppercase">{f.kicker}</span>
                    </div>

                    <div className="mt-7 flex items-end gap-3">
                      <span className="font-display text-5xl leading-none font-bold tracking-tight text-gradient-accent md:text-6xl">
                        {f.stat}
                      </span>
                      <span className="mb-1.5 max-w-[14ch] text-xs leading-snug text-muted">{f.statLabel}</span>
                    </div>

                    <h3 className="mt-5 font-display text-2xl font-semibold md:text-3xl">{f.title}</h3>
                    <p className="mt-3 max-w-prose leading-relaxed text-muted">{f.desc}</p>

                    <div className="mt-6 flex flex-wrap gap-2">
                      {f.tags.map((t) => (
                        <span
                          key={t}
                          className="rounded-full border border-border bg-surface/40 px-3 py-1 font-mono text-xs text-muted"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </TiltCard>
            </Reveal>
          );
        })}
      </div>

      {/* Supporting achievements */}
      <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {ACHIEVEMENTS.map((a, i) => (
          <Reveal key={a.title} delay={(i % 4) * 0.07}>
            <TiltCard className="h-full" intensity={5}>
              <div className="card h-full rounded-2xl p-6">
                <div className="font-display text-3xl font-bold tracking-tight text-gradient-accent">{a.big}</div>
                <h3 className="mt-2 font-display text-lg font-semibold">{a.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{a.desc}</p>
              </div>
            </TiltCard>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
