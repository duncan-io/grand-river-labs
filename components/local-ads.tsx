import { BookCallLink } from "./book-call-link";
import Link from "next/link";
import { renderInline } from "@/components/inline-links";
import { Arrow } from "./site-header";

const friction = [
  {
    title: "Leads shared with competitors",
    copy: "A bought lead gets sold to several companies at once. You're racing other people for a homeowner who already took three calls.",
  },
  {
    title: "Clicks that never become jobs",
    copy: "The search term is broad, the click is expensive, and the person never calls. The report still counts it as traffic.",
  },
  {
    title: "Spend outside the area you serve",
    copy: "The map is a vague circle. Clicks and leads arrive from towns you don't work, and the budget is gone by Thursday.",
  },
  {
    title: "Ads and the site telling different stories",
    copy: "The ad promises a call today. The page it opens is a homepage with no phone number above the fold.",
  },
];

const ways = [
  {
    title: "Local Services Ads strategy",
    lead: "A lead you own, at the top of Google, paid for when someone contacts you.",
    setup:
      "Whether LSA fits your trade and market, which job types and towns to turn on, the budget and bid, hours that match who actually answers the phone, and which leads to dispute.",
    outcome:
      "A plan for leads that are yours—not shared with four other companies, and not billed for a click.",
  },
  {
    title: "Paid search and Meta strategy",
    lead: "Pay for the searches and feeds that can become a job, inside the area you actually serve.",
    setup:
      "Google Ads and Meta spend, search terms, match types, and geo targeting reviewed against the spend you already make—and a list of what to pause.",
    outcome:
      "Fewer wasted clicks. The budget stays on the work you want, in the towns you cover.",
  },
  {
    title: "The report vs. the CRM",
    lead: "Platforms count every call and form as a lead. Your booked jobs disagree.",
    setup:
      "What Google, Meta, and the media buyer report, reconciled against what actually showed up in the CRM—lead by lead.",
    outcome:
      "The real cost per real lead, and the number to take into the next contract conversation.",
  },
  {
    title: "What a lead is worth",
    lead: "The useful number is what a contacted lead is worth if it becomes a job.",
    setup:
      "A comparison of what you pay now—shared leads, LSA, paid search—against what actually turns into work.",
    outcome:
      "A decision you can defend. No flat cost-per-lead, and no push to spend more.",
  },
  {
    title: "The page and the phone path",
    lead: "A good click still dies if nobody can answer it.",
    setup:
      "The landing page, the call button, and where the lead goes after the tap—checked against the ad that bought the visit. [Call tracking](/lead-system) ties the call back to the ad, so what a lead is worth and which leads to dispute use real calls, not clicks.",
    outcome:
      "The ad and the site tell the same story, and a new lead still gets a next step.",
  },
  {
    title: "Who answers for the account",
    lead: "One person accountable for every dollar in the account.",
    setup:
      "We set the rules—what to fund, test, pause, or dispute—and hold the account to them every month, judged on booked jobs.",
    outcome:
      "Every budget call has an owner and a reason you can see.",
  },
];

const placements = [
  {
    name: "Local Services Ads",
    tag: "Pay per lead",
    copy: "A verification badge, reviews, and a button to call or message. The spot this page is about.",
  },
  {
    name: "Search ads",
    tag: "Pay per click",
    copy: "Text ads that open your site. The click is billed whether or not anyone calls.",
  },
  {
    name: "Map pack",
    tag: "Free",
    copy: "Your [Google Business Profile](/google-business-profile)—categories, reviews, and hours.",
  },
  {
    name: "Organic results",
    tag: "Free",
    copy: "Your service pages, ranked by [SEO](/search-engine-optimization).",
  },
];

const facts = [
  {
    label: "You pay for",
    copy: "A lead—a call, message, or booking request from someone in your area asking about a job type you turned on. Not a click.",
  },
  {
    label: "The badge",
    copy: "Google screens the business first: background checks, plus license and insurance checks where the trade requires them. Home services companies that pass show the Google Guaranteed badge.",
  },
  {
    label: "Who gets the lead",
    copy: "You. The customer contacted your business directly, and the lead isn't resold to other companies.",
  },
  {
    label: "Who shows first",
    copy: "Google points to distance from the searcher, reviews, how fast you respond, business hours, and complaints—then budget and bid.",
  },
  {
    label: "Bad leads",
    copy: "Wrong job, outside the area, or spam can be credited back. Someone has to check that the credits actually happen.",
  },
];

const channels = [
  {
    name: "Local Services Ads",
    pay: "A lead—a call, message, or booking. Not a click.",
    shared: "Nobody. The customer contacted you directly.",
    where: "The top of Google search, usually above the other ads, with a verification badge.",
    best: "The job is urgent and common in your trade, and your reviews are strong.",
  },
  {
    name: "Google search ads",
    pay: "A click, whether or not they call.",
    shared: "Nobody—but a click isn't a lead until they reach out.",
    where: "Google search results, below Local Services Ads when both show.",
    best: "You want jobs LSA doesn't cover, or control over the search terms and the page.",
  },
  {
    name: "Meta ads",
    pay: "Impressions—people seeing the ad.",
    shared: "Nobody—but most people who see it weren't looking for you.",
    where: "Facebook and Instagram feeds.",
    best: "The work is planned and visual, like a remodel, and people need to see it before they search.",
  },
  {
    name: "Shared lead sites",
    pay: "A lead, often sold to several companies.",
    shared: "Often three or four other contractors.",
    where: "The lead site's own pages and ads.",
    best: "You need volume fast and can call back within minutes.",
  },
];

export const faqs = [
  {
    question: "What are Google Local Services Ads?",
    answer:
      "Ads that appear at the top of a local Google search for service businesses, with a verification badge, reviews, and a button to call or message. You pay per lead instead of per click, and the lead comes to you directly—it isn't shared with other companies.",
  },
  {
    question: "How much do Local Services Ads cost?",
    answer:
      "You set a weekly budget and pay for each lead, not each click. The price per lead varies by trade, market, and job type, and Google shows its estimates inside the account. The number that matters is the cost per booked job, and that only shows up when the leads are checked against your CRM.",
  },
  {
    question: "What's the difference between Local Services Ads and Google Ads?",
    answer:
      "Local Services Ads bill per lead and show above the other ads with a verification badge. You choose job types and a service area, and Google decides which searches you show for. Google search ads bill per click. You choose the keywords, the ad, and the landing page—more control, and more ways to waste money. Many home services companies run both, with LSA covering the core jobs.",
  },
  {
    question: "What is the Google Guaranteed badge?",
    answer:
      "The badge home services businesses earn by passing Google's screening for Local Services Ads—background checks, plus license and insurance checks where the trade requires them. If a customer books through the ad and the work isn't up to standard, Google may reimburse them up to a set limit.",
  },
  {
    question: "Can you dispute bad Local Services Ads leads?",
    answer:
      "Yes. Leads for a job you don't offer, from outside your service area, or that are spam can qualify for a credit. Google's rules on what qualifies change, so we check what was charged against what actually came in and flag the leads that shouldn't have been billed.",
  },
  {
    question: "How does Google decide which Local Services Ads to show?",
    answer:
      "Google says it weighs how close the business is to the searcher, review score and count, how quickly you respond to leads, business hours, and serious or repeated complaints. Budget and bid matter too. That's why a missed call costs more on LSA than it looks: it hurts the next lead as well as this one.",
  },
];

const steps = [
  {
    title: "See what you pay now",
    copy: "We look at Google Ads, Meta, LSA, and any shared leads—what you spend, what contacts you, and what turns into a job.",
  },
  {
    title: "Choose the channel, or none",
    copy: "We say which one fits how you win work, and which spend should stop. Sometimes the answer is less, not another channel.",
  },
  {
    title: "Set the rules",
    copy: "Geography, the jobs you'll take, the terms worth bidding on, and what a bad lead looks like. Then someone can run the account without guessing.",
  },
  {
    title: "Verify and cut",
    copy: "We reconcile what the platforms reported against what reached the CRM. Waste gets paused and disputed. What works stays. The budget doesn't grow by default.",
  },
];

function LocalAdsHeroScene() {
  return (
    <svg
      className="local-ads-hero__scene"
      aria-hidden="true"
      viewBox="0 0 1600 900"
      preserveAspectRatio="xMidYMid slice"
      fill="none"
    >
      <defs>
        <linearGradient id="local-ads-glow" x1="1100" y1="80" x2="1520" y2="520">
          <stop stopColor="#FFFDF4" stopOpacity=".9" />
          <stop offset="1" stopColor="#B0E4DC" stopOpacity=".2" />
        </linearGradient>
        <linearGradient id="local-ads-panel" x1="988" y1="148" x2="1456" y2="748">
          <stop stopColor="#F7FFFE" />
          <stop offset="1" stopColor="#D7F0EC" />
        </linearGradient>
      </defs>

      <circle
        className="local-ads-hero__glow"
        cx="1280"
        cy="220"
        r="160"
        fill="url(#local-ads-glow)"
        opacity=".85"
      />

      <g>
        <rect
          x="988"
          y="148"
          width="468"
          height="600"
          rx="22"
          fill="url(#local-ads-panel)"
          stroke="#057A72"
          strokeWidth="1.75"
        />
        <circle cx="1016" cy="180" r="5" fill="#6FB8B0" />
        <circle cx="1034" cy="180" r="5" fill="#3A948C" />
        <circle cx="1052" cy="180" r="5" fill="#057A72" />
        <text
          x="1074"
          y="185"
          fill="#075752"
          fontFamily="system-ui, -apple-system, sans-serif"
          fontSize="13"
          fontWeight="700"
          letterSpacing="0.08em"
        >
          SERVICE AREA
        </text>

        <circle
          cx="1168"
          cy="360"
          r="108"
          fill="#EAF7F4"
          stroke="#057A72"
          strokeWidth="1.4"
          strokeDasharray="4 6"
        />
        <circle cx="1168" cy="360" r="64" stroke="#3A948C" strokeWidth="1.2" opacity="0.7" />
        <path
          d="M1088 340h160M1128 292c28 40 28 96 0 136M1208 292c-28 40-28 96 0 136"
          stroke="#6FB8B0"
          strokeWidth="1.2"
          opacity="0.8"
        />
        <path
          d="M1168 332c-8 0-14 8-14 16 0 14 14 28 14 28s14-14 14-28c0-8-6-16-14-16Z"
          fill="#057A72"
        />
        <circle cx="1168" cy="346" r="4" fill="#FFFDF4" />

        <g transform="translate(1048 430)">
          <g className="local-ads-hero__lead">
            <rect
              width="196"
              height="78"
              rx="12"
              fill="#FFFDF4"
              stroke="#057A72"
              strokeWidth="1.5"
            />
            <text
              x="16"
              y="28"
              fill="#3A948C"
              fontFamily="system-ui, -apple-system, sans-serif"
              fontSize="11"
              fontWeight="700"
              letterSpacing="0.08em"
            >
              NEW LEAD
            </text>
            <text
              x="16"
              y="52"
              fill="#075752"
              fontFamily="system-ui, -apple-system, sans-serif"
              fontSize="14"
              fontWeight="700"
            >
              Yours — not shared
            </text>
          </g>
        </g>

        <g transform="translate(1268 268)">
          <text
            x="0"
            y="0"
            fill="#075752"
            fontFamily="system-ui, -apple-system, sans-serif"
            fontSize="11"
            fontWeight="700"
            letterSpacing="0.08em"
          >
            SEARCH TERMS
          </text>
          <rect y="16" width="160" height="36" rx="8" fill="#FFFDF4" stroke="#057A72" strokeWidth="1.2" />
          <text
            x="12"
            y="39"
            fill="#075752"
            fontFamily="system-ui, -apple-system, sans-serif"
            fontSize="12"
            fontWeight="650"
          >
            service, your city
          </text>
          <g className="local-ads-hero__waste">
            <rect y="62" width="160" height="36" rx="8" fill="#FFFDF4" stroke="#6FB8B0" strokeWidth="1.2" />
            <text
              x="12"
              y="85"
              fill="#6FB8B0"
              fontFamily="system-ui, -apple-system, sans-serif"
              fontSize="12"
              fontWeight="650"
            >
              jobs, any city
            </text>
            <path
              d="M12 78h136"
              stroke="#057A72"
              strokeWidth="1.4"
              strokeLinecap="round"
            />
          </g>
        </g>

        <g transform="translate(1020 620)">
          <g className="local-ads-hero__per-lead">
            <rect width="150" height="36" rx="18" fill="#057A72" />
            <text
              x="75"
              y="23"
              textAnchor="middle"
              fill="#FFFDF4"
              fontFamily="system-ui, -apple-system, sans-serif"
              fontSize="12"
              fontWeight="700"
            >
              Pay per lead
            </text>
          </g>
          <g className="local-ads-hero__per-click" transform="translate(166 0)">
            <rect width="150" height="36" rx="18" fill="#FFFDF4" stroke="#057A72" strokeWidth="1.3" />
            <text
              x="75"
              y="23"
              textAnchor="middle"
              fill="#075752"
              fontFamily="system-ui, -apple-system, sans-serif"
              fontSize="12"
              fontWeight="700"
            >
              Pay per click
            </text>
          </g>
        </g>
      </g>

      <path
        d="M0 780c260-50 520-40 780 8 220 40 420 35 820-25v137H0V780Z"
        fill="#EAF7F4"
        opacity=".9"
      />
    </svg>
  );
}

export function LocalAdsSections() {
  return (
    <>
      <section className="local-ads-hero">
        <div className="local-ads-hero__scene-wrap">
          <LocalAdsHeroScene />
        </div>
        <div className="shell">
          <div className="local-ads-hero__content">
            <p className="eyebrow">Google LSA, paid search &amp; Meta</p>
            <h1 className="local-ads-hero__headline">
              Local Services Ads, held to the jobs they book.
            </h1>
            <p className="local-ads-hero__copy">
              Strategy and oversight for Google Local Services Ads and the
              Google Ads and Meta spend around them: what to fund, which leads
              to dispute, and proof that the leads Google reports reached your
              CRM. Not a bigger budget.
            </p>
            <div className="local-ads-hero__actions">
              <BookCallLink
                className="button button-primary"
              >
                Book a call
                <Arrow />
              </BookCallLink>
              <a className="button button-secondary" href="#contact">
                Contact us
                <Arrow />
              </a>
            </div>
          </div>
        </div>
        <a className="local-ads-hero__cue" href="#how-lsa-works">
          How Local Services Ads work
        </a>
      </section>

      <section className="section local-ads-explainer" id="how-lsa-works">
        <div className="shell">
          <div className="local-ads-explainer__top reveal">
            <div>
              <p className="eyebrow">How LSA works</p>
              <h2 className="section-heading">
                What Google Local Services Ads actually are.
              </h2>
            </div>
            <p className="section-copy">
              The ads at the very top of a local Google search, with a
              verification badge and a call button. You pay when someone
              contacts you, not when they click.
            </p>
          </div>
          <div className="local-ads-explainer__body reveal">
            <figure className="local-ads-serp">
              <div className="local-ads-serp__search" aria-hidden="true">
                <svg viewBox="0 0 20 20" fill="none">
                  <circle cx="8.5" cy="8.5" r="5.5" stroke="currentColor" strokeWidth="1.6" />
                  <path d="m13 13 4 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
                </svg>
                roof repair near me
              </div>
              <ol className="local-ads-serp__list">
                {placements.map((item, index) => (
                  <li
                    className={`local-ads-serp__item${index === 0 ? " local-ads-serp__item--lsa" : ""}${item.tag === "Free" ? " local-ads-serp__item--free" : ""}`}
                    key={item.name}
                  >
                    <div className="local-ads-serp__row">
                      <h3>{item.name}</h3>
                      <span className="local-ads-serp__tag">{item.tag}</span>
                    </div>
                    {index === 0 ? (
                      <div className="local-ads-serp__providers" aria-hidden="true">
                        {[0, 1].map((n) => (
                          <span className="local-ads-serp__provider" key={n}>
                            <svg viewBox="0 0 20 20" fill="none">
                              <circle cx="10" cy="10" r="9" fill="currentColor" />
                              <path d="m6 10.2 2.6 2.6L14 7.5" stroke="#fffdf4" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                            <span className="local-ads-serp__bar" />
                            <span className="local-ads-serp__stars">★★★★★</span>
                          </span>
                        ))}
                      </div>
                    ) : null}
                    <p>{renderInline(item.copy)}</p>
                  </li>
                ))}
              </ol>
              <figcaption className="local-ads-serp__caption">
                A typical local search, top to bottom. Only the first two are
                paid.
              </figcaption>
            </figure>
            <dl className="local-ads-facts">
              {facts.map((fact) => (
                <div className="local-ads-facts__row" key={fact.label}>
                  <dt>{fact.label}</dt>
                  <dd>{fact.copy}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </section>

      <section className="section local-ads-friction" id="friction">
        <div className="shell">
          <div className="local-ads-friction__top reveal">
            <div>
              <p className="eyebrow">The leak</p>
              <h2 className="section-heading">
                Local spend leaks before it becomes a job.
              </h2>
            </div>
            <p className="section-copy">
              The problem usually isn&apos;t a missing channel. It&apos;s leads
              you don&apos;t own, clicks outside the area you serve, and a page
              that doesn&apos;t match the ad.
            </p>
          </div>
          <div className="local-ads-friction__grid reveal">
            {friction.map((item, index) => (
              <article className="local-ads-friction__cell" key={item.title}>
                <span className="local-ads-friction__number">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <h3>{item.title}</h3>
                <p>{item.copy}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section local-ads-compare" id="compare">
        <div className="shell">
          <div className="local-ads-compare__top reveal">
            <div>
              <p className="eyebrow">Compare</p>
              <h2 className="section-heading">
                LSA vs. Google Ads, Meta, and lead sites.
              </h2>
            </div>
            <p className="section-copy">
              Four ways to buy local demand, and what each one actually charges
              you for. Most companies need one or two, not all four.
            </p>
          </div>
          <table className="local-ads-compare__table reveal">
            <caption className="visually-hidden">
              How Google Local Services Ads compare with Google search ads,
              Meta ads, and shared lead sites
            </caption>
            <thead>
              <tr>
                <th scope="col">Channel</th>
                <th scope="col">You pay for</th>
                <th scope="col">Who else gets the lead</th>
                <th scope="col">Where it shows</th>
                <th scope="col">Works best when</th>
              </tr>
            </thead>
            <tbody>
              {channels.map((channel, index) => (
                <tr
                  className={index === 0 ? "local-ads-compare__row--lsa" : undefined}
                  key={channel.name}
                >
                  <th scope="row">{channel.name}</th>
                  <td data-label="You pay for">{channel.pay}</td>
                  <td data-label="Who else gets it">{channel.shared}</td>
                  <td data-label="Where it shows">{channel.where}</td>
                  <td data-label="Works best when">{channel.best}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="section local-ads-ways" id="ways">
        <div className="shell">
          <div className="local-ads-ways__top reveal">
            <div>
              <p className="eyebrow">What&apos;s covered</p>
              <h2 className="section-heading">
                What LSA and paid ads oversight covers.
              </h2>
            </div>
            <p className="section-copy">
              We decide which channel fits, what to cut, whether the reported
              leads are real, and who should run the account.
            </p>
          </div>
          <div className="local-ads-ways__grid reveal">
            {ways.map((item, index) => (
              <article className="local-ads-way" key={item.title}>
                <span className="local-ads-way__number">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <h3>{item.title}</h3>
                <p className="local-ads-way__lead">{item.lead}</p>
                <p className="local-ads-way__setup">
                  <span className="local-ads-way__label">What we do</span>
                  {renderInline(item.setup)}
                </p>
                <p className="local-ads-way__outcome">
                  <span className="local-ads-way__label">You get</span>
                  {item.outcome}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section local-ads-flow" id="how-it-works">
        <div className="shell">
          <div className="local-ads-flow__top reveal">
            <div>
              <p className="eyebrow">How it works</p>
              <h2 className="section-heading">
                Strategy first. Every click checked.
              </h2>
            </div>
            <p className="section-copy">
              <Link href="/lead-system">The Lead System</Link> shows whether the spend
              turns into calls.{" "}
              <Link href="/conversion-rate-optimization">The page</Link> the
              click lands on decides whether the call happens.
            </p>
          </div>
          <ol className="local-ads-flow__steps reveal">
            {steps.map((step, index) => (
              <li className="local-ads-flow__step" key={step.title}>
                {index > 0 ? (
                  <span className="local-ads-flow__connector" aria-hidden="true">
                    <svg viewBox="0 0 80 24" fill="none">
                      <path
                        className="local-ads-flow__connector-line"
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
                <span className="local-ads-flow__number">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <h3>{step.title}</h3>
                <p>{step.copy}</p>
              </li>
            ))}
          </ol>
          <p className="fwd-services__also reveal">
            <span className="fwd-services__also-label">Part of the bigger picture</span>
            Local ads are one lever. Whether more spend is the right move
            depends on the site, the routing, and everything else—that&apos;s
            what{" "}
            <Link href="/fractional-marketing-director">the fractional marketing director</Link>{" "}
            figures out, starting with a{" "}
            <Link href="/lead-leak-audit">lead leak audit</Link>.
          </p>
        </div>
      </section>

      <section className="section fdd-faq" id="faq">
        <div className="shell">
          <div className="fdd-faq__top reveal">
            <div>
              <p className="eyebrow">Questions</p>
              <h2 className="section-heading">Local Services Ads, answered.</h2>
            </div>
            <p className="section-copy">
              What owners usually ask before putting more money into LSA.
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
