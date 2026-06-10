"use client";

import Image from "next/image";
import KWLogo from "./KWLogo";
import { trackEvent } from "@/lib/analytics";

export default function TrustSection() {
  return (
    <section className="bg-white py-24 md:py-32 border-t border-stone-100">
      <div className="max-w-7xl mx-auto px-6 md:px-10">

        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">

          {/* Left — Photo + credential marks */}
          <div className="flex flex-col items-center lg:items-start">
            {/* Headshot */}
            <div className="relative w-48 h-48 md:w-64 md:h-64 mb-8">
              {/* Outer decorative ring */}
              <div className="absolute -inset-3 rounded-full border border-gold-200" />
              {/* Inner image — inline critical styles prevent SSR layout shift on circular crop */}
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  overflow: "hidden",
                  borderRadius: "9999px",
                }}
              >
                <Image
                  src="/Gregg%20Rossman/Tezza-0534%20Gregg%20Rossman.jpeg"
                  alt="Gregg Rossman — Luxury Real Estate Advisor"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 192px, 256px"
                />
              </div>
            </div>

            {/* Name + title */}
            <div className="text-center lg:text-left mb-6">
              <h3 className="font-serif text-2xl text-charcoal-800 mb-1">
                Gregg Rossman
              </h3>
              <p className="text-sm text-stone-400 font-sans tracking-wide uppercase">
                Keller Williams St Pete Realty
              </p>
              <p className="text-xs text-stone-300 font-sans mt-1">
                FL License #3617329 &nbsp;·&nbsp; REALTOR®
              </p>
            </div>

            {/* Tagline */}
            <p className="text-stone-400 text-sm font-sans italic text-center lg:text-left leading-relaxed max-w-xs">
              Personal guidance. Market context.{" "}
              <br className="hidden lg:block" />A more tailored valuation process.
            </p>

            {/* KW logo */}
            <div className="mt-8">
              <KWLogo height={28} variant="dark" />
            </div>

            {/* Brokerage address */}
            <div className="mt-4 text-center lg:text-left">
              <p className="text-xs text-stone-400 font-sans leading-relaxed">
                360 Central Ave, Ste 600 &nbsp;·&nbsp; St. Petersburg, FL 33701
              </p>
            </div>
          </div>

          {/* Right — Bio */}
          <div>
            <div className="flex items-center gap-4 mb-8">
              <span className="block w-10 h-px bg-gold-500" />
              <span className="label-tag">About Gregg</span>
            </div>

            <h2 className="font-serif text-4xl md:text-5xl text-charcoal-800 leading-tight mb-8 text-balance">
              A Thoughtful Advisor{" "}
              <span className="italic text-charcoal-600">
                for Discerning Sellers
              </span>
            </h2>

            <div className="space-y-5 text-stone-500 leading-relaxed text-[15px] font-sans font-light">
              <p>
                I&rsquo;m Gregg Rossman, a dedicated real estate professional
                based in St. Petersburg, Florida, specializing in luxury resale
                single-family homes. With a deep understanding of the Tampa Bay
                market and a passion for connecting discerning buyers and
                sellers, I strive to deliver a premier level of service marked
                by precision, trust, and results.
              </p>
              <p>
                My commitment to showcasing the finest properties and
                negotiating top value has made me a go-to resource for clients
                seeking exceptional living and investment opportunities along
                Florida&rsquo;s Gulf Coast.
              </p>
            </div>

            {/* Feature bullets */}
            <div className="mt-10 grid sm:grid-cols-2 gap-4">
              {[
                "Luxury resale single-family specialist",
                "Deep Tampa Bay market knowledge",
                "Strategic Gulf Coast pricing guidance",
                "Personal, direct communication",
              ].map((item) => (
                <div key={item} className="flex items-start gap-3">
                  <span className="mt-1.5 w-1 h-1 rounded-full bg-gold-500 flex-shrink-0" />
                  <span className="text-charcoal-600 text-sm font-sans leading-relaxed">
                    {item}
                  </span>
                </div>
              ))}
            </div>

            {/* CTA */}
            <div className="mt-10">
              <a
                href="#hero-form"
                data-cta="trust"
                onClick={() => trackEvent("trust_cta_click")}
                className="inline-block luxury-button-outline"
              >
                Request a Private Valuation
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
