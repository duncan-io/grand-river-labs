import type { Metadata } from "next";
import {
  ConsultingCta,
  ConsultingSections,
} from "@/components/automation-consulting";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";

export const metadata: Metadata = {
  title: "Automation Consulting | Grand River Labs",
  description:
    "White-glove discovery before a single workflow ships. We find where time and money leak, prioritize what to automate first, and leave you with a clear roadmap.",
};

export default function AutomationConsultingPage() {
  return (
    <div id="top">
      <SiteHeader />
      <main>
        <ConsultingSections />
        <ConsultingCta />
      </main>
      <SiteFooter />
    </div>
  );
}
