import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getLegalPageBySlug } from "@/lib/queries";
import LegalPageTemplate from "@/components/legal/LegalPageTemplate";
import { buildMetadata } from "@/lib/seo";

export async function generateMetadata(): Promise<Metadata> {
  const page = await getLegalPageBySlug("about-ceo");
  if (!page) return {};

  return buildMetadata({
    title: page.metaTitle || `${page.title} | GGM Technologies`,
    description: page.metaDescription || page.subtitle || "Learn about Chirag Kumar, Founder and CEO of GGM Technologies.",
    path: "/about-ceo",
  });
}

export default async function AboutCeoPage() {
  const page = await getLegalPageBySlug("about-ceo");
  if (!page) notFound();

  return <LegalPageTemplate page={page} />;
}
