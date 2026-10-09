"use client";

import { useState, type FormEvent } from "react";
import BookingCTA from "@/components/contact/BookingCTA";
import {
  PROJECT_TYPES,
  sanitizeLead,
  validateLead,
  type LeadErrors,
} from "@/lib/contact";
import styles from "./LeadForm.module.css";

type Status =
  | { state: "idle" }
  | { state: "sending" }
  | { state: "success" }
  | { state: "error"; message: string };

const EMPTY = {
  name: "",
  email: "",
  company: "",
  type: "",
  budget: "",
  timeline: "",
  description: "",
  website: "",
};

/** Project inquiry form. Client checks for usability; the API re-checks. */
export default function LeadForm() {
  const [values, setValues] = useState(EMPTY);
  const [errors, setErrors] = useState<LeadErrors>({});
  const [status, setStatus] = useState<Status>({ state: "idle" });

  const set = (key: keyof typeof EMPTY) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>,
  ) => setValues((v) => ({ ...v, [key]: e.target.value }));

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    const input = sanitizeLead({ ...values });
    const fieldErrors = validateLead(input);
    setErrors(fieldErrors);
    if (Object.keys(fieldErrors).length > 0) return;

    setStatus({ state: "sending" });
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      const data = (await res.json()) as { ok?: boolean; error?: string };
      if (res.ok && data.ok) {
        setStatus({ state: "success" });
      } else {
        setStatus({
          state: "error",
          message: data.error ?? "Something went wrong. Try again.",
        });
      }
    } catch {
      setStatus({
        state: "error",
        message: "Network error. Check your connection and retry.",
      });
    }
  }

  if (status.state === "success") {
    return (
      <div className={styles.done} role="status">
        <h3>Received. I&apos;ll reply within 2 days.</h3>
        <p>Want a faster answer? Grab a slot directly.</p>
        <p className={styles.row}>
          <BookingCTA />
          <button
            type="button"
            className="btn"
            onClick={() => {
              setValues(EMPTY);
              setErrors({});
              setStatus({ state: "idle" });
            }}
          >
            Send another
          </button>
        </p>
      </div>
    );
  }

  const err = (id: keyof LeadErrors, label: string) =>
    errors[id] ? (
      <span id={`${id}-error`} className={styles.fieldError} role="alert">
        {label}: {errors[id]}
      </span>
    ) : null;

  return (
    <form className={styles.form} onSubmit={onSubmit} noValidate>
      <div className={styles.grid}>
        <p className={styles.field}>
          <label htmlFor="lead-name">Name *</label>
          <input
            id="lead-name"
            name="name"
            autoComplete="name"
            value={values.name}
            onChange={set("name")}
            aria-invalid={Boolean(errors.name)}
            aria-describedby={errors.name ? "name-error" : undefined}
            maxLength={80}
          />
          {err("name", "Name")}
        </p>
        <p className={styles.field}>
          <label htmlFor="lead-email">Email *</label>
          <input
            id="lead-email"
            name="email"
            type="email"
            autoComplete="email"
            value={values.email}
            onChange={set("email")}
            aria-invalid={Boolean(errors.email)}
            aria-describedby={errors.email ? "email-error" : undefined}
            maxLength={254}
          />
          {err("email", "Email")}
        </p>
        <p className={styles.field}>
          <label htmlFor="lead-company">Company (optional)</label>
          <input
            id="lead-company"
            name="company"
            autoComplete="organization"
            value={values.company}
            onChange={set("company")}
            maxLength={120}
          />
        </p>
        <p className={styles.field}>
          <label htmlFor="lead-type">Project type *</label>
          <select
            id="lead-type"
            name="type"
            value={values.type}
            onChange={set("type")}
            aria-invalid={Boolean(errors.type)}
            aria-describedby={errors.type ? "type-error" : undefined}
          >
            <option value="">Select…</option>
            {PROJECT_TYPES.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>
          {err("type", "Type")}
        </p>
        <p className={styles.field}>
          <label htmlFor="lead-budget">Budget (optional)</label>
          <input
            id="lead-budget"
            name="budget"
            placeholder="e.g. $2–5k"
            value={values.budget}
            onChange={set("budget")}
            maxLength={40}
          />
        </p>
        <p className={styles.field}>
          <label htmlFor="lead-timeline">Timeline (optional)</label>
          <input
            id="lead-timeline"
            name="timeline"
            placeholder="e.g. March"
            value={values.timeline}
            onChange={set("timeline")}
            maxLength={40}
          />
        </p>
      </div>

      <p className={styles.field}>
        <label htmlFor="lead-desc">Project description *</label>
        <textarea
          id="lead-desc"
          name="description"
          rows={5}
          placeholder="What are you building? What does success look like?"
          value={values.description}
          onChange={set("description")}
          aria-invalid={Boolean(errors.description)}
          aria-describedby={errors.description ? "description-error" : undefined}
          maxLength={2000}
        />
        {err("description", "Description")}
      </p>

      {/* Honeypot: humans never fill this. */}
      <p className={styles.hp} aria-hidden="true">
        <label htmlFor="lead-website">Website</label>
        <input
          id="lead-website"
          name="website"
          tabIndex={-1}
          autoComplete="off"
          value={values.website}
          onChange={set("website")}
        />
      </p>

      <div aria-live="polite">
        {status.state === "error" && (
          <p className={styles.statusError} role="alert">
            {status.message}
          </p>
        )}
      </div>
      <p className={styles.row}>
        <button
          type="submit"
           className="btn btn--signal"
          disabled={status.state === "sending"}
        >
          {status.state === "sending" ? "Sending…" : "Send inquiry"}
        </button>
        <BookingCTA variant="plain" className={styles.plainLink} label="or book a meeting →" />
      </p>
    </form>
  );
}
