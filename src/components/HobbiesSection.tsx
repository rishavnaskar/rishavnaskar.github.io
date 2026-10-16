import { Rise, SectionHead } from "./ui";
import HobbyModel from "./hobbies/HobbyModel";
import { MODEL_URLS, MODEL_CONFIG } from "@/lib/models";

function Caption({ title, note }: { title: string; note: string }) {
  return (
    <div className="mt-4 flex items-baseline justify-between gap-4 border-t border-paper-line pt-4">
      <h3 className="text-[1.05rem] tracking-[-0.02em]">{title}</h3>
      <p className="text-right text-[0.82rem] text-graphite">{note}</p>
    </div>
  );
}

export default function HobbiesSection() {
  return (
    <section
      id="hobbies"
      className="relative scroll-mt-24 border-t border-paper-line bg-paper-warm/50 py-14 sm:py-20 lg:py-24"
    >
      <div className="shell">
        <SectionHead
          eyebrow="06 — Off the clock"
          headline="Two things that keep me grounded."
          lede="A long drive or an hour behind the kit. Both rendered here in real-time 3D — drag them around and spin them."
        />

        {/* Side by side from `sm`: stacked, two 4:3 stages at tablet width were
            a screen and a half of canvas. */}
        <div className="mt-10 grid gap-8 sm:mt-14 sm:grid-cols-2 sm:gap-5 lg:gap-6">
          <Rise>
            <HobbyModel url={MODEL_URLS.car} {...MODEL_CONFIG.car} />
            <Caption title="Driving" note="My Honda Fit — I call her Melissa." />
          </Rise>

          <Rise delay={1}>
            <HobbyModel url={MODEL_URLS.drums} {...MODEL_CONFIG.drums} />
            <Caption title="Drumming" note="12 years behind the kit." />
          </Rise>
        </div>
      </div>
    </section>
  );
}
