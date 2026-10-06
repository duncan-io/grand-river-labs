import type { Metadata } from "next";
import { ContactSection } from "@/components/contact";
import { Hero } from "@/components/hero";
import {
  ExecutionSection,
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
  "A fractional digital marketing team that ships results: SEO, analytics, ads, and website management that drive more qualified leads and revenue — without the full-time hire.";

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
        <ResultsBar />
        <ServicesSection />
        <ProcessSection />
        <ExecutionSection />
        <TestimonialsSection />
        <UseCaseStrip />
        <ContactSection
          turnstileSiteKey={turnstileSiteKey}
          variant="cta"
          atmosphere
          copy="Tell us the goal that isn't getting a clear plan—channel mix, the site's job, measurement, or work that still eats the team. We'll help you see what deserves attention now, and we'll get back within two business days."
        />
      </main>
      <SiteFooter />
    </>
  );
}
