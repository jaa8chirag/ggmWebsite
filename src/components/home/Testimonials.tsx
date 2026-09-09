import Image from "next/image";
import Eyebrow from "@/components/ui/Eyebrow";

interface TestimonialData {
  quote: string;
  name: string;
  role: string;
  avatar?: string | null;
}

function QuoteCard({
  quote,
  name,
  role,
  avatar,
}: {
  quote: string;
  name: string;
  role: string;
  avatar?: string | null;
}) {
  return (
    <div className="w-[320px] shrink-0 rounded-2xl border-2 border-chalk/30 bg-surface p-6 shadow-md shadow-chalk/10 sm:w-[380px] flex flex-col justify-between">
      <p className="font-body text-sm text-chalk leading-relaxed">&ldquo;{quote}&rdquo;</p>
      <div className="mt-6 flex items-center gap-3 border-t border-chalk/10 pt-4">
        {avatar ? (
          <div className="relative h-10 w-10 shrink-0 overflow-hidden rounded-full border border-chalk/20 bg-ink">
            <Image
              src={avatar}
              alt={name}
              fill
              className="object-cover"
            />
          </div>
        ) : (
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-flow/20 font-display text-xs font-bold text-flow border border-flow/30">
            {name?.charAt(0) || "C"}
          </div>
        )}
        <div>
          <p className="font-display text-sm font-bold text-chalk">{name}</p>
          <p className="font-mono text-[11px] uppercase tracking-wider text-muted">{role}</p>
        </div>
      </div>
    </div>
  );
}

export default function Testimonials({
  testimonials,
}: {
  testimonials: TestimonialData[];
}) {
  if (testimonials.length === 0) return null;

  const mid = Math.ceil(testimonials.length / 2);
  const rowOne = testimonials.slice(0, mid);
  const rowTwo = testimonials.length > mid ? testimonials.slice(mid) : rowOne;

  return (
    <section className="border-t border-chalk/20 bg-ink py-24 md:py-32">
      <div className="mx-auto max-w-[1440px] px-6 md:px-10">
        <Eyebrow>What clients say</Eyebrow>
        <h2 className="mt-4 max-w-2xl font-display text-h2 text-chalk">
          PPC and SEO teams that stopped guessing.
        </h2>
      </div>

      <div className="mt-16 space-y-6">
        <div className="group overflow-hidden">
          <div
            className="flex w-max animate-marquee gap-6 group-hover:[animation-play-state:paused] motion-reduce:animate-none"
            style={{ animationDuration: "38s", animationDelay: "-19s" }}
          >
            {[...rowOne, ...rowOne].map((t, i) => (
              <QuoteCard key={i} {...t} />
            ))}
          </div>
        </div>

        <div className="group overflow-hidden">
          <div
            className="flex w-max animate-marquee gap-6 [animation-direction:reverse] group-hover:[animation-play-state:paused] motion-reduce:animate-none"
            style={{ animationDuration: "34s", animationDelay: "-11s" }}
          >
            {[...rowTwo, ...rowTwo].map((t, i) => (
              <QuoteCard key={i} {...t} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
