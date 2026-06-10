import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { ThankYouAnalytics } from "@/components/AnalyticsEvents";

export const metadata: Metadata = {
  title: "Thank You | Gregg Rossman",
  description: "We have received your message.",
  robots: { index: false, follow: false },
};

export default function ThankYouDisqualifiedPage() {
  return (
    <>
      <ThankYouAnalytics outcome="disqualified" />
      <Header />
      <main className="min-h-[70vh] bg-cream-100 pt-28 pb-20 px-6">
        <div className="max-w-xl mx-auto text-center">
          <div className="w-12 h-px bg-gold-500 mx-auto mb-8" />
          <h1 className="font-serif text-3xl md:text-4xl text-charcoal-800 mb-4 text-balance">
            Thank You
          </h1>
          <p className="text-stone-500 text-lg leading-relaxed font-sans font-light mb-10">
            We appreciate you reaching out. Based on the information provided,
            we may not be the best fit at this time — but we are grateful you
            considered us. If your plans change, you are always welcome to
            return.
          </p>
          <Link
            href="/"
            className="inline-block luxury-button-outline px-10 max-w-xs w-full sm:w-auto text-center"
          >
            Back to Home
          </Link>
        </div>
      </main>
      <Footer />
    </>
  );
}
