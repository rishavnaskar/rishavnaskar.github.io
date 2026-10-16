"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useEffect, useState } from "react";
import { ROLES } from "@/lib/data";

/** Cycles the disciplines in the hero caption, one word at a time. */
export default function RoleRotator() {
  const reduce = useReducedMotion();
  const [i, setI] = useState(0);

  useEffect(() => {
    if (reduce) return;
    const id = setInterval(() => setI((v) => (v + 1) % ROLES.length), 2200);
    return () => clearInterval(id);
  }, [reduce]);

  // Reserve the width of the longest word so the line never reflows.
  const longest = ROLES.reduce((a, b) => (b.length > a.length ? b : a), "");

  return (
    <span className="relative inline-grid align-baseline">
      <span aria-hidden className="invisible col-start-1 row-start-1">
        {longest}
      </span>
      <span className="col-start-1 row-start-1 overflow-hidden">
        <AnimatePresence mode="wait" initial={false}>
          <motion.span
            key={ROLES[i]}
            initial={reduce ? false : { y: "100%", opacity: 0 }}
            animate={{ y: "0%", opacity: 1 }}
            exit={reduce ? undefined : { y: "-100%", opacity: 0 }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            className="inline-block text-ember"
          >
            {ROLES[i]}
          </motion.span>
        </AnimatePresence>
      </span>
    </span>
  );
}
