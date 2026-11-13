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
      name: "Lead Monitoring System",
      provider: {
        "@type": "ProfessionalService",
        name: "Grand River Labs",
        url: getSiteUrl(),
        email: "hello@grandriverlabs.io",
      },
      serviceType: "Lead attribution and marketing reporting",
      description:
        "A custom lead monitoring and reporting system for home services companies, built into their existing CRM, ad accounts and analytics and powered by a proprietary attribution model. No software to switch. It reports real lead counts, cost per lead, cost per booked job, and vendor performance verified against the CRM. Setup, conversion sync, and daily tracking checks are included.",
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
  title:
    "Lead Monitoring System: Lead Attribution & Marketing Reporting Dashboard | Grand River Labs",
  description:
    "A custom system built into your existing CRM, ad accounts and analytics. Real lead counts, cost per lead, cost per booked job, and every vendor measured the same way. We handle the complex setup.",
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
          eyebrow="Book a demo"
          heading="See it with your own numbers."
          copy={`On a free 30-minute demo we'll walk through the dashboard and what it would show for your sources and vendors. Not sure where it's leaking yet? Start with the ${formatUsd(AUDIT_FEE)} lead leak audit.`}
          directLabel="Book a demo"
          messageLabel="What do you want to know?"
          messagePlaceholder="What a lead really costs from Google Ads, whether the SEO agency is earning its retainer, why the agency's lead count doesn't match the CRM. Start wherever you are."
        />
      </main>
      <SiteFooter />
    </div>
  );
}
