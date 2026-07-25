import type { Metadata } from "next";
import type { ReactNode } from "react";

import "../styles/globals.css";

export const metadata: Metadata = {
  title: "Kave Dental Clinic",
  description: "Information about Kave Dental Clinic in Quezon City.",
};

interface RootLayoutProps {
  children: ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-(--color-surface) text-(--color-text) antialiased">
        {children}
      </body>
    </html>
  );
}
