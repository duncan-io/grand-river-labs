import type { Metadata } from "next";
import { ContactSection } from "@/components/contact";
import { HomeImprovementMarketingSections } from "@/components/home-improvement-marketing";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";

export const metadata: Metadata = {
  alternates: { canonical: "/home-improvement-marketing" },
   title: "Home Improvement Fractional Marketing Director | Grand River Labs",
  description:
    "A fractional marketing director for established home improvement companies doing $1M–$50M. Patch the leaks in your lead flow, verify what the spend produces, and hold vendors to the plan.",
};

export default function HomeImprovementMarketingPage() {
  const turnstileSiteKey = process.env.TURNSTILE_SITE_KEY?.trim() ?? "";

  return (
    <div id="top">
      <SiteHeader />
      <main>
        <HomeImprovementMarketingSections />
        <ContactSection
          turnstileSiteKey={turnstileSiteKey}
          variant="cta"
          eyebrow="Talk lead flow"
          heading="Let's look at where your leads go."
          copy="Tell us where your leads come from today and what happens after they come in. In 30 minutes, we'll show you where they leak and whether we're the right fit. No pitch deck, no pressure."
          directLabel="Book a 30-minute call"
          messageLabel="Where do your leads come from today?"
          messagePlaceholder="Referrals, a lead vendor, Google Ads, LSA, or the calls the office misses. Start wherever you are."
        />
      </main>
      <SiteFooter />
    </div>
  );
}
