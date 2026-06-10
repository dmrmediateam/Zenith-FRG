import Image from "next/image";

const EXPANDED_SRC =
  "/images/ZxFRG Co Branded Lock Ups_ZxFRG Expanded.png";
const COMPACT_SRC =
  "/images/ZxFRG Co Branded Lock Ups_ZxFRG Exclusively Marketed By.png";

interface CoBrandedLockupProps {
  variant?: "expanded" | "compact";
  /** "dark" renders the (dark-on-transparent) source artwork as-is for light
   * backgrounds. "light" inverts it to render on dark backgrounds. */
  theme?: "dark" | "light";
  className?: string;
  height?: number;
}

/**
 * Co-branded Zenith x Falk·Ruvin·Gallagher lockup. Source artwork is dark
 * text on a transparent background; `theme="light"` inverts it for use on
 * dark sections. Falls back to a pure-CSS type rendering if the source
 * image fails to load.
 */
export default function CoBrandedLockup({
  variant = "expanded",
  theme = "light",
  className = "",
  height = 64,
}: CoBrandedLockupProps) {
  const src = variant === "expanded" ? EXPANDED_SRC : COMPACT_SRC;
  const aspect = variant === "expanded" ? 2000 / 258 : 2000 / 1514;

  return (
    <div className={`relative inline-block ${className}`} style={{ height }}>
      <Image
        src={src}
        alt="Zenith — Exclusively Marketed By Falk·Ruvin·Gallagher, Keller Williams"
        height={height}
        width={height * aspect}
        style={{
          height: "100%",
          width: "auto",
          objectFit: "contain",
          filter: theme === "light" ? "invert(1) brightness(1.4)" : undefined,
        }}
        className="block"
      />
    </div>
  );
}

/** Pure CSS/type fallback rendering of the co-branded lockup. */
export function CoBrandedLockupFallback({
  variant = "expanded",
  className = "",
}: CoBrandedLockupProps) {
  return (
    <div className={`text-center ${className}`}>
      <p className="font-serif text-2xl tracking-[0.3em] text-zenith-cream">
        ZENITH
      </p>
      <p className="label-tag mt-1 text-zenith-sand">
        Exclusively Marketed By
      </p>
      {variant === "expanded" && (
        <>
          <p className="mt-2 font-sub text-sm tracking-[0.2em] text-zenith-cream">
            FALK · RUVIN · GALLAGHER
          </p>
          <p className="mt-1 text-[10px] tracking-[0.3em] text-zenith-sand">
            KELLERWILLIAMS.®
          </p>
        </>
      )}
    </div>
  );
}
