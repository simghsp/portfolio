import { Mail } from "lucide-react";
import { Container } from "@/components/ui/container";
import { GithubIcon, LinkedinIcon } from "@/components/icons";
import { profile, nav } from "@/lib/data";

export function Footer() {
  return (
    <footer className="border-t border-border print:hidden">
      <Container className="flex flex-col gap-6 py-10 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="display text-base font-bold text-foreground">
            sapna<span className="text-accent">.</span>singh
          </p>
          <p className="mt-1 text-sm text-muted-dim">
            Full-stack development, backend engineering, and a security-first mindset.
          </p>
        </div>

        <nav className="flex flex-wrap gap-x-5 gap-y-2 text-sm text-muted" aria-label="Footer">
          {nav.map((item) => (
            <a key={item.href} href={item.href} className="link-grow hover:text-foreground">
              {item.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-4">
          <a
            href={profile.github}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub profile"
            className="text-muted transition-colors hover:text-accent"
          >
            <GithubIcon size={18} />
          </a>
          <a
            href={profile.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn profile"
            className="text-muted transition-colors hover:text-accent"
          >
            <LinkedinIcon size={18} />
          </a>
          <a
            href={`mailto:${profile.email}`}
            aria-label="Send email"
            className="text-muted transition-colors hover:text-accent"
          >
            <Mail size={18} />
          </a>
        </div>
      </Container>
      <div className="mx-auto w-full max-w-6xl overflow-hidden px-5 sm:px-8" aria-hidden="true">
        <p className="display translate-y-[18%] text-center text-[17vw] leading-none font-extrabold text-surface-hover select-none lg:text-[11.5rem]">
          sapna singh
        </p>
      </div>
      <Container className="border-t border-border py-5">
        <p className="text-xs text-muted-dim">
          © {new Date().getFullYear()} Sapna Singh. Built with Next.js and Tailwind CSS.
        </p>
      </Container>
    </footer>
  );
}
