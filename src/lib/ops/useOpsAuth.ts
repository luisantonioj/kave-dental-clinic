"use client";

import { useEffect, useSyncExternalStore } from "react";
import { useRouter } from "next/navigation";
import {
  getSession,
  isAuthenticated,
  subscribeAuth,
  type OpsAuthSession,
} from "./auth";

function getClientSnapshot(): boolean {
  return true;
}

function getServerSnapshot(): boolean {
  return false;
}

export function useOpsAuth() {
  const router = useRouter();
  const isMounted = useSyncExternalStore(
    subscribeAuth,
    getClientSnapshot,
    getServerSnapshot,
  );

  const ready = isMounted;
  const session: OpsAuthSession | null = isMounted ? getSession() : null;

  useEffect(() => {
    if (isMounted && !isAuthenticated()) {
      router.replace("/ops/login");
    }
  }, [isMounted, router]);

  return { ready, session };
}
