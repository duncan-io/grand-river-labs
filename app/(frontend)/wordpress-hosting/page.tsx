import type { Metadata } from "next";
import { ContactSection } from "@/components/contact";
import {
  HostingSections,
  faqs as hostingFaqs,
} from "@/components/wordpress-hosting";
import { HOSTING_MONTHLY_FROM, formatUsd } from "@/lib/pricing";
import { PageShell } from "@/components/page-shell";
import { JsonLd } from "@/components/json-ld";
import { faqPageJsonLd, providerJsonLd } from "@/lib/json-ld";

const hostingJsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Service",
      name: "Managed WordPress Hosting and Care",
      provider: providerJsonLd(),
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
    faqPageJsonLd(hostingFaqs),
  ],
};

export const metadata: Metadata = {
  alternates: { canonical: "/wordpress-hosting" },
  title: "Managed WordPress Hosting & Care | Grand River Labs",
  description: `Managed WordPress hosting with daily backups, SSL, CDN, security, and uptime monitoring. Add a care plan for updates, fixes, and small edits. From ${formatUsd(HOSTING_MONTHLY_FROM)}/month.`,
};

export default function WordpressHostingPage() {
  return (
    <PageShell>
      <JsonLd data={hostingJsonLd} />
      <HostingSections />
      <ContactSection
        variant="cta"
        eyebrow="Ready when you are"
        heading="Let's get your site looked after."
        copy="Tell us about your WordPress site. On a free 30-minute call we'll walk through hosting, the care plan, and moving it over."
        directLabel="Book a 30-minute call"
        messageLabel="Tell us about your site"
        messagePlaceholder="Your web address, who looks after it today, anything that's been giving you trouble. Start wherever you are."
      />
    </PageShell>
  );
}
