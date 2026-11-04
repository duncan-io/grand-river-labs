import type { Metadata } from "next";
import { ContactSection } from "@/components/contact";
import { EngagementBlock } from "@/components/engagement-block";
import { Hero } from "@/components/hero";
import {
  DirectorIntro,
  FeaturedCaseStudy,
  LeadershipSection,
  ProcessSection,
  ServicesSection,
  TestimonialsSection,
  UseCaseStrip,
} from "@/components/sections";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { DIRECTOR_MONTHLY, formatUsd } from "@/lib/pricing";
import { getSiteUrl } from "@/lib/site";

const description =
  "A fractional marketing director for lead-driven businesses. One senior director, part-time: patching lead leaks, verifying which spend is working, and managing your vendors — without another agency retainer.";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
  title: "Grand River Labs | Fractional Marketing Director for Lead-Driven Businesses",
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
        audienceType: "Lead-driven businesses",
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
        <EngagementBlock />
        <LeadershipSection />
        <DirectorIntro />
        <ProcessSection />
        <FeaturedCaseStudy />
        <ServicesSection />
        <TestimonialsSection />
        <UseCaseStrip />
        <ContactSection
          turnstileSiteKey={turnstileSiteKey}
          variant="cta"
          atmosphere
          copy="Tell us what you're spending and what you're not sure is working—an agency that reports its own numbers, leads that don't get answered, spend you can't tie to jobs. We'll tell you where the leaks probably are, and we'll get back within two business days."
        />
      </main>
      <SiteFooter />
    </>
  );
}
