import { cn } from "@/lib/utils";

export default function Card({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "rounded-2xl border border-chalk/25 bg-surface p-8 shadow-md shadow-chalk/10",
        className
      )}
    >
      {children}
    </div>
  );
}
