import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

import { site } from "@/lib/data";
import ThreeBackground from "@/components/ThreeBackground";

// Self-hosted variable fonts (no external requests to Google Fonts at
// build or run time — faster, more private, and works offline).
const display = localFont({
  src: "./fonts/SpaceGrotesk-Variable.ttf",
  variable: "--font-display",
  weight: "500 700",
  display: "swap",
});

const body = localFont({
  src: "./fonts/Inter-Variable.ttf",
  variable: "--font-body",
  weight: "400 600",
  display: "swap",
});

const mono = localFont({
  src: "./fonts/JetBrainsMono-Variable.ttf",
  variable: "--font-mono",
  weight: "400 500",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.siteUrl),
  title: {
    default: `${site.name} — ${site.role}`,
    template: `%s — ${site.name}`,
  },
  description: site.description,
  keywords: [
    "full-stack developer",
    "Next.js developer",
    "React developer",
    "Node.js",
    "portfolio",
    site.name,
  ],
  authors: [{ name: site.name, url: site.siteUrl }],
  creator: site.name,
  openGraph: {
    type: "website",
    url: site.siteUrl,
    title: `${site.name} — ${site.role}`,
    description: site.description,
    siteName: site.name,
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: `${site.name} — ${site.role}`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.name} — ${site.role}`,
    description: site.description,
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: site.name,
    jobTitle: site.role,
    url: site.siteUrl,
    email: site.email,
    sameAs: [site.github, site.linkedin, site.twitter].filter(Boolean),
    address: {
      "@type": "PostalAddress",
      addressLocality: site.location,
    },
  };

  return (
    <html lang="en" className={`${display.variable} ${body.variable} ${mono.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body>
        <ThreeBackground />
        {children}</body>
    </html>
  );
}
