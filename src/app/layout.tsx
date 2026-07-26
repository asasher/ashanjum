import "~/styles/globals.css";

import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import { type Metadata } from "next";

export const metadata: Metadata = {
  metadataBase: new URL("https://ashanjum.com"),
  title: {
    default: "Asher Anjum — Agentic software development",
    template: "%s — Asher Anjum",
  },
  description:
    "External CTO in Dubai. I install the agentic delivery lifecycle inside software teams — two human decisions, spec and merge, with everything between them owned by agents. Ten years shipping production software at OLX, Careem, talabat and Delivery Hero.",
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
