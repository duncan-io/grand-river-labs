import type { Metadata } from "next";
import { ContactSection } from "@/components/contact";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import {
  HostingSections,
  faqs as hostingFaqs,
} from "@/components/wordpress-hosting";
import { HOSTING_MONTHLY_FROM, formatUsd } from "@/lib/pricing";
import { getSiteUrl } from "@/lib/site";

const hostingJsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Service",
      name: "Managed WordPress Hosting and Care",
      provider: {
        "@type": "ProfessionalService",
        name: "Grand River Labs",
        url: getSiteUrl(),
        email: "hello@grandriverlabs.io",
      },
      serviceType: "Managed WordPress hosting",
      description:
        "Managed WordPress hosting with daily backups, SSL, CDN, caching, security and malware protection, uptime monitoring, and a staging site. Optional care plan adds WordPress core, plugin, and theme updates, fixes, and small content edits.",
      areaServed: { "@type": "Country", name: "United States" },
      offers: {
        "@type": "Offer",
        priceSpecification: {
          "@type": "UnitPriceSpecification",
          minPrice: HOSTING_MONTHLY_FROM,
          priceCurrency: "USD",
          unitText: "MONTH",
        },
      },
    },
    {
      "@type": "FAQPage",
      mainEntity: hostingFaqs.map((item) => ({
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
  alternates: { canonical: "/wordpress-hosting" },
  title: "Managed WordPress Hosting & Care | Grand River Labs",
  description: `Managed WordPress hosting with daily backups, SSL, CDN, security, and uptime monitoring. Add a care plan for updates, fixes, and small edits. From ${formatUsd(HOSTING_MONTHLY_FROM)}/month.`,
};

export default function WordpressHostingPage() {
  const turnstileSiteKey = process.env.TURNSTILE_SITE_KEY?.trim() ?? "";

  return (
    <div id="top">
      <SiteHeader />
      <main>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(hostingJsonLd).replace(/</g, "\\u003c"),
          }}
        />
        <HostingSections />
        <ContactSection
          turnstileSiteKey={turnstileSiteKey}
          variant="cta"
          eyebrow="Ready when you are"
          heading="Let's get your site looked after."
          copy="Tell us about your WordPress site. On a free 30-minute call we'll walk through hosting, the care plan, and moving it over."
          directLabel="Book a 30-minute call"
          messageLabel="Tell us about your site"
          messagePlaceholder="Your web address, who looks after it today, anything that's been giving you trouble. Start wherever you are."
        />
      </main>
      <SiteFooter />
    </div>
  );
}
