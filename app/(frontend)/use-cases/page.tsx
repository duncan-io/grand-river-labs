import type { Metadata } from "next";
import { IndustryStrip } from "@/components/industry-use-case";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { UseCasesCta, UseCasesSection } from "@/components/use-cases";

export const metadata: Metadata = {
  title: "Common Use Cases | Grand River Labs",
  description:
    "Practical AI automation use cases—from document extraction and knowledge agents to support, enrichment, and sales team agents.",
};

export default function UseCasesPage() {
  return (
    <div id="top">
      <SiteHeader />
      <main>
        <IndustryStrip />
        <UseCasesSection />
        <UseCasesCta />
      </main>
      <SiteFooter />
    </div>
  );
}
