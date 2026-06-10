"use client";

import Link from "next/link";
import KWLogo from "./KWLogo";
import { trackEvent } from "@/lib/analytics";

export default function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-cream-100/95 backdrop-blur-sm border-b border-stone-100">
      <div className="max-w-7xl mx-auto px-6 md:px-10 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-4" aria-label="Gregg Rossman home">
          <span className="font-serif text-lg text-charcoal-800 tracking-wide">
            Gregg Rossman
          </span>
          <span className="hidden sm:block w-px h-4 bg-stone-200" />
          <span className="label-tag text-stone-400 hidden sm:block">
            St. Petersburg, FL
          </span>
        </Link>

        <div className="flex items-center gap-4">
          <a
            href="#hero-form"
            data-cta="header"
            onClick={() => trackEvent("header_cta_click")}
            className="hidden sm:inline-flex items-center justify-center border border-gold-500 px-4 py-2 text-[11px] font-sans font-medium uppercase tracking-widest text-gold-600 transition-colors hover:bg-gold-500 hover:text-white"
          >
            Get Valuation
          </a>
          <Link href="/" aria-label="Keller Williams St Pete Realty home">
            <KWLogo height={26} variant="dark" />
          </Link>
        </div>
      </div>
    </header>
  );
}
