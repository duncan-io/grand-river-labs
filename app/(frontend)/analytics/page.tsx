import type { Metadata } from "next";
import {
  AnalyticsCta,
  AnalyticsSections,
} from "@/components/analytics";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";

export const metadata: Metadata = {
  title: "Analytics | Grand River Labs",
  description:
    "GA4, Google Tag Manager, event tracking, and attribution—measurement you can make decisions on.",
};

export default function AnalyticsPage() {
  return (
    <div id="top">
      <SiteHeader />
      <main>
        <AnalyticsSections />
        <AnalyticsCta />
      </main>
      <SiteFooter />
    </div>
  );
}
