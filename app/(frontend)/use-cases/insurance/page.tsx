import type { Metadata } from "next";
import { getIndustry } from "@/components/industries";
import { IndustryUseCase } from "@/components/industry-use-case";
import { UseCasesCta } from "@/components/use-cases";
import { PageShell } from "@/components/page-shell";

const industry = getIndustry("insurance")!;

export const metadata: Metadata = {
  alternates: { canonical: "/use-cases/insurance" },
  title: industry.metaTitle,
  description: industry.metaDescription,
};

export default function InsuranceUseCasePage() {
  return (
    <PageShell>
      <IndustryUseCase content={industry} />
      <UseCasesCta />
    </PageShell>
  );
}
