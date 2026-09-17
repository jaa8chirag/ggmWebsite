import type { Metadata } from "next";
import Link from "next/link";
import {
  Briefcase,
  Users,
  TrendingUp,
  Sparkles,
  ShieldCheck,
  CheckCircle2,
  ArrowRight,
  MapPin,
  Laptop,
  Award,
  Zap,
  HelpCircle,
  Clock,
  Send,
} from "lucide-react";
import { getSettings } from "@/lib/queries";
import Eyebrow from "@/components/ui/Eyebrow";
import Breadcrumbs from "@/components/seo/Breadcrumbs";
import Button from "@/components/ui/Button";
import { buildMetadata } from "@/lib/seo";
import OpenPositions from "./OpenPositions";
import CareerApplicationSection from "./CareerApplicationSection";

const title = "Careers & Open Positions in New Delhi | GGM Technologies";
const description =
  "Join GGM Technologies — Delhi NCR's data-driven digital marketing and web engineering partner. Explore open roles in SEO, Next.js Development, PPC Advertising, and Content Strategy.";

export const metadata: Metadata = buildMetadata({
  title,
  description,
  path: "/careers",
});

export default async function CareersPage() {
  const settings = await getSettings();

  const culturePerks = [
    {
      icon: TrendingUp,
      title: "Real Growth & Meritocracy",
      desc: "Zero corporate politics. Your career progression and increments are tied directly to impact, technical mastery, and creative execution.",
    },
    {
      icon: Zap,
      title: "Modern Tools & AI Stacks",
      desc: "Work with industry-leading suites: Ahrefs, Semrush, Screaming Frog, Next.js, GA4, Meta Ads Manager, and cutting-edge generative AI workflows.",
    },
    {
      icon: Award,
      title: "100% Ethical White-Hat Work",
      desc: "Take pride in high-standard campaigns that never cut corners. We build sustainable search authority and clean, maintainable web engineering.",
    },
    {
      icon: Users,
      title: "Mentorship & Leadership Access",
      desc: "Collaborate directly with senior leadership, founders, and experienced specialists. Learn agency economics and strategic problem solving.",
    },
  ];

  const hiringSteps = [
    {
      step: "01",
      title: "Online Application",
      desc: "Submit your details, portfolio link, and updated CV via our official Google Form below.",
    },
    {
      step: "02",
      title: "Introductory Screening",
      desc: "A brief 20-minute conversation to learn about your background, career aspirations, and culture fit.",
    },
    {
      step: "03",
      title: "Practical Skills Assessment",
      desc: "A practical evaluation or portfolio walkthrough showcasing your problem-solving approach in real client scenarios.",
    },
    {
      step: "04",
      title: "Offer & Welcome",
      desc: "Final conversation with team leadership, formal offer letter, clear growth milestones, and seamless onboarding.",
    },
  ];

  const faqs = [
    {
      q: "Where is the GGM Technologies office located?",
      a: "Our headquarters are based in Dwarka, New Delhi. We offer convenient connectivity, a modern workspace, and hybrid flexibility for select engineering and content roles.",
    },
    {
      q: "How quickly do you review applications?",
      a: "Our talent team reviews submissions within 2 to 4 business days. Qualified candidates will be contacted via email or WhatsApp to schedule an introductory call.",
    },
    {
      q: "Can freshers or recent college graduates apply?",
      a: "Yes! We welcome enthusiastic freshers with strong foundational knowledge, personal projects, or relevant internship experience for junior roles.",
    },
    {
      q: "What should I have ready before submitting the form?",
      a: "An updated PDF copy of your CV/Resume, links to your LinkedIn profile, GitHub/portfolio (for developers and designers), or recent case studies (for marketers).",
    },
  ];

  return (
    <div className="bg-ink text-chalk min-h-screen py-32 md:py-40">
      <div className="mx-auto max-w-[1440px] px-6 md:px-10">
        <Breadcrumbs items={[{ name: "Careers", path: "/careers" }]} />

        {/* 1. Hero Section */}
        <section className="mt-8 border-b border-chalk/15 pb-16">
          <div className="flex flex-wrap items-center gap-3">
            <Eyebrow>Careers &amp; Opportunities</Eyebrow>
            <span className="inline-flex items-center gap-1.5 rounded-full border border-signal/40 bg-signal/10 px-3 py-0.5 font-mono text-xs font-semibold text-signal">
              <span className="h-1.5 w-1.5 rounded-full bg-signal animate-ping" />
              We Are Hiring
            </span>
            <span className="rounded-full border border-flow/30 bg-flow/10 px-3 py-0.5 font-mono text-xs text-flow">
              Govt. MSME Certified Agency
            </span>
          </div>

          <h1 className="mt-6 max-w-4xl font-display text-4xl font-bold tracking-tight text-chalk sm:text-5xl md:text-6xl lg:text-7xl leading-[1.05]">
            Build Your Career Where Digital Growth Gets Engineered.
          </h1>

          <p className="mt-6 max-w-3xl font-body text-body-l text-muted leading-relaxed">
            At GGM Technologies, we don’t do cookie-cutter agency work. We combine data science, algorithmic search mastery, and cutting-edge web development to scale ambitious businesses. If you thrive on learning, problem-solving, and measurable results, you belong here.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-4">
            <a
              href="#open-positions"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-flow px-7 py-3.5 font-mono text-xs font-semibold uppercase tracking-widest text-white hover:bg-flow/90 transition-all shadow-md"
            >
              <Briefcase size={14} /> Explore Open Roles
            </a>
            <a
              href="#apply-form"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-signal px-7 py-3.5 font-mono text-xs font-semibold uppercase tracking-widest text-chalk hover:bg-flow hover:text-white transition-all shadow-md"
            >
              <Send size={14} /> Apply via Google Form
            </a>
          </div>

          {/* Quick Metrics & Badges */}
          <div className="mt-12 grid grid-cols-2 sm:grid-cols-4 gap-4 border-t border-chalk/10 pt-8">
            <div className="rounded-2xl border border-chalk/10 bg-surface/60 p-4">
              <p className="font-mono text-xs uppercase text-muted">Hiring Hub</p>
              <p className="mt-1 font-display text-lg font-bold text-chalk">
                Dwarka, New Delhi
              </p>
            </div>
            <div className="rounded-2xl border border-chalk/10 bg-surface/60 p-4">
              <p className="font-mono text-xs uppercase text-muted">Work Culture</p>
              <p className="mt-1 font-display text-lg font-bold text-chalk">
                Merit &amp; Speed
              </p>
            </div>
            <div className="rounded-2xl border border-chalk/10 bg-surface/60 p-4">
              <p className="font-mono text-xs uppercase text-muted">Experience</p>
              <p className="mt-1 font-display text-lg font-bold text-chalk">
                Freshers to 5+ Yrs
              </p>
            </div>
            <div className="rounded-2xl border border-chalk/10 bg-surface/60 p-4">
              <p className="font-mono text-xs uppercase text-muted">Search Philosophy</p>
              <p className="mt-1 font-display text-lg font-bold text-flow">
                100% White-Hat
              </p>
            </div>
          </div>
        </section>

        {/* 2. Why Join Us / Culture & Perks */}
        <section className="mt-20 border-b border-chalk/15 pb-20">
          <div className="text-center max-w-2xl mx-auto">
            <p className="font-mono text-xs font-semibold uppercase tracking-widest text-flow">
              Why GGM Technologies
            </p>
            <h2 className="mt-3 font-display text-3xl sm:text-4xl font-bold text-chalk">
              An Environment Designed for High Performers
            </h2>
            <p className="mt-3 font-body text-base text-muted">
              We empower every team member with direct responsibility, clear goals, and the best tools in the industry.
            </p>
          </div>

          <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {culturePerks.map((item, i) => {
              const Icon = item.icon;
              return (
                <div
                  key={i}
                  className="rounded-3xl border border-chalk/15 bg-surface/90 p-7 shadow-sm hover:border-flow/40 transition-all backdrop-blur-sm"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-flow/10 text-flow">
                    <Icon size={22} />
                  </div>
                  <h3 className="mt-5 font-display text-lg font-bold text-chalk">
                    {item.title}
                  </h3>
                  <p className="mt-2 font-body text-sm text-muted leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </section>

        {/* 3. Hiring Roadmap (4 Steps) */}
        <section className="mt-20 border-b border-chalk/15 pb-20">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <p className="font-mono text-xs font-semibold uppercase tracking-widest text-flow">
                Hiring Roadmap
              </p>
              <h2 className="mt-2 font-display text-3xl sm:text-4xl font-bold text-chalk">
                Simple, Respectful &amp; Transparent Hiring
              </h2>
            </div>
            <p className="font-body text-sm text-muted max-w-md">
              No endless loops. We value your time and keep our selection process swift, insightful, and practical.
            </p>
          </div>

          <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {hiringSteps.map((step) => (
              <div
                key={step.step}
                className="relative rounded-3xl border border-chalk/15 bg-surface/80 p-6 shadow-sm flex flex-col justify-between"
              >
                <div>
                  <span className="font-mono text-2xl font-black text-flow/30">
                    {step.step}
                  </span>
                  <h3 className="mt-3 font-display text-lg font-bold text-chalk">
                    {step.title}
                  </h3>
                  <p className="mt-2 font-body text-sm text-muted leading-relaxed">
                    {step.desc}
                  </p>
                </div>
                <div className="mt-6 border-t border-chalk/10 pt-3 flex items-center gap-1 font-mono text-[11px] text-flow font-medium">
                  <CheckCircle2 size={12} /> Step {step.step} in pipeline
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 4. Interactive Open Positions List */}
        <OpenPositions />

        {/* 5. Google Form Application Section */}
        <CareerApplicationSection
          settingsEmail={settings.email}
          settingsPhone={settings.phone}
          settingsPhoneHref={settings.phoneHref}
          settingsWhatsapp={settings.whatsapp}
        />

        {/* 6. FAQ Section */}
        <section className="mt-24 border-t border-chalk/15 pt-20">
          <div className="text-center max-w-2xl mx-auto">
            <div className="inline-flex items-center gap-2 rounded-full border border-flow/30 bg-flow/10 px-3.5 py-1 font-mono text-xs font-semibold text-flow">
              <HelpCircle size={13} /> Common Inquiries
            </div>
            <h2 className="mt-3 font-display text-3xl sm:text-4xl font-bold text-chalk">
              Frequently Asked Questions
            </h2>
          </div>

          <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
            {faqs.map((faq, idx) => (
              <div
                key={idx}
                className="rounded-3xl border border-chalk/15 bg-surface/80 p-6 sm:p-7 shadow-sm"
              >
                <h3 className="font-display text-base font-bold text-chalk flex items-start gap-2.5">
                  <span className="text-flow font-mono text-sm">Q:</span>
                  <span>{faq.q}</span>
                </h3>
                <p className="mt-3 font-body text-sm text-muted leading-relaxed pl-6 border-l-2 border-flow/20">
                  {faq.a}
                </p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
