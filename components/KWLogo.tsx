interface KWLogoProps {
  className?: string;
  /** "dark" renders on light bg, "light" renders on dark bg */
  variant?: "dark" | "light";
  height?: number;
}

export default function KWLogo({
  className = "",
  variant = "dark",
  height = 32,
}: KWLogoProps) {
  const textColor = variant === "dark" ? "#4A4845" : "#D8D1C9";
  const subColor = variant === "dark" ? "#9B9590" : "#9B9590";

  return (
    <svg
      height={height}
      viewBox="0 0 220 52"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-label="Keller Williams St Pete Realty"
      role="img"
    >
      {/* "kw" in KW red */}
      <text
        x="0"
        y="38"
        fontFamily="Arial Black, Arial, sans-serif"
        fontWeight="900"
        fontSize="46"
        fill="#CC0000"
        letterSpacing="-1"
      >
        kw
      </text>

      {/* "ST PETE" — dark gray, condensed */}
      <text
        x="80"
        y="30"
        fontFamily="Arial, Helvetica, sans-serif"
        fontWeight="700"
        fontSize="22"
        fill={textColor}
        letterSpacing="1.5"
      >
        ST PETE
      </text>

      {/* "KELLERWILLIAMS." — lighter gray, smaller */}
      <text
        x="80"
        y="48"
        fontFamily="Arial, Helvetica, sans-serif"
        fontWeight="400"
        fontSize="13"
        fill={subColor}
        letterSpacing="1"
      >
        KELLERWILLIAMS.
      </text>
    </svg>
  );
}
