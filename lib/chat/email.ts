const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
export const EMAIL_MAX_LENGTH = 254;

/**
 * Normalize and validate an email address.
 */
export function normalizeEmail(raw: unknown): string | null {
  if (typeof raw !== "string") {
    return null;
  }

  const trimmed = raw.trim().toLowerCase();
  if (!trimmed || trimmed.length > EMAIL_MAX_LENGTH) {
    return null;
  }

  if (!EMAIL_PATTERN.test(trimmed)) {
    return null;
  }

  return trimmed;
}
