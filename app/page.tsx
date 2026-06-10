import type { Metadata } from "next";
import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import StatBar from "@/components/StatBar";
import DevelopmentSection from "@/components/DevelopmentSection";
import ResidencesGrid from "@/components/ResidencesGrid";
import OpportunitySection from "@/components/OpportunitySection";
import LeadFormSection from "@/components/LeadFormSection";
import MapSection from "@/components/MapSection";
import TeamSection from "@/components/TeamSection";
import FAQSection from "@/components/FAQSection";
import Footer from "@/components/Footer";
import { LandingPageAnalytics, ScrollReveal } from "@/components/AnalyticsEvents";

export const metadata: Metadata = {
  title: "Zenith Milwaukee | 701 E Kilbourn Avenue | New Luxury Condominiums",
  description:
    "Zenith is Milwaukee's first new luxury condominium tower in a generation. 226 residences from $400k at 701 E Kilbourn Avenue. Exclusively marketed by Falk·Ruvin·Gallagher, Keller Williams.",
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "ApartmentComplex",
  name: "Zenith",
  description:
    "Milwaukee's first new luxury condominium tower in a generation. 226 residences, including 3 penthouses, from $400k to $3M.",
  address: {
    "@type": "PostalAddress",
    streetAddress: "701 E Kilbourn Ave",
    addressLocality: "Milwaukee",
    addressRegion: "WI",
    postalCode: "53202",
    addressCountry: "US",
  },
  numberOfUnits: 226,
};

export default function HomePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <LandingPageAnalytics />
      <ScrollReveal />
      <Nav />
      <main>
        <Hero />
        <StatBar />
        <DevelopmentSection />
        <ResidencesGrid />
        <OpportunitySection />
        <LeadFormSection />
        <MapSection />
        <TeamSection />
        <FAQSection />
      </main>
      <Footer />
    </>
  );
}
