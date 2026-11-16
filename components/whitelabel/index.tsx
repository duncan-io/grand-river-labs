import Link from "next/link";
import { renderInline } from "@/components/inline-links";
import { Arrow } from "../icons";
import "./whitelabel.css";
import { audience, friction, benefits, steps } from "./content";
import { AudienceMotif, BenefitMotif, PartnershipMotif } from "./motifs";
import { WhitelabelScene } from "./scene";

export function WhitelabelSections() {
  return (
    <>
      <section className="whitelabel-hero">
        <WhitelabelScene />
        <div className="shell">
          <div className="whitelabel-hero__content">
            <p className="eyebrow">Your clients are asking for AI</p>
            <p className="whitelabel-hero__brand">Grand River Labs</p>
            <h1 className="whitelabel-hero__headline">
              Offer automation. Keep the client. Skip the stack.
            </h1>
            <p className="whitelabel-hero__copy">
              Clients want{" "}
              <Link
                className="inline-link"
                href="/automation/business-process-automation"
              >
                workflows
              </Link>{" "}
              that save time and money. You keep the relationship and the
              margin. We design, build, and support under your brand—so you
              expand the offer without the stack, the hire, or the delivery
              risk.
            </p>
            <div className="whitelabel-hero__actions">
              <a
                className="button button-primary"
                href="mailto:hello@grandriverlabs.io?subject=White-label%20partnership"
              >
                Talk about partnering
                <Arrow />
              </a>
              <Link className="button button-secondary" href="/#contact">
                Get in touch
                <Arrow />
              </Link>
            </div>
          </div>
        </div>
        <a className="whitelabel-hero__cue" href="#how-it-works">
          See how it works
        </a>
      </section>

      <section className="section whitelabel-audience">
        <div className="shell">
          <div className="whitelabel-audience__top reveal">
            <div>
              <p className="eyebrow">Who it&apos;s for</p>
              <h2 className="section-heading">
                You own the relationship. We bring the delivery.
              </h2>
            </div>
            <p className="section-copy">
              Built for people who already serve clients—and want to{" "}
              <Link className="inline-link" href="/automation">
                add automation
              </Link>{" "}
              without rebuilding their business around it.
            </p>
          </div>
          <div className="whitelabel-personas reveal">
            {audience.map((item) => (
              <article className="whitelabel-persona" key={item.title}>
                <div className="whitelabel-persona__visual">
                  <AudienceMotif variant={item.motif} />
                </div>
                <h3>{item.title}</h3>
                <p>{renderInline(item.copy)}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section whitelabel-friction">
        <div className="shell">
          <div className="whitelabel-friction__top reveal">
            <div>
              <p className="eyebrow">The friction</p>
              <h2 className="section-heading">
                Why doing it yourself usually stalls.
              </h2>
            </div>
            <p className="section-copy">
              <Link className="inline-link" href="/ai-automation">
                Clients ask for AI.
              </Link>{" "}
              The gap isn&apos;t demand—it&apos;s the cost of becoming the team
              that can deliver it.
            </p>
          </div>
          <div className="whitelabel-friction__points reveal">
            {friction.map((item, index) => (
              <article className="whitelabel-point" key={item.title}>
                <span className="whitelabel-point__number">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <h3>{item.title}</h3>
                <p>{item.copy}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section whitelabel-benefits">
        <div className="shell">
          <div className="whitelabel-benefits__top reveal">
            <div>
              <p className="eyebrow">What you get</p>
              <h2 className="section-heading">
                White-label delivery. Your name on the win.
              </h2>
            </div>
            <p className="section-copy">
              Expand what you can sell—without the complexity, the learning
              curve, or a new bench to hire.
            </p>
          </div>
          <div className="whitelabel-benefits__grid reveal">
            {benefits.map((item) => (
              <article className="whitelabel-benefit" key={item.title}>
                <div className="whitelabel-benefit__visual">
                  <BenefitMotif variant={item.motif} />
                </div>
                <h3>{item.title}</h3>
                <p>{renderInline(item.copy)}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section whitelabel-flow" id="how-it-works">
        <div className="shell">
          <div className="whitelabel-flow__top reveal">
            <div>
              <p className="eyebrow">How it works</p>
              <h2 className="section-heading">
                Simple partnership. Clear ownership.
              </h2>
            </div>
            <p className="section-copy">
              You stay close to the client. We handle the work that turns a
              conversation into a working automation.
            </p>
          </div>
          <ol className="whitelabel-flow__journey reveal">
            {steps.map((step, index) => {
              const flipped = index % 2 === 1;
              return (
                <li
                  className={`whitelabel-flow__row${flipped ? " whitelabel-flow__row--flip" : ""}`}
                  key={step.title}
                >
                  <div className="whitelabel-flow__marker" aria-hidden="true">
                    <span className="whitelabel-flow__number">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                  </div>
                  <div className="whitelabel-flow__copy">
                    <h3>{step.title}</h3>
                    <p>{step.copy}</p>
                  </div>
                  <div className="whitelabel-flow__visual">
                    <PartnershipMotif variant={step.motif} />
                  </div>
                </li>
              );
            })}
          </ol>
        </div>
      </section>
    </>
  );
}

export function WhitelabelCta() {
  return (
    <section className="section use-cases-cta">
      <div className="shell use-cases-cta__content reveal">
        <div>
          <p className="eyebrow">Ready when you are</p>
          <h2 className="section-heading">
            Add automation to your offer—without the overhead.
          </h2>
        </div>
        <div className="use-cases-cta__actions">
          <p className="section-copy">
            Tell us who you serve and what clients are asking for. We&apos;ll
            map a practical white-label path from first conversation to
            delivery. Client-facing direction work—the plan, the budget calls,
            the vendor oversight—sits with the{" "}
            <Link href="/fractional-marketing-director">fractional marketing director</Link>.
          </p>
          <div className="use-cases-cta__buttons">
            <a
              className="button button-primary"
              href="mailto:hello@grandriverlabs.io?subject=White-label%20partnership"
            >
              Talk about partnering
              <Arrow />
            </a>
            <Link className="button button-secondary" href="/#contact">
              Get in touch
              <Arrow />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
