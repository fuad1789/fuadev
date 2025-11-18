import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Fuad Bağıyev · Full-stack Developer",
  description: "AI-driven full-stack web & mobile developer",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="az">
      <body>{children}</body>
    </html>
  );
}

