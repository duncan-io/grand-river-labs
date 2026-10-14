import type { Metadata } from "next";
import { ContactSection } from "@/components/contact";
import { GbpSections } from "@/components/google-business-profile";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";

export const metadata: Metadata = {
  title: "Google Business Profile | Grand River Labs",
  description:
    "Categories, services, photos, hours, and the link from your Google Business Profile to the site. Not review schemes, not a citation blast, and not posts for their own sake.",
};

export default function GoogleBusinessProfilePage() {
  const turnstileSiteKey = process.env.TURNSTILE_SITE_KEY?.trim() ?? "";

  return (
    <div id="top">
      <SiteHeader />
      <main>
        <GbpSections />
        <ContactSection
          turnstileSiteKey={turnstileSiteKey}
          variant="cta"
          eyebrow="Ready when you are"
          heading="Let's see what the map result says."
          copy="Tell us how people find you nearby. We'll look at the profile Google shows, and which fixes are worth making first."
          messageLabel="How do people find you nearby?"
          messagePlaceholder="A profile with the wrong category, hours that are off, photos that don't match the work—start wherever you are."
        />
      </main>
      <SiteFooter />
    </div>
  );
}
