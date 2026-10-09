import { NextRequest, NextResponse } from "next/server";
import { isBot, sanitizeLead, validateLead } from "@/lib/contact";

/** 5 submissions / IP / hour. In-memory: per server instance. */
const WINDOW_MS = 60 * 60 * 1000;
const MAX_PER_WINDOW = 5;
const hits = new Map<string, { count: number; reset: number }>();

function rateLimited(ip: string): boolean {
  const now = Date.now();
  const rec = hits.get(ip);
  if (!rec || now > rec.reset) {
    hits.set(ip, { count: 1, reset: now + WINDOW_MS });
    return false;
  }
  rec.count += 1;
  return rec.count > MAX_PER_WINDOW;
}

export async function POST(req: NextRequest) {
  const ip =
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
  if (rateLimited(ip)) {
    return NextResponse.json(
      { error: "Too many requests. Try again later." },
      { status: 429 },
    );
  }

  let raw: unknown;
  try {
    raw = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }
  if (!raw || typeof raw !== "object") {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  const input = sanitizeLead(raw as Record<string, unknown>);
  if (isBot(input)) return NextResponse.json({ ok: true }); // silent accept

  const errors = validateLead(input);
  if (Object.keys(errors).length > 0) {
    return NextResponse.json(
      { error: "Check the highlighted fields.", fields: errors },
      { status: 400 },
    );
  }

  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO_EMAIL;
  const from = process.env.CONTACT_FROM_EMAIL;
  if (!apiKey || !to || !from) {
    return NextResponse.json(
      { error: "Email delivery is not configured yet. Book a meeting instead." },
      { status: 503 },
    );
  }

  const text = [
    `Name: ${input.name}`,
    `Email: ${input.email}`,
    `Type: ${input.type}`,
    input.company ? `Company: ${input.company}` : null,
    input.budget ? `Budget: ${input.budget}` : null,
    input.timeline ? `Timeline: ${input.timeline}` : null,
    "",
    input.description,
  ]
    .filter((l): l is string => l !== null)
    .join("\n");

  let res: Response;
  try {
    res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from,
        to,
        reply_to: input.email,
        subject: `Project inquiry — ${input.type} — ${input.name}`,
        text,
      }),
    });
  } catch {
    return NextResponse.json(
      { error: "Delivery failed. Try again or book a meeting." },
      { status: 502 },
    );
  }
  if (!res.ok) {
    return NextResponse.json(
      { error: "Delivery failed. Try again or book a meeting." },
      { status: 502 },
    );
  }
  return NextResponse.json({ ok: true });
}
