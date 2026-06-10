import type { Metadata } from "next";
import { Cormorant_Garamond, Arsenal, Inter } from "next/font/google";
import Script from "next/script";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  variable: "--font-cormorant",
  display: "swap",
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
});

const arsenal = Arsenal({
  subsets: ["latin"],
  variable: "--font-arsenal",
  display: "swap",
  weight: ["400", "700"],
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
  weight: ["300", "400", "500", "600"],
});

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://zenithatkilbourn.com";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: "Zenith Milwaukee | 701 E Kilbourn Avenue | New Luxury Condominiums",
  description:
    "Zenith is Milwaukee's first new luxury condominium tower in a generation. 226 residences from $400k at 701 E Kilbourn Avenue. Exclusively marketed by Falk·Ruvin·Gallagher, Keller Williams.",
  keywords: [
    "Milwaukee luxury condominiums",
    "701 E Kilbourn Avenue",
    "Zenith Milwaukee",
    "new construction condos Milwaukee",
    "Falk Ruvin Gallagher Milwaukee",
  ],
  openGraph: {
    title: "Zenith Milwaukee — Where the View, the Address, and the Lifestyle Come Together",
    description:
      "226 residences. 3 penthouses. From $400k to $3M. MLS launch June 23, 2026.",
    type: "website",
    locale: "en_US",
    url: SITE_URL,
    siteName: "Zenith Milwaukee",
    images: [
      {
        url: "/og-zenith.jpg",
        width: 1200,
        height: 630,
        alt: "Zenith — 701 E Kilbourn Avenue, Milwaukee",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Zenith Milwaukee | New Luxury Condominiums",
    description:
      "226 residences. 3 penthouses. From $455,990 to $2,975,000.",
  },
  alternates: {
    canonical: SITE_URL,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
};

const GTM_ID = process.env.NEXT_PUBLIC_GTM_ID;
const META_PIXEL_ID = process.env.NEXT_PUBLIC_META_PIXEL_ID;
const CLARITY_ID = process.env.NEXT_PUBLIC_CLARITY_ID;

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${cormorant.variable} ${arsenal.variable} ${inter.variable}`}
    >
      <head>
        {GTM_ID && (
          <Script id="google-tag-manager" strategy="afterInteractive">
            {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','${GTM_ID}');`}
          </Script>
        )}
        {CLARITY_ID && (
          <Script id="microsoft-clarity" strategy="afterInteractive">
            {`(function(c,l,a,r,i,t,y){
c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
})(window, document, "clarity", "script", "${CLARITY_ID}");`}
          </Script>
        )}
        {META_PIXEL_ID && (
          <Script id="meta-pixel" strategy="afterInteractive">
            {`!function(f,b,e,v,n,t,s)
{if(f.fbq)return;n=f.fbq=function(){n.callMethod?
n.callMethod.apply(n,arguments):n.queue.push(arguments)};
if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
n.queue=[];t=b.createElement(e);t.async=!0;
t.src=v;s=b.getElementsByTagName(e)[0];
s.parentNode.insertBefore(t,s)}(window, document,'script',
'https://connect.facebook.net/en_US/fbevents.js');
fbq('init', '${META_PIXEL_ID}');
fbq('track', 'PageView');`}
          </Script>
        )}
      </head>
      <body>{children}</body>
    </html>
  );
}
