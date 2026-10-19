# Zun Ul Noor — Portfolio

Personal portfolio for **Zun Ul Noor**, Frontend Engineer / Full-Stack Developer based in Karachi, Pakistan. Built with Next.js App Router + TypeScript in a hybrid experimental-brutalist visual identity (ink black `#111111`, warm paper `#F3F0E8`, signal orange `#FF9A03`).

## Routes

| Route | Page |
| --- | --- |
| `/` | Home — hero with kinetic type + interactive artwork, selected work, capabilities |
| `/projects` | Index of all 8 project case studies |
| `/projects/[slug]` | Individual case study (stable URLs) |
| `/resume` | Semantic, indexable HTML resume + PDF download |
| `/about` | Profile, engineering approach, booking CTA, lead-inquiry form |

## Tech

- Next.js 16 (App Router, Server Components by default) + TypeScript
- GSAP + ScrollTrigger for motion (client components only, `prefers-reduced-motion` respected)
- Lead form: client validation for usability, server validation/sanitization, honeypot + rate limiting, Resend delivery from the server only
- SEO: per-page metadata + canonicals, Open Graph/Twitter, `sitemap.ts`, `robots.ts`, Person/WebSite JSON-LD, branded OG image, custom ZN `icon.svg` favicon

## Getting started

```bash
npm install
npm run dev
```

Production check:

```bash
npm run build
npm run start
```

## Environment

Copy `.env.example` to `.env.local` and fill in:

| Variable | Purpose |
| --- | --- |
| `NEXT_PUBLIC_SITE_URL` | Canonical site URL (no hardcoded domain in code). **Must also be set in Vercel → Settings → Environment Variables** (e.g. `https://zunulnoor.vercel.app`) — without it production serves an empty sitemap, robots.txt with no sitemap line, and no canonical/OG URLs |
| `RESEND_API_KEY` | Resend API key for the contact form |
| `CONTACT_TO_EMAIL` | Inbox receiving inquiries |
| `CONTACT_FROM_EMAIL` | Verified sender identity |

Until the Resend variables are set, `POST /api/contact` honestly returns `503` and the form directs visitors to the Cal.com booking link (`https://cal.com/zun-ul-noor`).

## Deploy to Vercel (free tier, no custom domain)

Everything here runs on free tiers: Vercel Hobby (with a `*.vercel.app` URL) + Resend free (100 emails/day) using Resend's test sender — no domain purchase needed.

1. **Push this folder to GitHub** (Vercel deploys from git):
   ```bash
   git init
   git add -A
   git commit -m "Portfolio"
   ```
   then create a repo on github.com and push it.
2. **Resend (free):** sign up at resend.com with **`zunnoor46@gmail.com`**, then API Keys → create a key (`re_...`). No domain verification needed — the test sender only delivers to your signup email, which is exactly where inquiries should go.
3. **Vercel (free Hobby):** vercel.com → Add New → Project → import the GitHub repo. Framework is auto-detected (Next.js); keep the defaults.
4. **Environment variables** (Vercel → Project → Settings → Environment Variables). Add all four, scoped to Production (plus Preview if you want form tests on preview URLs):
   | Variable | Value |
   | --- | --- |
   | `NEXT_PUBLIC_SITE_URL` | `https://<your-project>.vercel.app` (your URL from step 3) |
   | `RESEND_API_KEY` | `re_...` from step 2 |
   | `CONTACT_TO_EMAIL` | `zunnoor46@gmail.com` |
   | `CONTACT_FROM_EMAIL` | `Portfolio <onboarding@resend.dev>` |
5. **Redeploy** after setting variables (`NEXT_PUBLIC_SITE_URL` is baked in at build time): Vercel → Deployments → Redeploy.
6. **Verify live:** open `/sitemap.xml` and `/robots.txt` (should reference your vercel.app URL), submit a test inquiry, confirm the email arrives and the success state shows.

When you later own a domain: verify it at resend.com/domains, change only `CONTACT_FROM_EMAIL` to `Portfolio <hello@yourdomain.com>`, optionally point the domain at Vercel and update `NEXT_PUBLIC_SITE_URL` — no code changes required.

## Project docs

Authoritative spec: `AGENTS.md`. Source of truth for professional content: `Zun-Ul-Noor-Resume-Portfolio.pdf`.
