import { BookCallLink } from "./book-call-link";
import { renderInline } from "@/components/inline-links";
import { DepartmentHeroScene } from "./department-hero-scene";
import {
  DepartmentOwnershipScene,
  OwnershipGapScene,
  ServiceIcon,
} from "./ownership-scenes";
import { Arrow } from "./site-header";

const gaps = [
  {
    title: "Leads come in from everywhere",
    copy: "A lead vendor, Google, the showroom, a past client's neighbor. Each one lands somewhere different, and nobody is looking at all of them together.",
  },
  {
    title: "The call comes during a selection meeting",
    copy: "The designer is walking a client through tile. The estimator is on a job. The homeowner who called gets voicemail and calls the next remodeler on the list.",
  },
  {
    title: "A kitchen takes weeks to decide",
    copy: "Nobody hires a remodeler off one phone call. If no one follows up between the first call and the design appointment, the job quietly goes to whoever did.",
  },
  {
    title: "Nobody can say what's working",
    copy: "The vendor invoice, the ads account, and the signed contracts live in different places. Nobody can tell which dollar turned into a kitchen.",
  },
];

const firstSteps = [
  {
    label: "Trace",
    title: "Trace every lead",
    copy: "We follow where your leads come from and where each one lands: the vendor, Local Services Ads, your Google Business Profile, the site forms, and the phone. Most remodelers have never seen it all in one place.",
  },
  {
    label: "Fix",
    title: "Fix the leaks",
    copy: "Before we bring in a single new lead, the ones you already get have to reach someone. [Routing, a missed-call text](/marketing-automation), follow-up, and quote forms that work on a phone.",
  },
  {
    label: "Build",
    title: "Build what you own",
    copy: "Then we build the channels you keep: the profile, Local Services Ads, project pages on [your site](/website-strategy), and [an audit of the ad spend you already make](/local-ads).",
  },
];

const engine = [
  {
    icon: "Rank",
    label: "Bring leads in",
    title: "Local Services Ads and Google Ads",
    copy: "We set up Local Services Ads so you pay for leads that contact you, not shared ones. On Google Ads, [we audit the spend you already make](/local-ads) and tell you what to cut. We advise. We don't sell you a bigger budget.",
  },
  {
    icon: "Target",
    label: "Bring leads in",
    title: "Google Business Profile",
    copy: "A lot of kitchen and bath searches start on the map. We keep your categories, project photos, and reviews matched to the work you want, and link the profile to a page that can book the appointment. [More on the profile](/google-business-profile).",
  },
  {
    icon: "Site",
    label: "Bring leads in",
    title: "Website and project pages",
    copy: "Before/after galleries, project walkthroughs, and cost breakdowns. They rank for the searches homeowners make before they call, and they're the same pieces your designers already use to sell. [The site stays fast](/website-strategy) and every form reaches a person.",
  },
  {
    icon: "Route",
    label: "Turn them into jobs",
    title: "Routing and speed-to-lead",
    copy: "Calls, forms, and Local Services Ads messages go to whoever can book the design appointment. [A missed call gets a text back](/marketing-automation) while the homeowner is still deciding who to call.",
  },
  {
    icon: "Convert",
    label: "Turn them into jobs",
    title: "Follow-up through the design process",
    copy: "Kitchens take weeks. We set up the follow-up that keeps you in the conversation between the first call, the design appointment, and the signed contract, so a good lead doesn't go cold while you're busy.",
  },
  {
    icon: "Compound",
    label: "Turn them into jobs",
    title: "Reporting on signed jobs",
    copy: "[We report on leads, design appointments, and signed jobs](/analytics), not impressions. You'll know which source turned into a kitchen and which one only turned into an invoice.",
  },
];

const monthly = [
  {
    label: "Review",
    title: "See what turned into jobs",
    copy: "Every month we look at which leads became design appointments and which became signed contracts, by source.",
  },
  {
    label: "Move",
    title: "Move the spend",
    copy: "More where it's working. Less, or a dispute, where it isn't. Vendor contracts get judged on signed jobs, not lead counts.",
  },
  {
    label: "Ship",
    title: "Add finished projects",
    copy: "New galleries and walkthroughs go up as jobs wrap. The portfolio keeps working for search and for the showroom.",
  },
  {
    label: "Plan",
    title: "Get ahead of spring",
    copy: "Kitchen and bathroom searches peak in May and June. We build in the off-season so you're already showing up when homeowners start planning.",
  },
];

const faqs = [
  {
    question:
      "Is a fractional digital department worth it for an established remodeling company?",
    answer:
      "If you're a design-build or kitchen and bath remodeler with crews or install partners and money already going out for ads or leads, the gap usually isn't more leads. It's that nobody owns the whole path from the first search to the signed contract. We take that seat: we trace where your leads come from, fix where they leak, build the channels you own, and report on signed jobs. [See how the fractional digital department works](/fractional-digital-department).",
  },
  {
    question: "Why do remodeling leads go unanswered?",
    answer:
      "The designer is in a selection meeting. The estimator is on a job. The office is writing yesterday's quotes. The form sits in an inbox, the call goes to voicemail, or a shared lead shows up for several remodelers at once. Buying another lead doesn't fix that. We set up [routing and a fast follow-up](/marketing-automation) so the next step still happens when nobody is at a desk.",
  },
  {
    question: "How is this different from a kitchen and bath marketing agency?",
    answer:
      "An agency usually sells you a channel, hands the account to a junior, and sends a report full of impressions. We own the whole path: the site, Local Services Ads, ad advisory, the Google Business Profile, routing, follow-up, and project content working together. No long contracts, and [reporting on leads and signed jobs](/analytics) instead of vanity metrics.",
  },
  {
    question: "Do you run our ads, or just advise?",
    answer:
      "We advise on the Google spend you already make: what to cut, where the service area is wrong, and which clicks were never going to be a kitchen. If you need hands-on campaign management, we'll work with the person you have or help you find the right one. We're not here to sell you a bigger budget.",
  },
];

export function RemodelingMarketingSections() {
  return (
    <>
      <section className="mkt-hero fdd-hero">
        <DepartmentHeroScene />
        <div className="shell">
          <div className="mkt-hero__content fdd-hero__content">
            <p className="eyebrow">
              For design-build and kitchen and bath remodelers
            </p>
            <h1 className="mkt-hero__headline">
              Remodeling Marketing for Design-Build Remodelers
            </h1>
            <p className="mkt-hero__copy">
              Grand River Labs becomes your digital department. Our remodeling
              marketing covers both halves: we build what brings kitchen and
              bath leads in, and we make sure each one gets to a design
              appointment.
            </p>
            <div className="mkt-hero__actions">
              <BookCallLink
                className="button button-primary"
              >
                Talk through your lead flow
                <Arrow />
              </BookCallLink>
              <a className="button button-secondary" href="#first">
                See what we do first
                <Arrow />
              </a>
            </div>
          </div>
        </div>
        <a className="mkt-hero__cue" href="#gap">
          Where jobs get lost
        </a>
      </section>

      <section className="section ws-friction fwd-gap" id="gap">
        <div className="shell">
          <div className="ws-friction__top reveal">
            <div className="ws-friction__intro">
              <p className="eyebrow">Where remodelers lose jobs</p>
              <h2 className="section-heading">
                The leads aren&apos;t the problem. Nobody owns them.
              </h2>
              <p className="section-copy">
                We work with design-build and kitchen and bath remodelers doing
                roughly $1M–$10M, with crews or install partners and a design
                process. Kitchen remodel marketing and bathroom remodeling
                marketing are already running. What&apos;s missing is one
                person who owns the whole thing.
              </p>
            </div>
            <OwnershipGapScene
              labels={["Lead vendor", "Google", "Showroom", "No owner"]}
            />
          </div>
          <div className="ws-friction__grid reveal">
            {gaps.map((item, index) => (
              <article className="ws-friction__cell" key={item.title}>
                <span className="ws-friction__number">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <h3>{item.title}</h3>
                <p>{item.copy}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section fdd-areas" id="first">
        <div className="shell">
          <div className="fdd-areas__top reveal">
            <div>
              <p className="eyebrow">What we do first</p>
              <h2 className="section-heading">
                The first 90 days: find the leaks, then build.
              </h2>
            </div>
            <p className="section-copy">
              We don&apos;t start by buying more leads. We start by finding out
              what happens to the ones you already get.
            </p>
          </div>
          <div className="fdd-areas__grid fdd-areas__grid--steps reveal">
            {firstSteps.map((item) => (
              <article className="fdd-areas__card" key={item.title}>
                <span className="fdd-areas__label">{item.label}</span>
                <h3>{item.title}</h3>
                <p>{renderInline(item.copy)}</p>
              </article>
            ))}
          </div>
          <p className="fdd-problem__insight reveal">
            We do the work. You don&apos;t get a deck and a to-do list.
          </p>
        </div>
      </section>

      <section className="section fwd-services" id="engine">
        <div className="shell">
          <div className="fwd-services__top reveal">
            <div className="fwd-services__intro">
              <p className="eyebrow">What we run</p>
              <h2 className="section-heading">
                Bringing leads in, and turning them into jobs.
              </h2>
              <p className="section-copy">
                {renderInline(
                  "Most remodelers pay for the first half and leave the second to whoever answers the phone. [We own both](/fractional-digital-department), so a lead doesn't fall through the gap between them.",
                )}
              </p>
            </div>
            <DepartmentOwnershipScene
              nodes={["LSA", "Google", "GBP", "Website"]}
            />
          </div>
          <div className="fwd-services__grid reveal">
            {engine.map((item) => (
              <article className="fwd-services__card" key={item.title}>
                <span className="fwd-services__icon" aria-hidden="true">
                  <ServiceIcon label={item.icon} />
                </span>
                <span className="fwd-services__label">{item.label}</span>
                <h3>{item.title}</h3>
                <p>{renderInline(item.copy)}</p>
              </article>
            ))}
          </div>
          <p className="fwd-services__also reveal">
            <span className="fwd-services__also-label">Own, don&apos;t rent</span>
            {renderInline(
              "Per-lead vendors sell shared leads at a markup, and most established remodelers already have one on the bill. Paid search isn't cheap either: about $42.89 a click on bathroom remodel leads, and about $31.77 on kitchen remodel leads. We build the channels you own, so the lead is yours and not a race.",
            )}
          </p>
          <p className="fwd-services__also reveal">
            <span className="fwd-services__also-label">Referrals</span>
            {renderInline(
              "Referrals are still the best jobs in remodeling. We don't replace them. [Review and referral requests go out after a job closes](/automation), when the homeowner is happiest.",
            )}
          </p>
        </div>
      </section>

      <section className="section fdd-start" id="monthly">
        <div className="shell">
          <div className="fdd-areas__top reveal">
            <div>
              <p className="eyebrow">Every month after</p>
              <h2 className="section-heading">
                Find what&apos;s working. Put more behind it.
              </h2>
            </div>
            <p className="section-copy">
              After the first 90 days, the work follows the numbers: which
              sources turned into signed jobs, and what to do about the ones
              that didn&apos;t.
            </p>
          </div>
          <div className="fdd-areas__grid reveal">
            {monthly.map((item) => (
              <article className="fdd-areas__card" key={item.title}>
                <span className="fdd-areas__label">{item.label}</span>
                <h3>{item.title}</h3>
                <p>{item.copy}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section fdd-flow" id="difference">
        <div className="shell">
          <div className="fdd-flow__top reveal">
            <div>
              <p className="eyebrow">The difference</p>
              <h2 className="section-heading fdd-flow__heading">
                <span>A lead vendor sells you a lead.</span>
                <span>An agency runs a channel.</span>
                <span>We own the path from search to signed contract.</span>
              </h2>
            </div>
            <p className="section-copy">
              One experienced person accountable for the site, the profile,
              the ads, the routing, and the follow-up, and for whether any of
              it turns into kitchens and baths.
            </p>
          </div>
          <p className="fdd-flow__promise reveal">
            One owner. Both halves. Reporting on signed jobs.
          </p>
        </div>
      </section>

      <section className="section fdd-faq" id="faq">
        <div className="shell">
          <div className="fdd-faq__top reveal">
            <div>
              <p className="eyebrow">Questions</p>
              <h2 className="section-heading">
                What remodeling companies usually ask.
              </h2>
            </div>
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
