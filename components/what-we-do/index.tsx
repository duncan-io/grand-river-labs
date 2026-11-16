import { BookCallLink } from "../book-call-link";
import Link from "next/link";
import { renderInline } from "@/components/inline-links";
import { IndustryStrip } from "../industry-use-case";
import { Arrow } from "../icons";
import { WhiteGloveEngagement } from "../white-glove-engagement";
import "./what-we-do.css";
import { services, integration } from "./content";
import { ServiceMotif } from "./motif";
import { WhatWeDoScene } from "./scene";

export function WhatWeDoSections() {
  return (
    <>
      <section className="what-we-do-hero">
        <WhatWeDoScene />
        <div className="shell">
          <div className="what-we-do-hero__content">
            <p className="eyebrow">Automation and AI</p>
            
            <h1 className="what-we-do-hero__headline">
              Automate the busywork between the tools you already trust.
            </h1>
            <p className="what-we-do-hero__copy">
              A lever your fractional marketing director pulls: we scope and
              prioritize the work against everything else, build the small
              lead-flow automations ourselves, and hand larger builds to a
              vendor whose work we then{" "}
              <Link className="inline-link" href="/automation-consulting">
                scope and verify from discovery on
              </Link>
              —so you reclaim time and cost without a rip-and-replace.
            </p>
            <div className="what-we-do-hero__actions">
              <BookCallLink
                className="button button-primary"
              >
                Book a call
                <Arrow />
              </BookCallLink>
              <a className="button button-secondary" href="#contact">
                Contact us
                <Arrow />
              </a>
            </div>
          </div>
        </div>
        <a className="what-we-do-hero__cue" href="#services">
          Explore services
        </a>
      </section>

      <section className="section what-we-do-services" id="services">
        <div className="shell">
          <div className="what-we-do-services__top reveal">
            <div>
              <p className="eyebrow">The work</p>
              <h2 className="section-heading">
                Four ways we help you move faster.
              </h2>
            </div>
            <p className="section-copy">
              Automation is one lever. Whether it&apos;s the right one right
              now depends on everything else—that&apos;s what the{" "}
              <Link className="inline-link" href="/fractional-marketing-director">
                fractional marketing director
              </Link>{" "}
              figures out.
            </p>
          </div>
          <div className="what-we-do-services__grid reveal">
            {services.map((item, index) => (
              <Link
                className="what-we-do-service"
                href={item.href}
                key={item.title}
              >
                <div className="what-we-do-service__visual">
                  <ServiceMotif variant={item.motif} />
                </div>
                <div className="what-we-do-service__body">
                  <span className="what-we-do-service__number">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <h3>{item.title}</h3>
                  <p>{item.copy}</p>
                  <span className="what-we-do-service__explore">
                    Explore
                    <Arrow />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="section what-we-do-integrate" id="integrate">
        <div className="shell">
          <div className="what-we-do-integrate__intro reveal">
            <p className="eyebrow">Systems integration</p>
            <div>
              <h2 className="section-heading">
                Connect what you have. Speed up what you do.
              </h2>
              <p className="section-copy">
                Automation should fit into your business—not force your business
                to fit into automation. We plug into the tools your team already
                relies on and turn friction into flow. See how this plays out
                for{" "}
                <Link className="inline-link" href="/use-cases/accounting">
                  accounting firms
                </Link>{" "}
                and{" "}
                <Link className="inline-link" href="/use-cases/home-services">
                  home services
                </Link>
                .
              </p>
            </div>
          </div>
          <div className="what-we-do-integrate__points reveal">
            {integration.map((item) => (
              <article className="what-we-do-point" key={item.number}>
                <span className="what-we-do-point__number">{item.number}</span>
                <h3>{item.title}</h3>
                <p>{renderInline(item.copy)}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <WhiteGloveEngagement />

      <IndustryStrip headingAs="h2" />
    </>
  );
}
