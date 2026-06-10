const STATS = [
  {
    value: "40",
    label: "Residences Under Contract",
    sub: "in the first 90 days",
  },
  {
    value: "226",
    label: "Total Units",
    sub: "3 Penthouses Available",
  },
  {
    value: "$400k – $3m",
    label: "Price Range",
    sub: "Across All Residences",
  },
];

export default function StatBar() {
  return (
    <section className="bg-zenith-charcoal py-14 md:py-16">
      <div className="mx-auto grid max-w-6xl grid-cols-1 divide-y divide-zenith-cream/10 px-6 sm:grid-cols-3 sm:divide-x sm:divide-y-0 md:px-10">
        {STATS.map((stat, i) => (
          <div
            key={stat.label}
            className={`reveal reveal-delay-${i + 1} flex flex-col items-center px-6 py-8 text-center sm:py-0`}
          >
            <p className="font-serif text-4xl text-zenith-cream md:text-5xl">
              {stat.value}
            </p>
            <p className="label-tag mt-4 text-zenith-olive">{stat.label}</p>
            <p className="mt-2 text-[13px] text-zenith-cream/60">{stat.sub}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
