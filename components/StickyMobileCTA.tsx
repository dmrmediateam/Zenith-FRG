"use client";

import { trackEvent } from "@/lib/analytics";

export default function StickyMobileCTA() {
  return (
    <div className="fixed inset-x-0 bottom-0 z-40 border-t border-stone-200 bg-cream-100/95 px-4 py-3 shadow-[0_-8px_24px_rgba(0,0,0,0.12)] backdrop-blur md:hidden">
      <a
        href="#hero-form"
        data-cta="sticky-mobile"
        onClick={() => trackEvent("sticky_mobile_cta_click")}
        className="luxury-button block text-center"
      >
        Start My Valuation
      </a>
    </div>
  );
}
