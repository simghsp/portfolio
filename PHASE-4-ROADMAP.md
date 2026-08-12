# Phase 4 Roadmap

Reviewed against Phase 3's roadmap below to see what actually moved. Four
items from that list are done; everything else is still exactly where it
was, because it's still blocked on the same things it always was — an
account, a purchase, or content that doesn't exist yet.

## Completed since Phase 3

- ✅ **#4 (gh account mix-up)** — `bharatrondevteam45-a11y` is logged out of
  `gh` on this machine entirely. `simghsp` is now the only account, so
  pushes and repo edits no longer need a manual account switch first.
- ✅ **#5 (data integrity CI check)** — `scripts/check-data-integrity.ts`
  runs in CI on every push/PR, catching orphaned case studies, mismatched
  project slugs, and GitHub links pointing outside the owning account.
- ✅ **#7 (PDF resume)** — `/resume/pdf` serves a real `@react-pdf/renderer`
  PDF built server-side from `src/lib/data.ts`, with a Download PDF button
  on the `/resume` page. Verified by actually downloading and reading it.
- ✅ **#8 (live GitHub stats), revised** — implemented, but not as originally
  scoped. Rather than star counts (all four repos sit at 0, so showing that
  everywhere would look worse than showing nothing), project cards now show
  "Updated N ago" from each repo's live `pushed_at`, cached with a 1h ISR
  revalidate. Stars still render, but only when non-zero. Falls back to
  showing nothing (not an error) if the GitHub API is unreachable — the
  homepage never depends on it, exactly as the original brief asked for.

## Still open — same blockers as Phase 3

### 0. Connect Resend so the contact form actually sends email
Unchanged. The form validates and rate-limits correctly but every
submission still shows the "not fully wired up yet" fallback because
`RESEND_API_KEY` isn't set. Needs: a free Resend signup + API key, then
Vercel → Environment Variables (marked Sensitive) → Redeploy.

### 1. Deploy a live AegisFlow demo
Unchanged, still the single highest-leverage item on this list across four
roadmaps now. Needs: a Fly.io or Railway account (Docker-Compose-capable
hosting — this portfolio's Vercel setup doesn't fit a multi-service app).

### 2. Second finished production project
Unchanged. Needs a scoping decision — which project, how much backend work
— not a mechanical code change.

### 3. Custom domain
Unchanged. Needs a domain purchase (~$12/yr for something like
`sapnasingh.dev`), then the same env-var-then-redeploy sequence used before.

### 6. Writing / blog section
Unchanged. Needs actual blog posts to exist before there's anything to link.

## Changed status

### 9. Delete the empty duplicate repo — now harder, not easier
`github.com/bharatrondevteam45-a11y/portfolio` is still sitting there empty.
Completing #4 (logging that account out of `gh` here) means there's now
**no local session for that account at all** — it can't be deleted via `gh`
or this machine anymore. The only path left is logging into
`bharatrondevteam45-a11y` directly in a browser and deleting it from
GitHub's web UI (Settings → scroll to "Delete this repository"). Same
tradeoff as before: harmless to leave indefinitely if that's not worth the
trip.

### 10. Keep `data.ts` in sync — the check now has teeth
Still ongoing, not a one-time task — but as of #5 above, there's now a real
CI check that catches *structural* drift (broken links, orphaned case
studies) automatically. It still can't verify that a claim like "113
automated tests" stays true after AegisFlow changes — that half still
needs a human re-reading the actual repo.

## What Phase 5 should actually be

Everything still open above needs you to do something first. Rather than
writing a fifth roadmap that carries the same items forward again, Phase 5
should be triggered by one of those things actually happening — tell me
when you've signed up for Resend, bought a domain, or created a Fly.io
account, and the corresponding code lands the same day.
