import type { Metadata } from "next";
import { Anybody, Manrope } from "next/font/google";
import type { ReactNode } from "react";

import { SiteFooter } from "../components/layout/SiteFooter";
import { SiteHeader } from "../components/layout/SiteHeader";
import { ThemeProvider } from "../components/layout/ThemeProvider";
import { CLINIC_STRUCTURED_DATA } from "../content/structured-data";
import { createPageMetadata } from "../lib/metadata";

import "../styles/globals.css";

const anybody = Anybody({
  axes: ["wdth"],
  display: "swap",
  fallback: ["Arial Black", "Arial", "sans-serif"],
  preload: true,
  subsets: ["latin"],
  variable: "--font-anybody",
  weight: "variable",
});

const manrope = Manrope({
  display: "swap",
  fallback: ["Arial", "Helvetica", "sans-serif"],
  preload: true,
  subsets: ["latin"],
  variable: "--font-manrope",
  weight: "variable",
});

export const metadata: Metadata = createPageMetadata(
  "Kave Dental Clinic",
  "Information about Kave Dental Clinic in Quezon City.",
);

/**
 * Inline script that runs before first paint to prevent a flash of the wrong
 * theme. Reads the user's saved preference from localStorage, falls back to
 * the system's prefers-color-scheme, and applies the .dark class immediately.
 */
const THEME_INIT_SCRIPT = `(function(){try{var t=localStorage.getItem("theme");if(t==="dark"||(t!=="light"&&matchMedia("(prefers-color-scheme:dark)").matches)){document.documentElement.classList.add("dark")}}catch(e){}})()`;

interface RootLayoutProps {
  children: ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html
      className={`${anybody.variable} ${manrope.variable}`}
      lang="en"
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: THEME_INIT_SCRIPT }} />
      </head>
      <body className="flex min-h-screen flex-col bg-surface font-body text-text antialiased">
        <script id="clinic-structured-data" type="application/ld+json">
          {JSON.stringify(CLINIC_STRUCTURED_DATA).replace(/</g, "\\u003c")}
        </script>
        <ThemeProvider>
          <SiteHeader />
          <div className="flex-1">{children}</div>
          <SiteFooter />
        </ThemeProvider>
      </body>
    </html>
  );
}
