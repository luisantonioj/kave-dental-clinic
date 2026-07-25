import type { Metadata } from "next";
import { Anybody, Manrope } from "next/font/google";
import type { ReactNode } from "react";

import { SiteFooter } from "../components/layout/SiteFooter";
import { SiteHeader } from "../components/layout/SiteHeader";

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

export const metadata: Metadata = {
  title: "Kave Dental Clinic",
  description: "Information about Kave Dental Clinic in Quezon City.",
};

interface RootLayoutProps {
  children: ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html className={`${anybody.variable} ${manrope.variable}`} lang="en">
      <body className="flex min-h-screen flex-col bg-surface font-body text-text antialiased">
        <SiteHeader />
        <div className="flex-1">{children}</div>
        <SiteFooter />
      </body>
    </html>
  );
}
