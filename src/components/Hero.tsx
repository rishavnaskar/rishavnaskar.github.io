"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import dynamic from "next/dynamic";
import { SITE } from "@/lib/site";
import RoleRotator from "./RoleRotator";
import CalendlyButton from "./CalendlyButton";

// R3F is client-only and heavy — load it lazily so it never blocks first paint.
const HeroScene = dynamic(() => import("./HeroScene"), { ssr: false });

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.09, delayChildren: 0.1 } },
};
const item = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] as const } },
};

export default function Hero() {
  return (
    <section
      id="top"
      className="relative flex min-h-[100svh] flex-col justify-center overflow-hidden px-5 pt-28 pb-16 lg:px-8"
    >
      <HeroScene />
      <div className="grid-bg pointer-events-none absolute inset-0 -z-10" />
      {/* readability scrim — stronger on the left so copy stays crisp over the 3D scene */}
      <div className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-r from-bg via-bg/70 to-transparent" />
      <div className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-b from-bg/30 via-transparent to-bg" />

      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="mx-auto w-full max-w-7xl lg:pr-[42%]"
      >
        <motion.span
          variants={item}
          className="inline-flex items-center gap-2.5 rounded-full border border-border bg-surface/50 px-4 py-2 font-mono text-xs text-muted backdrop-blur-sm"
        >
          <span className="relative flex size-2">
            <span className="absolute inline-flex size-full animate-pulse-ring rounded-full bg-lime" />
            <span className="relative inline-flex size-2 rounded-full bg-lime" />
          </span>
          {SITE.resumeNote} · {SITE.location}
        </motion.span>

        <motion.h1
          variants={item}
          className="mt-7 font-display text-[clamp(3.2rem,12vw,9rem)] leading-[0.92] font-bold tracking-[-0.04em]"
        >
          <span className="block text-fg">Rishav</span>
          <span className="block text-gradient">Naskar</span>
        </motion.h1>

        <motion.p
          variants={item}
          className="mt-6 flex flex-wrap items-baseline gap-x-3 gap-y-1 font-display text-2xl font-medium text-muted md:text-4xl"
        >
          I build across <RoleRotator />
        </motion.p>

        <motion.p variants={item} className="mt-7 max-w-2xl text-lg leading-relaxed text-muted md:text-xl">
          Fullstack software engineer shipping <b className="font-semibold text-fg">production AI agents</b>,
          high-performance <b className="font-semibold text-fg">React&nbsp;Native</b> apps with custom native bridges,
          and <b className="font-semibold text-fg">scalable backends</b>. Currently an{" "}
          <b className="font-semibold text-fg">AI Engineer at Fig&nbsp;AI</b> — previously Kotak&nbsp;811, Groww &amp;
          Agora.
        </motion.p>

        <motion.div variants={item} className="mt-9 flex flex-wrap gap-3">
          <CalendlyButton className="px-7 py-3.5 text-base">Set up a quick chat</CalendlyButton>
          <a
            href="#work"
            className="group inline-flex items-center justify-center gap-2 rounded-full border border-border bg-surface/50 px-7 py-3.5 font-display text-base font-medium text-fg transition-all hover:-translate-y-0.5 hover:border-accent hover:text-accent"
          >
            Explore my work
            <ArrowUpRight className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </a>
        </motion.div>

        <motion.div
          variants={item}
          className="mt-12 flex flex-wrap gap-x-10 gap-y-4 font-mono text-xs text-faint"
        >
          {[
            { k: "Fig AI", v: "Current — AI Engineer" },
            { k: "4+ yrs", v: "Shipping at scale" },
            { k: "10M+", v: "Users reached" },
            { k: "5.8k★", v: "Open-source impact" },
          ].map((m) => (
            <div key={m.k}>
              <span className="block font-display text-base text-fg">{m.k}</span>
              {m.v}
            </div>
          ))}
        </motion.div>
      </motion.div>

      <a
        href="#about"
        aria-label="Scroll to content"
        className="absolute bottom-6 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 font-mono text-[0.65rem] tracking-[0.2em] text-faint uppercase md:flex"
      >
        <span className="relative h-9 w-5 rounded-full border border-faint">
          <span className="absolute top-1.5 left-1/2 h-1.5 w-0.5 -translate-x-1/2 animate-scrollwheel rounded-full bg-accent" />
        </span>
        Scroll
      </a>
    </section>
  );
}
