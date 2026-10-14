import type { Metadata } from "next";
import { ContactSection } from "@/components/contact";
import { SeoSections } from "@/components/seo";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";

export const metadata: Metadata = {
  title: "SEO | Grand River Labs",
  description:
    "On-site SEO for the searches that win the work—structure, titles, crawlability, and pages aligned to search intent. Not link building, and not a content mill.",
};

export default function SearchEngineOptimizationPage() {
  const turnstileSiteKey = process.env.TURNSTILE_SITE_KEY?.trim() ?? "";

  return (
    <div id="top">
      <SiteHeader />
      <main>
        <SeoSections />
        <ContactSection
          turnstileSiteKey={turnstileSiteKey}
          variant="cta"
          eyebrow="Ready when you are"
          heading="Let's see which searches you're missing."
          copy="Tell us how people find you today. We'll map what the site can be found for, and which on-site fixes are worth making first."
          messageLabel="How do people find you today?"
          messagePlaceholder="Searches you expected to show up for, pages that never rank, a site Google barely sees—start wherever you are."
        />
      </main>
      <SiteFooter />
    </div>
  );
}
