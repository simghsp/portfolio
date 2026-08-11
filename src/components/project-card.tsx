import { ArrowUpRight } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { GithubIcon } from "@/components/icons";
import type { Project } from "@/lib/data";

export function ProjectCard({ project, featured = false }: { project: Project; featured?: boolean }) {
  return (
    <Card className={featured ? "border-accent/20" : undefined}>
      <div className="flex items-start justify-between gap-4">
        <div>
          <h3 className="text-xl font-semibold text-foreground">{project.name}</h3>
          <p className="mt-2 text-sm leading-relaxed text-muted">{project.tagline}</p>
        </div>
        <a
          href={project.github}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`${project.name} on GitHub`}
          className="shrink-0 rounded-lg border border-border-strong p-2 text-muted transition-colors hover:border-accent/50 hover:text-accent"
        >
          <GithubIcon size={16} />
        </a>
      </div>

      {project.status ? (
        <p className="mono mt-3 text-xs text-muted-dim">{project.status}</p>
      ) : null}

      <div className="mt-5 border-t border-border pt-5">
        <h4 className="mono text-xs uppercase tracking-widest text-muted-dim">Problem</h4>
        <p className="mt-2 text-sm leading-relaxed text-muted">{project.problem}</p>
      </div>

      <div className="mt-5">
        <h4 className="mono text-xs uppercase tracking-widest text-muted-dim">Architecture</h4>
        <ol className="mt-2 space-y-1.5">
          {project.architecture.map((layer, i) => (
            <li key={layer} className="flex gap-2 text-sm text-muted">
              <span className="mono text-muted-dim">{i + 1}.</span>
              <span>{layer}</span>
            </li>
          ))}
        </ol>
      </div>

      <div className="mt-5 grid gap-4 sm:grid-cols-2">
        <div>
          <h4 className="mono text-xs uppercase tracking-widest text-muted-dim">Technology</h4>
          <div className="mt-2 flex flex-wrap gap-1.5">
            {project.tech.map((t) => (
              <Badge key={t} variant="outline">
                {t}
              </Badge>
            ))}
          </div>
        </div>
        <div>
          <h4 className="mono text-xs uppercase tracking-widest text-muted-dim">Security</h4>
          <div className="mt-2 flex flex-wrap gap-1.5">
            {project.security.slice(0, 4).map((s) => (
              <Badge key={s} variant="accent">
                {s.split("(")[0].trim()}
              </Badge>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-5 border-t border-border pt-5">
        <h4 className="mono text-xs uppercase tracking-widest text-muted-dim">My Contribution</h4>
        <p className="mt-2 text-sm leading-relaxed text-muted">{project.contribution}</p>
      </div>

      <div className="mt-6 flex flex-wrap items-center gap-3">
        <a
          href={project.github}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 text-sm font-medium text-accent hover:text-accent-strong"
        >
          View repository
          <ArrowUpRight size={14} aria-hidden="true" />
        </a>
        {project.caseStudySlugs?.length ? (
          <a
            href="#case-studies"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-muted hover:text-foreground"
          >
            {project.caseStudySlugs.length} case stud{project.caseStudySlugs.length > 1 ? "ies" : "y"}
            <ArrowUpRight size={14} aria-hidden="true" />
          </a>
        ) : null}
      </div>
    </Card>
  );
}
