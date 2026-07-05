import "~/styles/globals.css";

import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import { Noto_Kufi_Arabic } from "next/font/google";
import { type Metadata } from "next";

import { ConvexClientProvider } from "~/components/ConvexClientProvider";

const kufi = Noto_Kufi_Arabic({
  subsets: ["arabic"],
  weight: ["400", "600"],
  variable: "--font-kufi",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://ashanjum.com"),
  title: {
    default: "Asher Anjum — AI systems for Dubai operations",
    template: "%s — Asher Anjum",
  },
  description:
    "I build AI systems that run your operations — reconciliation, review intelligence, sales follow-up — for Dubai businesses. Fixed price, paid in advance. You own everything I hand over.",
  icons: [
    {
      rel: "icon",
      url: "data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><rect width=%22100%22 height=%22100%22 rx=%2218%22 fill=%22%23070708%22/><text x=%2250%22 y=%2268%22 font-size=%2252%22 text-anchor=%22middle%22 fill=%22%23008df4%22 font-family=%22monospace%22>a.</text></svg>",
    },
  ],
};

// Applies the persisted theme before first paint; no theme set means the
// system preference decides via the CSS media query. `?theme=` is a QA
// hook for previewing a specific mode without touching storage.
const themeInit = `(function(){try{var q=new URLSearchParams(location.search).get("theme");var t=q==="dark"||q==="light"?q:localStorage.getItem("ashanjum-theme");if(t==="dark"||t==="light"){document.documentElement.dataset.theme=t}}catch(e){}})()`;

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${GeistSans.variable} ${GeistMono.variable} ${kufi.variable}`}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInit }} />
      </head>
      <body className="bg-page font-sans text-ink">
        <ConvexClientProvider>{children}</ConvexClientProvider>
      </body>
    </html>
  );
}
