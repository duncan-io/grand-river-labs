export const DIRECTOR_MONTHLY = 1_500;
export const AUDIT_FEE = 1_500;

export function formatUsd(value: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(value);
}
