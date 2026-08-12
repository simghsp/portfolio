import Link from "next/link";
import { cn } from "@/lib/utils";

type CommonProps = {
  children: React.ReactNode;
  className?: string;
  variant?: "primary" | "secondary" | "ghost";
  size?: "sm" | "md";
};

const base =
  "inline-flex items-center justify-center gap-2 rounded-lg font-medium transition-colors duration-150 focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50";

const variants: Record<NonNullable<CommonProps["variant"]>, string> = {
  primary: "bg-accent text-[#06080d] hover:bg-accent-strong",
  secondary:
    "bg-surface text-foreground border border-border-strong hover:border-accent/50 hover:bg-surface-hover",
  ghost: "bg-transparent text-muted hover:text-foreground hover:bg-surface",
};

const sizes: Record<NonNullable<CommonProps["size"]>, string> = {
  sm: "px-3.5 py-2 text-sm",
  md: "px-5 py-2.5 text-sm",
};

export function Button({
  children,
  className,
  variant = "primary",
  size = "md",
  href,
  external,
  type,
  onClick,
  disabled,
}: CommonProps & {
  href?: string;
  external?: boolean;
  type?: "button" | "submit";
  onClick?: () => void;
  disabled?: boolean;
}) {
  const classes = cn(base, variants[variant], sizes[size], className);

  if (href) {
    if (external) {
      return (
        <a href={href} target="_blank" rel="noopener noreferrer" className={classes}>
          {children}
        </a>
      );
    }
    return (
      <Link href={href} className={classes}>
        {children}
      </Link>
    );
  }

  return (
    <button type={type ?? "button"} onClick={onClick} disabled={disabled} className={classes}>
      {children}
    </button>
  );
}
