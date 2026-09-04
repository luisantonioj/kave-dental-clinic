"use client";

import { useCallback, useEffect, useState } from "react";

import { OpsBookingDetailsDrawer } from "../../../components/ops/OpsBookingDetailsDrawer";
import { OpsCalendarView } from "../../../components/ops/OpsCalendarView";
import {
  bookingRepository,
  DATA_CHANGE_EVENT,
} from "../../../lib/ops/booking-repository";
import { useOpsAuth } from "../../../lib/ops/useOpsAuth";
import type { Booking, BookingStatus } from "../../../types/ops";

export default function OpsCalendarPage() {
  const { ready } = useOpsAuth();

  const [bookings, setBookings] = useState<Booking[]>([]);
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  const loadData = useCallback(async () => {
    try {
      const all = await bookingRepository.getBookings();
      setBookings(all);
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
        <p className="text-body text-text-muted">
          Loading calendar schedule...
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col flex-1 min-h-[calc(100vh-12rem)] space-y-cluster">
      <div>
        <h1 className="font-display text-heading font-bold text-text">
          Appointment Calendar
        </h1>
        <p className="text-body text-text-muted">
          Visualize scheduled appointments by date, inspect daily schedules, and
          manage bookings.
        </p>
      </div>

      <OpsCalendarView
        bookings={bookings}
        onSelectBooking={handleSelectBooking}
      />

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
