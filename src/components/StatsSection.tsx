import { STATS } from "@/lib/data";
import Counter from "./Counter";
import Reveal from "./Reveal";

export default function StatsSection() {
  return (
    <section className="mx-auto max-w-7xl px-5 py-16 lg:px-8">
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        {STATS.map((s, i) => (
          <Reveal key={s.label} delay={i * 0.07}>
            <div className="card group relative h-full overflow-hidden rounded-2xl p-6">
              <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100 [background:radial-gradient(120%_80%_at_0%_0%,color-mix(in_srgb,var(--color-violet)_22%,transparent),transparent_60%)]" />
              <div className="relative font-display text-4xl font-bold tracking-tight text-gradient md:text-5xl">
                <Counter value={s.value} decimals={s.decimals} />
                {s.suffix && <span className="text-accent">{s.suffix}</span>}
              </div>
              <p className="relative mt-3 text-sm text-muted">{s.label}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
