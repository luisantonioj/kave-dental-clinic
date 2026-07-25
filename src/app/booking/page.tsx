import type { Metadata } from "next";

import { BookingContactCards } from "../../components/booking/BookingContactCards";
import { BookingForm } from "../../components/booking/BookingForm";
import { BookingLocation } from "../../components/booking/BookingLocation";

export const metadata: Metadata = {
  title: "Explore Booking | Kave Dental Clinic",
  description:
    "Explore Kave Dental Clinic's non-submitting booking fields and use verified Quezon City contact information.",
};

export default function BookingPage() {
  return (
    <main className="bg-surface-inverse text-text-inverse">
      <section
        aria-labelledby="booking-heading"
        className="px-gutter pb-section pt-section"
      >
        <div className="mx-auto w-full max-w-wide">
          <div className="grid gap-stack lg:grid-cols-[minmax(0,3fr)_auto] lg:items-end">
            <div>
              <p className="text-label font-bold uppercase tracking-label text-action">
                Static booking preview
              </p>
              <h1
                className="mt-cluster max-w-[14ch] font-display text-display font-extrabold uppercase"
                id="booking-heading"
              >
                Explore <span className="text-action">booking</span>
              </h1>
              <p className="mt-stack max-w-reading text-lead text-text-inverse-muted">
                Review the planned fields and presentation-only validation.
                Online booking is coming soon, so nothing entered here is sent
                or saved.
              </p>
            </div>
            <p className="text-label font-bold uppercase tracking-label text-text-inverse-muted">
              Quezon City
            </p>
          </div>

          <div className="mt-card-y grid gap-card-y lg:grid-cols-[minmax(0,7fr)_minmax(18rem,5fr)] lg:items-start">
            <BookingForm />
            <BookingContactCards />
          </div>
        </div>
      </section>
      <BookingLocation />
    </main>
  );
}
