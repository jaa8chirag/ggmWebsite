import path from "node:path";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  turbopack: {
    root: path.resolve(__dirname),
  },
  async redirects() {
    return [
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
        source: "/services/ppc",
        destination: "/services/e-commerce",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
