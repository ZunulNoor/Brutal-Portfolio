/**
 * Lead-inquiry validation + sanitization, shared by the client form
 * (usability) and the API route (authority). Keep in sync by reuse.
 */

export const LIMITS = {
  name: 80,
  email: 254,
  company: 120,
  type: 40,
  budget: 9,
  timeline: 40,
  description: 2000,
  timezone: 60,
  locale: 20,
} as const;

export const PROJECT_TYPES = [
  "Maintenance",
  "New feature",
  "New project",
  "WordPress / CMS",
  "ML / Python",
  "Other",
] as const;

/** Generic ladder, one week out to one year. */
export const PROJECT_TIMELINES = [
  "1–2 weeks",
  "2–4 weeks",
  "1–2 months",
  "3–6 months",
  "6–12 months",
  "Flexible",
] as const;

export type LeadInput = {
  name: string;
  email: string;
  company?: string;
  type: string;
  /** Digits only (USD). Coerced in sanitizeLead; never free text. */
  budget?: string;
  /** One of PROJECT_TIMELINES when present. */
  timeline?: string;
  description: string;
  /** Browser timezone + locale, client-supplied for scheduling context. */
  timezone?: string;
  locale?: string;
  /** Honeypot — must stay empty. */
  website?: string;
};

export type LeadErrors = Partial<
  Record<"name" | "email" | "type" | "description" | "budget" | "timeline", string>
>;

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/** Trim, collapse whitespace, cap length. Never logs or stores bodies. */
function clean(value: unknown, max: number): string {
  return String(value ?? "")
    .replace(/\s+/g, " ")
    .trim()
    .slice(0, max);
}

export function sanitizeLead(raw: Record<string, unknown>): LeadInput {
  return {
    name: clean(raw.name, LIMITS.name),
    email: clean(raw.email, LIMITS.email).toLowerCase(),
    company: clean(raw.company, LIMITS.company) || undefined,
    type: clean(raw.type, LIMITS.type),
    budget: clean(raw.budget, LIMITS.budget) || undefined,
    timeline: clean(raw.timeline, LIMITS.timeline) || undefined,
    description: clean(raw.description, LIMITS.description),
    timezone: clean(raw.timezone, LIMITS.timezone) || undefined,
    locale: clean(raw.locale, LIMITS.locale) || undefined,
    website: clean(raw.website, 200) || undefined,
  };
}

export function validateLead(input: LeadInput): LeadErrors {
  const errors: LeadErrors = {};
  if (input.name.length < 2) errors.name = "Enter your name.";
  if (!EMAIL_RE.test(input.email)) errors.email = "Enter a valid email.";
  if (!(PROJECT_TYPES as readonly string[]).includes(input.type))
    errors.type = "Pick a project type.";
  if (
    input.budget !== undefined &&
    (input.budget.length === 0 || !/^\d{1,9}$/.test(input.budget))
  )
    errors.budget = "Digits only.";
  if (
    input.timeline !== undefined &&
    !(PROJECT_TIMELINES as readonly string[]).includes(input.timeline)
  )
    errors.timeline = "Pick a timeline.";
  if (input.description.length < 20)
    errors.description = "Describe the project in 20+ characters.";
  return errors;
}

export function isBot(input: LeadInput): boolean {
  return Boolean(input.website);
}
