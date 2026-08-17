import type { Metadata } from "next";
import { absoluteUrl } from "@/lib/site";

export interface SeoOverrides {
  metaTitle?: string | null;
  metaDescription?: string | null;
  ogImage?: string | null;
  canonicalOverride?: string | null;
  noIndex?: boolean;
  googleVerification?: string | null;
  ahrefsVerification?: string | null;
}

interface BuildMetadataArgs {
  title: string;
  description: string;
  path: string;
  type?: "website" | "article";
  noIndex?: boolean;
  overrides?: SeoOverrides;
}

/**
 * Consistent per-page metadata: canonical, Open Graph, Twitter card, and Site Verifications.
 * `overrides` are the admin-editable SEO fields carried on every content
 * model — when set, they win over the generated defaults.
 */
export function buildMetadata({
  title,
  description,
  path,
  type = "website",
  noIndex = false,
  overrides,
}: BuildMetadataArgs): Metadata {
  const finalTitle = overrides?.metaTitle || title;
  const finalDescription = overrides?.metaDescription || description;
  const finalNoIndex = overrides?.noIndex ?? noIndex;
  const canonical = overrides?.canonicalOverride
    ? absoluteUrl(overrides.canonicalOverride)
    : absoluteUrl(path);
  const ogImages = overrides?.ogImage ? [absoluteUrl(overrides.ogImage)] : undefined;

  const verification: Metadata["verification"] = {};
  if (overrides?.googleVerification) {
    verification.google = overrides.googleVerification;
  }
  if (overrides?.ahrefsVerification) {
    verification.other = {
      "ahrefs-site-verification": overrides.ahrefsVerification,
    };
  }

  return {
    title: finalTitle,
    description: finalDescription,
    alternates: { canonical },
    verification: Object.keys(verification).length > 0 ? verification : undefined,
    robots: finalNoIndex
      ? { index: false, follow: false }
      : { index: true, follow: true },
    openGraph: {
      title: finalTitle,
      description: finalDescription,
      url: canonical,
      siteName: "GGM Technologies",
      type,
      locale: "en_IN",
      ...(ogImages ? { images: ogImages } : {}),
    },
    twitter: {
      card: "summary_large_image",
      title: finalTitle,
      description: finalDescription,
      ...(ogImages ? { images: ogImages } : {}),
    },
  };
}
