import type { Metadata } from "next";
import { ContactSection } from "@/components/contact";
import { EngagementBlock } from "@/components/engagement-block";
import { Hero } from "@/components/hero";
import {
  FeaturedCaseStudy,
  LeadershipSection,
  ProcessSection,
  ResultsBar,
  ServicesSection,
  TestimonialsSection,
  UseCaseStrip,
} from "@/components/sections";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { getSiteUrl } from "@/lib/site";

const description =
  "Senior digital marketing leadership that makes the strategy, budget, and channel decisions — with hands-on execution included, and without the full-time hire.";

export const metadata: Metadata = {
  title: "Fractional Digital Marketing Team | Grand River Labs",
  description,
};

const professionalServiceJsonLd = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: "Grand River Labs",
  url: getSiteUrl(),
  description,
  email: "hello@grandriverlabs.com",
};

export default function Home() {
  const turnstileSiteKey = process.env.TURNSTILE_SITE_KEY?.trim() ?? "";

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(professionalServiceJsonLd),
        }}
      />
      <SiteHeader />
      <main>
        <Hero />
        <FeaturedCaseStudy />
        <ResultsBar />
        <LeadershipSection />
        <EngagementBlock />
        <ProcessSection />
        <ServicesSection />
        <TestimonialsSection />
        <UseCaseStrip />
        <ContactSection
          turnstileSiteKey={turnstileSiteKey}
          variant="cta"
          atmosphere
          copy="Tell us the marketing decision that's been stuck—where the budget goes, which channel earns a place, what the site is for, or which numbers to trust. We'll help you see what deserves a call now, and we'll get back within two business days."
        />
      </main>
      <SiteFooter />
    </>
  );
}
