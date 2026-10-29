import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ContactSection } from "@/components/contact";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { TestimonialsPageContent } from "@/components/testimonials-page";
import { getPayloadClient } from "@/lib/get-payload";
import { isMedia, mediaImageSrc } from "@/lib/media";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Work | Grand River Labs",
  description:
    "Case studies and client testimonials: the problem, the work, and the result owners care about.",
};

export default async function WorkPage() {
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
            <p className="eyebrow">Proof</p>
            <h1 className="section-heading blog-hero__headline">Work</h1>
            <p className="section-copy blog-hero__copy">
              Specific examples and what clients say about the work—not vanity
              metrics.
            </p>
          </div>
        </section>

        <section className="section case-study-index" aria-label="Case studies">
          <div className="shell">
            <div className="work-section__intro">
              <p className="eyebrow">Case studies</p>
              <h2 className="section-heading">The problem, the work, the number.</h2>
            </div>
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
                          <h3 className="case-study-card__title">{study.title}</h3>
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

        <div id="testimonials">
          <TestimonialsPageContent showHero={false} />
        </div>

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
