import type { Metadata } from "next";
import Link from "next/link";
import {
  ShieldCheck,
  Award,
  Users,
  Building2,
  CheckCircle2,
  Sparkles,
  ArrowRight,
  TrendingUp,
} from "lucide-react";
import { getSettings } from "@/lib/queries";
import Eyebrow from "@/components/ui/Eyebrow";
import Breadcrumbs from "@/components/seo/Breadcrumbs";
import FormattedText from "@/components/ui/FormattedText";
import Button from "@/components/ui/Button";
import { buildMetadata } from "@/lib/seo";

const title = "About Us — Digital Marketing Agency in Delhi | GGM Technologies";
const description =
  "Discover GGM Technologies: Quality & Compliance standards, leadership, company history, and why leading brands choose our data-backed digital growth engine.";

export const metadata: Metadata = buildMetadata({
  title,
  description,
  path: "/about",
});

export default async function AboutPage() {
  const settings = await getSettings();

  return (
    <div className="bg-ink text-chalk min-h-screen py-32 md:py-40">
      <div className="mx-auto max-w-[1440px] px-6 md:px-10">
        <Breadcrumbs items={[{ name: "About Us", path: "/about" }]} />

        {/* 1. Header Hero: About Us Overview */}
        <section id="about-us" className="mt-8 border-b border-chalk/15 pb-16">
          <div className="flex flex-wrap items-center gap-3">
            <Eyebrow>{settings.aboutEyebrow}</Eyebrow>
            <span className="rounded-full border border-flow/30 bg-flow/10 px-3 py-0.5 font-mono text-xs text-flow">
              Govt. MSME Certified
            </span>
          </div>

          <h1 className="mt-5 max-w-3xl font-display text-4xl font-bold tracking-tight text-chalk sm:text-5xl md:text-6xl">
            {settings.aboutTitle}
          </h1>

          <div className="mt-8 grid grid-cols-1 gap-12 lg:grid-cols-12">
            <div className="lg:col-span-8">
              <FormattedText
                text={settings.aboutIntro}
                className="font-body text-body-l text-muted leading-relaxed"
              />
            </div>
            <div className="lg:col-span-4 flex flex-col justify-center rounded-3xl border border-chalk/15 bg-surface/80 p-6 shadow-sm">
              <p className="font-mono text-xs uppercase tracking-widest text-flow">
                Mission &amp; Vision
              </p>
              <div className="mt-4 space-y-4 font-body text-sm text-muted">
                <div>
                  <strong className="text-chalk block">Our Mission:</strong>
                  <FormattedText text={settings.mission} className="mt-1" />
                </div>
                <div className="border-t border-chalk/10 pt-3">
                  <strong className="text-chalk block">Our Vision:</strong>
                  <FormattedText text={settings.vision} className="mt-1" />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 2. Quality & Compliance Section */}
        <section id="quality-compliance" className="mt-20 border-b border-chalk/15 pb-20">
          <div className="flex items-center gap-2">
            <ShieldCheck className="h-5 w-5 text-flow" />
            <p className="font-mono text-mono-label uppercase tracking-widest text-flow">
              2. Quality &amp; Compliance Standards
            </p>
          </div>
          <h2 className="mt-3 font-display text-3xl sm:text-4xl text-chalk">
            Engineering Precision &amp; Ethical Search Practices
          </h2>

          <div className="mt-8 grid grid-cols-1 gap-8 md:grid-cols-3">
            <div className="rounded-3xl border border-chalk/15 bg-surface p-7 shadow-sm">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-flow/10 text-flow">
                <CheckCircle2 size={20} />
              </div>
              <h3 className="mt-5 font-display text-xl text-chalk">
                100% White-Hat SEO
              </h3>
              <p className="mt-2 font-body text-sm text-muted leading-relaxed">
                Strict adherence to Google Search Essentials and Webmaster Guidelines. Zero PBNs, zero algorithmic shortcuts.
              </p>
            </div>

            <div className="rounded-3xl border border-chalk/15 bg-surface p-7 shadow-sm">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-signal/10 text-signal">
                <ShieldCheck size={20} />
              </div>
              <h3 className="mt-5 font-display text-xl text-chalk">
                Enterprise Data Protection
              </h3>
              <p className="mt-2 font-body text-sm text-muted leading-relaxed">
                End-to-end NDA security protocols, secure server-side tracking, and strict Indian IT Act &amp; GDPR compliance.
              </p>
            </div>

            <div className="rounded-3xl border border-chalk/15 bg-surface p-7 shadow-sm">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-500">
                <Award size={20} />
              </div>
              <h3 className="mt-5 font-display text-xl text-chalk">
                Verified Trust Accreditations
              </h3>
              <p className="mt-2 font-body text-sm text-muted leading-relaxed">
                Govt. MSME Udyam certified, IndiaMART TrustSeal member, and Google Premier Partner certified architects.
              </p>
            </div>
          </div>

          {settings.qualityCompliance && (
            <div className="mt-8 rounded-3xl border border-flow/20 bg-surface/60 p-8">
              <FormattedText
                text={settings.qualityCompliance}
                className="font-body text-body text-muted leading-relaxed"
              />
            </div>
          )}
        </section>

        {/* 3. About CEO / Leadership Section */}
        <section id="about-ceo" className="mt-20 border-b border-chalk/15 pb-20">
          <div className="flex items-center gap-2">
            <Users className="h-5 w-5 text-signal" />
            <p className="font-mono text-mono-label uppercase tracking-widest text-signal">
              3. Leadership &amp; CEO Vision
            </p>
          </div>

          <div className="mt-8 grid grid-cols-1 items-center gap-12 lg:grid-cols-12">
            <div className="lg:col-span-5">
              <div className="rounded-3xl border-2 border-chalk/20 bg-surface p-8 shadow-xl">
                <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-flow text-white font-display text-2xl font-bold shadow-lg shadow-flow/30">
                  {settings.ceoName?.charAt(0) ?? "C"}
                </div>
                <h3 className="mt-6 font-display text-2xl font-bold text-chalk">
                  {settings.ceoName ?? "Chirag Kumar"}
                </h3>
                <p className="font-mono text-xs uppercase tracking-wider text-flow font-semibold mt-1">
                  {settings.ceoTitle ?? "Founder & Chief Executive Officer"}
                </p>
                <div className="mt-6 flex flex-wrap gap-2">
                  <span className="rounded-full bg-ink/70 px-3 py-1 font-mono text-[11px] text-muted">
                    SEO Architect
                  </span>
                  <span className="rounded-full bg-ink/70 px-3 py-1 font-mono text-[11px] text-muted">
                    Full-Stack Engineer
                  </span>
                  <span className="rounded-full bg-ink/70 px-3 py-1 font-mono text-[11px] text-muted">
                    Media Buyer
                  </span>
                </div>
              </div>
            </div>

            <div className="lg:col-span-7">
              <h2 className="font-display text-3xl sm:text-4xl text-chalk">
                &ldquo;Digital Marketing is Mathematics &amp; Engineering — not guesswork.&rdquo;
              </h2>
              <div className="mt-6">
                <FormattedText
                  text={
                    settings.ceoBio ||
                    "Driven by an uncompromising commitment to transparent, numbers-backed digital growth, Chirag Kumar founded GGM Technologies to bridge the gap between creative marketing strategy and hardcore engineering precision."
                  }
                  className="font-body text-body-l text-muted leading-relaxed"
                />
              </div>
            </div>
          </div>
        </section>

        {/* 4. About The Company Section */}
        <section id="about-company" className="mt-20 border-b border-chalk/15 pb-20">
          <div className="flex items-center gap-2">
            <Building2 className="h-5 w-5 text-flow" />
            <p className="font-mono text-mono-label uppercase tracking-widest text-flow">
              4. About The Company
            </p>
          </div>
          <h2 className="mt-3 font-display text-3xl sm:text-4xl text-chalk">
            Born in New Delhi, Delivering Globally
          </h2>

          <div className="mt-8 rounded-3xl border border-chalk/15 bg-surface p-8 sm:p-10 shadow-sm">
            <FormattedText
              text={
                settings.companyStory ||
                "Founded in New Delhi, GGM Technologies emerged from a single realization: vanity metrics do not pay salaries. We have engineered full-funnel digital infrastructure for over 250+ brands globally."
              }
              className="font-body text-body text-muted leading-relaxed"
            />

            <div className="mt-8 grid grid-cols-2 sm:grid-cols-4 gap-6 border-t border-chalk/15 pt-8">
              {settings.metricItems.map((m) => (
                <div key={m.label}>
                  <p className="font-display text-3xl sm:text-4xl font-bold text-chalk">
                    {m.value}{m.suffix}
                  </p>
                  <p className="mt-1 font-mono text-xs text-muted">
                    {m.label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 5. Why Choose Us (Why Us) Section */}
        <section id="why-us" className="mt-20 pb-10">
          <div className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-signal" />
            <p className="font-mono text-mono-label uppercase tracking-widest text-signal">
              5. Why Choose GGM Technologies
            </p>
          </div>
          <h2 className="mt-3 font-display text-3xl sm:text-4xl text-chalk">
            Built on Numbers. Accountable to Revenue.
          </h2>

          <div className="mt-10 grid grid-cols-1 gap-8 sm:grid-cols-3">
            {settings.whyChooseUs.map((item) => (
              <div
                key={item.title}
                className="rounded-3xl border border-chalk/15 bg-surface p-8 shadow-sm hover:border-flow/40 transition-colors"
              >
                <h3 className="font-display text-xl font-bold text-chalk">
                  {item.title}
                </h3>
                <FormattedText
                  text={item.description}
                  as="p"
                  className="mt-3 font-body text-sm text-muted leading-relaxed"
                />
              </div>
            ))}
          </div>

          <div className="mt-16 flex flex-col sm:flex-row items-center justify-between gap-6 rounded-3xl border border-flow/30 bg-flow/10 p-8 sm:p-10">
            <div>
              <p className="font-display text-2xl sm:text-3xl font-bold text-chalk">
                Ready to engineer your growth pipeline?
              </p>
              <p className="mt-2 font-body text-sm text-muted">
                Speak directly with our technical team for a complimentary audit.
              </p>
            </div>
            <Button href="/contact" variant="signal" className="shrink-0">
              Start a project
            </Button>
          </div>
        </section>
      </div>
    </div>
  );
}
