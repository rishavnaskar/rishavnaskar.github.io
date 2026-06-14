import Reveal from "./Reveal";
import SectionHeading from "./SectionHeading";
import TiltCard from "./TiltCard";
import PhoneFrame from "./playground/PhoneFrame";
import LaptopFrame from "./playground/LaptopFrame";
import GrowwScreen from "./playground/GrowwScreen";
import KotakScreen from "./playground/KotakScreen";
import StellaScreen from "./playground/StellaScreen";
import PareezScreen from "./playground/PareezScreen";

const PHONES = [
  { Screen: GrowwScreen, name: "Groww", note: "UPI · Investments · QR scanner", role: "SDE @ Groww" },
  { Screen: KotakScreen, name: "Kotak 811", note: "Digital banking · native bridges", role: "SDE @ Kotak" },
  { Screen: StellaScreen, name: "Stella", note: "Multi-agent AI · LangGraph", role: "AI Engineer @ Fig AI" },
];

function Caption({ name, note, role }: { name: string; note: string; role: string }) {
  return (
    <div className="mt-5 text-center">
      <h3 className="font-display text-lg font-semibold">{name}</h3>
      <p className="mt-0.5 text-xs text-muted">{note}</p>
      <p className="mt-1 font-mono text-[0.65rem] tracking-wide text-accent uppercase">{role}</p>
    </div>
  );
}

export default function PlaygroundSection() {
  return (
    <section id="playground" className="mx-auto max-w-7xl scroll-mt-24 px-5 py-20 lg:px-8 lg:py-28">
      <SectionHeading
        eyebrow="06 — Playground"
        title="Apps I’ve brought to"
        accent="life."
        sub="A few products I’ve shipped — recreated here as living, animated mockups. Hover or move your mouse over each device."
      />

      {/* phones */}
      <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6">
        {PHONES.map(({ Screen, name, note, role }, i) => (
          <Reveal key={name} delay={i * 0.1} className="sm:[&:last-child]:col-span-2 lg:[&:last-child]:col-span-1">
            <TiltCard intensity={9} glow={false}>
              <PhoneFrame>
                <Screen />
              </PhoneFrame>
            </TiltCard>
            <Caption name={name} note={note} role={role} />
          </Reveal>
        ))}
      </div>

      {/* laptop — Pareez business suite */}
      <Reveal delay={0.15} className="mt-16 lg:mt-24">
        <TiltCard intensity={6} glow={false} className="mx-auto max-w-3xl">
          <LaptopFrame>
            <PareezScreen />
          </LaptopFrame>
        </TiltCard>
        <Caption
          name="Pareez Business Suite"
          note="Marketing site · Billing & POS · Admin dashboard"
          role="End-to-end build"
        />
      </Reveal>
    </section>
  );
}
