import type { Metadata } from "next";
import { ContactSection } from "@/components/contact";
import {
  LeadLeakAuditSections,
  faqs as auditFaqs,
} from "@/components/lead-leak-audit";
import { AUDIT_FEE, formatUsd } from "@/lib/pricing";
import { PageShell } from "@/components/page-shell";
import { JsonLd } from "@/components/json-ld";
import { faqPageJsonLd, providerJsonLd } from "@/lib/json-ld";

const auditJsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Service",
      name: "Lead Leak Audit",
      provider: providerJsonLd(),
      serviceType: "Lead leak audit",
      description:
        "A two-week audit of calls, forms, follow-up, tracking, and vendor reports that finds where leads leak after the click, ranked by what each leak costs.",
      audience: {
        "@type": "BusinessAudience",
        audienceType: "Home services companies",
      },
      areaServed: { "@type": "Country", name: "United States" },
      offers: {
        "@type": "Offer",
        price: AUDIT_FEE,
        priceCurrency: "USD",
        description: `${formatUsd(AUDIT_FEE)} flat fee`,
      },
    },
    faqPageJsonLd(auditFaqs),
  ],
};

export const metadata: Metadata = {
  alternates: { canonical: "/lead-leak-audit" },
  title: "Lead Leak Audit | Grand River Labs",
  description: `Missed calls, broken forms, slow follow-up, vendor reports that don't match the CRM. A two-week, ${formatUsd(AUDIT_FEE)} audit that finds where leads leak after the click—ranked by what each leak costs.`,
};

export default function LeadLeakAuditPage() {
  return (
    <PageShell>
      <JsonLd data={auditJsonLd} />
      <LeadLeakAuditSections />
      <ContactSection
        variant="cta"
        eyebrow="Start with the leaks"
        heading="Let's find what your marketing is losing."
        copy={`Tell us what you're spending and where leads are supposed to go. On a free 30-minute call we'll tell you whether a ${formatUsd(AUDIT_FEE)} audit is worth it for you.`}
        directLabel="Book a 30-minute scoping call"
        messageLabel="Where do you think leads are leaking?"
        messagePlaceholder="Calls that don't get answered, a form you're not sure works, an agency report you don't quite believe—start wherever you are."
      />
    </PageShell>
  );
}
