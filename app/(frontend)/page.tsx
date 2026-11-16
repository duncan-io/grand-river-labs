import type { Metadata } from "next";
import { ContactSection } from "@/components/contact";
import { EngagementBlock } from "@/components/engagement-block";
import { Hero } from "@/components/hero";
import {
  LeadershipSection,
  ProcessSection,
  ProofSection,
  SystemsSection,
  UseCaseStrip,
} from "@/components/sections";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { DIRECTOR_MONTHLY, formatUsd } from "@/lib/pricing";
import { getSiteUrl } from "@/lib/site";

const description =
  "A fractional marketing director for roofers, remodelers and home improvement companies. Know which marketing dollars turn into booked jobs and what to do next. Lead monitoring and lead qualification systems are available on their own.";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
  title: "Grand River Labs | Fractional Marketing Director for Home Service Companies",
  description,
};

const homeJsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebSite",
      name: "Grand River Labs",
      url: getSiteUrl(),
    },
    {
      "@type": "ProfessionalService",
      name: "Grand River Labs",
      url: getSiteUrl(),
      description,
      email: "hello@grandriverlabs.io",
      logo: `${getSiteUrl()}/icon.png`,
      image: `${getSiteUrl()}/icon.png`,
      serviceType: "Fractional marketing director",
      audience: {
        "@type": "BusinessAudience",
        audienceType: "Home service companies: roofing, remodeling and home improvement",
      },
      areaServed: { "@type": "Country", name: "United States" },
      priceRange: `Starting at ${formatUsd(DIRECTOR_MONTHLY)}/month`,
    },
  ],
};

export default function Home() {
  const turnstileSiteKey = process.env.TURNSTILE_SITE_KEY?.trim() ?? "";

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(homeJsonLd),
        }}
      />
      <SiteHeader />
      <main>
        <Hero />
        <EngagementBlock
          eyebrow="What it costs"
          copy="Someone senior who sets your marketing plan, decides where the budget goes, and tells you straight what's booking jobs — for a few hours a week instead of a full-time salary."
          directorLabel="A part-time director"
          ctaLabel="Book a call"
        />
        <ProofSection />
        <LeadershipSection />
        <SystemsSection />
        <ProcessSection />
        <UseCaseStrip />
        <ContactSection
          turnstileSiteKey={turnstileSiteKey}
          variant="cta"
          atmosphere
          copy="Tell me what you're spending and what you're not sure is working—an agency that reports its own numbers, leads that don't get answered, spend you can't tie to booked jobs. I'll tell you where I'd look first, and I'll reply within one business day."
        />
      </main>
      <SiteFooter />
    </>
  );
}
