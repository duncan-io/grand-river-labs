import type { Metadata } from "next";
import {
  HomeServicesCta,
  HomeServicesSections,
} from "@/components/home-services";
import { getIndustry } from "@/components/industries";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";

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
        <HomeServicesSections />
        <HomeServicesCta />
      </main>
      <SiteFooter />
    </div>
  );
}
