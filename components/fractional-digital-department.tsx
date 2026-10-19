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
    copy: "Paid search, SEO, email, social, and the website all make a reasonable case. Without a senior leader looking at the whole picture, the loudest request wins.",
  },
  {
    title: "Activity is mistaken for progress",
    copy: "Campaigns keep shipping and calendars stay full, but no senior leader is connecting the work to the business goal it is meant to move.",
  },
  {
    title: "Measurement tells different stories",
    copy: "Platform dashboards claim credit in isolation. Without a senior leader deciding which numbers count, the team sees clicks while the business still cannot see what created demand or revenue.",
  },
  {
    title: "Priorities change with the week",
    copy: "A competitor launches, a trend spikes, or a tactic underperforms. Without a senior leader holding the plan, it resets before useful work has enough time to compound.",
  },
];

const judgments = [
  {
    title: "What to stop funding",
    copy: "Every channel can make a case. Senior judgment is deciding which ones earn the next dollar, and which ones stop.",
  },
  {
    title: "Which numbers to trust",
    copy: "Dashboards disagree on purpose. A senior leader picks the measurement that shows demand and revenue, and sets the rest aside.",
  },
  {
    title: "What comes first",
    copy: "The backlog is longer than the month. Sequencing is the job: the next move that compounds, and a no to the loudest request.",
  },
  {
    title: "How vendors are held to it",
    copy: "Agencies and specialists stay. Senior leadership sets what they work on, what good looks like, and when to pause them.",
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
  "/google-business-profile":
    "The map result that matches the work you want—categories, photos, hours, and a link to a page that can win the job.",
  "/analytics":
    "Measurement you can trust—including which calls came from the site, the profile, or somewhere else—so the next decision isn't a guess.",
  "/automation":
    "The busywork between tools, when the bottleneck is the process rather than another channel.",
};

const faqs = [
  {
    question: "How senior is the leadership?",
    answer:
      "This is senior digital marketing leadership: the judgment that comes from having owned the whole picture before—where spend goes, which numbers to trust, what to stop, and how to hold vendors to it. It is not a junior marketer learning on your budget, and it is not an account manager relaying a brief.",
  },
  {
    question: "Who will I work with?",
    answer:
      "You work directly with senior digital marketing leadership—not a rotating account team, and not a junior who needs to be managed. When a specialist or an existing vendor is the better fit for a piece of work, GR Labs directs and coordinates rather than treating every task as something to keep in-house.",
  },
  {
    question: 'What does "fractional" mean?',
    answer:
      "You get ongoing access to senior digital marketing leadership without hiring a full-time digital leader. GR Labs works with your business on an ongoing basis and focuses on the highest-priority work.",
  },
  {
    question: "Do you replace our marketing hire or agency?",
    answer:
      "No. If a marketing person or an agency is already in place, GR Labs is the leadership layer above them: deciding where effort goes, what good looks like, and when to pause. The people doing the channel work stay.",
  },
  {
    question: "Is this right for my business?",
    answer:
      "It's built for owner-led growing businesses that rely on a website, tools, and digital channels—but don't have a senior person owning the whole picture. If you already have a marketing team, GR Labs fills the gap of someone who decides where effort goes, rather than replace people.",
  },
  {
    question: "How much does it cost?",
    answer:
      "One engagement, starting at $2,500/month—not a quote per channel. The monthly investment depends on the scope of work and the priorities we take on. We'll confirm fit and scope on a 30-minute call.",
  },
  {
    question: "What will you actually work on?",
    answer:
      "Whatever the numbers say matters most right now. That might be the website, conversion, search, local ads, analytics, or automation. The mix changes as the business does. We don't sell a fixed menu of channels.",
  },
  {
    question: "How is this different from an agency or a consultant?",
    answer:
      "An agency does what you ask, usually inside one channel. A consultant tells you what to do, then leaves you to staff it. A junior hire waits to be directed. GR Labs brings senior leadership: looks at the whole picture, decides where effort should go, and does the work.",
  },
  {
    question: "Can I just hire you for SEO or ads?",
    answer:
      "The pages for [SEO](/search-engine-optimization), [local ads](/local-ads), [Google Business Profile](/google-business-profile), [CRO](/conversion-rate-optimization), and the rest explain each lever. The engagement is the whole picture: we figure out whether that lever is the right one before we step on it.",
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
            <p className="eyebrow">Senior digital marketing leadership</p>
            <h1 className="mkt-hero__headline">
              Senior digital marketing leadership, without the full-time hire.
            </h1>
            <p className="fdd-hero__support">
              Your fractional digital department, led by experience that has
              done this before, and that does the work.
            </p>
            <p className="mkt-hero__copy">
              For owner-led growing businesses that rely on digital tools but
              don&apos;t have a senior person deciding where the effort goes. GR
              Labs fills that seat: leadership that looks across the website,
              channels, tools, and measurement, chooses what matters, and does
              the work.
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
              <a className="button button-secondary" href="#contact">
                Contact us
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
                You have vendors. You don&apos;t have a digital marketing leader.
              </h2>
            </div>
            <p className="section-copy">
              Agencies and specialists each optimize their own part. A junior
              hire waits to be told. The gap is senior judgment: a partner who
              sees how it all fits, decides where effort goes, and stays to do
              the work.
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
            More marketing is not the fix. Senior judgment about which marketing
            is.
          </p>
        </div>
      </section>

      <section className="section" id="senior-leadership">
        <div className="shell">
          <div className="fdd-areas__top reveal">
            <div>
              <p className="eyebrow">Senior leadership</p>
              <h2 className="section-heading">
                What senior leadership looks like.
              </h2>
            </div>
            <p className="section-copy">
              The seat is judgment, not another pair of hands. These are the
              calls a senior digital marketing leader makes, and the ones GR
              Labs makes with you.
            </p>
          </div>
          <div className="fdd-areas__grid reveal">
            {judgments.map((item) => (
              <article className="fdd-areas__card" key={item.title}>
                <h3>{item.title}</h3>
                <p>{item.copy}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section fdd-areas" id="how-it-works">
        <div className="shell">
          <div className="fdd-areas__top reveal">
            <div>
              <p className="eyebrow">How we work</p>
              <h2 className="section-heading">
                The monthly cadence of a senior leader.
              </h2>
            </div>
            <p className="section-copy">
              Find what&apos;s working. Step on the gas. Then do it again next
              month. The mix follows what will move the business—not a
              predetermined menu of channels.
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
            You don&apos;t have to brief a senior leader. We look, decide, and
            do what needs doing.
          </p>
        </div>
      </section>

      <section className="section fdd-flow" id="the-difference">
        <div className="shell">
          <div className="fdd-flow__top reveal">
            <div>
              <p className="eyebrow">The difference</p>
              <h2 className="section-heading fdd-flow__heading">
                <span>A consultant tells you what to do, then leaves.</span>
                <span>An agency executes the brief.</span>
                <span>A fractional department decides what&apos;s worth doing, and does it.</span>
              </h2>
            </div>
            <p className="section-copy">
              A consultant advises, then leaves you to staff it. An agency
              waits for a brief, so unnamed work never starts. A fractional
              department finds the digital work worth doing, and takes it on.
            </p>
          </div>
          <p className="fdd-flow__promise reveal">
            Senior leadership. Hands-on execution. One partner.
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
              the opportunity, and put effort there. If a marketing person or
              an agency is already in place, GR Labs adds the leadership layer
              above them.
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
              A senior leader decides which levers matter. These are the ones
              we pull when the numbers say so.
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
              <p className="fdd-offer__price">
                Senior digital marketing leadership, starting at $2,500/month
              </p>
              <p className="fdd-offer__copy">
                One engagement for the whole picture—not a quote per channel.
                Ongoing monthly support: senior judgment on where effort goes,
                and hands-on execution of the work that follows. Scope follows
                the opportunity, with coordination of specialists or existing
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
                Compare with a senior hire
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
              Clients describe what senior judgment is for: cutting through the
              noise, and recommendations realistic enough to fit how the
              business actually operates.
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
              Senior digital marketing leadership—not a full-time hire, and not
              a channel you buy off a menu. Engagements start at $2,500/month.
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
