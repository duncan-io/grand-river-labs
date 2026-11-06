import { BookCallLink } from "./book-call-link";
import Link from "next/link";
import type { ReactNode } from "react";
import { renderInline } from "@/components/inline-links";
import { AUDIT_FEE, DIRECTOR_MONTHLY, formatUsd } from "@/lib/pricing";
import { Arrow } from "./site-header";

const leaks = [
  {
    title: "The form that stopped sending",
    copy: "A plugin update breaks the quote form's notification. No error, no bounce. The prospect sees a thank-you page, the office sees nothing, and nobody notices the leads stopped.",
  },
  {
    title: "A suggested edit swaps the number",
    copy: "Google accepts a stranger's suggested edit to your [Business Profile](/google-business-profile) and replaces the tracking number. Map calls still ring, but they stop counting, and the listing looks like it went quiet.",
  },
  {
    title: "Leads that arrive without a source",
    copy: "Form leads land in the CRM with no campaign, no gclid, and no landing page. Six months later nobody can say which channel earned the jobs, so the budget follows whoever reports loudest.",
  },
  {
    title: "An ad account goes dark on a Friday",
    copy: "A card fails, an ad gets disapproved, or a budget caps out by noon. The phone gets quiet over the weekend, and the first person to notice is the owner on Monday.",
  },
];

const steps = [
  {
    title: "Set up",
    copy: "A tracking number for each source, hidden form fields that carry the source into your CRM, GA4 key events verified end to end, and booked jobs sent back to Google Ads. We record who owns every account and take a baseline.",
  },
  {
    title: "Watch daily",
    copy: "Eight checks run every day, from test form submissions to the Business Profile and the ad accounts. Critical breaks get flagged to you within one business day.",
  },
  {
    title: "Report monthly",
    copy: "The portal stays current. A scorecard email lands each month, and once a quarter we walk through it with you on a call: what booked, what it cost, and what changed.",
  },
];

const portalTabs = [
  { id: "portal-overview", label: "Overview" },
  { id: "portal-budget", label: "Budget & vendors" },
  { id: "portal-leads", label: "Leads" },
  { id: "portal-health", label: "System health" },
] as const;

/* Sample data: Lakeshore Roofing (fictional), October vs. September. */
const kpis = [
  {
    label: "Real leads",
    value: "351",
    change: "+9% vs. Sep",
    goal: "Goal 340",
    progress: 100,
    status: "met",
  },
  {
    label: "Booked jobs",
    value: "168",
    change: "+13% vs. Sep",
    goal: "Goal 160",
    progress: 100,
    status: "met",
  },
  {
    label: "Book rate",
    value: "48%",
    change: "+2 pts vs. Sep",
    goal: "Goal 50%",
    progress: 96,
    status: "96% of goal",
  },
  {
    label: "Cost per booked job",
    value: "$108",
    change: "−10% vs. Sep · paid sources",
    goal: "Goal under $115",
    progress: 100,
    status: "met",
  },
];

const leadFlow = [
  { label: "Contacts", value: "412", note: "Calls and forms" },
  { label: "Spam removed", value: "−61", note: "Robocalls, vendors, junk" },
  { label: "Real leads", value: "351", note: "Checked against the CRM" },
  { label: "Booked jobs", value: "168", note: "48% book rate" },
];

type BreakoutRow = {
  source: string;
  calls: number;
  forms: number;
  leads: number;
  spam: number;
  booked: number;
  rate: string;
  share: string;
  spend: string;
  cpl: string;
  cpb: string;
  change: string;
  campaign?: boolean;
};

const breakoutRows: BreakoutRow[] = [
  {
    source: "Google Ads",
    calls: 74,
    forms: 46,
    leads: 96,
    spam: 24,
    booked: 42,
    rate: "44%",
    share: "25%",
    spend: "$4,830",
    cpl: "$50",
    cpb: "$115",
    change: "+17%",
  },
  {
    source: "Roof replacement · Search",
    calls: 48,
    forms: 30,
    leads: 64,
    spam: 14,
    booked: 30,
    rate: "47%",
    share: "18%",
    spend: "$3,180",
    cpl: "$50",
    cpb: "$106",
    change: "+20%",
    campaign: true,
  },
  {
    source: "Storm & repair · Search",
    calls: 26,
    forms: 16,
    leads: 32,
    spam: 10,
    booked: 12,
    rate: "38%",
    share: "7%",
    spend: "$1,650",
    cpl: "$52",
    cpb: "$138",
    change: "+9%",
    campaign: true,
  },
  {
    source: "Local Services Ads",
    calls: 79,
    forms: 4,
    leads: 74,
    spam: 9,
    booked: 38,
    rate: "51%",
    share: "23%",
    spend: "$3,810",
    cpl: "$51",
    cpb: "$100",
    change: "+15%",
  },
  {
    source: "Google Business Profile",
    calls: 92,
    forms: 20,
    leads: 98,
    spam: 14,
    booked: 46,
    rate: "47%",
    share: "27%",
    spend: "—",
    cpl: "—",
    cpb: "—",
    change: "+12%",
  },
];

const breakoutTotal: BreakoutRow = {
  source: "All sources",
  calls: 297,
  forms: 115,
  leads: 351,
  spam: 61,
  booked: 168,
  rate: "48%",
  share: "100%",
  spend: "$8,640",
  cpl: "$51",
  cpb: "$108",
  change: "+13%",
};

const healthChecks = [
  { name: "Call tracking", detail: "Every tracking number rings through and records" },
  { name: "Forms", detail: "Test submissions delivered and created in the CRM" },
  { name: "Source capture", detail: "Source, campaign, gclid, and landing page on new leads" },
  { name: "Analytics", detail: "GA4 key events firing on calls and forms" },
  { name: "Conversion sync", detail: "Booked jobs reaching Google Ads" },
  { name: "Business Profile", detail: "Phone, hours, categories, and links unchanged" },
  { name: "Website", detail: "Uptime, SSL, and domain expiry" },
  { name: "Ad accounts", detail: "No disapprovals, billing failures, or capped budgets" },
];

const setupItems = [
  "CallRail with a tracking number for each source, call recording, and spam-call tagging",
  "Hidden form fields that pass UTMs, gclid, and the landing page into your CRM, plus form spam protection",
  "GA4 and Tag Manager key events, verified end to end",
  "Booked and sold jobs sent back to Google Ads (and Meta's Conversions API if you run Meta), so the ads optimize for jobs instead of calls",
  "An account ownership register: who holds admin on GA4, Ads, the Business Profile, Tag Manager, the domain, Meta, and CallRail",
  "A baseline scorecard",
];

const monthlyItems = [
  "Daily test submissions on key forms, confirming the notification arrived and the CRM record was created",
  "Uptime, SSL, and domain-expiry alerts",
  "Business Profile watch: changes to phone, hours, categories, or links, and suspensions",
  "Ad account guardrails: disapprovals, paused campaigns, billing failures, budgets capped early, and LSA leads to dispute",
  "The client portal, a monthly scorecard email, and a quarterly review call",
  "Critical breaks flagged to you within one business day",
];

export const faqs = [
  {
    question: "How much does call tracking setup cost?",
    answer: `Call tracking is part of the Lead System's one-time setup fee, along with form tracking, GA4, and conversion sync. A monthly fee covers the daily checks and the portal. We scope both on a call based on how many sources, forms, and ad accounts you run, and tools like CallRail are billed to you at cost. On the [fractional marketing director](/fractional-marketing-director) engagement, starting at ${formatUsd(DIRECTOR_MONTHLY)}/month, it's included.`,
  },
  {
    question: "Who owns the accounts?",
    answer:
      "You do. GA4, Google Ads, the Business Profile, Tag Manager, the domain, Meta, and CallRail stay in your name, with us added as users. The ownership register from setup records who holds admin on each one, so nothing gets stuck with a past agency again. Tools are billed to you at cost, and the history stays with you if you ever stop working with us.",
  },
  {
    question: "What happens when something breaks?",
    answer:
      "We flag critical breaks to you within one business day: what broke, what it affects, and who needs to fix it. We watch the website, phones, and CRM, but we don't run or fix them, so the fix goes to your web vendor, phone provider, or office. On the [director engagement](/fractional-marketing-director), the director sees it through. Every break goes into the caught-and-fixed log in the portal.",
  },
  {
    question: "Which CRMs does it work with?",
    answer:
      "Most of the ones home services companies use. It needs two things: forms that can pass hidden fields (source, campaign, gclid, and landing page) into the CRM, and a way to get booked jobs back out, through an API, an integration, or an export. We confirm yours on the scoping call.",
  },
  {
    question: "How is this different from an agency dashboard?",
    answer:
      "An agency dashboard is built from the agency's own tools and shows what the agency is paid to show. The Lead System counts leads and booked jobs from your CRM, takes out the spam, and holds every vendor to the same numbers, including us. It also checks the plumbing every day, so you hear about a broken form before the month-end report.",
  },
  {
    question: "Will call tracking numbers hurt my Google Business Profile?",
    answer:
      "Not when it's set up properly. On the [Google Business Profile](/google-business-profile), the tracking number goes in as the primary phone and your main number stays listed as an additional phone, so the listing still matches your other listings. On the website, a script swaps the number for visitors, so your main number stays in the page itself.",
  },
  {
    question: "Do we need GA4 if our agency already sends reports?",
    answer:
      "Yes, and it should be yours. Agency reports come from the agency's own tools and show what the agency is paid to show. A GA4 property you own, with calls and quote requests set up as key events, gives you one source you control, and keeps the history when you change vendors.",
  },
];

const BAR_X = 210;
const BAR_WIDTH = 128;

const sources = [
  { name: "Website", reported: 18, booked: 7 },
  { name: "Google Business Profile", reported: 31, booked: 12 },
  { name: "Local Services Ads", reported: 24, booked: 6 },
  { name: "Yelp", reported: 9, booked: 2 },
] as const;

const FONT = "system-ui, -apple-system, sans-serif";

function LeadSystemHeroScene() {
  return (
    <svg
      className="lead-system-hero__scene"
      aria-hidden="true"
      viewBox="0 0 1600 900"
      preserveAspectRatio="xMidYMid slice"
      fill="none"
    >
      <defs>
        <linearGradient id="lead-system-glow" x1="1100" y1="80" x2="1520" y2="520">
          <stop stopColor="#FFFDF4" stopOpacity=".9" />
          <stop offset="1" stopColor="#B0E4DC" stopOpacity=".2" />
        </linearGradient>
        <linearGradient id="lead-system-panel" x1="968" y1="150" x2="1420" y2="720">
          <stop stopColor="#F7FFFE" />
          <stop offset="1" stopColor="#D7F0EC" />
        </linearGradient>
      </defs>

      <circle
        className="lead-system-hero__glow"
        cx="1320"
        cy="240"
        r="160"
        fill="url(#lead-system-glow)"
        opacity=".85"
      />

      <g>
        <rect
          x="968"
          y="156"
          width="452"
          height="560"
          rx="22"
          fill="url(#lead-system-panel)"
          stroke="#057A72"
          strokeWidth="1.75"
        />
        <circle cx="996" cy="188" r="5" fill="#6FB8B0" />
        <circle cx="1014" cy="188" r="5" fill="#3A948C" />
        <circle
          className="lead-system-hero__live"
          cx="1032"
          cy="188"
          r="5"
          fill="#057A72"
        />
        <text
          x="1054"
          y="193"
          fill="#075752"
          fontFamily={FONT}
          fontSize="13"
          fontWeight="700"
          letterSpacing="0.08em"
        >
          SAMPLE DATA · REPORTED VS. BOOKED
        </text>

        <g transform="translate(996 236)">
          <text
            x="18"
            fill="#3A948C"
            fontFamily={FONT}
            fontSize="11"
            fontWeight="700"
            letterSpacing="0.12em"
          >
            SOURCE
          </text>
          <text
            x={BAR_X}
            fill="#3A948C"
            fontFamily={FONT}
            fontSize="11"
            fontWeight="700"
            letterSpacing="0.12em"
          >
            BOOKED OF REPORTED
          </text>
        </g>

        {sources.map((source, index) => (
          <g
            key={source.name}
            className={`lead-system-hero__row lead-system-hero__row--${index + 1}`}
            transform={`translate(996 ${252 + index * 84})`}
          >
            <rect
              width="396"
              height="72"
              rx="12"
              fill="#FFFDF4"
              stroke="#057A72"
              strokeWidth="1.2"
              opacity="0.9"
            />
            <text
              x="18"
              y="31"
              fill="#075752"
              fontFamily={FONT}
              fontSize="13"
              fontWeight="700"
            >
              {source.name}
            </text>
            <text
              x="18"
              y="51"
              fill="#365e5b"
              fontFamily={FONT}
              fontSize="11"
            >
              {source.reported} reported
            </text>
            <rect
              x={BAR_X}
              y="32"
              width={BAR_WIDTH}
              height="8"
              rx="4"
              fill="#B0E4DC"
            />
            <rect
              className="lead-system-hero__booked"
              x={BAR_X}
              y="32"
              width={(BAR_WIDTH * source.booked) / source.reported}
              height="8"
              rx="4"
              fill="#057A72"
            />
            <text
              x="378"
              y="42"
              textAnchor="end"
              fill="#075752"
              fontFamily={FONT}
              fontSize="20"
              fontWeight="700"
            >
              {source.booked}
            </text>
            <g transform="translate(196 36)">
              <g className="lead-system-hero__check">
                <circle r="8" fill="#057A72" />
                <path
                  d="m-3.5 0.2 2.3 2.3L3.6-2.6"
                  stroke="#FFFDF4"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </g>
            </g>
          </g>
        ))}

        <g transform="translate(996 600)">
          <rect
            width="396"
            height="88"
            rx="14"
            fill="#FFFDF4"
            stroke="#057A72"
            strokeWidth="1.6"
          />
          <text
            x="18"
            y="30"
            fill="#3A948C"
            fontFamily={FONT}
            fontSize="11"
            fontWeight="700"
            letterSpacing="0.12em"
          >
            COST PER BOOKED JOB
          </text>
          <text
            x="18"
            y="62"
            fill="#6FB8B0"
            fontFamily={FONT}
            fontSize="13"
            fontWeight="650"
          >
            Platform report: $48 / lead
          </text>
          <text
            className="lead-system-hero__cost"
            x="378"
            y="64"
            textAnchor="end"
            fill="#075752"
            fontFamily={FONT}
            fontSize="28"
            fontWeight="700"
          >
            $164
          </text>
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

function SampleTag() {
  return <span className="leak-map__tag">Sample data · Lakeshore Roofing</span>;
}

function BreakoutCells({ row }: { row: BreakoutRow }) {
  return (
    <>
      <td>{row.calls}</td>
      <td>{row.forms}</td>
      <td>{row.leads}</td>
      <td>{row.spam}</td>
      <td>{row.booked}</td>
      <td>{row.rate}</td>
      <td>{row.share}</td>
      <td>{row.spend}</td>
      <td>{row.cpl}</td>
      <td>{row.cpb}</td>
      <td className="lead-portal__change">{row.change}</td>
    </>
  );
}

function OverviewPreview() {
  return (
    <figure className="leak-map lead-portal__preview">
      <figcaption className="leak-map__head">
        <span className="leak-map__title">Overview · October</span>
        <SampleTag />
      </figcaption>
      <p className="lead-portal__controls">
        <span>
          <span className="lead-portal__control-label">Date range</span> Oct 1 –
          Oct 31
        </span>
        <span>
          <span className="lead-portal__control-label">Compare to</span>{" "}
          Previous period (Sep)
        </span>
      </p>

      <ul className="lead-portal__kpis" aria-label="Key numbers, October">
        {kpis.map((kpi) => (
          <li className="lead-portal__kpi" key={kpi.label}>
            <span className="lead-portal__kpi-label">{kpi.label}</span>
            <span className="lead-portal__kpi-value">{kpi.value}</span>
            <span className="lead-portal__kpi-change">{kpi.change}</span>
            <span className="lead-portal__goal-bar" aria-hidden="true">
              <span style={{ width: `${kpi.progress}%` }} />
            </span>
            <span className="lead-portal__goal">
              {kpi.goal} · {kpi.status}
            </span>
          </li>
        ))}
      </ul>

      <div className="lead-portal__flow-wrap">
        <p className="lead-portal__subhead">Lead flow</p>
        <ol className="lead-portal__flow">
          {leadFlow.map((stage) => (
            <li key={stage.label}>
              <span className="lead-portal__flow-value">{stage.value}</span>
              <span className="lead-portal__flow-label">{stage.label}</span>
              <span className="lead-portal__flow-note">{stage.note}</span>
            </li>
          ))}
          <li className="lead-portal__flow-locked">
            <span className="lead-portal__flow-value">
              <svg
                aria-hidden="true"
                width="18"
                height="18"
                viewBox="0 0 18 18"
                fill="none"
              >
                <rect x="3.5" y="8" width="11" height="7.5" rx="1.5" stroke="currentColor" strokeWidth="1.5" />
                <path d="M6 8V6a3 3 0 0 1 6 0v2" stroke="currentColor" strokeWidth="1.5" />
              </svg>
            </span>
            <span className="lead-portal__flow-label">Sold jobs</span>
            <span className="lead-portal__flow-note">
              Unlocks with revenue attribution
            </span>
          </li>
        </ol>
      </div>

      <div className="lead-portal__table-head">
        <p className="lead-portal__subhead">Lead sources</p>
        <p className="lead-portal__hint" aria-hidden="true">
          Scroll for more →
        </p>
      </div>
      <div
        className="lead-portal__table-wrap"
        role="region"
        aria-label="Lead source breakout, October sample data"
        tabIndex={0}
      >
        <table className="lead-portal__table">
          <thead>
            <tr>
              <th scope="col">Source</th>
              <th scope="col">Calls</th>
              <th scope="col">Forms</th>
              <th scope="col">Real leads</th>
              <th scope="col">Spam removed</th>
              <th scope="col">Booked</th>
              <th scope="col">Book rate</th>
              <th scope="col">Share of booked</th>
              <th scope="col">Spend</th>
              <th scope="col">Cost per lead</th>
              <th scope="col">Cost per booked job</th>
              <th scope="col">Booked vs. Sep</th>
            </tr>
          </thead>
          <tbody>
            {breakoutRows.map((row) => (
              <tr
                key={row.source}
                className={row.campaign ? "lead-portal__campaign" : undefined}
              >
                <th scope="row">
                  {row.campaign ? (
                    <span className="visually-hidden">Google Ads campaign: </span>
                  ) : null}
                  {row.source}
                </th>
                <BreakoutCells row={row} />
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr>
              <th scope="row">{breakoutTotal.source}</th>
              <BreakoutCells row={breakoutTotal} />
            </tr>
          </tfoot>
        </table>
      </div>
      <p className="leak-map__note">
        Excerpt: 3 of 5 sources, with Google Ads expanded into its campaigns.
        Totals include organic search and referrals. Cost columns cover paid
        sources only.
      </p>
    </figure>
  );
}

function HealthPreview() {
  return (
    <figure className="leak-map lead-portal__preview">
      <figcaption className="leak-map__head">
        <span className="leak-map__title">System health · Today</span>
        <SampleTag />
      </figcaption>
      <p className="lead-portal__health-summary">
        <span className="lead-portal__health-dot" aria-hidden="true" />
        8 of 8 checks passing
      </p>
      <ul className="lead-portal__checks">
        {healthChecks.map((check) => (
          <li key={check.name}>
            <svg
              className="lead-portal__check-icon"
              aria-hidden="true"
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
            >
              <circle cx="10" cy="10" r="9" fill="currentColor" />
              <path
                d="m6 10.2 2.6 2.6L14 7.4"
                stroke="#fff"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <span className="lead-portal__check-text">
              <span className="lead-portal__check-name">{check.name}</span>
              <span className="lead-portal__check-detail">{check.detail}</span>
            </span>
            <span className="lead-portal__check-status">Passing</span>
          </li>
        ))}
      </ul>
    </figure>
  );
}

function PortalTab({
  id,
  number,
  title,
  lead,
  points,
  preview,
}: {
  id: string;
  number: number;
  title: string;
  lead: string;
  points: string[];
  preview?: ReactNode;
}) {
  return (
    <article
      className={[
        "lead-portal__tab",
        preview ? "" : "lead-portal__tab--text",
      ]
        .filter(Boolean)
        .join(" ")}
      id={id}
      aria-labelledby={`${id}-title`}
    >
      <div className="lead-portal__tab-copy reveal">
        <span className="lead-portal__tab-number">
          Tab {String(number).padStart(2, "0")}
        </span>
        <h3 id={`${id}-title`}>{title}</h3>
        <p className="lead-portal__tab-lead">{lead}</p>
        <ul className="lead-portal__points">
          {points.map((point) => (
            <li key={point}>{renderInline(point)}</li>
          ))}
        </ul>
      </div>
      {preview ? <div className="lead-portal__tab-preview">{preview}</div> : null}
    </article>
  );
}

export function LeadSystemSections() {
  return (
    <>
      <section className="mkt-hero lead-system-hero">
        <div className="lead-system-hero__scene-wrap">
          <LeadSystemHeroScene />
        </div>
        <div className="shell">
          <div className="mkt-hero__content">
            <p className="eyebrow">Lead System · Home services</p>
            <h1 className="mkt-hero__headline">
              We watch every handoff from click to booked job.
            </h1>
            <p className="mkt-hero__copy">
              Tracking and daily monitoring for lead-driven businesses. Every
              call and form gets a source, every booked job is checked against
              your CRM, and when a handoff breaks, we flag it and get it fixed.
            </p>
            <div className="mkt-hero__actions">
              <BookCallLink className="button button-primary">
                Book a 30-minute call
                <Arrow />
              </BookCallLink>
              <a className="button button-secondary" href="#portal">
                Tour the portal
              </a>
            </div>
            <ul className="mkt-hero__facts">
              <li>Booked jobs verified against your CRM</li>
              <li>8 checks run every day</li>
              <li>Included with the fractional marketing director</li>
            </ul>
          </div>
        </div>
        <a className="mkt-hero__cue" href="#leaks">
          What breaks quietly
        </a>
      </section>

      <section className="section lead-system-friction" id="leaks">
        <div className="shell">
          <div className="lead-system-friction__top reveal">
            <div>
              <p className="eyebrow">The silent leaks</p>
              <h2 className="section-heading">
                Nothing looks broken. The leads just stop.
              </h2>
            </div>
            <p className="section-copy">
              Owners want to know nothing is quietly broken. Marketing managers
              need numbers that hold up when they defend a budget or question
              an agency. Both start with someone checking every day.
            </p>
          </div>
          <div className="lead-system-friction__grid reveal">
            {leaks.map((item, index) => (
              <article className="lead-system-friction__cell" key={item.title}>
                <span className="lead-system-friction__number">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <h3>{item.title}</h3>
                <p>{renderInline(item.copy)}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section lead-system-flow" id="how-it-works">
        <div className="shell">
          <div className="lead-system-flow__top reveal">
            <div>
              <p className="eyebrow">How it works</p>
              <h2 className="section-heading">
                Set up once. Checked every day.
              </h2>
            </div>
            <p className="section-copy">
              Find it, fix it, prove it. The{" "}
              <Link href="/lead-leak-audit">lead leak audit</Link> finds the
              leaks and the{" "}
              <Link href="/fractional-marketing-director">director</Link> fixes
              them. The Lead System proves they stay fixed.
            </p>
          </div>
          <ol className="lead-system-flow__steps reveal">
            {steps.map((step, index) => (
              <li className="lead-system-flow__step" key={step.title}>
                {index < steps.length - 1 ? (
                  <span className="lead-system-flow__connector" aria-hidden="true">
                    <svg viewBox="0 0 80 24" fill="none">
                      <path
                        className="lead-system-flow__connector-line"
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
                <span className="lead-system-flow__number">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <h3>{step.title}</h3>
                <p>{step.copy}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="section lead-portal" id="portal">
        <div className="shell">
          <div className="lead-system-flow__top reveal">
            <div>
              <p className="eyebrow">The client portal</p>
              <h2 className="section-heading">
                What booked, what it cost, and what broke.
              </h2>
            </div>
            <p className="section-copy">
              A read-only portal with four tabs. Every view has a date range,
              with presets or custom dates, and a compare-to option: the
              previous period, the same period last year, or none.
            </p>
          </div>

          <nav className="lead-portal__tabs reveal" aria-label="Portal tabs">
            {portalTabs.map((tab) => (
              <a href={`#${tab.id}`} key={tab.id}>
                {tab.label}
              </a>
            ))}
          </nav>

          <PortalTab
            id="portal-overview"
            number={1}
            title="Overview"
            lead="The numbers an owner checks first and a marketing manager reports up the chain."
            points={[
              "Key numbers with progress toward goals: real leads, booked jobs, book rate, and cost per booked job.",
              "Lead flow from contacts to real leads (spam removed) to booked jobs. Sold jobs stay locked until revenue attribution is added.",
              "A 12-month booked-jobs trend with a numbered change log: a new site, the month LSA started, an agency switch.",
              "Every source broken out, with campaign rows that expand underneath.",
              "Money recovered since install: LSA dispute credits, leads recovered during outages, breaks caught, and average time to fix.",
              "Monthly notes from the director.",
            ]}
            preview={<OverviewPreview />}
          />

          <PortalTab
            id="portal-budget"
            number={2}
            title="Budget & vendors"
            lead="Where the money is going this month, and whether each vendor is earning it."
            points={[
              "Month-to-date pacing against plan for each channel, with projected month-end spend, so an overspend shows up on the 12th, not the 31st.",
              "A vendor scorecard that rates each agency against its brief using booked jobs verified in your CRM, not the vendor's own report.",
            ]}
          />

          <PortalTab
            id="portal-leads"
            number={3}
            title="Leads"
            lead="Which work the leads are for, where they come from, and which ones go unanswered."
            points={[
              "Breakdowns by service line and service area: replacement vs. repair, and the towns that book vs. the ones that only call.",
              "Call patterns: answer rate, missed calls, and after-hours leads, with a day-by-time heatmap of missed calls.",
            ]}
          />

          <PortalTab
            id="portal-health"
            number={4}
            title="System health"
            lead="Eight checks run daily, so a broken handoff shows up here before it shows up in the numbers."
            points={[
              "Call tracking, forms, source capture, analytics, conversion sync, the Business Profile, the website (uptime, SSL, domain), and the ad accounts.",
              "A caught-and-fixed log: what broke, when we caught it, and how long the fix took.",
              "A How we count panel defining a real lead, a booked job, book rate, cost per booked job, source, and how fresh the data is.",
            ]}
            preview={<HealthPreview />}
          />
        </div>
      </section>

      <section className="section lead-included" id="included">
        <div className="shell">
          <div className="lead-system-flow__top reveal">
            <div>
              <p className="eyebrow">What&apos;s included</p>
              <h2 className="section-heading">What you get, and what you don&apos;t.</h2>
            </div>
            <p className="section-copy">
              Every account stays in your name, and tools are billed to you at
              cost. Your GA4 should be yours, and so should everything else.
            </p>
          </div>
          <div className="lead-included__grid reveal">
            <div className="lead-included__col">
              <h3>Setup</h3>
              <ul className="lead-included__list">
                {setupItems.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
            <div className="lead-included__col">
              <h3>Every month</h3>
              <ul className="lead-included__list">
                {monthlyItems.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          </div>
          <div className="lead-included__not reveal">
            <h3>Not included</h3>
            <ul>
              <li>
                We watch the website, phones, and CRM and alert you when
                something breaks. We don&apos;t run them or fix them.
              </li>
              <li>
                Speed-to-lead texting, unsold estimate follow-up, review
                requests, CSR booking-rate scoring, and revenue attribution are
                automations in the{" "}
                <Link href="/fractional-marketing-director">
                  fractional marketing director
                </Link>{" "}
                engagement.
              </li>
            </ul>
          </div>
        </div>
      </section>

      <section className="section leak-next lead-system-next" id="pricing">
        <div className="shell">
          <div className="services__top reveal">
            <div>
              <p className="eyebrow">Pricing</p>
              <h2 className="section-heading">
                Included with the director. Available on its own.
              </h2>
            </div>
            <p className="section-copy">
              The fractional marketing director includes the Lead System and
              the lead leak audit. Without the director, it&apos;s a setup fee
              plus a monthly fee.
            </p>
          </div>
          <div className="engagement-compare leak-next__options reveal">
            <article className="engagement-compare__card">
              <p className="engagement-compare__label">Lead System on its own</p>
              <p className="engagement-compare__value">
                Setup
                <span className="engagement-compare__period"> + monthly</span>
              </p>
              <p className="engagement-compare__note">
                A one-time setup fee plus a monthly fee, scoped on a call to
                how many sources, forms, and ad accounts you run. Tools are
                billed to you at cost.
              </p>
              <BookCallLink className="leak-next__link">
                Book a scoping call
                <Arrow />
              </BookCallLink>
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
                The Lead System and the {formatUsd(AUDIT_FEE)} lead leak audit
                are included, plus the automations that act on what it finds
                and a director who sees every fix through.
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
              <h2 className="section-heading">What people usually ask.</h2>
            </div>
            <p className="section-copy">
              Setup cost, who owns the accounts, what happens when something
              breaks, and how this differs from the report your agency sends.
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
