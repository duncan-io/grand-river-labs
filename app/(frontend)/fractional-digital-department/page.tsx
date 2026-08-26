import type { Metadata } from "next";
import { ContactSection } from "@/components/contact";
import { FractionalDigitalDepartmentSections } from "@/components/fractional-digital-department";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";

export const metadata: Metadata = {
  title: "Fractional Digital Department | Grand River Labs",
  description:
    "Senior digital leadership and hands-on execution for owner-led growing businesses—without hiring a full-time digital team. Ongoing support starting at $1,500/month.",
};

export default function FractionalDigitalDepartmentPage() {
  const turnstileSiteKey = process.env.TURNSTILE_SITE_KEY?.trim() ?? "";

  return (
    <div id="top">
      <SiteHeader />
      <main>
        <FractionalDigitalDepartmentSections />
        <ContactSection
          turnstileSiteKey={turnstileSiteKey}
          variant="cta"
          eyebrow="Start a conversation"
          heading="Get The Most Out Of Your Digital Strategy"
          copy="Tell us about your digital presence, the tools you already use, and the work that never quite gets owned. A 30-minute fit call is enough to see whether GR Labs should take ownership of it."
          directLabel="Prefer to talk? Book a 30-minute fit call →"
          messageLabel="What should we look at first?"
          messagePlaceholder="The website, a pile of tools that don't talk, a backlog of digital projects, or the fact that nobody owns this—start wherever you are."
        />
      </main>
      <SiteFooter />
    </div>
  );
}
