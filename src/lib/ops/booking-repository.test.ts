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

  it("updates staff notes", async () => {
    const updated = await repo.updateStaffNotes(
      "KV-2026-001",
      "Follow-up done.",
    );
    expect(updated.staffNotes).toBe("Follow-up done.");
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
