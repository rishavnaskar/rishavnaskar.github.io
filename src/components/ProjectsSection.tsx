import { ArrowUpRight, Lock, Star } from "lucide-react";
import { PROJECTS } from "@/lib/data";
import { cn } from "@/lib/utils";
import Reveal from "./Reveal";
import SectionHeading from "./SectionHeading";
import TiltCard from "./TiltCard";

export default function ProjectsSection() {
  return (
    <section id="work" className="mx-auto max-w-7xl scroll-mt-24 px-5 py-20 lg:px-8 lg:py-28">
      <SectionHeading
        eyebrow="03 — Selected Work"
        title="Things I’ve built for"
        accent="impact."
        sub="From production AI systems and full business suites to hackathon winners. Public projects link to their source on GitHub."
      />

      <div className="grid gap-5 md:grid-cols-2">
        {PROJECTS.map((p, i) => {
          const linked = Boolean(p.href);
          const Wrapper = (linked ? "a" : "div") as "a" | "div";
          const wrapperProps = linked
            ? { href: p.href, target: "_blank", rel: "noopener noreferrer" }
            : {};
          return (
            <Reveal key={p.title} delay={(i % 2) * 0.08}>
              <TiltCard className="h-full">
                <Wrapper
                  {...wrapperProps}
                  className={cn(
                    "card relative flex h-full min-h-[260px] flex-col rounded-3xl p-7 transition-colors",
                    linked ? "hover:border-accent/50" : "cursor-default",
                  )}
                >
                  {p.award ? (
                    <span className="absolute top-5 right-5 inline-flex items-center gap-1.5 font-mono text-[0.65rem] tracking-wide text-lime uppercase">
                      <Star className="size-3.5 fill-lime" /> {p.award}
                    </span>
                  ) : p.meta ? (
                    <span className="absolute top-5 right-5 inline-flex items-center gap-1.5 rounded-full border border-border bg-surface-2/60 px-2.5 py-1 font-mono text-[0.6rem] tracking-wide text-accent uppercase">
                      <Lock className="size-3" /> {p.meta}
                    </span>
                  ) : null}

                  <div className="flex items-start justify-between">
                    <span className="grid size-13 place-items-center rounded-2xl border border-border bg-surface-2 text-2xl">
                      {p.emoji}
                    </span>
                    <span className="font-mono text-sm text-faint">/ 0{i + 1}</span>
                  </div>

                  <h3 className="mt-6 flex items-center gap-2 font-display text-2xl font-semibold">
                    {p.title}
                    {linked && (
                      <ArrowUpRight className="size-5 text-accent opacity-0 transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:opacity-100" />
                    )}
                  </h3>
                  <p className="mt-2 flex-1 text-sm leading-relaxed text-muted">{p.desc}</p>
                  <div className="mt-5 flex flex-wrap gap-2">
                    {p.tags.map((t) => (
                      <span key={t} className="rounded-full border border-border px-2.5 py-1 font-mono text-xs text-muted">
                        {t}
                      </span>
                    ))}
                  </div>
                </Wrapper>
              </TiltCard>
            </Reveal>
          );
        })}
      </div>
    </section>
  );
}
