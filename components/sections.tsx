import { BOOK_CALL_HREF } from "@/lib/site";
import { testimonials, formatTestimonialName } from "@/lib/testimonials";
import { Arrow } from "./site-header";

const results = [
  {
    label: "Clear priorities every month",
    href: "/search-engine-optimization",
  },
  {
    label: "Budget going where it works",
    href: "/website-strategy",
  },
  {
    label: "Numbers you can trust",
    href: "/analytics",
  },
];

const decisions = [
  {
    title: "Where the budget goes",
    copy: "What to fund, pause, or cut — so spend follows what produces leads and revenue, not last quarter's habit.",
  },
  {
    title: "Which channels earn a place",
    copy: "Search, ads, the map listing, or something else. Each channel has to justify its seat.",
  },
  {
    title: "What the website's job is",
    copy: "A clear call on what the site is for, and which pages are supposed to win the work.",
  },
  {
    title: "What gets measured",
    copy: "What counts as a lead, what counts as success, and which numbers are safe to decide on.",
  },
  {
    title: "Who else is in the room",
    copy: "Oversight of agencies, vendors, and tools, so outside work serves the plan instead of drifting.",
  },
  {
    title: "What to say no to",
    copy: "The loud request that won't move revenue gets declined, so attention stays on the work that will.",
  },
];

const services = [
  {
    title: "Website management & strategy",
    href: "/website-strategy",
    copy: "A site that converts the traffic you already have, kept current and aimed at revenue instead of sitting still.",
  },
  {
    title: "SEO",
    href: "/search-engine-optimization",
    copy: "More qualified leads from search, on pages and a local presence that keep working after the ads stop.",
  },
  {
    title: "Analytics & attribution",
    href: "/analytics",
    copy: "Measurement you can trust, so you know which channels actually produce leads and revenue—including which calls came from the site, the map listing, and other profiles.",
  },
  {
    title: "Google, Meta & Local Services Ads",
    href: "/local-ads",
    copy: "Clear advice on what to fund, pause, or dispute, so ad spend turns into leads instead of a bigger bill.",
  },
  {
    title: "Google Business Profile",
    href: "/google-business-profile",
    copy: "A map result that matches the work you want, with photos, hours, and a link to a page that can win the job.",
  },
  {
    title: "Conversion rate optimization",
    href: "/conversion-rate-optimization",
    copy: "More of the visitors you already have become qualified leads, without buying more traffic.",
  },
  {
    title: "Marketing automation & lead routing",
    href: "/marketing-automation",
    copy: "Every inquiry gets a next step and reaches the person who can act, while the lead is still warm.",
  },
];

const processSteps = [
  {
    title: "Diagnose",
    copy: "We map channels, the site, and measurement together, then show you where leads and revenue leak.",
    artifact: "A map of where leads and revenue leak.",
    roles: "You bring the context; we own the diagnosis.",
  },
  {
    title: "Decide",
    copy: "We make the call on what gets funded, paused, or done next — ranked by what will move revenue, not by whichever request is loudest.",
    artifact: "A now / next / later list, with the call already made.",
    roles: "We own the recommendation; you have the final say.",
  },
  {
    title: "Ship & review",
    copy: "The change goes live — a page, the tracking, or a workflow — then we measure what moved and adjust the next decision.",
    artifact: "Work live in production, measured against the decision.",
    roles: "We ship and review; you keep the result.",
  },
];

const useCases = [
  {
    title: "Home services",
    href: "/use-cases/home-services",
    copy: "Roofing, decking, and painting.",
  },
  {
    title: "Accounting",
    href: "/use-cases/accounting",
    copy: "Professional services firms.",
  },
  {
    title: "Insurance",
    href: "/use-cases/insurance",
    copy: "Brokerages.",
  },
  {
    title: "Property management",
    href: "/use-cases/property-management",
    copy: "Owners and operators.",
  },
];

export function ResultsBar() {
  return (
    <section className="results-bar" id="results" aria-label="Outcomes">
      <div className="shell">
        <ul className="results-bar__list">
          {results.map((item) => (
            <li key={item.href}>
              <a href={item.href}>
                {item.label}
                <Arrow />
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

export function LeadershipSection() {
  return (
    <section className="section services" id="leadership">
      <div className="shell">
        <div className="services__top reveal">
          <div>
            <p className="eyebrow">What senior leadership looks like</p>
            <h2 className="section-heading">The decisions, owned.</h2>
          </div>
          <p className="section-copy">
            A senior leader accountable for the calls that move the business,
            not a stack of channel reports. You keep the final say.
          </p>
        </div>

        <ul className="services__grid reveal">
          {decisions.map((item) => (
            <li className="services__item" key={item.title}>
              <h3>{item.title}</h3>
              <p>{item.copy}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

export function ServicesSection() {
  return (
    <section className="section services" id="services">
      <div className="shell">
        <div className="services__top reveal">
          <div>
            <p className="eyebrow">Execution included</p>
            <h2 className="section-heading">And the work gets done.</h2>
          </div>
          <p className="section-copy">
            Decisions don&apos;t stall here. The same engagement covers SEO,
            the site, ads, analytics, and the routing between them. Automation
            keeps tracking honest and leads moving while they&apos;re warm, so
            the work compounds instead of sitting in a deck.
          </p>
        </div>

        <ul className="services__grid reveal">
          {services.map((item) => (
            <li className="services__item" key={item.href}>
              <h3>
                <a href={item.href}>{item.title}</a>
              </h3>
              <p>{item.copy}</p>
            </li>
          ))}
        </ul>

        <p className="services__more reveal">
          <a href="/fractional-digital-department">
            Learn more about the fractional digital department →
          </a>
        </p>
      </div>
    </section>
  );
}

export function TestimonialsSection() {
  return (
    <section className="section testimonials" id="testimonials">
      <div className="shell">
        <div className="testimonials__top reveal">
          <p className="eyebrow">From clients</p>
          <h2 className="testimonials__heading">
            Results that feel personal.
          </h2>
          <p className="testimonials__more">
            <a href="/testimonials">All testimonials →</a>
          </p>
        </div>
      </div>

      <div
        className="testimonials__scroller reveal"
        role="region"
        aria-label="Client testimonials"
        tabIndex={0}
      >
        <div className="testimonials__track">
          {testimonials.map((item) => (
            <blockquote className="testimonial" key={item.name}>
              <span className="testimonial__mark" aria-hidden="true">
                “
              </span>
              <p className="testimonial__quote">{item.quote}</p>
              <footer className="testimonial__attribution">
                <cite className="testimonial__name">
                  {formatTestimonialName(item.name)}
                </cite>
                <span className="testimonial__role">{item.role}</span>
              </footer>
            </blockquote>
          ))}
        </div>
      </div>
    </section>
  );
}

export function ProcessSection() {
  return (
    <section className="section process" id="how-we-work">
      <div className="shell">
        <div className="process__top reveal">
          <div>
            <p className="eyebrow">How we work</p>
            <h2 className="section-heading">Decisions, then the work.</h2>
          </div>
          <p className="section-copy">
            You bring the business context. We diagnose, decide, and ship — so
            the plan is a set of calls that get carried out, not another slide
            deck.
          </p>
        </div>

        <ol className="process__cards reveal" aria-label="How we work">
          {processSteps.map((step, index) => (
            <li className="process__card" key={step.title}>
              {index > 0 ? (
                <span className="process__connector" aria-hidden="true">
                  →
                </span>
              ) : null}
              <span className="process__marker">
                <span className="process__number">
                  {String(index + 1).padStart(2, "0")}
                </span>
              </span>
              <h3>{step.title}</h3>
              <p className="process__copy">{step.copy}</p>
              <p className="process__artifact">
                <span className="process__meta-label">What you get</span>
                {step.artifact}
              </p>
              <p className="process__roles">{step.roles}</p>
            </li>
          ))}
        </ol>

        <div className="process__footer reveal">
          <p className="process__loop">
            Then we do it again—same partner, tighter plan.
          </p>
          <div className="process__cta">
            <a
              className="button button-primary"
              href={BOOK_CALL_HREF}
              target="_blank"
              rel="noopener noreferrer"
            >
              Book a call
              <Arrow />
            </a>
            <a className="process__contact-link" href="#contact">
              Or tell us what&apos;s getting in the way →
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

export function UseCaseStrip() {
  return (
    <section className="section use-cases-strip" id="use-cases">
      <div className="shell">
        <div className="use-cases-strip__top reveal">
          <div>
            <p className="eyebrow">Where it fits</p>
            <h2 className="section-heading">Built for how you win work.</h2>
          </div>
          <p className="use-cases-strip__more">
            <a href="/use-cases">All use cases →</a>
          </p>
        </div>

        <ul className="use-cases-strip__list reveal">
          {useCases.map((item) => (
            <li key={item.href}>
              <a href={item.href}>
                <span className="use-cases-strip__title">{item.title}</span>
                <span className="use-cases-strip__copy">{item.copy}</span>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
