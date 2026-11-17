# KJR Co-Living

Premium PG accommodation landing page for KJR Co-Living (KJR Elite, KJR Signature, KJR Platinum) — Chennai.

## Stack

React + TypeScript + Vite + Tailwind CSS v4, GSAP (ScrollTrigger) + Lenis smooth scroll, lucide-react icons.

## Current status (Phase 1 — frontend)

This is the public landing page only:

- Hero, About, Properties (with per-property photo/video gallery lightbox), Room Options, Amenities,
  Why Choose, How It Works, Schedule a Visit form, FAQ, Final CTA, Footer.
- `privacy.html` and `terms.html` are draft placeholder legal pages — review before go-live.
- WhatsApp + phone contact wired via `src/lib/config.ts`.

### What's intentionally not real yet

The full spec calls for an AWS backend (API Gateway, Lambda, RDS Postgres, Cognito, S3, CloudFront,
SES, SQS) with a single-owner admin dashboard for managing property galleries. None of that is
provisioned yet — there is no AWS account connected to this build. Until it is:

- **Gallery content** is seeded from `src/data/gallery.ts` / `src/data/properties.ts` as static data.
  The 4 real room photos currently appear under all three properties (not yet attributed to a
  specific property — confirm with the KJR team and update `propertySlug` per item).
- **The "Schedule a Visit" form** submits via a `mailto:` link to `NOTIFICATION_EMAIL`
  (`src/lib/config.ts`) — it opens the visitor's own mail client with the request pre-filled, so no
  backend is required, but it is not a silent/automatic submission. Update `NOTIFICATION_EMAIL` to
  the real business address.
- **No admin dashboard exists yet.** A real one needs persistent, shared storage (S3 + a database) —
  that's Phase 2, once AWS is connected. Until then, gallery changes go through editing
  `src/data/gallery.ts` directly (same workflow used for KJR Infra's project gallery).
- Amenities (`src/lib/content.ts` → `AMENITIES`) are the spec's example list, not yet confirmed by
  the KJR team — review and trim before go-live.
- Room-sharing categories and per-property location/room/amenity details are intentionally generic —
  the spec prohibits inventing addresses, pricing, occupancy, or facilities.

## Development

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
```

Multi-page build: `index.html` (main), `privacy.html`, `terms.html` (see `vite.config.ts`).

## Phase 2 (not started): AWS backend

See the original project specification for the full target architecture (API Gateway + Lambda +
RDS Postgres + Cognito + S3 + CloudFront + SES + SQS, deployed via AWS CDK and GitHub Actions with
OIDC). This requires an AWS account to be connected before any of it can be built and tested for
real — infrastructure code should not be claimed as "working" until it has actually been deployed.
