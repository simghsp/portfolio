// Guards against the portfolio quietly drifting from what's actually true.
// Every claim on the site traces back to src/lib/data.ts — this script
// checks the structural parts of that promise: real GitHub URLs under the
// right account, and case studies that actually point at a project that
// exists. It can't verify the *content* of a claim (that still needs a
// human re-reading the linked repo), but it catches the mechanical drift:
// a typo'd slug, a link to the wrong account, a case study orphaned by a
// renamed project.
import { projects, securityLab, caseStudies, profile } from "../src/lib/data";

const errors: string[] = [];

const allProjects = [...projects, ...securityLab];
const slugs = new Set(allProjects.map((p) => p.slug));

if (allProjects.length !== new Set(slugs).size) {
  errors.push("Duplicate project slug found in projects/securityLab.");
}

for (const project of allProjects) {
  if (!project.github.startsWith(`https://github.com/${profile.githubUser}/`)) {
    errors.push(
      `${project.slug}: github URL "${project.github}" doesn't point at ${profile.githubUser}'s account.`
    );
  }
  if (project.tech.length === 0) {
    errors.push(`${project.slug}: no tech listed — is this project still worth featuring?`);
  }
}

for (const study of caseStudies) {
  if (!slugs.has(study.projectSlug)) {
    errors.push(
      `Case study "${study.slug}" references projectSlug "${study.projectSlug}", which doesn't exist in projects or securityLab.`
    );
  }
}

for (const project of allProjects) {
  for (const slug of project.caseStudySlugs ?? []) {
    if (!caseStudies.some((s) => s.slug === slug)) {
      errors.push(`${project.slug} references case study "${slug}", which doesn't exist.`);
    }
  }
}

if (errors.length > 0) {
  console.error("Data integrity check failed:\n");
  for (const err of errors) console.error(" -", err);
  console.error(
    "\nThese are structural checks only — a passing run doesn't mean every claim is still" +
      " accurate, just that links resolve and references aren't orphaned. Re-verify against" +
      " the actual repo whenever a featured project changes."
  );
  process.exit(1);
}

console.log(`Data integrity OK — ${allProjects.length} projects, ${caseStudies.length} case studies checked.`);
