import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getLegalPageBySlug } from "@/lib/queries";
import LegalPageTemplate from "@/components/legal/LegalPageTemplate";
import { buildMetadata } from "@/lib/seo";

export async function generateMetadata(): Promise<Metadata> {
  const page = await getLegalPageBySlug("disclaimer");
  if (!page) return {};

  return buildMetadata({
    title: page.metaTitle || `${page.title} | GGM Technologies`,
    description: page.metaDescription || page.subtitle || "GGM Technologies Disclaimer and Terms of Use.",
    path: "/disclaimer",
  });
}

export default async function DisclaimerPage() {
  const page = await getLegalPageBySlug("disclaimer");
  if (!page) notFound();

  return <LegalPageTemplate page={page} />;
}
