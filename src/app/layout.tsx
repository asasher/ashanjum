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
  icons: [
    {
      rel: "icon",
      url: "data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><rect width=%22100%22 height=%22100%22 rx=%2218%22 fill=%22%2314171C%22/><text x=%2250%22 y=%2268%22 font-size=%2252%22 text-anchor=%22middle%22 fill=%22%233E5BD9%22 font-family=%22monospace%22>a.</text></svg>",
    },
  ],
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
