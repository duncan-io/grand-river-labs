import type { Metadata } from "next";
import { LocalAdsCta, LocalAdsSections } from "@/components/local-ads";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";

export const metadata: Metadata = {
  title: "Local Ads | Grand River Labs",
  description:
    "Google Local Services Ads and local PPC strategy—what to fund, pause, or dispute. Oversight and a specialist when someone else should run the account. Not campaign management.",
};

export default function LocalAdsPage() {
  return (
    <div id="top">
      <SiteHeader />
      <main>
        <LocalAdsSections />
        <LocalAdsCta />
      </main>
      <SiteFooter />
    </div>
  );
}
