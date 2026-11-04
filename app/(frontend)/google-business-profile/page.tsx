import type { Metadata } from "next";
import { ContactSection } from "@/components/contact";
import { GbpSections, faqs as gbpFaqs } from "@/components/google-business-profile";
import { getSiteUrl } from "@/lib/site";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";

const gbpJsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Service",
      name: "Google Business Profile Optimization",
      provider: {
        "@type": "ProfessionalService",
        name: "Grand River Labs",
        url: getSiteUrl(),
        email: "hello@grandriverlabs.io",
      },
      serviceType: "Google Business Profile optimization",
      description:
        "Google Business Profile optimization for home services: categories, services, service area, photos, reviews process, the page the listing opens, and call tracking for the map listing, delivered as part of the fractional marketing director engagement.",
      audience: {
        "@type": "BusinessAudience",
        audienceType: "Home services companies",
      },
      areaServed: { "@type": "Country", name: "United States" },
    },
    {
      "@type": "FAQPage",
      mainEntity: gbpFaqs.map((item) => ({
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
  alternates: { canonical: "/google-business-profile" },
  title: "Google Business Profile Optimization for Home Services | Grand River Labs",
  description:
    "Google Business Profile optimization for home services: categories, service area, reviews, and the page the listing opens, with map calls tracked. No review schemes.",
};

export default function GoogleBusinessProfilePage() {
  const turnstileSiteKey = process.env.TURNSTILE_SITE_KEY?.trim() ?? "";

  return (
    <div id="top">
      <SiteHeader />
      <main>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(gbpJsonLd).replace(/</g, "\\u003c"),
          }}
        />
        <GbpSections />
        <ContactSection
          turnstileSiteKey={turnstileSiteKey}
          variant="cta"
          eyebrow="Ready when you are"
          heading="Let's see what the map result says."
          copy="Tell us how homeowners find you nearby. On a free 30-minute call we'll look at the profile Google shows and which fixes are worth making first."
          directLabel="Book a 30-minute call"
          messageLabel="How do people find you nearby?"
          messagePlaceholder="A profile with the wrong category, hours that are off, photos that don't match the work. Start wherever you are."
        />
      </main>
      <SiteFooter />
    </div>
  );
}
