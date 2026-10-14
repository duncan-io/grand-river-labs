import type { Metadata } from "next";
import { ContactSection } from "@/components/contact";
import { CustomSoftwareSections } from "@/components/custom-software";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";

export const metadata: Metadata = {
  title: "Custom Software | Grand River Labs",
  description:
    "Custom software for the business you run. Bring a working example that needs to scale, or a clear need no packaged tool covers. Grand River Labs can help.",
};

export default function CustomSoftwarePage() {
  const turnstileSiteKey = process.env.TURNSTILE_SITE_KEY?.trim() ?? "";

  return (
    <div id="top">
      <SiteHeader />
      <main>
        <CustomSoftwareSections />
        <ContactSection
          turnstileSiteKey={turnstileSiteKey}
          variant="cta"
          eyebrow="Start a conversation"
          heading="What should the software do?"
          copy="Tell us about a prototype that works for you but not for the business, a workflow no current tool covers, or the job you already know custom software should take on. We'll get back within two business days."
          messageLabel="What should the software do?"
          messagePlaceholder="A working example that needs to scale, a workflow no current tool covers, or the job you already know custom software should do."
        />
      </main>
      <SiteFooter />
    </div>
  );
}
