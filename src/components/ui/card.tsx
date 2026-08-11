import { cn } from "@/lib/utils";

export function Card({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "rounded-2xl border border-border bg-surface/60 p-6 backdrop-blur-sm transition-colors duration-200",
        className
      )}
    >
      {children}
    </div>
  );
}
