"use client";

import { motion } from "framer-motion";
import { ArrowUp, Check, Loader2 } from "lucide-react";
import StatusBar from "./StatusBar";

const STEPS = [
  { label: "Search the web", done: true },
  { label: "Run Python · analyze", active: true },
  { label: "Draft & send email", done: false },
];

export default function StellaScreen() {
  return (
    <div className="relative flex h-full flex-col bg-[#0a0912] text-white">
      {/* ambient glow */}
      <div className="pointer-events-none absolute -top-10 right-0 size-40 rounded-full bg-violet/30 blur-3xl" />
      <StatusBar dark />

      {/* header */}
      <div className="relative flex items-center gap-2.5 px-4 pt-1 pb-3">
        <span className="relative grid size-8 place-items-center rounded-full bg-gradient-to-br from-violet to-cyan">
          <span className="absolute inset-0 animate-pulse-ring rounded-full bg-violet/50" />
          <span className="size-2.5 rounded-full bg-white/90" />
        </span>
        <div>
          <p className="text-[12px] font-bold">Stella</p>
          <p className="flex items-center gap-1 text-[8px] text-white/55">
            <span className="size-1.5 rounded-full bg-lime" /> AI Agent · automating
          </p>
        </div>
      </div>

      <div className="relative flex-1 space-y-2.5 overflow-hidden px-3">
        {/* user message */}
        <motion.div
          className="ml-auto w-fit max-w-[80%] rounded-2xl rounded-br-md bg-gradient-to-r from-violet to-violet-bright px-3 py-1.5 text-[10px] font-medium"
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          Plan & automate my launch week
        </motion.div>

        {/* agent streaming bubble */}
        <motion.div
          className="w-fit max-w-[88%] rounded-2xl rounded-bl-md bg-white/[0.06] px-3 py-2 text-[10px] leading-relaxed text-white/85 ring-1 ring-white/10"
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.25 }}
        >
          On it — drafting your schedule and wiring up the automations
          <span className="ml-0.5 inline-block h-3 w-[2px] translate-y-0.5 animate-blink bg-accent" />
        </motion.div>

        {/* tool-call card */}
        <motion.div
          className="rounded-2xl bg-white/[0.05] p-2.5 ring-1 ring-white/10"
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
        >
          <div className="mb-2 flex items-center justify-between">
            <span className="flex items-center gap-1 text-[9px] font-bold text-accent">⚡ Automation running</span>
            <span className="font-mono text-[8px] text-white/45">2/3</span>
          </div>
          <div className="space-y-1.5">
            {STEPS.map((s, i) => (
              <motion.div
                key={s.label}
                className="flex items-center gap-2 text-[9px]"
                initial={{ opacity: 0, x: 8 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.6 + i * 0.15 }}
              >
                <span
                  className={
                    "grid size-4 place-items-center rounded-full " +
                    (s.done ? "bg-cyan text-[#04121a]" : s.active ? "text-accent" : "text-white/30")
                  }
                >
                  {s.done ? (
                    <Check className="size-2.5" strokeWidth={3} />
                  ) : s.active ? (
                    <Loader2 className="size-3 animate-spin" />
                  ) : (
                    <span className="size-2 rounded-full ring-1 ring-white/30" />
                  )}
                </span>
                <span className={s.active ? "font-semibold text-white" : "text-white/55"}>{s.label}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* input bar */}
      <div className="relative m-3 flex items-center gap-2 rounded-full bg-white/[0.06] px-3 py-2 ring-1 ring-white/10">
        <span className="flex-1 text-[9px] text-white/40">Ask Stella anything…</span>
        <span className="grid size-6 place-items-center rounded-full bg-gradient-to-r from-violet to-cyan">
          <ArrowUp className="size-3.5" strokeWidth={2.5} />
        </span>
      </div>
    </div>
  );
}
