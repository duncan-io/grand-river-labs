import type { Metadata } from "next";
import { ContactSection } from "@/components/contact";
import { LeadLeakAuditSections } from "@/components/lead-leak-audit";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";

export const metadata: Metadata = {
  alternates: { canonical: "/lead-leak-audit" },
  title: "Lead Leak Audit | Grand River Labs",
  description:
    "Missed calls, broken forms, slow follow-up, vendor reports that don't match the CRM. A lead leak audit finds where leads and money leak after the click—ranked by what each leak is worth.",
};

export default function LeadLeakAuditPage() {
  const turnstileSiteKey = process.env.TURNSTILE_SITE_KEY?.trim() ?? "";

  return (
    <div id="top">
      <SiteHeader />
      <main>
        <LeadLeakAuditSections />
        <ContactSection
          turnstileSiteKey={turnstileSiteKey}
          variant="cta"
          eyebrow="Start with the leaks"
          heading="Let's find what your marketing is losing."
          copy="Tell us what you're spending and where the leads are supposed to go. We'll scope the audit on a 30-minute call—what we check, and what you get."
          directLabel="Book a 30-minute call"
          messageLabel="Where do you think leads are leaking?"
          messagePlaceholder="Calls that don't get answered, a form you're not sure works, an agency report you don't quite believe—start wherever you are."
        />
      </main>
      <SiteFooter />
    </div>
  );
}
