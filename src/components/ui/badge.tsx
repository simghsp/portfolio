import { cn } from "@/lib/utils";

export function Badge({
  children,
  className,
  variant = "default",
}: {
  children: React.ReactNode;
  className?: string;
  variant?: "default" | "accent" | "outline" | "risk";
}) {
  const variants = {
    default: "bg-surface text-muted border-border",
    accent: "bg-accent-soft text-accent-strong border-accent/30",
    outline: "bg-transparent text-muted border-border-strong",
    risk: "bg-white/5 text-foreground border-border-strong",
  };

  return (
    <span
      className={cn(
        "mono inline-flex items-center rounded-full border px-2.5 py-1 text-[11px] font-medium leading-none",
        variants[variant],
        className
      )}
    >
      {children}
    </span>
  );
}
