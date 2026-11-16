import type { Metadata } from "next";
import { ContactSection } from "@/components/contact";
import { WhatWeDoSections } from "@/components/what-we-do";
import { PageShell } from "@/components/page-shell";

export const metadata: Metadata = {
  alternates: { canonical: "/automation" },
  title: "Automation and AI | Grand River Labs",
  description:
    "A lever your fractional marketing director pulls: automate the busywork between the tools you already trust—business process, marketing, and AI—scoped and prioritized against every other option.",
};

export default function WhatWeDoPage() {
  return (
    <PageShell>
      <WhatWeDoSections />
      <ContactSection
        variant="cta"
        eyebrow="Ready when you are"
        heading="Let's find where automation pays for itself."
        copy="Tell us how work moves today. We'll map a practical path from your existing systems to measurable time and cost savings."
        messageLabel="How does the work move today?"
        messagePlaceholder="Copy-paste between tools, follow-ups that slip, a process that still needs a person in the middle—start wherever you are."
      />
    </PageShell>
  );
}
