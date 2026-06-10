"use client";

import { trackEvent } from "@/lib/analytics";

const POINTS = [
  "Be among the first to tour the sales center",
  "Access floor plans and pricing before public release",
  "Priority scheduling through Falk·Ruvin·Gallagher",
];

export default function OpportunitySection() {
  return (
    <section className="bg-zenith-cream py-24 md:py-32 reveal">
      <div className="mx-auto max-w-4xl px-6 text-center md:px-10">
        <div className="mb-6 flex items-center justify-center gap-4">
          <span className="olive-rule" />
          <span className="label-tag">The Opportunity</span>
          <span className="olive-rule" />
        </div>

        <h2 className="section-heading mb-6 text-balance">
          40 Residences Under Contract.{" "}
          <span className="font-serif italic text-zenith-bronze">
            186 Remain.
          </span>
        </h2>

        <p className="mx-auto mb-12 max-w-2xl text-[15px] leading-relaxed text-zenith-charcoal/80">
          The response to Zenith has been unlike anything Milwaukee has seen.
          40 homes are already spoken for. The announcement hits MLS on June
          23, 2026. If you&rsquo;re considering Zenith, now is the moment to
          move first.
        </p>

        <div className="mx-auto mb-12 max-w-xl divide-y divide-zenith-sand/20 border-y border-zenith-sand/20">
          {POINTS.map((point) => (
            <div key={point} className="flex items-center gap-4 py-4">
              <span className="font-sub text-xs uppercase tracking-[0.2em] text-zenith-olive">
                —
              </span>
              <p className="text-left text-[15px] text-zenith-charcoal/80">
                {point}
              </p>
            </div>
          ))}
        </div>

        <a
          href="#contact"
          data-cta="opportunity"
          onClick={() =>
            trackEvent("hero_cta_click", { location: "opportunity" })
          }
          className="luxury-button-outline-dark inline-block"
        >
          Request Private Information
        </a>
      </div>
    </section>
  );
}
