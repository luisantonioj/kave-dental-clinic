"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "../../../components/ui/Button";
import { DEMO_PASSCODE, login } from "../../../lib/ops/auth";

export default function OpsLoginPage() {
  const router = useRouter();
  const [passcode, setPasscode] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const result = login(passcode);
    if (result.success) {
      router.push("/ops");
    } else {
      setError(result.error || "Invalid passcode.");
      setLoading(false);
    }
  }

  function handleUseDemo() {
    setPasscode(DEMO_PASSCODE);
    const result = login(DEMO_PASSCODE);
    if (result.success) {
      router.push("/ops");
    }
  }

  return (
    <div className="flex min-h-[70vh] items-center justify-center py-stack">
      <div className="w-full max-w-md rounded-card border border-border bg-surface-raised p-card-x shadow-lg">
        <div className="text-center">
          <span className="rounded-control bg-action px-inline py-0.5 text-label font-bold uppercase tracking-label text-action-contrast">
            Staff Access
          </span>
          <h1 className="mt-inline font-display text-heading font-bold text-text">
            Kave Ops Login
          </h1>
          <p className="mt-inline text-body text-text-muted">
            Front desk appointment management portal.
          </p>
        </div>

        <form className="mt-stack space-y-stack" onSubmit={handleSubmit}>
          <div>
            <label
              className="block text-label font-bold uppercase tracking-label text-text-muted"
              htmlFor="passcode"
            >
              Staff Passcode
            </label>
            <input
              autoComplete="current-password"
              autoFocus
              className="mt-inline min-h-control w-full rounded-control border border-border bg-surface px-cluster text-body text-text placeholder:text-text-muted focus:border-action focus:outline-none focus:ring-[length:var(--focus-ring-width)] focus:ring-focus"
              id="passcode"
              onChange={(e) => setPasscode(e.target.value)}
              placeholder="Enter passcode..."
              required
              type="password"
              value={passcode}
            />
          </div>

          {error ? (
            <p className="text-label text-error" role="alert">
              {error}
            </p>
          ) : null}

          <Button className="w-full" disabled={loading} type="submit">
            {loading ? "Verifying..." : "Sign In to Ops"}
          </Button>

          <div className="rounded-control border border-dashed border-border bg-surface p-inline text-center text-label text-text-muted">
            <span>Demo credentials: </span>
            <button
              className="font-mono font-bold text-action-contrast underline dark:text-action"
              onClick={handleUseDemo}
              type="button"
            >
              kave2026 (Click to auto-fill & login)
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
