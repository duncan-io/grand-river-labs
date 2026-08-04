import type { Metadata } from "next";
import { ContactSection } from "@/components/contact";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { WebsiteStrategySections } from "@/components/website-strategy";

export const metadata: Metadata = {
  title: "Fractional Website Department | Grand River Labs",
  description:
    "A trusted Fractional Website Department—on-demand website operations, growth recommendations, ownership, and CRO. Existing sites or new builds, across WordPress, Webflow, Wix, Squarespace, and more.",
};

export default function WebsiteStrategyPage() {
  const turnstileSiteKey = process.env.TURNSTILE_SITE_KEY?.trim() ?? "";

  return (
    <div id="top">
      <SiteHeader />
      <main>
        <WebsiteStrategySections />
        <ContactSection
          turnstileSiteKey={turnstileSiteKey}
          variant="cta"
          eyebrow="Start a conversation"
          heading="What's going on with your website?"
          copy="Tell us about ownership, the backlog, a site that needs building—or what you wish someone would just handle. We'll map how a Fractional Website Department can take it on."
          messageLabel="What's happening with your website?"
          messagePlaceholder="Ownership gaps, a stubborn backlog, underperforming pages, a new site to build—start wherever you are."
        />
      </main>
      <SiteFooter />
    </div>
  );
}
