import type { Metadata } from "next";
import { ContactSection } from "@/components/contact";
import { LocalAdsSections } from "@/components/local-ads";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";

export const metadata: Metadata = {
  alternates: { canonical: "/local-ads" },
  title: "Paid Ads & LSA Advisory | Grand River Labs",
  description:
    "Google Ads, Meta, and Local Services Ads strategy—what to fund, pause, or dispute, and verification that reported leads actually show up in the CRM. Oversight and a specialist when someone else should run the account. Not campaign management.",
};

export default function LocalAdsPage() {
  const turnstileSiteKey = process.env.TURNSTILE_SITE_KEY?.trim() ?? "";

  return (
    <div id="top">
      <SiteHeader />
      <main>
        <LocalAdsSections />
        <ContactSection
          turnstileSiteKey={turnstileSiteKey}
          variant="cta"
          eyebrow="Ready when you are"
          heading="Let's look at what the spend is buying."
          copy="Tell us what you're spending on ads and what it's produced. We'll check the platforms' numbers against your CRM and say what's worth keeping, disputing, or cutting."
          messageLabel="How do leads find you today?"
          messagePlaceholder="An ads account nobody questions, spend that doesn't turn into calls, leads that don't match the work—start wherever you are."
        />
      </main>
      <SiteFooter />
    </div>
  );
}
