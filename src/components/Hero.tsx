"use client";

import { useEffect, useState, type CSSProperties } from "react";
import dynamic from "next/dynamic";
import { STATS } from "@/lib/data";
import { Button, ClipLines, Eyebrow } from "./ui";
import Counter from "./Counter";
import LatticeGrid from "./LatticeGrid";
import RoleRotator from "./RoleRotator";
import CalendlyButton from "./CalendlyButton";

// R3F is client-only and heavy — load it lazily so it never blocks first paint.
const HeroScene = dynamic(() => import("./HeroScene"), { ssr: false });

export default function Hero() {
  /**
   * The WebGL phone only mounts on a desktop-sized viewport. On a phone the
   * panel's lattice is the whole graphic: a second canvas — plus three.js — is
   * a large download to pay for something a 6" screen shows at thumbnail size,
   * and it would be competing with the hero copy for LCP.
   */
  const [wide, setWide] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1024px)");
    const update = () => setWide(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  return (
    <section id="top" className="relative scroll-mt-24 overflow-hidden pt-12 pb-0 sm:pt-16 lg:pt-20">
      <div className="dots pointer-events-none absolute inset-0 mask-fade-b opacity-60" />

      <div className="shell relative">
        <div className="grid items-end gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.84fr)] lg:gap-14">
          {/* ---- Copy --------------------------------------------------- */}
          <div>
            {/* Short enough to hold one line at 390px — a two-line eyebrow
                leaves its diamond floating against the middle of the block. */}
            <div className="rise-in">
              <Eyebrow>Fullstack Engineer · Bengaluru</Eyebrow>
            </div>

            <h1 className="display-xl mt-6 sm:mt-7">
              <ClipLines lines={["I ship AI agents", "and the apps", "they live in."]} delay={0.1} eager />
            </h1>

            {/* The rotating discipline sits under the headline as a caption
                rather than inside it — a word that changes height every two
                seconds inside a clamp-sized h1 reflows the whole hero. */}
            <p className="rise-in rise-in-delay-1 eyebrow mt-6 flex items-baseline gap-2 text-ash">
              Across
              <RoleRotator />
            </p>

            {/* This paragraph is the LCP element, so its entrance runs in CSS
                rather than Motion — see `.rise-in` in globals.css. Through
                Motion it would ship as opacity:0 and stay unpainted until
                hydration finished, which adds most of a second on mobile. */}
            <p className="lede rise-in rise-in-delay-2 mt-6 max-w-[56ch]">
              Fullstack engineer building <strong className="font-medium text-fg">production AI agents</strong>,
              high-performance <strong className="font-medium text-fg">React&nbsp;Native</strong> apps with custom
              native bridges, and the <strong className="font-medium text-fg">backends</strong> behind them. Currently
              Forward Deployed AI Engineer at <strong className="font-medium text-fg">SaxeCap</strong> — previously
              Fig&nbsp;AI, Kotak&nbsp;811 and Groww.
            </p>

            <div className="rise-in rise-in-delay-3 mt-8 flex flex-wrap items-center gap-3">
              <CalendlyButton>Set up a quick chat</CalendlyButton>
              <Button href="#work" variant="outline">
                Explore my work
              </Button>
            </div>
          </div>

          {/* ---- The panel ---------------------------------------------- */}
          <div className="rise-in rise-in-delay-2 relative">
            {/* 16:10 on a phone: the panel is a graphic there, not the frame for
                a 3D scene, and every 50px it gives up is copy that moves above
                the fold. */}
            <div className="relative aspect-[16/10] overflow-hidden rounded-[26px] bg-ink sm:aspect-[4/2.6] lg:aspect-[4/3.9]">
              <LatticeGrid className="absolute inset-0" cell={24} gap={4} />
              {wide ? <HeroScene /> : null}

              <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(120%_90%_at_78%_18%,rgba(240,82,28,.20),transparent_58%)]" />
              <div className="pointer-events-none absolute inset-x-0 bottom-0 h-2/5 bg-gradient-to-t from-ink via-ink/85 to-transparent" />

              <div className="pointer-events-none absolute inset-x-0 bottom-0 p-6 sm:p-7">
                <div className="eyebrow text-ember-lit">Stella · built at Fig AI</div>
                <p className="mt-2.5 max-w-[34ch] text-[0.92rem] leading-relaxed text-white/55">
                  One LangGraph plan-and-perform loop that builds, researches and
                  acts — streamed to mobile, web, desktop and chat.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* ---- Credibility band ----------------------------------------- */}
        <div className="mt-10 border-t border-paper-line pt-7 pb-12 sm:mt-16 sm:pb-20">
          {/* On a phone this paragraph restates the lede four lines above it
              and the stats under it carry the same facts, so below `sm` the
              numbers stand alone. */}
          <p className="hidden max-w-[64ch] text-[0.95rem] leading-relaxed text-graphite sm:block">
            <span className="font-medium text-fg">Four years shipping to production.</span> Banking-grade mobile at
            Kotak&nbsp;811 and Groww, agentic AI at Fig&nbsp;AI, and now forward-deployed AI on Databricks-scale
            workforce data at SaxeCap — with open source the whole way through.
          </p>

          <dl className="grid grid-cols-2 gap-x-6 gap-y-7 sm:mt-8 sm:grid-cols-4">
            {STATS.map((s, i) => (
              <div
                key={s.label}
                className="rise-in"
                style={{ animationDelay: `${0.38 + i * 0.07}s` } as CSSProperties}
              >
                <dt className="text-[1.85rem] font-medium tracking-[-0.045em] text-fg sm:text-[2.1rem]">
                  <Counter value={s.value} decimals={s.decimals} />
                  {s.suffix ? <span className="text-ember">{s.suffix}</span> : null}
                </dt>
                <dd className="mt-1.5 max-w-[26ch] text-[0.78rem] leading-snug text-ash">{s.label}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}
