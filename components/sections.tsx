import { BOOK_CALL_HREF } from "@/lib/site";
import { testimonials, formatTestimonialName } from "@/lib/testimonials";
import { Arrow } from "./site-header";

const results = [
  {
    label: "More qualified leads",
    href: "/search-engine-optimization",
  },
  {
    label: "A website that earns its keep",
    href: "/website-strategy",
  },
  {
    label: "Attribution you can actually trust",
    href: "/analytics",
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
    copy: "Measurement you can trust, so you know which channels actually produce leads and revenue.",
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
    title: "Discover",
    copy: "We map channels, the site, and measurement together, then show you where leads and revenue leak.",
    artifact: "A map of where leads and revenue leak.",
    roles: "You bring context; we bring the map.",
  },
  {
    title: "Prioritize",
    copy: "Attention goes to what will move revenue now, not to whichever request is loudest.",
    artifact: "A now / next / later list ranked by revenue impact.",
    roles: "You decide; we frame the tradeoffs.",
  },
  {
    title: "Ship & refine",
    copy: "The change goes live — a page, the tracking, or a workflow — then we measure what moved and adjust.",
    artifact: "Work live in production, measured and adjusted.",
    roles: "We ship; you keep using it.",
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

export function ServicesSection() {
  return (
    <section className="section services" id="services">
      <div className="shell">
        <div className="services__top reveal">
          <div>
            <p className="eyebrow">What we own</p>
            <h2 className="section-heading">
              One partner across your highest-priority digital work
            </h2>
          </div>
          <p className="section-copy">
            SEO, the site, ads, analytics, and the routing between them — aimed
            at qualified leads and revenue, not a predetermined monthly menu.
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

function CompoundRiver() {
  return (
    <svg
      className="execution__river"
      aria-hidden="true"
      viewBox="0 0 1600 600"
      preserveAspectRatio="xMidYMid slice"
      fill="none"
    >
      <ellipse
        cx="1280"
        cy="420"
        rx="420"
        ry="220"
        stroke="rgba(5,122,114,0.28)"
        strokeWidth="1.5"
        transform="rotate(-12 1280 420)"
      />
      <ellipse
        cx="1320"
        cy="400"
        rx="280"
        ry="140"
        stroke="rgba(5,122,114,0.2)"
        strokeWidth="1"
        transform="rotate(-18 1320 400)"
      />
      <path
        d="M720 520c180-40 320-28 480 20 140 42 260 48 400 18"
        stroke="rgba(5,122,114,0.34)"
        strokeWidth="36"
        strokeLinecap="round"
      />
      <path
        d="M780 560c160-28 290-18 430 14 110 26 210 30 340 8"
        stroke="rgba(255,255,255,0.72)"
        strokeWidth="18"
        strokeLinecap="round"
      />
      <path
        d="M960 500
          C1040 360, 1100 140, 1220 150
          C1360 162, 1460 380, 1580 530"
        stroke="#057A72"
        strokeWidth="18"
        strokeLinecap="round"
        opacity=".28"
      />
    </svg>
  );
}

export function ExecutionSection() {
  return (
    <section className="section execution" id="execution">
      <CompoundRiver />
      <div className="shell">
        <div className="execution__intro reveal">
          <p className="eyebrow">How the work ships</p>
          <h2 className="section-heading">Execution that compounds.</h2>
          <p className="section-copy">
            Automation is how we deliver speed and accuracy, not what we sell.
            It keeps tracking honest, routes leads while they are still warm,
            and lets the same team ship more of the work that moves revenue.
            The result is a marketing system that compounds, not a stack of
            tools.
          </p>
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
            <h2 className="section-heading">
              Strategy that moves.
            </h2>
          </div>
          <p className="section-copy">
            You bring the business context. We map, prioritize, ship, and
            stay—so the plan compounds instead of becoming another slide deck.
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
