"use client";

import { type ChangeEvent, type FormEvent, useRef, useState } from "react";

import { BOOKING_SERVICE_OPTIONS } from "../../content/booking";
import { Button } from "../ui/Button";

export interface BookingFormValues {
  fullName: string;
  email: string;
  phone: string;
  serviceId: string;
  preferredDate: string;
  preferredTime: string;
  notes: string;
}

type BookingFieldName = keyof BookingFormValues;
type BookingErrors = Partial<Record<BookingFieldName, string>>;
type BookingStatus = "idle" | "invalid" | "ready";

const INITIAL_VALUES: BookingFormValues = {
  fullName: "",
  email: "",
  phone: "",
  serviceId: "",
  preferredDate: "",
  preferredTime: "",
  notes: "",
};

const FIELD_ORDER: readonly BookingFieldName[] = [
  "fullName",
  "email",
  "phone",
  "serviceId",
  "preferredDate",
  "preferredTime",
  "notes",
];

const INPUT_CLASSES =
  "min-h-control w-full rounded-control border border-border-strong bg-surface-inverse px-cluster py-control-y text-body text-text-inverse placeholder:text-text-inverse-muted focus:border-action focus:outline-none focus:ring-[length:var(--focus-ring-width)] focus:ring-focus aria-[invalid=true]:border-error";

export function validateBookingValues(
  values: BookingFormValues,
): BookingErrors {
  const errors: BookingErrors = {};

  if (values.fullName.trim().length < 2) {
    errors.fullName = "Enter your full name.";
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email.trim())) {
    errors.email = "Enter a valid email address.";
  }
  if (values.phone.replace(/\D/g, "").length < 10) {
    errors.phone = "Enter a phone number with at least 10 digits.";
  }
  if (values.serviceId.length === 0) {
    errors.serviceId = "Choose a service to discuss.";
  }
  if (values.preferredDate.length === 0) {
    errors.preferredDate = "Choose a preferred date.";
  }
  if (values.preferredTime.length === 0) {
    errors.preferredTime = "Choose a preferred time.";
  }

  return errors;
}

export function BookingForm() {
  const [values, setValues] = useState<BookingFormValues>(INITIAL_VALUES);
  const [errors, setErrors] = useState<BookingErrors>({});
  const [status, setStatus] = useState<BookingStatus>("idle");
  const formRef = useRef<HTMLFormElement>(null);
  const statusRef = useRef<HTMLDivElement>(null);

  function updateValue(
    field: BookingFieldName,
    event: ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >,
  ) {
    setValues((currentValues) => ({
      ...currentValues,
      [field]: event.target.value,
    }));
    setErrors((currentErrors) => {
      if (!currentErrors[field]) {
        return currentErrors;
      }

      const nextErrors = { ...currentErrors };
      delete nextErrors[field];
      return nextErrors;
    });
    setStatus("idle");
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const nextErrors = validateBookingValues(values);
    setErrors(nextErrors);

    const firstInvalidField = FIELD_ORDER.find(
      (field) => nextErrors[field] !== undefined,
    );

    if (firstInvalidField) {
      setStatus("invalid");
      requestAnimationFrame(() => {
        const field = formRef.current?.elements.namedItem(firstInvalidField);
        if (field instanceof HTMLElement) {
          field.focus();
        }
      });
      return;
    }

    setStatus("ready");
    requestAnimationFrame(() => {
      statusRef.current?.focus();
    });
  }

  function describedBy(field: BookingFieldName) {
    return `${field}-hint${errors[field] ? ` ${field}-error` : ""}`;
  }

  return (
    <form
      className="rounded-image border border-border-strong bg-surface-inverse-raised p-card-x"
      data-testid="booking-form"
      noValidate
      onSubmit={handleSubmit}
      ref={formRef}
    >
      <div className="grid gap-stack sm:grid-cols-2">
        <div>
          <label
            className="text-label font-bold uppercase tracking-label text-text-inverse-muted"
            htmlFor="fullName"
          >
            Full name
          </label>
          <p
            className="mt-inline text-label text-text-inverse-muted"
            id="fullName-hint"
          >
            Enter the name the clinic should use when speaking with you.
          </p>
          <input
            aria-describedby={describedBy("fullName")}
            aria-errormessage={errors.fullName ? "fullName-error" : undefined}
            aria-invalid={errors.fullName ? "true" : "false"}
            autoComplete="name"
            className={`${INPUT_CLASSES} mt-cluster`}
            id="fullName"
            name="fullName"
            onChange={(event) => updateValue("fullName", event)}
            type="text"
            value={values.fullName}
          />
          {errors.fullName ? (
            <p className="mt-inline text-label text-error" id="fullName-error">
              {errors.fullName}
            </p>
          ) : null}
        </div>

        <div>
          <label
            className="text-label font-bold uppercase tracking-label text-text-inverse-muted"
            htmlFor="email"
          >
            Email address
          </label>
          <p
            className="mt-inline text-label text-text-inverse-muted"
            id="email-hint"
          >
            Used only in this on-screen demonstration.
          </p>
          <input
            aria-describedby={describedBy("email")}
            aria-errormessage={errors.email ? "email-error" : undefined}
            aria-invalid={errors.email ? "true" : "false"}
            autoComplete="email"
            className={`${INPUT_CLASSES} mt-cluster`}
            id="email"
            inputMode="email"
            name="email"
            onChange={(event) => updateValue("email", event)}
            type="email"
            value={values.email}
          />
          {errors.email ? (
            <p className="mt-inline text-label text-error" id="email-error">
              {errors.email}
            </p>
          ) : null}
        </div>

        <div>
          <label
            className="text-label font-bold uppercase tracking-label text-text-inverse-muted"
            htmlFor="phone"
          >
            Phone number
          </label>
          <p
            className="mt-inline text-label text-text-inverse-muted"
            id="phone-hint"
          >
            Include the country or area code when applicable.
          </p>
          <input
            aria-describedby={describedBy("phone")}
            aria-errormessage={errors.phone ? "phone-error" : undefined}
            aria-invalid={errors.phone ? "true" : "false"}
            autoComplete="tel"
            className={`${INPUT_CLASSES} mt-cluster`}
            id="phone"
            inputMode="tel"
            name="phone"
            onChange={(event) => updateValue("phone", event)}
            type="tel"
            value={values.phone}
          />
          {errors.phone ? (
            <p className="mt-inline text-label text-error" id="phone-error">
              {errors.phone}
            </p>
          ) : null}
        </div>

        <div>
          <label
            className="text-label font-bold uppercase tracking-label text-text-inverse-muted"
            htmlFor="serviceId"
          >
            Service to discuss
          </label>
          <p
            className="mt-inline text-label text-text-inverse-muted"
            id="serviceId-hint"
          >
            This is a discussion preference, not a treatment selection.
          </p>
          <select
            aria-describedby={describedBy("serviceId")}
            aria-errormessage={errors.serviceId ? "serviceId-error" : undefined}
            aria-invalid={errors.serviceId ? "true" : "false"}
            className={`${INPUT_CLASSES} mt-cluster`}
            id="serviceId"
            name="serviceId"
            onChange={(event) => updateValue("serviceId", event)}
            value={values.serviceId}
          >
            <option value="">Choose an option</option>
            {BOOKING_SERVICE_OPTIONS.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
          {errors.serviceId ? (
            <p className="mt-inline text-label text-error" id="serviceId-error">
              {errors.serviceId}
            </p>
          ) : null}
        </div>

        <div>
          <label
            className="text-label font-bold uppercase tracking-label text-text-inverse-muted"
            htmlFor="preferredDate"
          >
            Preferred date
          </label>
          <p
            className="mt-inline text-label text-text-inverse-muted"
            id="preferredDate-hint"
          >
            A preference only; availability is not shown or reserved.
          </p>
          <input
            aria-describedby={describedBy("preferredDate")}
            aria-errormessage={
              errors.preferredDate ? "preferredDate-error" : undefined
            }
            aria-invalid={errors.preferredDate ? "true" : "false"}
            autoComplete="off"
            className={`${INPUT_CLASSES} mt-cluster`}
            id="preferredDate"
            name="preferredDate"
            onChange={(event) => updateValue("preferredDate", event)}
            type="date"
            value={values.preferredDate}
          />
          {errors.preferredDate ? (
            <p
              className="mt-inline text-label text-error"
              id="preferredDate-error"
            >
              {errors.preferredDate}
            </p>
          ) : null}
        </div>

        <div>
          <label
            className="text-label font-bold uppercase tracking-label text-text-inverse-muted"
            htmlFor="preferredTime"
          >
            Preferred time
          </label>
          <p
            className="mt-inline text-label text-text-inverse-muted"
            id="preferredTime-hint"
          >
            A preference only; it does not reserve a schedule.
          </p>
          <input
            aria-describedby={describedBy("preferredTime")}
            aria-errormessage={
              errors.preferredTime ? "preferredTime-error" : undefined
            }
            aria-invalid={errors.preferredTime ? "true" : "false"}
            autoComplete="off"
            className={`${INPUT_CLASSES} mt-cluster`}
            id="preferredTime"
            name="preferredTime"
            onChange={(event) => updateValue("preferredTime", event)}
            type="time"
            value={values.preferredTime}
          />
          {errors.preferredTime ? (
            <p
              className="mt-inline text-label text-error"
              id="preferredTime-error"
            >
              {errors.preferredTime}
            </p>
          ) : null}
        </div>
      </div>

      <div className="mt-stack">
        <label
          className="text-label font-bold uppercase tracking-label text-text-inverse-muted"
          htmlFor="notes"
        >
          Notes <span className="normal-case">(optional)</span>
        </label>
        <p
          className="mt-inline text-label text-text-inverse-muted"
          id="notes-hint"
        >
          Keep sensitive medical information out of this demonstration.
        </p>
        <textarea
          aria-describedby={describedBy("notes")}
          className={`${INPUT_CLASSES} mt-cluster min-h-[8rem] resize-y`}
          id="notes"
          maxLength={500}
          name="notes"
          onChange={(event) => updateValue("notes", event)}
          value={values.notes}
        />
      </div>

      <div className="mt-card-y border-t border-border-strong pt-stack">
        <p className="text-body text-text-inverse-muted">
          This demonstration does not submit, send, save, or reserve anything.
        </p>
        <Button className="mt-stack w-full" type="submit">
          Check booking details
        </Button>
      </div>

      {status !== "idle" ? (
        <div
          aria-live={status === "invalid" ? "assertive" : "polite"}
          className={`mt-stack border p-cluster ${
            status === "invalid"
              ? "border-error text-text-inverse"
              : "border-action bg-action/10 text-text-inverse"
          }`}
          ref={statusRef}
          role={status === "invalid" ? "alert" : "status"}
          tabIndex={-1}
        >
          {status === "invalid" ? (
            <p>
              Please review the highlighted fields. No information was sent.
            </p>
          ) : (
            <>
              <p className="font-bold">Online booking is coming soon.</p>
              <p className="mt-inline text-text-inverse-muted">
                No appointment was created and your details were not sent. Use
                the verified contact options beside this form.
              </p>
            </>
          )}
        </div>
      ) : null}
    </form>
  );
}
