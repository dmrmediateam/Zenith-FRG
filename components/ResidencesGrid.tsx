"use client";

import { trackEvent } from "@/lib/analytics";

const UNITS = [
  {
    id: "residences",
    name: "Residences",
    price: "From $400k",
    detail: "Studio to multi-bedroom layouts",
  },
  {
    id: "penthouses",
    name: "Penthouses",
    price: "From $1.5M+",
    detail: "Three available, limited release",
  },
  {
    id: "additional-penthouses",
    name: "Additional Penthouses",
    price: "By Inquiry",
    detail: "Releasing based on demand",
    ghost: true,
  },
];

export default function ResidencesGrid() {
  return (
    <section
      id="penthouses"
      className="bg-zenith-charcoal py-24 md:py-32 reveal"
    >
      <div className="mx-auto max-w-7xl px-6 md:px-10">
        <div className="mb-16 flex items-center gap-4 md:mb-20">
          <span className="olive-rule" />
          <span className="label-tag">The Residences</span>
        </div>

        <div className="grid gap-px bg-zenith-cream/10 md:grid-cols-3">
          {UNITS.map((unit) => (
            <div
              key={unit.id}
              className={`group flex flex-col p-8 transition-colors duration-300 md:p-10 ${
                unit.ghost
                  ? "border border-dashed border-zenith-cream/15 bg-transparent"
                  : "bg-zenith-charcoal hover:bg-zenith-charcoal/60"
              }`}
            >
              <h3 className="font-serif text-2xl text-zenith-cream md:text-3xl">
                {unit.name}
              </h3>
              <p className="mt-3 font-sub text-lg text-zenith-olive">
                {unit.price}
              </p>
              <p className="mt-4 text-sm leading-relaxed text-zenith-cream/60">
                {unit.detail}
              </p>

              <a
                href="#contact"
                data-cta={`residences-${unit.id}`}
                onClick={() =>
                  trackEvent("hero_cta_click", {
                    location: `residences_${unit.id}`,
                  })
                }
                className="mt-8 inline-flex w-fit items-center gap-2 text-xs font-sub uppercase tracking-[0.2em] text-zenith-olive opacity-0 transition-opacity duration-300 group-hover:opacity-100"
              >
                Inquire <span aria-hidden="true">→</span>
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
