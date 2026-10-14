import { renderInline } from "@/components/inline-links";
import { BOOK_CALL_HREF } from "@/lib/site";
import { DepartmentHeroScene } from "./department-hero-scene";
import {
  DepartmentOwnershipScene,
  OwnershipGapScene,
  ServiceIcon,
} from "./ownership-scenes";
import { Arrow } from "./site-header";

const fit = [
  {
    title: "Multiple crews",
    copy: "The trucks are already rolling. Lead flow can't depend on the owner catching calls between jobs.",
  },
  {
    title: "An office that's already full",
    copy: "Estimates, scheduling, and the phone take the day. Nobody in that office has the engine as their job.",
  },
  {
    title: "Money already going out",
    copy: "Ads are on. A lead vendor is on the bill. The spend exists. The person who owns it doesn't.",
  },
  {
    title: "No single owner",
    copy: "A freelancer for the site, a vendor for the leads, and an office manager in the ads account when there's a spare hour.",
  },
];

const halves = [
  {
    title: "How the lead gets in",
    copy: "[Google Ads](/local-ads), [Local Services Ads](/local-ads), [SEO](/search-engine-optimization), your [Google Business Profile](/google-business-profile), and the [website](/website-strategy). That's the half most companies already pay for, usually as separate vendors who never talk to each other.",
  },
  {
    title: "What happens after",
    copy: "Routing, follow-up, and speed-to-lead. The call, the form, and the LSA message have to reach the person who can book the job while the homeowner is still deciding. [A missed call still gets a text back](/marketing-automation).",
  },
];

const jobValues = [
  {
    label: "Roofing",
    figure: "About $9,500",
    copy: "A typical roof replacement.",
  },
  {
    label: "General contracting",
    figure: "About $6,300",
    copy: "A typical project.",
  },
  {
    label: "Decking",
    figure: "$6,400–$8,200",
    copy: "A deck in the usual range.",
  },
];

const trades: { name: string; copy: string; href?: string }[] = [
  {
    name: "Roofing",
    href: "/fractional-digital-department/roofing",
    copy: "Storm weeks, shared leads, and a reply that has to land while the homeowner is still in the driveway.",
  },
  {
    name: "General contracting",
    href: "/fractional-digital-department/contractors",
    copy: "Remodels and the jobs that die between a form fill and an estimator who's already on site.",
  },
  {
    name: "Painting",
    copy: "Interior and exterior work that gets priced against three other painters the same afternoon.",
  },
  {
    name: "Garage doors",
    copy: "A search that turns into a booked install when someone answers before the homeowner calls the next company.",
  },
  {
    name: "Tree service",
    copy: "Storm cleanup and planned removals. The lead is useless if the crew is in a bucket and nobody calls back.",
  },
  {
    name: "Decking and outdoor living",
    copy: "Decks, porches, and the outdoor projects homeowners plan for months before they hire.",
  },
  {
    name: "Siding",
    copy: "A high-ticket exterior job. The homeowner compares a few companies, then hires the one who showed up in the conversation.",
  },
  {
    name: "Windows",
    copy: "Replacement work with a long decision and a short list. The company that follows up is the one that gets the measure.",
  },
  {
    name: "Fencing",
    copy: "A project homeowners quote out to a handful of companies. Speed and a clear next step decide who builds it.",
  },
];

const channels = [
  {
    icon: "Route",
    label: "Route",
    title: "Lead routing",
    copy: "Calls, forms, and LSA messages go to the person who can act. [A missed call gets an automatic text back](/marketing-automation), so the lead still gets a next step when the office is on another quote.",
  },
  {
    icon: "Rank",
    label: "Rank",
    title: "Local Services Ads",
    copy: "They sit at the top of Google. You pay for leads that contact you, and the lead is yours—not shared with other companies. Leads that don't fit can be disputed.",
  },
  {
    icon: "Advise",
    label: "Advise",
    title: "Google Ads",
    copy: "[We audit the spend you already make](/local-ads)—search terms, wasted clicks, the towns you actually work—and tell you what to cut. We advise. We don't sell you a bigger budget.",
  },
  {
    icon: "Target",
    label: "Map",
    title: "Google Business Profile",
    copy: "A lot of these jobs start on the map. Categories, photos, hours, and a link to a page that can win the estimate. [The profile has to match the work you want](/google-business-profile).",
  },
  {
    icon: "Site",
    label: "Convert",
    title: "Website",
    copy: "The call comes in on a phone. [The site stays fast](/website-strategy), the call button stays one tap away, and every quote form routes to a person.",
  },
  {
    icon: "Compound",
    label: "Compound",
    title: "SEO",
    copy: "Ads stop when you stop paying. Service pages and reviews keep bringing leads for years. [SEO](/search-engine-optimization) is slow—months, not weeks—so it's one part of the plan, not the whole plan.",
  },
];

const faqs = [
  {
    question:
      "Is a fractional digital department worth it for an established home improvement company?",
    answer:
      "If you're doing roughly $1M–$50M, you already have crews, an office, and money going out for ads or leads. What's missing is one person who owns generation and response together. On this work—a roof around $9,500, a general contracting job around $6,300, a deck in the $6,400–$8,200 range—one extra booked job covers months of the engagement. For a company around $2M, that spend is a rounding error next to revenue. If you're a solo operator, it isn't the right first step. A per-lead vendor or ads you run yourself are a reasonable start.",
  },
  {
    question: "Why do home improvement leads go unanswered?",
    answer:
      "The estimator is on a job. The office is writing yesterday's quotes. The form sits in an inbox, the call goes to voicemail, or a shared lead shows up at the same time it shows up for other companies. Buying another lead doesn't fix that. [Routing and a fast follow-up](/marketing-automation) are how the next step still happens when nobody is at a desk.",
  },
  {
    question: "How is this different from a home improvement marketing company?",
    answer:
      "A typical home improvement marketing company sells you a channel, hands the account to a junior, and sends a report full of impressions. [A fractional digital department](/fractional-digital-department) is one experienced person responsible for the site, Local Services Ads, ad advisory, the Google Business Profile, routing, and SEO working together. No long contracts, and [reporting on leads and calls](/analytics) instead of vanity metrics.",
  },
  {
    question: "Do you run our ads, or just advise?",
    answer:
      "We advise on the Google spend you already make: what to cut, where the service area is wrong, and which clicks were never going to be a job. If you need hands-on campaign management, we'll work with the person you have or help you find the right one. We're not here to sell you a bigger budget.",
  },
];

export function HomeImprovementMarketingSections() {
  return (
    <>
      <section className="mkt-hero fdd-hero">
        <DepartmentHeroScene />
        <div className="shell">
          <div className="mkt-hero__content fdd-hero__content">
            <p className="eyebrow">
              Home improvement marketing for established contractors
            </p>
            <h1 className="mkt-hero__headline">
              Home Improvement Marketing That Owns the Whole Pipeline
            </h1>
            <p className="mkt-hero__copy">
              One person owns how leads get in and what happens after they do.
              Not a pile of freelancers, not a per-lead vendor, and not an
              office manager running ads between estimates.
            </p>
            <div className="mkt-hero__actions">
              <a
                className="button button-primary"
                href={BOOK_CALL_HREF}
                target="_blank"
                rel="noopener noreferrer"
              >
                Talk through your lead flow
                <Arrow />
              </a>
              <a className="button button-secondary" href="#engine">
                See the engine
                <Arrow />
              </a>
            </div>
          </div>
        </div>
        <a className="mkt-hero__cue" href="#who">
          Who this is for
        </a>
      </section>

      <section className="section ws-friction fwd-gap" id="who">
        <div className="shell">
          <div className="ws-friction__top reveal">
            <div className="ws-friction__intro">
              <p className="eyebrow">Who this is for</p>
              <h2 className="section-heading">
                Marketing for home improvement companies that already have crews.
              </h2>
              <p className="section-copy">
                Roughly $1M–$50M a year. Several crews. An office that is
                already busy. Money already leaving for ads and lead vendors.
                No single owner of the engine.
              </p>
            </div>
            <OwnershipGapScene
              labels={["Freelancers", "Lead vendors", "Spare time", "No owner"]}
            />
          </div>
          <div className="ws-friction__grid reveal">
            {fit.map((item, index) => (
              <article className="ws-friction__cell" key={item.title}>
                <span className="ws-friction__number">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <h3>{item.title}</h3>
                <p>{item.copy}</p>
              </article>
            ))}
          </div>
          <p className="fdd-problem__insight reveal">
            Solo operators: a per-lead vendor and ads you run yourself are a
            reasonable start.
          </p>
        </div>
      </section>

      <section className="section fdd-areas" id="pipeline">
        <div className="shell">
          <div className="fdd-areas__top reveal">
            <div>
              <p className="eyebrow">The two halves</p>
              <h2 className="section-heading">
                Generation and response, owned by the same person.
              </h2>
            </div>
            <p className="section-copy">
              Home improvement digital marketing is not a pile of channels.
              It&apos;s the lead, and the reply that books it.
            </p>
          </div>
          <div className="fdd-areas__grid fdd-areas__grid--pair reveal">
            {halves.map((item) => (
              <article className="fdd-areas__card" key={item.title}>
                <h3>{item.title}</h3>
                <p>{renderInline(item.copy)}</p>
              </article>
            ))}
          </div>
          <p className="fwd-services__also reveal">
            <span className="fwd-services__also-label">Own, don&apos;t rent</span>
            {renderInline(
              "Per-lead vendors charge $25–$900 a lead. Plenty of those leads are shared, and plenty aren't a real homeowner—shared leads and bot leads are widely distrusted for that reason. [Local Services Ads](/local-ads) delivered direct often land at $6–$30, and the lead is yours, not a race with other companies.",
            )}
          </p>
        </div>
      </section>

      <section className="section fwd-peace" id="math">
        <div className="shell">
          <div className="fwd-peace__top reveal">
            <div>
              <p className="eyebrow">The math</p>
              <h2 className="section-heading">
                One booked job covers months of the engagement.
              </h2>
            </div>
            <p className="section-copy">
              This is high-ticket project work. One extra booked job covers
              months of a fractional retainer. For a company doing about $2M,
              that spend is a rounding error next to revenue, not a bet.
            </p>
          </div>
          <div className="fdd-areas__grid fdd-areas__grid--steps reveal">
            {jobValues.map((item) => (
              <article className="fdd-areas__card" key={item.label}>
                <span className="fdd-areas__label">{item.label}</span>
                <h3>{item.figure}</h3>
                <p>{item.copy}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section industry-strip" id="trades">
        <div className="shell">
          <div className="industry-strip__top reveal">
            <div>
              <p className="eyebrow">The trades</p>
              <h2 className="section-heading">
                Every trade. A deeper page where one exists.
              </h2>
            </div>
            <p className="section-copy">
              Roofing and general contracting each have their own page. The
              other trades are why this page exists—the same engine, without a
              separate pitch for every crew.
            </p>
          </div>
          <div className="fdd-areas__grid fdd-areas__grid--levers reveal">
            {trades.map((trade) => (
              <article className="fdd-areas__card" key={trade.name}>
                {trade.href ? (
                  <span className="fdd-areas__label">Deeper page</span>
                ) : null}
                <h3>
                  {trade.href ? (
                    <a href={trade.href}>{trade.name}</a>
                  ) : (
                    trade.name
                  )}
                </h3>
                <p>{trade.copy}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section fdd-start" id="season">
        <div className="shell">
          <div className="fdd-areas__top reveal">
            <div>
              <p className="eyebrow">The off-season</p>
              <h2 className="section-heading">
                The spring rush is won in the fall.
              </h2>
            </div>
            <p className="section-copy">
              Home improvement marketing searches peak in fall and winter,
              while homeowners are planning. A home improvement marketing
              strategy that waits for March is already late. The operators who
              build the profile, the pages, the routing, and the ads account
              in the quiet months are the ones who answer when the weather
              turns.
            </p>
          </div>
        </div>
      </section>

      <section className="section fwd-services" id="engine">
        <div className="shell">
          <div className="fwd-services__top reveal">
            <div className="fwd-services__intro">
              <p className="eyebrow">The lead engine</p>
              <h2 className="section-heading">
                What a fractional digital department handles.
              </h2>
              <p className="section-copy">
                {renderInline(
                  "[One experienced owner](/fractional-digital-department) for every channel that brings work in, and for the reply that books it. Not five vendors, and not a monthly report full of impressions.",
                )}
              </p>
            </div>
            <DepartmentOwnershipScene
              nodes={["LSA", "Google", "GBP", "Website"]}
            />
          </div>
          <div className="fwd-services__grid reveal">
            {channels.map((item) => (
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
            <span className="fwd-services__also-label">Referrals</span>
            {renderInline(
              "Referrals are still the best jobs in these trades. We don't replace them. [Review and referral requests go out after a job closes](/automation), when the homeowner is happiest. LSA, ads, and SEO cover the weeks referrals don't.",
            )}
          </p>
        </div>
      </section>

      <section className="section fdd-faq" id="faq">
        <div className="shell">
          <div className="fdd-faq__top reveal">
            <div>
              <p className="eyebrow">Questions</p>
              <h2 className="section-heading">
                What home improvement companies usually ask.
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
