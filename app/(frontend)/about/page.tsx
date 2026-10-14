import type { Metadata } from "next";
import { AboutSections } from "@/components/about";
import { ContactSection } from "@/components/contact";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { getSiteUrl } from "@/lib/site";

const description =
  "Grand River Labs is a fractional digital marketing team, not an agency. See who decides the work, who you talk to, and how the engagement is billed.";

export const metadata: Metadata = {
  title: "About | Grand River Labs",
  description,
};

const aboutPageJsonLd = {
  "@context": "https://schema.org",
  "@type": "AboutPage",
  name: "About Grand River Labs",
  url: `${getSiteUrl()}/about`,
  description,
  mainEntity: {
    "@type": "ProfessionalService",
    name: "Grand River Labs",
    url: getSiteUrl(),
    description,
    email: "hello@grandriverlabs.com",
  },
};

export default function AboutPage() {
  const turnstileSiteKey = process.env.TURNSTILE_SITE_KEY?.trim() ?? "";

  return (
    <div id="top">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(aboutPageJsonLd),
        }}
      />
      <SiteHeader />
      <main>
        <AboutSections />
        <ContactSection
          turnstileSiteKey={turnstileSiteKey}
          variant="cta"
          eyebrow="Start a conversation"
          heading="Who owns the picture today?"
          copy="Tell us who currently owns digital, and where the picture breaks—a channel that keeps asking for budget, numbers you don't trust, or work nobody named. We'll get back within two business days."
          directLabel="Prefer to talk? Book a 30-minute fit call →"
          messageLabel="Who owns digital today?"
          messagePlaceholder="An agency on one channel, a hire you haven't made, a pile of vendors—start wherever you are."
        />
      </main>
      <SiteFooter />
    </div>
  );
}
