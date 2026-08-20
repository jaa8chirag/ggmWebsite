import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getLegalPageBySlug } from "@/lib/queries";
import LegalPageTemplate from "@/components/legal/LegalPageTemplate";
import { buildMetadata } from "@/lib/seo";

export async function generateMetadata(): Promise<Metadata> {
  const page = await getLegalPageBySlug("quality-compliance");
  if (!page) return {};

  return buildMetadata({
    title: page.metaTitle || `${page.title} | GGM Technologies`,
    description: page.metaDescription || page.subtitle || "GGM Technologies Quality & Compliance Standards.",
    path: "/quality-compliance",
  });
}

export default async function QualityCompliancePage() {
  const page = await getLegalPageBySlug("quality-compliance");
  if (!page) notFound();

  return <LegalPageTemplate page={page} />;
}
