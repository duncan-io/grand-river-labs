import { unstable_cache } from "next/cache";
import { connection } from "next/server";
import { cache } from "react";
import { CMS_CACHE_TAG } from "@/lib/cms-cache";
import { getPayloadClient } from "@/lib/get-payload";

/** Safety net in case a change bypasses the collection hooks (e.g. a direct DB edit). */
const MAX_AGE_SECONDS = 60 * 60;

const PUBLISHED = { _status: { equals: "published" } } as const;

/**
 * Wraps a Payload query so that:
 * - it only runs at request time (the build has no database access),
 * - its result is kept in the Next.js data cache until content changes
 *   (see `expireCmsCache`), and
 * - repeat calls within one request (page + generateMetadata) share one result.
 */
function cachedQuery<Args extends unknown[], Result>(
  name: string,
  query: (...args: Args) => Promise<Result>,
) {
  const fromDataCache = unstable_cache(query, ["cms", name], {
    tags: [CMS_CACHE_TAG],
    revalidate: MAX_AGE_SECONDS,
  });

  return cache(async (...args: Args): Promise<Result> => {
    await connection();
    return fromDataCache(...args);
  });
}

export const getPublishedPosts = cachedQuery("published-posts", async () => {
  const payload = await getPayloadClient();
  const { docs } = await payload.find({
    collection: "posts",
    depth: 1,
    limit: 24,
    sort: "-publishedAt",
    where: PUBLISHED,
  });
  return docs;
});

export const getPublishedPost = cachedQuery(
  "published-post",
  async (slug: string) => {
    const payload = await getPayloadClient();
    const { docs } = await payload.find({
      collection: "posts",
      depth: 2,
      limit: 1,
      where: { and: [{ slug: { equals: slug } }, PUBLISHED] },
    });
    return docs[0] ?? null;
  },
);

export const getPublishedPostsByAuthor = cachedQuery(
  "published-posts-by-author",
  async (authorId: number) => {
    const payload = await getPayloadClient();
    const { docs } = await payload.find({
      collection: "posts",
      depth: 1,
      limit: 24,
      sort: "-publishedAt",
      where: { and: [{ author: { equals: authorId } }, PUBLISHED] },
    });
    return docs;
  },
);

export const getAuthor = cachedQuery("author", async (slug: string) => {
  const payload = await getPayloadClient();
  const { docs } = await payload.find({
    collection: "authors",
    depth: 1,
    limit: 1,
    where: { slug: { equals: slug } },
  });
  return docs[0] ?? null;
});

export const getPublishedCaseStudies = cachedQuery(
  "published-case-studies",
  async () => {
    const payload = await getPayloadClient();
    const { docs } = await payload.find({
      collection: "case-studies",
      depth: 1,
      limit: 24,
      sort: "-publishedAt",
      where: PUBLISHED,
    });
    return docs;
  },
);

export const getPublishedCaseStudy = cachedQuery(
  "published-case-study",
  async (slug: string) => {
    const payload = await getPayloadClient();
    const { docs } = await payload.find({
      collection: "case-studies",
      depth: 1,
      limit: 1,
      where: { and: [{ slug: { equals: slug } }, PUBLISHED] },
    });
    return docs[0] ?? null;
  },
);

export type SitemapDoc = {
  slug: string;
  lastModified: string | undefined;
};

/** Slug and last-modified date of every public document in a collection, for the sitemap. */
export const getSitemapDocs = cachedQuery(
  "sitemap-docs",
  async (
    collection: "posts" | "case-studies" | "authors",
  ): Promise<SitemapDoc[]> => {
    const payload = await getPayloadClient();
    const { docs } = await payload.find({
      collection,
      depth: 0,
      limit: 1000,
      pagination: false,
      select: { slug: true, updatedAt: true },
      // Authors have no draft state; every author page is public.
      where: collection === "authors" ? {} : PUBLISHED,
    });

    return docs.flatMap((doc) =>
      doc.slug
        ? [{ slug: doc.slug, lastModified: doc.updatedAt || undefined }]
        : [],
    );
  },
);
