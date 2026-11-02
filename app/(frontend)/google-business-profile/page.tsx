import type { Metadata } from "next";
import { ContactSection } from "@/components/contact";
import { GbpSections } from "@/components/google-business-profile";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";

export const metadata: Metadata = {
  alternates: { canonical: "/google-business-profile" },
  title: "Google Business Profile Audit | Grand River Labs",
  description:
    "An audit of your Google Business Profile—categories, services, photos, hours, the link to the site, and whether calls from the map listing are tracked. Quick wins fixed, not review schemes or citation blasts.",
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
          copy="Tell us how people find you nearby. We'll audit the profile Google shows, fix the leaks, and make sure calls from the map listing get counted."
          messageLabel="How do people find you nearby?"
          messagePlaceholder="A profile with the wrong category, hours that are off, photos that don't match the work—start wherever you are."
        />
      </main>
      <SiteFooter />
    </div>
  );
}
