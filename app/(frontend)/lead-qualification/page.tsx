import type { Metadata } from "next";
import { ContactSection } from "@/components/contact";
import {
  LeadQualificationSections,
  faqs as leadQualificationFaqs,
} from "@/components/lead-qualification";
import { getSiteUrl } from "@/lib/site";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";

const leadQualificationJsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Service",
      name: "Lead Qualification System",
      provider: {
        "@type": "ProfessionalService",
        name: "Grand River Labs",
        url: getSiteUrl(),
        email: "hello@grandriverlabs.io",
      },
      serviceType: "Lead response, qualification and routing",
      description:
        "A custom lead qualification system built into a company's existing phone line, forms and CRM. Every new lead from forms, texts and calls gets a fast response, is verified and scored on fit, intent and urgency, and is routed: hot leads are booked onto the estimator's calendar, warm leads get timed follow-up, and score, tier and booked status are written back to the CRM.",
      audience: {
        "@type": "BusinessAudience",
        audienceType: "Home services companies",
      },
      areaServed: { "@type": "Country", name: "United States" },
    },
    {
      "@type": "FAQPage",
      mainEntity: leadQualificationFaqs.map((item) => ({
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
  alternates: { canonical: "/lead-qualification" },
  title:
    "Lead Qualification System: Fast Lead Response, Scoring & Routing | Grand River Labs",
  description:
    "A custom system built into your existing phone line, forms and CRM. Every new lead gets a text back within a minute, is scored on fit, intent and urgency, and hot leads are booked onto the estimator's calendar.",
};

export default function LeadQualificationPage() {
  const turnstileSiteKey = process.env.TURNSTILE_SITE_KEY?.trim() ?? "";

  return (
    <div id="top">
      <SiteHeader />
      <main>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(leadQualificationJsonLd).replace(
              /</g,
              "\\u003c",
            ),
          }}
        />
        <LeadQualificationSections />
        <ContactSection
          turnstileSiteKey={turnstileSiteKey}
          variant="cta"
          eyebrow="Book a demo"
          heading="See how your leads would sort."
          copy="On a free 30-minute demo, we'll walk through how it would answer, score and route the leads you're getting today."
          directLabel="Book a demo"
          messageLabel="What do you want to know?"
          messagePlaceholder="Where your leads come in, which CRM you use, how quickly your team gets back to them today. Start wherever you are."
        />
      </main>
      <SiteFooter />
    </div>
  );
}
