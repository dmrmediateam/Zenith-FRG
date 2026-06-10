"use client";

import FAQAccordion from "./FAQAccordion";
import { trackEvent } from "@/lib/analytics";

export default function FAQSection() {
  return (
    <section className="bg-white py-24 md:py-32 border-t border-stone-100">
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        <div className="grid lg:grid-cols-[360px_1fr] gap-16 lg:gap-24 items-start">

          {/* Left — sticky header */}
          <div className="lg:sticky lg:top-28">
            <div className="flex items-center gap-4 mb-8">
              <span className="block w-10 h-px bg-gold-500" />
              <span className="label-tag">Questions</span>
            </div>

            <h2 className="section-heading text-balance mb-6">
              Common{" "}
              <span className="italic text-charcoal-600">Questions</span>
            </h2>

            <p className="text-stone-400 text-[15px] leading-relaxed font-sans mb-8">
              A few answers for sellers who want to understand the process
              before they begin.
            </p>

            <a
              href="#hero-form"
              data-cta="faq"
              onClick={() => trackEvent("faq_cta_click")}
              className="inline-block luxury-button-outline text-center"
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
