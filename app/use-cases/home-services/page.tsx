import type { Metadata } from "next";
import { getIndustry } from "@/components/industries";
import { IndustryUseCase } from "@/components/industry-use-case";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { UseCasesCta } from "@/components/use-cases";

const industry = getIndustry("home-services")!;

export const metadata: Metadata = {
  title: industry.metaTitle,
  description: industry.metaDescription,
};

export default function HomeServicesUseCasePage() {
  return (
    <div id="top">
      <SiteHeader />
      <main>
        <IndustryUseCase content={industry} />
        <UseCasesCta />
      </main>
      <SiteFooter />
    </div>
  );
}
