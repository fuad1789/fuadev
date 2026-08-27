import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

/* One neutral grotesk across the whole UI — the modern product-site default. */
const inter = Inter({
  subsets: ["latin", "latin-ext"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-sans",
  display: "swap",
});

const SITE_URL = "https://fuadev.com";
const TITLE = "Fuad Bağıyev — Full-stack developer";
const DESCRIPTION =
  "Full-stack developer. Azeri Edu (LMS), Payla.az marketplace və SDU-nun rəsmi portalları daxil olmaqla production mühitində işləyən məhsullar qururam.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: TITLE,
    template: "%s — Fuad Bağıyev",
  },
  description: DESCRIPTION,
  applicationName: "fuadev",
  authors: [{ name: "Fuad Bağıyev", url: SITE_URL }],
  creator: "Fuad Bağıyev",
  keywords: [
    "full-stack developer",
    "Next.js developer",
    "Azərbaycan developer",
    "web development Baku",
    "Fuad Bağıyev",
  ],
  alternates: { canonical: SITE_URL },
  openGraph: {
    type: "website",
    url: SITE_URL,
    siteName: "Fuad Bağıyev",
    title: TITLE,
    description: DESCRIPTION,
    locale: "az_AZ",
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
    creator: "@fuad1789",
  },
  robots: { index: true, follow: true },
};

const personSchema = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Fuad Bağıyev",
  alternateName: "Fuad Bagiyev",
  url: SITE_URL,
  jobTitle: "Full-stack developer",
  email: "mailto:fuadbagiyev@gmail.com",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Sumqayıt",
    addressCountry: "AZ",
  },
  sameAs: [
    "https://github.com/fuad1789",
    "https://www.linkedin.com/in/fuad-bağıyev-b70069238/",
  ],
  knowsAbout: ["JavaScript", "TypeScript", "React", "Next.js", "Node.js", "MongoDB"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="az" className={inter.variable}>
      <body>
        {children}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
        />
      </body>
    </html>
  );
}
