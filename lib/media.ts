import { getSiteUrl } from "@/lib/site";
import type { Media } from "@/payload-types";

export function isMedia(value: unknown): value is Media {
  return typeof value === "object" && value !== null && "url" in value;
}

export function mediaImageSrc(url: string) {
  if (url.startsWith("/")) return url;

  try {
    const parsed = new URL(url);
    const siteHost = new URL(getSiteUrl()).hostname;
    const sameOrigin =
      parsed.hostname === "localhost" ||
      parsed.hostname === "127.0.0.1" ||
      parsed.hostname === siteHost;

    if (sameOrigin) {
      return `${parsed.pathname}${parsed.search}`;
    }
  } catch {
    return url;
  }

  return url;
}
