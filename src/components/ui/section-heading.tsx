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
      <span className="h-1.5 w-1.5 rounded-full bg-accent" aria-hidden="true" />
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
    <div className={cn("max-w-3xl", className)}>
      <SectionKicker>{kicker}</SectionKicker>
      <h2 className="display text-4xl font-bold leading-[1.02] text-foreground sm:text-5xl md:text-6xl">
        {title}
      </h2>
      {description ? (
        <p className="mt-5 max-w-2xl text-base leading-relaxed text-muted sm:text-lg">{description}</p>
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
      <h3 className="display text-2xl font-bold text-foreground sm:text-3xl">{title}</h3>
      {description ? (
        <p className="mt-3 text-sm leading-relaxed text-muted sm:text-base">{description}</p>
      ) : null}
    </div>
  );
}
