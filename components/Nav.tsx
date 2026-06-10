"use client";

import Image from "next/image";
import Link from "next/link";
import { trackEvent } from "@/lib/analytics";
import { useState, useEffect } from "react";

const LINKS = [
  { href: "#development", label: "Residences" },
  { href: "#penthouses", label: "Penthouses" },
  { href: "#neighborhood", label: "The Neighborhood" },
  { href: "#contact", label: "Contact" },
];

export default function Nav() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMenuOpen]);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 backdrop-blur-md transition-all duration-300 ${
        isScrolled
          ? "border-b border-zenith-cream/10 bg-zenith-charcoal/80 shadow-md shadow-black/10"
          : "border-b border-transparent bg-transparent shadow-none"
      }`}
    >
      <div
        className={`max-w-7xl mx-auto px-6 md:px-10 flex items-center justify-between transition-all duration-300 ${
          isScrolled ? "h-14" : "h-16"
        }`}
      >
        <Link href="/" aria-label="Zenith Milwaukee home" className="flex items-center">
          <Image
            src="/images/ZxFRG Co Branded Lock Ups_ZxFRG Expanded.png"
            alt="Zenith Milwaukee, exclusively marketed by Falk Ruvin Gallagher"
            width={2000}
            height={258}
            priority
            className={`w-auto brightness-0 invert transition-all duration-300 ${
              isScrolled ? "h-7 md:h-8" : "h-9 md:h-10"
            }`}
          />
        </Link>

        <nav className="hidden md:flex items-center gap-8">
          {LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="font-sub text-xs uppercase tracking-[0.2em] text-zenith-cream hover:text-zenith-sand transition-colors"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <a
          href="#contact"
          data-cta="header"
          onClick={() => trackEvent("hero_cta_click", { location: "header" })}
          className="hidden items-center justify-center border border-zenith-cream px-4 py-2 text-[11px] font-sub font-medium uppercase tracking-[0.2em] text-zenith-cream transition-colors hover:bg-zenith-cream hover:text-zenith-charcoal md:inline-flex"
        >
          Request Info
        </a>

        <button
          type="button"
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          aria-expanded={isMenuOpen}
          onClick={() => setIsMenuOpen((open) => !open)}
          className="relative z-10 flex h-10 w-10 items-center justify-center md:hidden"
        >
          <span className="relative block h-4 w-5">
            <span
              className={`absolute left-0 block h-px w-5 bg-zenith-cream transition-all duration-300 ${
                isMenuOpen ? "top-1/2 -translate-y-1/2 rotate-45" : "top-0"
              }`}
            />
            <span
              className={`absolute left-0 top-1/2 block h-px w-5 -translate-y-1/2 bg-zenith-cream transition-opacity duration-200 ${
                isMenuOpen ? "opacity-0" : "opacity-100"
              }`}
            />
            <span
              className={`absolute left-0 block h-px w-5 bg-zenith-cream transition-all duration-300 ${
                isMenuOpen ? "top-1/2 -translate-y-1/2 -rotate-45" : "top-4"
              }`}
            />
          </span>
        </button>
      </div>

      {/* Mobile menu */}
      <div
        className={`md:hidden overflow-hidden bg-zenith-charcoal/95 backdrop-blur-md transition-all duration-300 ${
          isMenuOpen ? "max-h-screen border-t border-zenith-cream/10" : "max-h-0"
        }`}
      >
        <nav className="flex flex-col px-6 py-6">
          {LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setIsMenuOpen(false)}
              className="border-b border-zenith-cream/10 py-4 font-sub text-sm uppercase tracking-[0.2em] text-zenith-cream transition-colors hover:text-zenith-sand"
            >
              {link.label}
            </a>
          ))}
          <a
            href="#contact"
            data-cta="header-mobile"
            onClick={() => {
              trackEvent("hero_cta_click", { location: "header_mobile" });
              setIsMenuOpen(false);
            }}
            className="mt-6 inline-flex items-center justify-center border border-zenith-cream px-4 py-3 text-[11px] font-sub font-medium uppercase tracking-[0.2em] text-zenith-cream transition-colors hover:bg-zenith-cream hover:text-zenith-charcoal"
          >
            Request Info
          </a>
        </nav>
      </div>
    </header>
  );
}
