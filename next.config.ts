import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      { source: "/whitelabel", destination: "/white-label", permanent: true },
    ];
  },
};

export default nextConfig;
