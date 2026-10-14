import type { Metadata } from "next";
import { ContactSection } from "@/components/contact";
import { LocalAdsSections } from "@/components/local-ads";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";

export const metadata: Metadata = {
  title: "Local Ads | Grand River Labs",
  description:
    "Google Local Services Ads and local PPC strategy—what to fund, pause, or dispute. Oversight and a specialist when someone else should run the account. Not campaign management.",
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
          copy="Tell us how leads find you today. We'll map LSA, local search, and what's worth cutting before anyone adds budget."
          messageLabel="How do leads find you today?"
          messagePlaceholder="An ads account nobody questions, spend that doesn't turn into calls, leads that don't match the work—start wherever you are."
        />
      </main>
      <SiteFooter />
    </div>
  );
}
