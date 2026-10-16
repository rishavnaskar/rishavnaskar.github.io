"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { PROJECTS } from "@/lib/data";
import { cn } from "@/lib/utils";
import { Arrow, Collapse, PlusIcon, SectionHead, Tag } from "./ui";

/**
 * Three projects, told as an index plus one panel.
 *
 * Stacked as cards these run to 120 words each and cost three screens of
 * scrolling on a phone. As an index the section is one screen: the titles are
 * what you scan, and the detail arrives only for the one you pick. Desktop
 * gets the index in a rail beside the panel; below `lg` the same state drives
 * an accordion.
 */
export default function ProjectsSection() {
  const [active, setActive] = useState(0);
  // -1 on mobile: all collapsed. Opening a row by default just pushes the
  // other two off-screen, which is the problem this is here to solve.
  const [open, setOpen] = useState(-1);

  return (
    <section id="work" className="relative scroll-mt-24 py-14 sm:py-20 lg:py-24">
      <div className="shell">
        <SectionHead
          eyebrow="02 — Selected work"
          headline="Things I've built for impact."
          lede="Production AI platforms, a creative studio and a browser agent, a full business suite, and on-device models running where no network reaches. Public projects link to their source."
        />

        <div className="mt-10 grid gap-10 sm:mt-14 lg:grid-cols-[minmax(0,0.46fr)_minmax(0,1fr)] lg:gap-14">
          {/* ---- Index (desktop) --------------------------------------- */}
          <ol className="hidden lg:sticky lg:top-28 lg:block lg:self-start">
            {PROJECTS.map((p, i) => (
              <li key={p.title}>
                <button
                  type="button"
                  onClick={() => setActive(i)}
                  aria-current={active === i}
                  className={cn(
                    "group relative flex w-full items-baseline gap-4 border-b border-paper-line py-5 text-left transition-colors",
                    active === i ? "text-fg" : "text-ash hover:text-graphite",
                  )}
                >
                  <span className="eyebrow shrink-0 pt-1">{String(i + 1).padStart(2, "0")}</span>
                  <span className="min-w-0 flex-1">
                    <span className="block text-[1.15rem] tracking-[-0.028em]">{p.title}</span>
                    {p.meta ? <span className="eyebrow mt-1.5 block text-ash">{p.meta}</span> : null}
                  </span>
                  <span
                    className={cn(
                      "absolute bottom-[-1px] left-0 h-px bg-ember transition-all duration-500",
                      active === i ? "w-full" : "w-0",
                    )}
                  />
                </button>
              </li>
            ))}
          </ol>

          {/* ---- Panel (desktop) --------------------------------------- */}
          <div className="hidden lg:block">
            {/* `initial={false}`: without it the first panel renders into the
                exported HTML as opacity:0 and the section is blank until React
                hydrates. Switching projects still animates. */}
            <AnimatePresence mode="wait" initial={false}>
              <motion.article
                key={PROJECTS[active].title}
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                className="rounded-2xl border border-paper-line bg-paper-raised p-8"
              >
                <div className="flex items-start justify-between gap-5">
                  <span className="grid size-12 shrink-0 place-items-center rounded-2xl bg-ink text-[1.35rem]">
                    {PROJECTS[active].emoji}
                  </span>
                  {PROJECTS[active].award ? (
                    <span className="eyebrow rounded-full bg-ember/10 px-3 py-1 text-ember-deep">
                      {PROJECTS[active].award}
                    </span>
                  ) : null}
                </div>

                <h3 className="mt-6 text-[1.7rem] tracking-[-0.032em]">{PROJECTS[active].title}</h3>
                <p className="mt-4 max-w-[62ch] text-[0.97rem] leading-[1.68] text-graphite">
                  {PROJECTS[active].desc}
                </p>

                <ul className="mt-6 flex flex-wrap gap-1.5">
                  {PROJECTS[active].tags.map((t) => (
                    <Tag key={t}>{t}</Tag>
                  ))}
                </ul>

                {PROJECTS[active].href ? (
                  <a
                    href={PROJECTS[active].href}
                    target="_blank"
                    rel="noopener noreferrer"
                    data-track="project_click"
                    data-track-label={PROJECTS[active].title}
                    className="group mt-7 inline-flex items-center gap-2 rounded-full border border-paper-line px-5 py-2.5 text-[0.875rem] font-medium transition-colors duration-300 hover:border-ember hover:bg-ember hover:text-white"
                  >
                    View the source
                    <Arrow />
                  </a>
                ) : (
                  <p className="eyebrow mt-7 text-ash">Private codebase · walkthrough on request</p>
                )}
              </motion.article>
            </AnimatePresence>
          </div>

          {/* ---- Accordion (mobile) ------------------------------------ */}
          <div className="lg:hidden">
            {PROJECTS.map((p, i) => {
              const isOpen = open === i;
              return (
                <article key={p.title} className="border-b border-paper-line first:border-t">
                  <button
                    type="button"
                    onClick={() => setOpen(isOpen ? -1 : i)}
                    aria-expanded={isOpen}
                    className="group flex w-full items-center gap-4 py-5 text-left"
                  >
                    <span className="eyebrow shrink-0 text-ash">{String(i + 1).padStart(2, "0")}</span>
                    <span className="min-w-0 flex-1">
                      <span className="block text-[1.1rem] tracking-[-0.028em]">{p.title}</span>
                      {p.meta ? <span className="eyebrow mt-1.5 block text-ash">{p.meta}</span> : null}
                    </span>
                    <PlusIcon open={isOpen} />
                  </button>

                  <Collapse open={isOpen}>
                    <div className="pb-6">
                      <p className="text-[0.94rem] leading-[1.68] text-graphite">{p.desc}</p>
                      <ul className="mt-4 flex flex-wrap gap-1.5">
                        {p.tags.map((t) => (
                          <Tag key={t}>{t}</Tag>
                        ))}
                      </ul>
                      {p.href ? (
                        <a
                          href={p.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          data-track="project_click"
                          data-track-label={p.title}
                          className="group mt-5 inline-flex items-center gap-2 py-1 text-[0.875rem] font-medium text-ember"
                        >
                          View the source
                          <Arrow />
                        </a>
                      ) : null}
                    </div>
                  </Collapse>
                </article>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
