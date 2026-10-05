import type { Metadata } from "next";
import { CroCta, CroSections } from "@/components/cro";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";

export const metadata: Metadata = {
  title: "Conversion Rate Optimization (CRO) | Grand River Labs",
  description:
    "Turn the traffic you already have into inquiries and bookings—clearer journeys, stronger calls to action, tighter forms, and tests sized to your traffic.",
};

export default function ConversionRateOptimizationPage() {
  return (
    <div id="top">
      <SiteHeader />
      <main>
        <CroSections />
        <CroCta />
      </main>
      <SiteFooter />
    </div>
  );
}
