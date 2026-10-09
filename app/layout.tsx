import type { Metadata } from "next";
import { Archivo_Black, Space_Grotesk, Space_Mono } from "next/font/google";
import { Suspense } from "react";
import SiteHeader from "@/components/layout/SiteHeader";
import SiteFooter from "@/components/layout/SiteFooter";
import RouteLoader from "@/components/animation/RouteLoader";
import { canonical, site, siteUrl } from "@/lib/site";
import "./globals.css";

const display = Archivo_Black({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});

const sans = Space_Grotesk({
  weight: ["400", "500", "700"],
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const mono = Space_Mono({
  weight: ["400", "700"],
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

const description = `${site.name}, ${site.role} based in ${site.location}. Production SaaS dashboards, responsive interfaces, and API-driven web applications.`;
const homeCanonical = canonical("/");

export const metadata: Metadata = {
  ...(siteUrl ? { metadataBase: new URL(siteUrl) } : {}),
  title: {
    default: `${site.name} — ${site.role}`,
    template: `%s — ${site.name}`,
  },
  description,
  ...(homeCanonical ? { alternates: { canonical: homeCanonical } } : {}),
  robots: { index: true, follow: true },
  openGraph: {
    type: "website",
    siteName: `${site.name} — Portfolio`,
    title: `${site.name} — ${site.role}`,
    description,
    ...(homeCanonical ? { url: homeCanonical } : {}),
    images: [{ url: "/opengraph-image", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.name} — ${site.role}`,
    description,
    images: ["/opengraph-image"],
  },
};

/**
 * Accurate structured data only (AGENTS.md §12): a Person + WebSite
 * describing verifiable identity and profile links. No ratings/reviews.
 */
function StructuredData() {
  const data = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Person",
        name: site.name,
        jobTitle: site.role,
        address: {
          "@type": "PostalAddress",
          addressLocality: "Karachi",
          addressCountry: "PK",
        },
        sameAs: [site.github, site.linkedin, site.bookingUrl],
      },
      {
        "@type": "WebSite",
        name: `${site.name} — Portfolio`,
        ...(homeCanonical ? { url: homeCanonical } : {}),
        author: { "@type": "Person", name: site.name },
      },
    ],
  };
  return (
    <script
      type="application/ld+json"
      // biome-ignore lint/security/noDangerouslySetInnerHtml: static JSON-LD
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${display.variable} ${sans.variable} ${mono.variable}`}
    >
      <body>
        <StructuredData />
        <a href="#content" className="skip-link">
          Skip to content
        </a>
        <SiteHeader />
        <main id="content">{children}</main>
        <SiteFooter />
        <Suspense fallback={null}>
          <RouteLoader />
        </Suspense>
      </body>
    </html>
  );
}
