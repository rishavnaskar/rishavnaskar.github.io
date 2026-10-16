"use client";

import { useState } from "react";
import { Briefcase, GraduationCap, MapPin, Music, Trophy } from "lucide-react";
import { HIGHLIGHTS } from "@/lib/data";
import { ClipLines, Collapse, Eyebrow, Rise, TextToggle } from "./ui";

const ICONS = { Briefcase, MapPin, GraduationCap, Trophy, Music } as const;

/** The three things the whole CV reduces to. */
const PILLARS = [
  {
    title: "AI that actually ships",
    body: "A LangGraph plan-and-perform loop in production at Fig AI; LLM insight summaries and next-best actions grounded in a client's own Databricks data at SaxeCap. Deployed, not demoed.",
  },
  {
    title: "Mobile at banking scale",
    body: "Custom native bridges for Android and iOS, high-performance lists, vision-camera scanners and UPI flows, all under regulatory constraints and in front of millions of users.",
  },
  {
    title: "The whole stack, end to end",
    body: "The backend that serves it, the gateway that streams it and the interface people actually touch — built by one person who does not hand off at the seams.",
  },
];

export default function AboutSection() {
  const [more, setMore] = useState(false);

  return (
    <section
      id="about"
      data-nav="dark"
      className="relative scroll-mt-24 overflow-hidden bg-ink py-14 text-on-ink sm:py-20 lg:py-24"
    >
      <div className="grid-paper-dark pointer-events-none absolute inset-0" />
      <div className="pointer-events-none absolute -left-40 top-1/3 size-[520px] rounded-full bg-[radial-gradient(circle,rgba(240,82,28,.16),transparent_65%)] blur-2xl" />

      <div className="shell relative">
        {/* ---- The claim ------------------------------------------------ */}
        <div className="grid gap-8 lg:grid-cols-2 lg:gap-20">
          <div>
            <Rise>
              <Eyebrow tone="light">01 — About</Eyebrow>
            </Rise>
            <h2 className="display-lg mt-6 max-w-[16ch]">
              <ClipLines lines={["I refuse to stay", "in one lane."]} />
            </h2>
          </div>

          <div className="lg:pt-14">
            <Rise delay={1}>
              <p className="text-[1.1rem] leading-[1.6] text-white/60">
                I ship AI agents, mobile clients, the frontends people touch and the backends that power
                them — end to end, without handing off at the seams.
              </p>
            </Rise>

            <Rise delay={2}>
              <div className="mt-6 space-y-4 border-l-2 border-ember pl-5 text-[0.98rem] leading-relaxed text-white/75">
                <p>
                  Today at <strong className="font-medium text-on-ink">SaxeCap</strong> I&apos;m forward-deployed on{" "}
                  <strong className="font-medium text-on-ink">Dally</strong> for Gentiva Health Services, one of the
                  largest US hospice and home-health providers — embedded with their HR organisation, taking workforce
                  problems from first conversation to shipped software. That means modelling{" "}
                  <span className="text-ember-lit">hiring, onboarding, staffing and attrition data on Databricks</span>{" "}
                  into query-ready tables, then shipping the dashboards and LLM-driven automations that read from them.
                </p>

                <Collapse open={more}>
                  <div className="space-y-4">
                    <p>
                      Before that, at <strong className="font-medium text-on-ink">Fig AI</strong>, I architected{" "}
                      <strong className="font-medium text-on-ink">Stella</strong> — one LangGraph + FastAPI + Claude
                      plan-and-perform loop that builds websites, generates media, researches the web and acts on your
                      connected apps, fanning out to recursive subagents — plus the gateway that streams it to mobile,
                      web, desktop and chat over a resumable SSE block protocol.
                    </p>
                    <p>
                      Earlier I engineered banking-grade mobile experiences at{" "}
                      <strong className="font-medium text-on-ink">Kotak 811</strong> and{" "}
                      <strong className="font-medium text-on-ink">Groww</strong> — custom native bridges,
                      high-performance lists, vision-camera scanners and UPI flows trusted by millions of users
                      under strict regulatory constraints.
                    </p>
                    <p>
                      I care about the seam where craft meets performance: 60fps interactions, clean architecture,
                      reusable SDKs, and AI that actually reaches production.
                    </p>
                    <p>
                      Away from the keyboard I&apos;ve been a drummer for over 12 years — the timing and feel carry
                      straight back into how I build — and you&apos;ll usually find me out on a long drive, which is
                      where most of my best ideas show up.
                    </p>
                  </div>
                </Collapse>
              </div>
            </Rise>

            <Rise delay={3}>
              <TextToggle open={more} onClick={() => setMore((v) => !v)} tone="light" className="mt-3">
                {more ? "Show less" : "More about how I work"}
              </TextToggle>
            </Rise>
          </div>
        </div>

        {/* ---- Pillars --------------------------------------------------- */}
        <div className="rail-m mt-12 sm:mt-14 sm:grid sm:gap-8 lg:grid-cols-3 lg:gap-12">
          {PILLARS.map((p, i) => (
            <Rise key={p.title} delay={i} className="relative border-t border-white/15 pt-5">
              <span className="absolute -top-px left-0 h-px w-14 bg-ember" />
              <h3 className="max-w-[22ch] text-[1.15rem] tracking-[-0.025em] text-on-ink sm:text-[1.25rem]">
                {p.title}
              </h3>
              <p className="mt-3 max-w-[42ch] text-[0.92rem] leading-relaxed text-white/45">{p.body}</p>
            </Rise>
          ))}
        </div>

        {/* ---- At a glance ------------------------------------------------
            A single hairline row rather than the sidebar card it used to be:
            five facts, one line each, and no second column competing with the
            narrative for attention. */}
        {/* Five cells in two columns leaves a hole at the bottom right from `sm`
            to `lg`, so the last one spans the row there. */}
        <dl className="rail-m mt-10 sm:mt-14 sm:grid sm:gap-px sm:overflow-hidden sm:rounded-2xl sm:border sm:border-white/10 sm:bg-white/10 sm:grid-cols-2 sm:[&>:last-child]:col-span-2 lg:grid-cols-5 lg:[&>:last-child]:col-span-1">
          {HIGHLIGHTS.map((h) => {
            const Icon = ICONS[h.icon as keyof typeof ICONS];
            return (
              <div
                key={h.label}
                className="rounded-2xl border border-white/10 bg-ink p-5 transition-colors duration-500 hover:bg-ink-soft sm:rounded-none sm:border-0"
              >
                <dt className="flex items-center gap-2 text-[0.82rem] font-medium text-on-ink">
                  <Icon className="size-4 shrink-0 text-ember" />
                  {h.label}
                </dt>
                <dd className="mt-2 text-[0.8rem] leading-snug text-white/45">{h.text}</dd>
              </div>
            );
          })}
        </dl>
      </div>
    </section>
  );
}
