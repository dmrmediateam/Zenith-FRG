"use client";

import FAQAccordion from "./FAQAccordion";
import { trackEvent } from "@/lib/analytics";

export default function FAQSection() {
  return (
    <section className="bg-zenith-cream py-24 md:py-32 reveal">
      <div className="mx-auto max-w-7xl px-6 md:px-10">
        <div className="grid items-start gap-16 lg:grid-cols-[360px_1fr] lg:gap-24">
          {/* Left — sticky header */}
          <div className="lg:sticky lg:top-28">
            <div className="mb-8 flex items-center gap-4">
              <span className="olive-rule" />
              <span className="label-tag">Questions</span>
            </div>

            <h2 className="section-heading mb-6 text-balance">
              Common{" "}
              <span className="font-serif italic text-zenith-bronze">
                Questions
              </span>
            </h2>

            <p className="mb-8 text-[15px] leading-relaxed text-zenith-charcoal/70 font-sans">
              A few answers for buyers who want to understand Zenith before
              they reach out.
            </p>

            <a
              href="#contact"
              data-cta="faq"
              onClick={() => trackEvent("hero_cta_click", { location: "faq" })}
              className="inline-block luxury-button-outline-dark text-center"
            >
              Get Started
            </a>
          </div>

          {/* Right — accordion */}
          <div className="mt-0 lg:mt-2">
            <FAQAccordion />
          </div>
        </div>
      </div>
    </section>
  );
}
