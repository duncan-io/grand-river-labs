import type { Author } from "@/payload-types";

export function isAuthor(value: unknown): value is Author {
  return (
    typeof value === "object" &&
    value !== null &&
    "name" in value &&
    "slug" in value
  );
}

export function truncateBio(bio: string, max = 180) {
  if (bio.length <= max) return bio;
  return `${bio.slice(0, max).replace(/\s+\S*$/, "")}…`;
}
