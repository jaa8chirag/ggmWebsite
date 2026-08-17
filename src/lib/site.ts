export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL || "https://ggm-web-seven.vercel.app"
).replace(/\/$/, "");

export function absoluteUrl(path: string) {
  return `${SITE_URL}${path.startsWith("/") ? path : `/${path}`}`;
}
