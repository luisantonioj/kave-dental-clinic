"use client";

import { useMemo, useState } from "react";
import type { Booking } from "../../types/ops";
import { getStatusBadgeClasses } from "./OpsBookingTable";

interface OpsCalendarViewProps {
  bookings: Booking[];
  onSelectBooking: (booking: Booking) => void;
}

const MONTH_NAMES = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const DAY_NAMES = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

export function OpsCalendarView({
  bookings,
  onSelectBooking,
}: OpsCalendarViewProps) {
  // Current view date anchor: defaults to September 2026 (matching the seed date) or current date
  const [currentDate, setCurrentDate] = useState(() => {
    // If we have bookings, initialize around the first booking date (2026-09)
    if (bookings.length > 0 && bookings[0].preferredDate) {
      const parts = bookings[0].preferredDate.split("-");
      return new Date(Number(parts[0]), Number(parts[1]) - 1, 1);
    }
    return new Date();
  });

  const [selectedDateStr, setSelectedDateStr] = useState<string>(() => {
    return bookings[0]?.preferredDate || new Date().toISOString().slice(0, 10);
  });

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  // Group bookings by YYYY-MM-DD
  const bookingsByDate = useMemo(() => {
    const map = new Map<string, Booking[]>();
    for (const b of bookings) {
      const arr = map.get(b.preferredDate) || [];
      arr.push(b);
      map.set(b.preferredDate, arr);
    }
    return map;
  }, [bookings]);

  // Generate calendar days
  const calendarDays = useMemo(() => {
    const firstDayIndex = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    const days: Array<{
      dayNumber: number;
      dateStr: string;
      isCurrentMonth: boolean;
      bookings: Booking[];
    }> = [];

    // Previous month padding
    const prevMonthLastDay = new Date(year, month, 0).getDate();
    for (let i = firstDayIndex - 1; i >= 0; i--) {
      const d = prevMonthLastDay - i;
      const prevMonth = month === 0 ? 11 : month - 1;
      const prevYear = month === 0 ? year - 1 : year;
      const dateStr = `${prevYear}-${String(prevMonth + 1).padStart(2, "0")}-${String(d).padStart(2, "0")}`;
      days.push({
        dayNumber: d,
        dateStr,
        isCurrentMonth: false,
        bookings: bookingsByDate.get(dateStr) || [],
      });
    }

    // Current month days
    for (let d = 1; d <= daysInMonth; d++) {
      const dateStr = `${year}-${String(month + 1).padStart(2, "0")}-${String(d).padStart(2, "0")}`;
      days.push({
        dayNumber: d,
        dateStr,
        isCurrentMonth: true,
        bookings: bookingsByDate.get(dateStr) || [],
      });
    }

    // Trailing days to fill 35 or 42 grid cells
    const remaining =
      35 - days.length > 0 ? 35 - days.length : 42 - days.length;
    for (let d = 1; d <= remaining; d++) {
      const nextMonth = month === 11 ? 0 : month + 1;
      const nextYear = month === 11 ? year + 1 : year;
      const dateStr = `${nextYear}-${String(nextMonth + 1).padStart(2, "0")}-${String(d).padStart(2, "0")}`;
      days.push({
        dayNumber: d,
        dateStr,
        isCurrentMonth: false,
        bookings: bookingsByDate.get(dateStr) || [],
      });
    }

    return days;
  }, [year, month, bookingsByDate]);

  function prevMonth() {
    setCurrentDate(new Date(year, month - 1, 1));
  }

  function nextMonth() {
    setCurrentDate(new Date(year, month + 1, 1));
  }

  function goToToday() {
    setCurrentDate(new Date(2026, 8, 1)); // September 2026 for demo alignment
    setSelectedDateStr("2026-09-04");
  }

  const selectedDayBookings = bookingsByDate.get(selectedDateStr) || [];

  return (
    <div className="flex flex-col lg:grid lg:grid-cols-3 gap-stack flex-1 lg:min-h-[calc(100vh-13rem)] items-stretch">
      {/* Calendar Grid (2 cols on lg) */}
      <div className="rounded-card border border-border bg-surface-raised p-cluster lg:col-span-2 flex flex-col h-full">
        {/* Month Navigation */}
        <div className="flex items-center justify-between border-b border-border pb-cluster flex-shrink-0">
          <div className="flex items-center gap-inline">
            <h2 className="font-display text-card font-bold text-text">
              {MONTH_NAMES[month]} {year}
            </h2>
            <button
              className="rounded-control border border-border bg-surface px-inline py-0.5 text-label font-bold uppercase tracking-label text-text-muted hover:text-text"
              onClick={goToToday}
              type="button"
            >
              Demo Current
            </button>
          </div>

          <div className="flex items-center gap-inline">
            <button
              aria-label="Previous month"
              className="rounded-control border border-border px-cluster py-inline text-body hover:bg-surface focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus"
              onClick={prevMonth}
              type="button"
            >
              ‹
            </button>
            <button
              aria-label="Next month"
              className="rounded-control border border-border px-cluster py-inline text-body hover:bg-surface focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus"
              onClick={nextMonth}
              type="button"
            >
              ›
            </button>
          </div>
        </div>

        {/* Day of Week Headers */}
        <div className="mt-inline grid grid-cols-7 text-center text-label font-bold uppercase tracking-label text-text-muted flex-shrink-0">
          {DAY_NAMES.map((name) => (
            <div className="py-inline" key={name}>
              {name}
            </div>
          ))}
        </div>

        {/* Days Grid - stretches to maximize vertical space */}
        <div
          className="flex-1 grid grid-cols-7 gap-px border border-border bg-border"
          style={{
            gridTemplateRows: `repeat(${calendarDays.length / 7}, minmax(5rem, 1fr))`,
          }}
        >
          {calendarDays.map((day, idx) => {
            const isSelected = day.dateStr === selectedDateStr;
            const hasBookings = day.bookings.length > 0;

            return (
              <button
                className={`h-full min-h-[5.5rem] p-1.5 text-left transition-colors flex flex-col justify-between focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus ${
                  day.isCurrentMonth
                    ? isSelected
                      ? "bg-action/20 font-bold"
                      : "bg-surface-raised hover:bg-surface"
                    : "bg-surface/50 text-text-muted"
                }`}
                key={`${day.dateStr}-${idx}`}
                onClick={() => setSelectedDateStr(day.dateStr)}
                type="button"
              >
                <div className="flex items-center justify-between">
                  <span
                    className={`inline-flex h-5 w-5 items-center justify-center rounded-full text-[0.75rem] ${
                      isSelected
                        ? "bg-action font-bold text-action-contrast"
                        : "text-text"
                    }`}
                  >
                    {day.dayNumber}
                  </span>
                  {hasBookings ? (
                    <span className="rounded-pill bg-action/20 px-1 text-[0.65rem] font-bold text-text">
                      {day.bookings.length}
                    </span>
                  ) : null}
                </div>

                {hasBookings ? (
                  <div className="mt-1 flex flex-1 flex-col gap-1 overflow-hidden">
                    {day.bookings.slice(0, 3).map((b) => (
                      <span
                        className={`truncate rounded px-1.5 py-0.5 text-[0.68rem] leading-tight font-medium ${getStatusBadgeClasses(
                          b.status,
                        )}`}
                        key={b.id}
                      >
                        {b.preferredTime} {b.fullName.split(" ")[0]}
                      </span>
                    ))}
                    {day.bookings.length > 3 ? (
                      <span className="text-[0.65rem] font-semibold text-text-muted">
                        +{day.bookings.length - 3} more
                      </span>
                    ) : null}
                  </div>
                ) : (
                  <div className="flex-1" />
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Day Agenda Panel (1 col on lg) - matches vertical height */}
      <div className="rounded-card border border-border bg-surface-raised p-cluster flex flex-col h-full">
        <div className="border-b border-border pb-inline flex-shrink-0">
          <span className="text-label font-bold uppercase tracking-label text-text-muted">
            Daily Agenda
          </span>
          <h3 className="text-card font-bold text-text">{selectedDateStr}</h3>
          <p className="text-[0.875rem] text-text-muted">
            {selectedDayBookings.length === 0
              ? "No appointments scheduled for this date."
              : `${selectedDayBookings.length} appointment(s)`}
          </p>
        </div>

        <div className="mt-cluster divide-y divide-border overflow-y-auto flex-1 min-h-0 pr-1 max-h-[32rem] lg:max-h-none">
          {selectedDayBookings.length === 0 ? (
            <div className="flex flex-1 items-center justify-center py-card-y text-center text-text-muted">
              <p>Select another date on the calendar to inspect schedule.</p>
            </div>
          ) : (
            selectedDayBookings.map((b) => (
              <div
                className="cursor-pointer py-cluster transition-colors hover:bg-surface"
                key={b.id}
                onClick={() => onSelectBooking(b)}
                role="button"
                tabIndex={0}
              >
                <div className="flex items-center justify-between">
                  <span className="font-mono text-[0.75rem] text-text-muted">
                    {b.id}
                  </span>
                  <span
                    className={`rounded-pill border px-inline py-0.5 text-[0.7rem] uppercase tracking-label ${getStatusBadgeClasses(
                      b.status,
                    )}`}
                  >
                    {b.status}
                  </span>
                </div>

                <div className="mt-1 font-bold text-text">{b.fullName}</div>
                <div className="text-[0.875rem] text-text-muted">
                  {b.serviceName}
                </div>

                <div className="mt-inline flex items-center justify-between text-label">
                  <span className="font-bold text-text">
                    ⏰ {b.preferredTime}
                  </span>
                  <span className="font-bold text-action-contrast underline dark:text-action">
                    Manage →
                  </span>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
