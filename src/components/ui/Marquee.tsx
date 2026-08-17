import { cn } from "@/lib/utils";

export default function Marquee({
  items,
  className,
  itemClassName,
  duration = 32,
}: {
  items: string[];
  className?: string;
  itemClassName?: string;
  duration?: number;
}) {
  return (
    <div className={cn("group overflow-hidden", className)}>
      <div
        className="flex w-max animate-marquee gap-12 group-hover:[animation-play-state:paused] motion-reduce:animate-none"
        style={{ animationDuration: `${duration}s`, animationDelay: `-${duration / 2}s` }}
      >
        {[...items, ...items].map((item, i) => (
          <span
            key={i}
            className={cn(
              "font-mono text-mono-label uppercase tracking-widest text-muted",
              itemClassName
            )}
          >
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}
