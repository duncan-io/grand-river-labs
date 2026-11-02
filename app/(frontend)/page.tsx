import type { Metadata } from "next";
import { ContactSection } from "@/components/contact";
import { EngagementBlock } from "@/components/engagement-block";
import { FixValueSection } from "@/components/fix-value";
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
  "Is your marketing actually making you money? Marketing advisory that patches lead leaks, verifies which spend is working, and manages your vendors — without another agency retainer.";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
  title: "Marketing Advisory & Lead Leak Fixes | Grand River Labs",
  description,
};

const professionalServiceJsonLd = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: "Grand River Labs",
  url: getSiteUrl(),
  description,
  email: "hello@grandriverlabs.io",
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
        <FixValueSection />
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
