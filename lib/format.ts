const longDate = new Intl.DateTimeFormat("en-US", {
  month: "long",
  day: "numeric",
  year: "numeric",
});

/** "March 4, 2026", or null when there is no date to show. */
export function formatDate(value: string | null | undefined) {
  if (!value) return null;
  return longDate.format(new Date(value));
}
