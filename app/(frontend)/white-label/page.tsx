import type { Metadata } from "next";
import { WhitelabelCta, WhitelabelSections } from "@/components/whitelabel";
import { PageShell } from "@/components/page-shell";

export const metadata: Metadata = {
  alternates: { canonical: "/white-label" },
  title: "White-label AI Automation | Grand River Labs",
  description:
    "Your clients are asking for AI. Offer automation under your brand—we deliver behind the scenes.",
};

export default function WhitelabelPage() {
  return (
    <PageShell>
      <WhitelabelSections />
      <WhitelabelCta />
    </PageShell>
  );
}
