import { renderInline } from "@/components/inline-links";
import { BOOK_CALL_HREF } from "@/lib/site";
import { testimonials, formatTestimonialName } from "@/lib/testimonials";
import { DepartmentHeroScene } from "./department-hero-scene";
import { NicheStrip } from "./niche-page";
import { Arrow } from "./site-header";
import { fractionalDepartmentServices } from "./what-we-do-nav";

const problems = [
  {
    title: "Every channel wants the budget",
    copy: "Paid search, SEO, email, social, and the website all make a reasonable case. Without someone looking at the whole picture, the loudest request wins.",
  },
  {
    title: "Activity is mistaken for progress",
    copy: "Campaigns keep shipping and calendars stay full, but nobody can clearly connect the work to the business goal it is meant to move.",
  },
  {
    title: "Measurement tells different stories",
    copy: "Platform dashboards claim credit in isolation. The team sees clicks and impressions, while leadership still cannot see what created demand or revenue.",
  },
  {
    title: "Priorities change with the week",
    copy: "A competitor launches, a trend spikes, or a tactic underperforms. The plan resets before useful work has enough time to compound.",
  },
];

const steps = [
  {
    label: "Look",
    title: "See the whole picture",
    copy: "Website, spend, search, tools, and what actually turns into conversations—read together, not as separate dashboards.",
  },
  {
    label: "Find",
    title: "Name the opportunity",
    copy: "What's working, and where the gap is. Sometimes that's the site. Sometimes it's spend. Sometimes leads aren't being followed up.",
  },
  {
    label: "Step",
    title: "Step on the gas",
    copy: "Put effort behind the opportunity, pause what isn't earning its place, and do the work—not a recommendation you have to staff yourself.",
  },
];

const startingPoints = [
  {
    title: "Already investing in marketing?",
    copy: "We look at the goals, channel mix, customer journey, measurement, and [team capacity](/fractional-digital-team-calculator) you have—then stay with you to strengthen, pause, or stop what no longer earns its place.",
  },
  {
    title: "Building the plan from scratch?",
    copy: "We turn your goals, audience, offer, budget, and constraints into a focused starting point—then keep refining the sequence as you learn. And we do the work, not just the plan.",
  },
];

const leverNotes: Record<
  (typeof fractionalDepartmentServices)[number]["href"],
  string
> = {
  "/website-strategy":
    "The site everything else points at—kept current, converting, and owned.",
  "/conversion-rate-optimization":
    "Clearer paths from visit to conversation, when the traffic you have isn't turning into work.",
  "/search-engine-optimization":
    "Being found for the searches that win the work, when search is where the opportunity is.",
  "/local-ads":
    "What to fund, pause, or dispute. Strategy for local spend—not day-to-day campaign management.",
  "/analytics":
    "Measurement you can trust, so the next decision isn't a guess.",
  "/automation":
    "The busywork between tools, when the bottleneck is the process rather than another channel.",
};

const faqs = [
  {
    question: "Is this right for my business?",
    answer:
      "It's built for owner-led growing businesses that rely on a website, tools, and digital channels—but don't have an experienced person owning the whole picture. If you already have a marketing team, GR Labs can fill the gap of someone who decides where effort goes, rather than replace people.",
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
      "One engagement, starting at $2,000/month—not a quote per channel. The monthly investment depends on the scope of work and the priorities we take on. We'll confirm fit and scope on a 30-minute call.",
  },
  {
    question: "What will you actually work on?",
    answer:
      "Whatever the numbers say matters most right now. That might be the website, conversion, search, local ads, analytics, or automation. The mix changes as the business does. We don't sell a fixed menu of channels.",
  },
  {
    question: "How is this different from an agency or a consultant?",
    answer:
      "An agency does what you ask, usually inside one channel. A consultant tells you what to do, then leaves you to staff it. GR Labs looks at the whole picture, decides where effort should go, and does the work.",
  },
  {
    question: "Can I just hire you for SEO or ads?",
    answer:
      "The pages for [SEO](/search-engine-optimization), [local ads](/local-ads), [CRO](/conversion-rate-optimization), and the rest explain each lever. The engagement is the whole picture: we figure out whether that lever is the right one before we step on it.",
  },
  {
    question: "Can you work with our existing team and vendors?",
    answer:
      "Yes. GR Labs is designed to complement internal people and existing vendors—coordinating when that makes the work better, not replacing relationships that already work. Agencies can also partner with us under a [white-label arrangement](/white-label).",
  },
  {
    question: "What happens if we need something outside your capabilities?",
    answer:
      "We stay inside what we can own well. Local ads, for example, means strategy for what to fund, pause, or dispute—not day-to-day campaign management. When a specialist is the right provider, GR Labs identifies the need and helps coordinate, rather than pretending to cover every task.",
  },
];

function StepIcon({ label }: { label: string }) {
  const common = {
    viewBox: "0 0 48 48",
    fill: "none",
    "aria-hidden": true as const,
    className: "fdd-areas__icon-svg",
  };

  switch (label) {
    case "Look":
      return (
        <svg {...common}>
          <circle cx="22" cy="22" r="8" stroke="currentColor" strokeWidth="1.75" />
          <path d="m28 28 8 8" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" />
        </svg>
      );
    case "Find":
      return (
        <svg {...common}>
          <circle cx="24" cy="24" r="12" stroke="currentColor" strokeWidth="1.75" />
          <path d="M24 16v8l6 3" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" />
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
            <p className="eyebrow">Holistic digital strategy</p>
            <h1 className="mkt-hero__headline">
              Find what&apos;s working. Step on the gas.
            </h1>
            <p className="fdd-hero__support">
              Your fractional digital department: not an agency, not a
              consultant.
            </p>
            <p className="mkt-hero__copy">
              For owner-led growing businesses that rely on digital tools but
              don&apos;t have an experienced person owning the whole picture. GR
              Labs looks across the website, channels, tools, and measurement,
              finds where the opportunity is, and puts effort behind it.
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
          The gap
        </a>
      </section>

      <section className="section fdd-problem" id="the-gap">
        <div className="shell">
          <div className="fdd-problem__top reveal">
            <div>
              <p className="eyebrow">The gap</p>
              <h2 className="section-heading">
                Every channel has a vendor. Nobody owns the picture.
              </h2>
            </div>
            <p className="section-copy">
              Agencies and specialists each optimize their own part. Consultants
              advise and leave. The gap is a partner who sees how it all fits,
              decides where effort goes, and stays to do the work.
            </p>
          </div>
          <div className="fdd-problem__grid fdd-problem__grid--quad reveal">
            {problems.map((item, index) => (
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
            More marketing is not always the answer. The right next move
            depends on the whole picture.
          </p>
        </div>
      </section>

      <section className="section fdd-areas" id="how-it-works">
        <div className="shell">
          <div className="fdd-areas__top reveal">
            <div>
              <p className="eyebrow">How we work</p>
              <h2 className="section-heading">Look. Find. Step on the gas.</h2>
            </div>
            <p className="section-copy">
              Then we do it again next month. The mix follows what will move
              the business—not a predetermined menu of channels.
            </p>
          </div>
          <div className="fdd-areas__grid fdd-areas__grid--steps reveal">
            {steps.map((item) => (
              <article className="fdd-areas__card" key={item.title}>
                <span className="fdd-areas__icon" aria-hidden="true">
                  <StepIcon label={item.label} />
                </span>
                <span className="fdd-areas__label">{item.label}</span>
                <h3>{item.title}</h3>
                <p>{item.copy}</p>
              </article>
            ))}
          </div>
          <p className="fdd-problem__insight reveal">
            You don&apos;t have to figure out what to ask us to do. We look,
            decide, and do what needs doing.
          </p>
        </div>
      </section>

      <section className="section fdd-flow" id="the-difference">
        <div className="shell">
          <div className="fdd-flow__top reveal">
            <div>
              <p className="eyebrow">The difference</p>
              <h2 className="section-heading fdd-flow__heading">
                <span>A consultant tells you what to do.</span>
                <span>An agency does what you tell them.</span>
                <span>A fractional digital department does what needs doing.</span>
              </h2>
            </div>
            <p className="section-copy">
              Consultants leave a recommendation for you to staff. Agencies
              wait for a brief, so unnamed work never starts. GR Labs looks at
              the business, finds the digital work worth doing, and takes it
              on.
            </p>
          </div>
          <p className="fdd-flow__promise reveal">
            Not an agency. Not a consultant. One partner for the whole picture.
          </p>
        </div>
      </section>

      <section className="section fdd-start" id="where-you-start">
        <div className="shell">
          <div className="fdd-areas__top reveal">
            <div>
              <p className="eyebrow">Where you&apos;re starting</p>
              <h2 className="section-heading">
                Already spending, or starting from a blank page.
              </h2>
            </div>
            <p className="section-copy">
              Either way, the job is the same: see what&apos;s working, find
              the opportunity, and put effort there.
            </p>
          </div>
          <div className="fdd-areas__grid fdd-areas__grid--pair reveal">
            {startingPoints.map((item) => (
              <article className="fdd-areas__card" key={item.title}>
                <h3>{item.title}</h3>
                <p>{renderInline(item.copy)}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section fdd-levers" id="what-the-work-can-touch">
        <div className="shell">
          <div className="fdd-areas__top reveal">
            <div>
              <p className="eyebrow">What the work can touch</p>
              <h2 className="section-heading">
                Depending on what we find.
              </h2>
            </div>
            <p className="section-copy">
              None of these is the product. They&apos;re levers we pull when
              the numbers say so.
            </p>
          </div>
          <div className="fdd-areas__grid fdd-areas__grid--levers reveal">
            {fractionalDepartmentServices.map((item) => (
              <article className="fdd-areas__card" key={item.href}>
                <h3>
                  <a href={item.href}>{item.label}</a>
                </h3>
                <p>{leverNotes[item.href]}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section fdd-offer-band" id="the-offer">
        <div className="shell">
          <div className="fdd-offer reveal">
            <div>
              <p className="fdd-offer__price">Starting at $2,000/month</p>
              <p className="fdd-offer__copy">
                One engagement for the whole picture—not a quote per channel.
                Ongoing monthly support with direct access to experienced senior
                digital leadership. Scope follows the opportunity. Hands-on
                execution, plus coordination with specialists or existing
                vendors when that is the right move.
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
              One partner for the whole digital picture—not a full-time hire,
              and not a channel you buy off a menu. Engagements start at
              $2,000/month.
            </p>
          </div>
          <div className="fdd-faq__list reveal">
            {faqs.map((item) => (
              <details className="fdd-faq__item" key={item.question}>
                <summary>{item.question}</summary>
                <p>{renderInline(item.answer)}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <NicheStrip />
    </>
  );
}
