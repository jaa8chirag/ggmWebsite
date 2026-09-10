export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL || "https://ggmtechnologies.com"
).replace(/\/$/, "");

export function absoluteUrl(path: string) {
  return `${SITE_URL}${path.startsWith("/") ? path : `/${path}`}`;
}
