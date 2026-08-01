import type { Metadata } from "next";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import {
  WebsiteStrategyCta,
  WebsiteStrategySections,
} from "@/components/website-strategy";

export const metadata: Metadata = {
  title: "Website Strategy | Grand River Labs",
  description:
    "SEO and conversion strategy so your website gets found—and turns traffic into inquiries.",
};

export default function WebsiteStrategyPage() {
  return (
    <div id="top">
      <SiteHeader />
      <main>
        <WebsiteStrategySections />
        <WebsiteStrategyCta />
      </main>
      <SiteFooter />
    </div>
  );
}
