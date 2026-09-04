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
  },
  async redirects() {
    return [
      // 1. Legal legacy WordPress URLs
      {
        source: "/privacy-policy-2",
        destination: "/privacy-policy",
        permanent: true,
      },
      {
        source: "/returns-policy",
        destination: "/refund-policy",
        permanent: true,
      },
      {
        source: "/refund-and-returns-policy",
        destination: "/refund-policy",
        permanent: true,
      },
      {
        source: "/refund-and-return-policy",
        destination: "/refund-policy",
        permanent: true,
      },
      {
        source: "/cancellation-and-refund-policy",
        destination: "/refund-policy",
        permanent: true,
      },

      // 2. Service & Category legacy URLs
      {
        source: "/services/ppc",
        destination: "/services/e-commerce",
        permanent: true,
      },
      {
        source: "/category/lead-generation",
        destination: "/services/lead-generation",
        permanent: true,
      },
      {
        source: "/category/website-development",
        destination: "/services/website-development",
        permanent: true,
      },
      {
        source: "/category/seo",
        destination: "/services/seo",
        permanent: true,
      },
      {
        source: "/category/e-commerce",
        destination: "/services/e-commerce",
        permanent: true,
      },
      {
        source: "/category/:slug*",
        destination: "/blog",
        permanent: true,
      },

      // 3. WooCommerce Products legacy URLs
      {
        source: "/product/:slug*",
        destination: "/shop/:slug*",
        permanent: true,
      },
      {
        source: "/product-category/:slug*",
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
        destination: "/contact",
        permanent: true,
      },
      {
        source: "/my-account",
        destination: "/contact",
        permanent: true,
      },

      // 4. Old WordPress root blog post permalinks to /blog/:slug
      {
        source: "/4-ps-of-real-estate-success",
        destination: "/blog/4-ps-of-real-estate-success",
        permanent: true,
      },
      {
        source: "/ecommerce-website-development-cost-in-india",
        destination: "/blog/ecommerce-website-development-cost-in-india",
        permanent: true,
      },
      {
        source: "/what-is-lead-generation-strategy-and-best-practices",
        destination: "/blog/what-is-lead-generation-strategy-and-best-practices",
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
        source: "/4-steps-of-the-lead-generation-process",
        destination: "/blog/4-steps-of-the-lead-generation-process",
        permanent: true,
      },
      {
        source: "/5-golden-rules-of-a-website",
        destination: "/blog/5-golden-rules-of-a-website",
        permanent: true,
      },
      {
        source: "/12-popular-types-of-websites-you-can-create",
        destination: "/blog/12-popular-types-of-websites-you-can-create",
        permanent: true,
      },

      // 5. Common WordPress tags / authors
      {
        source: "/tag/:slug*",
        destination: "/blog",
        permanent: true,
      },
      {
        source: "/author/:slug*",
        destination: "/about",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
