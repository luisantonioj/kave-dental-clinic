"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getSession, isAuthenticated, type OpsAuthSession } from "./auth";

export function useOpsAuth() {
  const router = useRouter();
  const [session] = useState<OpsAuthSession | null>(() => getSession());
  const [ready] = useState(() => isAuthenticated());

  useEffect(() => {
    if (!isAuthenticated()) {
      router.replace("/ops/login");
    }
  }, [router]);

  return { ready, session };
}
