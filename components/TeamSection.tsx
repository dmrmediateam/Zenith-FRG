import CoBrandedLockup from "./CoBrandedLockup";
import TrackedCTA from "./TrackedCTA";

const AGENTS = [
  { name: "Agent Name", title: "Falk·Ruvin·Gallagher · REALTOR®" },
  { name: "Agent Name", title: "Falk·Ruvin·Gallagher · REALTOR®" },
  { name: "Agent Name", title: "Falk·Ruvin·Gallagher · REALTOR®" },
];

export default function TeamSection() {
  return (
    <section className="bg-zenith-charcoal py-24 md:py-32 reveal">
      <div className="mx-auto max-w-7xl px-6 text-center md:px-10">
        <div className="mb-6 flex items-center justify-center gap-4">
          <span className="olive-rule" />
          <span className="label-tag">Exclusively Marketed By</span>
          <span className="olive-rule" />
        </div>

        <div className="mb-16 flex justify-center">
          <CoBrandedLockup variant="expanded" height={64} />
        </div>

        <div className="mx-auto grid max-w-4xl gap-8 sm:grid-cols-3">
          {AGENTS.map((agent, i) => (
            <div key={i} className="flex flex-col items-center">
              <div className="mb-4 h-28 w-28 rounded-full border border-zenith-sand/30 bg-zenith-cream/5 flex items-center justify-center">
                <span className="font-serif text-3xl tracking-[0.2em] text-zenith-sand/40">
                  Z
                </span>
              </div>
              <p className="font-serif text-lg text-zenith-cream">
                {agent.name}
              </p>
              <p className="mt-1 text-xs uppercase tracking-[0.2em] text-zenith-sand">
                {agent.title}
              </p>
            </div>
          ))}
        </div>

        <div className="mx-auto mt-16 max-w-md border-t border-zenith-cream/10 pt-10">
          <p className="text-sm leading-relaxed text-zenith-cream/70">
            701 E Kilbourn Ave Sales Center
            <br />
            Milwaukee, WI 53202
          </p>

          <TrackedCTA
            href="#contact"
            location="team"
            className="luxury-button-outline mt-8 inline-block"
          >
            Schedule a Private Showing
          </TrackedCTA>
        </div>
      </div>
    </section>
  );
}
