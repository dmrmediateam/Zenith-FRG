"use client";

import Image from "next/image";
import ValuationForm from "./ValuationForm";
import { trackEvent } from "@/lib/analytics";

/** Luxury residence — full-bleed hero background */
const HERO_IMAGE = "/Gregg%20Rossman/Living%20Space%20VS%20Gregg%20Rossman.jpg";

/**
 * Gregg's direct phone number. Set this to enable the clickable phone link
 * in the hero profile card. Leave empty to hide it.
 * Example: "(727) 555-0100"
 */
const GREGG_PHONE = "954-218-1433";

export default function HeroSection() {
  return (
    <section
      id="hero"
      className="relative flex min-h-[100svh] flex-col pt-16"
      aria-labelledby="hero-heading"
    >
      <div className="absolute inset-0 z-0">
        <Image
          src={HERO_IMAGE}
          alt=""
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(160deg, rgba(30,18,6,0.78) 0%, rgba(20,14,4,0.72) 50%, rgba(10,8,4,0.82) 100%)",
          }}
          aria-hidden="true"
        />
      </div>

      <div className="relative z-10 flex flex-col items-center px-5 pb-24 pt-8 md:px-8 md:pb-16 md:pt-12">
        <div className="w-full max-w-5xl">
          <div className="mx-auto mb-5 max-w-3xl text-center md:mb-7">
            <div className="mx-auto mb-4 flex justify-center">
              <span className="gold-rule" />
            </div>
            <p className="label-tag mb-3 text-gold-300">
              Private Home Valuation · Tampa Bay
            </p>
            <h1
              id="hero-heading"
              className="font-serif text-3xl leading-tight tracking-tight text-balance text-white sm:text-4xl md:text-[2.5rem] md:leading-[1.12]"
            >
              Get a More Precise Value for Your Luxury Home
            </h1>
          </div>

          {/* Two-card layout: profile card (thinner left) + form card (wider right) */}
          <div className="grid items-stretch gap-4 lg:grid-cols-[0.82fr_1.18fr]">

            {/* Profile / trust card — glass treatment */}
            <div className="order-2 flex h-full flex-col lg:order-1">
              <div className="h-0.5 bg-gradient-to-r from-gold-300 via-gold-500 to-gold-300" />
              <div
                className="flex-1 p-5 text-center backdrop-blur-md lg:p-7"
                style={{
                  background: "rgba(20, 15, 8, 0.45)",
                  border: "1px solid rgba(184, 150, 62, 0.25)",
                  boxShadow:
                    "0 8px 32px rgba(0,0,0,0.45), inset 0 1px 0 rgba(255,255,255,0.06)",
                }}
              >
                {/* Headshot — explicit width/height prevent full-width flash on load */}
                <div
                  className="mx-auto mb-4"
                  style={{
                    width: "104px",
                    height: "104px",
                    overflow: "hidden",
                    borderRadius: "9999px",
                    flexShrink: 0,
                  }}
                >
                  <Image
                    src="/Gregg%20Rossman/Tezza-0534%20Gregg%20Rossman.jpeg"
                    alt="Gregg Rossman"
                    width={104}
                    height={104}
                    className="block object-cover"
                    priority
                  />
                </div>

                <p className="label-tag mb-2 text-gold-300">
                  Personally Reviewed By
                </p>
                <h2 className="font-serif text-2xl text-white">
                  Gregg Rossman
                </h2>
                <p className="mt-2 text-xs uppercase tracking-widest text-stone-300">
                  Keller Williams St Pete Realty · REALTOR®
                </p>
                <p className="mx-auto mt-4 max-w-xs text-sm leading-relaxed text-stone-200">
                  Local guidance for Tampa Bay and Gulf Coast homeowners who
                  want context, pricing nuance, and a private read on
                  today&apos;s market.
                </p>

                <div className="mt-5 space-y-3 text-left">
                  {[
                    "Not just an automated estimate",
                    "Useful whether selling now or planning ahead",
                    "Private review with no pressure to list",
                  ].map((item) => (
                    <div key={item} className="flex items-start gap-3">
                      <span className="mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-gold-400" />
                      <span className="text-sm leading-relaxed text-stone-200">
                        {item}
                      </span>
                    </div>
                  ))}
                </div>

                {GREGG_PHONE && (
                  <div
                    className="mt-5 pt-4"
                    style={{ borderTop: "1px solid rgba(255,255,255,0.1)" }}
                  >
                    <a
                      href={`tel:${GREGG_PHONE}`}
                      onClick={() =>
                        trackEvent("phone_click", {
                          location: "hero_profile_card",
                        })
                      }
                      className="block transition-opacity hover:opacity-80"
                    >
                      <div
                        className="p-4 text-left"
                        style={{
                          border: "1px solid rgba(184, 150, 62, 0.3)",
                          background: "rgba(255, 255, 255, 0.05)",
                        }}
                      >
                        <p className="label-tag mb-2 text-gold-400">
                          Prefer to talk first?
                        </p>
                        <p className="font-sans text-xl font-light tracking-wide text-white">
                          {GREGG_PHONE}
                        </p>
                      </div>
                    </a>
                  </div>
                )}
              </div>
            </div>

            {/* Form card */}
            <div className="order-1 flex h-full flex-col lg:order-2">
              <div className="h-0.5 bg-gradient-to-r from-gold-300 via-gold-500 to-gold-300" />
              <div
                className="flex-1 border border-stone-200 bg-cream-50 p-5 md:p-7"
                style={{
                  boxShadow:
                    "0 4px 6px -1px rgba(0,0,0,0.12), 0 24px 48px -12px rgba(0,0,0,0.35)",
                }}
              >
                {/* Mobile-only mini agent header (profile card is below on mobile) */}
                <div className="mb-4 flex items-center gap-3 border-b border-stone-100 pb-4 lg:hidden">
                  <div
                    className="relative flex-shrink-0"
                    style={{
                      position: "relative",
                      width: "56px",
                      height: "56px",
                      overflow: "hidden",
                      borderRadius: "9999px",
                    }}
                  >
                    <Image
                      src="/gregg-rossman.webp"
                      alt="Gregg Rossman"
                      fill
                      sizes="56px"
                      className="object-cover"
                      priority
                    />
                  </div>
                  <div className="text-left">
                    <p className="text-[10px] font-medium uppercase tracking-widest text-gold-600">
                      Personally Reviewed By
                    </p>
                    <p className="font-serif text-lg leading-tight text-charcoal-800">
                      Gregg Rossman
                    </p>
                    <p className="text-xs text-stone-500">
                      Keller Williams St Pete Realty · REALTOR®
                    </p>
                  </div>
                </div>

                <div className="mb-4 text-center">
                  <h2 className="font-serif text-2xl text-charcoal-800">
                    Start With the Property
                  </h2>
                  <p className="mt-2 text-sm text-stone-500">
                    Enter the address first. Contact details come at the end.
                  </p>
                </div>
                <ValuationForm id="hero-form" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
