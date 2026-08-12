# Phase 2 Roadmap

Phase 1 shipped the portfolio: built, verified, and deployed live at
`https://portfolio-ashy-eight-i7xe4ihgl4.vercel.app`. This document tracks
what's worth doing next, ranked by actual impact on the "will a recruiter
take this seriously" question — not busywork.

## High impact

### 1. Deploy a live AegisFlow demo
Right now every project links only to its GitHub repo. AegisFlow is the
flagship project and it's a *running system* (gateway + dashboard + Postgres
+ Redis) — a recruiter who can click through to a live SOC dashboard and
trigger the attack-simulation lab themselves is a completely different
experience than reading a README. This is the single highest-leverage thing
left to do.
- Needs: a host that supports Docker Compose (Fly.io and Railway both have
  free/cheap tiers that work for this) since it's a multi-service app, not a
  static site like the portfolio.
- Once live, add the demo URL to the `github` entry for the AegisFlow project
  in `src/lib/data.ts` (a `demoUrl` field) and surface it as a "Live Demo"
  button on the project card.

### 2. Align the GitHub profile README with the portfolio's positioning
`github.com/simghsp`'s profile README currently describes you generically as
a "Backend Engineer" learning MERN + Python — it doesn't mention security at
all, and lists CODSOFT/Portfio/PHP as "top projects" instead of AegisFlow.
Anyone who clicks through from the portfolio to your GitHub profile will see
a disconnect. Worth a rewrite so both tell the same story.

### 3. Real contact form (replace mailto-only)
The original brief asked for rate limiting and spam protection on the
contact path — right now Contact is just a `mailto:` link, which is honest
and secure but has no actual form. A minimal version: a Next.js Server
Action, Zod validation, a honeypot field, and a simple in-memory or
Upstash-backed rate limit — small enough to build in an afternoon and gives
you one more concrete "input validation + abuse prevention" example to point
to.

## Medium impact

### 4. Custom domain
`portfolio-ashy-eight-i7xe4ihgl4.vercel.app` works fine but a domain like
`sapnasingh.dev` (~$12/yr) reads more professionally on a resume/LinkedIn.
Vercel → Settings → Domains once you own one. After adding it, update
`NEXT_PUBLIC_SITE_URL` to the new domain and redeploy (same env var dance as
before — same fix if it doesn't take effect immediately).

### 5. Lighthouse + accessibility pass
Console/visual checks were done during Phase 1, but a proper Lighthouse run
(Chrome DevTools → Lighthouse, or `npx unlighthouse`) against the live URL
would catch anything real-user-condition specific (font loading shift,
color contrast edge cases, unused JS). Fix whatever it flags.

### 6. GitHub Actions CI
A `.github/workflows/ci.yml` running `pnpm lint` and `pnpm build` on every
PR/push. Low effort, and for a security-leaning portfolio it's a small but
real signal of engineering hygiene — plus it catches regressions before they
go live instead of after, the way the CSP/env-var issues in Phase 1 were
caught manually.

### 7. A second finished production project
JobBoard and AegisFlow currently carry the "production" weight; Expense
Manager is intentionally framed as foundational rather than
security-relevant. If `bank-frontend` (the Spring Boot banking app) or a new
project gets a real backend with auth built out, it slots in as a genuine
fourth production project instead of staying excluded.

## Nice to have

### 8. Writing / blog section
Your GitHub bio mentions occasionally writing on Medium. If you start
writing about the AegisFlow build process, the IDOR fixes, or general
security-learning notes, a small "Writing" section linking those posts adds
another axis of credibility beyond code — recruiters read write-ups as a
signal of genuine understanding, not just working code.

### 9. Live GitHub stats
The original brief asked for optional live GitHub integration (stars,
recent activity) with static fallback. Phase 1 deliberately used static,
manually-verified data instead — safer and more accurate for a portfolio
this size. Worth adding *only* if repos start accumulating real stars/activity
worth showing; not worth it for the vanity-metric version.

### 10. PDF resume via proper generation
`/resume` currently uses the browser's native print-to-PDF, which works but
produces a slightly inconsistent result across browsers. `@react-pdf/renderer`
or a headless-Chromium print step would produce a pixel-perfect PDF you could
host as a static download instead. Low priority — the print button works.

## Maintenance

### 11. Delete the empty duplicate repo
`github.com/bharatrondevteam45-a11y/portfolio` — created by accident during
Phase 1's account mix-up, has no commits, not linked to anything live.
Delete whenever convenient.

### 12. Keep `src/lib/data.ts` in sync with reality
Every project/case-study claim in the portfolio traces back to a specific
file in a specific repo as of Phase 1. If AegisFlow, JobBoard, or any other
featured project changes meaningfully (new security feature, architecture
change, more tests), update the corresponding entry in `data.ts` so the
portfolio doesn't quietly drift out of sync with what's actually true.
