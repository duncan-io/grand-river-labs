import { BOOK_CALL_HREF } from "@/lib/site";
import { Arrow } from "./site-header";
import type { IndustryContent } from "./industries";
import { industries } from "./industries";

export function IndustryUseCase({ content }: { content: IndustryContent }) {
  return (
    <>
      <section className="section industry-hero">
        <div className="shell industry-hero__content reveal">
          <p className="eyebrow">{content.industry}</p>
          <h1 className="section-heading industry-hero__headline">
            {content.headline}
          </h1>
          <p className="section-copy industry-hero__copy">{content.copy}</p>
          <div className="industry-hero__actions">
            <a className="button button-primary" href="/#contact">
              Tell us what&apos;s slowing you down
              <Arrow />
            </a>
            <a
              className="button button-secondary"
              href={BOOK_CALL_HREF}
              target="_blank"
              rel="noopener noreferrer"
            >
              Book a call
              <Arrow />
            </a>
          </div>
        </div>
      </section>

      <section className="section industry-drains">
        <div className="shell">
          <div className="industry-drains__top reveal">
            <div>
              <p className="eyebrow">{content.drainsEyebrow}</p>
              <h2 className="section-heading">{content.drainsHeading}</h2>
            </div>
            <p className="section-copy">{content.drainsIntro}</p>
          </div>
          <div className="industry-list reveal">
            {content.drains.map((item, index) => (
              <article className="industry-row" key={item.title}>
                <span className="industry-row__number">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <h3>{item.title}</h3>
                <p>{item.copy}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section industry-wins">
        <div className="shell">
          <div className="industry-wins__top reveal">
            <div>
              <p className="eyebrow">{content.winsEyebrow}</p>
              <h2 className="section-heading">{content.winsHeading}</h2>
            </div>
            <p className="section-copy">{content.winsIntro}</p>
          </div>
          <div className="industry-list reveal">
            {content.wins.map((item, index) => (
              <article className="industry-row" key={item.title}>
                <span className="industry-row__number">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <h3>{item.title}</h3>
                <p>{item.copy}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section industry-how">
        <div className="shell">
          <div className="industry-how__top reveal">
            <div>
              <p className="eyebrow">How we work</p>
              <h2 className="section-heading">{content.howHeading}</h2>
            </div>
            <p className="section-copy">{content.howCopy}</p>
          </div>
          <div className="industry-how__steps reveal">
            {content.howSteps.map((step, index) => (
              <article className="industry-how__step" key={step.title}>
                <span className="industry-how__number">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <h3>{step.title}</h3>
                <p>{step.copy}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

export function IndustryStrip({
  headingAs = "h1",
}: {
  headingAs?: "h1" | "h2";
}) {
  const Heading = headingAs;

  return (
    <section className="section industry-strip" id="by-industry">
      <div className="shell">
        <div className="industry-strip__top reveal">
          <div>
            <p className="eyebrow">By industry</p>
            <Heading className="section-heading">See it in your world.</Heading>
          </div>
          <p className="section-copy">
            Same idea—hours back, fewer handoffs—told through the work your
            team already does.
          </p>
        </div>
        <div className="industry-strip__grid reveal">
          {industries.map((item) => (
            <a
              className="industry-strip__tile"
              href={`/use-cases/${item.slug}`}
              key={item.slug}
            >
              <span className="industry-strip__media">
                {item.image ? (
                  <img
                    className="industry-strip__image"
                    src={item.image}
                    alt={item.industry}
                  />
                ) : null}
              </span>
              <span className="industry-strip__body">
                <span className="industry-strip__name">{item.industry}</span>
                <span className="industry-strip__blurb">{item.headline}</span>
                <span className="industry-strip__arrow" aria-hidden="true">
                  <Arrow />
                </span>
              </span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
