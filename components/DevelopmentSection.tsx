function PlaceholderStill() {
  return (
    <div className="relative flex aspect-[4/5] items-center justify-center border border-zenith-sand/30 bg-zenith-charcoal/5">
      <p className="font-serif text-3xl tracking-[0.3em] text-zenith-sand/40">
        ZENITH
      </p>
    </div>
  );
}

export default function DevelopmentSection() {
  return (
    <section
      id="development"
      className="bg-zenith-cream py-24 md:py-32 reveal"
    >
      <div className="mx-auto max-w-7xl px-6 md:px-10">
        <div className="grid items-start gap-16 lg:grid-cols-2 lg:gap-24">
          {/* Left — editorial copy */}
          <div>
            <div className="mb-6 flex items-center gap-4">
              <span className="olive-rule" />
              <span className="label-tag">The Development</span>
            </div>

            <h2 className="section-heading mb-8 text-balance">
              A New Chapter for{" "}
              <span className="font-serif italic text-zenith-bronze">
                Milwaukee&rsquo;s Skyline
              </span>
            </h2>

            <div className="space-y-5 text-[15px] font-sans leading-relaxed text-zenith-charcoal/80">
              <p>
                For the first time in a generation, Milwaukee has a new
                landmark address. Zenith rises at 701 E Kilbourn Avenue — a
                226-residence tower that redefines what luxury living means in
                this city. Not a renovation. Not a conversion. A
                purpose-built lifestyle address, from the ground up.
              </p>
            </div>

            <div className="mt-10 space-y-8">
              <div>
                <p className="label-tag mb-3">The Location</p>
                <p className="text-[15px] font-sans leading-relaxed text-zenith-charcoal/80">
                  701 E Kilbourn Avenue places you at the intersection of
                  downtown culture, the lakefront, and Milwaukee&rsquo;s
                  finest dining and entertainment corridor. Everything you
                  need is already here.
                </p>
              </div>
              <div>
                <p className="label-tag mb-3">The Building</p>
                <p className="text-[15px] font-sans leading-relaxed text-zenith-charcoal/80">
                  From expansive views to curated amenities, every detail of
                  Zenith was designed for a life without compromise.
                </p>
              </div>
            </div>
          </div>

          {/* Right — placeholder still */}
          <PlaceholderStill />
        </div>
      </div>
    </section>
  );
}
