import { DIRECTOR_MONTHLY, HOSTING_MONTHLY_FROM, formatUsd } from "@/lib/pricing";

export const directorNav = {
  label: "Fractional Marketing Director",
  href: "/fractional-marketing-director",
  description:
    "Your marketing director, part-time: one senior person who owns the plan, verifies what's working, and manages your vendors for one monthly rate.",
  price: `From ${formatUsd(DIRECTOR_MONTHLY)}/mo`,
} as const;

export const directorAreas = [
  { label: "Lead leak audit", href: "/lead-leak-audit" },
  { label: "CRO", href: "/conversion-rate-optimization" },
  { label: "SEO", href: "/search-engine-optimization" },
  { label: "Paid ads & LSA", href: "/local-ads" },
  { label: "Business profile", href: "/google-business-profile" },
  { label: "Automation and AI", href: "/automation" },
] as const;

export const leadSystemNav = {
  label: "Lead Monitoring System",
  href: "/lead-system",
  description:
    "A custom system we build into your existing CRM, ad accounts and analytics, showing real lead counts, cost per lead and per booked job, and how every vendor performs.",
  summary: "Custom-built: cost per lead and booked job, by vendor.",
} as const;

export const leadQualificationNav = {
  label: "Lead Qualification System",
  href: "/lead-qualification",
  description:
    "A custom system built into your existing phone line, forms and CRM that answers every new lead fast, scores it, and books the best ones on the estimator's calendar.",
  summary: "Custom scoring and routing, built into your CRM.",
} as const;

export const wordpressHostingNav = {
  label: "WordPress hosting",
  href: "/wordpress-hosting",
  summary: "Managed hosting, daily backups, optional care plans.",
  price: `From ${formatUsd(HOSTING_MONTHLY_FROM)}/mo`,
} as const;

/** Products sold on their own, without the fractional marketing director. */
export const standaloneNav = [
  leadSystemNav,
  leadQualificationNav,
  wordpressHostingNav,
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
