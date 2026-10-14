import type { Metadata } from "next";
import { ContactSection } from "@/components/contact";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { WhatWeDoSections } from "@/components/what-we-do";

export const metadata: Metadata = {
  title: "Automation and AI | Grand River Labs",
  description:
    "Automate the busywork between the tools you already trust—business process, marketing, consulting, and AI—without a rip-and-replace.",
};

export default function WhatWeDoPage() {
  const turnstileSiteKey = process.env.TURNSTILE_SITE_KEY?.trim() ?? "";

  return (
    <div id="top">
      <SiteHeader />
      <main>
        <WhatWeDoSections />
        <ContactSection
          turnstileSiteKey={turnstileSiteKey}
          variant="cta"
          eyebrow="Ready when you are"
          heading="Let's find where automation pays for itself."
          copy="Tell us how work moves today. We'll map a practical path from your existing systems to measurable time and cost savings."
          messageLabel="How does the work move today?"
          messagePlaceholder="Copy-paste between tools, follow-ups that slip, a process that still needs a person in the middle—start wherever you are."
        />
      </main>
      <SiteFooter />
    </div>
  );
}
