import { cn } from "@/lib/utils";

export function SectionKicker({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "mono mb-4 inline-flex items-center gap-2 text-xs font-medium uppercase tracking-[0.2em] text-accent",
        className
      )}
    >
      <span className="h-px w-6 bg-accent/60" aria-hidden="true" />
      {children}
    </div>
  );
}

export function SectionHeading({
  kicker,
  title,
  description,
  className,
}: {
  kicker: string;
  title: string;
  description?: string;
  className?: string;
}) {
  return (
    <div className={cn("max-w-2xl", className)}>
      <SectionKicker>{kicker}</SectionKicker>
      <h2 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
        {title}
      </h2>
      {description ? (
        <p className="mt-4 text-base leading-relaxed text-muted">{description}</p>
      ) : null}
    </div>
  );
}

export function SubsectionHeading({
  kicker,
  title,
  description,
  className,
}: {
  kicker: string;
  title: string;
  description?: string;
  className?: string;
}) {
  return (
    <div className={cn("max-w-2xl", className)}>
      <SectionKicker className="mb-3">{kicker}</SectionKicker>
      <h3 className="text-xl font-semibold tracking-tight text-foreground sm:text-2xl">{title}</h3>
      {description ? (
        <p className="mt-3 text-sm leading-relaxed text-muted sm:text-base">{description}</p>
      ) : null}
    </div>
  );
}
