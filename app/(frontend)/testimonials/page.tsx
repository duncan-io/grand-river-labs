import type { Metadata } from "next";
import { ContactSection } from "@/components/contact";
import { TestimonialsPageContent } from "@/components/testimonials-page";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";

export const metadata: Metadata = {
  title: "Testimonials | Grand River Labs",
  description:
    "What clients say about working with Grand River Labs—clearer direction, less noise, and guidance that sticks.",
};

export default function TestimonialsPage() {
  const turnstileSiteKey = process.env.TURNSTILE_SITE_KEY?.trim() ?? "";

  return (
    <div id="top">
      <SiteHeader />
      <main>
        <TestimonialsPageContent />
        <ContactSection
          turnstileSiteKey={turnstileSiteKey}
          variant="cta"
          eyebrow="Ready to talk"
          heading="Want results that feel personal?"
          copy="Tell us what you're trying to make clearer—marketing, measurement, or the work that keeps stalling. We'll help you see a practical next step."
          messageLabel="What would you like help with?"
          messagePlaceholder="A local SEO push, affiliate exploration, digital strategy ownership—or whatever's on your mind."
        />
      </main>
      <SiteFooter />
    </div>
  );
}
