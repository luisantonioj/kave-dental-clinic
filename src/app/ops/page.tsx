"use client";

import Link from "next/link";
import { useCallback, useEffect, useState } from "react";

import { OpsBookingDetailsDrawer } from "../../components/ops/OpsBookingDetailsDrawer";
import { OpsBookingTable } from "../../components/ops/OpsBookingTable";
import { OpsMetricCards } from "../../components/ops/OpsMetricCards";
import {
  bookingRepository,
  DATA_CHANGE_EVENT,
} from "../../lib/ops/booking-repository";
import { useOpsAuth } from "../../lib/ops/useOpsAuth";
import type {
  Booking,
  BookingStatus,
  OpsSummaryMetrics,
} from "../../types/ops";

export default function OpsDashboardPage() {
  const { ready } = useOpsAuth();

  const [metrics, setMetrics] = useState<OpsSummaryMetrics>({
    total: 0,
    pending: 0,
    confirmed: 0,
    completed: 0,
    cancelled: 0,
    todayCount: 0,
  });

  const [pendingBookings, setPendingBookings] = useState<Booking[]>([]);
  const [upcomingBookings, setUpcomingBookings] = useState<Booking[]>([]);
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  const loadData = useCallback(async () => {
    try {
      const [m, allPending, allConfirmed] = await Promise.all([
        bookingRepository.getMetrics(),
        bookingRepository.getBookings({ status: "pending" }),
        bookingRepository.getBookings({ status: "confirmed" }),
      ]);
      setMetrics(m);
      setPendingBookings(allPending.slice(0, 5));
      setUpcomingBookings(allConfirmed.slice(0, 5));
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (ready) {
      loadData();
    }
  }, [ready, loadData]);

  useEffect(() => {
    function handleDataChange() {
      loadData();
      if (selectedBooking) {
        bookingRepository.getBookingById(selectedBooking.id).then((fresh) => {
          if (fresh) setSelectedBooking(fresh);
        });
      }
    }
    window.addEventListener(DATA_CHANGE_EVENT, handleDataChange);
    return () =>
      window.removeEventListener(DATA_CHANGE_EVENT, handleDataChange);
  }, [loadData, selectedBooking]);

  function handleSelectBooking(booking: Booking) {
    setSelectedBooking(booking);
    setDrawerOpen(true);
  }

  async function handleStatusChange(id: string, nextStatus: BookingStatus) {
    const updated = await bookingRepository.updateStatus(id, nextStatus);
    setSelectedBooking(updated);
  }

  async function handleReschedule(id: string, date: string, time: string) {
    const updated = await bookingRepository.reschedule(id, date, time);
    setSelectedBooking(updated);
  }

  async function handleSaveStaffNotes(id: string, notes: string) {
    const updated = await bookingRepository.updateStaffNotes(id, notes);
    setSelectedBooking(updated);
  }

  if (!ready || loading) {
    return (
      <div className="flex min-h-[40vh] items-center justify-center">
        <p className="text-body text-text-muted">Loading workspace data...</p>
      </div>
    );
  }

  return (
    <div className="space-y-stack">
      {/* Top Banner */}
      <div className="flex flex-col gap-inline sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="font-display text-heading font-bold text-text">
            Front Desk Overview
          </h1>
          <p className="text-body text-text-muted">
            Manage inquiries, confirm appointments, and coordinate daily clinic
            schedules.
          </p>
        </div>

        <div className="flex items-center gap-inline">
          <Link
            className="rounded-control bg-action px-cluster py-control-y text-label font-bold uppercase tracking-label text-action-contrast hover:bg-action-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus"
            href="/ops/bookings"
          >
            All Bookings →
          </Link>
          <Link
            className="rounded-control border border-border bg-surface-raised px-cluster py-control-y text-label font-bold uppercase tracking-label text-text hover:bg-surface focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus"
            href="/ops/calendar"
          >
            Calendar View →
          </Link>
        </div>
      </div>

      {/* Metrics Row */}
      <OpsMetricCards metrics={metrics} />

      {/* Section 1: Inquiries Requiring Review */}
      <section aria-labelledby="pending-heading" className="pt-inline">
        <div className="flex items-center justify-between pb-inline">
          <div>
            <h2 className="text-card font-bold text-text" id="pending-heading">
              Inquiries Requiring Action ({metrics.pending})
            </h2>
            <p className="text-label text-text-muted">
              Recent booking inquiries awaiting staff telephone confirmation.
            </p>
          </div>
          <Link
            className="text-label font-bold text-action-contrast underline dark:text-action"
            href="/ops/bookings?status=pending"
          >
            View all pending ({metrics.pending})
          </Link>
        </div>

        <div className="mt-inline">
          <OpsBookingTable
            bookings={pendingBookings}
            onSelectBooking={handleSelectBooking}
            selectedBookingId={selectedBooking?.id}
          />
        </div>
      </section>

      {/* Section 2: Confirmed Appointments */}
      <section aria-labelledby="confirmed-heading" className="pt-stack">
        <div className="flex items-center justify-between pb-inline">
          <div>
            <h2
              className="text-card font-bold text-text"
              id="confirmed-heading"
            >
              Upcoming Confirmed Appointments ({metrics.confirmed})
            </h2>
            <p className="text-label text-text-muted">
              Confirmed consultations and smile treatments.
            </p>
          </div>
          <Link
            className="text-label font-bold text-action-contrast underline dark:text-action"
            href="/ops/bookings?status=confirmed"
          >
            View all confirmed ({metrics.confirmed})
          </Link>
        </div>

        <div className="mt-inline">
          <OpsBookingTable
            bookings={upcomingBookings}
            onSelectBooking={handleSelectBooking}
            selectedBookingId={selectedBooking?.id}
          />
        </div>
      </section>

      {/* Drawer */}
      <OpsBookingDetailsDrawer
        booking={selectedBooking}
        isOpen={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        onReschedule={handleReschedule}
        onSaveStaffNotes={handleSaveStaffNotes}
        onStatusChange={handleStatusChange}
      />
    </div>
  );
}
