import { DIRECTOR_MONTHLY, formatUsd } from "@/lib/pricing";

export const questions = [
  {
    title: "How many leads were real?",
    copy: "Platforms count robocalls and repeat callers.",
  },
  {
    title: "What did each lead cost?",
    copy: "Spend is in four places. Leads are in one.",
  },
  {
    title: "Which channel books jobs?",
    copy: "Form leads arrive without a source.",
  },
  {
    title: "Is each vendor earning its fee?",
    copy: "Every agency grades its own homework.",
  },
];

export const steps = [
  {
    title: "Build",
    copy: "This is the hard part, and we do all of it. A tracking number for each source, hidden form fields that carry the source into your CRM, analytics key events verified end to end, booked jobs sent back to Google Ads, and your CRM connected to the dashboard.",
  },
  {
    title: "Blend",
    copy: "Our attribution model matches every call, form, and CRM record, removes spam and duplicates, and gives each lead one source and one cost. Every vendor gets measured the same way, on the same numbers.",
  },
  {
    title: "Report",
    copy: "The dashboard stays current, a scorecard lands each month, and once a quarter we walk through it with you. Eight daily checks keep the tracking underneath it from quietly breaking.",
  },
];

type VendorRow = {
  vendor: string;
  covers: string;
  reported: number;
  verified: number;
  cplReported: string;
  cplVerified: string;
};

/* Sample data: Lakeshore Roofing (fictional), October. Vendor figures reconcile
   with teaserSources; the SEO agency covers the Business Profile and organic. */

export const vendorRows: VendorRow[] = [
  {
    vendor: "Google Ads agency",
    covers: "Google Ads",
    reported: 120,
    verified: 96,
    cplReported: "$40",
    cplVerified: "$50",
  },
  {
    vendor: "Local Services Ads",
    covers: "Run in-house",
    reported: 83,
    verified: 74,
    cplReported: "$46",
    cplVerified: "$51",
  },
  {
    vendor: "SEO agency",
    covers: "Business Profile & organic",
    reported: 214,
    verified: 156,
    cplReported: "$8",
    cplVerified: "$12",
  },
];

export const vendorReportedTotal = vendorRows.reduce((sum, row) => sum + row.reported, 0);

export const vendorVerifiedTotal = vendorRows.reduce((sum, row) => sum + row.verified, 0);

export const vendorBarMax = Math.max(...vendorRows.map((row) => row.reported));

export const stackPoints = [
  {
    title: "Works with what you have",
    copy: "Your CRM, ad accounts, analytics, and Business Profile stay as they are. We connect to them.",
  },
  {
    title: "Custom to your business",
    copy: "Your sources, your vendors, and what counts as a booked job are set up for you. No template.",
  },
  {
    title: "Visibility you can act on",
    copy: "See which sources and vendors book jobs, and move budget toward them.",
  },
  {
    title: "Fewer leads slip through",
    copy: "Broken forms and tracking are caught within a day, so leads keep reaching your team.",
  },
];

export const teaserFeatures = [
  { title: "Real lead counts", copy: "Spam and duplicates out." },
  { title: "Cost per lead and booked job", copy: "For every source and campaign." },
  { title: "Vendor scorecard", copy: "Reported vs. verified, side by side." },
  { title: "Daily system checks", copy: "Broken tracking caught within a day." },
];

export const teaserTabs = ["Overview", "Budget & vendors", "Leads", "System health"];

export const teaserKpis = [
  { label: "Real leads", value: "351", change: "+9% vs. Sep" },
  { label: "Booked jobs", value: "168", change: "+13% vs. Sep" },
  { label: "Cost per lead", value: "$51", change: "Paid sources" },
  { label: "Cost per booked job", value: "$108", change: "−10% vs. Sep" },
];

export const teaserSources = [
  { source: "Business Profile", leads: 98, booked: 46, cpb: "—" },
  { source: "Google Ads", leads: 96, booked: 42, cpb: "$115" },
  { source: "Local Services Ads", leads: 74, booked: 38, cpb: "$100" },
  { source: "Organic & referrals", leads: 83, booked: 42, cpb: "—" },
];

export const faqs = [
  {
    question: "Do we have to switch CRMs or software?",
    answer:
      "No. It's built around the CRM, phone line, forms, and ad accounts you already use. We connect to them and run call tracking and the dashboard on our side. Your team keeps working the way it does now.",
  },
  {
    question: "Isn't this just analytics and call tracking?",
    answer:
      "No. Analytics, call tracking, your ad accounts, and your CRM are the inputs. On their own, each one counts leads its own way, and none of them agree. The dashboard, the attribution model, and the way the data is matched and blended are ours. That's what turns four conflicting reports into one lead count, one cost per lead, and one cost per booked job for every source and vendor.",
  },
  {
    question: "Who owns the accounts and the data?",
    answer:
      "Your analytics, ad accounts, Business Profile, domain, and CRM stay in your name, with us added as users. Call tracking, the dashboard, and the attribution model run on our side. Your accounts, and the history in them, stay with you if you ever stop working with us.",
  },
  {
    question: "How much does it cost?",
    answer: `A one-time build fee plus a monthly fee for the dashboard, reporting, and daily checks. Call tracking runs on our account, so there's no separate tool to sign up for. We scope both on the demo, based on how many sources, forms, ad accounts, and vendors you run. It also runs alongside the [fractional marketing director](/fractional-marketing-director) engagement, where a director uses these numbers to plan with you every week. Advising starts at ${formatUsd(DIRECTOR_MONTHLY)}/month.`,
  },
  {
    question: "Will call tracking numbers hurt my Google Business Profile?",
    answer:
      "Not when it's set up properly. On the [Google Business Profile](/google-business-profile), the tracking number goes in as the primary phone and your main number stays listed as an additional phone, so the listing still matches your other listings. On the website, a script swaps the number for visitors, so your main number stays in the page itself.",
  },
];
