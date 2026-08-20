import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getLegalPageBySlug, getCertificates } from "@/lib/queries";
import LegalPageTemplate from "@/components/legal/LegalPageTemplate";
import { buildMetadata } from "@/lib/seo";

export async function generateMetadata(): Promise<Metadata> {
  const page = await getLegalPageBySlug("certifications");
  if (!page) return {};

  return buildMetadata({
    title: page.metaTitle || `${page.title} | GGM Technologies`,
    description: page.metaDescription || page.subtitle || "Official Certifications, Accreditations, and Partner Badges of GGM Technologies.",
    path: "/certifications",
  });
}

export default async function CertificationsPage() {
  const [page, certificates] = await Promise.all([
    getLegalPageBySlug("certifications"),
    getCertificates(),
  ]);

  if (!page) notFound();

  return <LegalPageTemplate page={page} certificates={certificates} />;
}
