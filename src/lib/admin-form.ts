// Shared FormData parsing helpers for admin server actions.

export function str(formData: FormData, key: string): string {
  return String(formData.get(key) ?? "").trim();
}

export function optionalStr(formData: FormData, key: string): string | null {
  const v = str(formData, key);
  return v ? v : null;
}

export function num(formData: FormData, key: string): number | null {
  const v = str(formData, key);
  if (!v) return null;
  const n = Number(v);
  return Number.isFinite(n) ? n : null;
}

export function bool(formData: FormData, key: string): boolean {
  return formData.get(key) === "on";
}

export function repeating(formData: FormData, key: string): string[] {
  return formData
    .getAll(`${key}[]`)
    .map((v) => String(v).trim())
    .filter(Boolean);
}

export function repeatingPairs(
  formData: FormData,
  key: string
): { a: string; b: string }[] {
  const as = formData.getAll(`${key}A[]`).map((v) => String(v).trim());
  const bs = formData.getAll(`${key}B[]`).map((v) => String(v).trim());
  const pairs: { a: string; b: string }[] = [];
  for (let i = 0; i < as.length; i++) {
    if (as[i] || bs[i]) pairs.push({ a: as[i], b: bs[i] ?? "" });
  }
  return pairs;
}

export interface SeoFields {
  metaTitle: string | null;
  metaDescription: string | null;
  ogImage: string | null;
  canonicalOverride: string | null;
  noIndex: boolean;
}

export function parseSeoFields(formData: FormData): SeoFields {
  return {
    metaTitle: optionalStr(formData, "metaTitle"),
    metaDescription: optionalStr(formData, "metaDescription"),
    ogImage: optionalStr(formData, "ogImage"),
    canonicalOverride: optionalStr(formData, "canonicalOverride"),
    noIndex: bool(formData, "noIndex"),
  };
}
