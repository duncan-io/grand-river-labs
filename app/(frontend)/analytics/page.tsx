import type { Metadata } from "next";
import { AnalyticsSections, faqs as analyticsFaqs } from "@/components/analytics";
import { ContactSection } from "@/components/contact";
import { getSiteUrl } from "@/lib/site";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";

const analyticsJsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Service",
      name: "Call Tracking & Marketing Analytics",
      provider: {
        "@type": "ProfessionalService",
        name: "Grand River Labs",
        url: getSiteUrl(),
        email: "hello@grandriverlabs.io",
      },
      serviceType: "Call tracking and marketing analytics",
      description:
        "Call tracking, GA4, Google Tag Manager, event tracking, and attribution for home services companies, with vendor reports checked against the CRM and booked jobs, delivered as part of the fractional marketing director engagement.",
      audience: {
        "@type": "BusinessAudience",
        audienceType: "Home services companies",
      },
      areaServed: { "@type": "Country", name: "United States" },
    },
    {
      "@type": "FAQPage",
      mainEntity: analyticsFaqs.map((item) => ({
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
  alternates: { canonical: "/analytics" },
  title: "Call Tracking & Analytics for Home Services | Grand River Labs",
  description:
    "Call tracking, GA4, Tag Manager, and attribution for home services. Every call tied to its source, and every vendor report checked against your CRM.",
};

export default function AnalyticsPage() {
  const turnstileSiteKey = process.env.TURNSTILE_SITE_KEY?.trim() ?? "";

  return (
    <div id="top">
      <SiteHeader />
      <main>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(analyticsJsonLd).replace(/</g, "\\u003c"),
          }}
        />
        <AnalyticsSections />
        <ContactSection
          turnstileSiteKey={turnstileSiteKey}
          variant="cta"
          eyebrow="Ready when you are"
          heading="Let's find out which sources actually book jobs."
          copy="Tell us where your leads come from and what you're not sure is working. On a free 30-minute call we'll look at what's tracked today and which numbers you can trust."
          directLabel="Book a 30-minute call"
          messageLabel="What do you need to see?"
          messagePlaceholder="Calls nobody can trace, vendor reports that don't add up, a GA4 account nobody opens. Start wherever you are."
        />
      </main>
      <SiteFooter />
    </div>
  );
}
