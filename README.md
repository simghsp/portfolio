# Sapna Singh — Portfolio

Live at **[portfolio-ashy-eight-i7xe4ihgl4.vercel.app](https://portfolio-ashy-eight-i7xe4ihgl4.vercel.app)**.

A portfolio built around a specific, verifiable story: full-stack development
experience moving toward Application Security. Every project claim, security
case study, and skill listed traces back to a real repository, a real
commit, or work I can speak to directly — nothing here is invented. See
[`src/lib/data.ts`](src/lib/data.ts) for the single source of truth all of
that content is generated from.

## What's on the site

- **Home** (`/`) — hero, work experience, security mindset, featured
  projects (with live "updated N ago" data pulled from the GitHub API),
  security case studies, a security research lab, skills, and contact.
- **Resume** (`/resume`) — a two-column recruiter-facing summary, plus a
  downloadable PDF generated server-side with `@react-pdf/renderer`.
- **ATS resume** (`/resume/ats`) — a deliberately plain, single-column
  variant for pasting into job applications or ATS uploads, since the
  polished two-column layout can parse out of order in some tracking
  systems.

## Stack

Next.js 16 (App Router) · TypeScript · Tailwind CSS v4 · Framer Motion ·
`@react-pdf/renderer` · Zod · React Hook Form · Resend (contact form email)

Deployed on Vercel; CI runs lint, a data-integrity check, and a build on
every push via GitHub Actions.

## Running locally

```bash
pnpm install
cp .env.example .env.local   # fill in values — see below
pnpm dev
```

| Script | What it does |
|---|---|
| `pnpm dev` | Local dev server at `localhost:3000` |
| `pnpm build` | Production build |
| `pnpm start` | Serve the production build |
| `pnpm lint` | ESLint |
| `pnpm check:data` | Validates `src/lib/data.ts` for structural drift — orphaned case studies, mismatched project slugs, GitHub links pointing outside the owning account |

### Environment variables

See [`.env.example`](.env.example) for the full list with explanations.
Nothing in this project requires a secret to run locally — the contact form
gracefully degrades to a "not configured" message without a Resend API key.

## Project structure

```
src/
  app/                  Routes (App Router)
    resume/             Resume pages + PDF routes
    actions/contact.ts  Server Action backing the contact form
  components/
    sections/           One component per homepage section
    ui/                  Shared primitives (Button, Card, Badge, ...)
  lib/
    data.ts              All portfolio content — projects, case studies,
                          skills, experience — the thing to edit when
                          anything real changes
    github.ts            Live GitHub repo activity fetch, with a graceful
                          fallback if the API is unreachable
    resume-pdf*.tsx       @react-pdf/renderer document definitions
scripts/
  check-data-integrity.ts Structural validation, run in CI
```

## Keeping this honest

Every time a featured project changes in a way that would make a claim on
this site inaccurate, `src/lib/data.ts` needs a matching update. The CI data
check catches broken links and orphaned references, not stale facts — that
half still requires re-reading the actual source repo before editing a
claim here.
