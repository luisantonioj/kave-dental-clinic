import type { Metadata } from "next";
import type { ReactNode } from "react";

import { OpsHeader } from "../../components/ops/OpsHeader";
import { createPageMetadata } from "../../lib/metadata";

export const metadata: Metadata = createPageMetadata(
  "Kave Ops | Front Desk & Appointments",
  "Internal clinic operations workspace for Kave Dental Clinic.",
);

interface OpsLayoutProps {
  children: ReactNode;
}

export default function OpsLayout({ children }: OpsLayoutProps) {
  return (
    <div className="flex min-h-screen flex-col bg-surface font-body text-text antialiased">
      <OpsHeader />
      <main
        className="mx-auto w-full max-w-wide flex-1 px-gutter py-stack"
        id="ops-main"
      >
        {children}
      </main>
    </div>
  );
}
