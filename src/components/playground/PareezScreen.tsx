"use client";

import { motion } from "framer-motion";
import { CalendarDays, FileText, LayoutDashboard, Plus, Receipt, Scissors, TrendingUp, Users } from "lucide-react";
import Counter, { inr } from "../Counter";

const ORANGE = "#f4670f";
const ORANGE_BRIGHT = "#ff8a3d";
const CREAM = "#faf7f2";

const NAV = [
  { icon: LayoutDashboard, active: true },
  { icon: CalendarDays, active: false },
  { icon: Receipt, active: false },
  { icon: Users, active: false },
  { icon: FileText, active: false },
];

const KPIS = [
  { label: "Today's Revenue", value: 42800, prefix: "₹", trend: "+18%" },
  { label: "Appointments", value: 38, prefix: "", trend: "+6" },
  { label: "New Clients", value: 12, prefix: "", trend: "+3" },
];

const BARS = [42, 58, 35, 70, 52, 88, 64];
const DAYS = ["M", "T", "W", "T", "F", "S", "S"];

const APPTS = [
  { svc: "Keratin · Hair", who: "Ananya R.", time: "2:30 PM" },
  { svc: "Bridal Makeup", who: "Priya S.", time: "3:15 PM" },
  { svc: "Hair Spa", who: "Rohit M.", time: "4:00 PM" },
];

export default function PareezScreen() {
  return (
    <div className="flex h-full bg-[#0a0908] text-[var(--cream,#faf7f2)]" style={{ color: CREAM }}>
      {/* sidebar */}
      <div className="flex w-9 flex-col items-center gap-3 border-r border-white/8 bg-[#120f0d] py-3">
        <span className="grid size-6 place-items-center rounded-lg" style={{ background: ORANGE }}>
          <Scissors className="size-3.5 text-black" />
        </span>
        {NAV.map((n, i) => (
          <span
            key={i}
            className="grid size-6 place-items-center rounded-lg"
            style={{ background: n.active ? "rgba(244,103,15,0.16)" : "transparent", color: n.active ? ORANGE_BRIGHT : "rgba(250,247,242,0.4)" }}
          >
            <n.icon className="size-3.5" />
          </span>
        ))}
      </div>

      {/* main */}
      <div className="flex flex-1 flex-col overflow-hidden p-3">
        {/* top bar */}
        <div className="flex items-center justify-between">
          <div>
            <p className="font-serif text-[15px] leading-none font-bold tracking-tight" style={{ fontFamily: "Georgia, serif" }}>
              Pareez<span style={{ color: ORANGE }}>.</span> <span className="text-[10px] font-sans font-normal text-white/45">Admin</span>
            </p>
            <p className="mt-1 text-[8px] text-white/40">Garfa Branch · Today, 15 Jun</p>
          </div>
          <span
            className="inline-flex items-center gap-1 rounded-lg px-2.5 py-1 text-[9px] font-bold text-black"
            style={{ background: ORANGE }}
          >
            <Plus className="size-3" /> New Invoice
          </span>
        </div>

        {/* KPIs */}
        <div className="mt-3 grid grid-cols-3 gap-2">
          {KPIS.map((k, i) => (
            <motion.div
              key={k.label}
              className="rounded-xl border border-white/8 bg-[#1a1714] p-2.5"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
            >
              <p className="text-[7.5px] text-white/45">{k.label}</p>
              <p className="mt-0.5 text-[15px] font-extrabold tracking-tight">
                {k.prefix}
                <Counter value={k.value} format={k.prefix ? inr : undefined} />
              </p>
              <p className="mt-0.5 flex items-center gap-0.5 text-[7.5px] font-bold" style={{ color: ORANGE_BRIGHT }}>
                <TrendingUp className="size-2.5" /> {k.trend} this week
              </p>
            </motion.div>
          ))}
        </div>

        {/* chart + appointments */}
        <div className="mt-2.5 grid flex-1 grid-cols-[1.3fr_1fr] gap-2">
          {/* revenue chart */}
          <div className="flex flex-col rounded-xl border border-white/8 bg-[#1a1714] p-2.5">
            <p className="text-[8px] font-semibold text-white/60">Revenue · last 7 days</p>
            <div className="mt-2 flex flex-1 items-end justify-between gap-1.5">
              {BARS.map((h, i) => (
                <div key={i} className="flex h-full flex-1 flex-col items-center gap-1">
                  <div className="flex w-full flex-1 items-end justify-center">
                    <motion.div
                      className="w-full rounded-t-[3px]"
                      style={{ background: i === 5 ? ORANGE : "rgba(244,103,15,0.4)" }}
                      initial={{ height: 0 }}
                      whileInView={{ height: `${h}%` }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.2 + i * 0.07, duration: 0.5, ease: "easeOut" }}
                    />
                  </div>
                  <span className="text-[6.5px] text-white/35">{DAYS[i]}</span>
                </div>
              ))}
            </div>
          </div>

          {/* upcoming appointments */}
          <div className="flex flex-col rounded-xl border border-white/8 bg-[#1a1714] p-2.5">
            <p className="text-[8px] font-semibold text-white/60">Upcoming</p>
            <div className="mt-1.5 space-y-1.5">
              {APPTS.map((a, i) => (
                <motion.div
                  key={a.who}
                  className="flex items-center gap-1.5"
                  initial={{ opacity: 0, x: 10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.4 + i * 0.12 }}
                >
                  <span className="grid size-5 place-items-center rounded-md" style={{ background: "rgba(244,103,15,0.16)", color: ORANGE_BRIGHT }}>
                    <Scissors className="size-2.5" />
                  </span>
                  <div className="flex-1 leading-tight">
                    <p className="text-[8px] font-bold">{a.svc}</p>
                    <p className="text-[7px] text-white/40">{a.who}</p>
                  </div>
                  <span className="text-[7.5px] font-semibold" style={{ color: ORANGE_BRIGHT }}>
                    {a.time}
                  </span>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
