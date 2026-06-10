const NEARBY = [
  { label: "Lake Michigan waterfront", distance: "4 blocks" },
  { label: "Third Ward arts district", distance: "8 minutes" },
  { label: "Milwaukee Art Museum", distance: "7 minutes" },
  { label: "Fiserv Forum", distance: "12 minutes" },
  { label: "General Mitchell Airport", distance: "20 minutes" },
];

const MAPS_API_KEY = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;
const ADDRESS = "701 E Kilbourn Ave, Milwaukee, WI 53202";

export default function MapSection() {
  const mapSrc = MAPS_API_KEY
    ? `https://www.google.com/maps/embed/v1/place?key=${MAPS_API_KEY}&q=${encodeURIComponent(
        ADDRESS
      )}&zoom=14`
    : null;

  return (
    <section id="neighborhood" className="bg-zenith-cream py-24 md:py-32 reveal">
      <div className="mx-auto max-w-7xl px-6 md:px-10">
        <div className="grid gap-16 lg:grid-cols-2 lg:gap-24 lg:items-center">
          {/* Map */}
          <div className="relative aspect-[4/3] overflow-hidden border border-zenith-sand/30 grayscale">
            {mapSrc ? (
              <iframe
                src={mapSrc}
                className="h-full w-full border-0"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Zenith — 701 E Kilbourn Avenue, Milwaukee, WI"
              />
            ) : (
              <div className="flex h-full w-full flex-col items-center justify-center bg-zenith-charcoal/5">
                <p className="font-serif text-2xl tracking-[0.2em] text-zenith-sand">
                  701 E KILBOURN AVE
                </p>
                <p className="mt-2 text-sm text-zenith-sand/80">
                  Milwaukee, WI 53202
                </p>
              </div>
            )}
          </div>

          {/* Neighborhood copy */}
          <div>
            <div className="mb-6 flex items-center gap-4">
              <span className="olive-rule" />
              <span className="label-tag">The Neighborhood</span>
            </div>

            <h2 className="section-heading mb-8 text-balance">
              Everything Milwaukee Offers,{" "}
              <span className="font-serif italic text-zenith-bronze">
                Steps Away
              </span>
            </h2>

            <ul className="divide-y divide-zenith-sand/20 border-y border-zenith-sand/20">
              {NEARBY.map((item) => (
                <li
                  key={item.label}
                  className="flex items-center justify-between py-4"
                >
                  <span className="text-[15px] text-zenith-charcoal/80">
                    {item.label}
                  </span>
                  <span className="font-sub text-xs uppercase tracking-[0.2em] text-zenith-olive">
                    {item.distance}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
