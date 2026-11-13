import type { Metadata } from "next";
import { ContactSection } from "@/components/contact";
import { IndustriesSections } from "@/components/industries-page";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";

export const metadata: Metadata = {
  alternates: { canonical: "/industries" },
  title: "Industries We Serve | Grand River Labs",
  description:
    "Fractional marketing direction for lead-driven businesses: home improvement, remodeling, roofing, contractors, painting, and professional services. Patch the leaks, verify the spend, hold vendors to the plan.",
};

export default function IndustriesPage() {
  const turnstileSiteKey = process.env.TURNSTILE_SITE_KEY?.trim() ?? "";

  return (
    <div id="top">
      <SiteHeader />
      <main>
        <IndustriesSections />
        <ContactSection
          turnstileSiteKey={turnstileSiteKey}
          variant="cta"
          eyebrow="Ready when you are"
          heading="Let's look at where your leads go."
          copy="Tell us about your business. On a free 30-minute call we'll walk through where leads come from, where they leak, and what the spend is producing."
          directLabel="Book a 30-minute call"
          messageLabel="Tell us about your business"
          messagePlaceholder="What you do, where your leads come from, and what's been getting in the way. Start wherever you are."
        />
      </main>
      <SiteFooter />
    </div>
  );
}
