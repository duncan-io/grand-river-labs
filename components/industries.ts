export type IndustryItem = {
  title: string;
  copy: string;
};

export type IndustryContent = {
  slug: string;
  industry: string;
  headline: string;
  copy: string;
  /** Path under /public, e.g. `/industries/accounting.jpg` */
  image?: string;
  metaTitle: string;
  metaDescription: string;
  drainsEyebrow: string;
  drainsHeading: string;
  drainsIntro: string;
  drains: IndustryItem[];
  winsEyebrow: string;
  winsHeading: string;
  winsIntro: string;
  wins: IndustryItem[];
  howHeading: string;
  howCopy: string;
  howSteps: IndustryItem[];
};

export const industries: IndustryContent[] = [
  {
    slug: "accounting",
    industry: "Accounting & professional services",
    headline: "Give your team the week back.",
    copy: "Client documents, duplicate entry, and month-end scramble steal hours that should go to advisory work. We clear that friction so your practice runs cleaner—and your people do higher-value work.",
    image: "/industries/accounting.svg",
    metaTitle: "Accounting & Professional Services | Grand River Labs",
    metaDescription:
      "Reclaim hours every week in accounting and professional services—less retyping, cleaner client data, faster reporting, without the upheaval.",
    drainsEyebrow: "Where the week goes",
    drainsHeading: "The work behind the work.",
    drainsIntro:
      "Most firms don’t need more tools. They need fewer loops between inbox, PDFs, and the system of record.",
    drains: [
      {
        title: "Retyping client documents",
        copy: "Invoices, contracts, and statements arrive as PDFs. Someone opens them, reads them, and keys the same fields into practice software—again and again.",
      },
      {
        title: "Cleaning the same lists",
        copy: "Duplicates, messy naming, and half-filled client records. Hours disappear before anyone gets to real accounting work.",
      },
      {
        title: "Month-end in the weeds",
        copy: "Dashboards get scrolled. Spreadsheets get rebuilt. Partners ask for a simple summary and it takes half a day to produce one.",
      },
      {
        title: "SOPs nobody opens",
        copy: "The answers live in manuals and shared drives. Junior staff still ping seniors for the same questions every week.",
      },
    ],
    winsEyebrow: "What changes",
    winsHeading: "Hours off intake. Cleaner close. Clearer answers.",
    winsIntro:
      "Practical automations that fit how your firm already works—so time comes back without a new operating system.",
    wins: [
      {
        title: "Documents go in once",
        copy: "Pull structured fields from invoices and contracts into your practice tools. Cut hours per week off intake—and the typos that come with retyping.",
      },
      {
        title: "Client data that stays tidy",
        copy: "Deduplicate, categorize, and standardize records so the team stops living in cleanup mode before every engagement.",
      },
      {
        title: "Weekly summaries, not dashboard hunts",
        copy: "Turn your numbers into a short partner-ready brief. Same story you’d assemble by hand—delivered in minutes instead of an afternoon.",
      },
      {
        title: "Client-ready drafts, faster",
        copy: "Reports and letters filled from real client data. Same quality bar, a fraction of the drafting time.",
      },
    ],
    howHeading: "Change without the upheaval.",
    howCopy:
      "We map the bottlenecks in your practice, automate the repetitive steps, and refine what saves the most time. Where judgment is needed—reading messy documents, drafting, triage—automation can include AI. Where rules are enough, we keep it simple.",
    howSteps: [
      {
        title: "Discover",
        copy: "We listen to how work actually moves—from client intake to close—and find where hours disappear.",
      },
      {
        title: "Automate",
        copy: "We connect the tools you already use so documents, data, and follow-ups stop needing a human in every loop.",
      },
      {
        title: "Amplify",
        copy: "We measure time returned, tighten what matters, and help the gains compound across the firm.",
      },
    ],
  },
  {
    slug: "insurance",
    industry: "Insurance brokerages",
    headline: "Move submissions without the shuffle.",
    copy: "Certificates, renewals, and inbox triage chew through your producers’ and CSRs’ day. We remove the handoffs so coverage work moves faster—and your team spends less time chasing paper.",
    image: "/industries/insurance.svg",
    metaTitle: "Insurance Brokerages | Grand River Labs",
    metaDescription:
      "Save hours every week in insurance brokerages—faster submissions, cleaner CRM, routine questions handled, renewals without spreadsheet chase.",
    drainsEyebrow: "Where the week goes",
    drainsHeading: "Paper in. Status out. Repeat.",
    drainsIntro:
      "Brokerages live on documents and follow-ups. The time cost isn’t the work itself—it’s the rework between systems.",
    drains: [
      {
        title: "Submissions and certificates by hand",
        copy: "Applications and cert requests arrive in every format. Someone reads, retypes, and double-checks fields that should already be in the file.",
      },
      {
        title: "Renewal chase across spreadsheets",
        copy: "Who’s due, what’s missing, who was pinged last—half the week can vanish into status hunting.",
      },
      {
        title: "The same policy questions",
        copy: "Clients ask what’s covered, what’s pending, where to send something. Answers exist—finding them still takes a person every time.",
      },
      {
        title: "CRM gaps that slow producers",
        copy: "Missing fields and stale notes mean prep for every conversation starts from scratch.",
      },
    ],
    winsEyebrow: "What changes",
    winsHeading: "Less retyping. Faster renewals. Cleaner files.",
    winsIntro:
      "Automations built around how your brokerage already operates—so hours come back to producers and CSRs alike.",
    wins: [
      {
        title: "Structured intake from the paperwork",
        copy: "Pull the fields you need from applications and certificates into your system. Hours off manual entry every week—fewer transcription misses.",
      },
      {
        title: "Routine questions handled first",
        copy: "Common coverage and process asks get a solid first response. Your team only jumps in on the edge cases.",
      },
      {
        title: "Renewals you can see",
        copy: "Status without spreadsheet archaeology. Know what’s due, what’s waiting, and what needs a human—without rebuilding the list each Monday.",
      },
      {
        title: "CRM that keeps up",
        copy: "Fill gaps and keep records current so producers walk into conversations prepared—not digging.",
      },
    ],
    howHeading: "Practical steps. Real hours returned.",
    howCopy:
      "We start with your busiest loops—intake, renewals, inbox—and automate the repetitive parts. For the gray area (reading documents, triaging asks, drafting replies), automation can include AI. Everything else stays rule-based and boring on purpose.",
    howSteps: [
      {
        title: "Discover",
        copy: "We map submissions, renewals, and service work to see where time and attention leak.",
      },
      {
        title: "Automate",
        copy: "We wire your existing tools so paperwork and follow-ups move without a person in every step.",
      },
      {
        title: "Amplify",
        copy: "We track what’s faster, refine the flows, and spread the wins across the desk.",
      },
    ],
  },
  {
    slug: "property-management",
    industry: "Property management",
    headline: "Fewer handoffs between inbox, docs, and your system.",
    copy: "Leases, applications, and tenant messages pile up faster than anyone can process by hand. We clear the bottlenecks so your team spends less time retyping—and more time keeping properties running.",
    image: "/industries/property-management.svg",
    metaTitle: "Property Management | Grand River Labs",
    metaDescription:
      "Reclaim hours in property management—faster lease intake, first responses on common tenant asks, cleaner records, clearer weekly ops snapshots.",
    drainsEyebrow: "Where the week goes",
    drainsHeading: "Every unit has a paper trail.",
    drainsIntro:
      "The day fills with documents and messages that all need to land in the right place—usually after someone copies them there.",
    drains: [
      {
        title: "Leases and applications by retype",
        copy: "PDFs arrive. Fields get keyed into the system of record. The same intake loop runs for every new resident.",
      },
      {
        title: "Tenant inbox overload",
        copy: "Common asks—keys, payments, maintenance status—hit the same people every day. Edge cases wait behind the routine ones.",
      },
      {
        title: "Status chase across units",
        copy: "What’s vacant, what’s pending, what’s overdue. Managers assemble the picture from too many places.",
      },
      {
        title: "Incomplete resident and owner data",
        copy: "Missing phone numbers, messy names, stale notes. Every outreach starts with cleanup.",
      },
    ],
    winsEyebrow: "What changes",
    winsHeading: "Intake that sticks. Inbox that breathes.",
    winsIntro:
      "Automations that respect how your team already runs the portfolio—so hours return without a platform rip-and-replace.",
    wins: [
      {
        title: "Lease and application intake, once",
        copy: "Move structured details from PDFs into your system. Cut hours off onboarding each week—and keep the file accurate from day one.",
      },
      {
        title: "First response on common tenant asks",
        copy: "Routine questions get a clear answer fast. Your team handles the exceptions instead of every ping.",
      },
      {
        title: "Cleaner resident and owner records",
        copy: "Deduplicate and fill gaps so outreach and reporting don’t start with a scavenger hunt.",
      },
      {
        title: "A weekly ops snapshot",
        copy: "A short summary for managers and owners—vacancies, issues, what’s moving—without rebuilding it from dashboards every Friday.",
      },
    ],
    howHeading: "Fit the work you already do.",
    howCopy:
      "We find the loops that eat the week, automate the repetitive parts, and keep your team in control. Where reading documents or drafting replies needs judgment, automation can include AI. Where a simple rule works, we use that.",
    howSteps: [
      {
        title: "Discover",
        copy: "We walk intake, tenant service, and reporting to see where hours and handoffs pile up.",
      },
      {
        title: "Automate",
        copy: "We connect the systems you already rely on so documents and messages stop needing double entry.",
      },
      {
        title: "Amplify",
        copy: "We measure time saved, tighten the flows, and help the gains spread across the portfolio.",
      },
    ],
  },
  {
    slug: "home-services",
    industry: "Home services",
    headline: "Win the job. Stop living in the inbox.",
    copy: "For roofing, decking, and painting crews, the money is on the jobsite—not in estimate follow-up, CRM updates, and proposal rewriting. We give owners and office staff hours back every week.",
    image: "/industries/home-services.svg",
    metaTitle: "Home Services — Roofing, Decking & Painting | Grand River Labs",
    metaDescription:
      "Save hours every week in roofing, decking, and painting—faster estimates, CRM that updates itself, lead triage, and a clear weekly pipeline view.",
    drainsEyebrow: "Where the week goes",
    drainsHeading: "The office work that steals the day.",
    drainsIntro:
      "Crews can install. The time drain is everything around the install—notes, photos, follow-ups, and “just checking in” emails.",
    drains: [
      {
        title: "Estimate and follow-up lag",
        copy: "Quotes sit half-finished. Homeowners go quiet. Someone spends the evening chasing what should have gone out same day.",
      },
      {
        title: "Notes and photos never make the CRM",
        copy: "Site details live in phones and memory. The office rebuilds the story later—or loses it.",
      },
      {
        title: "Scheduling ping-pong",
        copy: "Back-and-forth texts and emails to lock a date. Hours of coordination for work that should take minutes.",
      },
      {
        title: "Proposal rewrite every time",
        copy: "Same scope language, same exclusions, same structure—rebuilt from scratch for every roof, deck, or paint job.",
      },
    ],
    winsEyebrow: "What changes",
    winsHeading: "Same-day proposals. A CRM that keeps up. A quieter inbox.",
    winsIntro:
      "Built for owner-led roofing, decking, and painting businesses—so the office stops being the bottleneck between lead and job.",
    wins: [
      {
        title: "Job notes that update the record",
        copy: "Turn photos and site notes into CRM updates without a second pass at the desk. Hours back each week for owners and office staff.",
      },
      {
        title: "Estimates and proposals, faster",
        copy: "Draft from your real scopes and pricing patterns. Get proposals out same day instead of end of week—without lowering the quality bar.",
      },
      {
        title: "Inbound leads triaged",
        copy: "Routine inquiries get a clear first response. Hot jobs rise to the top. Your team stops sorting the same email pile by hand.",
      },
      {
        title: "A weekly pipeline you can trust",
        copy: "What’s quoted, what’s booked, what’s waiting on the homeowner—without living in the inbox to know.",
      },
    ],
    howHeading: "Keep the crew. Clear the clutter.",
    howCopy:
      "We start with how your office and field already hand off work, then remove the busywork. For drafting proposals, reading messy notes, or sorting leads, automation can include AI. For scheduling rules and status updates, we keep it straightforward.",
    howSteps: [
      {
        title: "Discover",
        copy: "We map lead-to-job flow for roofing, decking, and painting—and find where hours disappear in the office.",
      },
      {
        title: "Automate",
        copy: "We connect the tools you already use so estimates, CRM, and follow-ups stop needing double work.",
      },
      {
        title: "Amplify",
        copy: "We measure time returned, refine what wins jobs faster, and help the gains stick as you grow.",
      },
    ],
  },
];

export function getIndustry(slug: string): IndustryContent | undefined {
  return industries.find((item) => item.slug === slug);
}
