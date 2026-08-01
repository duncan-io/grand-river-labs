import type { Metadata } from "next";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { WhatWeDoCta, WhatWeDoSections } from "@/components/what-we-do";

export const metadata: Metadata = {
  title: "Automation and AI | Grand River Labs",
  description:
    "Automate the busywork between the tools you already trust—business process, marketing, consulting, and AI—without a rip-and-replace.",
};

export default function WhatWeDoPage() {
  return (
    <div id="top">
      <SiteHeader />
      <main>
        <WhatWeDoSections />
        <WhatWeDoCta />
      </main>
      <SiteFooter />
    </div>
  );
}
