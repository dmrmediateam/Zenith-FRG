/*
 * TESTIMONIALS
 * Replace the placeholder cards below with approved client testimonials.
 * Each card accepts: quote, name, detail (e.g. "Seller · Cherry Hills Village")
 * Do not publish placeholder text — this section should be hidden until
 * real testimonials are approved.
 */

interface Testimonial {
  quote: string;
  name: string;
  detail: string;
  isPlaceholder?: boolean;
}

// TODO: Replace all entries with real, approved testimonials from Gregg's clients
const TESTIMONIALS: Testimonial[] = [
  {
    quote:
      "[ Approved client testimonial will appear here. Replace with a real quote that speaks to Gregg's market knowledge, discretion, or valuation expertise. ]",
    name: "Client Name",
    detail: "Seller · [Neighborhood]",
    isPlaceholder: true,
  },
  {
    quote:
      "[ Approved client testimonial will appear here. Ideal quotes address the private process, precision of guidance, or confidence the valuation provided. ]",
    name: "Client Name",
    detail: "Seller · [Neighborhood]",
    isPlaceholder: true,
  },
  {
    quote:
      "[ Approved client testimonial will appear here. Consider quotes from sellers who chose Gregg over automated tools or appreciated the strategic depth of his approach. ]",
    name: "Client Name",
    detail: "Seller · [Neighborhood]",
    isPlaceholder: true,
  },
];

export default function TestimonialsSection() {
  return (
    <section className="bg-cream-200 py-24 md:py-32 border-t border-stone-100">
      <div className="max-w-7xl mx-auto px-6 md:px-10">

        {/* Header */}
        <div className="text-center mb-16 md:mb-20">
          <div className="flex items-center justify-center gap-4 mb-6">
            <span className="block w-10 h-px bg-gold-400" />
            <span className="label-tag">Client Experiences</span>
            <span className="block w-10 h-px bg-gold-400" />
          </div>
          <h2 className="section-heading mb-4 text-balance">
            What Sellers Say
          </h2>
          <p className="section-subheading max-w-md mx-auto">
            Trusted by homeowners who value precision, discretion, and a more
            personal approach.
          </p>
        </div>

        {/* Cards */}
        <div className="grid md:grid-cols-3 gap-6 md:gap-8">
          {TESTIMONIALS.map((t, i) => (
            <TestimonialCard key={i} {...t} />
          ))}
        </div>

        {/* Trust bar */}
        <div className="mt-16 pt-14 border-t border-stone-200 flex flex-wrap items-center justify-center gap-8 md:gap-16">
          {[
            { label: "Private Process", sub: "Discretion guaranteed" },
            { label: "Personal Review", sub: "No automated reports" },
            { label: "No Obligation", sub: "Complimentary valuation" },
          ].map(({ label, sub }) => (
            <div key={label} className="text-center">
              <p className="font-serif text-charcoal-700 text-base mb-0.5">{label}</p>
              <p className="label-tag text-stone-300">{sub}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function TestimonialCard({ quote, name, detail, isPlaceholder }: Testimonial) {
  return (
    <div
      className={`bg-white border border-stone-100 p-8 md:p-9 flex flex-col ${
        isPlaceholder ? "opacity-50" : ""
      }`}
    >
      {/* Gold quote mark */}
      <div
        className="font-serif text-5xl text-gold-200 leading-none mb-5 select-none"
        aria-hidden="true"
      >
        &ldquo;
      </div>

      {/* Quote */}
      <p
        className={`text-charcoal-600 leading-relaxed flex-1 mb-7 font-sans text-[15px] ${
          isPlaceholder ? "italic text-stone-400" : ""
        }`}
      >
        {quote}
      </p>

      {/* Divider */}
      <span className="block w-8 h-px bg-stone-100 mb-5" />

      {/* Attribution */}
      <div>
        <p className="font-serif text-charcoal-800 text-base">{name}</p>
        <p className="label-tag text-stone-300 mt-1">{detail}</p>
      </div>
    </div>
  );
}
