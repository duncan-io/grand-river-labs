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

export const homeImprovementNav = {
  label: "Home improvement",
  href: "/home-improvement-marketing",
  description:
    "One owner for lead generation and response at established home improvement companies.",
} as const;

export const industriesNav = [
  homeImprovementNav,
  {
    label: "Roofing",
    href: "/fractional-digital-department/roofing",
    description:
      "A roofing lead engine you own: routing, Local Services Ads, paid ads, website, and SEO.",
  },
  {
    label: "Contractors",
    href: "/fractional-digital-department/contractors",
    description:
      "Fix the leaks in contractor lead flow, from routing and Local Services Ads to the site you already have.",
  },
] as const;
