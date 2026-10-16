import { Bus, HeartPulse } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { ACHIEVEMENTS, FEATURED } from "@/lib/data";
import { Rise, SectionHead, Tag } from "./ui";

const ICONS: Record<string, LucideIcon> = { HeartPulse, Bus };

export default function AchievementsSection() {
  return (
    <section id="achievements" className="relative scroll-mt-24 border-t border-paper-line py-14 sm:py-20 lg:py-24">
      <div className="shell">
        <SectionHead
          eyebrow="07 — Beyond the résumé"
          headline="Wins, builds and impact."
          lede="The things that are not job titles: a health-tech build for adolescents, a mobility startup, open source, and a couple of hackathons."
        />

        {/* ---- Featured spotlights ------------------------------------- */}
        {/* Two tall cards stacked cost a full screen each on a phone; as a rail
            they cost one between them. */}
        <div className="rail-m mt-10 sm:mt-14 sm:grid sm:gap-4 lg:grid-cols-2">
          {FEATURED.map((f, i) => {
            const Icon = ICONS[f.icon] ?? HeartPulse;
            return (
              <Rise
                as="article"
                key={f.title}
                delay={i}
                className="relative flex h-full flex-col overflow-hidden rounded-2xl border border-paper-line bg-paper-raised p-6 sm:p-8"
              >
                <div className="pointer-events-none absolute -right-16 -top-20 size-52 rounded-full bg-[radial-gradient(circle,rgba(240,82,28,.12),transparent_65%)]" />

                <div className="relative flex items-center justify-between gap-4">
                  <span className="grid size-11 place-items-center rounded-2xl bg-fg text-paper">
                    <Icon className="size-5" />
                  </span>
                  <span className="eyebrow text-ember-deep">{f.kicker}</span>
                </div>

                {/* `flex-wrap` + `whitespace-nowrap`: in the 80%-wide phone
                    rail card "5 / 3,500" broke mid-figure beside its label.
                    Now the figure holds together and the label drops below it
                    when the two will not share a line. */}
                <div className="relative mt-6 flex flex-wrap items-end gap-x-3 gap-y-1 sm:mt-7">
                  <span className="whitespace-nowrap text-[2.4rem] font-medium leading-none tracking-[-0.05em] sm:text-[3rem]">
                    {f.stat}
                  </span>
                  <span className="mb-1 max-w-[18ch] text-[0.76rem] leading-snug text-ash">{f.statLabel}</span>
                </div>

                <h3 className="relative mt-5 text-[1.4rem] tracking-[-0.03em]">{f.title}</h3>
                <p className="relative mt-3 max-w-[52ch] text-[0.94rem] leading-relaxed text-graphite">{f.desc}</p>

                {/* The tags are colour, not information the copy lacks — on a
                    phone they are two more rows per card, so they wait for `sm`. */}
                <ul className="relative mt-auto hidden flex-wrap gap-1.5 pt-6 sm:flex">
                  {f.tags.map((t) => (
                    <Tag key={t}>{t}</Tag>
                  ))}
                </ul>
              </Rise>
            );
          })}
        </div>

        {/* ---- Supporting wins -----------------------------------------
            From `sm` up, a ledger rather than a second row of cards: the figure
            in a fixed left column, the title and one paragraph beside it — half
            the height of the card grid it replaces, with every word still here.
            Below `sm` four stacked rows would be a screen and a half, so there
            it is the same snap rail as everything else. */}
        <ul className="rail-m mt-4 sm:grid sm:grid-cols-2 sm:gap-px sm:overflow-hidden sm:rounded-2xl sm:border sm:border-paper-line sm:bg-paper-line">
          {ACHIEVEMENTS.map((a, i) => (
            <Rise
              as="li"
              key={a.title}
              delay={i % 2}
              className="group relative flex flex-col gap-3 rounded-2xl border border-paper-line bg-paper-raised p-5 transition-colors duration-500 hover:bg-paper sm:flex-row sm:gap-5 sm:rounded-none sm:border-0 sm:p-6"
            >
              <span className="shrink-0 text-[1.6rem] font-medium leading-none tracking-[-0.05em] text-ember sm:w-[4.6rem] sm:pt-0.5 sm:text-[1.75rem]">
                {a.big}
              </span>
              <div className="min-w-0">
                <h3 className="text-[1.02rem] tracking-[-0.02em]">{a.title}</h3>
                <p className="mt-1.5 text-[0.86rem] leading-relaxed text-graphite">{a.desc}</p>
              </div>
              <span className="absolute inset-x-0 bottom-0 h-px scale-x-0 bg-gradient-to-r from-ember to-transparent transition-transform duration-500 group-hover:scale-x-100" />
            </Rise>
          ))}
        </ul>
      </div>
    </section>
  );
}
