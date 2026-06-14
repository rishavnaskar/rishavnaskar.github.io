import { ArrowRight, CalendarCheck, Clock, Github, Globe, Linkedin, Mail } from "lucide-react";
import { SITE } from "@/lib/site";
import CalendlyButton from "./CalendlyButton";
import Reveal from "./Reveal";

export default function ContactSection() {
  return (
    <section id="contact" className="mx-auto max-w-7xl scroll-mt-24 px-5 py-20 lg:px-8 lg:py-28">
      <Reveal>
        <div className="relative overflow-hidden rounded-[2rem] border border-border bg-gradient-to-br from-surface-2/80 to-transparent p-8 md:p-14">
          <div className="pointer-events-none absolute -top-1/3 right-[-10%] aspect-square w-2/3 rounded-full [background:radial-gradient(circle,color-mix(in_srgb,var(--color-violet)_28%,transparent),transparent_65%)]" />

          <div className="relative grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
            <div>
              <p className="font-mono text-xs tracking-[0.3em] text-accent uppercase">07 — Let’s talk</p>
              <h2 className="mt-4 max-w-md font-display text-4xl leading-[1.05] font-semibold tracking-tight md:text-5xl">
                Have an idea? <span className="text-gradient-accent">Let’s build it.</span>
              </h2>
              <p className="mt-5 max-w-md text-lg text-muted">
                Whether it’s an AI product, a mobile app or a tricky fullstack problem — I’d love to hear about it. Grab
                a slot and let’s chat.
              </p>

              <div className="mt-8 flex flex-wrap gap-3">
                <a href={SITE.socials.email} className="contact-chip">
                  <Mail className="size-4" /> {SITE.email}
                </a>
                <a href={SITE.socials.linkedin} target="_blank" rel="noopener noreferrer" className="contact-chip">
                  <Linkedin className="size-4" /> LinkedIn
                </a>
                <a href={SITE.socials.github} target="_blank" rel="noopener noreferrer" className="contact-chip">
                  <Github className="size-4" /> GitHub
                </a>
              </div>
            </div>

            <div className="rounded-3xl border border-border bg-bg-soft p-7 shadow-2xl shadow-black/20">
              <h3 className="flex items-center gap-2.5 font-display text-xl font-semibold">
                <CalendarCheck className="size-5 text-accent" /> Quick discussion
              </h3>
              <p className="mt-2 text-sm text-muted">
                15 minutes, zero pressure. Pick a time that works and we’ll talk.
              </p>
              <ul className="mt-5 divide-y divide-border text-sm text-muted">
                <li className="flex items-center gap-3 py-3">
                  <Clock className="size-4 text-accent" /> 15-minute video call
                </li>
                <li className="flex items-center gap-3 py-3">
                  <ArrowRight className="size-4 text-accent" /> Confirmed instantly via Calendly
                </li>
                <li className="flex items-center gap-3 py-3">
                  <Globe className="size-4 text-accent" /> Across any timezone
                </li>
              </ul>
              <CalendlyButton className="mt-6 w-full px-7 py-3.5 text-base" />
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
