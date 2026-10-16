import { Rise, SectionHead } from "./ui";
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
  { Screen: StellaScreen, name: "Stella", note: "Multi-agent AI · LangGraph", role: "Built at Fig AI" },
];

function Caption({ name, note, role }: { name: string; note: string; role: string }) {
  return (
    <div className="mt-5 text-center">
      <h3 className="text-[1.05rem] tracking-[-0.02em]">{name}</h3>
      <p className="mt-1 text-[0.82rem] text-graphite">{note}</p>
      <p className="eyebrow mt-2 text-ember-deep">{role}</p>
    </div>
  );
}

export default function PlaygroundSection() {
  return (
    <section id="playground" className="relative scroll-mt-24 border-t border-paper-line py-14 sm:py-20 lg:py-24">
      <div className="shell">
        <SectionHead
          eyebrow="05 — Playground"
          headline="Apps I've brought to life."
          lede="A few products I've shipped, recreated here as living mockups running the real interactions. Move your pointer across a device."
        />

        {/* Three phones in a row. Below `md` they are a snap rail: a phone
            mockup cannot shrink past ~220px without its screen copy wrapping,
            so a two-column grid at `sm` only orphaned the third device on a
            row of its own — a full extra screen on a tablet. */}
        <div className="rail-md mt-10 sm:mt-14 md:grid md:grid-cols-3 md:gap-6">
          {PHONES.map(({ Screen, name, note, role }, i) => (
            <Rise key={name} delay={i}>
              <TiltCard intensity={9} glow={false}>
                <PhoneFrame>
                  <Screen />
                </PhoneFrame>
              </TiltCard>
              <Caption name={name} note={note} role={role} />
            </Rise>
          ))}
        </div>

        <Rise delay={2} className="mt-12 lg:mt-16">
          <TiltCard intensity={6} glow={false} className="mx-auto max-w-2xl">
            <LaptopFrame>
              <PareezScreen />
            </LaptopFrame>
          </TiltCard>
          <Caption
            name="Pareez Business Suite"
            note="Marketing site · Billing & POS · Admin dashboard"
            role="End-to-end build"
          />
        </Rise>
      </div>
    </section>
  );
}
