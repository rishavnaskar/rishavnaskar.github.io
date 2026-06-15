import Reveal from "./Reveal";
import SectionHeading from "./SectionHeading";
import ModelViewer from "./hobbies/ModelViewer";
import { MODEL_URLS, MODEL_CONFIG } from "@/lib/models";

function Caption({ title, note, credit }: { title: string; note: string; credit?: React.ReactNode }) {
  return (
    <div className="mt-5 text-center">
      <h3 className="font-display text-lg font-semibold">{title}</h3>
      <p className="mt-1 text-sm text-muted">{note}</p>
      {credit ? <p className="mt-1.5 text-[0.65rem] text-faint">{credit}</p> : null}
    </div>
  );
}

export default function HobbiesSection() {
  return (
    <section id="hobbies" className="mx-auto max-w-7xl scroll-mt-24 px-5 py-20 lg:px-8 lg:py-28">
      <SectionHeading
        eyebrow="07 — Off the clock"
        title="Two things that keep me"
        accent="grounded."
        sub="When I’m not shipping, I’m on a long drive or behind a kit. Both rendered here in real-time 3D — drag them around, spin them, go nuts."
      />

      <div className="grid gap-12 lg:grid-cols-2 lg:gap-8">
        <Reveal>
          <ModelViewer url={MODEL_URLS.car} {...MODEL_CONFIG.car} />
          <Caption
            title="Driving"
            note="My Honda Fit — I call her Melissa."
          />
        </Reveal>

        <Reveal delay={0.1}>
          <ModelViewer url={MODEL_URLS.drums} {...MODEL_CONFIG.drums} />
          <Caption title="Drumming" note="12 years behind the kit." />
        </Reveal>
      </div>
    </section>
  );
}
