import type { Metadata } from "next";
import { IndustryStrip } from "@/components/industry-use-case";
import { UseCasesCta, UseCasesSection } from "@/components/use-cases";
import { PageShell } from "@/components/page-shell";

export const metadata: Metadata = {
  alternates: { canonical: "/use-cases" },
  title: "Common Use Cases | Grand River Labs",
  description:
    "Practical AI automation use cases—from document extraction and knowledge agents to support, enrichment, and sales team agents.",
};

export default function UseCasesPage() {
  return (
    <PageShell>
      <IndustryStrip />
      <UseCasesSection />
      <UseCasesCta />
    </PageShell>
  );
}
