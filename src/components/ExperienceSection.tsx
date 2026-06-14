import { MapPin } from "lucide-react";
import { EXPERIENCE } from "@/lib/data";
import { cn } from "@/lib/utils";
import Reveal from "./Reveal";
import SectionHeading from "./SectionHeading";

export default function ExperienceSection() {
  return (
    <section id="experience" className="mx-auto max-w-7xl scroll-mt-24 px-5 py-20 lg:px-8 lg:py-28">
      <SectionHeading eyebrow="05 — Experience" title="Where I’ve" accent="shipped." />

      <div className="flex flex-col">
        {EXPERIENCE.map((xp) => (
          <Reveal key={xp.company}>
            <article className="group grid gap-4 border-t border-border py-8 last:border-b md:grid-cols-[minmax(150px,0.42fr)_1fr] md:gap-12 md:py-10">
              <div className="flex flex-col gap-1.5">
                <span className="font-mono text-sm text-accent">{xp.period}</span>
                <span className="flex items-center gap-1.5 text-sm text-faint">
                  <MapPin className="size-3.5" /> {xp.location}
                </span>
                <span
                  className={cn(
                    "mt-1 inline-flex w-fit items-center gap-1.5 rounded-md border px-2 py-0.5 font-mono text-[0.65rem] tracking-wide uppercase",
                    xp.current ? "border-lime/40 text-lime" : "border-border text-muted",
                  )}
                >
                  {xp.current && <span className="size-1.5 rounded-full bg-lime" />}
                  {xp.badge}
                </span>
              </div>

              <div>
                <h3 className="flex flex-wrap items-baseline gap-x-3 gap-y-1 font-display text-2xl font-semibold md:text-3xl">
                  {xp.company}
                  <span className="font-display text-base font-medium text-muted">{xp.role}</span>
                </h3>
                <p className="mt-3 max-w-3xl leading-relaxed text-muted">{xp.summary}</p>
                <div className="mt-5 flex flex-wrap gap-2">
                  {xp.tags.map((t) => (
                    <span
                      key={t}
                      className="rounded-full border border-border px-3 py-1 font-mono text-xs text-muted transition-colors hover:border-accent hover:text-accent"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </article>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
