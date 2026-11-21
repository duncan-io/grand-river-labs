import type { Metadata } from "next";
import Link from "next/link";
import { ContactSection } from "@/components/contact";
import {
  FractionalDirectorSections,
  faqs as directorFaqs,
} from "@/components/fractional-marketing-director";
import { DIRECTOR_MONTHLY, formatUsd } from "@/lib/pricing";
import { PageShell } from "@/components/page-shell";
import { JsonLd } from "@/components/json-ld";
import { faqPageJsonLd, providerJsonLd } from "@/lib/json-ld";

const directorJsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Service",
      name: "Fractional Marketing Director",
      provider: providerJsonLd(),
      serviceType: "Fractional marketing director",
      description:
        "A part-time senior marketing director who meets with leadership weekly to plan strategy, decide where the budget goes, and advise on key decisions, while coaching the team and holding every vendor to the plan.",
      audience: {
        "@type": "BusinessAudience",
        audienceType: "Home services companies and other lead-driven businesses",
      },
      areaServed: { "@type": "Country", name: "United States" },
      offers: {
        "@type": "Offer",
        price: DIRECTOR_MONTHLY,
        priceCurrency: "USD",
        description: `Starting at ${formatUsd(DIRECTOR_MONTHLY)}/month`,
      },
    },
    faqPageJsonLd(directorFaqs),
  ],
};

export const metadata: Metadata = {
  alternates: { canonical: "/fractional-marketing-director" },
  title: "Fractional Marketing Director (Fractional CMO) for Home Services | Grand River Labs",
  description: `Meet weekly with a part-time senior marketing director for home services and other lead-driven businesses: strategy, budget, advice on the big calls, and every vendor held to the plan. Starting at ${formatUsd(DIRECTOR_MONTHLY)}/month.`,
};

export default function FractionalMarketingDirectorPage() {
  return (
    <PageShell>
      <JsonLd data={directorJsonLd} />
      <FractionalDirectorSections />
      <ContactSection
        variant="cta"
        eyebrow="Start a conversation"
        heading="Get a senior marketer's eyes on your marketing."
        copy="Tell us your goals and what you spend today. In 30 minutes, we'll tell you if a fractional director is a good fit."
        directLabel="Book a 30-minute fit call"
        messageLabel="What's going on with your marketing?"
        messagePlaceholder="Your goals, your budget, what's working, what you'd like to grow. Start wherever you are."
        footnote={
          <>
            Roofing or contracting company? See how we work with{" "}
            <Link href="/fractional-marketing-director/roofing">roofers</Link>{" "}
            and{" "}
            <Link href="/fractional-marketing-director/contractors">
              contractors
            </Link>
            .
          </>
        }
      />
    </PageShell>
  );
}
