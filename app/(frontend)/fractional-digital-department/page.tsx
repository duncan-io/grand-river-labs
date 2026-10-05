import type { Metadata } from "next";
import { ContactSection } from "@/components/contact";
import { FractionalDigitalDepartmentSections } from "@/components/fractional-digital-department";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";

export const metadata: Metadata = {
  title: "Fractional Digital Department | Grand River Labs",
  description:
    "Holistic digital strategy for owner-led growing businesses. Not an agency and not a consultant—one partner who finds what's working and steps on the gas. Starting at $2,000/month.",
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
          heading="Let's look at the whole picture."
          copy="Tell us what's already running—the site, the spend, the tools—and where you're unsure. A 30-minute fit call is enough to see whether GR Labs should own the picture and decide where to step on the gas."
          directLabel="Prefer to talk? Book a 30-minute fit call →"
          messageLabel="What's going on across your digital?"
          messagePlaceholder="A channel that keeps asking for budget, numbers you don't trust, a backlog nobody owns—start wherever you are."
        />
      </main>
      <SiteFooter />
    </div>
  );
}
