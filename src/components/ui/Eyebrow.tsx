import { cn } from "@/lib/utils";

export default function Eyebrow({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <p
      className={cn(
        "flex items-center gap-3 font-mono text-mono-label uppercase tracking-widest text-muted",
        className
      )}
    >
      <span className="h-px w-6 bg-signal" aria-hidden="true" />
      {children}
    </p>
  );
}
