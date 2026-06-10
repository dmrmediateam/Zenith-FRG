"use client";

import { useEffect, useState } from "react";
import { trackEvent } from "@/lib/analytics";

const VIMEO_ID = process.env.NEXT_PUBLIC_VIMEO_ID ?? "1193352797";
const VIMEO_SRC = `https://player.vimeo.com/video/${VIMEO_ID}?background=1&autoplay=1&loop=1&byline=0&title=0&muted=1`;

export default function Hero() {
  const [reducedMotion, setReducedMotion] = useState(false);
  const [videoLoaded, setVideoLoaded] = useState(false);

  useEffect(() => {
    const mql = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(mql.matches);
    const handler = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    mql.addEventListener("change", handler);
    return () => mql.removeEventListener("change", handler);
  }, []);

  useEffect(() => {
    if (!reducedMotion) {
      trackEvent("video_play", { video_id: VIMEO_ID });
      setVideoLoaded(true);
    }
  }, [reducedMotion]);

  return (
    <section
      id="hero"
      className="relative flex min-h-[100svh] flex-col"
      aria-labelledby="hero-heading"
    >
      <div className="absolute inset-0 z-0 overflow-hidden bg-zenith-charcoal">
        {!reducedMotion ? (
          <iframe
            src={VIMEO_SRC}
            title="Zenith Milwaukee — Skyline"
            className="pointer-events-none absolute left-1/2 top-1/2 h-[120vh] w-[120vw] -translate-x-1/2 -translate-y-1/2 lg:h-[60vw] lg:min-h-[120vh] lg:w-[120vw]"
            allow="autoplay; fullscreen"
          />
        ) : null}

        {(reducedMotion || !videoLoaded) && (
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(160deg, #3a3a30 0%, #262522 60%, #1a1916 100%)",
            }}
            aria-hidden="true"
          />
        )}

        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to bottom, rgba(38,37,34,0.45) 0%, rgba(38,37,34,0.65) 100%)",
          }}
          aria-hidden="true"
        />
      </div>

      <div className="relative z-10 flex flex-1 flex-col items-center justify-center px-5 pt-16 text-center md:px-8">
        <p className="mb-5 font-sub text-sm font-medium uppercase tracking-[0.1em] text-zenith-cream/90">
          Milwaukee &mdash; 701 E Kilbourn Avenue
        </p>

        <h1
          id="hero-heading"
          className="font-serif text-6xl tracking-[0.1em] text-zenith-cream sm:tracking-[0.15em] sm:text-8xl md:text-9xl"
        >
          ZENITH
        </h1>

        <p className="mt-6 font-sub text-lg text-zenith-cream sm:text-xl md:text-2xl">
          Milwaukee&rsquo;s first new lifestyle condominium tower in a generation.
        </p>

        <p className="mx-auto mt-5 max-w-2xl text-balance text-base leading-relaxed text-zenith-cream/80">
          226 residences, including 3 penthouses.
        </p>

        <div className="mt-10 flex flex-col gap-4 sm:flex-row">
          <a
            href="#contact"
            data-cta="hero"
            onClick={() => trackEvent("hero_cta_click", { location: "hero" })}
            className="luxury-button"
          >
            Request Private Information
          </a>
          <a
            href="#development"
            data-cta="hero-secondary"
            className="luxury-button-outline"
          >
            Explore Residences ↓
          </a>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="relative z-10 flex justify-center pb-8">
        <svg
          className="h-6 w-6 animate-bounce text-zenith-cream/70 motion-reduce:animate-none"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <polyline points="6 9 12 15 18 9" />
        </svg>
      </div>
    </section>
  );
}
