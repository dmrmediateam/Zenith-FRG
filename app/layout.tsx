import type { Metadata } from "next";
import { Playfair_Display, DM_Sans } from "next/font/google";
import Script from "next/script";
import "./globals.css";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm-sans",
  display: "swap",
  weight: ["300", "400", "500", "600"],
});

const BASE_URL = "https://www.greggrossman.com";

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: "Luxury Home Valuation | Gregg Rossman",
  description:
    "Get a private, strategy-driven home valuation from Gregg Rossman. A more thoughtful approach for luxury sellers who want more than an automated estimate.",
  keywords: [
    "luxury home valuation",
    "St. Petersburg real estate",
    "Gregg Rossman",
    "private home value consultation",
  ],
  openGraph: {
    title: "Luxury Home Valuation | Gregg Rossman",
    description:
      "A private, strategy-driven home valuation for sellers who want more than an automated estimate.",
    type: "website",
    locale: "en_US",
    url: BASE_URL,
    siteName: "Gregg Rossman",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Gregg Rossman — Luxury Home Valuation",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Luxury Home Valuation | Gregg Rossman",
    description:
      "A private, strategy-driven home valuation for luxury sellers.",
  },
  alternates: {
    canonical: BASE_URL,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${playfair.variable} ${dmSans.variable}`}>
      <head>
        <Script id="google-tag-manager" strategy="afterInteractive">
          {`if (window.location.hostname === 'www.greggrossman.com') {
(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-WXKJLM2M');
}`}
        </Script>
      </head>
      <body>
        {children}
      </body>
    </html>
  );
}
