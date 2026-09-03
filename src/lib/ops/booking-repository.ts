import type {
  Booking,
  BookingFilters,
  BookingStatus,
  OpsSummaryMetrics,
} from "../../types/ops";
import { INITIAL_BOOKING_SEED } from "./booking-seed";

const STORAGE_KEY = "kave_ops_bookings_v1";
export const DATA_CHANGE_EVENT = "kave_ops_data_change";

export interface BookingRepository {
  getBookings(filters?: BookingFilters): Promise<Booking[]>;
  getBookingById(id: string): Promise<Booking | null>;
  updateStatus(id: string, status: BookingStatus): Promise<Booking>;
  reschedule(id: string, date: string, time: string): Promise<Booking>;
  updateStaffNotes(id: string, staffNotes: string): Promise<Booking>;
  getMetrics(): Promise<OpsSummaryMetrics>;
  resetDemoData(): Promise<void>;
}

export class LocalStorageBookingRepository implements BookingRepository {
  private getStorage(): Storage | null {
    if (typeof window !== "undefined" && window.localStorage) {
      return window.localStorage;
    }
    return null;
  }

  private notifyChange(): void {
    if (typeof window !== "undefined") {
      window.dispatchEvent(new CustomEvent(DATA_CHANGE_EVENT));
    }
  }

  private readAll(): Booking[] {
    const storage = this.getStorage();
    if (!storage) {
      return [...INITIAL_BOOKING_SEED];
    }

    try {
      const raw = storage.getItem(STORAGE_KEY);
      if (!raw) {
        storage.setItem(STORAGE_KEY, JSON.stringify(INITIAL_BOOKING_SEED));
        return [...INITIAL_BOOKING_SEED];
      }
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed) && parsed.length > 0) {
        return parsed as Booking[];
      }
      storage.setItem(STORAGE_KEY, JSON.stringify(INITIAL_BOOKING_SEED));
      return [...INITIAL_BOOKING_SEED];
    } catch {
      return [...INITIAL_BOOKING_SEED];
    }
  }

  private saveAll(bookings: Booking[]): void {
    const storage = this.getStorage();
    if (storage) {
      try {
        storage.setItem(STORAGE_KEY, JSON.stringify(bookings));
      } catch (err) {
        console.error("Failed to save bookings to localStorage", err);
      }
    }
    this.notifyChange();
  }

  async getBookings(filters?: BookingFilters): Promise<Booking[]> {
    const all = this.readAll();

    return all.filter((booking) => {
      if (filters?.searchQuery) {
        const query = filters.searchQuery.toLowerCase().trim();
        const matchesName = booking.fullName.toLowerCase().includes(query);
        const matchesEmail = booking.email.toLowerCase().includes(query);
        const matchesPhone = booking.phone.toLowerCase().includes(query);
        const matchesId = booking.id.toLowerCase().includes(query);
        if (!matchesName && !matchesEmail && !matchesPhone && !matchesId) {
          return false;
        }
      }

      if (filters?.status && filters.status !== "all") {
        if (booking.status !== filters.status) {
          return false;
        }
      }

      if (filters?.serviceId && filters.serviceId !== "all") {
        if (booking.serviceId !== filters.serviceId) {
          return false;
        }
      }

      if (filters?.date) {
        if (booking.preferredDate !== filters.date) {
          return false;
        }
      }

      return true;
    });
  }

  async getBookingById(id: string): Promise<Booking | null> {
    const all = this.readAll();
    const found = all.find((b) => b.id === id);
    return found ? { ...found } : null;
  }

  async updateStatus(id: string, status: BookingStatus): Promise<Booking> {
    const all = this.readAll();
    const index = all.findIndex((b) => b.id === id);
    if (index === -1) {
      throw new Error(`Booking with ID ${id} not found.`);
    }

    const updated: Booking = {
      ...all[index],
      status,
      updatedAt: new Date().toISOString(),
    };

    all[index] = updated;
    this.saveAll(all);
    return updated;
  }

  async reschedule(id: string, date: string, time: string): Promise<Booking> {
    const all = this.readAll();
    const index = all.findIndex((b) => b.id === id);
    if (index === -1) {
      throw new Error(`Booking with ID ${id} not found.`);
    }

    const updated: Booking = {
      ...all[index],
      preferredDate: date,
      preferredTime: time,
      // If was cancelled or pending, rescheduling moves to confirmed or stays pending
      status:
        all[index].status === "cancelled" ? "confirmed" : all[index].status,
      updatedAt: new Date().toISOString(),
    };

    all[index] = updated;
    this.saveAll(all);
    return updated;
  }

  async updateStaffNotes(id: string, staffNotes: string): Promise<Booking> {
    const all = this.readAll();
    const index = all.findIndex((b) => b.id === id);
    if (index === -1) {
      throw new Error(`Booking with ID ${id} not found.`);
    }

    const updated: Booking = {
      ...all[index],
      staffNotes,
      updatedAt: new Date().toISOString(),
    };

    all[index] = updated;
    this.saveAll(all);
    return updated;
  }

  async getMetrics(): Promise<OpsSummaryMetrics> {
    const all = this.readAll();
    const todayStr = new Date().toISOString().slice(0, 10);

    const metrics: OpsSummaryMetrics = {
      total: all.length,
      pending: 0,
      confirmed: 0,
      completed: 0,
      cancelled: 0,
      todayCount: 0,
    };

    for (const b of all) {
      if (b.status === "pending") metrics.pending += 1;
      else if (b.status === "confirmed") metrics.confirmed += 1;
      else if (b.status === "completed") metrics.completed += 1;
      else if (b.status === "cancelled") metrics.cancelled += 1;

      if (b.preferredDate === todayStr) {
        metrics.todayCount += 1;
      }
    }

    return metrics;
  }

  async resetDemoData(): Promise<void> {
    const storage = this.getStorage();
    if (storage) {
      storage.setItem(STORAGE_KEY, JSON.stringify(INITIAL_BOOKING_SEED));
    }
    this.notifyChange();
  }
}

export const bookingRepository = new LocalStorageBookingRepository();
