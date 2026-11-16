import type { Metadata } from "next";
import {
  MarketingAutomationCta,
  MarketingAutomationSections,
} from "@/components/marketing-automation";
import { PageShell } from "@/components/page-shell";

export const metadata: Metadata = {
  alternates: { canonical: "/marketing-automation" },
  title: "Marketing & Sales Automation | Grand River Labs",
  description:
    "Lead routing, nurture, and follow-up built directly by your fractional marketing director; larger campaign ops scoped to a vendor and verified against the CRM.",
};

export default function MarketingAutomationPage() {
  return (
    <PageShell>
      <MarketingAutomationSections />
      <MarketingAutomationCta />
    </PageShell>
  );
}
