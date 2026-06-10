import type { Metadata } from "next";
import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import WhatYouReceiveSection from "@/components/WhatYouReceiveSection";
import ProcessSection from "@/components/ProcessSection";
import PropertyShowcaseSection from "@/components/PropertyShowcaseSection";
import TrustSection from "@/components/TrustSection";
import FAQSection from "@/components/FAQSection";
import FinalCTASection from "@/components/FinalCTASection";
import Footer from "@/components/Footer";
import StickyMobileCTA from "@/components/StickyMobileCTA";
import { LandingPageAnalytics } from "@/components/AnalyticsEvents";

export const metadata: Metadata = {
  title: "Luxury Home Valuation | Gregg Rossman — Keller Williams St Pete",
  description:
    "Get a private, strategy-driven home valuation from Gregg Rossman. Serving St. Petersburg, Tampa Bay, and Florida's Gulf Coast. More than an automated estimate.",
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "RealEstateAgent",
  name: "Gregg Rossman",
  description:
    "Luxury resale single-family home specialist serving Tampa Bay and Florida's Gulf Coast. Private, strategy-driven home valuations for discerning sellers.",
  memberOf: {
    "@type": "Organization",
    name: "Keller Williams St Pete Realty",
  },
  address: {
    "@type": "PostalAddress",
    streetAddress: "360 Central Ave, Ste 600",
    addressLocality: "St. Petersburg",
    addressRegion: "FL",
    postalCode: "33701",
    addressCountry: "US",
  },
  areaServed: [
    "St. Petersburg, FL",
    "St. Pete Beach, FL",
    "Tampa, FL",
    "Wesley Chapel, FL",
  ],
  knowsAbout: [
    "Luxury Real Estate",
    "Tampa Bay Luxury Homes",
    "Gulf Coast Properties",
    "Home Valuation",
  ],
};

export default function HomePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <LandingPageAnalytics />
      <Header />
      <main>
        <HeroSection />
        <WhatYouReceiveSection />
        <ProcessSection />
        <PropertyShowcaseSection />
        <TrustSection />
        <FAQSection />
        <FinalCTASection />
      </main>
      <StickyMobileCTA />
      <Footer />
    </>
  );
}
