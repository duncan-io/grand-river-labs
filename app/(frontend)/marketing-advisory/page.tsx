import type { Metadata } from "next";
import { ContactSection } from "@/components/contact";
import { MarketingAdvisorySections } from "@/components/marketing-advisory";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";

export const metadata: Metadata = {
  alternates: { canonical: "/marketing-advisory" },
  title: "Marketing Advisory | Grand River Labs",
  description:
    "Is your marketing actually making you money? Marketing advisory that patches lead leaks, verifies what's working, and manages your vendors—starting at $2,500/month.",
};

export default function MarketingAdvisoryPage() {
  const turnstileSiteKey = process.env.TURNSTILE_SITE_KEY?.trim() ?? "";

  return (
    <div id="top">
      <SiteHeader />
      <main>
        <MarketingAdvisorySections />
        <ContactSection
          turnstileSiteKey={turnstileSiteKey}
          variant="cta"
          eyebrow="Start a conversation"
          heading="Get experienced eyes on your marketing."
          copy="Tell us what you're spending and what you're not sure is working. A 30-minute fit call is enough to see whether this is the seat you're missing."
          directLabel="Book a 30-minute fit call"
          messageLabel="What's going on with your marketing?"
          messagePlaceholder="An agency that reports its own numbers, leads that don't get answered, spend you can't tie to jobs—start wherever you are."
        />
      </main>
      <SiteFooter />
    </div>
  );
}
