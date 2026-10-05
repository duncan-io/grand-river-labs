import { renderInline } from "@/components/inline-links";
import { BOOK_CALL_HREF } from "@/lib/site";
import { DepartmentHeroScene } from "./department-hero-scene";
import { niches } from "./niches";
import {
  DepartmentOwnershipScene,
  OwnershipGapScene,
  ServiceIcon,
} from "./ownership-scenes";
import { Arrow } from "./site-header";

export function NichePage({
  content,
}: {
  content: (typeof niches)[number];
}) {
  return (
    <>
      <section className="mkt-hero fdd-hero">
        <DepartmentHeroScene />
        <div className="shell">
          <div className="mkt-hero__content fdd-hero__content">
            <p className="eyebrow">{content.hero.eyebrow}</p>
            <h1 className="mkt-hero__headline">{content.hero.headline}</h1>
            <p className="mkt-hero__copy">{content.hero.copy}</p>
            <div className="mkt-hero__actions">
              <a
                className="button button-primary"
                href={BOOK_CALL_HREF}
                target="_blank"
                rel="noopener noreferrer"
              >
                {content.hero.primaryLabel}
                <Arrow />
              </a>
              <a
                className="button button-secondary"
                href={content.hero.secondaryHref}
              >
                {content.hero.secondaryLabel}
                <Arrow />
              </a>
            </div>
          </div>
        </div>
        <a className="mkt-hero__cue" href="#lead-flow">
          {content.hero.cueLabel}
        </a>
      </section>

      <section className="section ws-friction fwd-gap" id="lead-flow">
        <div className="shell">
          <div className="ws-friction__top reveal">
            <div className="ws-friction__intro">
              <p className="eyebrow">{content.gap.eyebrow}</p>
              <h2 className="section-heading">{content.gap.heading}</h2>
              <p className="section-copy">{content.gap.copy}</p>
            </div>
            <OwnershipGapScene labels={content.gap.sceneLabels} />
          </div>
          <div className="ws-friction__grid reveal">
            {content.gap.items.map((item, index) => (
              <article className="ws-friction__cell" key={item.title}>
                <span className="ws-friction__number">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <h3>{item.title}</h3>
                <p>{item.copy}</p>
              </article>
            ))}
          </div>
          <p className="fdd-problem__insight reveal">{content.gap.callout}</p>
        </div>
      </section>

      <section className="section fwd-services" id="engine">
        <div className="shell">
          <div className="fwd-services__top reveal">
            <div className="fwd-services__intro">
              <p className="eyebrow">{content.engine.eyebrow}</p>
              <h2 className="section-heading">{content.engine.heading}</h2>
              <p className="section-copy">{renderInline(content.engine.copy)}</p>
            </div>
            <DepartmentOwnershipScene nodes={content.engine.sceneNodes} />
          </div>
          <div className="fwd-services__grid reveal">
            {content.engine.cards.map((item) => (
              <article className="fwd-services__card" key={item.title}>
                <span className="fwd-services__icon" aria-hidden="true">
                  <ServiceIcon label={item.icon} />
                </span>
                <span className="fwd-services__label">{item.label}</span>
                <h3>{item.title}</h3>
                <p>{renderInline(item.copy)}</p>
              </article>
            ))}
          </div>
          <p className="fwd-services__also reveal">
            <span className="fwd-services__also-label">{content.engine.also.label}</span>
            {renderInline(content.engine.also.copy)}
          </p>
        </div>
      </section>

      <section className="section fwd-peace" id="why-fractional">
        <div className="shell">
          <div className="fwd-peace__top reveal">
            <div>
              <p className="eyebrow">{content.peace.eyebrow}</p>
              <h2 className="section-heading">{content.peace.heading}</h2>
            </div>
            <p className="section-copy">{renderInline(content.peace.copy)}</p>
          </div>
          <div className="fwd-peace__paths reveal">
            {content.peace.paths.map((path) => (
              <article className="fwd-peace__path" key={path.title}>
                <h3>{path.title}</h3>
                <p>{path.copy}</p>
              </article>
            ))}
          </div>
          <div className="fwd-peace__cms reveal">
            <p className="fwd-peace__cms-lead">{content.peace.promisesLead}</p>
            <ul className="fwd-peace__cms-list">
              {content.peace.promises.map((name) => (
                <li key={name}>{name}</li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="section fdd-faq" id="faq">
        <div className="shell">
          <div className="fdd-faq__top reveal">
            <div>
              <p className="eyebrow">{content.faq.eyebrow}</p>
              <h2 className="section-heading">{content.faq.heading}</h2>
            </div>
          </div>
          <div className="fdd-faq__list reveal">
            {content.faq.items.map((item) => (
              <details className="fdd-faq__item" key={item.question}>
                <summary>{item.question}</summary>
                <p>{renderInline(item.answer)}</p>
              </details>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

export function NicheStrip() {
  return (
    <section className="section industry-strip" id="by-industry">
      <div className="shell">
        <div className="industry-strip__top reveal">
          <div>
            <p className="eyebrow">By industry</p>
            <h2 className="section-heading">Built for your trade.</h2>
          </div>
          <p className="section-copy">
            Same fractional model, tuned to how leads actually come in for your
            industry.
          </p>
        </div>
        <div className="industry-strip__grid reveal">
          {niches.map((item) => (
            <a
              className="industry-strip__tile"
              href={`/fractional-digital-department/${item.slug}`}
              key={item.slug}
            >
              <span className="industry-strip__media">
                {item.image ? (
                  <img
                    className="industry-strip__image"
                    src={item.image}
                    alt={item.tileName}
                  />
                ) : null}
              </span>
              <span className="industry-strip__body">
                <span className="industry-strip__name">{item.tileName}</span>
                <span className="industry-strip__blurb">{item.tileBlurb}</span>
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
