import type { Metadata } from "next";
import localFont from "next/font/local";
import SiteHeader from "@/components/layout/SiteHeader";
import SiteFooter from "@/components/layout/SiteFooter";
import RouteLoader from "@/components/animation/RouteLoader";
import TabAttention from "@/components/animation/TabAttention";
import { canonical, site, siteUrl } from "@/lib/site";
import "./globals.css";

const display = localFont({
  src: "../public/fonts/BricolageGrotesque-Variable.woff2",
  weight: "200 800",
  variable: "--font-display",
  display: "swap",
});

const sans = localFont({
  src: "../public/fonts/BricolageGrotesque-Variable.woff2",
  weight: "200 800",
  variable: "--font-sans",
  display: "swap",
});

const brico = localFont({
  src: "../public/fonts/BricolageGrotesque-Variable.woff2",
  weight: "200 800",
  variable: "--font-brico",
  display: "swap",
});

const description =
  "Zun Ul Noor — Frontend Engineer in Karachi. React/Next.js SaaS dashboards, API-driven interfaces, WordPress plugins.";
const homeCanonical = canonical("/");

const keywords = [
  "Zun Ul Noor",
  "Frontend Engineer Karachi",
  "Full-Stack Developer Pakistan",
  "React developer",
  "Next.js developer",
  "SaaS dashboard development",
  "API integration",
  "WordPress plugin developer",
  "Google Maps Mapbox geolocation",
  "Python Streamlit machine learning",
];

export const metadata: Metadata = {
  ...(siteUrl ? { metadataBase: new URL(siteUrl) } : {}),
  title: {
    default: `${site.name} — ${site.role}`,
    template: `%s — ${site.name}`,
  },
  description,
  keywords,
  ...(homeCanonical ? { alternates: { canonical: homeCanonical } } : {}),
  robots: { index: true, follow: true },
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: `${site.name} — Portfolio`,
    title: `${site.name} — ${site.role}`,
    description,
    ...(homeCanonical ? { url: homeCanonical } : {}),
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: `${site.name} — Frontend Engineer / Full-Stack Developer portfolio`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.name} — ${site.role}`,
    description,
    images: [
      {
        url: "/opengraph-image",
        alt: `${site.name} — Frontend Engineer / Full-Stack Developer portfolio`,
      },
    ],
  },
};

function StructuredData() {
  const data = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Person",
        name: site.name,
        jobTitle: site.role,
        email: `mailto:${site.email}`,
        telephone: site.phone,
        address: {
          "@type": "PostalAddress",
          addressLocality: "Karachi",
          addressCountry: "PK",
        },
        sameAs: [site.github, site.linkedin, site.bookingUrl],
      },
      {
        "@type": "ProfessionalService",
        name: `${site.name} — ${site.role}`,
        description:
          "Frontend engineering for production SaaS dashboards, responsive interfaces, API integration, WordPress plugin development, and applied ML web apps.",
        telephone: site.phone,
        email: site.email,
        priceRange: "$$",
        address: {
          "@type": "PostalAddress",
          addressLocality: "Karachi",
          addressCountry: "PK",
        },
        ...(homeCanonical ? { url: homeCanonical } : {}),
      },
      {
        "@type": "FAQPage",
        mainEntity: [
          {
            "@type": "Question",
            name: "Who is Zun Ul Noor?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Zun Ul Noor is a Frontend Engineer / Full-Stack Developer based in Karachi, Pakistan, working on production SaaS dashboards, responsive interfaces, and API-driven web applications across React, Next.js, Node.js, WordPress, and Python.",
            },
          },
          {
            "@type": "Question",
            name: "What does Zun Ul Noor specialize in?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "React.js and Next.js interfaces, production SaaS dashboard maintenance and feature development, API integration with pagination, search and filtering, Google Maps and Mapbox geolocation interfaces, WordPress custom plugin engineering, Node.js backends, and Python/Streamlit applied machine learning.",
            },
          },
          {
            "@type": "Question",
            name: "How can I start a project or book a meeting?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Send a short brief through the lead form on the About page — replies within 2 days — or book a slot directly at https://cal.com/zun-ul-noor with no form needed.",
            },
          },
          {
            "@type": "Question",
            name: "What kind of work is shown in the portfolio?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Eight case studies: professional work including the Shipox logistics SaaS dashboard at Zip24 and client platforms, plus independent builds — the Zipped Docs WordPress plugin on wordpress.org and a deployed XGBoost healthcare risk prediction app. Every case study is labeled professional or independent.",
            },
          },
          {
            "@type": "Question",
            name: "Where is Zun Ul Noor based and how can I contact him?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Based in Karachi, Pakistan. Email zunnoor46@gmail.com, phone +92 309 7473629, GitHub github.com/ZunulNoor, LinkedIn linkedin.com/in/zun-ul-noor.",
            },
          },
        ],
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
      className={`${display.variable} ${sans.variable} ${brico.variable}`}
    >
      <body>
        <StructuredData />

        <div id="boot-curtain" aria-hidden="true">
          <span className="boot-foot">
            <span>PORTFOLIO</span>
            <span>LOADING</span>
          </span>
          <span className="boot-word">ZUN UL NOOR</span>
          <span className="boot-foot">
            <span>FE / FS — KHI</span>
            <span>■■■</span>
          </span>
        </div>
        <a href="#content" className="skip-link">
          Skip to content
        </a>
        <SiteHeader />
        <main id="content">{children}</main>
        <SiteFooter />
        <RouteLoader />
        <TabAttention />
      </body>
    </html>
  );
}
