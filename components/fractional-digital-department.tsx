import { BOOK_CALL_HREF } from "@/lib/site";
import { testimonials, formatTestimonialName } from "@/lib/testimonials";
import { DepartmentHeroScene } from "./department-hero-scene";
import { Arrow } from "./site-header";

const positioningPoints = [
  {
    title: "Integrate into your process",
    copy: "We plug into how you already operate—not a parallel vendor workflow. Digital work happens without making leadership the project manager.",
  },
  {
    title: "Own the digital side",
    copy: "Website, tools, measurement, and the unnamed backlog have an experienced owner—so they don't wait for a spare hour.",
  },
  {
    title: "Refine, enhance, and consult",
    copy: "Ongoing judgment plus hands-on work: improve what's in place, build what's worth building, and advise on what comes next.",
  },
];

const capabilities = [
  {
    label: "Website",
    title: "Website management",
    copy: "Updates, technical care, UX, conversion improvements, and coordination with other vendors—so the site stays moving.",
  },
  {
    label: "Strategy",
    title: "Strategy & prioritization",
    copy: "Decide what deserves attention now—and what is not worth spending money on—based on the business, not a service list.",
  },
  {
    label: "Systems",
    title: "Systems & automation",
    copy: "Connect tools, improve lead routing and workflows, and remove busywork when automation is the right move.",
  },
  {
    label: "Measure",
    title: "Analytics & growth",
    copy: "Tracking, conversion measurement, local presence, and growth support—applied where it will actually move the business.",
  },
];

const contrastModels = [
  {
    label: "Consultant",
    title: "Tells you what to do.",
    copy: "A recommendation, then you're left to staff it, sequence it, and make it happen.",
    role: "foil",
  },
  {
    label: "Agency",
    title: "Does what you tell them.",
    copy: "They wait for a brief. If you don't already know what to request, the important work never gets named.",
    role: "foil",
  },
  {
    label: "Fractional digital department",
    title: "Does what needs doing.",
    copy: "We look at the business, find the digital work worth doing, and take it on—so you are not the strategist or the project manager.",
    role: "answer",
  },
];

const faqs = [
  {
    question: "Is this right for my business?",
    answer:
      "It's built for owner-led growing businesses that rely on a website, tools, and digital channels—but don't have an experienced person owning that work. If you already have a marketing team, GR Labs can fill digital and technical gaps rather than replace people.",
  },
  {
    question: 'What does "fractional" mean?',
    answer:
      "You get ongoing access to experienced digital leadership without hiring a full-time digital employee. GR Labs works with your business on an ongoing basis and focuses on the highest-priority work.",
  },
  {
    question: "Who will I work with?",
    answer:
      "You work directly with experienced digital leadership—not a rotating account team. When a specialist or an existing vendor is the better fit for a piece of work, GR Labs helps coordinate rather than treating every task as something to keep in-house.",
  },
  {
    question: "How much does it cost?",
    answer:
      "Engagements start at $1,500/month. The monthly investment depends on the scope of work and the priorities we take on. We'll confirm fit and scope on a 30-minute call.",
  },
  {
    question: "Do you only manage websites?",
    answer:
      "No. Website management is a core part of the offering. GR Labs can also help with digital strategy, analytics, automation, integrations, local presence, and technical SEO where those are the right next move. It is not a full-service SEO or marketing agency.",
  },
  {
    question: "Can you work with our existing team and vendors?",
    answer:
      "Yes. GR Labs is designed to complement internal people and existing vendors—coordinating when that makes the work better, not replacing relationships that already work.",
  },
  {
    question: "What happens if we need something outside your capabilities?",
    answer:
      "GR Labs will identify the requirement and, when appropriate, help coordinate with a specialist rather than pretending to be the right provider for every task.",
  },
];

function AreaIcon({ label }: { label: string }) {
  const common = {
    viewBox: "0 0 48 48",
    fill: "none",
    "aria-hidden": true as const,
    className: "fdd-areas__icon-svg",
  };

  switch (label) {
    case "Website":
      return (
        <svg {...common}>
          <rect x="10" y="12" width="28" height="24" rx="3" stroke="currentColor" strokeWidth="1.75" />
          <path d="M10 18h28M16 12v6" stroke="currentColor" strokeWidth="1.75" />
        </svg>
      );
    case "Strategy":
      return (
        <svg {...common}>
          <circle cx="24" cy="24" r="12" stroke="currentColor" strokeWidth="1.75" />
          <path d="M24 16v8l6 3" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" />
        </svg>
      );
    case "Systems":
      return (
        <svg {...common}>
          <circle cx="16" cy="18" r="4" stroke="currentColor" strokeWidth="1.75" />
          <circle cx="32" cy="16" r="4" stroke="currentColor" strokeWidth="1.75" />
          <circle cx="24" cy="32" r="4" stroke="currentColor" strokeWidth="1.75" />
          <path d="M19.5 20.5 22 29M28.5 19.2 26 29" stroke="currentColor" strokeWidth="1.75" />
        </svg>
      );
    default:
      return (
        <svg {...common}>
          <path d="M12 34V22M20 34V16M28 34V26M36 34V12" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" />
        </svg>
      );
  }
}

export function FractionalDigitalDepartmentSections() {
  return (
    <>
      <section className="mkt-hero fdd-hero">
        <DepartmentHeroScene />
        <div className="shell">
          <div className="mkt-hero__content fdd-hero__content">
            <p className="eyebrow">GR Labs</p>
            <h1 className="mkt-hero__headline">
              Your Fractional Digital Department
            </h1>
            <p className="fdd-hero__support">
              Senior digital leadership and hands-on execution—without hiring a
              full-time team.
            </p>
            <p className="mkt-hero__copy">
              For owner-led growing businesses that rely on digital tools but
              don&apos;t have an experienced person owning them. GR Labs takes
              ownership of the highest-priority digital work: website, strategy,
              systems, and measurement.
            </p>
            <div className="mkt-hero__actions">
              <a
                className="button button-primary"
                href={BOOK_CALL_HREF}
                target="_blank"
                rel="noopener noreferrer"
              >
                Book a 30-minute fit call
                <Arrow />
              </a>
              <a className="button button-secondary" href="#how-it-works">
                See how it works
                <Arrow />
              </a>
            </div>
          </div>
        </div>
        <a className="mkt-hero__cue" href="#the-gap">
          How we fit in
        </a>
      </section>

      <section className="section fdd-problem" id="the-gap">
        <div className="shell">
          <div className="fdd-problem__top reveal">
            <div>
              <p className="eyebrow">The gap</p>
              <h2 className="section-heading">
                We work inside how you already operate—and own the digital
                side.
              </h2>
            </div>
            <p className="section-copy">
              Agencies and specialists sit outside the business. Consultants
              advise and leave. The gap is a partner who learns your process,
              takes ownership of website, tools, and systems, and keeps
              refining, enhancing, and advising.
            </p>
          </div>
          <div className="fdd-problem__grid reveal">
            {positioningPoints.map((item, index) => (
              <article className="fdd-problem__cell" key={item.title}>
                <span className="fdd-problem__number">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <h3>{item.title}</h3>
                <p>{item.copy}</p>
              </article>
            ))}
          </div>
          <p className="fdd-problem__insight reveal">
            Judgment, partnership, and execution inside your
            process—without a full-time hire or a rigid agency menu.
          </p>
        </div>
      </section>

      <section className="section fdd-areas" id="what-we-do">
        <div className="shell">
          <div className="fdd-areas__top reveal">
            <div>
              <p className="eyebrow">The work</p>
              <h2 className="section-heading">
                One partner. Across your highest-priority digital work.
              </h2>
            </div>
            <p className="section-copy">
              These are the areas GR Labs can own. The mix follows what will
              have the greatest impact for your business—not a predetermined
              monthly menu.
            </p>
          </div>
          <div className="fdd-areas__grid reveal">
            {capabilities.map((item) => (
              <article className="fdd-areas__card" key={item.title}>
                <span className="fdd-areas__icon" aria-hidden="true">
                  <AreaIcon label={item.label} />
                </span>
                <span className="fdd-areas__label">{item.label}</span>
                <h3>{item.title}</h3>
                <p>{item.copy}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section fdd-flow" id="how-it-works">
        <div className="shell">
          <div className="fdd-flow__top reveal">
            <div>
              <p className="eyebrow">How it works</p>
              <h2 className="section-heading fdd-flow__heading">
                <span>A consultant tells you what to do.</span>
                <span>An agency does what you tell them.</span>
                <span>A fractional digital department does what needs doing.</span>
              </h2>
            </div>
            <p className="section-copy">
              Two familiar models. Neither owns the work.
            </p>
          </div>
          <ul className="fdd-flow__steps reveal">
            {contrastModels.map((item) => (
              <li
                className={
                  item.role === "answer"
                    ? "fdd-flow__step fdd-flow__step--answer"
                    : "fdd-flow__step"
                }
                key={item.label}
              >
                <span className="fdd-flow__label">{item.label}</span>
                <h3>{item.title}</h3>
                <p>{item.copy}</p>
              </li>
            ))}
          </ul>
          <p className="fdd-flow__promise reveal">
            You don&apos;t have to figure out what to ask us to do. We do what
            needs doing.
          </p>
          <div className="fdd-offer reveal">
            <div>
              <p className="fdd-offer__price">Starting at $1,500/month</p>
              <p className="fdd-offer__copy">
                Ongoing monthly support with direct access to experienced senior
                digital leadership. Hands-on execution, plus coordination with
                specialists or existing vendors when that is the right move.
                Scope is tailored to the business.
              </p>
            </div>
            <div className="fdd-offer__actions">
              <a
                className="button button-primary"
                href={BOOK_CALL_HREF}
                target="_blank"
                rel="noopener noreferrer"
              >
                Book a 30-minute fit call
                <Arrow />
              </a>
              <a
                className="button button-secondary"
                href="/fractional-digital-team-calculator"
              >
                Compare the cost
                <Arrow />
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className="section fdd-proof" id="proof">
        <div className="shell">
          <div className="fdd-proof__top reveal">
            <div>
              <p className="eyebrow">From clients</p>
              <h2 className="section-heading">
                Our work speaks for itself.
              </h2>
            </div>
            <p className="section-copy">
              Clients work with GR Labs to cut through digital noise and focus
              on what actually moves the business—with recommendations that fit
              how the business operates.
            </p>
          </div>
          <div className="fdd-proof__quotes reveal">
            {testimonials.map((item) => (
              <blockquote className="fdd-proof__quote" key={item.name}>
                <p>{item.quote}</p>
                <footer>
                  <cite>{formatTestimonialName(item.name)}</cite>
                  <span>{item.role}</span>
                </footer>
              </blockquote>
            ))}
          </div>
          <p className="fdd-proof__more reveal">
            <a href="/testimonials">All testimonials →</a>
          </p>
        </div>
      </section>

      <section className="section fdd-faq" id="faq">
        <div className="shell">
          <div className="fdd-faq__top reveal">
            <div>
              <p className="eyebrow">Questions</p>
              <h2 className="section-heading">What people usually ask.</h2>
            </div>
            <p className="section-copy">
              Ongoing access to experienced digital leadership—not a full-time
              hire, and not a one-off project. Engagements start at
              $1,500/month.
            </p>
          </div>
          <div className="fdd-faq__list reveal">
            {faqs.map((item) => (
              <details className="fdd-faq__item" key={item.question}>
                <summary>{item.question}</summary>
                <p>{item.answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
