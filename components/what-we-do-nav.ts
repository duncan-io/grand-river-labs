export const directorNav = {
  label: "Fractional Marketing Director",
  href: "/fractional-marketing-director",
  description:
    "Your marketing director, part-time: one senior person who owns the plan, verifies what's working, and manages your vendors for one monthly rate.",
} as const;

export const directorAreas = [
  { label: "Lead leak audit", href: "/lead-leak-audit" },
  { label: "CRO", href: "/conversion-rate-optimization" },
  { label: "SEO", href: "/search-engine-optimization" },
  { label: "Paid ads & LSA", href: "/local-ads" },
  { label: "Business profile", href: "/google-business-profile" },
  { label: "Analytics", href: "/analytics" },
  { label: "Automation and AI", href: "/automation" },
] as const;

export const whatWeDoNav = [directorNav, ...directorAreas] as const;

export const homeImprovementNav = {
  label: "Home improvement",
  href: "/home-improvement-marketing",
  description:
    "Find the leaks, verify the spend, and hold vendors to the plan at established home improvement companies.",
} as const;

export const industriesNav = [
  homeImprovementNav,
  {
    label: "Remodeling",
    href: "/remodeling-marketing",
    description:
      "Fractional marketing direction for design-build remodelers: is the lead spend producing booked consults?",
  },
  {
    label: "Roofing",
    href: "/fractional-marketing-director/roofing",
    description:
      "A marketing director for roofing companies who patches lead leaks, checks Local Services Ads, and holds the vendors to it.",
  },
  {
    label: "Contractors",
    href: "/fractional-marketing-director/contractors",
    description:
      "Fix the leaks in contractor lead flow, from routing and Local Services Ads to whether the spend is working.",
  },
] as const;
