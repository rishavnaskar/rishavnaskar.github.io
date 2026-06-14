import { Activity, Boxes, Code2, Database, MonitorSmartphone, Smartphone, Sparkles, Wand2 } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { SKILLS } from "@/lib/data";
import Reveal from "./Reveal";
import SectionHeading from "./SectionHeading";

const ICONS: Record<string, LucideIcon> = {
  Smartphone,
  MonitorSmartphone,
  Sparkles,
  Database,
  Code2,
  Boxes,
  Wand2,
  Activity,
};

export default function SkillsSection() {
  return (
    <section id="skills" className="mx-auto max-w-7xl scroll-mt-24 px-5 py-20 lg:px-8 lg:py-28">
      <SectionHeading eyebrow="04 — Toolkit" title="The stack I" accent="build with." />

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {SKILLS.map((g, i) => {
          const Icon = ICONS[g.icon] ?? Code2;
          return (
            <Reveal key={g.title} delay={(i % 4) * 0.06}>
              <div className="card h-full rounded-2xl p-6 transition-transform duration-300 hover:-translate-y-1 hover:border-accent/40">
                <div className="mb-5 flex items-center gap-3">
                  <span className="grid size-9 place-items-center rounded-xl border border-border bg-surface-2 text-accent">
                    <Icon className="size-5" />
                  </span>
                  <h3 className="font-display text-base font-semibold">{g.title}</h3>
                </div>
                <ul className="flex flex-wrap gap-2">
                  {g.items.map((it) => (
                    <li
                      key={it}
                      className="rounded-lg bg-surface-2 px-2.5 py-1 font-mono text-xs text-muted transition-colors hover:text-accent"
                    >
                      {it}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          );
        })}
      </div>
    </section>
  );
}
