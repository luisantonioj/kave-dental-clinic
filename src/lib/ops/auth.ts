const SESSION_KEY = "kave_ops_session_token";
export const DEMO_PASSCODE = "kave2026";
export const DEMO_PASSCODE_FALLBACK = "1234";

export interface OpsAuthSession {
  staffName: string;
  role: string;
  loggedInAt: string;
}

export function isAuthenticated(): boolean {
  if (typeof window === "undefined") {
    return false;
  }
  try {
    const raw =
      window.sessionStorage.getItem(SESSION_KEY) ||
      window.localStorage.getItem(SESSION_KEY);
    return Boolean(raw);
  } catch {
    return false;
  }
}

export function getSession(): OpsAuthSession | null {
  if (typeof window === "undefined") {
    return null;
  }
  try {
    const raw =
      window.sessionStorage.getItem(SESSION_KEY) ||
      window.localStorage.getItem(SESSION_KEY);
    if (!raw) return null;
    return JSON.parse(raw) as OpsAuthSession;
  } catch {
    return null;
  }
}

type AuthListener = () => void;
const listeners = new Set<AuthListener>();

export function subscribeAuth(listener: AuthListener): () => void {
  listeners.add(listener);
  function handleStorage(e: StorageEvent) {
    if (e.key === SESSION_KEY || e.key === null) {
      listener();
    }
  }
  if (typeof window !== "undefined") {
    window.addEventListener("storage", handleStorage);
  }
  return () => {
    listeners.delete(listener);
    if (typeof window !== "undefined") {
      window.removeEventListener("storage", handleStorage);
    }
  };
}

function notifyAuth() {
  listeners.forEach((listener) => {
    try {
      listener();
    } catch {
      // ignore
    }
  });
}

export function login(passcode: string): { success: boolean; error?: string } {
  const trimmed = passcode.trim();
  if (trimmed === DEMO_PASSCODE || trimmed === DEMO_PASSCODE_FALLBACK) {
    const session: OpsAuthSession = {
      staffName: "Kave Reception",
      role: "Operations Staff",
      loggedInAt: new Date().toISOString(),
    };
    try {
      window.sessionStorage.setItem(SESSION_KEY, JSON.stringify(session));
      window.localStorage.setItem(SESSION_KEY, JSON.stringify(session));
    } catch {
      // ignore storage errors
    }
    notifyAuth();
    return { success: true };
  }

  return {
    success: false,
    error: `Invalid passcode. Use demo passcode: "${DEMO_PASSCODE}" or "${DEMO_PASSCODE_FALLBACK}"`,
  };
}

export function logout(): void {
  if (typeof window === "undefined") return;
  try {
    window.sessionStorage.removeItem(SESSION_KEY);
    window.localStorage.removeItem(SESSION_KEY);
  } catch {
    // ignore
  }
  notifyAuth();
}
