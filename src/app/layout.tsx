import "~/styles/globals.css";

import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import { Noto_Kufi_Arabic } from "next/font/google";
import { type Metadata } from "next";

import { ConvexClientProvider } from "~/components/ConvexClientProvider";
import { RevealObserver } from "~/components/RevealObserver";
import { ScrollScenes } from "~/components/ScrollScenes";

const kufi = Noto_Kufi_Arabic({
  subsets: ["arabic"],
  weight: ["400", "600"],
  variable: "--font-kufi",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://ashanjum.com"),
  title: {
    default: "Ash Anjum — AI systems your team owns",
    template: "%s — Ash Anjum",
  },
  description:
    "Ex-Talabat / Delivery Hero Head of Product. I build AI systems for Dubai businesses and hand them over. You own it. Not a certificate.",
  icons: [
    {
      rel: "icon",
      url: "data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><rect width=%22100%22 height=%22100%22 rx=%2218%22 fill=%22%23070708%22/><text x=%2250%22 y=%2268%22 font-size=%2252%22 text-anchor=%22middle%22 fill=%22%23feca00%22 font-family=%22monospace%22>a.</text></svg>",
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${GeistSans.variable} ${GeistMono.variable} ${kufi.variable}`}
    >
      <body className="bg-ink-deep text-bone">
        <ConvexClientProvider>
          <RevealObserver />
          <ScrollScenes />
          {children}
        </ConvexClientProvider>
      </body>
    </html>
  );
}
