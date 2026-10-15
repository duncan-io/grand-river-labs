import type { Metadata } from "next";
import { ContactSection } from "@/components/contact";
import { FractionalDigitalDepartmentSections } from "@/components/fractional-digital-department";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";

export const metadata: Metadata = {
  title: "Fractional Digital Marketing Leadership | Grand River Labs",
  description:
    "Senior digital marketing leadership for owner-led growing businesses, without a full-time hire. One partner who decides where effort goes and does the work. Starting at $2,500/month.",
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
          heading="Get senior eyes on your digital."
          copy="Tell us what's already running—the site, the spend, the tools—and where you're unsure. A 30-minute fit call is enough to see whether senior digital marketing leadership from GR Labs is the seat you're missing."
          directLabel="Prefer to talk? Book a 30-minute fit call →"
          messageLabel="What's going on across your digital?"
          messagePlaceholder="A channel that keeps asking for budget, numbers you don't trust, a backlog nobody owns—start wherever you are."
        />
      </main>
      <SiteFooter />
    </div>
  );
}
