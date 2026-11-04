import type { Metadata } from "next";
import { ContactSection } from "@/components/contact";
import {
  LeadLeakAuditSections,
  faqs as auditFaqs,
} from "@/components/lead-leak-audit";
import { AUDIT_FEE, formatUsd } from "@/lib/pricing";
import { getSiteUrl } from "@/lib/site";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";

const auditJsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Service",
      name: "Lead Leak Audit",
      provider: {
        "@type": "ProfessionalService",
        name: "Grand River Labs",
        url: getSiteUrl(),
        email: "hello@grandriverlabs.io",
      },
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
    {
      "@type": "FAQPage",
      mainEntity: auditFaqs.map((item) => ({
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
  alternates: { canonical: "/lead-leak-audit" },
  title: "Lead Leak Audit | Grand River Labs",
  description: `Missed calls, broken forms, slow follow-up, vendor reports that don't match the CRM. A two-week, ${formatUsd(AUDIT_FEE)} audit that finds where leads leak after the click—ranked by what each leak costs.`,
};

export default function LeadLeakAuditPage() {
  const turnstileSiteKey = process.env.TURNSTILE_SITE_KEY?.trim() ?? "";

  return (
    <div id="top">
      <SiteHeader />
      <main>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(auditJsonLd).replace(/</g, "\\u003c"),
          }}
        />
        <LeadLeakAuditSections />
        <ContactSection
          turnstileSiteKey={turnstileSiteKey}
          variant="cta"
          eyebrow="Start with the leaks"
          heading="Let's find what your marketing is losing."
          copy={`Tell us what you're spending and where leads are supposed to go. On a free 30-minute call we'll tell you whether a ${formatUsd(AUDIT_FEE)} audit is worth it for you.`}
          directLabel="Book a 30-minute scoping call"
          messageLabel="Where do you think leads are leaking?"
          messagePlaceholder="Calls that don't get answered, a form you're not sure works, an agency report you don't quite believe—start wherever you are."
        />
      </main>
      <SiteFooter />
    </div>
  );
}
