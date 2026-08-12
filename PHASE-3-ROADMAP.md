# Phase 3 Roadmap

Phase 1 shipped and deployed the portfolio. Phase 2 implemented four items
from its own roadmap: a real contact form (Zod + honeypot + rate limiting +
Resend), GitHub Actions CI, a Lighthouse pass (97/100/100/100 — no fixes
needed), and a rewritten GitHub profile README. This document picks up
what's left, plus what Phase 2 surfaced along the way.

## Immediate follow-up (finishes Phase 2's work)

### 0. Connect Resend so the contact form actually sends email
The form is fully built and live, but `RESEND_API_KEY` isn't set yet, so
every submission currently shows "not fully wired up yet — email directly."
- Sign up free at [resend.com](https://resend.com), verify your email.
- Get an API key from the dashboard.
- Vercel → Environment Variables → add `RESEND_API_KEY` (mark it Sensitive
  this time — it's an actual secret, unlike `NEXT_PUBLIC_SITE_URL` last
  time) → Deployments → Redeploy.
- Optionally set `CONTACT_TO_EMAIL` if you want submissions to land somewhere
  other than the address in `src/lib/data.ts`.
- Test using the same steps as before ("Send message" → should now say
  "Sent" instead of the fallback message, and an email should actually
  arrive).

## High impact

### 1. Deploy a live AegisFlow demo
Carried over from Phase 2 — still the single highest-leverage thing left.
Every project currently links only to its GitHub repo; AegisFlow is a
running system (gateway + dashboard + Postgres + Redis), and a recruiter who
can click into a live SOC dashboard is a different experience than reading a
README.
- Needs a host that supports Docker Compose — Fly.io or Railway both have
  tiers that work for a multi-service app like this (unlike this portfolio,
  which is static and fits Vercel).
- Once live, add a `demoUrl` field to the AegisFlow entry in
  `src/lib/data.ts` and surface a "Live Demo" button on its project card.

### 2. Second finished production project
Carried over. JobBoard and AegisFlow carry the "production" weight;
Expense Manager is intentionally framed as foundational, not
security-relevant. If `bank-frontend` gets a real backend with auth, or a
new project ships, it slots in as a genuine fourth production project.

## Medium impact

### 3. Custom domain
Carried over. `portfolio-ashy-eight-i7xe4ihgl4.vercel.app` works, but
`sapnasingh.dev` (~$12/yr) reads more professionally on a resume. Vercel →
Domains once purchased, then update `NEXT_PUBLIC_SITE_URL` and redeploy —
same env-var-then-redeploy sequence as Phase 1, same fix if it doesn't take
effect immediately (check the actual value wasn't mistyped before assuming
the code is broken).

### 4. Stop the `gh` account mix-up at the source
Every push/repo-edit in Phases 1–2 needed a manual
`gh auth switch --hostname github.com --user simghsp` first, because this
machine also has a `bharatrondevteam45-a11y` account logged in and gh kept
defaulting back to it. A one-time fix instead of repeating the workaround
forever:
- `gh auth logout --hostname github.com --user bharatrondevteam45-a11y` on
  this machine (if you don't need that account here), **or**
- `git config --global credential.https://github.com.helper ""` plus a
  per-repo credential override, **or**
- simplest: `git config --global --unset credential.helper` then rely on
  `gh auth switch` right before each session — still manual, but at least
  the failure mode becomes obvious immediately instead of a silent 403.

### 5. A CI check that actually catches copy honesty drift
CI currently runs lint + build. Since the entire portfolio's credibility
rests on every claim tracing to real code (`src/lib/data.ts`), a lightweight
addition: a script (or even just a PR template checklist) that reminds
whoever's editing `data.ts` to re-verify the referenced repo/file before
merging. Doesn't need to be automated to be worth writing down.

## Nice to have

### 6. Writing / blog section
Carried over. If you start writing about the AegisFlow build, the IDOR
fixes, or general security-learning notes, a small "Writing" section adds
another axis of credibility beyond code.

### 7. PDF resume via proper generation
Carried over, still low priority. `/resume`'s print-to-PDF works; a
`@react-pdf/renderer` version would look identical across browsers if it
ever becomes worth the effort.

### 8. Live GitHub stats
Carried over, still deliberately skipped. Worth adding only once repos have
real stars/activity worth showing — not before.

## Maintenance

### 9. Delete the empty duplicate repo
Still open: `github.com/bharatrondevteam45-a11y/portfolio`, empty, unlinked,
created by the Phase 1 account mix-up. Delete whenever convenient.

### 10. Keep `src/lib/data.ts` in sync with reality
Ongoing, not a one-time task. Every project/case-study claim traces to a
specific file in a specific repo as of Phase 1–2. Update the corresponding
`data.ts` entry whenever a featured project changes meaningfully.
