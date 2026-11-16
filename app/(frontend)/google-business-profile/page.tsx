import type { Metadata } from "next";
import { ContactSection } from "@/components/contact";
import { GbpSections, faqs as gbpFaqs } from "@/components/google-business-profile";
import { PageShell } from "@/components/page-shell";
import { JsonLd } from "@/components/json-ld";
import { faqPageJsonLd, providerJsonLd } from "@/lib/json-ld";

const gbpJsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Service",
      name: "Google Business Profile Optimization",
      provider: providerJsonLd(),
      serviceType: "Google Business Profile optimization",
      description:
        "Google Business Profile optimization for home services: categories, services, service area, photos, reviews process, the page the listing opens, and call tracking for the map listing, delivered as part of the fractional marketing director engagement.",
      audience: {
        "@type": "BusinessAudience",
        audienceType: "Home services companies",
      },
      areaServed: { "@type": "Country", name: "United States" },
    },
    faqPageJsonLd(gbpFaqs),
  ],
};

export const metadata: Metadata = {
  alternates: { canonical: "/google-business-profile" },
  title: "Google Business Profile Optimization for Home Services | Grand River Labs",
  description:
    "Google Business Profile optimization for home services: categories, service area, reviews, and the page the listing opens, with map calls tracked. No review schemes.",
};

export default function GoogleBusinessProfilePage() {
  return (
    <PageShell>
      <JsonLd data={gbpJsonLd} />
      <GbpSections />
      <ContactSection
        variant="cta"
        eyebrow="Ready when you are"
        heading="Let's see what the map result says."
        copy="Tell us how homeowners find you nearby. On a free 30-minute call we'll look at the profile Google shows and which fixes are worth making first."
        directLabel="Book a 30-minute call"
        messageLabel="How do people find you nearby?"
        messagePlaceholder="A profile with the wrong category, hours that are off, photos that don't match the work. Start wherever you are."
      />
    </PageShell>
  );
}
