import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { RichText } from "@payloadcms/richtext-lexical/react";
import type { SerializedEditorState } from "@payloadcms/richtext-lexical/lexical";
import { ContactSection } from "@/components/contact";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { getPayloadClient } from "@/lib/get-payload";
import { isMedia, mediaImageSrc } from "@/lib/media";

export const dynamic = "force-dynamic";

type Args = {
  params: Promise<{ slug: string }>;
};

async function getPublishedCaseStudy(slug: string) {
  const payload = await getPayloadClient();
  const { docs } = await payload.find({
    collection: "case-studies",
    depth: 1,
    limit: 1,
    where: {
      and: [
        { slug: { equals: slug } },
        { _status: { equals: "published" } },
      ],
    },
  });

  return docs[0] ?? null;
}

export async function generateMetadata({ params }: Args): Promise<Metadata> {
  const { slug } = await params;
  const study = await getPublishedCaseStudy(slug);

  if (!study) {
    return { title: "Case study not found | Grand River Labs" };
  }

  return {
    title: `${study.metaTitle || study.title} | Grand River Labs`,
    description: study.metaDescription || study.excerpt || undefined,
  };
}

export default async function CaseStudyPage({ params }: Args) {
  const { slug } = await params;
  const turnstileSiteKey = process.env.TURNSTILE_SITE_KEY?.trim() ?? "";
  const study = await getPublishedCaseStudy(slug);

  if (!study) notFound();

  const image = isMedia(study.featuredImage) ? study.featuredImage : null;

  return (
    <div id="top">
      <SiteHeader />
      <main>
        <article>
          <header className="section blog-hero">
            <div className="shell blog-post__header">
              <p className="eyebrow">
                <Link href="/case-studies">Case studies</Link>
              </p>
              <h1 className="section-heading case-study-header__headline">
                {study.title}
              </h1>
              {study.clientLabel ? (
                <p className="case-study-header__client">{study.clientLabel}</p>
              ) : null}
              {study.resultStat ? (
                <p className="case-study-stat case-study-header__stat">
                  <span className="case-study-stat__value">{study.resultStat}</span>
                  {study.resultLabel ? (
                    <span className="case-study-stat__label">{study.resultLabel}</span>
                  ) : null}
                  {study.resultDetail ? (
                    <span className="case-study-stat__detail">{study.resultDetail}</span>
                  ) : null}
                </p>
              ) : null}
            </div>
          </header>

          {image?.url ? (
            <div className="shell">
              <div className="blog-post__media">
                <Image
                  src={mediaImageSrc(image.url)}
                  alt={image.alt || study.title}
                  width={image.width ?? 1600}
                  height={image.height ?? 900}
                  sizes="(min-width: 900px) 48rem, 100vw"
                  priority
                />
              </div>
            </div>
          ) : null}

          <div className="section blog-post__body">
            <div className="shell blog-content">
              {study.content ? (
                <RichText data={study.content as SerializedEditorState} />
              ) : null}
            </div>
          </div>
        </article>
        <ContactSection
          turnstileSiteKey={turnstileSiteKey}
          variant="cta"
          eyebrow="Let's look at yours"
          heading="Walk through the audit."
          copy="If you are running a portfolio of brands — or one site you suspect has the same problem — send a note. We'll get back within two business days."
          messageLabel="What should we look at?"
          messagePlaceholder="The brands, the sites, or the number that isn't moving."
        />
      </main>
      <SiteFooter />
    </div>
  );
}
