import type { Metadata } from "next";
import {
  HomeServicesCta,
  HomeServicesSections,
} from "@/components/home-services";
import { getIndustry } from "@/components/industries";
import { PageShell } from "@/components/page-shell";

const industry = getIndustry("home-services")!;

export const metadata: Metadata = {
  alternates: { canonical: "/use-cases/home-services" },
  title: industry.metaTitle,
  description: industry.metaDescription,
};

export default function HomeServicesUseCasePage() {
  return (
    <PageShell>
      <HomeServicesSections />
      <HomeServicesCta />
    </PageShell>
  );
}
