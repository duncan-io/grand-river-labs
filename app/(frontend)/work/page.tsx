import type { Metadata } from "next";
import { ContactSection } from "@/components/contact";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { WorkPageContent } from "@/components/work-page";
import { getPublishedCaseStudies } from "@/lib/cms";

export const metadata: Metadata = {
  alternates: { canonical: "/work" },
  title: "Work | Grand River Labs",
  description:
    "Case studies and client testimonials: what was broken, what changed, the lead result that followed, and what owners say about working with us.",
};

export default async function WorkPage() {
  const turnstileSiteKey = process.env.TURNSTILE_SITE_KEY?.trim() ?? "";
  const studies = await getPublishedCaseStudies();

  return (
    <div id="top">
      <SiteHeader />
      <main>
        <WorkPageContent studies={studies} />

        <ContactSection
          turnstileSiteKey={turnstileSiteKey}
          variant="cta"
          eyebrow="Your turn"
          heading="Want this kind of result?"
          copy="Tell us what your marketing is doing now and the number that isn't moving. We'll reply within one business day with whether a fractional marketing director is the right fit—or what is."
          messageLabel="What should we look at?"
          messagePlaceholder="The brands, the sites, or the number that isn't moving."
        />
      </main>
      <SiteFooter />
    </div>
  );
}
