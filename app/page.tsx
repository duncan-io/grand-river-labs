import { ContactSection } from "@/components/contact";
import { Hero } from "@/components/hero";
import {
  AudienceSection,
  OfferingsSection,
  ProcessSection,
  PromiseSection,
} from "@/components/sections";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";

export default function Home() {
  const turnstileSiteKey = process.env.TURNSTILE_SITE_KEY?.trim() ?? "";

  return (
    <>
      <SiteHeader />
      <main>
        <Hero />
        <PromiseSection />
        <ProcessSection />
        <OfferingsSection />
        <AudienceSection />
        <ContactSection turnstileSiteKey={turnstileSiteKey} />
      </main>
      <SiteFooter />
    </>
  );
}
