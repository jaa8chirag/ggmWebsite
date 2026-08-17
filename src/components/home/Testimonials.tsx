import Eyebrow from "@/components/ui/Eyebrow";

interface TestimonialData {
  quote: string;
  name: string;
  role: string;
}

function QuoteCard({
  quote,
  name,
  role,
}: {
  quote: string;
  name: string;
  role: string;
}) {
  return (
    <div className="w-[320px] shrink-0 rounded-2xl border-2 border-chalk/30 bg-surface p-6 shadow-md shadow-chalk/10 sm:w-[380px]">
      <p className="font-body text-sm text-chalk">&ldquo;{quote}&rdquo;</p>
      <p className="mt-6 font-mono text-xs uppercase tracking-widest text-muted">
        {name} — {role}
      </p>
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
