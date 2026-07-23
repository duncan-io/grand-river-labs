import { ContactSection } from "@/components/contact";
import { Hero } from "@/components/hero";
import {
  AudienceSection,
  ProcessSection,
  PromiseSection,
} from "@/components/sections";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";

export default function Home() {
  return (
    <>
      <SiteHeader />
      <main>
        <Hero />
        <PromiseSection />
        <ProcessSection />
        <AudienceSection />
        <ContactSection />
      </main>
      <SiteFooter />
    </>
  );
}
