import { BookCallLink } from "./book-call-link";
import { renderInline } from "@/components/inline-links";
import { testimonials } from "@/lib/testimonials";
import { DepartmentHeroScene } from "./department-hero-scene";
import { EngagementBlock } from "./engagement-block";
import { FixValueSection } from "./fix-value";
import { NicheStrip } from "./niche-page";
import { FeaturedCaseStudy } from "./sections";
import { Arrow } from "./site-header";
import { fractionalDepartmentServices } from "./what-we-do-nav";

const problems = [
  {
    title: "Every channel wants the budget",
    copy: "Paid search, SEO, email, social, and the website all make a reasonable case. Nobody is looking at the whole picture, so the loudest request wins.",
  },
  {
    title: "Activity is mistaken for progress",
    copy: "Campaigns keep shipping and calendars stay full, but the work isn't connected to the business goal it is meant to move.",
  },
  {
    title: "Measurement tells different stories",
    copy: "Platform dashboards claim credit in isolation. The team sees clicks while the business still cannot see what created demand or revenue.",
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
    question: "Who will I work with?",
    answer:
      "You work directly with someone who has owned this picture before—where spend goes, which numbers to trust, what to stop, and how to hold vendors to it. Not a rotating account team, and not a junior learning on your budget. Fractional means ongoing access to that leadership without a full-time hire: GR Labs stays with the business and works on whatever is highest priority.",
  },
  {
    question: "Is this right for my business?",
    answer:
      "It's built for owner-led growing businesses that rely on a website, tools, and digital channels, but don't have someone experienced owning the whole picture. Already investing? We look at the goals, channel mix, customer journey, measurement, and [team capacity](/fractional-digital-team-calculator) you have—then stay to strengthen, pause, or stop what no longer earns its place. Building the plan from scratch? We turn your goals, audience, offer, budget, and constraints into a focused starting point, then keep refining it. Either way, we do the work, not just the plan.",
  },
  {
    question: "Do you replace our marketing hire or agency?",
    answer:
      "No. If a marketing person or an agency is already in place, GR Labs is the layer above them: deciding where effort goes, what good looks like, and when to pause. The people doing the channel work stay, and we coordinate existing vendors rather than replace relationships that already work. Agencies can also partner with us under a [white-label arrangement](/white-label). We stay inside what we can own well—local ads, for example, means strategy for what to fund, pause, or dispute, not day-to-day campaign management. When a specialist is the right provider, we name the need and help coordinate.",
  },
  {
    question: "What will you actually work on?",
    answer:
      "Whatever the numbers say matters most right now. That might be the website, conversion, search, local ads, analytics, or automation. The mix changes as the business does. We don't sell a fixed menu of channels.",
  },
  {
    question: "Can I just hire you for SEO or ads?",
    answer:
      "The pages for [SEO](/search-engine-optimization), [local ads](/local-ads), [Google Business Profile](/google-business-profile), [CRO](/conversion-rate-optimization), and the rest explain each lever. The engagement is the whole picture: we figure out whether that lever is the right one before we step on it.",
  },
  {
    question: "How much does it cost?",
    answer:
      "One engagement, starting at $2,500/month—not a quote per channel. The monthly investment depends on the scope of work and the priorities we take on. We'll confirm fit and scope on a 30-minute call.",
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
            <p className="eyebrow">Fractional digital department</p>
            <h1 className="mkt-hero__headline">
              Senior digital marketing leadership, without the full-time hire.
            </h1>
            <p className="mkt-hero__copy">
              For owner-led growing businesses that rely on digital tools but
              don&apos;t have a senior person deciding where the effort goes. GR
              Labs fills that seat: looks across the website, channels, tools,
              and measurement, chooses what matters, and does the work.
            </p>
            <div className="mkt-hero__actions">
              <BookCallLink
                className="button button-primary"
              >
                Book a 30-minute fit call
                <Arrow />
              </BookCallLink>
              <a className="button button-secondary" href="#contact">
                Or send a note
              </a>
            </div>
          </div>
        </div>
        <a className="mkt-hero__cue" href="#the-gap">
          Why this exists
        </a>
      </section>

      <FeaturedCaseStudy />

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

      <section className="section fdd-areas" id="how-it-works">
        <div className="shell">
          <div className="fdd-areas__top reveal">
            <div>
              <p className="eyebrow">How we work</p>
              <h2 className="section-heading">The monthly cadence.</h2>
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
          </div>
          <p className="fdd-flow__promise reveal">
            Senior leadership. Hands-on execution. One partner.
          </p>
        </div>
      </section>

      <FixValueSection />

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
              We decide which levers matter. These are the ones we pull when
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

      <EngagementBlock />

      <section className="section fdd-proof" id="proof">
        <div className="shell">
          <div className="fdd-proof__top reveal">
            <div>
              <p className="eyebrow">From clients</p>
              <h2 className="section-heading">What clients say.</h2>
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
                  <cite>{item.name}</cite>
                  <span>{item.role}</span>
                </footer>
              </blockquote>
            ))}
          </div>
          <p className="fdd-proof__more reveal">
            <a href="/work">See the work →</a>
          </p>
        </div>
      </section>

      <NicheStrip />

      <section className="section fdd-faq" id="faq">
        <div className="shell">
          <div className="fdd-faq__top reveal">
            <div>
              <p className="eyebrow">Questions</p>
              <h2 className="section-heading">What people usually ask.</h2>
            </div>
            <p className="section-copy">
              Not a full-time hire, and not a channel you buy off a menu.
              Engagements start at $2,500/month.
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
    </>
  );
}
