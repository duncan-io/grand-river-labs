import type { Metadata } from "next";
import { GbpCta, GbpSections } from "@/components/google-business-profile";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";

export const metadata: Metadata = {
  title: "Google Business Profile | Grand River Labs",
  description:
    "Categories, services, photos, hours, and the link from your Google Business Profile to the site. Not review schemes, not a citation blast, and not posts for their own sake.",
};

export default function GoogleBusinessProfilePage() {
  return (
    <div id="top">
      <SiteHeader />
      <main>
        <GbpSections />
        <GbpCta />
      </main>
      <SiteFooter />
    </div>
  );
}
