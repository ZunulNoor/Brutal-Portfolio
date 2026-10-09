import { site } from "@/lib/site";

type Props = {
  label?: string;
  variant?: "signal" | "ink" | "plain";
  className?: string;
};

/** Reusable Cal.com booking action (AGENTS.md §9). New tab, safe rel. */
export default function BookingCTA({
  label = "Book a meeting",
  variant = "signal",
  className = "",
}: Props) {
  const cls =
    variant === "plain" ? className : `btn btn--${variant} ${className}`.trim();
  return (
    <a
      className={cls}
      href={site.bookingUrl}
      target="_blank"
      rel="noopener noreferrer"
    >
      {label}
    </a>
  );
}
