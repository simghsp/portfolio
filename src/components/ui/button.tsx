import Link from "next/link";
import { cn } from "@/lib/utils";

type CommonProps = {
  children: React.ReactNode;
  className?: string;
  variant?: "primary" | "secondary" | "ghost";
  size?: "sm" | "md";
};

const base =
  "group/btn inline-flex items-center justify-center gap-2 rounded-full font-medium transition-[color,background-color,border-color,box-shadow,transform] duration-200 active:scale-[0.97] focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50 [&_svg]:transition-transform [&_svg]:duration-200 hover:[&_svg:last-child]:translate-x-0.5";

const variants: Record<NonNullable<CommonProps["variant"]>, string> = {
  primary:
    "bg-accent text-white shadow-[0_0_0_1px_rgba(127,176,255,0.35)_inset] hover:bg-[#5294ff] hover:shadow-[0_8px_30px_-8px_rgba(59,130,255,0.7)]",
  secondary:
    "bg-surface text-foreground border border-border-strong hover:border-accent/50 hover:bg-surface-hover",
  ghost: "bg-transparent text-muted hover:text-foreground hover:bg-surface",
};

const sizes: Record<NonNullable<CommonProps["size"]>, string> = {
  sm: "px-4 py-2 text-sm",
  md: "px-6 py-3 text-sm",
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
