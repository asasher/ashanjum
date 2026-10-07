import "~/styles/globals.css";

import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import { type Metadata } from "next";

export const metadata: Metadata = {
  metadataBase: new URL("https://asheranjum.com"),
  title: {
    default: "Asher Anjum — I build software and AI systems",
    template: "%s — Asher Anjum",
  },
  description:
    "I build software and AI systems in Dubai: end-to-end agentic development, AI integrated into business workflows, and in-person AI training. A decade shipping at OLX, Careem, talabat and Delivery Hero.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${GeistSans.variable} ${GeistMono.variable}`}>
      <body className="bg-ground font-sans text-ink">{children}</body>
    </html>
  );
}
