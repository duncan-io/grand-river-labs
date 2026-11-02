import { BookCallLink } from "./book-call-link";
import Link from "next/link";
import { DepartmentHeroScene } from "./department-hero-scene";
import { Arrow } from "./site-header";

const friction = [
  {
    title: "The phone rings out",
    copy: "After hours, during storms, while the crew is on a roof. The caller moves down the list to whoever answers. Nobody counts what that cost.",
  },
  {
    title: "Forms break quietly",
    copy: "No error, no bounce—just a notification that went to spam, or a CRM sync that stopped syncing months ago. The lead thinks they reached you.",
  },
  {
    title: "The lead sits",
    copy: "The inquiry lands in an inbox nobody owns. Three days later someone replies. The competitor who answered in ten minutes already has the appointment.",
  },
  {
    title: "The report says 40 leads",
    copy: "The vendor counts every call and form, including spam and wrong numbers, as a lead. Booked jobs tell a different story, and nobody reconciles the two.",
  },
];

const ways = [
  {
    title: "Missed and unanswered calls",
    lead: "The closest lead to a job is the one that already picked up the phone.",
    setup:
      "Call logs, after-hours coverage, and ring-out patterns reviewed—against how many calls actually became booked jobs.",
    outcome:
      "The number of leads lost to an unanswered phone, valued at your average job.",
  },
  {
    title: "Form deliverability",
    lead: "Every form, tested end to end—not assumed.",
    setup:
      "Each form submitted for real: delivery, spam folders, CRM sync, and what the prospect sees after they hit send.",
    outcome:
      "Proof that every inquiry reaches a human, and a list of the ones that don't.",
  },
  {
    title: "Speed-to-lead and routing",
    lead: "Leads decay by the hour. Routing decides whether anyone answers at all.",
    setup:
      "Response times measured, routing rules traced—who gets which lead, when, and what happens if they're out.",
    outcome:
      "Every inquiry with a next step and an owner, while the lead is still warm.",
  },
  {
    title: "Tracking and attribution accuracy",
    lead: "Before you can trust the numbers, you have to check what's firing.",
    setup:
      "GA4, tags, and call tracking verified—whether calls from the site, the map listing, and other profiles are attributed at all.",
    outcome:
      "Numbers safe to decide on, including which channel each call actually came from.",
  },
  {
    title: "Local Services Ads and lead disputes",
    lead: "LSA leads include spam, wrong numbers, and jobs you don't do.",
    setup:
      "Lead-by-lead review of what the platform charged for, with the junk disputed and credited where it qualifies.",
    outcome:
      "An honest lead count from the channel, and money back for the leads that weren't real.",
  },
  {
    title: "Vendor reports vs. the CRM",
    lead: "The only number that matters is what actually showed up.",
    setup:
      "Agency and platform reports reconciled against the CRM—lead by lead, not dashboard against dashboard.",
    outcome:
      "What each vendor actually produced, in numbers you can take to the next contract conversation.",
  },
];

const steps = [
  {
    title: "Bring the spend",
    copy: "Tell us what's going out and where. On a 30-minute call we scope the audit—no forms to fill in first.",
  },
  {
    title: "We trace the lead path",
    copy: "From the click or the call to the booked job: forms, phone, routing, tracking, and every vendor report in between.",
  },
  {
    title: "You get the leak map",
    copy: "Every leak we find, ranked by what it's costing you—so the first fix is the one that pays, not the one that's loudest.",
  },
  {
    title: "Fixes, split fairly",
    copy: "We patch what's ours to patch—tracking, routing, forms, automations. Channel fixes go to your team or vendors, and we verify they actually moved the number.",
  },
];

export function LeadLeakAuditSections() {
  return (
    <>
      <section className="mkt-hero fdd-hero">
        <DepartmentHeroScene />
        <div className="shell">
          <div className="mkt-hero__content fdd-hero__content">
            <p className="eyebrow">Lead leak audit</p>
            <h1 className="mkt-hero__headline">
              Find where your leads are going—and what it&apos;s costing you.
            </h1>
            <p className="mkt-hero__copy">
              Most marketing budgets lose leads after the click: calls that ring
              out, forms that break quietly, leads that sit, reports that
              don&apos;t match the CRM. The audit finds every leak, priced in
              jobs.
            </p>
            <div className="mkt-hero__actions">
              <BookCallLink className="button button-primary">
                Book a call
                <Arrow />
              </BookCallLink>
              <a className="button button-secondary" href="#contact">
                Or send a note
              </a>
            </div>
          </div>
        </div>
        <a className="mkt-hero__cue" href="#friction">
          Where leads leak
        </a>
      </section>

      <section className="section fdd-problem" id="friction">
        <div className="shell">
          <div className="fdd-problem__top reveal">
            <div>
              <p className="eyebrow">The leaks</p>
              <h2 className="section-heading">
                The marketing worked. The lead still leaked.
              </h2>
            </div>
            <p className="section-copy">
              Every one of these looks like a marketing problem from the
              outside. None of them are fixed by more spend.
            </p>
          </div>
          <div className="fdd-problem__grid fdd-problem__grid--quad reveal">
            {friction.map((item, index) => (
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
            You can&apos;t fix what nobody has counted. That&apos;s the audit&apos;s
            first job.
          </p>
        </div>
      </section>

      <section className="section seo-ways" id="ways">
        <div className="shell">
          <div className="seo-ways__top reveal">
            <div>
              <p className="eyebrow">What&apos;s covered</p>
              <h2 className="section-heading">What we check.</h2>
            </div>
            <p className="section-copy">
              The whole path a lead travels, from the click or the call to the
              booked job—not a channel dashboard in isolation.
            </p>
          </div>
          <div className="seo-ways__grid reveal">
            {ways.map((item, index) => (
              <article className="seo-way" key={item.title}>
                <span className="seo-way__number">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <h3>{item.title}</h3>
                <p className="seo-way__lead">{item.lead}</p>
                <p className="seo-way__setup">
                  <span className="seo-way__label">What we check</span>
                  {item.setup}
                </p>
                <p className="seo-way__outcome">
                  <span className="seo-way__label">You get</span>
                  {item.outcome}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section seo-flow" id="how-it-works">
        <div className="shell">
          <div className="seo-flow__top reveal">
            <div>
              <p className="eyebrow">How it works</p>
              <h2 className="section-heading">
                A leak map, ranked by what it costs you.
              </h2>
            </div>
            <p className="section-copy">
              The deliverable is the map and the fix list—not a deck of
              recommendations that expires on a shelf.
            </p>
          </div>
          <ol className="seo-flow__steps reveal">
            {steps.map((step, index) => (
              <li className="seo-flow__step" key={step.title}>
                {index > 0 ? (
                  <span className="seo-flow__connector" aria-hidden="true">
                    <svg viewBox="0 0 80 24" fill="none">
                      <path
                        className="seo-flow__connector-line"
                        d="M4 12h64"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeDasharray="4 6"
                      />
                      <path
                        d="M62 5.5 72 12l-10 6.5"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </span>
                ) : null}
                <span className="seo-flow__number">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <h3>{step.title}</h3>
                <p>{step.copy}</p>
              </li>
            ))}
          </ol>
          <p className="fwd-services__also reveal">
            <span className="fwd-services__also-label">Part of the bigger picture</span>
            The audit is the entry point. What it turns into is ongoing{" "}
            <Link href="/marketing-advisory">marketing advisory</Link>
            —leaks patched, spend verified, and vendors held to the plan. If
            the traffic itself is the gap,{" "}
            <Link href="/conversion-rate-optimization">conversion work</Link>{" "}
            on the pages you already have is usually next.
          </p>
        </div>
      </section>
    </>
  );
}
