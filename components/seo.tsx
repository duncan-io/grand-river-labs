import { BookCallLink } from "./book-call-link";
import Link from "next/link";
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
    title: "No way to know if it's working",
    copy: "The SEO vendor reports rankings and traffic. Nobody checks whether either one produces leads, or whether the work is worth what it costs.",
  },
];

const ways = [
  {
    title: "Technical foundation, audited",
    lead: "Search has to reach the page before it can understand it.",
    setup:
      "Crawl, indexation, structure, and speed reviewed—what blocks the pages that should be found, and what to tell whoever fixes it.",
    outcome:
      "A clear picture of what's technically in the way, with priorities your team or vendor can act on.",
  },
  {
    title: "Titles, headings, and page structure",
    lead: "The page should say what it is, in the words people search.",
    setup:
      "What each important page says now, checked against the queries that should win the work.",
    outcome:
      "Specific direction on titles and structure, instead of a brand name and a slogan.",
  },
  {
    title: "Which pages are worth writing",
    lead: "Recommend the pages worth writing. Don't manufacture a blog for its own sake.",
    setup:
      "A short list of pages and changes aligned to how people look for the work you want.",
    outcome:
      "Content priorities that answer a real search—not a calendar of posts nobody asked for.",
  },
  {
    title: "Rankings checked against leads",
    lead: "A ranking nobody searches for, and traffic that never calls, are not results.",
    setup:
      "Positions and traffic read next to calls, forms, and booked jobs—not in isolation.",
    outcome:
      "Whether SEO is actually producing work, and what that work costs to acquire.",
  },
  {
    title: "The SEO vendor, held to it",
    lead: "Most SEO reports are written by the people being paid.",
    setup:
      "What the agency or freelancer actually delivered each month, checked against what was promised and what moved.",
    outcome:
      "An honest verdict on the current provider: keep, redirect, or replace—and help choosing the next one.",
  },
];

const steps = [
  {
    title: "See the queries",
    copy: "We look at how people search for the work you want—and which of those searches the site can honestly show up for.",
  },
  {
    title: "Audit the site and the vendor",
    copy: "We review what's technically in the way, what the current SEO provider is actually doing, and whether the results match the invoice.",
  },
  {
    title: "Set the priorities",
    copy: "A short list of what's worth fixing or writing first, ranked by likely impact—not a link-building program and not a content mill.",
  },
  {
    title: "Check the work",
    copy: "Your team or the vendor ships the changes. We verify what moved—rankings, traffic, and the leads both turn into.",
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
            <p className="eyebrow">SEO strategy &amp; advisory</p>
            <h1 className="seo-hero__headline">
              Know whether your SEO is actually working.
            </h1>
            <p className="seo-hero__copy">
              Rankings and traffic checked against leads and booked jobs. What
              to fix, what to write, and what to ask of whoever does the
              work—strategy and oversight, not another content mill.
            </p>
            <div className="seo-hero__actions">
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
              search can read, titles that match the query—and anyone checking
              whether the SEO invoice is producing work.
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
              <h2 className="section-heading">What SEO advisory includes.</h2>
            </div>
            <p className="section-copy">
              Strategy, priorities, and oversight—not links, not a blog produced
              for its own sake, and not reports written by the person being
              paid.
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
              <h2 className="section-heading">Strategy first. Someone else can ship it.</h2>
            </div>
            <p className="section-copy">
              This is advisory and oversight, not production. Once someone
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
            SEO is one channel, and whether it deserves the next dollar depends
            on everything else—tracking, leaks, the other vendors. That&apos;s
            what{" "}
            <Link href="/marketing-advisory">marketing advisory</Link>{" "}
            figures out, starting with a{" "}
            <Link href="/lead-leak-audit">lead leak audit</Link>.
          </p>
        </div>
      </section>
    </>
  );
}
