import type { MetadataRoute } from "next";
import {
  getServices,
  getPublishedPosts,
  getProducts,
  getPublishedServiceLocations,
} from "@/lib/queries";
import { SITE_URL } from "@/lib/site";

// Reads live from Postgres — keep it fresh rather than baked in at build time.
export const dynamic = "force-dynamic";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [services, posts, products, serviceLocations] = await Promise.all([
    getServices(),
    getPublishedPosts(),
    getProducts(),
    getPublishedServiceLocations(),
  ]);

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${SITE_URL}/`, changeFrequency: "weekly", priority: 1 },
    { url: `${SITE_URL}/services`, changeFrequency: "monthly", priority: 0.9 },
    { url: `${SITE_URL}/work`, changeFrequency: "monthly", priority: 0.7 },
    { url: `${SITE_URL}/shop`, changeFrequency: "monthly", priority: 0.7 },
    { url: `${SITE_URL}/about`, changeFrequency: "monthly", priority: 0.6 },
    { url: `${SITE_URL}/blog`, changeFrequency: "weekly", priority: 0.8 },
    { url: `${SITE_URL}/contact`, changeFrequency: "yearly", priority: 0.5 },
  ];

  const serviceRoutes: MetadataRoute.Sitemap = services.map((service) => ({
    url: `${SITE_URL}/services/${service.slug}`,
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  const serviceLocationRoutes: MetadataRoute.Sitemap = serviceLocations.map(
    (sl) => ({
      url: `${SITE_URL}/services/${sl.service.slug}/${sl.location.slug}`,
      changeFrequency: "monthly",
      priority: 0.7,
    })
  );

  const blogRoutes: MetadataRoute.Sitemap = posts.map((post) => ({
    url: `${SITE_URL}/blog/${post.slug}`,
    lastModified: post.date,
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  const shopRoutes: MetadataRoute.Sitemap = products.map((product) => ({
    url: `${SITE_URL}/shop/${product.slug}`,
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  return [
    ...staticRoutes,
    ...serviceRoutes,
    ...serviceLocationRoutes,
    ...blogRoutes,
    ...shopRoutes,
  ];
}
