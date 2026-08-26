import { withPayload } from "@payloadcms/next/withPayload";
import type { NextConfig } from "next";
import path from "path";
import { fileURLToPath } from "url";

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

const nextConfig: NextConfig = {
  images: {
    localPatterns: [
      {
        pathname: "/**",
      },
      {
        pathname: "/api/media/file/**",
      },
    ],
    remotePatterns: [
      {
        protocol: "http",
        hostname: "localhost",
        pathname: "/api/media/**",
      },
      {
        protocol: "http",
        hostname: "127.0.0.1",
        pathname: "/api/media/**",
      },
      {
        protocol: "https",
        hostname: "grandriverlabs.com",
        pathname: "/api/media/**",
      },
      {
        protocol: "https",
        hostname: "www.grandriverlabs.com",
        pathname: "/api/media/**",
      },
      {
        protocol: "https",
        hostname: "t3.storageapi.dev",
      },
      {
        protocol: "https",
        hostname: "storage.railway.app",
      },
    ],
  },
  async redirects() {
    return [
      { source: "/whitelabel", destination: "/white-label", permanent: true },
    ];
  },
  webpack: (webpackConfig) => {
    webpackConfig.resolve.extensionAlias = {
      ".cjs": [".cts", ".cjs"],
      ".js": [".ts", ".tsx", ".js", ".jsx"],
      ".mjs": [".mts", ".mjs"],
    };

    return webpackConfig;
  },
  turbopack: {
    root: path.resolve(dirname),
  },
};

export default withPayload(nextConfig, { devBundleServerPackages: false });
