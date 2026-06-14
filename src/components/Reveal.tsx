"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";

type Props = {
  children: ReactNode;
  delay?: number;
  from?: "up" | "down" | "left" | "right" | "none";
  className?: string;
  once?: boolean;
};

/**
 * Scroll-reveal wrapper. Uses Framer Motion's `whileInView`, which is backed
 * by IntersectionObserver — no scroll listeners, GPU transforms only. This is
 * the reason scrolling stays buttery even with many animated sections.
 */
export default function Reveal({ children, delay = 0, from = "up", className, once = true }: Props) {
  const reduce = useReducedMotion();
  const offset = 32;
  const initial = reduce
    ? { opacity: 0 }
    : {
        opacity: 0,
        x: from === "left" ? -offset : from === "right" ? offset : 0,
        y: from === "up" ? offset : from === "down" ? -offset : 0,
      };

  return (
    <motion.div
      className={className}
      initial={initial}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once, margin: "-70px" }}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}
