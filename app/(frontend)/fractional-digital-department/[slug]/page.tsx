import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ContactSection } from "@/components/contact";
import { NichePage } from "@/components/niche-page";
import { getNiche, niches } from "@/components/niches";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";

type Args = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return niches.map((niche) => ({ slug: niche.slug }));
}

export const dynamicParams = false;

export async function generateMetadata({ params }: Args): Promise<Metadata> {
  const { slug } = await params;
  const niche = getNiche(slug);

  if (!niche) {
    return { title: "Not found | Grand River Labs" };
  }

  return {
    title: niche.metaTitle,
    description: niche.metaDescription,
  };
}

export default async function NicheRoutePage({ params }: Args) {
  const { slug } = await params;
  const niche = getNiche(slug);

  if (!niche) notFound();

  const turnstileSiteKey = process.env.TURNSTILE_SITE_KEY?.trim() ?? "";

  return (
    <div id="top">
      <SiteHeader />
      <main>
        <NichePage content={niche} />
        <ContactSection
          turnstileSiteKey={turnstileSiteKey}
          variant="cta"
          eyebrow={niche.cta.eyebrow}
          heading={niche.cta.heading}
          copy={niche.cta.copy}
          directLabel={niche.cta.directLabel}
          messageLabel={niche.cta.messageLabel}
          messagePlaceholder={niche.cta.messagePlaceholder}
        />
      </main>
      <SiteFooter />
    </div>
  );
}
