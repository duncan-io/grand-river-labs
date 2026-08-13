import { BOOK_CALL_HREF } from "@/lib/site";
import { testimonials, formatTestimonialName } from "@/lib/testimonials";
import { Arrow } from "./site-header";

const processSteps = [
  {
    title: "Discover",
    copy: "Map channels, the site’s job, ops busywork, and where measurement breaks—so we invest where it matters.",
    artifact: "A working session plus a map of the leaks.",
    roles: "You bring context; we bring the map.",
  },
  {
    title: "Prioritize",
    copy: "Decide what deserves attention now vs later, tied to a goal—not the loudest request.",
    artifact: "A short now / next / later list.",
    roles: "You decide; we frame the tradeoffs.",
  },
  {
    title: "Ship & refine",
    copy: "Make a live change—page, tracking, or workflow—watch real use, and feed what we learn into the next cycle.",
    artifact: "Something in production plus a check-in on whether it moved.",
    roles: "We ship; you keep using it.",
  },
];

const promises = [
  {
    label: "Time",
    title: "Save time",
    copy: "Cut hours off repetitive process work—so your team has capacity for higher-value work.",
  },
  {
    label: "Efficiency",
    title: "Increase efficiency",
    copy: "Fewer handoffs, less re-entry, less busywork. Work that moves faster with less friction.",
  },
  {
    label: "Impact",
    title: "Magnify impact",
    copy: "More throughput and results from the same team—productivity that compounds.",
  },
];

const digitalStrategyPillars = [
  {
    label: "Prioritize",
    title: "Channel mix & roadmap",
    copy: "Decide what deserves attention now across website, paid, SEO, email, and social—based on goals, not the loudest request.",
  },
  {
    label: "Website",
    title: "Site’s job in the journey",
    copy: "Clarify what the site must do commercially, which pages matter, and which improvements move the needle.",
  },
  {
    label: "Automate",
    title: "Workflows that free capacity",
    copy: "Take repetitive marketing and ops work off your team's plate—so effort compounds without adding headcount.",
  },
  {
    label: "Measure",
    title: "Analytics & marketing ops",
    copy: "Define the signals, reporting, and handoffs so the next decision is grounded in what actually worked.",
  },
];

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

export function PromiseSection() {
  return (
    <section className="section promise" id="approach">
      <div className="shell">
        <div className="promise__stage reveal">
          <div className="promise__intro">
            <p className="eyebrow">What you get</p>
            <h2 className="section-heading">
              Reclaim hours. Work smarter. Magnify impact.
            </h2>
            <p className="section-copy">
              The point isn&apos;t just less busywork—it&apos;s more output from
              the same team. Automation should fit your business, free your team
              for higher-value work, and compound productivity without a
              rip-and-replace.
            </p>
          </div>

          <div className="promise__outcomes">
            {promises.map((item) => (
              <article className="promise-outcome" key={item.title}>
                <span className="promise-outcome__label">{item.label}</span>
                <h3>{item.title}</h3>
                <p>{item.copy}</p>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export function DigitalStrategySection() {
  return (
    <section className="section home-ws" id="digital-strategy">
      <div className="shell">
        <div className="home-ws__top reveal">
          <div>
            <p className="eyebrow">Fractional Digital Strategy Partner</p>
            <h2 className="section-heading">
              Digital strategy ownership, without the in-house hire.
            </h2>
          </div>
          <p className="section-copy">
            Ongoing guidance across your website, PPC, SEO, email, social
            media, and marketing operations—so every priority connects to a
            goal and earns its place in the plan.
          </p>
        </div>

        <div className="home-ws__grid reveal">
          {digitalStrategyPillars.map((item) => (
            <article className="home-ws__pillar" key={item.title}>
              <span className="home-ws__label">{item.label}</span>
              <h3>{item.title}</h3>
              <p>{item.copy}</p>
            </article>
          ))}
        </div>

        <p className="home-ws__more reveal">
          <a href="/digital-strategy">
            Learn more about our digital strategy partnership →
          </a>
        </p>
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
