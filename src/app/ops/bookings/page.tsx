"use client";

import { useSearchParams } from "next/navigation";
import { Suspense, useCallback, useEffect, useState } from "react";

import { OpsBookingDetailsDrawer } from "../../../components/ops/OpsBookingDetailsDrawer";
import { OpsBookingFilters } from "../../../components/ops/OpsBookingFilters";
import { OpsBookingTable } from "../../../components/ops/OpsBookingTable";
import { OpsMetricCards } from "../../../components/ops/OpsMetricCards";
import {
  bookingRepository,
  DATA_CHANGE_EVENT,
} from "../../../lib/ops/booking-repository";
import { useOpsAuth } from "../../../lib/ops/useOpsAuth";
import type {
  Booking,
  BookingFilters as BookingFiltersType,
  BookingStatus,
  OpsSummaryMetrics,
} from "../../../types/ops";

function BookingsContent() {
  const searchParams = useSearchParams();
  const initialStatus = (searchParams.get("status") as BookingStatus) || "all";

  const [filters, setFilters] = useState<BookingFiltersType>({
    status: initialStatus,
    serviceId: "all",
    searchQuery: "",
    date: undefined,
  });

  const [metrics, setMetrics] = useState<OpsSummaryMetrics>({
    total: 0,
    pending: 0,
    confirmed: 0,
    completed: 0,
    cancelled: 0,
    todayCount: 0,
  });

  const [bookings, setBookings] = useState<Booking[]>([]);
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  const loadData = useCallback(async () => {
    try {
      const [m, b] = await Promise.all([
        bookingRepository.getMetrics(),
        bookingRepository.getBookings(filters),
      ]);
      setMetrics(m);
      setBookings(b);
    } finally {
      setLoading(false);
    }
  }, [filters]);

  useEffect(() => {
    loadData();
  }, [loadData]);

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

  async function handleAddStaffNote(id: string, text: string) {
    const updated = await bookingRepository.addStaffNote(id, text);
    setSelectedBooking(updated);
  }

  async function handleUpdateStaffNote(
    id: string,
    noteId: string,
    text: string,
  ) {
    const updated = await bookingRepository.updateStaffNote(id, noteId, text);
    setSelectedBooking(updated);
  }

  async function handleDeleteStaffNote(id: string, noteId: string) {
    const updated = await bookingRepository.deleteStaffNote(id, noteId);
    setSelectedBooking(updated);
  }

  function handleMetricCardClick(
    status: "all" | "pending" | "confirmed" | "completed" | "cancelled",
  ) {
    setFilters((prev) => ({ ...prev, status }));
  }

  function handleResetFilters() {
    setFilters({
      status: "all",
      serviceId: "all",
      searchQuery: "",
      date: undefined,
    });
  }

  return (
    <div className="space-y-stack">
      <div>
        <h1 className="font-display text-heading font-bold text-text">
          Bookings Directory
        </h1>
        <p className="text-body text-text-muted">
          Search, filter, update appointment statuses, and manage patient
          inquiries.
        </p>
      </div>

      {/* Metric Cards connected to filter */}
      <OpsMetricCards
        metrics={metrics}
        onSelectStatus={handleMetricCardClick}
        selectedStatus={filters.status || "all"}
      />

      {/* Filters */}
      <OpsBookingFilters
        filters={filters}
        onChange={setFilters}
        onReset={handleResetFilters}
      />

      {/* Table Results */}
      <div>
        <div className="mb-inline flex items-center justify-between text-label text-text-muted">
          <span>Showing {bookings.length} matching booking(s)</span>
        </div>

        {loading ? (
          <div className="py-card-y text-center text-text-muted">
            Filtering appointments...
          </div>
        ) : (
          <OpsBookingTable
            bookings={bookings}
            onSelectBooking={handleSelectBooking}
            selectedBookingId={selectedBooking?.id}
          />
        )}
      </div>

      {/* Details Drawer */}
      <OpsBookingDetailsDrawer
        booking={selectedBooking}
        isOpen={drawerOpen}
        onAddStaffNote={handleAddStaffNote}
        onClose={() => setDrawerOpen(false)}
        onDeleteStaffNote={handleDeleteStaffNote}
        onReschedule={handleReschedule}
        onSaveStaffNotes={handleSaveStaffNotes}
        onStatusChange={handleStatusChange}
        onUpdateStaffNote={handleUpdateStaffNote}
      />
    </div>
  );
}

export default function OpsBookingsPage() {
  const { ready } = useOpsAuth();

  if (!ready) {
    return (
      <div className="flex min-h-[40vh] items-center justify-center">
        <p className="text-body text-text-muted">Checking staff session...</p>
      </div>
    );
  }

  return (
    <Suspense
      fallback={
        <div className="py-card-y text-center text-text-muted">
          Loading bookings...
        </div>
      }
    >
      <BookingsContent />
    </Suspense>
  );
}
