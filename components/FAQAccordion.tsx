"use client";

import { useState } from "react";

interface FAQItem {
  question: string;
  answer: string;
}

const FAQS: FAQItem[] = [
  {
    question: "How is this different from a Zestimate or online estimate?",
    answer:
      "Automated tools pull from broad public data: sold comps, square footage, tax records. They cannot account for the nuances that drive Tampa Bay luxury pricing. Waterfront premiums, specific finishes, flood zone context, and qualified buyer demand are all factors an algorithm will miss. Gregg reviews each property personally and delivers a more strategic picture of where your home stands in today's Gulf Coast market.",
  },
  {
    question: "Do I have to be ready to sell right now?",
    answer:
      "Not at all. Many homeowners along the Gulf Coast request a valuation for financial planning, estate considerations, or simply to understand where their property stands today. There is no pressure or obligation to list. This process is designed to give you clarity whenever you need it.",
  },
  {
    question: "Will a real person actually review my property?",
    answer:
      "Yes. Gregg personally reviews every request. Your property will be evaluated with attention to its specific attributes, its position in the St. Petersburg or Tampa Bay market, and the broader context of current buyer demand at your price point.",
  },
  {
    question: "Is this confidential and is there any cost?",
    answer:
      "Your information is shared only with Gregg and never sold or used for marketing. There is no fee and no obligation. This is a complimentary service for homeowners who want a more informed perspective on their property's value in today's Tampa Bay market.",
  },
  {
    question: "How quickly will I hear back?",
    answer:
      "You can expect a personal response within one business day. A full valuation overview is typically delivered within two to three business days.",
  },
];

export default function FAQAccordion() {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <div className="divide-y divide-stone-100">
      {FAQS.map((faq, i) => (
        <div key={i}>
          <button
            onClick={() => setOpen(open === i ? null : i)}
            className="w-full flex items-start justify-between text-left py-6 gap-6 group"
            aria-expanded={open === i}
          >
            <span className="font-serif text-lg text-charcoal-700 group-hover:text-charcoal-900 transition-colors duration-200 leading-snug">
              {faq.question}
            </span>
            <span
              className={`flex-shrink-0 mt-1 w-5 h-5 flex items-center justify-center border border-stone-200 text-stone-400 group-hover:border-gold-400 group-hover:text-gold-500 transition-all duration-200 ${
                open === i ? "rotate-45 border-gold-400 text-gold-500" : ""
              }`}
              aria-hidden="true"
            >
              <svg
                width="10"
                height="10"
                viewBox="0 0 10 10"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
              >
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
            <p className="pb-7 text-stone-500 leading-relaxed text-[15px] font-sans pr-8">
              {faq.answer}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}
