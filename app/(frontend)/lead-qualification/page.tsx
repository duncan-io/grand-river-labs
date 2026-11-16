import type { Metadata } from "next";
import { ContactSection } from "@/components/contact";
import {
  LeadQualificationSections,
  faqs as leadQualificationFaqs,
} from "@/components/lead-qualification";
import { PageShell } from "@/components/page-shell";
import { JsonLd } from "@/components/json-ld";
import { faqPageJsonLd, providerJsonLd } from "@/lib/json-ld";

const leadQualificationJsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Service",
      name: "Lead Qualification System",
      provider: providerJsonLd(),
      serviceType: "Lead response, qualification and routing",
      description:
        "A custom lead qualification system built into a company's existing phone line, forms and CRM. Every new lead from forms, texts and calls gets a fast response, is verified and scored on fit, intent and urgency, and is routed: hot leads are booked onto the estimator's calendar, warm leads get timed follow-up, and score, tier and booked status are written back to the CRM.",
      audience: {
        "@type": "BusinessAudience",
        audienceType: "Home services companies",
      },
      areaServed: { "@type": "Country", name: "United States" },
    },
    faqPageJsonLd(leadQualificationFaqs),
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
  return (
    <PageShell>
      <JsonLd data={leadQualificationJsonLd} />
      <LeadQualificationSections />
      <ContactSection
        variant="cta"
        eyebrow="Book a demo"
        heading="See how your leads would sort."
        copy="On a free 30-minute demo, we'll walk through how it would answer, score and route the leads you're getting today."
        directLabel="Book a demo"
        messageLabel="What do you want to know?"
        messagePlaceholder="Where your leads come in, which CRM you use, how quickly your team gets back to them today. Start wherever you are."
      />
    </PageShell>
  );
}
