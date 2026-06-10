const NUANCES = [
  {
    title: "Gulf Coast Micro-Markets",
    body: "From Snell Isle to Old Northeast to St. Pete Beach — Tampa Bay luxury pricing is hyper-local in ways no national algorithm can capture.",
  },
  {
    title: "Renovations & Finish Quality",
    body: "Impact-rated windows, updated kitchens, spa-caliber primary suites — premium finishes add value that square footage alone will never reflect.",
  },
  {
    title: "Waterfront & View Premiums",
    body: "Direct water access, bay views, and coastal positioning carry their own premium — one that requires a practiced, local eye to accurately assess.",
  },
  {
    title: "Qualified Buyer Demand",
    body: "Who is actively buying Tampa Bay luxury homes right now? Understanding active demand shapes how and when your home should enter the market.",
  },
  {
    title: "Luxury Pricing Strategy",
    body: "Along the Gulf Coast, pricing is not just about comparables. It's about positioning, timing, and presenting your property to the right buyer.",
  },
  {
    title: "Flood Zone & Insurance Context",
    body: "In coastal Florida, flood zone classification and insurance costs are real pricing factors — experienced sellers plan for these from the start.",
  },
];

export default function DifferentiationSection() {
  return (
    <section className="bg-charcoal-800 py-24 md:py-32 relative overflow-hidden">
      {/* Subtle texture overlay */}
      <div
        className="absolute inset-0 pointer-events-none opacity-5"
        aria-hidden="true"
        style={{
          backgroundImage:
            "repeating-linear-gradient(0deg, transparent, transparent 79px, rgba(255,255,255,0.03) 80px), repeating-linear-gradient(90deg, transparent, transparent 79px, rgba(255,255,255,0.03) 80px)",
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-10">
        <div className="grid lg:grid-cols-[480px_1fr] gap-16 lg:gap-24 items-start">

          {/* Left — heading + context */}
          <div>
            <div className="flex items-center gap-4 mb-8">
              <span className="block w-10 h-px bg-gold-500" />
              <span className="label-tag text-gold-500">Why It Matters</span>
            </div>

            <h2 className="font-serif text-4xl md:text-5xl text-white leading-tight mb-8 text-balance">
              What Automated Estimates{" "}
              <span className="italic text-gold-300">Miss</span> About Luxury
              Homes
            </h2>

            <div className="space-y-5 text-stone-300 leading-relaxed text-[15px] font-sans font-light">
              <p>
                Platforms like Zillow and Redfin aggregate broad data and
                produce a number. But Tampa Bay luxury real estate doesn&rsquo;t
                operate on broad data. It operates on nuance — the kind that
                only comes from deep local knowledge and direct observation of
                the Gulf Coast market.
              </p>
              <p>
                Your home is not a data point. It is a specific property, in a
                specific neighborhood, with attributes that appeal to a specific
                buyer. An algorithm cannot hold that context. A dedicated local
                advisor can.
              </p>
            </div>

            <div className="mt-10 pt-10 border-t border-charcoal-600">
              <p className="text-stone-400 text-sm font-sans italic leading-relaxed">
                &ldquo;The most consequential pricing decision a luxury seller makes
                is the first one. Along Florida&rsquo;s Gulf Coast, getting it
                right requires more than an algorithm.&rdquo;
              </p>
            </div>
          </div>

          {/* Right — nuance grid */}
          <div className="grid sm:grid-cols-2 gap-px bg-charcoal-600">
            {NUANCES.map((item, i) => (
              <div
                key={i}
                className="bg-charcoal-800 hover:bg-charcoal-700 transition-colors duration-200 p-7 group"
              >
                <div className="flex items-start gap-3 mb-3">
                  <span className="block w-1.5 h-1.5 rounded-full bg-gold-500 mt-2 flex-shrink-0 group-hover:scale-110 transition-transform duration-200" />
                  <h3 className="font-serif text-white text-lg leading-snug">
                    {item.title}
                  </h3>
                </div>
                <p className="text-stone-400 text-sm leading-relaxed font-sans pl-4">
                  {item.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
