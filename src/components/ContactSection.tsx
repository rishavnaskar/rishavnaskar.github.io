"use client";

import { ArrowRight, Clock, Github, Globe, Linkedin, Mail } from "lucide-react";
import { SITE } from "@/lib/site";
import { Button, ClipLines, Eyebrow, Rise } from "./ui";
import CalendlyButton from "./CalendlyButton";
import LatticeGrid from "./LatticeGrid";

const DETAILS = [
  { Icon: Clock, text: "15-minute video call" },
  { Icon: ArrowRight, text: "Confirmed instantly via Calendly" },
  { Icon: Globe, text: "Across any timezone" },
];

const ELSEWHERE = [
  { href: SITE.socials.email, label: SITE.email, Icon: Mail, external: false },
  { href: SITE.socials.linkedin, label: "LinkedIn", Icon: Linkedin, external: true },
  { href: SITE.socials.github, label: "GitHub", Icon: Github, external: true },
];

export default function ContactSection() {
  return (
    <section id="contact" data-nav="dark" className="scroll-mt-24 px-3 pb-3 sm:px-4 sm:pb-4">
      <div className="relative overflow-hidden rounded-[28px] bg-ink py-16 text-on-ink sm:py-24 lg:py-28">
        <LatticeGrid className="absolute inset-0 opacity-60" cell={20} gap={4} />
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(100%_80%_at_50%_120%,rgba(240,82,28,.3),transparent_58%)]" />
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(58%_46%_at_50%_50%,rgba(11,11,12,.92),rgba(11,11,12,.55)_70%,transparent)]" />

        <div className="shell relative text-center">
          <Rise>
            <Eyebrow tone="light" className="justify-center">
              08 — Let&apos;s talk
            </Eyebrow>
          </Rise>

          <h2 className="display-lg mx-auto mt-6 max-w-[15ch]">
            <ClipLines lines={["Have an idea?", "Let's build it."]} className="block" />
          </h2>

          <Rise delay={2}>
            <p className="mx-auto mt-7 max-w-[56ch] text-[1rem] leading-relaxed text-white/55">
              An AI product, a mobile app, or a fullstack problem nobody on the team wants to own — I&apos;d like to
              hear about it. Grab a slot and let&apos;s talk.
            </p>
          </Rise>

          <Rise delay={3}>
            <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
              <CalendlyButton variant="light">Book a quick call</CalendlyButton>
              <Button href={SITE.socials.email} variant="ghost">
                Email me instead
              </Button>
            </div>
          </Rise>

          <Rise delay={4}>
            <ul className="mx-auto mt-9 flex max-w-2xl flex-wrap items-center justify-center gap-x-7 gap-y-2.5 text-[0.82rem] text-white/45">
              {DETAILS.map(({ Icon, text }) => (
                <li key={text} className="flex items-center gap-2">
                  <Icon className="size-3.5 shrink-0 text-ember-lit" />
                  {text}
                </li>
              ))}
            </ul>
          </Rise>

          <Rise delay={5}>
            <div className="mt-10 flex flex-wrap items-center justify-center gap-2.5 border-t border-white/10 pt-8">
              {ELSEWHERE.map(({ href, label, Icon, external }) => (
                <a
                  key={label}
                  href={href}
                  {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                  className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.04] px-4 py-2 text-[0.84rem] text-white/70 transition-colors duration-300 hover:border-ember hover:bg-ember hover:text-white"
                >
                  <Icon className="size-4" />
                  {label}
                </a>
              ))}
            </div>
          </Rise>

          <Rise delay={6}>
            <p className="eyebrow mt-8 text-white/30">
              {SITE.location} · {SITE.resumeNote}
            </p>
          </Rise>
        </div>
      </div>
    </section>
  );
}
