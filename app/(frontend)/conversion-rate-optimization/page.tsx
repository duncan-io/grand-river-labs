import type { Metadata } from "next";
import { ContactSection } from "@/components/contact";
import { CroSections, faqs as croFaqs } from "@/components/cro";
import { PageShell } from "@/components/page-shell";
import { JsonLd } from "@/components/json-ld";
import { faqPageJsonLd, providerJsonLd } from "@/lib/json-ld";

const croJsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Service",
      name: "Conversion Rate Optimization",
      provider: providerJsonLd(),
      serviceType: "Conversion rate optimization",
      description:
        "Conversion rate optimization for home services websites: tap-to-call, quote forms, landing pages, and tests sized to the traffic, delivered as part of the fractional marketing director engagement.",
      audience: {
        "@type": "BusinessAudience",
        audienceType: "Home services companies",
      },
      areaServed: { "@type": "Country", name: "United States" },
    },
    faqPageJsonLd(croFaqs),
  ],
};

export const metadata: Metadata = {
  alternates: { canonical: "/conversion-rate-optimization" },
  title: "Conversion Rate Optimization for Home Services | Grand River Labs",
  description:
    "More calls and quote requests from the traffic you already pay for. Conversion rate optimization for home services: tap-to-call, quote forms, landing pages.",
};

export default function ConversionRateOptimizationPage() {
  return (
    <PageShell>
      <JsonLd data={croJsonLd} />
      <CroSections />
      <ContactSection
        variant="cta"
        eyebrow="Ready when you are"
        heading="Let's find where the calls go missing."
        copy="Tell us what the site is supposed to bring in. On a free 30-minute call we'll look at where visitors drop off and which changes are worth making first."
        directLabel="Book a 30-minute call"
        messageLabel="What should the site be bringing in?"
        messagePlaceholder="Traffic that never calls, a quote form people abandon, an ad page that doesn't match the click. Start wherever you are."
      />
    </PageShell>
  );
}
