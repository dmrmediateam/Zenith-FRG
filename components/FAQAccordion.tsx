"use client";

import { useState } from "react";

interface FAQItem {
  question: string;
  answer: string;
}

const FAQS: FAQItem[] = [
  {
    question: "When can I tour Zenith?",
    answer:
      "The Zenith sales center opens in conjunction with the MLS launch on June 23, 2026. Priority tours are available to registered inquiries before the public launch.",
  },
  {
    question: "How many units are available?",
    answer:
      "Zenith offers 226 total residences, including 3 penthouses in the initial release, with up to three additional penthouse releases based on demand.",
  },
  {
    question: "What is the price range?",
    answer:
      "Residences begin around $400k, with penthouses starting above $1.5M. The full range across all unit types is $400k to $3M.",
  },
  {
    question: "Is financing available?",
    answer:
      "Yes. The Falk·Ruvin·Gallagher team can connect you with preferred lenders experienced in new-development condominium financing in Wisconsin.",
  },
  {
    question: "What makes Zenith different from other Milwaukee condominiums?",
    answer:
      "Zenith is Milwaukee's first ground-up new-construction luxury condominium tower in a generation — not a conversion, not a renovation. It represents a purpose-built lifestyle address designed for how people want to live today.",
  },
];

export default function FAQAccordion() {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <div className="divide-y divide-zenith-sand/20">
      {FAQS.map((faq, i) => (
        <div key={i}>
          <button
            onClick={() => setOpen(open === i ? null : i)}
            className="flex w-full items-start justify-between gap-6 py-6 text-left group"
            aria-expanded={open === i}
          >
            <span className="font-serif text-lg leading-snug text-zenith-charcoal transition-colors duration-200 group-hover:text-zenith-bronze">
              {faq.question}
            </span>
            <span
              className={`mt-1 flex h-5 w-5 flex-shrink-0 items-center justify-center border border-zenith-sand/40 text-zenith-sand transition-all duration-200 group-hover:border-zenith-olive group-hover:text-zenith-olive ${
                open === i ? "rotate-45 border-zenith-olive text-zenith-olive" : ""
              }`}
              aria-hidden="true"
            >
              <svg width="10" height="10" viewBox="0 0 10 10" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
                <line x1="5" y1="0" x2="5" y2="10" />
                <line x1="0" y1="5" x2="10" y2="5" />
              </svg>
            </span>
          </button>

          <div
            className={`overflow-hidden transition-all duration-300 ease-in-out ${
              open === i ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
            }`}
          >
            <p className="pb-7 pr-8 text-[15px] leading-relaxed text-zenith-charcoal/70 font-sans">
              {faq.answer}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}
