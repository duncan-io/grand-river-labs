import type { Metadata } from "next";
import { ContactSection } from "@/components/contact";
import { RemodelingMarketingSections } from "@/components/remodeling-marketing";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";

export const metadata: Metadata = {
  title: "Remodeling Marketing for Design-Build Remodelers | Grand River Labs",
  description:
    "A fractional digital department for design-build remodelers doing $1M–$10M. One owner for kitchen and bath leads and the reply that books the job.",
};

export default function RemodelingMarketingPage() {
  const turnstileSiteKey = process.env.TURNSTILE_SITE_KEY?.trim() ?? "";

  return (
    <div id="top">
      <SiteHeader />
      <main>
        <RemodelingMarketingSections />
        <ContactSection
          turnstileSiteKey={turnstileSiteKey}
          variant="cta"
          eyebrow="Talk lead flow"
          heading="Let's look at where your leads go."
          copy="Tell us where your leads come from today and what happens after they come in. In 30 minutes, we'll show you where they leak and whether we're the right fit. No pitch deck, no pressure."
          directLabel="Book a 30-minute call"
          messageLabel="Where do your leads come from today?"
          messagePlaceholder="Referrals, a lead vendor, Google Ads, LSA, or the calls the showroom misses. Start wherever you are."
        />
      </main>
      <SiteFooter />
    </div>
  );
}
