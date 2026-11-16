import type { Metadata } from "next";
import { ContactSection } from "@/components/contact";
import { WorkPageContent } from "@/components/work-page";
import { getPublishedCaseStudies } from "@/lib/cms";
import { PageShell } from "@/components/page-shell";

export const metadata: Metadata = {
  alternates: { canonical: "/work" },
  title: "Work | Grand River Labs",
  description:
    "Case studies and client testimonials: what was broken, what changed, the lead result that followed, and what owners say about working with us.",
};

export default async function WorkPage() {
  const studies = await getPublishedCaseStudies();

  return (
    <PageShell>
      <WorkPageContent studies={studies} />

      <ContactSection
        variant="cta"
        eyebrow="Your turn"
        heading="Want this kind of result?"
        copy="Tell us what your marketing is doing now and the number that isn't moving. We'll reply within one business day with whether a fractional marketing director is the right fit—or what is."
        messageLabel="What should we look at?"
        messagePlaceholder="The brands, the sites, or the number that isn't moving."
      />
    </PageShell>
  );
}
