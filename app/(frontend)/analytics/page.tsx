import type { Metadata } from "next";
import { AnalyticsSections } from "@/components/analytics";
import { ContactSection } from "@/components/contact";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";

export const metadata: Metadata = {
  alternates: { canonical: "/analytics" },
  title: "Marketing Analytics & Verification | Grand River Labs",
  description:
    "Is it working? GA4, Google Tag Manager, event tracking, call tracking, and attribution—audited so the numbers can be trusted, and vendor reports checked against CRM reality.",
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
          heading="Let's get numbers you can trust."
          copy="Tell us what you're not sure is working. We'll audit what's firing, fix the tracking, and reconcile the vendor reports against what actually showed up."
          messageLabel="What do you need to see?"
          messagePlaceholder="Numbers you don't trust, calls that never show up, a report nobody can act on—start wherever you are."
        />
      </main>
      <SiteFooter />
    </div>
  );
}
