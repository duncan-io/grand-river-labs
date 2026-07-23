import type { Metadata } from "next";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { WhitelabelCta, WhitelabelSections } from "@/components/whitelabel";

export const metadata: Metadata = {
  title: "White-label AI Automation | Grand River Labs",
  description:
    "Offer AI automation to your clients without learning the stack. White-label delivery for agencies and freelancers.",
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
