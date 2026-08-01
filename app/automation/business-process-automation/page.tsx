import type { Metadata } from "next";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { BpaCta, BpaSections } from "@/components/business-process-automation";

export const metadata: Metadata = {
  title: "Business Process Automation | Grand River Labs",
  description:
    "Map the busywork between your tools and automate the path—intake, approvals, status sync, and recurring ops—without a rip-and-replace.",
};

export default function BusinessProcessAutomationPage() {
  return (
    <div id="top">
      <SiteHeader />
      <main>
        <BpaSections />
        <BpaCta />
      </main>
      <SiteFooter />
    </div>
  );
}
