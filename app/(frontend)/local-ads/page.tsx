import type { Metadata } from "next";
import { ContactSection } from "@/components/contact";
import { LocalAdsSections, faqs as localAdsFaqs } from "@/components/local-ads";
import { PageShell } from "@/components/page-shell";
import { JsonLd } from "@/components/json-ld";
import { faqPageJsonLd, providerJsonLd } from "@/lib/json-ld";

const localAdsJsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Service",
      name: "Local Services Ads Strategy & Oversight",
      provider: providerJsonLd(),
      serviceType: "Local Services Ads and paid advertising oversight",
      description:
        "Strategy and oversight for Google Local Services Ads, Google Ads, and Meta: which channel fits, what to fund or pause, which leads to dispute, and verification that reported leads reached the CRM.",
      audience: {
        "@type": "BusinessAudience",
        audienceType: "Home services companies",
      },
      areaServed: { "@type": "Country", name: "United States" },
    },
    faqPageJsonLd(localAdsFaqs),
  ],
};

export const metadata: Metadata = {
  alternates: { canonical: "/local-ads" },
  title: "Local Services Ads (LSA) Strategy & Oversight | Grand River Labs",
  description:
    "Strategy and oversight for Google Local Services Ads, Google Ads, and Meta: what to fund, which leads to dispute, and proof the leads Google reports reached your CRM.",
};

export default function LocalAdsPage() {
  return (
    <PageShell>
      <JsonLd data={localAdsJsonLd} />
      <LocalAdsSections />
      <ContactSection
        variant="cta"
        eyebrow="Ready when you are"
        heading="Let's look at what the spend is buying."
        copy="Tell us what you're spending on LSA and other ads, and what it's produced. We'll check the platforms' numbers against your CRM and say what's worth keeping, disputing, or cutting."
        messageLabel="How do leads find you today?"
        messagePlaceholder="An LSA account nobody questions, spend that doesn't turn into calls, leads that don't match the work—start wherever you are."
      />
    </PageShell>
  );
}
