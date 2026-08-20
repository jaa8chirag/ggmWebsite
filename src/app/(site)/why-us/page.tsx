import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getLegalPageBySlug } from "@/lib/queries";
import LegalPageTemplate from "@/components/legal/LegalPageTemplate";
import { buildMetadata } from "@/lib/seo";

export async function generateMetadata(): Promise<Metadata> {
  const page = await getLegalPageBySlug("why-us");
  if (!page) return {};

  return buildMetadata({
    title: page.metaTitle || `${page.title} | GGM Technologies`,
    description: page.metaDescription || page.subtitle || "Why leading brands partner with GGM Technologies.",
    path: "/why-us",
  });
}

export default async function WhyUsPage() {
  const page = await getLegalPageBySlug("why-us");
  if (!page) notFound();

  return <LegalPageTemplate page={page} />;
}
