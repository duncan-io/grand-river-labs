import type { Metadata } from "next";
import { SeoCta, SeoSections } from "@/components/seo";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";

export const metadata: Metadata = {
  title: "SEO | Grand River Labs",
  description:
    "On-site SEO for the searches that win the work—structure, titles, crawlability, and pages aligned to search intent. Not link building, and not a content mill.",
};

export default function SearchEngineOptimizationPage() {
  return (
    <div id="top">
      <SiteHeader />
      <main>
        <SeoSections />
        <SeoCta />
      </main>
      <SiteFooter />
    </div>
  );
}
