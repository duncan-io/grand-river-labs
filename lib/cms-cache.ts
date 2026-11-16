import { revalidateTag } from "next/cache";

/**
 * Every cached CMS query carries this one tag, so any content change clears
 * all of them. Posts embed authors, categories and media, which makes
 * per-collection tags easy to get wrong for very little gain at this volume.
 */
export const CMS_CACHE_TAG = "cms";

/** Collection hook: drop cached CMS queries after a document is saved or deleted. */
export function expireCmsCache() {
  try {
    // `expire: 0` clears the cache immediately, so an editor sees their change
    // on the next page load rather than one load later.
    revalidateTag(CMS_CACHE_TAG, { expire: 0 });
  } catch {
    // Outside a Next.js request (Payload CLI, migrations) there is no cache to clear.
  }
}
