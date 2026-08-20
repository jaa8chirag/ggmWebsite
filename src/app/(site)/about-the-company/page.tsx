import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getLegalPageBySlug } from "@/lib/queries";
import LegalPageTemplate from "@/components/legal/LegalPageTemplate";
import { buildMetadata } from "@/lib/seo";

export async function generateMetadata(): Promise<Metadata> {
  const page = await getLegalPageBySlug("about-the-company");
  if (!page) return {};

  return buildMetadata({
    title: page.metaTitle || `${page.title} | GGM Technologies`,
    description: page.metaDescription || page.subtitle || "Learn about GGM Technologies company history, headquarters, and capabilities.",
    path: "/about-the-company",
  });
}

export default async function AboutTheCompanyPage() {
  const page = await getLegalPageBySlug("about-the-company");
  if (!page) notFound();

  return <LegalPageTemplate page={page} />;
}
