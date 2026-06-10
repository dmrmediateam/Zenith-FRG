import KWLogo from "./KWLogo";
import Link from "next/link";

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
      {/* House outline */}
      <path d="M12 2L2 9.5V11h1.5v10h5v-6h7v6h5V11H22V9.5L12 2zm0 2.24L20 9.5V19.5h-2.5v-6H6.5v6H4V9.5L12 4.24z" />
      {/* Equal sign bars */}
      <path d="M8 13h8v1.5H8zM8 15.5h8V17H8z" />
    </svg>
  );
}

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-charcoal-900 border-t border-charcoal-700 pt-10 pb-24 md:pb-8">
      <div className="max-w-7xl mx-auto px-6 md:px-10 flex flex-col sm:flex-row items-center justify-between gap-4">
        <Link href="/" aria-label="Keller Williams St Pete Realty home">
          <KWLogo height={24} variant="light" />
        </Link>

        <p className="text-stone-600 text-xs font-sans text-center leading-relaxed">
          &copy; {year} Gregg Rossman &middot; FL License #3617329 &middot; REALTOR®<br className="sm:hidden" />
          <span className="hidden sm:inline"> &middot; </span>
          360 Central Ave Ste 600, St. Petersburg, FL 33701
        </p>

        <div className="flex items-center gap-5">
          <a
            href="/privacy"
            className="text-stone-600 hover:text-stone-400 text-xs font-sans transition-colors duration-200"
          >
            Privacy Policy
          </a>
          <a
            href="/terms"
            className="text-stone-600 hover:text-stone-400 text-xs font-sans transition-colors duration-200"
          >
            Terms
          </a>
        </div>
      </div>

      {/* Equal Housing Opportunity */}
      <div className="max-w-7xl mx-auto px-6 md:px-10 mt-6 pt-5 border-t border-charcoal-800 flex items-center justify-center gap-2">
        <span className="text-stone-700">
          <EqualHousingIcon />
        </span>
        <p className="text-stone-700 text-xs font-sans text-center leading-relaxed">
          Equal Housing Opportunity &middot; We are pledged to the letter and spirit of U.S. policy for the achievement of equal housing opportunity throughout the nation.
        </p>
      </div>
    </footer>
  );
}
