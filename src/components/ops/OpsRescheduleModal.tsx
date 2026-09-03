"use client";

import { useEffect, useState } from "react";
import type { Booking } from "../../types/ops";
import { Button } from "../ui/Button";

interface OpsRescheduleModalProps {
  isOpen: boolean;
  booking: Booking | null;
  onClose: () => void;
  onConfirm: (date: string, time: string) => Promise<void>;
}

export function OpsRescheduleModal({
  isOpen,
  booking,
  onClose,
  onConfirm,
}: OpsRescheduleModalProps) {
  const [prevBookingId, setPrevBookingId] = useState(booking?.id);
  const [date, setDate] = useState(booking?.preferredDate || "");
  const [time, setTime] = useState(booking?.preferredTime || "");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (booking && booking.id !== prevBookingId) {
    setPrevBookingId(booking.id);
    setDate(booking.preferredDate);
    setTime(booking.preferredTime);
    setError(null);
  }

  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    }
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen || !booking) return null;

  async function handleSave(e: React.FormEvent) {
    e.preventDefault();
    if (!date) {
      setError("Please select a new appointment date.");
      return;
    }
    if (!time) {
      setError("Please select a new appointment time.");
      return;
    }

    try {
      setLoading(true);
      setError(null);
      await onConfirm(date, time);
      onClose();
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Failed to reschedule appointment.",
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <div
      aria-labelledby="reschedule-modal-title"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-cluster backdrop-blur-xs"
      role="dialog"
    >
      <div className="w-full max-w-md rounded-card border border-border bg-surface-raised p-card-x shadow-xl">
        <div className="flex items-start justify-between border-b border-border pb-inline">
          <div>
            <h2
              className="text-lead font-bold text-text"
              id="reschedule-modal-title"
            >
              Reschedule Appointment
            </h2>
            <p className="mt-0.5 text-label text-text-muted">
              {booking.fullName} ({booking.id})
            </p>
          </div>
          <button
            aria-label="Close dialog"
            className="rounded-control p-inline text-body text-text-muted hover:text-text focus-visible:outline-none focus-visible:ring-[length:var(--focus-ring-width)] focus-visible:ring-focus"
            onClick={onClose}
            type="button"
          >
            ✕
          </button>
        </div>

        <form className="mt-stack space-y-stack" onSubmit={handleSave}>
          <div>
            <label
              className="block text-label font-bold uppercase tracking-label text-text-muted"
              htmlFor="reschedule-date"
            >
              New Appointment Date
            </label>
            <input
              className="mt-inline min-h-[2.75rem] w-full rounded-control border border-border bg-surface px-cluster text-body text-text focus:border-action focus:outline-none focus:ring-[length:var(--focus-ring-width)] focus:ring-focus"
              id="reschedule-date"
              onChange={(e) => setDate(e.target.value)}
              required
              type="date"
              value={date}
            />
          </div>

          <div>
            <label
              className="block text-label font-bold uppercase tracking-label text-text-muted"
              htmlFor="reschedule-time"
            >
              New Appointment Time
            </label>
            <input
              className="mt-inline min-h-[2.75rem] w-full rounded-control border border-border bg-surface px-cluster text-body text-text focus:border-action focus:outline-none focus:ring-[length:var(--focus-ring-width)] focus:ring-focus"
              id="reschedule-time"
              onChange={(e) => setTime(e.target.value)}
              required
              type="time"
              value={time}
            />
          </div>

          {error ? (
            <p className="text-label text-error" role="alert">
              {error}
            </p>
          ) : null}

          <div className="flex items-center justify-end gap-inline border-t border-border pt-stack">
            <button
              className="rounded-control border border-border px-cluster py-control-y text-label font-bold uppercase tracking-label text-text hover:bg-surface focus-visible:outline-none focus-visible:ring-[length:var(--focus-ring-width)] focus-visible:ring-focus"
              disabled={loading}
              onClick={onClose}
              type="button"
            >
              Cancel
            </button>
            <Button disabled={loading} type="submit">
              {loading ? "Saving..." : "Save Schedule"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
