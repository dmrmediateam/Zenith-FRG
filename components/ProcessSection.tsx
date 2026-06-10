"use client";

import { trackEvent } from "@/lib/analytics";

const STEPS = [
  {
    step: "01",
    title: "Share Your Property Details",
    body: "Start with the property address, city, and ZIP code. The form stays brief and asks for contact details only after the property context is captured.",
  },
  {
    step: "02",
    title: "We Review Market & Property Factors",
    body: "Gregg personally reviews your property — its attributes, its neighborhood, recent comparable sales, and current qualified buyer demand at your price point.",
  },
  {
    step: "03",
    title: "You Receive a Private Valuation",
    body: "Within two to three business days, you receive a thoughtful, strategy-informed valuation overview — delivered personally with context and guidance, not just a number.",
  },
];

export default function ProcessSection() {
  return (
    <section className="bg-cream-200 py-24 md:py-32 relative overflow-hidden">
      {/* Decorative large number */}
      <div
        className="absolute right-0 top-1/2 -translate-y-1/2 font-serif text-[280px] text-stone-200 select-none pointer-events-none leading-none"
        aria-hidden="true"
      >
        3
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-10">

        {/* Header */}
        <div className="mb-16 md:mb-20 max-w-lg">
          <div className="flex items-center gap-4 mb-6">
            <span className="block w-10 h-px bg-gold-500" />
            <span className="label-tag">The Process</span>
          </div>
          <h2 className="section-heading text-balance">
            Simple, Private,{" "}
            <span className="font-serif italic text-charcoal-600">
              Unhurried
            </span>
          </h2>
        </div>

        {/* Steps */}
        <div className="grid md:grid-cols-3 gap-0 md:divide-x divide-stone-200">
          {STEPS.map((item, i) => (
            <div key={i} className="px-0 md:px-10 first:pl-0 last:pr-0 py-8 md:py-0">
              {/* Step number */}
              <div className="flex items-center gap-4 mb-6">
                <span className="font-serif text-5xl text-stone-200 leading-none select-none">
                  {item.step}
                </span>
                {i < STEPS.length - 1 && (
                  <div className="hidden md:block flex-1 h-px bg-gradient-to-r from-gold-300/60 to-transparent" />
                )}
              </div>

              {/* Gold rule */}
              <span className="block w-6 h-px bg-gold-400 mb-5" />

              {/* Title */}
              <h3 className="font-serif text-xl md:text-2xl text-charcoal-800 mb-4 leading-snug">
                {item.title}
              </h3>

              {/* Body */}
              <p className="text-stone-500 text-[15px] leading-relaxed font-sans">
                {item.body}
              </p>

              {/* Mobile divider */}
              {i < STEPS.length - 1 && (
                <div className="md:hidden mt-8 h-px bg-stone-200" />
              )}
            </div>
          ))}
        </div>

        {/* CTA nudge */}
        <div className="mt-16 pt-14 border-t border-stone-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <p className="text-stone-500 font-sans text-[15px] max-w-md leading-relaxed">
            Ready to get a clearer picture of your home&apos;s value? The first step
            takes less than two minutes.
          </p>
          <a
            href="#hero-form"
            data-cta="process"
            onClick={() => trackEvent("process_cta_click")}
            className="luxury-button-outline flex-shrink-0 inline-block"
          >
            Request My Valuation
          </a>
        </div>
      </div>
    </section>
  );
}
