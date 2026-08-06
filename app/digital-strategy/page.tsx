import type { Metadata } from "next";
import { ContactSection } from "@/components/contact";
import { DigitalStrategySections } from "@/components/digital-strategy";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";

export const metadata: Metadata = {
  title: "Fractional Digital Strategy Partner | Grand River Labs",
  description:
    "A Fractional Digital Strategy Partner—ongoing cross-channel guidance across website, PPC, SEO, email, social media, analytics, and marketing operations, prioritized around your goals, setup, and resources.",
};

export default function DigitalStrategyPage() {
  const turnstileSiteKey = process.env.TURNSTILE_SITE_KEY?.trim() ?? "";

  return (
    <div id="top">
      <SiteHeader />
      <main>
        <DigitalStrategySections />
        <ContactSection
          turnstileSiteKey={turnstileSiteKey}
          variant="cta"
          eyebrow="Start with the real goal"
          heading="What are you trying to make happen?"
          copy="Tell us about your goals, current marketing setup, budget or capacity constraints, and the decisions that feel unclear. We'll map how a Fractional Digital Strategy Partner can own the priorities with you."
          messageLabel="Where do you need more clarity?"
          messagePlaceholder="Your goals, current channels, what's working, what isn't, or the decision you need to make—start wherever you are."
        />
      </main>
      <SiteFooter />
    </div>
  );
}
