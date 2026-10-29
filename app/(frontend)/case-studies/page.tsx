import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ContactSection } from "@/components/contact";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { getPayloadClient } from "@/lib/get-payload";
import { isMedia, mediaImageSrc } from "@/lib/media";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Case studies | Grand River Labs",
  description:
    "Specific examples of digital work: what was broken, what changed, and the lead result that followed.",
};

export default async function CaseStudiesPage() {
  const turnstileSiteKey = process.env.TURNSTILE_SITE_KEY?.trim() ?? "";
  const payload = await getPayloadClient();
  const { docs: studies } = await payload.find({
    collection: "case-studies",
    depth: 1,
    limit: 24,
    sort: "-publishedAt",
    where: {
      _status: {
        equals: "published",
      },
    },
  });

  return (
    <div id="top">
      <SiteHeader />
      <main>
        <section className="section blog-hero">
          <div className="shell blog-hero__content">
            <p className="eyebrow">The work</p>
            <h1 className="section-heading blog-hero__headline">Case studies</h1>
            <p className="section-copy blog-hero__copy">
              Specific examples: the problem, the order of the work, and the
              number the owner of the business actually cares about.
            </p>
          </div>
        </section>

        <section className="section case-study-index" aria-label="Case studies">
          <div className="shell">
            {studies.length === 0 ? (
              <p className="blog-empty">No case studies yet. Check back soon.</p>
            ) : (
              <ul className="case-study-grid">
                {studies.map((study) => {
                  const image = isMedia(study.featuredImage)
                    ? study.featuredImage
                    : null;
                  return (
                    <li key={study.id}>
                      <article className="case-study-card">
                        {image?.url ? (
                          <Link
                            className="blog-card__media-link"
                            href={`/case-studies/${study.slug}`}
                          >
                            <div className="blog-card__media">
                              <Image
                                src={mediaImageSrc(image.url)}
                                alt={image.alt || study.title}
                                fill
                                sizes="(min-width: 800px) 50vw, 100vw"
                              />
                            </div>
                          </Link>
                        ) : null}
                        <Link
                          className="case-study-card__link"
                          href={`/case-studies/${study.slug}`}
                        >
                          {study.resultStat ? (
                            <p className="case-study-stat">
                              <span className="case-study-stat__value">
                                {study.resultStat}
                              </span>
                              {study.resultLabel ? (
                                <span className="case-study-stat__label">
                                  {study.resultLabel}
                                </span>
                              ) : null}
                            </p>
                          ) : null}
                          {study.clientLabel ? (
                            <p className="case-study-card__client">
                              {study.clientLabel}
                            </p>
                          ) : null}
                          <h2 className="case-study-card__title">{study.title}</h2>
                          {study.excerpt ? (
                            <p className="case-study-card__excerpt">{study.excerpt}</p>
                          ) : null}
                          <span className="case-study-card__more">Read the study</span>
                        </Link>
                      </article>
                    </li>
                  );
                })}
              </ul>
            )}
          </div>
        </section>
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
