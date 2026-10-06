import Link from "next/link";
import { BOOK_CALL_HREF } from "@/lib/site";
import { Arrow } from "./site-header";

const friction = [
  {
    title: "Invisible for the searches that matter",
    copy: "People search the way they hire. The site talks about the company. Those two vocabularies never meet, so the business doesn't show up.",
  },
  {
    title: "Pages search can't read",
    copy: "Titles are the company name. Headings are missing. Important pages sit behind a crawl that never finishes.",
  },
  {
    title: "Content that misses the query",
    copy: "The page exists. It doesn't answer the question someone typed. Search sends them to a page that does.",
  },
  {
    title: "Findability rented from ads",
    copy: "The only way in is a paid click. Turn the spend off and the inquiries stop, because nothing on the site compounds.",
  },
];

const ways = [
  {
    title: "Technical foundation",
    lead: "Search has to reach the page before it can understand it.",
    setup:
      "Crawl, indexation, structure, and speed—fixed where they block the pages that should be found.",
    outcome:
      "A site search engines can actually read, not a pile of pages that never get seen.",
  },
  {
    title: "Titles, headings, and page structure",
    lead: "The page should say what it is, in the words people search.",
    setup:
      "Titles, headings, and the order of the page rewritten around the service and the place you work.",
    outcome:
      "Listings and pages that match the query, instead of a brand name and a slogan.",
  },
  {
    title: "Search-intent content recommendations",
    lead: "Recommend the pages worth writing. Don't manufacture a blog for its own sake.",
    setup:
      "A short list of pages and changes aligned to how people look for the work you want.",
    outcome:
      "Content that answers a real search—not a calendar of posts nobody asked for.",
  },
  {
    title: "Internal paths between pages",
    lead: "Important pages should be easy to reach, for people and for search.",
    setup:
      "Links between services, locations, and the pages that should carry the business.",
    outcome:
      "A site that points at the work you want, instead of a homepage that holds everything.",
  },
  {
    title: "The SEO backlog, owned",
    lead: "Recommendations don't help if they sit in a doc.",
    setup:
      "The fixes that matter get prioritized and shipped as part of looking after the site.",
    outcome:
      "Findability that keeps moving, instead of an audit that expires on a shelf.",
  },
];

const steps = [
  {
    title: "See the queries",
    copy: "We look at how people search for the work you want—and which of those searches the site can honestly show up for.",
  },
  {
    title: "Find the blockers",
    copy: "We find what keeps those pages from being crawled, understood, or matched to the query.",
  },
  {
    title: "Fix and recommend",
    copy: "We fix the structure, titles, and pages that are in the way, and recommend the few new pages worth writing. This is on-site work, not a link-building program.",
  },
  {
    title: "Let it compound",
    copy: "Search is slow. We keep the foundation healthy so findability builds, instead of renting every visit from ads.",
  },
];

function ResultBody({
  url,
  title,
  titleWidth,
  snippet,
  muted,
  grow,
}: {
  url: string;
  title: string;
  titleWidth: number;
  snippet: string;
  muted?: boolean;
  grow?: boolean;
}) {
  const titleFill = muted ? "#3A948C" : "#075752";
  const urlFill = muted ? "#6FB8B0" : "#057A72";

  return (
    <>
      <circle cx="28" cy="28" r="10" fill={muted ? "#B0E4DC" : "#057A72"} />
      <text
        x="48"
        y="32"
        fill={urlFill}
        fontFamily="system-ui, -apple-system, sans-serif"
        fontSize="12"
        fontWeight="650"
      >
        {url}
      </text>
      <rect
        className={grow ? "seo-hero__title" : undefined}
        x="48"
        y="44"
        width={titleWidth}
        height="14"
        rx="3"
        fill={titleFill}
        opacity={muted ? 0.45 : 0.8}
      />
      <text
        className={grow ? "seo-hero__snippet" : undefined}
        x="54"
        y="55"
        fill="#FFFDF4"
        fontFamily="system-ui, -apple-system, sans-serif"
        fontSize="11"
        fontWeight="700"
      >
        {title}
      </text>
      <rect
        x="48"
        y="68"
        width={muted ? 220 : 280}
        height="8"
        rx="2"
        fill="#3A948C"
        opacity="0.28"
      />
      <text
        x="48"
        y="96"
        fill="#365e5b"
        fontFamily="system-ui, -apple-system, sans-serif"
        fontSize="11"
        opacity={muted ? 0.7 : 1}
        className={grow ? "seo-hero__snippet" : undefined}
      >
        {snippet}
      </text>
    </>
  );
}

function SeoHeroScene() {
  return (
    <svg
      className="seo-hero__scene"
      aria-hidden="true"
      viewBox="0 0 1600 900"
      preserveAspectRatio="xMidYMid slice"
      fill="none"
    >
      <defs>
        <linearGradient id="seo-glow" x1="1100" y1="80" x2="1520" y2="520">
          <stop stopColor="#FFFDF4" stopOpacity=".9" />
          <stop offset="1" stopColor="#B0E4DC" stopOpacity=".2" />
        </linearGradient>
        <linearGradient id="seo-panel" x1="988" y1="148" x2="1456" y2="748">
          <stop stopColor="#F7FFFE" />
          <stop offset="1" stopColor="#D7F0EC" />
        </linearGradient>
      </defs>

      <circle
        className="seo-hero__glow"
        cx="1280"
        cy="220"
        r="160"
        fill="url(#seo-glow)"
        opacity=".85"
      />

      <g>
        <rect
          x="988"
          y="148"
          width="468"
          height="600"
          rx="22"
          fill="url(#seo-panel)"
          stroke="#057A72"
          strokeWidth="1.75"
        />
        <rect
          x="1016"
          y="176"
          width="412"
          height="44"
          rx="22"
          fill="#FFFDF4"
          stroke="#057A72"
          strokeWidth="1.4"
        />
        <circle cx="1040" cy="198" r="7" stroke="#057A72" strokeWidth="1.6" />
        <path
          d="M1045 203.5 1050 208.5"
          stroke="#057A72"
          strokeWidth="1.6"
          strokeLinecap="round"
        />
        <text
          x="1064"
          y="203"
          fill="#075752"
          fontFamily="system-ui, -apple-system, sans-serif"
          fontSize="13"
          fontWeight="650"
        >
          your service, your city
        </text>

        <g transform="translate(1016 248)">
          <g className="seo-hero__ours">
            <rect
              width="412"
              height="112"
              rx="14"
              fill="#FFFDF4"
              stroke="#057A72"
              strokeWidth="1.6"
            />
            <ResultBody
              url="yoursite.com"
              title="Your service, named clearly"
              titleWidth={228}
              snippet="What you do, where you do it, and why someone should call."
              grow
            />
            <g transform="translate(368 28)">
              <circle r="16" fill="#EAF7F4" stroke="#057A72" strokeWidth="1.4" />
              <text
                className="seo-hero__rank-low"
                y="4"
                textAnchor="middle"
                fill="#075752"
                fontFamily="system-ui, -apple-system, sans-serif"
                fontSize="12"
                fontWeight="700"
              >
                #2
              </text>
              <text
                className="seo-hero__rank-high"
                y="4"
                textAnchor="middle"
                fill="#057A72"
                fontFamily="system-ui, -apple-system, sans-serif"
                fontSize="12"
                fontWeight="700"
              >
                #1
              </text>
            </g>
          </g>
        </g>

        <g transform="translate(1016 376)">
          <g className="seo-hero__other">
            <rect
              width="412"
              height="112"
              rx="14"
              fill="#F7FFFE"
              stroke="#3A948C"
              strokeWidth="1.2"
              opacity="0.9"
            />
            <ResultBody
              url="another-listing.com"
              title="A competitor"
              titleWidth={120}
              snippet="A page that already matches the search."
              muted
            />
          </g>
        </g>

        <g transform="translate(1016 504)">
          <rect
            width="412"
            height="112"
            rx="14"
            fill="#F7FFFE"
            stroke="#B0E4DC"
            strokeWidth="1.2"
          />
          <ResultBody
            url="directory.example"
            title="A directory"
            titleWidth={110}
            snippet="A list of names, not a page about the work."
            muted
          />
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

export function SeoSections() {
  return (
    <>
      <section className="seo-hero">
        <div className="seo-hero__scene-wrap">
          <SeoHeroScene />
        </div>
        <div className="shell">
          <div className="seo-hero__content">
            <p className="eyebrow">SEO</p>
            <h1 className="seo-hero__headline">
              Get found for the searches that win the work.
            </h1>
            <p className="seo-hero__copy">
              Structure, titles, and pages aligned to how people actually
              search—so findability compounds, and growth isn&apos;t rented from
              ads.
            </p>
            <div className="seo-hero__actions">
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
        <a className="seo-hero__cue" href="#friction">
          Why search stalls
        </a>
      </section>

      <section className="section seo-friction" id="friction">
        <div className="shell">
          <div className="seo-friction__top reveal">
            <div>
              <p className="eyebrow">The stall</p>
              <h2 className="section-heading">
                Search doesn&apos;t compound on its own.
              </h2>
            </div>
            <p className="section-copy">
              Most sites aren&apos;t missing a trick. They&apos;re missing pages
              search can read, titles that match the query, and someone who
              ships the fixes.
            </p>
          </div>
          <div className="seo-friction__grid reveal">
            {friction.map((item, index) => (
              <article className="seo-friction__cell" key={item.title}>
                <span className="seo-friction__number">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <h3>{item.title}</h3>
                <p>{item.copy}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section seo-ways" id="ways">
        <div className="shell">
          <div className="seo-ways__top reveal">
            <div>
              <p className="eyebrow">What&apos;s covered</p>
              <h2 className="section-heading">What on-site SEO includes.</h2>
            </div>
            <p className="section-copy">
              Structure, titles, crawlability, and content aligned to search
              intent. Not links, and not a blog produced for its own sake.
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
                  <span className="seo-way__label">What we do</span>
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
              <h2 className="section-heading">Fix the site. Then let it build.</h2>
            </div>
            <p className="section-copy">
              This is on-site work, not a link-building program. Once someone
              arrives,{" "}
              <Link href="/conversion-rate-optimization">CRO</Link> is how the
              visit becomes a conversation.
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
            SEO is one lever, and it sits inside our{" "}
            <Link href="/website-strategy">Website Partner</Link>
            —the same site, owned and kept converting. Whether search is the
            right lever right now depends on everything else. That&apos;s what
            the{" "}
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

export function SeoCta() {
  return (
    <section className="section use-cases-cta">
      <div className="shell use-cases-cta__content reveal">
        <div>
          <p className="eyebrow">Ready when you are</p>
          <h2 className="section-heading">
            Let&apos;s see which searches you&apos;re missing.
          </h2>
        </div>
        <div className="use-cases-cta__actions">
          <p className="section-copy">
            Tell us how people find you today. We&apos;ll map what the site can
            be found for, and which on-site fixes are worth making first.
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
