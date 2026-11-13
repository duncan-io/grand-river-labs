import { BookCallLink } from "./book-call-link";
import { testimonials } from "@/lib/testimonials";
import { industriesNav } from "./what-we-do-nav";
import { Arrow } from "./site-header";

const featuredCaseStudy = {
  href: "/case-studies/38-hvac-brand-sites",
  stat: "+78%",
  label: "Organic leads, year over year",
  client: "Midwest HVAC consolidator · 38 brands",
  summary:
    "Ownership, one content strategy run across every brand, and conversion work on the pages that already had traffic.",
};

const decisions = [
  {
    title: "Directing the marketing",
    href: "/fractional-marketing-director",
    copy: "Where the budget goes, which channels earn a place, and what to say no to — one director owning the whole picture instead of a stack of channel reports.",
  },
  {
    title: "Managing vendors",
    href: "/fractional-marketing-director#the-gap",
    copy: "Agencies, media buyers, and SEO shops held to the plan: scoped fairly, reported honestly, and replaced when they stop earning their place.",
  },
  {
    title: "Verifying what's working",
    href: "/lead-system",
    copy: "Tracking, attribution, and vendor reports checked against CRM reality — so decisions rest on what actually showed up, not what a dashboard claims.",
  },
  {
    title: "Patching lead leaks",
    href: "/lead-leak-audit",
    copy: "Missed calls, broken forms, slow follow-up, bad routing. The marketing did its job — the lead still never became a conversation. We find and fix those.",
  },
];

const services = [
  {
    title: "SEO",
    href: "/search-engine-optimization",
    copy: "Whether SEO is actually working, which pages are worth writing, and what to fix first — checked against real leads.",
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
    title: "Lead Monitoring System",
    href: "/lead-system",
    copy: "A custom system built into the tools you already use — real lead counts, cost per lead and per booked job, and every vendor measured on the same numbers.",
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
    title: "Patch",
    copy: "We fix tracking, routing, forms, and automations, and run conversion tests.",
    artifact: "Leaks patched in production, with the plan for the rest.",
    roles: "We ship the fixes and check they held.",
  },
  {
    title: "Verify",
    copy: "We reconcile every vendor report against what actually showed up in the CRM, measure what moved, and make the next call — fund, pause, or dispute.",
    artifact: "A verified read on what moved, and the next call made.",
    roles: "We verify the numbers; you keep the final say.",
  },
];

const industryNotes: Record<
  (typeof industriesNav)[number]["href"],
  string
> = {
  "/home-improvement-marketing": "Established home improvement companies.",
  "/remodeling-marketing": "Design-build remodelers.",
  "/fractional-marketing-director/roofing": "Roofers running Local Services Ads.",
  "/fractional-marketing-director/contractors":
    "Trades and specialty contractors.",
};

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

export function LeadershipSection() {
  return (
    <section className="section services" id="leadership">
      <div className="shell">
        <div className="services__top reveal">
          <div>
            <p className="eyebrow">What your director does</p>
            <h2 className="section-heading">Owns the plan. Checks the work.</h2>
          </div>
          <p className="section-copy">
            One senior person who owns your marketing — not another channel
            vendor, but the check on all of them. You keep the final say.
          </p>
        </div>

        <ul className="services__grid reveal">
          {decisions.map((item) => (
            <li className="services__item" key={item.title}>
              <h3>
                <a href={item.href}>{item.title}</a>
              </h3>
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
            <p className="eyebrow">What the director oversees</p>
            <h2 className="section-heading">Every channel, checked.</h2>
          </div>
          <p className="section-copy">
            The director audits, directs, and holds vendors accountable across
            all of it — so spend follows what produces leads and revenue, not
            last quarter&apos;s habit.
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
          <a href="/fractional-marketing-director">
            Learn how the fractional director works →
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
          <h2 className="testimonials__heading">Less noise. Better calls.</h2>
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
            Month one is an audit. After that, it&apos;s a monthly rhythm: fix
            what&apos;s ours, verify what moved, and make the next call — not
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
            <p className="eyebrow">Who we work with</p>
            <h2 className="section-heading">
              Built for lead-driven businesses.
            </h2>
          </div>
          <p className="section-copy">
            Home services is where we&apos;re deepest. The work is the same
            wherever a single inquiry can be worth thousands — law firms and
            other lead-driven businesses included.
          </p>
        </div>

        <ul className="use-cases-strip__list reveal">
          {industriesNav.map((item) => (
            <li key={item.href}>
              <a href={item.href}>
                <span className="use-cases-strip__title">{item.label}</span>
                <span className="use-cases-strip__copy">
                  {industryNotes[item.href]}
                </span>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
