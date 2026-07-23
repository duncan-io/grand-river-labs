import type { Metadata } from "next";
import {
  MarketingAutomationCta,
  MarketingAutomationSections,
} from "@/components/marketing-automation";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";

export const metadata: Metadata = {
  title: "Marketing Automation | Grand River Labs",
  description:
    "Lead routing, nurture sequences, and campaign ops that fit your CRM and channels—practical automation that keeps pipeline moving.",
};

export default function MarketingAutomationPage() {
  return (
    <div id="top">
      <SiteHeader />
      <main>
        <MarketingAutomationSections />
        <MarketingAutomationCta />
      </main>
      <SiteFooter />
    </div>
  );
}
