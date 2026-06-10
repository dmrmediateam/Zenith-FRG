import Link from "next/link";
import CoBrandedLockup from "./CoBrandedLockup";

const NAV_LINKS = [
  { href: "/#hero", label: "Home" },
  { href: "/#development", label: "Residences" },
  { href: "/#penthouses", label: "Penthouses" },
  { href: "/#neighborhood", label: "The Neighborhood" },
  { href: "/#contact", label: "Contact" },
];

function EqualHousingIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      width="18"
      height="18"
      fill="currentColor"
      aria-hidden="true"
      className="flex-shrink-0"
    >
      <path d="M12 2L2 9.5V11h1.5v10h5v-6h7v6h5V11H22V9.5L12 2zm0 2.24L20 9.5V19.5h-2.5v-6H6.5v6H4V9.5L12 4.24z" />
      <path d="M8 13h8v1.5H8zM8 15.5h8V17H8z" />
    </svg>
  );
}

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-zenith-cream/10 bg-zenith-charcoal pt-16 pb-8">
      <div className="mx-auto max-w-7xl px-6 md:px-10">
        <div className="flex flex-col items-center gap-10 text-center md:flex-row md:items-start md:justify-between md:text-left">
          <Link href="/" aria-label="Zenith Milwaukee home">
            <CoBrandedLockup variant="expanded" height={56} />
          </Link>

          <nav className="flex flex-wrap items-center justify-center gap-x-6 gap-y-3 md:justify-end">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-xs uppercase tracking-[0.2em] text-zenith-cream/70 transition-colors hover:text-zenith-olive font-sub"
              >
                {link.label}
              </a>
            ))}
          </nav>
        </div>

        <div className="mt-12 border-t border-zenith-cream/10 pt-8">
          <p className="text-center text-xs leading-relaxed text-zenith-cream/50 font-sans">
            701 E Kilbourn Avenue, Milwaukee, WI 53202
          </p>
          <p className="mx-auto mt-3 max-w-2xl text-center text-[11px] leading-relaxed text-zenith-cream/40 font-sans">
            This is not an offering. Prices, availability, and specifications
            are subject to change without notice.
          </p>

          <div className="mt-6 flex items-center justify-center gap-2 text-zenith-cream/40">
            <EqualHousingIcon />
            <p className="text-[11px] leading-relaxed font-sans">
              Equal Housing Opportunity
            </p>
          </div>

          <p className="mt-4 text-center text-[11px] text-zenith-cream/40 font-sans">
            Falk·Ruvin·Gallagher · Keller Williams · WI License #[Pending]
          </p>

          <div className="mt-4 flex items-center justify-center gap-5">
            <a
              href="/privacy"
              className="text-[11px] text-zenith-cream/40 transition-colors hover:text-zenith-cream/70 font-sans"
            >
              Privacy Policy
            </a>
            <a
              href="/terms"
              className="text-[11px] text-zenith-cream/40 transition-colors hover:text-zenith-cream/70 font-sans"
            >
              Terms
            </a>
          </div>

          <p className="mt-6 text-center text-[11px] text-zenith-cream/30 font-sans">
            &copy; {year} Zenith Milwaukee
          </p>
        </div>
      </div>
    </footer>
  );
}
