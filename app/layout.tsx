import type { Metadata } from "next";
import { Manrope, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import ScrollProgress from "@/components/ScrollProgress";

const manrope = Manrope({
  subsets: ["latin", "latin-ext"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-display",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin", "latin-ext"],
  weight: ["400", "500"],
  variable: "--font-jetbrains-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Fuad Bağıyev · Full-stack Developer",
  description: "AI-driven full-stack web & mobile developer. Creator of Payla.az and Unim.az.",
  openGraph: {
    title: "Fuad Bağıyev · Full-stack Developer",
    description: "AI-driven full-stack web & mobile developer. Creator of Payla.az and Unim.az.",
    url: "https://fuadev.com",
    siteName: "Fuad Bağıyev Portfolio",
    images: [
      {
        url: "https://fuadev.com/og-image.png", // Placeholder, user should update this
        width: 1200,
        height: 630,
        alt: "Fuad Bağıyev Portfolio",
      },
    ],
    locale: "az_AZ",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Fuad Bağıyev · Full-stack Developer",
    description: "AI-driven full-stack web & mobile developer.",
    creator: "@fuad1789", // Assuming twitter handle based on github
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="az" className={`${manrope.variable} ${jetbrainsMono.variable}`}>
      <body>
        <ScrollProgress />
        {children}
      </body>
    </html>
  );
}


