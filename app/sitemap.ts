import type { MetadataRoute } from "next";
import { getPayloadClient } from "@/lib/get-payload";
import { getSiteUrl } from "@/lib/site";

export const revalidate = 60;

const staticPaths = [
  "/",
  "/ai-automation",
  "/analytics",
  "/automation",
  "/automation/business-process-automation",
  "/automation-consulting",
  "/blog",
  "/chat",
  "/digital-strategy",
  "/fractional-digital-department",
  "/fractional-digital-team-calculator",
  "/marketing-automation",
  "/testimonials",
  "/use-cases",
  "/use-cases/accounting",
  "/use-cases/home-services",
  "/use-cases/insurance",
  "/use-cases/property-management",
  "/website-strategy",
  "/white-label",
] as const;

function absoluteUrl(origin: string, path: string) {
  return path === "/" ? origin : `${origin}${path}`;
}

async function getPublishedPostEntries(
  origin: string,
): Promise<MetadataRoute.Sitemap> {
  try {
    const payload = await getPayloadClient();
    const { docs: posts } = await payload.find({
      collection: "posts",
      depth: 0,
      limit: 1000,
      pagination: false,
      select: {
        slug: true,
        publishedAt: true,
        updatedAt: true,
      },
      where: {
        _status: {
          equals: "published",
        },
      },
    });

    return posts.flatMap((post) => {
      if (!post.slug) return [];
      return [
        {
          url: absoluteUrl(origin, `/blog/${post.slug}`),
          lastModified: post.updatedAt || post.publishedAt || undefined,
        },
      ];
    });
  } catch {
    return [];
  }
}

async function getAuthorEntries(
  origin: string,
): Promise<MetadataRoute.Sitemap> {
  try {
    const payload = await getPayloadClient();
    const { docs: authors } = await payload.find({
      collection: "authors",
      depth: 0,
      limit: 1000,
      pagination: false,
      select: {
        slug: true,
        updatedAt: true,
      },
    });

    return authors.flatMap((author) => {
      if (!author.slug) return [];
      return [
        {
          url: absoluteUrl(origin, `/author/${author.slug}`),
          lastModified: author.updatedAt || undefined,
        },
      ];
    });
  } catch {
    return [];
  }
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const origin = getSiteUrl();
  const staticEntries: MetadataRoute.Sitemap = staticPaths.map((path) => ({
    url: absoluteUrl(origin, path),
  }));
  const [postEntries, authorEntries] = await Promise.all([
    getPublishedPostEntries(origin),
    getAuthorEntries(origin),
  ]);

  return [...staticEntries, ...postEntries, ...authorEntries];
}
