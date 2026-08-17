import Counter from "@/components/ui/Counter";

interface MetricData {
  value: number;
  suffix: string;
  label: string;
}

export default function Metrics({ metrics }: { metrics: MetricData[] }) {
  return (
    <section className="border-t border-chalk/20 bg-ink py-24">
      <div className="mx-auto max-w-[1440px] px-6 md:px-10">
        <h2 className="sr-only">GGM Technologies results in numbers</h2>
        <div className="grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-chalk/20 bg-chalk/10 md:grid-cols-4">
          {metrics.map((metric) => (
            <div
              key={metric.label}
              className="flex flex-col items-start gap-2 bg-ink p-8"
            >
              <Counter
                value={metric.value}
                suffix={metric.suffix}
                className="font-mono text-4xl text-chalk md:text-5xl"
              />
              <span className="font-mono text-mono-label uppercase tracking-widest text-muted">
                {metric.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
