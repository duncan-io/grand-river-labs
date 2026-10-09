export const fractionalDepartmentNav = {
  label: "Fractional Digital Department",
  href: "/fractional-digital-department",
  description:
    "Your digital department: strategy, web, SEO, ads, and analytics for one flat monthly rate.",
} as const;

export const fractionalDepartmentServices = [
  { label: "Website Partner", href: "/website-strategy" },
  { label: "CRO", href: "/conversion-rate-optimization" },
  { label: "SEO", href: "/search-engine-optimization" },
  { label: "Local ads", href: "/local-ads" },
  { label: "Business profile", href: "/google-business-profile" },
  { label: "Analytics", href: "/analytics" },
  { label: "Automation and AI", href: "/automation" },
] as const;

export const whatWeDoNav = [fractionalDepartmentNav, ...fractionalDepartmentServices] as const;
