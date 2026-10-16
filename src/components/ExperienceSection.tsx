"use client";

import { useState } from "react";
import { MapPin } from "lucide-react";
import { EXPERIENCE, type Experience } from "@/lib/data";
import { cn } from "@/lib/utils";
import { Collapse, PlusIcon, Rise, SectionHead, Tag } from "./ui";

/**
 * One role: a single-line row that opens into its detail.
 *
 * Five roles laid out in full were the longest thing on the page — two screens
 * on a desktop, more than four on a phone — for copy most visitors skim for
 * the company names. As rows the timeline is one screen: period, company and
 * role are what you scan, and the paragraph arrives for the one you open.
 * Everything starts closed: the Fig AI summary alone is 230 words, which on a
 * phone is the whole screen the index was meant to save. Every summary is in
 * the markup regardless, so nothing is hidden from a crawler or find-in-page.
 */
function Role({ xp, open, onToggle, i }: { xp: Experience; open: boolean; onToggle: () => void; i: number }) {
  const panelId = `role-${i}`;

  return (
    <Rise as="article" delay={Math.min(i, 2)} className="border-b border-white/10">
      <h3 className="m-0 text-[1rem] font-normal tracking-normal">
        <button
          type="button"
          onClick={onToggle}
          aria-expanded={open}
          aria-controls={panelId}
          className="group grid w-full gap-x-6 gap-y-2 py-5 text-left md:grid-cols-[11.5rem_minmax(0,1fr)_auto] md:items-center md:py-6"
        >
          <span className="flex flex-wrap items-center gap-x-3 gap-y-1.5">
            <span className="eyebrow text-ember-lit">{xp.period}</span>
            <span
              className={cn(
                "eyebrow inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-[10px]",
                xp.current ? "border-ember/50 text-ember-lit" : "border-white/15 text-white/40",
              )}
            >
              {xp.current ? <span className="size-1.5 rounded-full bg-ember-lit" /> : null}
              {xp.badge}
            </span>
          </span>

          {/* `md:contents` dissolves this wrapper from `md` up, so the title
              and the plus become grid cells of their own; below it they share
              one flex row with the plus pinned right. */}
          <span className="flex min-w-0 items-center justify-between gap-4 md:contents">
            <span className="flex min-w-0 flex-wrap items-baseline gap-x-3 gap-y-0.5">
              <span
                className={cn(
                  "text-[1.3rem] font-medium tracking-[-0.03em] transition-colors sm:text-[1.45rem]",
                  open ? "text-on-ink" : "text-on-ink/85 group-hover:text-on-ink",
                )}
              >
                {xp.company}
              </span>
              <span className="text-[0.92rem] text-white/45">{xp.role}</span>
            </span>
            <PlusIcon open={open} tone="light" />
          </span>
        </button>
      </h3>

      <Collapse open={open} id={panelId}>
        <div className="pb-7 md:grid md:grid-cols-[11.5rem_minmax(0,1fr)] md:items-start md:gap-x-6">
          <p className="mb-3 flex items-center gap-1.5 text-[0.8rem] text-white/40 md:mb-0">
            <MapPin className="size-3.5 shrink-0" />
            {xp.location}
          </p>
          <div className="min-w-0 md:pr-12">
            <p className="max-w-[70ch] text-[0.94rem] leading-[1.7] text-white/55">{xp.summary}</p>
            <ul className="mt-5 flex flex-wrap gap-1.5">
              {xp.tags.map((t) => (
                <Tag key={t} tone="light">
                  {t}
                </Tag>
              ))}
            </ul>
          </div>
        </div>
      </Collapse>
    </Rise>
  );
}

export default function ExperienceSection() {
  // One role open at a time; -1 is all closed.
  const [open, setOpen] = useState(-1);

  return (
    <section
      id="experience"
      data-nav="dark"
      className="relative scroll-mt-24 overflow-hidden bg-ink py-14 text-on-ink sm:py-20 lg:py-24"
    >
      <div className="grid-paper-dark pointer-events-none absolute inset-0 opacity-60" />

      <div className="shell relative">
        <SectionHead
          eyebrow="04 — Experience"
          headline="Where I've shipped."
          lede="Six teams across fintech, real-time communications, agentic AI and healthcare workforce data — every one of them with something in production at the end of it."
          tone="light"
        />

        <div className="mt-10 border-t border-white/10 sm:mt-14">
          {EXPERIENCE.map((xp, i) => (
            <Role key={xp.company} xp={xp} i={i} open={open === i} onToggle={() => setOpen(open === i ? -1 : i)} />
          ))}
        </div>
      </div>
    </section>
  );
}
