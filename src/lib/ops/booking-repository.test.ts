import { beforeEach, describe, expect, it } from "vitest";
import { LocalStorageBookingRepository } from "./booking-repository";
import { INITIAL_BOOKING_SEED } from "./booking-seed";

describe("LocalStorageBookingRepository", () => {
  let repo: LocalStorageBookingRepository;

  beforeEach(() => {
    localStorage.clear();
    repo = new LocalStorageBookingRepository();
  });

  it("returns initial seed data when empty", async () => {
    const bookings = await repo.getBookings();
    expect(bookings).toHaveLength(INITIAL_BOOKING_SEED.length);
    expect(bookings[0].id).toBe(INITIAL_BOOKING_SEED[0].id);
  });

  it("filters bookings by status", async () => {
    const pending = await repo.getBookings({ status: "pending" });
    expect(pending.every((b) => b.status === "pending")).toBe(true);
    expect(pending.length).toBeGreaterThan(0);
  });

  it("filters bookings by search query (name, email, phone, id)", async () => {
    const byName = await repo.getBookings({ searchQuery: "Maria Clara" });
    expect(byName).toHaveLength(1);
    expect(byName[0].fullName).toBe("Maria Clara Santos");

    const byId = await repo.getBookings({ searchQuery: "KV-2026-002" });
    expect(byId).toHaveLength(1);
    expect(byId[0].fullName).toBe("Gabriel Ramos");
  });

  it("filters bookings by serviceId", async () => {
    const veneers = await repo.getBookings({ serviceId: "zirconia-veneers" });
    expect(veneers.every((b) => b.serviceId === "zirconia-veneers")).toBe(true);
  });

  it("filters bookings by appointment date", async () => {
    const forDate = await repo.getBookings({ date: "2026-09-04" });
    expect(forDate.every((b) => b.preferredDate === "2026-09-04")).toBe(true);
  });

  it("updates booking status", async () => {
    const updated = await repo.updateStatus("KV-2026-001", "confirmed");
    expect(updated.status).toBe("confirmed");

    const fetched = await repo.getBookingById("KV-2026-001");
    expect(fetched?.status).toBe("confirmed");
  });

  it("reschedules an appointment", async () => {
    const updated = await repo.reschedule("KV-2026-001", "2026-09-12", "15:00");
    expect(updated.preferredDate).toBe("2026-09-12");
    expect(updated.preferredTime).toBe("15:00");
  });

  it("updates staff notes with legacy method", async () => {
    const updated = await repo.updateStaffNotes(
      "KV-2026-001",
      "Follow-up done.",
    );
    expect(updated.staffNotes).toBe("Follow-up done.");
  });

  it("adds a new staff note", async () => {
    const updated = await repo.addStaffNote(
      "KV-2026-001",
      "Patient called to confirm parking.",
    );
    expect(updated.internalNotes).toBeDefined();
    expect(
      updated.internalNotes?.some((n) => n.text === "Patient called to confirm parking."),
    ).toBe(true);
    expect(updated.staffNotes).toBe("Patient called to confirm parking.");
  });

  it("updates an existing staff note", async () => {
    const added = await repo.addStaffNote("KV-2026-001", "Initial note");
    const noteId = added.internalNotes?.[added.internalNotes.length - 1].id;
    expect(noteId).toBeDefined();

    const updated = await repo.updateStaffNote(
      "KV-2026-001",
      noteId!,
      "Corrected note text",
    );
    const targetNote = updated.internalNotes?.find((n) => n.id === noteId);
    expect(targetNote?.text).toBe("Corrected note text");
    expect(targetNote?.updatedAt).toBeDefined();
  });

  it("deletes a staff note", async () => {
    const added = await repo.addStaffNote("KV-2026-001", "Note to be deleted");
    const noteId = added.internalNotes?.[added.internalNotes.length - 1].id;
    expect(noteId).toBeDefined();

    const updated = await repo.deleteStaffNote("KV-2026-001", noteId!);
    expect(updated.internalNotes?.some((n) => n.id === noteId)).toBe(false);
  });

  it("computes summary metrics correctly", async () => {
    const metrics = await repo.getMetrics();
    expect(metrics.total).toBe(INITIAL_BOOKING_SEED.length);
    expect(
      metrics.pending +
        metrics.confirmed +
        metrics.completed +
        metrics.cancelled,
    ).toBe(metrics.total);
  });

  it("resets demo data cleanly", async () => {
    await repo.updateStatus("KV-2026-001", "cancelled");
    const cancelled = await repo.getBookingById("KV-2026-001");
    expect(cancelled?.status).toBe("cancelled");

    await repo.resetDemoData();
    const reset = await repo.getBookingById("KV-2026-001");
    expect(reset?.status).toBe("pending");
  });
});
