import { BookCallLink } from "./book-call-link";
import { renderInline } from "@/components/inline-links";
import { testimonials } from "@/lib/testimonials";
import { DepartmentHeroScene } from "./department-hero-scene";
import { EngagementBlock } from "./engagement-block";
import { FixValueSection } from "./fix-value";
import { NicheStrip } from "./niche-page";
import { FeaturedCaseStudy } from "./sections";
import { Arrow } from "./site-header";
import { advisoryAreas } from "./what-we-do-nav";

const problems = [
  {
    title: "The spend keeps going, the answer doesn't come",
    copy: "Budget flows to ads, SEO, and the website every month, but nobody can say which of it produced the jobs you actually booked.",
  },
  {
    title: "Vendors grade their own homework",
    copy: "The agency reports the leads it generated. Nobody checks those numbers against the CRM, or asks what a lead was worth once it got there.",
  },
  {
    title: "Leads leak after the click",
    copy: "Calls ring out, forms break quietly, replies go out days late. The marketing did its job; the lead still never became a conversation.",
  },
  {
    title: "Every dashboard tells a different story",
    copy: "Google claims the lead, Meta claims the lead, the SEO shop claims the lead. The business just sees a number that doesn't match revenue.",
  },
];

const steps = [
  {
    label: "Audit",
    title: "Find the leaks and the truth",
    copy: "A lead leak audit across tracking, forms, calls, routing, and vendor reports — ranked by what each leak is costing you.",
  },
  {
    label: "Patch",
    title: "Fix what's leaking",
    copy: "Hands-on fixes for leaks and measurement: tracking, routing, forms, automations, and conversion work. Channel execution stays with your team or vendors.",
  },
  {
    label: "Verify",
    title: "Check the work, hold the plan",
    copy: "Reconcile what every vendor reports against what shows up in the CRM, and make the calls on what to fund, pause, or dispute — month after month.",
  },
];

const leverNotes: Record<
  (typeof advisoryAreas)[number]["href"],
  string
> = {
  "/lead-leak-audit":
    "The entry point: where leads and money leak after the click, ranked by what each one is worth.",
  "/conversion-rate-optimization":
    "More of the visitors you already have becoming qualified leads, without buying more traffic.",
  "/search-engine-optimization":
    "Whether SEO is actually working — and what to ask of whoever is doing it. Strategy and oversight, not production.",
  "/local-ads":
    "What to fund, pause, or dispute. Strategy for local spend—not day-to-day campaign management.",
  "/google-business-profile":
    "The map result checked against the work you want: categories, services, reviews, and whether calls from it are tracked.",
  "/analytics":
    "Measurement you can trust—including which calls came from the site, the profile, or somewhere else—so the next decision isn't a guess.",
  "/automation":
    "The busywork between tools, when the bottleneck is the process rather than another channel.",
};

const faqs = [
  {
    question: "Who will I work with?",
    answer:
      "You work directly with someone who has owned this picture before—where spend goes, which numbers to trust, what to stop, and how to hold vendors to it. Not a rotating account team, and not a junior learning on your budget.",
  },
  {
    question: "Do you do the work, or just advise?",
    answer:
      "Both, with a clear line. Hands-on where the work is patching leaks or verifying results: tracking, attribution, forms, lead routing, automations, and conversion tests. For channel execution—SEO content, ad campaign management, site builds—we make the call, name the provider, and hold them to it. Your vendors keep relationships that already work; we make sure they earn their place.",
  },
  {
    question: "Do you replace our marketing hire or agency?",
    answer:
      "No. If a marketing person or an agency is already in place, GR Labs is the layer above them: deciding where effort goes, what good looks like, and when to pause. The people doing the channel work stay, and we manage them rather than replace relationships that already work. Agencies can also partner with us under a [white-label arrangement](/white-label). When a specialist is the right provider, we name the need and help coordinate.",
  },
  {
    question: "What will you actually work on?",
    answer:
      "Whatever the numbers say matters most right now. That might be a leak in the lead flow, broken measurement, a vendor who isn't delivering, or a decision about where the budget goes. The mix changes as the business does. We don't sell a fixed menu of channels.",
  },
  {
    question: "Can I just hire you for SEO or ads?",
    answer:
      "The pages for [the lead leak audit](/lead-leak-audit), [SEO](/search-engine-optimization), [ads](/local-ads), [Google Business Profile](/google-business-profile), [CRO](/conversion-rate-optimization), and the rest explain each area. The engagement is the whole picture: we figure out whether that lever is the right one before anyone pulls it.",
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
    case "Audit":
      return (
        <svg {...common}>
          <circle cx="22" cy="22" r="8" stroke="currentColor" strokeWidth="1.75" />
          <path d="m28 28 8 8" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" />
        </svg>
      );
    case "Patch":
      return (
        <svg {...common}>
          <path d="M24 10a7 7 0 0 0-7 7v10l7-3 7 3V17a7 7 0 0 0-7-7Z" stroke="currentColor" strokeWidth="1.75" strokeLinejoin="round" />
          <path d="M24 32v6" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" />
        </svg>
      );
    case "Verify":
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

export function MarketingAdvisorySections() {
  return (
    <>
      <section className="mkt-hero fdd-hero">
        <DepartmentHeroScene />
        <div className="shell">
          <div className="mkt-hero__content fdd-hero__content">
            <p className="eyebrow">Marketing advisory</p>
            <h1 className="mkt-hero__headline">
              Is your marketing actually making you money?
            </h1>
            <p className="mkt-hero__copy">
              Somebody should be able to answer that with evidence. GR Labs is
              that somebody: we patch the leaks where leads are lost, verify
              which spend is actually working, advise on where the budget goes,
              and manage the vendors who do the rest.
            </p>
            <div className="mkt-hero__actions">
              <BookCallLink
                className="button button-primary"
              >
                Book a 30-minute fit call
                <Arrow />
              </BookCallLink>
              <a className="button button-secondary" href="/lead-leak-audit">
                Get a lead leak audit
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
                You have vendors. You don&apos;t have anyone checking.
              </h2>
            </div>
            <p className="section-copy">
              Agencies and specialists each optimize their own part, and report
              on it themselves. The gap is someone whose only job is the truth:
              what&apos;s leaking, what&apos;s working, and what the next dollar
              should buy.
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
            More marketing is not the fix. Knowing which marketing is working is.
          </p>
        </div>
      </section>

      <section className="section fdd-areas" id="how-it-works">
        <div className="shell">
          <div className="fdd-areas__top reveal">
            <div>
              <p className="eyebrow">How we work</p>
              <h2 className="section-heading">Audit. Patch. Verify.</h2>
            </div>
            <p className="section-copy">
              Find where the money leaks. Fix what&apos;s ours to fix. Check
              everyone else&apos;s work against the numbers that matter. Then do
              it again next month.
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
                <span>An agency executes the brief, and reports on itself.</span>
                <span>An advisor answers to your numbers, and stays.</span>
              </h2>
            </div>
          </div>
          <p className="fdd-flow__promise reveal">
            Leaks patched. Spend verified. Vendors held to it. One partner.
          </p>
        </div>
      </section>

      <FixValueSection />

      <section className="section fdd-levers" id="where-we-look">
        <div className="shell">
          <div className="fdd-areas__top reveal">
            <div>
              <p className="eyebrow">Where we look</p>
              <h2 className="section-heading">
                Depending on what we find.
              </h2>
            </div>
            <p className="section-copy">
              Every channel gets checked against the plan and the pipeline.
              These are the places the leaks and the answers usually are.
            </p>
          </div>
          <div className="fdd-areas__grid fdd-areas__grid--levers reveal">
            {advisoryAreas.map((item) => (
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
              Not another agency, and not a channel you buy off a menu.
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
