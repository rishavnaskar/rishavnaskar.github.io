import Reveal from "./Reveal";
import { cn } from "@/lib/utils";

export default function SectionHeading({
  eyebrow,
  title,
  accent,
  sub,
  align = "left",
}: {
  eyebrow: string;
  title: string;
  accent?: string;
  sub?: string;
  align?: "center" | "left";
}) {
  return (
    <Reveal className={cn("mb-12 max-w-2xl md:mb-16", align === "center" && "mx-auto text-center")}>
      <p className="font-mono text-xs tracking-[0.3em] text-accent uppercase">
        <span className="mr-3 inline-block h-px w-8 translate-y-[-4px] bg-gradient-to-r from-accent to-transparent align-middle" />
        {eyebrow}
      </p>
      <h2 className="mt-4 font-display text-4xl leading-[1.05] font-semibold tracking-tight text-fg md:text-5xl">
        {title} {accent ? <span className="text-gradient-accent">{accent}</span> : null}
      </h2>
      {sub ? <p className="mt-5 max-w-xl text-base leading-relaxed text-muted">{sub}</p> : null}
    </Reveal>
  );
}
