import type { MetadataRoute } from "next";
import { connection } from "next/server";
import { getSitemapDocs } from "@/lib/cms";
import { getSiteUrl } from "@/lib/site";

const staticPaths = [
  "/",
  "/about",
  "/ai-automation",
  "/automation",
  "/automation/business-process-automation",
  "/automation-consulting",
  "/blog",
  "/chat",
  "/conversion-rate-optimization",
  "/search-engine-optimization",
  "/local-ads",
  "/google-business-profile",
  "/home-improvement-marketing",
  "/industries",
  "/remodeling-marketing",
  "/fractional-marketing-director",
  "/fractional-marketing-director/roofing",
  "/fractional-marketing-director/contractors",
  "/lead-leak-audit",
  "/lead-system",
  "/lead-qualification",
  "/marketing-automation",
  "/use-cases",
  "/use-cases/accounting",
  "/use-cases/home-services",
  "/use-cases/insurance",
  "/use-cases/property-management",
  "/white-label",
  "/wordpress-hosting",
  "/work",
] as const;

function absoluteUrl(origin: string, path: string) {
  return path === "/" ? origin : `${origin}${path}`;
}

/** CMS documents under a URL prefix. An unreachable database yields no entries rather than a broken sitemap. */
async function cmsEntries(
  origin: string,
  collection: Parameters<typeof getSitemapDocs>[0],
  prefix: string,
): Promise<MetadataRoute.Sitemap> {
  try {
    const docs = await getSitemapDocs(collection);
    return docs.map((doc) => ({
      url: absoluteUrl(origin, `${prefix}/${doc.slug}`),
      lastModified: doc.lastModified,
    }));
  } catch {
    return [];
  }
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // Build the sitemap per request; the build has no database to read from.
  await connection();

  const origin = getSiteUrl();
  const staticEntries: MetadataRoute.Sitemap = staticPaths.map((path) => ({
    url: absoluteUrl(origin, path),
  }));
  const cmsEntryGroups = await Promise.all([
    cmsEntries(origin, "posts", "/blog"),
    cmsEntries(origin, "case-studies", "/case-studies"),
    cmsEntries(origin, "authors", "/author"),
  ]);

  return [...staticEntries, ...cmsEntryGroups.flat()];
}
