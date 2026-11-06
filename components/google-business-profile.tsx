import { BookCallLink } from "./book-call-link";
import Link from "next/link";
import { renderInline } from "@/components/inline-links";
import { AUDIT_FEE, DIRECTOR_MONTHLY, formatUsd } from "@/lib/pricing";
import { Arrow } from "./site-header";

const factors = [
  {
    name: "Relevance",
    copy: "How well the listing matches the search. Categories, services, and the description do most of the work.",
  },
  {
    name: "Distance",
    copy: "How far the business is from the searcher, or from the town they typed. You can't move, but the service area has to be honest.",
  },
  {
    name: "Prominence",
    copy: "How well known the business is: review count and rating, plus the pages and links about it across the web, [your own site](/search-engine-optimization) included.",
  },
];

const facts = [
  {
    label: "You control",
    copy: "Categories, services, hours, photos, the description, the website link, and whether reviews get a reply.",
  },
  {
    label: "You don't",
    copy: "Where the searcher is standing, and how many competitors are closer to them than you are.",
  },
  {
    label: "Off limits",
    copy: "Keywords stuffed into the business name, an address you don't work from, and paid or filtered reviews. They break Google's guidelines and can get the listing suspended.",
  },
  {
    label: "Where calls go",
    copy: "The call button dials whatever number is on the profile. Without a [tracking number](/lead-system) for the listing, map calls and website calls look the same.",
  },
];

const friction = [
  {
    title: "A listing that doesn't match the work",
    copy: "The profile says contractor. Homeowners search for the job you actually do. Google shows the business whose categories match the words they typed.",
  },
  {
    title: "Defaults and a vague service area",
    copy: "Hours are wrong. The area is a circle you don't serve. Categories were picked once, years ago, and never touched again.",
  },
  {
    title: "Reviews left unanswered",
    copy: "A five-star review sits there. So does the one-star. Neither gets a reply, so the listing looks unattended to the next homeowner reading it.",
  },
  {
    title: "A profile that opens a weak page",
    copy: "Someone taps the website and lands on a homepage that doesn't name the service, the town, or how to call. And [nobody can tell](/lead-system) whether the calls that do come in started on the map.",
  },
];

const ways = [
  {
    title: "Categories and services",
    lead: "Google has to know what you do before it can show you.",
    setup:
      "Primary and secondary categories, plus the services you actually want, checked against the jobs you're trying to win.",
    outcome: "A listing that matches the job, instead of a generic trade.",
  },
  {
    title: "Photos, hours, and the service area",
    lead: "The map result should look like a business someone can trust.",
    setup:
      "Photos, hours, and the service area audited against how the business actually runs—not the defaults someone picked years ago.",
    outcome: "A profile that looks open, local, and specific.",
  },
  {
    title: "The website link and where calls go",
    lead: "The listing should send people to a page that can win the job.",
    setup:
      "Where the link and the call button actually send people, and whether calls from the profile are tracked at all. A separate number for the listing is [call tracking](/lead-system)—without it, map calls and website calls look the same.",
    outcome: "The tap lands on a page that names the work, and map calls get counted.",
  },
  {
    title: "Reviews and questions",
    lead: "A review is part of the listing, not a separate project.",
    setup:
      "The review process audited: who asks, who replies, and what an unanswered one-star says to the next searcher. No schemes, and no asking only the happy customers.",
    outcome:
      "A profile that looks looked-after, including when the review isn't glowing.",
  },
  {
    title: "Small fixes, done",
    lead: "A listing that's mostly right still leaks.",
    setup:
      "The quick wins—categories, hours, the link, a reply to the last review—fixed as part of patching the leak, not left in a report.",
    outcome: "The profile corrected where it was costing you, not just noted.",
  },
];

const steps = [
  {
    title: "See the listing",
    copy: "We audit what Google shows today—categories, photos, hours, reviews, where the website link goes, and whether calls from the profile are tracked.",
  },
  {
    title: "Match it to the work",
    copy: "We line the profile up with the jobs you want and the towns you serve. If the listing overclaims, we cut it back.",
  },
  {
    title: "Fix the quick wins",
    copy: "Categories, services, hours, the description, and the page the profile opens get corrected—the small fixes that were leaking leads.",
  },
  {
    title: "Check the result",
    copy: "With call tracking in place, calls from the map listing get counted and checked against the jobs they book.",
  },
];

export const faqs = [
  {
    question: "What is Google Business Profile optimization?",
    answer:
      "It's the work of making your Google Business Profile, the listing that shows on Google Maps and in the map results, match the jobs you want and the towns you serve. That means the right categories and services, accurate hours and service area, real photos, replies to reviews, and a website link that opens a page able to win the job. For a home services company it also means counting the calls the listing produces.",
  },
  {
    question: "How do I get my business into the map results?",
    answer:
      "Google says it ranks local results on relevance, distance, and prominence. Relevance is how well your categories and services match the search. Distance is how close you are to the searcher, which you can't change. Prominence is how well known the business is, including reviews and your [website](/search-engine-optimization). A complete, accurate profile with steady, honest reviews gives you the best chance. Nobody can promise a spot in the top three.",
  },
  {
    question:
      "Which categories should a contractor or home services company choose?",
    answer:
      "The primary category should name the work you most want, as specifically as Google allows. Pick \"Roofing contractor\" over \"Contractor\", for example. Secondary categories cover the other jobs you really do. Adding categories for work you don't want brings in calls you'll turn down, so we check every category against the jobs you're trying to win.",
  },
  {
    question: "Do service-area businesses need to show an address?",
    answer:
      "No. If customers don't come to your location, Google's guidelines say to hide the address and list the areas you serve instead. The service area should match where you'll actually send a truck, not a wide circle drawn to look bigger.",
  },
  {
    question: "Can we offer discounts for reviews, or only ask happy customers?",
    answer:
      "No to both. Google's policies prohibit paying for reviews or offering incentives, and they prohibit asking only the customers you expect to leave a good one. Either can get reviews removed or the profile penalized. What works is asking every customer at the same point in the job, and replying to every review, including the bad ones.",
  },
  {
    question: "How do you track calls from the Google Business Profile?",
    answer:
      "With a [call tracking](/lead-system) number used only on the listing, with your main number kept on the profile as an additional phone. Calls from the map then show up separately from website and ad calls, and can be checked against the jobs they book.",
  },
  {
    question: "How much does Google Business Profile optimization cost?",
    answer: `The profile is part of the [fractional marketing director](/fractional-marketing-director) engagement, starting at ${formatUsd(DIRECTOR_MONTHLY)}/month, rather than a separate fee. The ${formatUsd(AUDIT_FEE)} [lead leak audit](/lead-leak-audit) checks the profile alongside the site, calls, and follow-up.`,
  },
  {
    question: "How long before changes to the profile show up?",
    answer:
      "Edits like hours, categories, and the website link usually appear within days, though Google sometimes reviews a change first. Whether the listing then shows up for more searches takes longer, often weeks, and depends on the competition nearby. We judge it on calls from the listing, not on where it ranks on a given day.",
  },
];

function GbpHeroScene() {
  return (
    <svg
      className="gbp-hero__scene"
      aria-hidden="true"
      viewBox="0 0 1600 900"
      preserveAspectRatio="xMidYMid slice"
      fill="none"
    >
      <defs>
        <linearGradient id="gbp-glow" x1="1100" y1="80" x2="1520" y2="520">
          <stop stopColor="#FFFDF4" stopOpacity=".9" />
          <stop offset="1" stopColor="#B0E4DC" stopOpacity=".2" />
        </linearGradient>
        <linearGradient id="gbp-panel" x1="988" y1="128" x2="1488" y2="768">
          <stop stopColor="#F7FFFE" />
          <stop offset="1" stopColor="#D7F0EC" />
        </linearGradient>
      </defs>

      <circle
        className="gbp-hero__glow"
        cx="1280"
        cy="200"
        r="160"
        fill="url(#gbp-glow)"
        opacity=".85"
      />

      <g>
        <rect
          x="988"
          y="128"
          width="500"
          height="640"
          rx="22"
          fill="url(#gbp-panel)"
          stroke="#057A72"
          strokeWidth="1.75"
        />
        <circle cx="1016" cy="160" r="5" fill="#6FB8B0" />
        <circle cx="1034" cy="160" r="5" fill="#3A948C" />
        <circle cx="1052" cy="160" r="5" fill="#057A72" />
        <text
          x="1074"
          y="165"
          fill="#075752"
          fontFamily="system-ui, -apple-system, sans-serif"
          fontSize="13"
          fontWeight="700"
          letterSpacing="0.08em"
        >
          MAP PACK
        </text>

        <rect
          x="1020"
          y="188"
          width="436"
          height="40"
          rx="20"
          fill="#FFFDF4"
          stroke="#057A72"
          strokeWidth="1.2"
        />
        <circle cx="1044" cy="208" r="6" fill="none" stroke="#057A72" strokeWidth="1.4" />
        <path d="M1048 212l5 5" stroke="#057A72" strokeWidth="1.4" strokeLinecap="round" />
        <text
          x="1064"
          y="213"
          fill="#075752"
          fontFamily="system-ui, -apple-system, sans-serif"
          fontSize="14"
          fontWeight="650"
        >
          service near you
        </text>

        <g transform="translate(1020 252)">
          <rect
            width="436"
            height="292"
            rx="16"
            fill="#FFFDF4"
            stroke="#057A72"
            strokeWidth="1.4"
          />
          <g className="gbp-hero__photos">
            <rect x="16" y="16" width="128" height="84" rx="8" fill="#057A72" />
            <rect x="154" y="16" width="128" height="84" rx="8" fill="#3A948C" />
            <rect x="292" y="16" width="128" height="84" rx="8" fill="#6FB8B0" />
          </g>
          <text
            x="16"
            y="132"
            fill="#075752"
            fontFamily="system-ui, -apple-system, sans-serif"
            fontSize="18"
            fontWeight="700"
          >
            Your company
          </text>
          <g className="gbp-hero__stars">
            <text
              x="16"
              y="158"
              fill="#057A72"
              fontFamily="system-ui, -apple-system, sans-serif"
              fontSize="14"
              fontWeight="700"
            >
              ★★★★★
            </text>
            <text
              x="92"
              y="158"
              fill="#3A948C"
              fontFamily="system-ui, -apple-system, sans-serif"
              fontSize="13"
              fontWeight="650"
            >
              128 reviews
            </text>
          </g>
          <g className="gbp-hero__generic">
            <text
              x="16"
              y="186"
              fill="#6FB8B0"
              fontFamily="system-ui, -apple-system, sans-serif"
              fontSize="13"
              fontWeight="650"
            >
              General contractor
            </text>
            <path
              d="M16 181h148"
              stroke="#057A72"
              strokeWidth="1.4"
              strokeLinecap="round"
            />
          </g>
          <g className="gbp-hero__specific">
            <text
              x="16"
              y="186"
              fill="#075752"
              fontFamily="system-ui, -apple-system, sans-serif"
              fontSize="13"
              fontWeight="700"
            >
              The service you actually do · Open
            </text>
          </g>
          <text
            x="16"
            y="214"
            fill="#365e5b"
            fontFamily="system-ui, -apple-system, sans-serif"
            fontSize="13"
          >
            Serves the towns you cover
          </text>
          <g transform="translate(16 232)">
            <rect width="88" height="36" rx="18" fill="#FFFDF4" stroke="#057A72" strokeWidth="1.3" />
            <text
              x="44"
              y="23"
              textAnchor="middle"
              fill="#075752"
              fontFamily="system-ui, -apple-system, sans-serif"
              fontSize="12"
              fontWeight="700"
            >
              Call
            </text>
            <g transform="translate(100 0)">
              <rect width="112" height="36" rx="18" fill="#FFFDF4" stroke="#057A72" strokeWidth="1.3" />
              <text
                x="56"
                y="23"
                textAnchor="middle"
                fill="#075752"
                fontFamily="system-ui, -apple-system, sans-serif"
                fontSize="12"
                fontWeight="700"
              >
                Directions
              </text>
            </g>
            <g className="gbp-hero__website" transform="translate(224 0)">
              <rect width="112" height="36" rx="18" fill="#057A72" />
              <text
                x="56"
                y="23"
                textAnchor="middle"
                fill="#FFFDF4"
                fontFamily="system-ui, -apple-system, sans-serif"
                fontSize="12"
                fontWeight="700"
              >
                Website
              </text>
            </g>
          </g>
        </g>

        <g transform="translate(1020 568)">
          <g className="gbp-hero__homepage">
            <rect width="200" height="36" rx="18" fill="#FFFDF4" stroke="#6FB8B0" strokeWidth="1.3" />
            <text
              x="100"
              y="23"
              textAnchor="middle"
              fill="#6FB8B0"
              fontFamily="system-ui, -apple-system, sans-serif"
              fontSize="12"
              fontWeight="700"
            >
              Opens homepage
            </text>
            <path d="M24 18h152" stroke="#057A72" strokeWidth="1.4" strokeLinecap="round" />
          </g>
          <g className="gbp-hero__service-page" transform="translate(216 0)">
            <rect width="220" height="36" rx="18" fill="#057A72" />
            <text
              x="110"
              y="23"
              textAnchor="middle"
              fill="#FFFDF4"
              fontFamily="system-ui, -apple-system, sans-serif"
              fontSize="12"
              fontWeight="700"
            >
              Opens the service page
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

export function GbpSections() {
  return (
    <>
      <section className="mkt-hero gbp-hero">
        <div className="gbp-hero__scene-wrap">
          <GbpHeroScene />
        </div>
        <div className="shell">
          <div className="mkt-hero__content">
            <p className="eyebrow">Google Business Profile · Home services</p>
            <h1 className="mkt-hero__headline">
              Show up on the map for the jobs you actually want.
            </h1>
            <p className="mkt-hero__copy">
              Google Business Profile optimization for home services:
              categories that match the work, a service area you really cover,
              and a listing that opens the right page. Map calls counted, not
              guessed.
            </p>
            <div className="mkt-hero__actions">
              <BookCallLink className="button button-primary">
                Book a 30-minute call
                <Arrow />
              </BookCallLink>
              <a className="button button-secondary" href="#ways">
                See what we check
              </a>
            </div>
            <ul className="mkt-hero__facts">
              <li>Map calls counted separately</li>
              <li>No review schemes or citation blasts</li>
              <li>Part of the fractional marketing director engagement</li>
            </ul>
          </div>
        </div>
        <a className="mkt-hero__cue" href="#how-the-map-works">
          How the map results work
        </a>
      </section>

      <section className="section gbp-explainer" id="how-the-map-works">
        <div className="shell">
          <div className="gbp-explainer__top reveal">
            <div>
              <p className="eyebrow">How the map works</p>
              <h2 className="section-heading">
                How Google decides who shows on the map.
              </h2>
            </div>
            <p className="section-copy">
              Google says it ranks local results on three things: relevance,
              distance, and prominence. Only some of that is yours to change.
            </p>
          </div>
          <div className="gbp-explainer__body reveal">
            <ol className="gbp-factors">
              {factors.map((factor, index) => (
                <li className="gbp-factor" key={factor.name}>
                  <span className="gbp-factor__number">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <h3>{factor.name}</h3>
                  <p>{renderInline(factor.copy)}</p>
                </li>
              ))}
            </ol>
            <dl className="local-ads-facts">
              {facts.map((fact) => (
                <div className="local-ads-facts__row" key={fact.label}>
                  <dt>{fact.label}</dt>
                  <dd>{renderInline(fact.copy)}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </section>

      <section className="section gbp-friction" id="friction">
        <div className="shell">
          <div className="gbp-friction__top reveal">
            <div>
              <p className="eyebrow">The stall</p>
              <h2 className="section-heading">
                The map result doesn&apos;t maintain itself.
              </h2>
            </div>
            <p className="section-copy">
              Most profiles aren&apos;t missing a trick. They have the wrong
              categories, a vague area, and a link that opens a page that
              can&apos;t win the job.
            </p>
          </div>
          <div className="gbp-friction__grid reveal">
            {friction.map((item, index) => (
              <article className="gbp-friction__cell" key={item.title}>
                <span className="gbp-friction__number">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <h3>{item.title}</h3>
                <p>{renderInline(item.copy)}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section gbp-ways" id="ways">
        <div className="shell">
          <div className="gbp-ways__top reveal">
            <div>
              <p className="eyebrow">What&apos;s covered</p>
              <h2 className="section-heading">
                What we check on your profile.
              </h2>
            </div>
            <p className="section-copy">
              What Google shows, checked against the work you actually want.
              Quick wins get fixed; the rest gets a recommendation you can hand
              to whoever manages the listing.
            </p>
          </div>
          <div className="gbp-ways__grid reveal">
            {ways.map((item, index) => (
              <article className="gbp-way" key={item.title}>
                <span className="gbp-way__number">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <h3>{item.title}</h3>
                <p className="gbp-way__lead">{item.lead}</p>
                <p className="gbp-way__setup">
                  <span className="gbp-way__label">What we check</span>
                  {renderInline(item.setup)}
                </p>
                <p className="gbp-way__outcome">
                  <span className="gbp-way__label">You get</span>
                  {item.outcome}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section gbp-flow" id="how-it-works">
        <div className="shell">
          <div className="gbp-flow__top reveal">
            <div>
              <p className="eyebrow">How it works</p>
              <h2 className="section-heading">
                Audit it. Fix the leaks. Count the calls.
              </h2>
            </div>
            <p className="section-copy">
              This is the profile itself.{" "}
              <Link href="/search-engine-optimization">SEO</Link> is the service
              pages the listing should open.{" "}
              <Link href="/local-ads">Local Services Ads</Link> are the paid
              spot above it.
            </p>
          </div>
          <ol className="gbp-flow__steps reveal">
            {steps.map((step, index) => (
              <li className="gbp-flow__step" key={step.title}>
                {index > 0 ? (
                  <span className="gbp-flow__connector" aria-hidden="true">
                    <svg viewBox="0 0 80 24" fill="none">
                      <path
                        className="gbp-flow__connector-line"
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
                <span className="gbp-flow__number">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <h3>{step.title}</h3>
                <p>{step.copy}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="section leak-next gbp-next" id="next">
        <div className="shell">
          <div className="services__top reveal">
            <div>
              <p className="eyebrow">Where the profile fits</p>
              <h2 className="section-heading">
                Part of the engagement, not a one-off cleanup.
              </h2>
            </div>
            <p className="section-copy">
              The profile is one lever. Whether it&apos;s the right one to pull
              first depends on the site, the calls, and where the leads are
              actually leaking.
            </p>
          </div>
          <div className="engagement-compare leak-next__options reveal">
            <article className="engagement-compare__card">
              <p className="engagement-compare__label">Start with the audit</p>
              <p className="engagement-compare__value">
                {formatUsd(AUDIT_FEE)}
                <span className="engagement-compare__period"> flat</span>
              </p>
              <p className="engagement-compare__note">
                Two weeks tracing calls, forms, follow-up, tracking, and the
                profile, ranked by what each leak costs. The right first step
                if you&apos;re not sure the map listing is the problem.
              </p>
              <Link className="leak-next__link" href="/lead-leak-audit">
                What the audit covers
                <Arrow />
              </Link>
            </article>
            <article className="engagement-compare__card engagement-compare__card--us">
              <p className="engagement-compare__label">
                Fractional marketing director
              </p>
              <p className="engagement-compare__value">
                <span className="engagement-compare__period">Starting at </span>
                {formatUsd(DIRECTOR_MONTHLY)}
                <span className="engagement-compare__period">/month</span>
              </p>
              <p className="engagement-compare__note">
                We direct the profile work alongside the site and the ads, and
                check map calls against booked jobs month after month.
              </p>
              <Link
                className="leak-next__link"
                href="/fractional-marketing-director"
              >
                How the engagement works
                <Arrow />
              </Link>
            </article>
          </div>
        </div>
      </section>

      <section className="section fdd-faq" id="faq">
        <div className="shell">
          <div className="fdd-faq__top reveal">
            <div>
              <p className="eyebrow">Questions</p>
              <h2 className="section-heading">
                Google Business Profile, answered.
              </h2>
            </div>
            <p className="section-copy">
              What owners usually ask about categories, reviews, and getting
              into the map results.
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
