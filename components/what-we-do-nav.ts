export const advisoryNav = {
  label: "Marketing Advisory",
  href: "/marketing-advisory",
  description:
    "Answer “Is your marketing actually making you money?” Patching lead leaks, verifying what works, and managing your vendors for one flat monthly rate.",
} as const;

export const advisoryAreas = [
  { label: "Lead leak audit", href: "/lead-leak-audit" },
  { label: "CRO", href: "/conversion-rate-optimization" },
  { label: "SEO", href: "/search-engine-optimization" },
  { label: "Paid ads & LSA", href: "/local-ads" },
  { label: "Business profile", href: "/google-business-profile" },
  { label: "Analytics", href: "/analytics" },
  { label: "Automation and AI", href: "/automation" },
] as const;

export const whatWeDoNav = [advisoryNav, ...advisoryAreas] as const;

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
      "Marketing advisory for design-build remodelers: is the lead spend producing booked consults?",
  },
  {
    label: "Roofing",
    href: "/marketing-advisory/roofing",
    description:
      "A roofing advisor who patches lead leaks, checks Local Services Ads, and holds the vendors to it.",
  },
  {
    label: "Contractors",
    href: "/marketing-advisory/contractors",
    description:
      "Fix the leaks in contractor lead flow, from routing and Local Services Ads to whether the spend is working.",
  },
] as const;
