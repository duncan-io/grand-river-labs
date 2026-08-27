import type { Metadata } from "next";
import { ContactSection } from "@/components/contact";
import { Hero } from "@/components/hero";
import {
  PromiseSection,
  ProcessSection,
  DigitalStrategySection,
  TestimonialsSection,
} from "@/components/sections";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";

export const metadata: Metadata = {
  title: "Fractional Digital Marketing Team | Grand River Labs",
};

export default function Home() {
  const turnstileSiteKey = process.env.TURNSTILE_SITE_KEY?.trim() ?? "";

  return (
    <>
      <SiteHeader />
      <main>
        <Hero />
        <DigitalStrategySection />
        <TestimonialsSection />
        <ProcessSection />
        <PromiseSection />
        <ContactSection
          turnstileSiteKey={turnstileSiteKey}
          variant="cta"
          atmosphere
        />
      </main>
      <SiteFooter />
    </>
  );
}
