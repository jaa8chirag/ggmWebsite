import Link from "next/link";
import type { UrlObject } from "node:url";
import { cn } from "@/lib/utils";

type Href = string | UrlObject;

interface ButtonProps {
  children: React.ReactNode;
  href?: Href;
  variant?: "signal" | "ghost";
  className?: string;
  type?: "button" | "submit";
  onClick?: () => void;
  disabled?: boolean;
}

const base =
  "inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 font-mono text-mono-label uppercase tracking-widest transition-colors duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-flow disabled:opacity-50 disabled:cursor-not-allowed";

const variants = {
  signal: "bg-signal text-chalk hover:bg-flow",
  ghost:
    "border border-chalk/20 text-chalk hover:border-flow hover:text-flow",
};

export default function Button({
  children,
  href,
  variant = "signal",
  className,
  type = "button",
  onClick,
  disabled,
}: ButtonProps) {
  const classes = cn(base, variants[variant], className);

  if (href) {
    return (
      <Link href={href} className={classes}>
        {children}
      </Link>
    );
  }

  return (
    <button type={type} onClick={onClick} disabled={disabled} className={classes}>
      {children}
    </button>
  );
}
