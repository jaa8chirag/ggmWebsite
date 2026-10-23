import path from "node:path";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  compress: true,
  turbopack: {
    root: path.resolve(__dirname),
  },
  images: {
    formats: ["image/avif", "image/webp"],
    deviceSizes: [360, 480, 640, 750, 828, 1080, 1200],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 31536000,
    remotePatterns: [
      { protocol: "https", hostname: "**" },
      { protocol: "http", hostname: "**" },
    ],
  },
  async redirects() {
    return [
      {
        source: "/:path*",
        has: [
          {
            type: "host",
            value: "www.ggmtechnologies.com",
          },
        ],
        destination: "https://ggmtechnologies.com/:path*",
        permanent: true,
      },
      {
        source: "/:path*",
        has: [
          {
            type: "host",
            value: "oviz.ggmtechnologies.com",
          },
        ],
        destination: "https://ggmtechnologies.com/",
        permanent: true,
      },
      {
        source: "/sitemap_index.xml",
        destination: "/sitemap.xml",
        permanent: true,
      },
      // Legacy Service URLs (-2) from GSC
      {
        source: "/services/seo-2",
        destination: "/services/seo",
        permanent: true,
      },
      {
        source: "/services/wordpress-development-2",
        destination: "/services/wordpress-development",
        permanent: true,
      },
      {
        source: "/services/shopify-website-development-2",
        destination: "/services/shopify-website-development",
        permanent: true,
      },
      // Legacy Blog URLs (-2) from GSC
      {
        source: "/blog/lead-generation-vs-prospecting-2",
        destination: "/blog/lead-generation-vs-prospecting",
        permanent: true,
      },
      {
        source: "/blog/how-to-lower-cost-per-lead-in-google-ads-10-proven-tips-2",
        destination: "/blog/what-is-lead-generation-strategy-and-best-practices",
        permanent: true,
      },
      // Legacy WordPress Junk URLs from GSC
      {
        source: "/wp-content/:path*",
        destination: "/",
        permanent: true,
      },
      {
        source: "/wp-includes/:path*",
        destination: "/",
        permanent: true,
      },
      {
        source: "/wp-json/:path*",
        destination: "/",
        permanent: true,
      },
      {
        source: "/wp-json",
        destination: "/",
        permanent: true,
      },
      {
        source: "/wp-admin/:path*",
        destination: "/admin",
        permanent: true,
      },
      {
        source: "/index.php",
        destination: "/",
        permanent: true,
      },
      {
        source: "/index.php/:path*",
        destination: "/",
        permanent: true,
      },
      {
        source: "/sample-page",
        destination: "/",
        permanent: true,
      },
      {
        source: "/sample-page/:path*",
        destination: "/",
        permanent: true,
      },
      // Old Site Canonical Page Redirects
      {
        source: "/contact-us",
        destination: "/contact",
        permanent: true,
      },
      {
        source: "/about-us",
        destination: "/about",
        permanent: true,
      },
      {
        source: "/our-services",
        destination: "/services",
        permanent: true,
      },
      {
        source: "/careers-1",
        destination: "/careers",
        permanent: true,
      },
      {
        source: "/local-seo",
        destination: "/services/seo",
        permanent: true,
      },
      {
        source: "/lead-generation",
        destination: "/services/lead-generation",
        permanent: true,
      },
      {
        source: "/refund-and-returns-policy",
        destination: "/refund-policy",
        permanent: true,
      },
      {
        source: "/privacy-policy-2",
        destination: "/privacy-policy",
        permanent: true,
      },
      // Root-level Old WordPress Blog Posts -> /blog/:slug
      {
        source: "/ecommerce-website-development-cost-in-india",
        destination: "/blog/ecommerce-website-development-cost-in-india",
        permanent: true,
      },
      {
        source: "/4-steps-of-the-lead-generation-process",
        destination: "/blog/4-steps-of-the-lead-generation-process",
        permanent: true,
      },
      {
        source: "/lead-generation-vs-prospecting",
        destination: "/blog/lead-generation-vs-prospecting",
        permanent: true,
      },
      {
        source: "/google-search-algorithm-updates",
        destination: "/blog/google-search-algorithm-updates",
        permanent: true,
      },
      {
        source: "/what-are-the-5-golden-rules-of-a-website",
        destination: "/blog/5-golden-rules-of-a-website",
        permanent: true,
      },
      {
        source: "/12-popular-types-of-websites",
        destination: "/blog/12-popular-types-of-websites-you-can-create",
        permanent: true,
      },
      {
        source: "/4-ps-of-real-estate-success",
        destination: "/blog",
        permanent: true,
      },
      {
        source: "/mern-stack",
        destination: "/services/website-development-services",
        permanent: true,
      },
      {
        source: "/top-10-coding-software-tools-to-boost-your-skills",
        destination: "/blog",
        permanent: true,
      },
      {
        source: "/web-3-0",
        destination: "/blog",
        permanent: true,
      },
      {
        source: "/hello-world",
        destination: "/blog",
        permanent: true,
      },
      {
        source: "/a-featured-image-post",
        destination: "/blog",
        permanent: true,
      },
      {
        source: "/-0",
        destination: "/",
        permanent: true,
      },
      {
        source: "/blog/how-to-lower-cost-per-lead-in-google-ads-10-proven-tips/opengraph-image",
        destination: "/blog/what-is-lead-generation-strategy-and-best-practices",
        permanent: true,
      },
      // WooCommerce Products & Categories -> /shop
      {
        source: "/product/:slug*",
        destination: "/shop",
        permanent: true,
      },
      {
        source: "/product-category/:slug*",
        destination: "/shop",
        permanent: true,
      },
      {
        source: "/product-tag/:slug*",
        destination: "/shop",
        permanent: true,
      },
      {
        source: "/cart",
        destination: "/shop",
        permanent: true,
      },
      {
        source: "/checkout",
        destination: "/shop",
        permanent: true,
      },
      {
        source: "/my-account/:path*",
        destination: "/",
        permanent: true,
      },
      {
        source: "/my-account",
        destination: "/",
        permanent: true,
      },
      // Old WordPress Taxonomy & Feed Cleanup
      {
        source: "/category/:path*",
        destination: "/blog",
        permanent: true,
      },
      {
        source: "/tag/:path*",
        destination: "/blog",
        permanent: true,
      },
      {
        source: "/author/:path*",
        destination: "/about",
        permanent: true,
      },
      {
        source: "/feed",
        destination: "/blog",
        permanent: true,
      },
      {
        source: "/feed/:path*",
        destination: "/blog",
        permanent: true,
      },
      {
        source: "/comments/feed/:path*",
        destination: "/blog",
        permanent: true,
      },
      {
        source: "/:slug/feed",
        destination: "/blog",
        permanent: true,
      },
      {
        source: "/:slug/feed/:path*",
        destination: "/blog",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
