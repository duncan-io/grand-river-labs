import { BookCallLink } from "./book-call-link";
import { testimonials } from "@/lib/testimonials";
import { Arrow } from "./site-header";

const featuredCaseStudy = {
  href: "/case-studies/38-hvac-brand-sites",
  stat: "+78%",
  label: "Organic leads, year over year",
  client: "Midwest HVAC consolidator · 38 brands",
  summary:
    "Ownership, one content strategy run across every brand, and conversion work on the pages that already had traffic.",
};

const results = [
  {
    label: "Find where leads leak",
    href: "/lead-leak-audit",
  },
  {
    label: "Know what's actually working",
    href: "/analytics",
  },
  {
    label: "Vendors held to the plan",
    href: "#leadership",
  },
];

const decisions = [
  {
    title: "Patching lead leaks",
    copy: "Missed calls, broken forms, slow follow-up, bad routing. The marketing did its job — the lead still never became a conversation. We find and fix those.",
  },
  {
    title: "Verifying what's working",
    copy: "Tracking, attribution, and vendor reports checked against CRM reality — so decisions rest on what actually showed up, not what a dashboard claims.",
  },
  {
    title: "Holistic marketing advisory",
    copy: "Where the budget goes, which channels earn a place, and what to say no to — with the whole picture in one head instead of a stack of channel reports.",
  },
  {
    title: "Managing vendors",
    copy: "Agencies, media buyers, and SEO shops held to the plan: scoped fairly, reported honestly, and replaced when they stop earning their place.",
  },
];

const services = [
  {
    title: "SEO",
    href: "/search-engine-optimization",
    copy: "Whether SEO is actually working, what to ask of whoever does it, and which pages are worth writing — strategy and oversight, not production.",
  },
  {
    title: "Paid ads & Local Services Ads",
    href: "/local-ads",
    copy: "What to fund, pause, or dispute — and whether the leads the platforms report ever show up in your CRM.",
  },
  {
    title: "Google Business Profile",
    href: "/google-business-profile",
    copy: "The map result checked against the work you want: categories, services, reviews, and whether calls from it are even tracked.",
  },
  {
    title: "Analytics & attribution",
    href: "/analytics",
    copy: "Measurement you can trust — which channels actually produce leads and revenue, including which calls came from the site, the map listing, and other profiles.",
  },
  {
    title: "Conversion rate optimization",
    href: "/conversion-rate-optimization",
    copy: "More of the visitors you already have become qualified leads, without buying more traffic.",
  },
  {
    title: "Automation & lead routing",
    href: "/marketing-automation",
    copy: "Every inquiry gets a next step and reaches the person who can act, while the lead is still warm.",
  },
];

const processSteps = [
  {
    title: "Audit",
    copy: "We audit tracking, forms, calls, routing, and vendor reports together, then show you where leads and revenue leak — ranked by what each leak costs.",
    artifact: "A leak map, ranked by what it's costing you.",
    roles: "You bring the context; we own the audit.",
  },
  {
    title: "Decide",
    copy: "We make the call on what gets funded, paused, or fixed next — ranked by what will move revenue, not by whichever request is loudest.",
    artifact: "A now / next / later list, with the call already made.",
    roles: "We own the recommendation; you have the final say.",
  },
  {
    title: "Verify",
    copy: "Leaks get patched — tracking, routing, forms, tests by us; channel work by your team or vendors — then we measure what moved and adjust the next decision.",
    artifact: "Fixes live in production, measured against the decision.",
    roles: "Your team or vendors ship; we verify it moved the number.",
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

export function FeaturedCaseStudy() {
  return (
    <section className="featured-study" aria-label="Featured case study">
      <div className="shell featured-study__layout">
        <p className="case-study-stat">
          <span className="case-study-stat__value">{featuredCaseStudy.stat}</span>
          <span className="case-study-stat__label">{featuredCaseStudy.label}</span>
        </p>
        <div>
          <p className="featured-study__client">{featuredCaseStudy.client}</p>
          <p className="featured-study__summary">{featuredCaseStudy.summary}</p>
          <a className="featured-study__more" href={featuredCaseStudy.href}>
            Read the case study
            <Arrow />
          </a>
        </div>
      </div>
    </section>
  );
}

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
            <p className="eyebrow">What we do</p>
            <h2 className="section-heading">Answers, not more marketing.</h2>
          </div>
          <p className="section-copy">
            Four things, one advisor. We&apos;re not another channel vendor —
            we&apos;re the check on all of them. You keep the final say.
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
            <p className="eyebrow">Where we look</p>
            <h2 className="section-heading">Every channel, checked.</h2>
          </div>
          <p className="section-copy">
            We audit, advise, and hold vendors accountable across all of it —
            so spend follows what produces leads and revenue, not last
            quarter&apos;s habit.
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
          <a href="/marketing-advisory">
            Learn more about marketing advisory →
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
            <a href="/work">See the work →</a>
          </p>
        </div>
      </div>

      <div className="shell">
        <ul className="testimonials__grid reveal">
          {testimonials.map((item) => (
            <li key={item.name}>
              <blockquote className="testimonial">
                <span className="testimonial__mark" aria-hidden="true">
                  “
                </span>
                <p className="testimonial__quote">{item.quote}</p>
                <footer className="testimonial__attribution">
                  <cite className="testimonial__name">{item.name}</cite>
                  <span className="testimonial__role">{item.role}</span>
                </footer>
              </blockquote>
            </li>
          ))}
        </ul>
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
            <h2 className="section-heading">Find it, fix it, prove it.</h2>
          </div>
          <p className="section-copy">
            You bring the business context. We audit, decide, and verify — so
            the plan is a set of calls that actually get made and checked, not
            another slide deck.
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
            <BookCallLink
              className="button button-primary"
            >
              Book a call
              <Arrow />
            </BookCallLink>
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
