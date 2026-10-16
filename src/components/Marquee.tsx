import { MARQUEE } from "@/lib/data";

/** The shorthand version of the CV: who I've shipped for, and what with. */
const SHIPPED_AT = [
  "SaxeCap",
  "Fig AI",
  "Kotak Mahindra Bank",
  "Groww",
  "Oolka",
  "Agora.io",
  "Anthropic",
  "OpenHands",
  "VIT Vellore",
] as const;

export default function Marquee() {
  const companies = [...SHIPPED_AT, ...SHIPPED_AT];
  const stack = [...MARQUEE, ...MARQUEE];

  return (
    <section aria-label="Companies and technologies" className="border-y border-paper-line bg-paper-warm/60 py-8">
      <p className="eyebrow mb-6 text-center text-ash">Shipped at · built with</p>

      <div className="relative overflow-hidden mask-fade-x">
        <div className="marquee-track flex w-max items-center gap-12 pr-12">
          {companies.map((name, i) => (
            <span
              key={name + i}
              className="whitespace-nowrap text-[1.1rem] font-medium tracking-[-0.03em] text-fg/60 transition-colors duration-300 hover:text-fg/90 sm:text-[1.3rem]"
            >
              {name}
            </span>
          ))}
        </div>
      </div>

      <div className="relative mt-4 overflow-hidden mask-fade-x">
        <div className="marquee-track-rev flex w-max items-center gap-8 pr-8">
          {stack.map((name, i) => (
            <span key={name + i} className="eyebrow whitespace-nowrap text-ash">
              {name}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
