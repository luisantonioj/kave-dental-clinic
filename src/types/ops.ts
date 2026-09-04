export type BookingStatus = "pending" | "confirmed" | "completed" | "cancelled";

export interface StaffNote {
  id: string;
  text: string;
  createdAt: string; // ISO 8601
  updatedAt?: string;
  author?: string;
}

export interface Booking {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  serviceId: string;
  serviceName: string;
  preferredDate: string; // YYYY-MM-DD
  preferredTime: string; // HH:MM
  notes: string;
  status: BookingStatus;
  staffNotes?: string;
  internalNotes?: StaffNote[];
  createdAt: string; // ISO 8601
  updatedAt: string; // ISO 8601
}

export interface BookingFilters {
  searchQuery?: string;
  status?: BookingStatus | "all";
  serviceId?: string | "all";
  date?: string; // YYYY-MM-DD
}

export interface OpsSummaryMetrics {
  total: number;
  pending: number;
  confirmed: number;
  completed: number;
  cancelled: number;
  todayCount: number;
}

export interface RescheduleInput {
  date: string;
  time: string;
}
