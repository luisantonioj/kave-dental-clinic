"use client";

import { useEffect, useMemo, useState } from "react";
import type { Booking, BookingStatus, StaffNote } from "../../types/ops";
import { getStatusBadgeClasses } from "./OpsBookingTable";
import { OpsRescheduleModal } from "./OpsRescheduleModal";

interface OpsBookingDetailsDrawerProps {
  booking: Booking | null;
  isOpen: boolean;
  onClose: () => void;
  onStatusChange: (id: string, status: BookingStatus) => Promise<void>;
  onReschedule: (id: string, date: string, time: string) => Promise<void>;
  onSaveStaffNotes?: (id: string, notes: string) => Promise<void>;
  onAddStaffNote?: (id: string, text: string) => Promise<void>;
  onUpdateStaffNote?: (id: string, noteId: string, text: string) => Promise<void>;
  onDeleteStaffNote?: (id: string, noteId: string) => Promise<void>;
}

function CheckCircleIcon() {
  return (
    <svg
      aria-hidden="true"
      className="h-4 w-4 shrink-0"
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2.5"
      viewBox="0 0 24 24"
    >
      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
      <polyline points="22 4 12 14.01 9 11.01" />
    </svg>
  );
}

function CalendarClockIcon() {
  return (
    <svg
      aria-hidden="true"
      className="h-4 w-4 shrink-0"
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      viewBox="0 0 24 24"
    >
      <rect height="18" rx="2" ry="2" width="18" x="3" y="4" />
      <line x1="16" x2="16" y1="2" y2="6" />
      <line x1="8" x2="8" y1="2" y2="6" />
      <line x1="3" x2="21" y1="10" y2="10" />
      <polyline points="12 14 12 17 15 17" />
    </svg>
  );
}

function DoubleCheckIcon() {
  return (
    <svg
      aria-hidden="true"
      className="h-4 w-4 shrink-0"
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2.5"
      viewBox="0 0 24 24"
    >
      <polyline points="20 6 9 17 4 12" />
      <polyline points="20 12 14 18" />
    </svg>
  );
}

function BanIcon() {
  return (
    <svg
      aria-hidden="true"
      className="h-4 w-4 shrink-0"
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      viewBox="0 0 24 24"
    >
      <circle cx="12" cy="12" r="10" />
      <line x1="4.93" x2="19.07" y1="4.93" y2="19.07" />
    </svg>
  );
}

function RotateCcwIcon() {
  return (
    <svg
      aria-hidden="true"
      className="h-4 w-4 shrink-0"
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      viewBox="0 0 24 24"
    >
      <polyline points="1 4 1 10 7 10" />
      <path d="M3.51 15a9 9 0 1 0 2.13-9.36L1 10" />
    </svg>
  );
}

function EditIcon() {
  return (
    <svg
      aria-hidden="true"
      className="h-3.5 w-3.5 shrink-0"
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      viewBox="0 0 24 24"
    >
      <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
      <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
    </svg>
  );
}

function TrashIcon() {
  return (
    <svg
      aria-hidden="true"
      className="h-3.5 w-3.5 shrink-0"
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      viewBox="0 0 24 24"
    >
      <polyline points="3 6 5 6 21 6" />
      <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
    </svg>
  );
}

export function OpsBookingDetailsDrawer({
  booking,
  isOpen,
  onClose,
  onStatusChange,
  onReschedule,
  onSaveStaffNotes,
  onAddStaffNote,
  onUpdateStaffNote,
  onDeleteStaffNote,
}: OpsBookingDetailsDrawerProps) {
  const [prevBookingId, setPrevBookingId] = useState(booking?.id);
  const [newNoteText, setNewNoteText] = useState("");
  const [editingNoteId, setEditingNoteId] = useState<string | null>(null);
  const [editingNoteText, setEditingNoteText] = useState("");
  const [savingNotes, setSavingNotes] = useState(false);
  const [notesMessage, setNotesMessage] = useState<string | null>(null);
  const [isRescheduleOpen, setIsRescheduleOpen] = useState(false);
  const [actionLoading, setActionLoading] = useState(false);

  if (booking && booking.id !== prevBookingId) {
    setPrevBookingId(booking.id);
    setNewNoteText("");
    setEditingNoteId(null);
    setEditingNoteText("");
    setNotesMessage(null);
  }

  const notesList: StaffNote[] = useMemo(() => {
    if (!booking) return [];
    if (booking.internalNotes && booking.internalNotes.length > 0) {
      return booking.internalNotes;
    }
    if (booking.staffNotes && booking.staffNotes.trim()) {
      return [
        {
          id: `legacy-${booking.id}`,
          text: booking.staffNotes,
          createdAt: booking.updatedAt || booking.createdAt,
          author: "Front Desk Staff",
        },
      ];
    }
    return [];
  }, [booking]);

  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape" && isOpen && !isRescheduleOpen) {
        onClose();
      }
    }
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, isRescheduleOpen, onClose]);

  if (!isOpen || !booking) return null;

  async function handleStatus(nextStatus: BookingStatus) {
    if (!booking) return;
    try {
      setActionLoading(true);
      await onStatusChange(booking.id, nextStatus);
    } finally {
      setActionLoading(false);
    }
  }

  async function handleAddNote() {
    if (!booking || !newNoteText.trim()) return;
    try {
      setSavingNotes(true);
      if (onAddStaffNote) {
        await onAddStaffNote(booking.id, newNoteText.trim());
      } else if (onSaveStaffNotes) {
        await onSaveStaffNotes(booking.id, newNoteText.trim());
      }
      setNewNoteText("");
      setNotesMessage("Notes saved");
      setTimeout(() => setNotesMessage(null), 3000);
    } finally {
      setSavingNotes(false);
    }
  }

  function handleStartEdit(note: StaffNote) {
    setEditingNoteId(note.id);
    setEditingNoteText(note.text);
  }

  function handleCancelEdit() {
    setEditingNoteId(null);
    setEditingNoteText("");
  }

  async function handleSaveEdit(noteId: string) {
    if (!booking || !editingNoteText.trim()) return;
    try {
      setSavingNotes(true);
      if (onUpdateStaffNote) {
        await onUpdateStaffNote(booking.id, noteId, editingNoteText.trim());
      } else if (onSaveStaffNotes) {
        await onSaveStaffNotes(booking.id, editingNoteText.trim());
      }
      setEditingNoteId(null);
      setEditingNoteText("");
      setNotesMessage("Note updated");
      setTimeout(() => setNotesMessage(null), 3000);
    } finally {
      setSavingNotes(false);
    }
  }

  async function handleDeleteNote(noteId: string) {
    if (!booking) return;
    try {
      setSavingNotes(true);
      if (onDeleteStaffNote) {
        await onDeleteStaffNote(booking.id, noteId);
      } else if (onSaveStaffNotes) {
        await onSaveStaffNotes(booking.id, "");
      }
      setNotesMessage("Note deleted");
      setTimeout(() => setNotesMessage(null), 3000);
    } finally {
      setSavingNotes(false);
    }
  }

  return (
    <>
      <div
        aria-hidden="true"
        className="fixed inset-0 z-40 bg-black/40 backdrop-blur-xs transition-opacity"
        onClick={onClose}
      />

      <aside
        aria-label="Booking Details Drawer"
        className="fixed inset-y-0 right-0 z-50 flex w-full max-w-lg flex-col border-l border-border bg-surface-raised shadow-2xl transition-transform"
        role="dialog"
      >
        {/* Drawer Header */}
        <div className="flex items-start justify-between border-b border-border p-cluster bg-surface">
          <div>
            <div className="flex items-center gap-inline">
              <span className="font-mono text-label text-text-muted">
                {booking.id}
              </span>
              <span
                className={`rounded-pill border px-inline py-0.5 text-label uppercase tracking-label ${getStatusBadgeClasses(
                  booking.status,
                )}`}
              >
                {booking.status}
              </span>
            </div>
            <h2 className="mt-inline text-card font-bold text-text">
              {booking.fullName}
            </h2>
          </div>

          <button
            aria-label="Close drawer"
            className="rounded-control p-inline text-body text-text-muted hover:text-text focus-visible:outline-none focus-visible:ring-[length:var(--focus-ring-width)] focus-visible:ring-focus"
            onClick={onClose}
            type="button"
          >
            ✕
          </button>
        </div>

        {/* Drawer Body */}
        <div className="flex-1 overflow-y-auto p-cluster space-y-stack text-body">
          {/* Action Toolbar */}
          <div className="rounded-card border border-border bg-surface p-cluster">
            <span className="block text-label font-bold uppercase tracking-label text-text-muted">
              Quick Actions
            </span>
            <div className="mt-inline grid grid-cols-1 sm:grid-cols-2 gap-inline w-full">
              {booking.status === "pending" ? (
                <button
                  className="sm:col-span-2 w-full flex items-center justify-center gap-2 rounded-control bg-action px-cluster py-2.5 text-label font-bold uppercase tracking-label text-action-contrast hover:bg-action-hover focus-visible:outline-none focus-visible:ring-[length:var(--focus-ring-width)] focus-visible:ring-focus transition-colors"
                  disabled={actionLoading}
                  onClick={() => handleStatus("confirmed")}
                  type="button"
                >
                  <CheckCircleIcon />
                  Confirm Booking
                </button>
              ) : null}

              {booking.status === "confirmed" ? (
                <button
                  className="sm:col-span-2 w-full flex items-center justify-center gap-2 rounded-control border border-success/40 bg-success/15 px-cluster py-2.5 text-label font-bold uppercase tracking-label text-success hover:bg-success/25 focus-visible:outline-none focus-visible:ring-[length:var(--focus-ring-width)] focus-visible:ring-focus transition-colors"
                  disabled={actionLoading}
                  onClick={() => handleStatus("completed")}
                  type="button"
                >
                  <DoubleCheckIcon />
                  Mark Completed
                </button>
              ) : null}

              <button
                className="w-full flex items-center justify-center gap-2 rounded-control border border-border bg-surface-raised px-cluster py-2.5 text-label font-bold uppercase tracking-label text-text hover:bg-surface focus-visible:outline-none focus-visible:ring-[length:var(--focus-ring-width)] focus-visible:ring-focus transition-colors"
                disabled={actionLoading}
                onClick={() => setIsRescheduleOpen(true)}
                type="button"
              >
                <CalendarClockIcon />
                Reschedule
              </button>

              {booking.status !== "cancelled" ? (
                <button
                  className="w-full flex items-center justify-center gap-2 rounded-control border border-error/40 px-cluster py-2.5 text-label font-bold uppercase tracking-label text-error hover:bg-error/10 focus-visible:outline-none focus-visible:ring-[length:var(--focus-ring-width)] focus-visible:ring-focus transition-colors"
                  disabled={actionLoading}
                  onClick={() => {
                    if (
                      confirm("Are you sure you want to cancel this booking?")
                    ) {
                      handleStatus("cancelled");
                    }
                  }}
                  type="button"
                >
                  <BanIcon />
                  Cancel
                </button>
              ) : (
                <button
                  className="w-full flex items-center justify-center gap-2 rounded-control border border-border px-cluster py-2.5 text-label font-bold uppercase tracking-label text-text-muted hover:text-text hover:bg-surface focus-visible:outline-none focus-visible:ring-[length:var(--focus-ring-width)] focus-visible:ring-focus transition-colors"
                  disabled={actionLoading}
                  onClick={() => handleStatus("pending")}
                  type="button"
                >
                  <RotateCcwIcon />
                  Re-open (Pending)
                </button>
              )}
            </div>
          </div>

          {/* Appointment Schedule & Service */}
          <div className="grid grid-cols-2 gap-cluster">
            <div className="rounded-card border border-border p-cluster">
              <span className="text-label font-bold uppercase tracking-label text-text-muted">
                Appointment Schedule
              </span>
              <p className="mt-inline text-lead font-bold text-text">
                {booking.preferredDate}
              </p>
              <p className="text-body text-text-muted">
                {booking.preferredTime}
              </p>
            </div>

            <div className="rounded-card border border-border p-cluster">
              <span className="text-label font-bold uppercase tracking-label text-text-muted">
                Selected Service
              </span>
              <p className="mt-inline text-lead font-bold text-text">
                {booking.serviceName}
              </p>
              <p className="font-mono text-[0.75rem] text-text-muted">
                ID: {booking.serviceId}
              </p>
            </div>
          </div>

          {/* Contact Details */}
          <div className="rounded-card border border-border p-cluster">
            <span className="text-label font-bold uppercase tracking-label text-text-muted">
              Patient Contact Information
            </span>
            <div className="mt-inline grid gap-inline sm:grid-cols-2">
              <div>
                <span className="text-label text-text-muted">Phone:</span>
                <p>
                  <a
                    className="font-bold text-text underline hover:text-action-active focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus"
                    href={`tel:${booking.phone.replace(/\s+/g, "")}`}
                  >
                    {booking.phone}
                  </a>
                </p>
              </div>
              <div>
                <span className="text-label text-text-muted">Email:</span>
                <p>
                  <a
                    className="font-bold text-text underline hover:text-action-active focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus"
                    href={`mailto:${booking.email}`}
                  >
                    {booking.email}
                  </a>
                </p>
              </div>
            </div>
          </div>

          {/* Patient Submitted Notes */}
          <div className="rounded-card border border-border p-cluster">
            <span className="text-label font-bold uppercase tracking-label text-text-muted">
              Patient Inbound Notes
            </span>
            <p className="mt-inline text-body text-text italic">
              {booking.notes
                ? `"${booking.notes}"`
                : "No notes provided by patient."}
            </p>
          </div>

          {/* Internal Staff Notes */}
          <div className="rounded-card border border-border bg-surface p-cluster space-y-cluster">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-label font-bold uppercase tracking-label text-text-muted">
                  Internal Staff Notes
                </h3>
                <p className="text-[0.75rem] text-text-muted mt-0.5">
                  Visible to front desk staff only.
                </p>
              </div>
              <span className="rounded-pill border border-border bg-surface-raised px-inline py-0.5 text-label font-bold text-text-muted">
                {notesList.length} {notesList.length === 1 ? "note" : "notes"}
              </span>
            </div>

            {/* Posted Notes List - Placed ABOVE the input portion */}
            <div className="space-y-inline">
              <span className="block text-[0.7rem] font-bold uppercase tracking-label text-text-muted">
                Posted Notes
              </span>
              {notesList.length === 0 ? (
                <div className="rounded-control border border-dashed border-border bg-surface-raised p-cluster text-center text-label text-text-muted">
                  No internal staff notes posted yet.
                </div>
              ) : (
                <div className="space-y-inline max-h-[16rem] overflow-y-auto pr-1">
                  {notesList.map((note) => {
                    const isEditing = editingNoteId === note.id;

                    if (isEditing) {
                      return (
                        <div
                          className="rounded-control border border-action bg-surface-raised p-cluster space-y-inline"
                          key={note.id}
                        >
                          <textarea
                            aria-label="Edit note text"
                            className="w-full min-h-[4rem] rounded-control border border-border bg-surface p-inline text-body text-text focus:border-action focus:outline-none focus:ring-[length:var(--focus-ring-width)] focus:ring-focus"
                            onChange={(e) => setEditingNoteText(e.target.value)}
                            value={editingNoteText}
                          />
                          <div className="flex items-center justify-end gap-inline">
                            <button
                              className="rounded-control border border-border px-inline py-1 text-label font-bold uppercase tracking-label text-text-muted hover:text-text"
                              onClick={handleCancelEdit}
                              type="button"
                            >
                              Cancel
                            </button>
                            <button
                              className="rounded-control bg-action px-cluster py-1 text-label font-bold uppercase tracking-label text-action-contrast hover:bg-action-hover"
                              disabled={savingNotes || !editingNoteText.trim()}
                              onClick={() => handleSaveEdit(note.id)}
                              type="button"
                            >
                              Save
                            </button>
                          </div>
                        </div>
                      );
                    }

                    return (
                      <div
                        className="rounded-control border border-border bg-surface-raised p-cluster transition-colors hover:border-border-strong"
                        key={note.id}
                      >
                        <p className="text-body text-text whitespace-pre-wrap break-words">
                          {note.text}
                        </p>
                        <div className="mt-inline flex items-center justify-between border-t border-border/60 pt-1 text-[0.75rem] text-text-muted">
                          <span>
                            {new Date(note.createdAt).toLocaleString(undefined, {
                              month: "short",
                              day: "numeric",
                              hour: "numeric",
                              minute: "2-digit",
                            })}
                            {note.updatedAt ? " (edited)" : ""}
                          </span>
                          <div className="flex items-center gap-1">
                            <button
                              aria-label="Edit note"
                              className="rounded p-1 text-text-muted hover:text-text hover:bg-surface focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-focus"
                              onClick={() => handleStartEdit(note)}
                              title="Edit note"
                              type="button"
                            >
                              <EditIcon />
                            </button>
                            <button
                              aria-label="Delete note"
                              className="rounded p-1 text-text-muted hover:text-error hover:bg-error/10 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-focus"
                              onClick={() => handleDeleteNote(note.id)}
                              title="Delete note"
                              type="button"
                            >
                              <TrashIcon />
                            </button>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Input portion for notes - Placed BELOW posted notes */}
            <div className="border-t border-border pt-cluster space-y-inline">
              <label
                className="block text-label font-bold uppercase tracking-label text-text-muted"
                htmlFor="staff-notes"
              >
                Add Internal Note
              </label>
              <textarea
                aria-label="Internal Staff Notes"
                className="min-h-[4.5rem] w-full rounded-control border border-border bg-surface-raised p-cluster text-body text-text focus:border-action focus:outline-none focus:ring-[length:var(--focus-ring-width)] focus:ring-focus"
                id="staff-notes"
                onChange={(e) => setNewNoteText(e.target.value)}
                placeholder="Write an internal note for clinic staff..."
                value={newNoteText}
              />
              <div className="flex items-center justify-between">
                {notesMessage ? (
                  <span className="text-label font-bold text-success">
                    ✓ {notesMessage}
                  </span>
                ) : (
                  <span />
                )}
                <button
                  className="rounded-control bg-action px-cluster py-inline text-label font-bold uppercase tracking-label text-action-contrast hover:bg-action-hover focus-visible:outline-none focus-visible:ring-[length:var(--focus-ring-width)] focus-visible:ring-focus disabled:opacity-50"
                  disabled={savingNotes || !newNoteText.trim()}
                  onClick={handleAddNote}
                  type="button"
                >
                  {savingNotes ? "Saving..." : "Save Notes"}
                </button>
              </div>
            </div>
          </div>

          {/* Metadata Timestamps */}
          <div className="border-t border-border pt-cluster text-[0.75rem] text-text-muted">
            <p>Created: {new Date(booking.createdAt).toLocaleString()}</p>
            <p>Updated: {new Date(booking.updatedAt).toLocaleString()}</p>
          </div>
        </div>
      </aside>

      {/* Reschedule Modal */}
      <OpsRescheduleModal
        booking={booking}
        isOpen={isRescheduleOpen}
        onClose={() => setIsRescheduleOpen(false)}
        onConfirm={async (newDate, newTime) => {
          await onReschedule(booking.id, newDate, newTime);
        }}
      />
    </>
  );
}
