"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, Search } from "lucide-react";
import Counter, { inr } from "../Counter";
import StatusBar from "./StatusBar";

const GREEN = "#00D09C";
const BLUE = "#5367F5";

const HOLDINGS = [
  { name: "RELIANCE", sub: "12 shares", val: "₹30,480", chg: "+1.24%", up: true },
  { name: "TCS", sub: "8 shares", val: "₹31,120", chg: "+0.86%", up: true },
  { name: "INFOSYS", sub: "20 shares", val: "₹32,400", chg: "-0.42%", up: false },
  { name: "HDFC BANK", sub: "15 shares", val: "₹25,650", chg: "+2.10%", up: true },
];

// a gentle upward sparkline
const LINE = "M0,46 C20,42 32,30 50,32 C70,34 84,16 104,18 C124,20 140,8 168,4";

export default function GrowwScreen() {
  return (
    <div className="flex h-full flex-col bg-[#f6f8f7] text-[#1a1a1a]">
      <StatusBar />
      {/* header */}
      <div className="flex items-center justify-between px-4 pt-2 pb-3">
        <span className="text-[15px] font-extrabold tracking-tight" style={{ color: GREEN }}>
          Groww
        </span>
        <div className="flex items-center gap-2">
          <Search className="size-4 text-gray-500" />
          <span className="grid size-6 place-items-center rounded-full text-[9px] font-bold text-white" style={{ background: BLUE }}>
            RN
          </span>
        </div>
      </div>

      {/* portfolio card */}
      <div className="mx-3 rounded-2xl bg-white p-3.5 shadow-sm">
        <p className="text-[9px] font-medium text-gray-500">Current Investment Value</p>
        <p className="mt-1 text-[22px] font-extrabold tracking-tight">
          ₹<Counter value={119650} format={inr} />
        </p>
        <div className="mt-1 flex items-center gap-1.5">
          <span className="inline-flex items-center gap-0.5 rounded-full px-1.5 py-0.5 text-[9px] font-bold text-white" style={{ background: GREEN }}>
            <ArrowUpRight className="size-2.5" /> 3.84%
          </span>
          <span className="text-[9px] font-semibold" style={{ color: GREEN }}>
            +₹4,420 · 1D
          </span>
        </div>
        {/* sparkline */}
        <svg viewBox="0 0 168 50" className="mt-2 h-12 w-full overflow-visible">
          <defs>
            <linearGradient id="gw-fill" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" stopColor={GREEN} stopOpacity="0.22" />
              <stop offset="1" stopColor={GREEN} stopOpacity="0" />
            </linearGradient>
          </defs>
          <motion.path
            d={`${LINE} L168,50 L0,50 Z`}
            fill="url(#gw-fill)"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.5 }}
          />
          <motion.path
            d={LINE}
            fill="none"
            stroke={GREEN}
            strokeWidth={2.4}
            strokeLinecap="round"
            initial={{ pathLength: 0 }}
            whileInView={{ pathLength: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.3, ease: "easeInOut" }}
          />
        </svg>
      </div>

      {/* tabs */}
      <div className="mt-3 flex gap-4 px-4 text-[10px] font-bold">
        <span className="border-b-2 pb-1" style={{ borderColor: GREEN, color: GREEN }}>
          Stocks
        </span>
        <span className="pb-1 text-gray-400">Mutual Funds</span>
        <span className="pb-1 text-gray-400">F&amp;O</span>
      </div>

      {/* holdings */}
      <div className="mt-1 flex-1 space-y-1.5 overflow-hidden px-3 pt-2">
        {HOLDINGS.map((h, i) => (
          <motion.div
            key={h.name}
            className="flex items-center justify-between rounded-xl bg-white px-3 py-2 shadow-sm"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 + i * 0.12 }}
          >
            <div>
              <p className="text-[11px] font-bold">{h.name}</p>
              <p className="text-[8px] text-gray-400">{h.sub}</p>
            </div>
            <div className="text-right">
              <p className="text-[11px] font-bold">{h.val}</p>
              <p className="text-[8px] font-semibold" style={{ color: h.up ? GREEN : "#e8503a" }}>
                {h.chg}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
