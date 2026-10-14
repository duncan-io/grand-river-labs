import type { Metadata } from "next";
import { AnalyticsSections } from "@/components/analytics";
import { ContactSection } from "@/components/contact";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";

export const metadata: Metadata = {
  title: "Analytics | Grand River Labs",
  description:
    "GA4, Google Tag Manager, event tracking, call tracking, and attribution—measurement you can make decisions on.",
};

export default function AnalyticsPage() {
  const turnstileSiteKey = process.env.TURNSTILE_SITE_KEY?.trim() ?? "";

  return (
    <div id="top">
      <SiteHeader />
      <main>
        <AnalyticsSections />
        <ContactSection
          turnstileSiteKey={turnstileSiteKey}
          variant="cta"
          eyebrow="Ready when you are"
          heading="Let's get measurement you can trust."
          copy="Tell us what you need to see. We'll map a practical path across GA4, Tag Manager, events, calls, and attribution."
          messageLabel="What do you need to see?"
          messagePlaceholder="Numbers you don't trust, calls that never show up, a report nobody can act on—start wherever you are."
        />
      </main>
      <SiteFooter />
    </div>
  );
}
