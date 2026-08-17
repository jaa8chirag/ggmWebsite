import type { ProcessStep } from "@/types";

export const processSteps: ProcessStep[] = [
  {
    index: "01",
    title: "Audit",
    description:
      "We start by tearing down what's already there — technical SEO, ad accounts, site performance, and competitor positioning — so every recommendation is grounded in your actual numbers, not a template.",
    lottie: "/lottie/audit.lottie",
  },
  {
    index: "02",
    title: "Strategy",
    description:
      "A channel plan built around your budget and sales cycle, not ours: which of SEO, PPC, social, and lead gen carry the weight, in what order, and what success looks like in 30/60/90 days.",
    lottie: "/lottie/strategy.lottie",
  },
  {
    index: "03",
    title: "Execute",
    description:
      "Builds, campaigns, and content ship on a weekly cadence. You see the work as it happens — no black box, no quarterly surprise reports.",
    lottie: "/lottie/execute.lottie",
  },
  {
    index: "04",
    title: "Scale",
    description:
      "Once a channel proves itself, we double down — reallocating budget toward what's converting and cutting what isn't, on a rolling basis.",
    lottie: "/lottie/scale.lottie",
  },
];
