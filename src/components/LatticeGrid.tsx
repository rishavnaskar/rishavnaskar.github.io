"use client";

import { useEffect, useRef } from "react";

type Cell = {
  /** Ordered lattice position. */
  gx: number;
  gy: number;
  /** Scattered origin the cell resolves from. */
  ox: number;
  oy: number;
  or: number;
  /** Per-cell timing, so the lattice snaps together unevenly. */
  t0: number;
  dur: number;
  /** 0 = cold graphite, 1 = fully lit ember. */
  heat: number;
  seed: number;
};

const COLD = [128, 128, 140];
const EMBER = [240, 82, 28];
const EMBER_LIT = [255, 138, 74];

/**
 * The signature graphic: a field of squares that starts as scattered debris and
 * resolves into an ordered lattice — the shape of the work, really. A handful
 * of cells stay lit like coals, and the pointer re-heats whatever it passes
 * over.
 *
 * Canvas rather than DOM because this is several hundred elements animating at
 * once; as divs it would thrash layout on every frame. The render loop is
 * paused by an IntersectionObserver whenever the panel is off screen.
 */
export default function LatticeGrid({
  className = "",
  cell = 26,
  gap = 4,
}: {
  className?: string;
  cell?: number;
  gap?: number;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const wrapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const wrap = wrapRef.current;
    if (!canvas || !wrap) return;

    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let cells: Cell[] = [];
    let width = 0;
    let height = 0;
    let dpr = 1;
    let start = performance.now();
    let frame = 0;
    let visible = true;
    const pointer = { x: -1e5, y: -1e5, active: false };

    const build = () => {
      const rect = wrap.getBoundingClientRect();
      width = Math.max(1, Math.floor(rect.width));
      height = Math.max(1, Math.floor(rect.height));
      // Hundreds of blurred fills per frame scale with the backing store, so
      // phones get 1.5× rather than 3×: still crisp at 24px cells, a third
      // of the pixels.
      dpr = Math.min(window.devicePixelRatio || 1, width < 768 ? 1.5 : 2);

      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      const step = cell + gap;
      const cols = Math.ceil(width / step) + 1;
      const rows = Math.ceil(height / step) + 1;

      cells = [];
      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          const gx = c * step;
          const gy = r * step;

          // Cells nearer the top-left resolve first, so the lattice reads as
          // assembling rather than simply fading in.
          const progress = (c / cols) * 0.55 + (r / rows) * 0.45;
          const jitter = Math.random();

          cells.push({
            gx,
            gy,
            ox: gx + (Math.random() - 0.5) * 260,
            oy: gy + (Math.random() - 0.5) * 200,
            or: (Math.random() - 0.5) * 1.4,
            t0: progress * 900 + jitter * 520,
            dur: 900 + Math.random() * 700,
            heat: Math.random() < 0.055 ? 0.55 + Math.random() * 0.45 : 0,
            seed: Math.random() * Math.PI * 2,
          });
        }
      }
      start = performance.now();
    };

    const easeOut = (t: number) => 1 - Math.pow(1 - t, 3.2);

    const mix = (a: number[], b: number[], t: number) =>
      `${Math.round(a[0] + (b[0] - a[0]) * t)},${Math.round(a[1] + (b[1] - a[1]) * t)},${Math.round(
        a[2] + (b[2] - a[2]) * t,
      )}`;

    const draw = (now: number) => {
      frame = requestAnimationFrame(draw);
      if (!visible) return;

      const elapsed = now - start;
      ctx.clearRect(0, 0, width, height);

      for (let i = 0; i < cells.length; i++) {
        const c = cells[i];
        const local = reduced ? 1 : (elapsed - c.t0) / c.dur;
        if (local <= 0) continue;

        const p = easeOut(Math.min(1, local));
        const x = c.ox + (c.gx - c.ox) * p;
        const y = c.oy + (c.gy - c.oy) * p;
        const rot = c.or * (1 - p);

        // Idle shimmer keeps the resolved lattice alive without moving it.
        const breathe = reduced ? 0 : Math.sin(now / 1400 + c.seed) * 0.5 + 0.5;
        let heat = c.heat * (0.55 + breathe * 0.45);

        if (pointer.active) {
          const dx = c.gx + cell / 2 - pointer.x;
          const dy = c.gy + cell / 2 - pointer.y;
          const d2 = dx * dx + dy * dy;
          const radius = 150;
          if (d2 < radius * radius) {
            heat = Math.min(1, heat + (1 - Math.sqrt(d2) / radius) * 0.85);
          }
        }

        const alpha = 0.06 + p * 0.1 + heat * 0.7;
        const colour =
          heat > 0.6 ? mix(EMBER, EMBER_LIT, (heat - 0.6) / 0.4) : mix(COLD, EMBER, heat / 0.6);

        ctx.save();
        if (rot !== 0) {
          ctx.translate(x + cell / 2, y + cell / 2);
          ctx.rotate(rot);
          ctx.translate(-cell / 2, -cell / 2);
        } else {
          ctx.translate(x, y);
        }

        ctx.fillStyle = `rgba(${colour},${alpha})`;
        ctx.fillRect(0, 0, cell, cell);

        if (heat > 0.5) {
          ctx.shadowColor = `rgba(${colour},${heat * 0.55})`;
          ctx.shadowBlur = 16 * heat;
          ctx.fillRect(0, 0, cell, cell);
        }
        ctx.restore();
      }
    };

    const onPointer = (e: PointerEvent) => {
      const rect = wrap.getBoundingClientRect();
      pointer.x = e.clientX - rect.left;
      pointer.y = e.clientY - rect.top;
      pointer.active = true;
    };
    const onLeave = () => {
      pointer.active = false;
    };

    build();
    frame = requestAnimationFrame(draw);

    const ro = new ResizeObserver(build);
    ro.observe(wrap);

    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
    }, { rootMargin: "120px" });
    io.observe(wrap);

    wrap.addEventListener("pointermove", onPointer);
    wrap.addEventListener("pointerleave", onLeave);

    return () => {
      cancelAnimationFrame(frame);
      ro.disconnect();
      io.disconnect();
      wrap.removeEventListener("pointermove", onPointer);
      wrap.removeEventListener("pointerleave", onLeave);
    };
  }, [cell, gap]);

  return (
    // Positioning is the caller's job — every use site overlays a panel, and a
    // hardcoded `relative` here would fight the `absolute inset-0` they pass.
    <div ref={wrapRef} className={className} aria-hidden>
      <canvas ref={canvasRef} className="block size-full" />
    </div>
  );
}
