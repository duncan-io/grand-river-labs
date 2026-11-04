import type { Metadata } from "next";
import { ContactSection } from "@/components/contact";
import { CroSections, faqs as croFaqs } from "@/components/cro";
import { getSiteUrl } from "@/lib/site";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";

const croJsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Service",
      name: "Conversion Rate Optimization",
      provider: {
        "@type": "ProfessionalService",
        name: "Grand River Labs",
        url: getSiteUrl(),
        email: "hello@grandriverlabs.io",
      },
      serviceType: "Conversion rate optimization",
      description:
        "Conversion rate optimization for home services websites: tap-to-call, quote forms, landing pages, and tests sized to the traffic, delivered as part of the fractional marketing director engagement.",
      audience: {
        "@type": "BusinessAudience",
        audienceType: "Home services companies",
      },
      areaServed: { "@type": "Country", name: "United States" },
    },
    {
      "@type": "FAQPage",
      mainEntity: croFaqs.map((item) => ({
        "@type": "Question",
        name: item.question,
        acceptedAnswer: {
          "@type": "Answer",
          text: item.answer.replace(/\[([^\]]+)\]\([^)]+\)/g, "$1"),
        },
      })),
    },
  ],
};

export const metadata: Metadata = {
  alternates: { canonical: "/conversion-rate-optimization" },
  title: "Conversion Rate Optimization for Home Services | Grand River Labs",
  description:
    "More calls and quote requests from the traffic you already pay for. Conversion rate optimization for home services: tap-to-call, quote forms, landing pages.",
};

export default function ConversionRateOptimizationPage() {
  const turnstileSiteKey = process.env.TURNSTILE_SITE_KEY?.trim() ?? "";

  return (
    <div id="top">
      <SiteHeader />
      <main>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(croJsonLd).replace(/</g, "\\u003c"),
          }}
        />
        <CroSections />
        <ContactSection
          turnstileSiteKey={turnstileSiteKey}
          variant="cta"
          eyebrow="Ready when you are"
          heading="Let's find where the calls go missing."
          copy="Tell us what the site is supposed to bring in. On a free 30-minute call we'll look at where visitors drop off and which changes are worth making first."
          directLabel="Book a 30-minute call"
          messageLabel="What should the site be bringing in?"
          messagePlaceholder="Traffic that never calls, a quote form people abandon, an ad page that doesn't match the click. Start wherever you are."
        />
      </main>
      <SiteFooter />
    </div>
  );
}
