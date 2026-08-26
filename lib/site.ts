export const BOOK_CALL_HREF =
  "https://calendly.com/duncan-grandriverlabs/30min";

const DEFAULT_SITE_URL = "https://grandriverlabs.com";

export function getSiteUrl() {
  const value = process.env.SITE_URL?.trim() || DEFAULT_SITE_URL;
  return value.replace(/\/+$/, "");
}
