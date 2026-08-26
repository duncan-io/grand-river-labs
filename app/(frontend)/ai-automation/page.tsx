import type { Metadata } from "next";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import {
  AiAutomationCta,
  AiAutomationSections,
} from "@/components/ai-automation";

export const metadata: Metadata = {
  title: "AI Automation | Grand River Labs",
  description:
    "Practical AI inside the work you already do—extraction, triage, drafting, and assistants tied to your real systems. No demos that die on a slide.",
};

export default function AiAutomationPage() {
  return (
    <div id="top">
      <SiteHeader />
      <main>
        <AiAutomationSections />
        <AiAutomationCta />
      </main>
      <SiteFooter />
    </div>
  );
}
