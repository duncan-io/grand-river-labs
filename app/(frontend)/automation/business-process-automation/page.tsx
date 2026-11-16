import type { Metadata } from "next";
import { BpaCta, BpaSections } from "@/components/business-process-automation";
import { PageShell } from "@/components/page-shell";

export const metadata: Metadata = {
  alternates: { canonical: "/automation/business-process-automation" },
  title: "Business Process Automation | Grand River Labs",
  description:
    "Map the busywork between your tools and automate the path—intake, approvals, status sync, and recurring ops—prioritized by your fractional marketing director.",
};

export default function BusinessProcessAutomationPage() {
  return (
    <PageShell>
      <BpaSections />
      <BpaCta />
    </PageShell>
  );
}
