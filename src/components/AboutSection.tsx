import { Briefcase, GraduationCap, MapPin, Music, Trophy } from "lucide-react";
import { HIGHLIGHTS } from "@/lib/data";
import Reveal from "./Reveal";
import SectionHeading from "./SectionHeading";

const ICONS = { Briefcase, MapPin, GraduationCap, Trophy, Music } as const;

export default function AboutSection() {
  return (
    <section id="about" className="mx-auto max-w-7xl scroll-mt-24 px-5 py-20 lg:px-8 lg:py-28">
      <SectionHeading eyebrow="01 — About" title="Engineer across the" accent="entire stack." />

      <div className="grid gap-10 lg:grid-cols-[1.4fr_1fr] lg:gap-16">
        <Reveal>
          <p className="font-display text-2xl leading-snug font-medium tracking-tight md:text-3xl">
            I’m a software engineer who refuses to stay in one lane — I ship{" "}
            <span className="text-gradient-accent">AI agents, mobile clients, slick frontends and the backends</span>{" "}
            that power them, end to end.
          </p>
          <div className="mt-8 space-y-5 text-muted">
            <p>
              Today at <strong className="font-semibold text-fg">Fig AI</strong> I architect multi-agent systems on{" "}
              <strong className="font-semibold text-fg">LangGraph + FastAPI + Claude</strong>, build SSE streaming
              pipelines, and wire it all into a <strong className="font-semibold text-fg">React Native</strong> client
              with real-time block protocols, multimodal attachments and Stripe payments.
            </p>
            <p>
              Before that I engineered banking-grade mobile experiences at{" "}
              <strong className="font-semibold text-fg">Kotak 811</strong> and{" "}
              <strong className="font-semibold text-fg">Groww</strong> — custom native bridges, high-performance lists,
              vision-camera scanners and UPI flows trusted by{" "}
              <strong className="font-semibold text-fg">millions of users</strong> under strict regulatory constraints.
            </p>
            <p>
              I care about the seam where <strong className="font-semibold text-fg">craft meets performance</strong>:
              60fps interactions, clean architecture, reusable SDKs, and AI that actually ships to production.
            </p>
            <p>
              Away from the keyboard, I’ve been a{" "}
              <strong className="font-semibold text-fg">drummer for over 12 years</strong> — the timing and feel carry
              straight back into how I build — and you’ll usually find me{" "}
              <strong className="font-semibold text-fg">out on a long drive</strong>, which is where most of my best
              ideas show up.
            </p>
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <aside className="card rounded-3xl p-7 lg:sticky lg:top-24">
            <h3 className="font-display text-lg font-semibold">At a glance</h3>
            <ul className="mt-6 space-y-5">
              {HIGHLIGHTS.map((h) => {
                const Icon = ICONS[h.icon as keyof typeof ICONS];
                return (
                  <li key={h.label} className="flex items-start gap-4">
                    <span className="grid size-9 flex-none place-items-center rounded-xl border border-border bg-surface-2 text-accent">
                      <Icon className="size-[18px]" />
                    </span>
                    <span className="text-sm text-muted">
                      <b className="block font-display font-semibold text-fg">{h.label}</b>
                      {h.text}
                    </span>
                  </li>
                );
              })}
            </ul>
          </aside>
        </Reveal>
      </div>
    </section>
  );
}
