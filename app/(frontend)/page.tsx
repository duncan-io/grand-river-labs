import type { Metadata } from "next";
import { ContactSection } from "@/components/contact";
import { Hero } from "@/components/hero";
import {
  HowIWorkSection,
  ProofSection,
  UseCaseStrip,
  WaysToWorkSection,
} from "@/components/sections";
import { PageShell } from "@/components/page-shell";
import { DIRECTOR_MONTHLY, formatUsd } from "@/lib/pricing";
import { getSiteUrl } from "@/lib/site";
import { JsonLd } from "@/components/json-ld";

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
  return (
    <PageShell>
      <JsonLd data={homeJsonLd} />
      <Hero />
      <ProofSection />
      <HowIWorkSection />
      <WaysToWorkSection />
      <UseCaseStrip />
      <ContactSection
        variant="cta"
        atmosphere
        heading="Tell me where your leads come from."
        copy="Tell me what you spend, which channels you run, and which jobs you want more of. I'll tell you where I'd look first and reply within one business day."
        messageLabel="What should I look at first?"
        messagePlaceholder="Your budget, your channels, the jobs you want more of. Start wherever you are."
      />
    </PageShell>
  );
}
