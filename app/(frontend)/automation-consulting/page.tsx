import type { Metadata } from "next";
import {
  ConsultingCta,
  ConsultingSections,
} from "@/components/automation-consulting";
import { PageShell } from "@/components/page-shell";

export const metadata: Metadata = {
  alternates: { canonical: "/automation-consulting" },
  title: "Automation Consulting | Grand River Labs",
  description:
    "White-glove discovery before a single workflow ships. We find where time and money leak, prioritize what to automate first, and leave you with a clear roadmap.",
};

export default function AutomationConsultingPage() {
  return (
    <PageShell>
      <ConsultingSections />
      <ConsultingCta />
    </PageShell>
  );
}
