# Phase 4 Roadmap

Phase 1 shipped and deployed the portfolio. Phase 2 added a real contact
form, CI, a Lighthouse pass, and a rewritten GitHub profile README. Phase 3
added PDF resume generation and a data-integrity CI check. Everything below
is what's left — carried-over items that still need your input, plus what's
newly relevant now that the site has been live for a while.

## Immediate follow-up (still open since Phase 3)

### 0. Connect Resend so the contact form actually sends email
Still the most-open loop. The form works and validates correctly, but every
submission shows the "not fully wired up yet" fallback because
`RESEND_API_KEY` isn't set.
- Sign up free at [resend.com](https://resend.com).
- Get an API key, add it in Vercel → Environment Variables as
  `RESEND_API_KEY` — **mark it Sensitive this time**, it's a real secret
  unlike `NEXT_PUBLIC_SITE_URL`.
- Redeploy, then re-run the test steps from earlier (submit → should say
  "Sent" and an email should actually arrive, not the fallback message).

## High impact

### 1. Deploy a live AegisFlow demo
Still the single highest-leverage item, carried over three roadmaps running.
Every project links only to its GitHub repo; a recruiter clicking into a
*live* SOC dashboard is a different experience than reading a README.
- Needs Docker-Compose-capable hosting (Fly.io / Railway) — this portfolio's
  Vercel setup won't work for a multi-service app like AegisFlow.
- Once live, add `demoUrl` to the AegisFlow entry in `src/lib/data.ts` and
  surface a "Live Demo" button on its card.

### 2. Second finished production project
Still open. If `bank-frontend` gets a real backend, or a new project ships,
it becomes a genuine fourth production project instead of staying excluded.

## Medium impact

### 3. Custom domain
Still open. `portfolio-ashy-eight-i7xe4ihgl4.vercel.app` works, but a real
domain reads better on a resume. Same env-var-then-redeploy sequence as
before once purchased.

### 4. Fix the `gh` account mix-up at the source
Still open, and it's cost real time across three phases — every push needed
a manual `gh auth switch --hostname github.com --user simghsp` first because
this machine also has `bharatrondevteam45-a11y` logged in. Worth actually
doing this time rather than carrying it forward again:
`gh auth logout --hostname github.com --user bharatrondevteam45-a11y` (if
you don't need that account on this machine), so `simghsp` is simply the
only option and can't be silently defaulted away from.

### 5. Check the analytics that have actually been collecting data
Vercel Web Analytics has been live since Phase 1. It's now been long enough
that Vercel → Analytics should show real numbers: which sections people
actually scroll to, whether anyone's clicking through to project repos, how
much of the resume page gets used. Worth a look before adding anything new —
it might reprioritize this whole list (e.g. if nobody clicks "Security Lab,"
that's more useful to know than guessing).

## Nice to have

### 6. Writing / blog section
Still open — needs actual posts to link before it's worth building the UI
for it.

### 7. Live GitHub stats
Still deliberately deferred, same reasoning as before: worth adding only
once repos have real stars/activity worth showing.

## Maintenance

### 8. Delete the empty duplicate repo
Still open: `github.com/bharatrondevteam45-a11y/portfolio`. Harmless but
tidy up whenever convenient — resolving item #4 above makes this easier too.

### 9. Re-run `pnpm check:data` after any project change
The Phase 3 script only catches structural drift (broken links, orphaned
case studies) — it can't verify that a claim like "113 automated tests" is
still true after AegisFlow changes. Run it locally after editing
`src/lib/data.ts`, and re-read the actual source repo before updating a
security-relevant claim, the same way every existing claim was originally
verified.

### 10. Revisit this roadmap once #0 and #1 land
Items 2, 3, 5 onward are all secondary to actually finishing the contact
form (#0) and getting a live security demo up (#1) — both keep getting
carried forward instead of done. Next phase should probably be scoped
narrowly to just those two rather than adding more items to an already-long
backlog.
