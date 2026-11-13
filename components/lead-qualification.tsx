import type { ReactNode } from "react";
import Link from "next/link";
import { BookCallLink } from "./book-call-link";
import { renderInline } from "@/components/inline-links";
import { Arrow } from "./site-header";

const sources = [
  { label: "Website forms", icon: "form" },
  { label: "Phone line", icon: "phone" },
  { label: "Texts", icon: "text" },
] as const;

const destinations = [
  { label: "Your CRM", detail: "Score, tier and status", icon: "crm" },
  { label: "Estimator’s calendar", detail: "Hot leads booked", icon: "calendar" },
  { label: "Your team", detail: "Instant alerts", icon: "alert" },
] as const;

const coreSteps = ["Respond", "Verify", "Score", "Route"] as const;

const steps = [
  {
    title: "Capture",
    copy: "Forms, texts and calls land in one lead record. Form leads and missed calls get a text back within a minute, and AI transcribes each call.",
  },
  {
    title: "Enrich and verify",
    copy: "Phone, address and property details are checked. Spam, solicitors and existing customers calling about service are screened out.",
  },
  {
    title: "Knockouts, then score",
    copy: "Wrong service, outside the area and renters are sorted out first. Everyone else is scored on fit, intent and urgency.",
  },
  {
    title: "Route",
    routes: [
      { tier: "Hot", modifier: "hot", copy: "Instant alert, booked on the estimator’s calendar" },
      { tier: "Warm", modifier: "warm", copy: "Timed follow-up" },
      { tier: "Not a fit", modifier: "fit", copy: "Tagged with the reason and referred out" },
    ],
  },
  {
    title: "Write back",
    copy: "Score, tier and booked status go into your CRM, and you get a weekly summary of every lead handled.",
  },
] as const;

const stackPoints = [
  {
    title: "Built on your current stack",
    copy: "Your phone line, forms and CRM stay. Score, tier and booked status are written back to the CRM you already use.",
  },
  {
    title: "Custom scoring",
    copy: "Service area, job types, knockouts and what counts as “hot” are set to your business during the build.",
  },
  {
    title: "Close more leads",
    copy: "Every lead gets a fast reply and hot leads go straight onto the estimator’s calendar, so fewer good leads go cold.",
  },
];

export const faqs = [
  {
    question: "Do we have to switch CRMs or phone systems?",
    answer:
      "No. It's built into the phone line, forms and CRM you already use. Leads keep landing where your team already looks, with a score, a tier and a next step attached.",
  },
  {
    question: "Is this off-the-shelf software?",
    answer:
      "No. It's built for your business. Your scoring rules, service area, knockouts and routing are set up for you, then connected to the tools you already run. Pair it with the [Lead Monitoring System](/lead-system) to see what each qualified lead cost.",
  },
];

type IconName =
  | (typeof sources)[number]["icon"]
  | (typeof destinations)[number]["icon"];

const iconPaths: Record<IconName, ReactNode> = {
  form: (
    <>
      <rect x="3" y="4" width="18" height="16" rx="2" />
      <path d="M3 9h18M7 13h6M7 16h4" />
    </>
  ),
  phone: (
    <path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2" />
  ),
  text: <path d="M21 12a8 8 0 0 1-11.6 7.1L4 20l1-4.6A8 8 0 1 1 21 12Z" />,
  crm: (
    <>
      <ellipse cx="12" cy="6" rx="7" ry="3" />
      <path d="M5 6v6c0 1.7 3.1 3 7 3s7-1.3 7-3V6" />
      <path d="M5 12v6c0 1.7 3.1 3 7 3s7-1.3 7-3v-6" />
    </>
  ),
  calendar: (
    <>
      <rect x="4" y="5" width="16" height="15" rx="2" />
      <path d="M8 3v4M16 3v4M4 10h16" />
      <path d="m9.5 15 2 2 3.5-3.5" />
    </>
  ),
  alert: (
    <>
      <path d="M6 9a6 6 0 1 1 12 0c0 6 2.5 7.5 2.5 7.5h-17S6 15 6 9" />
      <path d="M10 20a2 2 0 0 0 4 0" />
    </>
  ),
};

function Icon({ name }: { name: IconName }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {iconPaths[name]}
    </svg>
  );
}

function Connectors() {
  return (
    <div className="lq-diagram__links" aria-hidden="true">
      <span />
      <span />
      <span />
    </div>
  );
}

/* Hero diagram: the client's own lead sources flow through qualification and
   back into the client's own systems — it sits between tools they already have. */
function IntegrationDiagram() {
  return (
    <figure
      className="lq-diagram"
      aria-label="Leads from your website forms, phone line and texts pass through the Lead Qualification System into your CRM, your estimator's calendar and your team."
    >
      <p className="lq-diagram__label">Your lead sources</p>
      <ul className="lq-diagram__row">
        {sources.map((item) => (
          <li className="lq-diagram__tile" key={item.label}>
            <Icon name={item.icon} />
            {item.label}
          </li>
        ))}
      </ul>
      <Connectors />
      <div className="lq-diagram__core">
        <p className="lq-diagram__core-label">Lead Qualification System</p>
        <ol className="lq-diagram__steps">
          {coreSteps.map((step) => (
            <li key={step}>{step}</li>
          ))}
        </ol>
      </div>
      <Connectors />
      <ul className="lq-diagram__row">
        {destinations.map((item) => (
          <li className="lq-diagram__tile lq-diagram__tile--out" key={item.label}>
            <Icon name={item.icon} />
            <span className="lq-diagram__tile-name">{item.label}</span>
            <span className="lq-diagram__tile-detail">{item.detail}</span>
          </li>
        ))}
      </ul>
      <p className="lq-diagram__label lq-diagram__label--end">
        Your systems, updated automatically
      </p>
    </figure>
  );
}

export function LeadQualificationSections() {
  return (
    <>
      <section className="mkt-hero lq-hero">
        <div className="shell">
          <div className="lq-hero__layout">
            <div className="mkt-hero__content">
              <p className="eyebrow">Lead Qualification System · Home services</p>
              <h1 className="mkt-hero__headline">
                Don&apos;t Waste Time Quoting Tire Kickers
              </h1>
              <p className="mkt-hero__copy">
                A custom system built into your existing phone line, forms and
                CRM. It responds to every new lead in seconds, scores it on how
                likely it is to buy, and books the best ones, so your team
                closes more of the leads you&apos;re already paying for.
              </p>
              <div className="mkt-hero__actions">
                <BookCallLink className="button button-primary">
                  Book a demo
                  <Arrow />
                </BookCallLink>
                <a className="button button-secondary" href="#how-it-works">
                  How it works
                </a>
              </div>
              <ul className="mkt-hero__facts">
                <li>Text back within a minute</li>
                <li>Built into your phone line, forms and CRM</li>
                <li>Hot leads booked on the estimator’s calendar</li>
              </ul>
            </div>
            <IntegrationDiagram />
          </div>
        </div>
      </section>

      <section className="section lq-how" id="how-it-works">
        <div className="shell">
          <div className="lead-system-flow__top reveal">
            <div>
              <p className="eyebrow">How it works</p>
              <h2 className="section-heading">
                From first ring to booked estimate.
              </h2>
            </div>
            <p className="section-copy">
              Every lead goes through the same five steps the moment it
              arrives, whether it came in by form, text or phone.
            </p>
          </div>
          <ol className="lq-steps reveal">
            {steps.map((step, index) => (
              <li className="lq-step" key={step.title}>
                <div className="lq-step__head">
                  <span className="lq-step__number">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <h3>{step.title}</h3>
                </div>
                {"routes" in step ? (
                  <dl className="lq-step__routes">
                    {step.routes.map((route) => (
                      <div className="lq-step__route" key={route.tier}>
                        <dt className={`lq-step__tier lq-step__tier--${route.modifier}`}>
                          {route.tier}
                        </dt>
                        <dd>{route.copy}</dd>
                      </div>
                    ))}
                  </dl>
                ) : (
                  <p>{step.copy}</p>
                )}
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="section lq-stack" id="your-stack">
        <div className="shell">
          <div className="lead-system-flow__top reveal">
            <div>
              <p className="eyebrow">Built for your business</p>
              <h2 className="section-heading">Your rules, inside your tools.</h2>
            </div>
            <p className="section-copy">
              It isn&apos;t another app for your team to check. Leads keep
              landing where they already look, with a score and a next step
              attached.
            </p>
          </div>
          <ul className="lead-teaser__features reveal">
            {stackPoints.map((point) => (
              <li key={point.title}>
                <strong>{point.title}</strong>
                <span>{point.copy}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="section lq-pair" id="with-the-lead-system">
        <div className="shell">
          <div className="lead-system-flow__top reveal">
            <div>
              <p className="eyebrow">With the Lead Monitoring System</p>
              <h2 className="section-heading">
                Each runs on its own. Together, they go further.
              </h2>
            </div>
            <p className="section-copy">
              Qualification acts on leads as they come in. The Lead Monitoring System
              reports on them afterward.
            </p>
          </div>

          <div className="lq-pair__cards reveal">
            <article className="lq-pair__card lq-pair__card--primary">
              <p className="lq-pair__kicker">As leads come in</p>
              <h3>Lead Qualification System</h3>
              <p>
                Responds, screens, scores and routes every lead, and books the
                best ones.
              </p>
            </article>
            <article className="lq-pair__card">
              <p className="lq-pair__kicker">After they land</p>
              <h3>Lead Monitoring System</h3>
              <p>
                Tracking, reporting and alerts: where every lead came from and
                what it cost.
              </p>
              <Link className="lq-pair__link" href="/lead-system">
                See the Lead Monitoring System
                <Arrow />
              </Link>
            </article>
          </div>

          <div className="lq-pair__together reveal">
            <p className="lq-pair__together-title">Run both, and you get:</p>
            <ul className="lq-pair__benefits">
              <li>
                <strong>Cost per qualified lead, by channel</strong>
                <span>See which sources bring in buyers, and what each one costs.</span>
              </li>
              <li>
                <strong>Qualified status sent to Google Ads</strong>
                <span>So your ad spend is optimized for buyers, not form fills.</span>
              </li>
            </ul>
          </div>
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
              Anything else, we&apos;ll cover on the demo.
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
