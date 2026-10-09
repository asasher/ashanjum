import "~/styles/globals.css";

import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import { type Metadata } from "next";

export const metadata: Metadata = {
  metadataBase: new URL("https://asheranjum.com"),
  title: {
    default: "Asher Anjum · I help businesses put AI to work",
    template: "%s — Asher Anjum",
  },
  description:
    "I help Dubai businesses put AI to work. I build the systems, connect them to the tools you already use, and train your people to run them. Ten years at OLX, Careem, talabat and Delivery Hero before that.",
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
