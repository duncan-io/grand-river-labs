import { BookCallLink } from "./book-call-link";
import { renderInline } from "@/components/inline-links";
import { HOSTING_MONTHLY_FROM, formatUsd } from "@/lib/pricing";
import { Arrow } from "./site-header";

const features = [
  {
    title: "Managed WordPress servers",
    copy: "Servers built and tuned for WordPress, kept current by us.",
  },
  {
    title: "Daily automatic backups",
    copy: "A fresh backup every day, plus one before any change. Restore to an earlier point when you need to.",
  },
  {
    title: "Free SSL",
    copy: "HTTPS on every page, renewed automatically so the padlock never lapses.",
  },
  {
    title: "Global CDN",
    copy: "Images and pages served from close to whoever is visiting, so the site loads quickly.",
  },
  {
    title: "Built-in caching",
    copy: "Page caching at the server keeps load times fast.",
  },
  {
    title: "Security and malware protection",
    copy: "Threats blocked at the server, and the site scanned for anything that shouldn't be there.",
  },
  {
    title: "Uptime monitoring",
    copy: "We're alerted the moment the site stops answering, so we know before your customers do.",
  },
  {
    title: "A staging site",
    copy: "A private copy of the site for testing changes before they go live.",
  },
];

const hostingIncludes = [
  "Managed WordPress servers",
  "Daily backups and one-click restores",
  "SSL, CDN, and caching",
  "Security, malware protection, and uptime monitoring",
  "A staging site for testing changes",
];

const careIncludes = [
  "WordPress core, plugin, and theme updates, tested on staging first",
  "Fixes when something on the site breaks",
  "Small content edits: text, photos, hours, and the like",
];

const steps = [
  {
    title: "Talk it through",
    copy: "A 30-minute call about your site, who looks after it today, and which plan fits.",
  },
  {
    title: "We move it over",
    copy: "We copy the site to our hosting and check it on staging before the domain is switched.",
  },
  {
    title: "We look after it",
    copy: "Backups, security, and monitoring from day one. On the care plan, updates and fixes too.",
  },
];

export const faqs = [
  {
    question: "What's the difference between Hosting and Hosting + Care?",
    answer:
      "Hosting gives you fast, secure, backed-up WordPress hosting, and you or your team keep making changes to the site. Hosting + Care adds the upkeep: we apply WordPress core, plugin, and theme updates (tested on staging first), fix things when they break, and make small content edits when you ask.",
  },
  {
    question: "Do I need to be a marketing client to host with you?",
    answer:
      "Hosting works on its own. If you also want someone directing the marketing, it pairs with the [fractional marketing director](/fractional-marketing-director) engagement, and your site is already in the same hands.",
  },
  {
    question: "Who owns the site?",
    answer:
      "You do. Your domain, your content, and your files stay yours.",
  },
  {
    question: "Can I switch plans later?",
    answer:
      "Yes. Start with hosting and add care whenever you'd rather hand the updates and fixes to us.",
  },
  {
    question: "How much does WordPress hosting cost?",
    answer: `Plans start as low as ${formatUsd(HOSTING_MONTHLY_FROM)}/month. On a 30-minute call we'll look at your site and confirm which plan fits.`,
  },
];

const statusRows = [
  "Site online",
  "Backed up today",
  "SSL active",
  "Malware scan clean",
  "Updates applied",
];

function HostingHeroScene() {
  const font = "system-ui, -apple-system, sans-serif";

  return (
    <svg
      className="gbp-hero__scene"
      aria-hidden="true"
      viewBox="0 0 1600 900"
      preserveAspectRatio="xMidYMid slice"
      fill="none"
    >
      <defs>
        <linearGradient id="hosting-glow" x1="1100" y1="80" x2="1520" y2="520">
          <stop stopColor="#FFFDF4" stopOpacity=".9" />
          <stop offset="1" stopColor="#B0E4DC" stopOpacity=".2" />
        </linearGradient>
        <linearGradient id="hosting-panel" x1="988" y1="150" x2="1488" y2="740">
          <stop stopColor="#F7FFFE" />
          <stop offset="1" stopColor="#D7F0EC" />
        </linearGradient>
      </defs>

      <circle
        className="gbp-hero__glow"
        cx="1280"
        cy="200"
        r="160"
        fill="url(#hosting-glow)"
        opacity=".85"
      />

      <rect
        x="988"
        y="150"
        width="500"
        height="590"
        rx="22"
        fill="url(#hosting-panel)"
        stroke="#057A72"
        strokeWidth="1.75"
      />
      <circle cx="1016" cy="182" r="5" fill="#6FB8B0" />
      <circle cx="1034" cy="182" r="5" fill="#3A948C" />
      <circle cx="1052" cy="182" r="5" fill="#057A72" />
      <text
        x="1074"
        y="187"
        fill="#075752"
        fontFamily={font}
        fontSize="13"
        fontWeight="700"
        letterSpacing="0.08em"
      >
        SITE HEALTH
      </text>

      <rect
        x="1020"
        y="210"
        width="436"
        height="40"
        rx="20"
        fill="#FFFDF4"
        stroke="#057A72"
        strokeWidth="1.2"
      />
      <rect
        x="1040"
        y="223"
        width="11"
        height="9"
        rx="2"
        fill="none"
        stroke="#057A72"
        strokeWidth="1.4"
      />
      <path
        d="M1042.5 223v-3a3 3 0 0 1 6 0v3"
        stroke="#057A72"
        strokeWidth="1.4"
      />
      <text
        x="1064"
        y="235"
        fill="#075752"
        fontFamily={font}
        fontSize="14"
        fontWeight="650"
      >
        https://yourcompany.com
      </text>

      {statusRows.map((label, index) => {
        const y = 278 + index * 86;
        return (
          <g transform={`translate(1020 ${y})`} key={label}>
            <rect
              width="436"
              height="70"
              rx="14"
              fill="#FFFDF4"
              stroke="#057A72"
              strokeOpacity=".35"
              strokeWidth="1.2"
            />
            <text
              x="24"
              y="41"
              fill="#075752"
              fontFamily={font}
              fontSize="16"
              fontWeight="650"
            >
              {label}
            </text>
            <g className="hosting-hero__check">
              <circle cx="400" cy="35" r="15" fill="#057A72" />
              <path
                d="m393 35.5 5 5 9.5-10"
                stroke="#FFFDF4"
                strokeWidth="2.4"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </g>
          </g>
        );
      })}

      <path
        d="M0 780c260-50 520-40 780 8 220 40 420 35 820-25v137H0V780Z"
        fill="#EAF7F4"
        opacity=".9"
      />
    </svg>
  );
}

export function HostingSections() {
  return (
    <>
      <section className="mkt-hero hosting-hero">
        <div className="gbp-hero__scene-wrap">
          <HostingHeroScene />
        </div>
        <div className="shell">
          <div className="mkt-hero__content">
            <p className="eyebrow">WordPress hosting · Care plans</p>
            <h1 className="mkt-hero__headline">
              A fast, secure home for your WordPress site.
            </h1>
            <p className="mkt-hero__copy">
              Your website is where the leads land. We host it on managed
              WordPress servers, back it up every day, and keep watch so it
              stays up. Add a care plan and we&apos;ll handle the updates and
              fixes too.
            </p>
            <div className="mkt-hero__actions">
              <BookCallLink className="button button-primary">
                Book a 30-minute call
                <Arrow />
              </BookCallLink>
              <a className="button button-secondary" href="#contact">
                Contact us
              </a>
            </div>
            <ul className="mkt-hero__facts">
              <li>Daily backups</li>
              <li>SSL and security included</li>
              <li>Plans from {formatUsd(HOSTING_MONTHLY_FROM)}/month</li>
            </ul>
          </div>
        </div>
        <a className="mkt-hero__cue" href="#included">
          What&apos;s included
        </a>
      </section>

      <section className="section hosting-included" id="included">
        <div className="shell">
          <div className="gbp-ways__top reveal">
            <div>
              <p className="eyebrow">What&apos;s included</p>
              <h2 className="section-heading">
                Everything a WordPress site needs to run well.
              </h2>
            </div>
            <p className="section-copy">
              Every plan comes with the full hosting setup: speed, security,
              and backups, looked after for you.
            </p>
          </div>
          <ul className="hosting-features reveal">
            {features.map((item) => (
              <li className="hosting-feature" key={item.title}>
                <span className="hosting-feature__icon" aria-hidden="true" />
                <h3>{item.title}</h3>
                <p>{item.copy}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="section leak-next hosting-plans" id="plans">
        <div className="shell">
          <div className="services__top reveal">
            <div>
              <p className="eyebrow">Plans</p>
              <h2 className="section-heading">
                Just hosting, or hosting with care.
              </h2>
            </div>
            <p className="section-copy">
              Keep making changes yourself, or hand the upkeep to us. Plans
              start as low as {formatUsd(HOSTING_MONTHLY_FROM)}/month.
            </p>
          </div>
          <div className="engagement-compare leak-next__options reveal">
            <article className="engagement-compare__card lead-pricing__card">
              <p className="engagement-compare__label">Hosting</p>
              <p className="engagement-compare__value">
                <span className="engagement-compare__period">As low as </span>
                {formatUsd(HOSTING_MONTHLY_FROM)}
                <span className="engagement-compare__period">/month</span>
              </p>
              <ul className="lead-pricing__list">
                {hostingIncludes.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
              <p className="engagement-compare__note">
                For teams who manage the site themselves and want it hosted,
                backed up, and secure.
              </p>
              <BookCallLink className="button button-primary">
                Book a 30-minute call
                <Arrow />
              </BookCallLink>
            </article>
            <article className="engagement-compare__card engagement-compare__card--us lead-pricing__card">
              <p className="engagement-compare__label">Hosting + Care</p>
              <p className="engagement-compare__value">
                Hosting
                <span className="engagement-compare__period">, plus upkeep</span>
              </p>
              <ul className="lead-pricing__list">
                <li>Everything in Hosting</li>
                {careIncludes.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
              <p className="engagement-compare__note">
                For owners who&apos;d rather hand the website to someone
                who keeps it running.
              </p>
              <a className="leak-next__link" href="#contact">
                Ask about the care plan
                <Arrow />
              </a>
            </article>
          </div>
        </div>
      </section>

      <section className="section gbp-flow hosting-flow" id="how-it-works">
        <div className="shell">
          <div className="gbp-flow__top reveal">
            <div>
              <p className="eyebrow">Getting started</p>
              <h2 className="section-heading">
                Moving your site over is our job.
              </h2>
            </div>
            <p className="section-copy">
              Three steps, and your site keeps running the whole time.
            </p>
          </div>
          <ol className="gbp-flow__steps reveal">
            {steps.map((step, index) => (
              <li className="gbp-flow__step" key={step.title}>
                {index < steps.length - 1 ? (
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

      <section className="section fdd-faq" id="faq">
        <div className="shell">
          <div className="fdd-faq__top reveal">
            <div>
              <p className="eyebrow">Questions</p>
              <h2 className="section-heading">WordPress hosting, answered.</h2>
            </div>
            <p className="section-copy">
              Anything else, we&apos;ll cover on the call.
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
