import type { Metadata } from "next";
import { ContactSection } from "@/components/contact";
import {
  LeadSystemSections,
  faqs as leadSystemFaqs,
} from "@/components/lead-system";
import { AUDIT_FEE, formatUsd } from "@/lib/pricing";
import { getSiteUrl } from "@/lib/site";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";

const leadSystemJsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Service",
      name: "Lead System",
      provider: {
        "@type": "ProfessionalService",
        name: "Grand River Labs",
        url: getSiteUrl(),
        email: "hello@grandriverlabs.io",
      },
      serviceType: "Lead tracking and monitoring",
      description:
        "Call tracking, form source capture, GA4, and conversion sync for home services companies, with daily checks on forms, call tracking, the Google Business Profile, the website, and ad accounts, and a client portal that reports booked jobs verified against the CRM.",
      audience: {
        "@type": "BusinessAudience",
        audienceType: "Home services companies",
      },
      areaServed: { "@type": "Country", name: "United States" },
    },
    {
      "@type": "FAQPage",
      mainEntity: leadSystemFaqs.map((item) => ({
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
  alternates: { canonical: "/lead-system" },
  title: "Lead System: Call Tracking & Lead Monitoring | Grand River Labs",
  description:
    "Call tracking, form source capture, GA4, and daily monitoring for home services. Every lead followed from click to booked job, checked against your CRM, and flagged when a handoff breaks.",
};

export default function LeadSystemPage() {
  const turnstileSiteKey = process.env.TURNSTILE_SITE_KEY?.trim() ?? "";

  return (
    <div id="top">
      <SiteHeader />
      <main>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(leadSystemJsonLd).replace(/</g, "\\u003c"),
          }}
        />
        <LeadSystemSections />
        <ContactSection
          turnstileSiteKey={turnstileSiteKey}
          variant="cta"
          eyebrow="Book a call"
          heading="Find out what happens to your leads after the click."
          copy={`On a free 30-minute call we'll look at how leads reach you today and what the Lead System would watch. Not sure where it's leaking yet? Start with the ${formatUsd(AUDIT_FEE)} lead leak audit.`}
          directLabel="Book a 30-minute call"
          messageLabel="What do you want to be sure of?"
          messagePlaceholder="Whether the forms work, which calls come from the map listing, whether the agency's lead count matches the CRM. Start wherever you are."
        />
      </main>
      <SiteFooter />
    </div>
  );
}
