import { getSettings } from "@/lib/queries";
import RevealText from "@/components/ui/RevealText";
import Button from "@/components/ui/Button";
import Magnetic from "@/components/ui/Magnetic";

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

        <div className="mt-12 flex flex-wrap items-center gap-8">
          <Magnetic>
            <Button href="/contact" variant="signal">
              Start a project
            </Button>
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
