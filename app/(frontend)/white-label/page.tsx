import type { Metadata } from "next";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { WhitelabelCta, WhitelabelSections } from "@/components/whitelabel";

export const metadata: Metadata = {
  title: "White-label AI Automation | Grand River Labs",
  description:
    "Your clients are asking for AI. Offer automation under your brand—we deliver behind the scenes.",
};

export default function WhitelabelPage() {
  return (
    <div id="top">
      <SiteHeader />
      <main>
        <WhitelabelSections />
        <WhitelabelCta />
      </main>
      <SiteFooter />
    </div>
  );
}
