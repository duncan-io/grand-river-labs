export const BOOK_CALL_HREF =
  "https://calendly.com/duncan-grandriverlabs/30min";

const DEFAULT_SITE_URL = "https://grandriverlabs.com";

export function getSiteUrl() {
  const value = process.env.SITE_URL?.trim() || DEFAULT_SITE_URL;
  return value.replace(/\/+$/, "");
}

export function originFromHost(value: string | undefined) {
  if (!value) return undefined;

  const trimmed = value.trim().replace(/\/+$/, "");
  if (!trimmed) return undefined;

  try {
    if (trimmed.startsWith("http://") || trimmed.startsWith("https://")) {
      return new URL(trimmed).origin;
    }

    return new URL(`https://${trimmed}`).origin;
  } catch {
    return undefined;
  }
}

export function withHostVariants(origin: string | undefined) {
  if (!origin) return [];

  try {
    const url = new URL(origin);
    const hosts = new Set([url.hostname]);

    if (url.hostname.startsWith("www.")) {
      hosts.add(url.hostname.slice(4));
    } else if (url.hostname.includes(".")) {
      hosts.add(`www.${url.hostname}`);
    }

    return [...hosts].map((hostname) => `${url.protocol}//${hostname}`);
  } catch {
    return [origin];
  }
}

export function uniqueOrigins(origins: Array<string | undefined>) {
  return [...new Set(origins.filter((origin): origin is string => Boolean(origin)))];
}

export function getPayloadTrustedOrigins(serverURL: string) {
  const extraOrigins =
    process.env.PAYLOAD_CSRF_ORIGINS?.split(",").map((value) => originFromHost(value)) ??
    [];

  return uniqueOrigins([
    "http://localhost:3000",
    ...withHostVariants(getSiteUrl()),
    ...withHostVariants(originFromHost(serverURL)),
    ...withHostVariants(originFromHost(process.env.RAILWAY_PUBLIC_DOMAIN)),
    ...withHostVariants(originFromHost(process.env.RAILWAY_STATIC_URL)),
    ...withHostVariants(originFromHost(process.env.RAILWAY_SERVICE_GRAND_RIVER_LABS_URL)),
    ...extraOrigins.flatMap((origin) => withHostVariants(origin)),
    // Live admin is served on .io; brand/email still uses .com.
    "https://grandriverlabs.io",
    "https://www.grandriverlabs.io",
    "https://grandriverlabs.com",
    "https://www.grandriverlabs.com",
  ]);
}
