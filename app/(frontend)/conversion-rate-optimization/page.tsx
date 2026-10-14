import type { Metadata } from "next";
import { ContactSection } from "@/components/contact";
import { CroSections } from "@/components/cro";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";

export const metadata: Metadata = {
  title: "Conversion Rate Optimization (CRO) | Grand River Labs",
  description:
    "Turn the traffic you already have into inquiries and bookings—clearer journeys, stronger calls to action, tighter forms, and tests sized to your traffic.",
};

export default function ConversionRateOptimizationPage() {
  const turnstileSiteKey = process.env.TURNSTILE_SITE_KEY?.trim() ?? "";

  return (
    <div id="top">
      <SiteHeader />
      <main>
        <CroSections />
        <ContactSection
          turnstileSiteKey={turnstileSiteKey}
          variant="cta"
          eyebrow="Ready when you are"
          heading="Let's look at where the visits go."
          copy="Tell us what the site is supposed to do. We'll map where people drop off and which changes are worth making first."
          messageLabel="What is the site supposed to do?"
          messagePlaceholder="A page that gets traffic but few inquiries, a form people abandon, a booking flow that stalls—start wherever you are."
        />
      </main>
      <SiteFooter />
    </div>
  );
}
