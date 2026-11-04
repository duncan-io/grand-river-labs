import type { Metadata } from "next";
import { ContactSection } from "@/components/contact";
import {
  FractionalDirectorSections,
  faqs as directorFaqs,
} from "@/components/fractional-marketing-director";
import { DIRECTOR_MONTHLY, formatUsd } from "@/lib/pricing";
import { getSiteUrl } from "@/lib/site";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";

const directorJsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Service",
      name: "Fractional Marketing Director",
      provider: {
        "@type": "ProfessionalService",
        name: "Grand River Labs",
        url: getSiteUrl(),
        email: "hello@grandriverlabs.io",
      },
      serviceType: "Fractional marketing director",
      description:
        "A part-time senior marketing director who meets with leadership weekly to plan strategy, decide where the budget goes, and advise on key decisions, while coaching the team and holding every vendor to the plan.",
      audience: {
        "@type": "BusinessAudience",
        audienceType: "Home services companies",
      },
      areaServed: { "@type": "Country", name: "United States" },
      offers: {
        "@type": "Offer",
        price: DIRECTOR_MONTHLY,
        priceCurrency: "USD",
        description: `Starting at ${formatUsd(DIRECTOR_MONTHLY)}/month`,
      },
    },
    {
      "@type": "FAQPage",
      mainEntity: directorFaqs.map((item) => ({
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
  alternates: { canonical: "/fractional-marketing-director" },
  title: "Fractional Marketing Director (Fractional CMO) for Home Services | Grand River Labs",
  description: `Meet weekly with a part-time senior marketing director for home services: strategy, budget, advice on the big calls, and every vendor held to the plan. Starting at ${formatUsd(DIRECTOR_MONTHLY)}/month.`,
};

export default function FractionalMarketingDirectorPage() {
  const turnstileSiteKey = process.env.TURNSTILE_SITE_KEY?.trim() ?? "";

  return (
    <div id="top">
      <SiteHeader />
      <main>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(directorJsonLd).replace(/</g, "\\u003c"),
          }}
        />
        <FractionalDirectorSections />
        <ContactSection
          turnstileSiteKey={turnstileSiteKey}
          variant="cta"
          eyebrow="Start a conversation"
          heading="Get a director's eyes on your marketing."
          copy="Tell us what you spend and what you're not sure is working. In 30 minutes we'll tell you whether a director is the seat you're missing."
          directLabel="Book a 30-minute fit call"
          messageLabel="What's going on with your marketing?"
          messagePlaceholder="No real plan, an agency grading its own numbers, a team that needs direction—start wherever you are."
        />
      </main>
      <SiteFooter />
    </div>
  );
}
