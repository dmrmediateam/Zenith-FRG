import Image from "next/image";

const PROPERTIES = [
  {
    src: "/Gregg%20Rossman/MW-3%20Gregg%20Rossman.jpg",
    alt: "Luxury residence — exterior architecture",
    caption: "Tampa Bay Gulf Coast",
  },
  {
    src: "/Gregg%20Rossman/MW-10%20Gregg%20Rossman.jpg",
    alt: "Luxury residence — interior living space",
    caption: "St. Petersburg",
  },
  {
    src: "/Gregg%20Rossman/MW-22%20Gregg%20Rossman.jpg",
    alt: "Luxury residence — premium finishes",
    caption: "Waterfront Living",
  },
  {
    src: "/Gregg%20Rossman/MW-35%20Gregg%20Rossman.jpg",
    alt: "Luxury residence — outdoor entertaining",
    caption: "Gulf Coast Properties",
  },
];

export default function PropertyShowcaseSection() {
  return (
    <section
      className="bg-charcoal-900 py-20 md:py-28 overflow-hidden"
      style={{ background: "linear-gradient(160deg, #141210 0%, #1E1A16 100%)" }}
      aria-labelledby="showcase-heading"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        {/* Header */}
        <div className="text-center mb-12 md:mb-16">
          <div className="flex items-center justify-center gap-4 mb-5">
            <span className="block w-10 h-px bg-gold-500" />
            <span className="label-tag text-gold-300">Portfolio</span>
            <span className="block w-10 h-px bg-gold-500" />
          </div>
          <h2
            id="showcase-heading"
            className="font-serif text-3xl md:text-4xl text-white leading-tight"
          >
            Homes Gregg Has{" "}
            <span className="font-serif italic text-gold-300">Represented</span>
          </h2>
          <p className="mt-4 text-stone-400 text-sm md:text-base max-w-xl mx-auto font-sans leading-relaxed">
            A curated selection of luxury properties across Tampa Bay and
            Florida&rsquo;s Gulf Coast.
          </p>
        </div>

        {/* Photo grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
          {PROPERTIES.map((property, i) => (
            <div
              key={i}
              className="group relative aspect-[3/4] overflow-hidden"
              style={{ border: "1px solid rgba(184,150,62,0.15)" }}
            >
              <Image
                src={property.src}
                alt={property.alt}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
                sizes="(max-width: 768px) 50vw, 25vw"
              />
              {/* Gradient overlay */}
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={{
                  background:
                    "linear-gradient(to top, rgba(10,8,4,0.75) 0%, transparent 60%)",
                }}
                aria-hidden="true"
              />
              {/* Caption on hover */}
              <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                <span className="block w-5 h-px bg-gold-400 mb-2" />
                <p className="text-white text-xs font-sans tracking-wide uppercase">
                  {property.caption}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Gregg lifestyle photo — wide banner */}
        <div
          className="relative mt-4 md:mt-4 overflow-hidden"
          style={{
            height: "320px",
            border: "1px solid rgba(184,150,62,0.15)",
          }}
        >
          <Image
            src="/Gregg%20Rossman/collov-ai_20260408090547_939uab%20Gregg%20Rossman.jpg"
            alt="Gregg Rossman — Luxury Real Estate Advisor"
            fill
            className="object-cover object-center"
            sizes="100vw"
          />
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(90deg, rgba(10,8,4,0.70) 0%, rgba(10,8,4,0.30) 50%, rgba(10,8,4,0.10) 100%)",
            }}
            aria-hidden="true"
          />
          <div className="absolute inset-0 flex flex-col justify-center px-8 md:px-14 max-w-lg">
            <span className="block w-8 h-px bg-gold-400 mb-4" />
            <p className="font-serif text-2xl md:text-3xl text-white leading-snug">
              &ldquo;Every home has a story.
              <br />
              <span className="italic text-gold-300">
                I help you tell the right one.
              </span>
              &rdquo;
            </p>
            <p className="mt-4 text-stone-300 text-sm font-sans">
              — Gregg Rossman, Keller Williams St Pete Realty
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
