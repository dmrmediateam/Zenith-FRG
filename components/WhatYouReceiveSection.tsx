const DELIVERABLES = [
  {
    number: "01",
    title: "Tailored Pricing Guidance",
    body: "A carefully considered price range that accounts for your home's specific attributes, comparable luxury sales, and current buyer demand — not a generic algorithm output.",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <circle cx="12" cy="12" r="10" />
        <line x1="12" y1="8" x2="12" y2="12" />
        <line x1="12" y1="16" x2="12.01" y2="16" />
      </svg>
    ),
  },
  {
    number: "02",
    title: "Market Positioning Insight",
    body: "Understand where your property stands among comparable luxury listings — what's selling, what's sitting, and how strategic positioning can influence buyer perception.",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
      </svg>
    ),
  },
  {
    number: "03",
    title: "Neighborhood-Specific Context",
    body: "Insight into your specific submarket: recent activity, days-on-market trends, price-per-square-foot at the luxury tier, and buyer profile in your area.",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
        <polyline points="9 22 9 12 15 12 15 22" />
      </svg>
    ),
  },
  {
    number: "04",
    title: "Strategic Next-Step Guidance",
    body: "Whether you're ready to list or simply planning ahead, you'll receive clear, honest guidance on timing, preparation, and the most effective path forward for your situation.",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <circle cx="12" cy="12" r="10" />
        <polyline points="12 8 16 12 12 16" />
        <line x1="8" y1="12" x2="16" y2="12" />
      </svg>
    ),
  },
];

export default function WhatYouReceiveSection() {
  return (
    <section className="bg-cream-100 py-24 md:py-32">
      <div className="max-w-7xl mx-auto px-6 md:px-10">

        {/* Header */}
        <div className="text-center mb-16 md:mb-20">
          <div className="flex items-center justify-center gap-4 mb-6">
            <span className="block w-10 h-px bg-gold-400" />
            <span className="label-tag">The Valuation</span>
            <span className="block w-10 h-px bg-gold-400" />
          </div>
          <h2 className="section-heading mb-5 text-balance">
            What You Receive
          </h2>
          <p className="section-subheading max-w-xl mx-auto">
            A private overview of your home&apos;s value — thoughtfully prepared
            and delivered with strategic context, not just a number.
          </p>
        </div>

        {/* Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-px bg-stone-100">
          {DELIVERABLES.map((item) => (
            <div
              key={item.number}
              className="bg-white p-8 md:p-9 flex flex-col group hover:bg-cream-50 transition-colors duration-300"
            >
              {/* Number + icon row */}
              <div className="flex items-start justify-between mb-6">
                <span className="font-serif text-4xl text-stone-100 select-none leading-none">
                  {item.number}
                </span>
                <span className="text-gold-400 group-hover:text-gold-500 transition-colors duration-200">
                  {item.icon}
                </span>
              </div>

              {/* Gold rule */}
              <span className="block w-8 h-px bg-gold-300 mb-5" />

              {/* Title */}
              <h3 className="font-serif text-xl text-charcoal-800 mb-4 leading-snug">
                {item.title}
              </h3>

              {/* Body */}
              <p className="text-stone-500 text-[14px] leading-relaxed font-sans flex-1">
                {item.body}
              </p>
            </div>
          ))}
        </div>

        {/* Bottom note */}
        <p className="text-center text-stone-400 text-xs font-sans tracking-wide mt-10">
          Delivered personally within two to three business days.
        </p>
      </div>
    </section>
  );
}
