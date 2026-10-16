import { Activity, Boxes, Code2, Database, MonitorSmartphone, Smartphone, Sparkles, Wand2 } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { SKILLS } from "@/lib/data";
import { Rise, SectionHead } from "./ui";

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
    <section
      id="skills"
      className="relative scroll-mt-24 border-t border-paper-line bg-paper-warm/50 py-14 sm:py-20 lg:py-24"
    >
      <div className="shell">
        <SectionHead
          eyebrow="03 — Toolkit"
          headline="The stack I build with."
          lede="Eight years of accumulated tools, grouped by the job they do rather than by how impressive they sound."
        />

        {/* One hairline grid from `sm` up — the cell gaps are the parent
            background showing through a 1px gutter, so there are no borders to
            double up at the seams. Below `sm` the eight cells would stack to
            three screens, so there it becomes a horizontal snap rail with the
            next card left peeking. */}
        <div className="rail-m mt-10 sm:mt-14 sm:grid sm:gap-px sm:overflow-hidden sm:rounded-2xl sm:border sm:border-paper-line sm:bg-paper-line sm:grid-cols-2 lg:grid-cols-4">
          {SKILLS.map((g, i) => {
            const Icon = ICONS[g.icon] ?? Code2;
            return (
              <Rise
                key={g.title}
                delay={i % 4}
                className="group rounded-2xl border border-paper-line bg-paper-raised p-6 transition-colors duration-500 hover:bg-paper sm:rounded-none sm:border-0"
              >
                <div className="flex items-center gap-2.5">
                  <Icon className="size-[18px] shrink-0 text-ember" />
                  <h3 className="text-[1.02rem] tracking-[-0.02em]">{g.title}</h3>
                </div>
                <ul className="mt-4 flex flex-wrap gap-1.5">
                  {g.items.map((it) => (
                    <li
                      key={it}
                      className="rounded-full bg-fg/[0.05] px-2.5 py-1 font-mono text-[0.7rem] text-graphite"
                    >
                      {it}
                    </li>
                  ))}
                </ul>
              </Rise>
            );
          })}
        </div>
      </div>
    </section>
  );
}
