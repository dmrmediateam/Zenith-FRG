"use client";

import { trackEvent } from "@/lib/analytics";

export default function TrackedCTA({
  href,
  location,
  className,
  children,
}: {
  href: string;
  location: string;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <a
      href={href}
      data-cta={location}
      onClick={() => trackEvent("hero_cta_click", { location })}
      className={className}
    >
      {children}
    </a>
  );
}
