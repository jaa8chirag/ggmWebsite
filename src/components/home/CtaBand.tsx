import { getSettings } from "@/lib/queries";
import RevealText from "@/components/ui/RevealText";
import Button from "@/components/ui/Button";
import Magnetic from "@/components/ui/Magnetic";
import { Calculator } from "lucide-react";

export default async function CtaBand() {
  const settings = await getSettings();

  return (
    <section className="relative overflow-hidden bg-ink py-28 md:py-40">
      <div className="mx-auto max-w-[1440px] px-6 md:px-10">
        <RevealText
          as="h2"
          lines={["Let's make you", "the first result."]}
          className="font-display text-display-l text-chalk"
        />

        <div className="mt-12 flex flex-wrap items-center gap-5 sm:gap-8">
          <Magnetic>
            <Button href="/contact" variant="signal">
              Start a project
            </Button>
          </Magnetic>
          <Magnetic>
            <a
              href="/services#cost-estimator"
              className="inline-flex items-center gap-2 rounded-full border border-flow/40 bg-flow/15 px-6 py-3.5 font-mono text-xs font-bold uppercase tracking-wider text-flow shadow-lg shadow-flow/10 transition-all hover:bg-flow hover:text-ink active:scale-95 cursor-pointer"
            >
              <Calculator size={15} />
              <span>Estimate Cost</span>
            </a>
          </Magnetic>
          <a
            href={settings.phoneHref}
            className="font-mono text-lg text-muted transition-colors duration-300 hover:text-flow"
          >
            {settings.phone}
          </a>
        </div>
      </div>
    </section>
  );
}
