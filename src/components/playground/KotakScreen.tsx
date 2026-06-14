"use client";

import { motion } from "framer-motion";
import { ArrowDownLeft, ArrowUpRight, Bell, QrCode, Send, Smartphone, Zap } from "lucide-react";
import Counter, { inr } from "../Counter";
import StatusBar from "./StatusBar";

const RED = "#ED1C24";
const NAVY = "#003874";

const ACTIONS = [
  { icon: Send, label: "Send" },
  { icon: QrCode, label: "Scan & Pay" },
  { icon: Smartphone, label: "Recharge" },
  { icon: Zap, label: "Pay Bills" },
];

const TXNS = [
  { name: "Salary Credit", sub: "HDFC ••8842", amt: "+₹85,000", credit: true },
  { name: "Zomato", sub: "UPI · Food", amt: "−₹480", credit: false },
  { name: "Jio Recharge", sub: "UPI · Mobile", amt: "−₹239", credit: false },
];

export default function KotakScreen() {
  return (
    <div className="flex h-full flex-col bg-[#f3f4f8] text-[#0f1b2d]">
      <StatusBar />
      {/* header */}
      <div className="flex items-center justify-between px-4 pt-2 pb-2">
        <span className="text-[15px] font-extrabold tracking-tight">
          <span style={{ color: NAVY }}>Kotak</span>
          <span style={{ color: RED }}>811</span>
        </span>
        <Bell className="size-4" style={{ color: NAVY }} />
      </div>

      {/* balance card */}
      <div
        className="mx-3 overflow-hidden rounded-2xl p-3.5 text-white shadow-lg"
        style={{ background: `linear-gradient(135deg, ${RED} 0%, #b30f15 55%, ${NAVY} 130%)` }}
      >
        <div className="flex items-center justify-between">
          <p className="text-[9px] font-medium text-white/80">Available Balance</p>
          <span className="rounded-full bg-white/20 px-1.5 py-0.5 text-[7px] font-bold tracking-wide">811 SAVINGS</span>
        </div>
        <p className="mt-1 text-[22px] font-extrabold tracking-tight">
          ₹<Counter value={128940} format={inr} />
          <span className="text-sm">.50</span>
        </p>
        <p className="mt-2 font-mono text-[10px] tracking-[0.2em] text-white/85">•••• •••• •••• 8110</p>
      </div>

      {/* quick actions */}
      <div className="mt-3 grid grid-cols-4 gap-1 px-3">
        {ACTIONS.map((a, i) => (
          <motion.div
            key={a.label}
            className="flex flex-col items-center gap-1"
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 + i * 0.08 }}
          >
            <span className="grid size-9 place-items-center rounded-xl bg-white shadow-sm" style={{ color: RED }}>
              <a.icon className="size-4" />
            </span>
            <span className="text-center text-[7.5px] font-semibold text-gray-600">{a.label}</span>
          </motion.div>
        ))}
      </div>

      {/* transactions */}
      <div className="mt-3 flex items-center justify-between px-4">
        <p className="text-[10px] font-bold">Recent Transactions</p>
        <span className="text-[8px] font-semibold" style={{ color: RED }}>
          View all
        </span>
      </div>
      <div className="mt-1.5 flex-1 space-y-1.5 overflow-hidden px-3">
        {TXNS.map((tx, i) => (
          <motion.div
            key={tx.name}
            className="flex items-center gap-2.5 rounded-xl bg-white px-3 py-2 shadow-sm"
            initial={{ opacity: 0, x: 12 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.35 + i * 0.12 }}
          >
            <span
              className="grid size-7 place-items-center rounded-full"
              style={{ background: tx.credit ? "#e7f6ec" : "#fdecec", color: tx.credit ? "#16a34a" : RED }}
            >
              {tx.credit ? <ArrowDownLeft className="size-3.5" /> : <ArrowUpRight className="size-3.5" />}
            </span>
            <div className="flex-1">
              <p className="text-[10px] font-bold">{tx.name}</p>
              <p className="text-[8px] text-gray-400">{tx.sub}</p>
            </div>
            <p className="text-[11px] font-extrabold" style={{ color: tx.credit ? "#16a34a" : "#0f1b2d" }}>
              {tx.amt}
            </p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
