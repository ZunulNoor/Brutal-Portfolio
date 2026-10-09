"use client";

/**
 * Renders the current year. Used inside a <Suspense> boundary (see
 * SiteFooter) so the server prerender emits the fallback and the year is
 * resolved on the client — `Date` is not allowed during prerendering.
 */
export default function CopyrightYear() {
  return <>{new Date().getFullYear()}</>;
}
