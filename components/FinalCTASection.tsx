"use client";

import Link from "next/link";
import KWLogo from "./KWLogo";
import { trackEvent } from "@/lib/analytics";

/**
 * Gregg's direct phone number. Set this to enable the phone link in the
 * final CTA section. Leave empty to hide it.
 * Example: "(727) 555-0100"
 */
const GREGG_PHONE = "";

export default function FinalCTASection() {
  return (
    <section
      className="relative overflow-hidden py-20 md:py-28"
      style={{
        background:
          "linear-gradient(150deg, #1A1918 0%, #242220 58%, #141312 100%)",
      }}
    >
      <div
        className="absolute left-0 right-0 top-0 h-px"
        style={{
          background:
            "linear-gradient(90deg, transparent 0%, #B8963E 30%, #D4AF6A 50%, #B8963E 70%, transparent 100%)",
        }}
        aria-hidden="true"
      />

      <div className="relative z-10 mx-auto max-w-5xl px-6 md:px-10">
        <div className="border border-white/10 bg-cream-50 p-7 shadow-2xl md:p-10">
          <div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-center">
            <div>
              <div className="mb-6 flex items-center gap-4">
                <span className="block h-px w-10 bg-gold-500" />
                <span className="label-tag">Begin Here</span>
              </div>
              <h2 className="font-serif text-3xl leading-tight text-charcoal-800 md:text-5xl">
                Request a Private Tampa Bay Home Valuation
              </h2>
              <p className="mt-5 max-w-2xl text-[15px] leading-relaxed text-stone-500 md:text-base">
                Share the property details once, and Gregg will review your home
                with local market context, comparable activity, and strategic
                guidance for your timeline.
              </p>

              <div className="mt-7 grid gap-3 sm:grid-cols-3">
                {[
                  "Personally reviewed",
                  "Private and no pressure",
                  "Useful now or later",
                ].map((item) => (
                  <div key={item} className="flex items-center gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-gold-500" />
                    <span className="text-sm text-stone-600">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex flex-col gap-5 lg:items-end">
              <a
                href="#hero-form"
                data-cta="final"
                onClick={() => trackEvent("final_cta_click")}
                className="luxury-button inline-flex w-full items-center justify-center text-center sm:w-auto"
              >
                Start My Valuation
              </a>

              {GREGG_PHONE && (
                <a
                  href={`tel:${GREGG_PHONE}`}
                  onClick={() =>
                    trackEvent("phone_click", { location: "final_cta" })
                  }
                  className="inline-flex items-center justify-center gap-2 text-sm text-stone-500 transition-colors hover:text-gold-600 lg:justify-end"
                >
                  <svg
                    width="13"
                    height="13"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 10.81 19.79 19.79 0 01.14 2.18 2 2 0 012.11 0h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L6.09 7.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 14.92z" />
                  </svg>
                  Or call {GREGG_PHONE}
                </a>
              )}

              <div className="text-left lg:text-right">
                <Link
                  href="/"
                  aria-label="Keller Williams St Pete Realty home"
                  className="inline-block"
                >
                  <KWLogo height={28} variant="dark" />
                </Link>
                <p className="mt-3 text-xs leading-relaxed text-stone-400">
                  360 Central Ave, Ste 600 · St. Petersburg, FL 33701
                  <br />
                  FL License #3617329 · REALTOR®
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
