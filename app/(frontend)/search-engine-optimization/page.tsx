import type { Metadata } from "next";
import { ContactSection } from "@/components/contact";
import { SeoSections } from "@/components/seo";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";

export const metadata: Metadata = {
  alternates: { canonical: "/search-engine-optimization" },
  title: "SEO Strategy & Advisory | Grand River Labs",
  description:
    "Know whether your SEO is actually working. Rankings and traffic checked against leads and booked jobs—strategy, priorities, and vendor oversight. Not link building, and not a content mill.",
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
          heading="Let's see if your SEO is earning its invoice."
          copy="Tell us what you're paying for SEO and what it's produced. We'll audit the site, check the results against real leads, and tell you what to ask for—keep, redirect, or replace."
          messageLabel="What's your SEO situation?"
          messagePlaceholder="An agency that reports rankings you've never searched, traffic that never calls, a site Google barely sees—start wherever you are."
        />
      </main>
      <SiteFooter />
    </div>
  );
}
