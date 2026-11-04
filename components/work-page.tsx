import Image from "next/image";
import Link from "next/link";
import { testimonials } from "@/lib/testimonials";
import { isMedia, mediaImageSrc } from "@/lib/media";
import type { CaseStudy } from "@/payload-types";
import { Arrow } from "./site-header";

// Named orgs come from testimonial roles ("Owner · Paint To Life"); studies
// contribute their anonymous client descriptor.
function clientNames(studies: CaseStudy[]) {
  const names = [
    ...testimonials.map((item) => item.role.split(" · ").at(-1)?.trim()),
    ...studies.map((study) => study.clientLabel?.trim()),
  ].filter((name): name is string => Boolean(name));

  return [...new Set(names)];
}

function studyHref(study: CaseStudy) {
  return `/case-studies/${study.slug}`;
}

function StudyStat({ study }: { study: CaseStudy }) {
  if (!study.resultStat) return null;

  return (
    <p className="case-study-stat">
      <span className="case-study-stat__value">{study.resultStat}</span>
      {study.resultLabel ? (
        <span className="case-study-stat__label">{study.resultLabel}</span>
      ) : null}
      {study.resultDetail ? (
        <span className="case-study-stat__detail">{study.resultDetail}</span>
      ) : null}
    </p>
  );
}

export function WorkPageContent({ studies }: { studies: CaseStudy[] }) {
  const [featured, ...rest] = studies;
  const headline = studies.find((study) => study.resultStat);
  const clients = clientNames(studies);
  const [leadQuote, ...otherQuotes] = testimonials;
  const featuredImage =
    featured && isMedia(featured.featuredImage) ? featured.featuredImage : null;

  return (
    <>
      <section className="work-hero">
        <div className="shell work-hero__layout">
          <div className="work-hero__content">
            <p className="eyebrow">Proof</p>
            <h1 className="section-heading work-hero__headline">
              Work that moved the number.
            </h1>
            <p className="section-copy work-hero__copy">
              What was broken, what we changed, and what the owners we worked
              with say about it.
            </p>
          </div>
          {headline ? (
            <Link className="work-hero__stat" href={studyHref(headline)}>
              <span className="work-hero__stat-value">{headline.resultStat}</span>
              {headline.resultLabel ? (
                <span className="work-hero__stat-label">
                  {headline.resultLabel}
                </span>
              ) : null}
              {headline.clientLabel ? (
                <span className="work-hero__stat-client">
                  {headline.clientLabel}
                </span>
              ) : null}
            </Link>
          ) : null}
        </div>
      </section>

      {clients.length > 0 ? (
        <section className="work-clients" aria-label="Clients">
          <div className="shell work-clients__layout">
            <p className="work-clients__label">Worked with</p>
            <ul className="work-clients__list">
              {clients.map((name) => (
                <li key={name}>{name}</li>
              ))}
            </ul>
          </div>
        </section>
      ) : null}

      <section className="section work-studies" aria-label="Case studies">
        <div className="shell">
          <div className="work-section__intro reveal">
            <p className="eyebrow">Case studies</p>
            <h2 className="section-heading">The problem, the work, the number.</h2>
          </div>

          {featured ? (
            <article
              className={
                featuredImage?.url
                  ? "work-feature reveal"
                  : "work-feature work-feature--text reveal"
              }
            >
              {featuredImage?.url ? (
                <Link className="work-feature__media" href={studyHref(featured)}>
                  <Image
                    src={mediaImageSrc(featuredImage.url)}
                    alt={featuredImage.alt || featured.title}
                    fill
                    sizes="(min-width: 900px) 40rem, 100vw"
                  />
                </Link>
              ) : null}
              <div className="work-feature__body">
                <StudyStat study={featured} />
                {featured.clientLabel ? (
                  <p className="case-study-card__client">{featured.clientLabel}</p>
                ) : null}
                <h3 className="work-feature__title">
                  <Link href={studyHref(featured)}>{featured.title}</Link>
                </h3>
                {featured.excerpt ? (
                  <p className="work-feature__excerpt">{featured.excerpt}</p>
                ) : null}
                <Link className="work-feature__more" href={studyHref(featured)}>
                  Read the case study
                  <Arrow />
                </Link>
              </div>
            </article>
          ) : (
            <p className="blog-empty">No case studies yet. Check back soon.</p>
          )}

          {rest.length > 0 ? (
            <div className="work-more">
              <h3 className="work-more__heading">More of the work</h3>
              <ul className="case-study-grid">
                {rest.map((study) => {
                  const image = isMedia(study.featuredImage)
                    ? study.featuredImage
                    : null;
                  return (
                    <li key={study.id}>
                      <article className="case-study-card">
                        {image?.url ? (
                          <Link
                            className="blog-card__media-link"
                            href={studyHref(study)}
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
                          href={studyHref(study)}
                        >
                          <StudyStat study={study} />
                          {study.clientLabel ? (
                            <p className="case-study-card__client">
                              {study.clientLabel}
                            </p>
                          ) : null}
                          <h4 className="case-study-card__title">{study.title}</h4>
                          {study.excerpt ? (
                            <p className="case-study-card__excerpt">
                              {study.excerpt}
                            </p>
                          ) : null}
                          <span className="case-study-card__more">
                            Read the study
                          </span>
                        </Link>
                      </article>
                    </li>
                  );
                })}
              </ul>
            </div>
          ) : null}
        </div>
      </section>

      {leadQuote ? (
        <section className="section work-voices" id="testimonials">
          <div className="shell">
            <div className="work-section__intro reveal">
              <p className="eyebrow">From clients</p>
              <h2 className="section-heading">
                What it&apos;s like to work with us.
              </h2>
            </div>

            <figure className="work-voices__lead reveal">
              {leadQuote.highlight ? (
                <p className="work-voices__highlight">
                  “{leadQuote.highlight}”
                </p>
              ) : null}
              <blockquote className="work-voices__quote">
                <p>{leadQuote.quote}</p>
              </blockquote>
              <figcaption className="work-voices__attribution">
                <cite>{leadQuote.name}</cite>
                <span>{leadQuote.role}</span>
              </figcaption>
            </figure>

            {otherQuotes.length > 0 ? (
              <ul className="work-voices__grid reveal">
                {otherQuotes.map((item) => (
                  <li key={item.name}>
                    <figure className="work-voices__card">
                      {item.highlight ? (
                        <p className="work-voices__card-highlight">
                          “{item.highlight}”
                        </p>
                      ) : null}
                      <blockquote className="work-voices__card-quote">
                        <p>{item.quote}</p>
                      </blockquote>
                      <figcaption className="work-voices__attribution">
                        <cite>{item.name}</cite>
                        <span>{item.role}</span>
                      </figcaption>
                    </figure>
                  </li>
                ))}
              </ul>
            ) : null}
          </div>
        </section>
      ) : null}
    </>
  );
}
