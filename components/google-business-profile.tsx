import Link from "next/link";
import { BOOK_CALL_HREF } from "@/lib/site";
import { Arrow } from "./site-header";

const friction = [
  {
    title: "A listing that doesn't match the work",
    copy: "The profile says contractor. People search for the job you actually do. Google shows the business whose categories match the words they typed.",
  },
  {
    title: "Defaults and a vague service area",
    copy: "Hours are wrong. The area is a circle you don't serve. Categories were picked once, years ago, and never touched again.",
  },
  {
    title: "Reviews left unanswered",
    copy: "A five-star review sits there. So does the one-star. Neither gets a reply, so the listing looks unattended.",
  },
  {
    title: "A profile that opens a weak page",
    copy: "Someone taps the website. They land on a homepage that doesn't name the service, the town, or how to call.",
  },
];

const ways = [
  {
    title: "Categories and services",
    lead: "Google has to know what you do before it can show you.",
    setup:
      "Primary and secondary categories, plus the services you actually want, written the way people search.",
    outcome: "A listing that matches the job, instead of a generic trade.",
  },
  {
    title: "Photos, hours, and the service area",
    lead: "The map result should look like a business someone can trust.",
    setup:
      "Current photos, accurate hours, and a service area that covers the towns you work—not a default circle.",
    outcome: "A profile that looks open, local, and specific.",
  },
  {
    title: "Description and the website link",
    lead: "The listing should send people to a page that can win the job.",
    setup:
      "A short description in plain language, and a link to the service page—not the homepage by default.",
    outcome: "The tap lands on a page that names the work and how to start.",
  },
  {
    title: "Reviews and questions",
    lead: "A review is part of the listing, not a separate project.",
    setup:
      "Replies to reviews and questions, in your voice. No schemes, and no asking only the happy customers.",
    outcome:
      "A profile that looks looked-after, including when the review isn't glowing.",
  },
  {
    title: "Kept current",
    lead: "A profile set up once drifts.",
    setup:
      "Hours, photos, services, and seasonal changes checked as part of looking after the local presence.",
    outcome: "A listing that stays true, instead of a setup that expires.",
  },
];

const steps = [
  {
    title: "See the listing",
    copy: "We look at what Google shows today—categories, photos, hours, reviews, and where the website link goes.",
  },
  {
    title: "Match it to the work",
    copy: "We line the profile up with the jobs you want and the towns you serve. If the listing overclaims, we cut it back.",
  },
  {
    title: "Fix what Google shows",
    copy: "We update categories, services, photos, hours, the description, and the page the profile opens. Reviews and questions get a reply.",
  },
  {
    title: "Keep it current",
    copy: "Hours change. Photos age. We come back so the listing doesn't drift back to the default.",
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
      <section className="gbp-hero">
        <div className="gbp-hero__scene-wrap">
          <GbpHeroScene />
        </div>
        <div className="shell">
          <div className="gbp-hero__content">
            <p className="eyebrow">Google Business Profile</p>
            <h1 className="gbp-hero__headline">
              Show up in the map results that win the work.
            </h1>
            <p className="gbp-hero__copy">
              Categories, services, photos, hours, and the link to the site.
              Not review schemes, not a citation blast, and not posts for their
              own sake.
            </p>
            <div className="gbp-hero__actions">
              <a
                className="button button-primary"
                href={BOOK_CALL_HREF}
                target="_blank"
                rel="noopener noreferrer"
              >
                Book a call
                <Arrow />
              </a>
              <a className="button button-secondary" href="#ways">
                See what&apos;s covered
                <Arrow />
              </a>
            </div>
          </div>
        </div>
        <a className="gbp-hero__cue" href="#friction">
          Why the map result stalls
        </a>
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
                <p>{item.copy}</p>
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
              <h2 className="section-heading">What the profile work includes.</h2>
            </div>
            <p className="section-copy">
              Categories, services, photos, hours, and the link to the site.
              Not review schemes, not a citation blast, and not posts for their
              own sake.
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
                  <span className="gbp-way__label">What we do</span>
                  {item.setup}
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
                Fix what Google shows. Then keep it true.
              </h2>
            </div>
            <p className="section-copy">
              This is the profile itself.{" "}
              <Link href="/search-engine-optimization">SEO</Link> is the service
              pages the listing should open.{" "}
              <Link href="/local-ads">Local ads</Link> is the paid spot above
              it.
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
          <p className="fwd-services__also reveal">
            <span className="fwd-services__also-label">Part of the bigger picture</span>
            The Google Business Profile is one lever. Whether the map result is
            the right place to spend effort depends on the site and everything
            else—that&apos;s what the{" "}
            <Link href="/fractional-digital-department">
              Fractional Digital Department
            </Link>{" "}
            figures out.
          </p>
        </div>
      </section>
    </>
  );
}

export function GbpCta() {
  return (
    <section className="section use-cases-cta">
      <div className="shell use-cases-cta__content reveal">
        <div>
          <p className="eyebrow">Ready when you are</p>
          <h2 className="section-heading">
            Let&apos;s see what the map result says.
          </h2>
        </div>
        <div className="use-cases-cta__actions">
          <p className="section-copy">
            Tell us how people find you nearby. We&apos;ll look at the profile
            Google shows, and which fixes are worth making first.
          </p>
          <div className="use-cases-cta__buttons">
            <a
              className="button button-primary"
              href={BOOK_CALL_HREF}
              target="_blank"
              rel="noopener noreferrer"
            >
              Book a call
              <Arrow />
            </a>
            <Link className="button button-secondary" href="/fractional-digital-department">
              See the whole picture
              <Arrow />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
