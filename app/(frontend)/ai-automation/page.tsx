import type { Metadata } from "next";
import {
  AiAutomationCta,
  AiAutomationSections,
} from "@/components/ai-automation";
import { PageShell } from "@/components/page-shell";

export const metadata: Metadata = {
  alternates: { canonical: "/ai-automation" },
  title: "AI Automation | Grand River Labs",
  description:
    "Practical AI inside the work you already do—extraction, triage, drafting, and assistants tied to your real systems. Scoped and prioritized by your fractional marketing director. No demos that die on a slide.",
};

export default function AiAutomationPage() {
  return (
    <PageShell>
      <AiAutomationSections />
      <AiAutomationCta />
    </PageShell>
  );
}
