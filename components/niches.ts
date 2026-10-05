export type NichePoint = {
  title: string;
  copy: string;
};

export type NicheCard = {
  icon: string;
  label: string;
  title: string;
  copy: string;
};

export type NicheContent = {
  slug: string;
  tileName: string;
  tileBlurb: string;
  /** Path under /public, e.g. `/niches/roofing.svg` */
  image?: string;
  metaTitle: string;
  metaDescription: string;
  hero: {
    eyebrow: string;
    headline: string;
    copy: string;
    primaryLabel: string;
    secondaryLabel: string;
    secondaryHref: string;
    cueLabel: string;
  };
  gap: {
    eyebrow: string;
    heading: string;
    copy: string;
    sceneLabels: readonly [string, string, string, string];
    items: NichePoint[];
    callout: string;
  };
  engine: {
    eyebrow: string;
    heading: string;
    copy: string;
    sceneNodes: readonly [string, string, string, string];
    cards: NicheCard[];
    also: { label: string; copy: string };
  };
  peace: {
    eyebrow: string;
    heading: string;
    copy: string;
    paths: NichePoint[];
    promisesLead: string;
    promises: string[];
  };
  faq: {
    eyebrow: string;
    heading: string;
    items: { question: string; answer: string }[];
  };
  cta: {
    eyebrow: string;
    heading: string;
    copy: string;
    directLabel: string;
    messageLabel: string;
    messagePlaceholder: string;
  };
};

const promises = [
  "No long contracts",
  "No junior account managers",
  "The whole engine in one place",
  "No vanity metrics",
];

export const niches: NicheContent[] = [
  {
    slug: "roofing",
    tileName: "Roofing companies",
    tileBlurb: "Fractional digital marketing for roofers: a lead engine you own.",
    image: "/niches/roofing.svg",
    metaTitle: "Roofing Marketing for Roofing Companies | Grand River Labs",
    metaDescription:
      "Fractional roofing marketing: one experienced owner for your whole lead engine, covering lead routing, LSA, ads, website, and SEO. Roofing leads you own, not share.",
    hero: {
      eyebrow: "Fractional digital marketing for roofing companies",
      headline: "Roofing marketing that builds a lead engine you own.",
      copy: "The leads you buy get sold to 3–5 other roofers at the same time, and a lot of them are spam. A lead engine you own—your site, your Local Services Ads, your ad accounts, your routing—is run by one experienced person, not a junior account manager.",
      primaryLabel: "Talk through your lead flow",
      secondaryLabel: "See how it works",
      secondaryHref: "#lead-flow",
      cueLabel: "Where leads leak",
    },
    gap: {
      eyebrow: "The lead gap",
      heading: "More leads don't help if they leak.",
      copy: "After a storm, a homeowner asks three roofers for a quote. Every hour you wait, the job drifts toward someone else. Before we chase more roofing leads, the ones you already get have to land somewhere.",
      sceneLabels: ["Shared leads", "Spam", "Missed calls", "Slow reply"],
      items: [
        {
          title: "Shared before you see them",
          copy: "Bought leads get sold to 3–5 other roofers at the same time. You race four competitors to a homeowner who's already had three calls that morning.",
        },
        {
          title: "Spam dressed up as demand",
          copy: "A hundred form fills that go nowhere are worse than twenty real homeowners. A lot of what shows up as a lead was never a job.",
        },
        {
          title: "A slow reply loses the storm",
          copy: "Storm weeks don't wait. The roofer who gets back while the homeowner is still in the driveway is the one who gets the inspection.",
        },
        {
          title: "Missed calls, no next step",
          copy: "The estimator is on a roof. The office inbox isn't checked. The lead sits until the busiest week of the year is already over.",
        },
      ],
      callout: "More leads don't fix a leaky bucket. We fix the bucket first.",
    },
    engine: {
      eyebrow: "The lead engine",
      heading: "One owner for every channel that brings work in.",
      copy: "Your site, Local Services Ads, the ad spend you already make, and the routing between them. Not five vendors, and not a monthly report full of impressions.",
      sceneNodes: ["LSA", "Google", "Meta", "Website"],
      cards: [
        {
          icon: "Route",
          label: "Route",
          title: "Lead routing",
          copy: "Calls, forms, and LSA messages go to the person who can act, by text, email, or CRM. [A missed call gets an automatic text back](/marketing-automation), so every lead still gets a next step.",
        },
        {
          icon: "Rank",
          label: "Rank",
          title: "Local Services Ads",
          copy: "They sit at the top of Google. You pay only for leads that contact you, not for clicks, and the lead is yours—not shared with four other roofers. Leads that don't fit can be disputed.",
        },
        {
          icon: "Advise",
          label: "Advise",
          title: "Google Ads",
          copy: "Roofers pay $150 or more for a single click. We audit the spend you already make—search terms, wasted clicks, geo targeting—and tell you what to cut. We advise. We don't sell you a bigger budget.",
        },
        {
          icon: "Target",
          label: "Target",
          title: "Meta Ads",
          copy: "After hail or a storm, campaigns go live for the zip codes that got hit, including the streets your crews are knocking. Spend flexes with demand, so you're not paying peak prices in a dead month.",
        },
        {
          icon: "Site",
          label: "Convert",
          title: "Website",
          copy: "Storm traffic hits on a phone in the driveway. [The site stays fast](/website-strategy), the call button stays one tap away, and every quote form routes to a person. Real before-and-after photos do more than a headline.",
        },
        {
          icon: "Compound",
          label: "Compound",
          title: "Roofing SEO",
          copy: "Ads stop when you stop paying. Service pages, reviews, and your Google Business Profile keep bringing leads for years. SEO is slow—months, not weeks—so it's one part of the plan, not the whole plan.",
        },
      ],
      also: {
        label: "Referrals",
        copy: "71% of roofers rely on word-of-mouth, and those are often the best leads you get. We don't replace them. [Review and referral requests go out automatically](/automation) after a job closes, when the homeowner is happiest. LSA, ads, and SEO cover the weeks referrals don't.",
      },
    },
    peace: {
      eyebrow: "Why fractional",
      heading: "One experienced owner for your whole lead engine.",
      copy: "A typical roofing marketing agency hands you to a junior account manager, locks you into a long contract, and sends a monthly report full of impressions. [You need one person who owns the whole thing](/fractional-digital-department) and answers for the calls.",
      paths: [
        {
          title: "Living on referrals?",
          copy: "A neighbor hears your name, then Googles you. Your profile, reviews, and site finish the job—and owned channels fill the weeks referrals don't.",
        },
        {
          title: "Buying shared leads?",
          copy: "Shared leads look cheaper until you're racing 3–5 other roofers for the same homeowner. With LSA you set the budget, you only pay for contacted leads, and the lead is yours.",
        },
      ],
      promisesLead: "What stays true either way.",
      promises,
    },
    faq: {
      eyebrow: "Questions",
      heading: "What roofers usually ask.",
      items: [
        {
          question: "How much should I pay for roofing leads?",
          answer:
            "It depends on your market and the season, so be wary of anyone quoting a flat number. The better question is what a lead is worth to you. Shared leads look cheaper, but you're competing with 3–5 other roofers for the same homeowner. With LSA you pay only for leads that contact you, and they're yours alone. We'll compare what you pay now against what actually turns into jobs.",
        },
        {
          question: "Is SEO still worth it for roofers?",
          answer:
            "Yes, if you treat it as a long game. Organic search keeps producing leads after you stop paying for it, which ads can't do. But it takes months to build, so it works best alongside LSA and ads, not instead of them.",
        },
        {
          question: "Do you run our ads, or just advise?",
          answer:
            "We advise on the Google and Meta spend you already make: auditing it, setting direction, and telling you what to cut. If you need hands-on campaign management, we'll work with your current person or help you find the right one. We're not here to sell you a bigger ad budget.",
        },
        {
          question: "How is this different from a roofing marketing agency?",
          answer:
            "An agency sells you services. We own the outcome: one experienced person responsible for your site, LSA, ad advisory, routing, and SEO working together. No long contracts, no junior account managers, and [reporting on leads and calls instead of vanity metrics](/analytics).",
        },
      ],
    },
    cta: {
      eyebrow: "Talk lead flow",
      heading: "Let's look at where your leads go.",
      copy: "Tell us where your leads come from today and what happens after they come in. In 30 minutes, we'll show you where leads are leaking and whether we're the right fit. No pitch deck, no pressure.",
      directLabel: "Prefer to talk? Book a 30-minute call →",
      messageLabel: "Where do your leads come from today?",
      messagePlaceholder:
        "Referrals, a lead vendor, LSA, door knocking, storm season only. Start wherever you are.",
    },
  },
  {
    slug: "contractors",
    tileName: "Contractors",
    tileBlurb: "Fractional digital marketing for contractors: a lead engine you own.",
    image: "/niches/contractors.svg",
    metaTitle: "Contractor Marketing for Contractors | Grand River Labs",
    metaDescription:
      "Fractional contractor marketing: one experienced owner for your whole lead engine, covering lead routing, LSA, ads, and site management. Contractor leads you own.",
    hero: {
      eyebrow: "Fractional digital marketing for contractors",
      headline: "Contractor marketing that fixes the leaks, not just the ads.",
      copy: "A homeowner fills out a form, and nobody calls back for an hour. By then they've booked the contractor who picked up. We fix the whole lead engine—routing, Local Services Ads, the spend you already make, and the site you already have—with one experienced person, not a junior account manager.",
      primaryLabel: "Talk through your lead flow",
      secondaryLabel: "See how it works",
      secondaryHref: "#lead-flow",
      cueLabel: "Where leads leak",
    },
    gap: {
      eyebrow: "The lead gap",
      heading: "The ads aren't usually the leak.",
      copy: "You can waste thousands on marketing every month and still not know which part is broken. Most of the time it's bad leads, missed calls, and a slow reply—not the campaign itself.",
      sceneLabels: ["Shared leads", "Tire-kickers", "Missed calls", "Slow reply"],
      items: [
        {
          title: "Shared with a pile of contractors",
          copy: "Lead services sell the same homeowner to several contractors. You pay, then race to call first.",
        },
        {
          title: "Tire-kickers in the pipeline",
          copy: "A full pipeline of price shoppers is worse than a short list of people ready to hire. Unqualified leads still clog the day.",
        },
        {
          title: "The five-minute rule",
          copy: "The contractor who responds while the homeowner is still thinking about the project usually gets the conversation. After that, you're calling someone who already booked.",
        },
        {
          title: "Missed calls on the jobsite",
          copy: "You're on a job. The form lands in an inbox nobody checks until Friday. By then the lead is gone.",
        },
      ],
      callout: "Speed doesn't matter if the lead was never a job. We fix both.",
    },
    engine: {
      eyebrow: "The lead engine",
      heading: "One owner for routing, ads, and the site you already have.",
      copy: "We don't sell you a retainer to spend more. We own how leads get in, where they go, and [whether the money you already spend is working](/analytics).",
      sceneNodes: ["LSA", "Google", "Meta", "Website"],
      cards: [
        {
          icon: "Route",
          label: "Route",
          title: "Lead routing",
          copy: "Get back within five minutes, even when you're on a job. Calls, forms, and LSA messages go to you, the estimator, or the office—and a missed call gets an automatic text back.",
        },
        {
          icon: "Rank",
          label: "Rank",
          title: "Local Services Ads",
          copy: "You pay for leads that contact you, not for clicks, and the lead is yours. Leads that don't fit can be disputed. For most contractors, that's the closest thing to the free leads they're hunting for.",
        },
        {
          icon: "Advise",
          label: "Advise",
          title: "Google Ads",
          copy: "Contractors pay $50 or more per click. We audit wasted spend and point targeting at the zip codes you actually work, not a vague circle around the shop. We advise on the spend you already make.",
        },
        {
          icon: "Target",
          label: "Target",
          title: "Meta Ads",
          copy: "Campaigns follow the neighborhoods you want the next job in. If you don't cross a certain highway, the ads shouldn't either. Budgets flex with the season, so you're not buying leads you can't get to.",
        },
        {
          icon: "Site",
          label: "Convert",
          title: "Website",
          copy: "[We manage the site you already have.](/website-strategy) Agencies sell redesigns. We keep it fast on a phone, keep quote forms working, and make sure every request routes to a person.",
        },
        {
          icon: "Compound",
          label: "Compound",
          title: "SEO for contractors",
          copy: "Ads stop when you stop paying. Your Google Business Profile, service pages, and reviews keep bringing leads after the budget is off. SEO is slow—months, not weeks—so it's one part of the plan, not the whole plan.",
        },
      ],
      also: {
        label: "Referrals",
        copy: "Most contractors still grow on word-of-mouth, and those are often the best jobs. [Review and referral requests go out after a job closes](/automation), when the customer is happiest. LSA, ads, and SEO cover the weeks referrals don't.",
      },
    },
    peace: {
      eyebrow: "Why fractional",
      heading: "One experienced owner for your whole lead engine.",
      copy: "A typical agency hands you to a junior account manager, locks you into a long contract, and sends a report full of impressions. Up to 40% of the marketing budget can disappear into that overhead.",
      paths: [
        {
          title: "Living on referrals?",
          copy: "Someone hears your name, then looks you up. Your profile, reviews, and site finish the job, and owned channels cover the weeks referrals don't.",
        },
        {
          title: "Buying shared leads?",
          copy: "Shared contractor leads look cheaper until you're racing other contractors for the same homeowner. With LSA you pay only for leads that contact you, and they're yours alone.",
        },
      ],
      promisesLead: "What you work with instead.",
      promises,
    },
    faq: {
      eyebrow: "Questions",
      heading: "What contractors usually ask.",
      items: [
        {
          question: "How much should I pay for contractor leads?",
          answer:
            "It depends on your market and the season, so be wary of a flat number. The better question is what a lead is worth if it turns into a job. Shared contractor leads services look cheaper until you're racing other contractors for the same homeowner. With LSA you pay only for leads that contact you, and they're yours alone. We'll compare what you pay now against what actually turns into estimates.",
        },
        {
          question: "What is the 5 minute rule for leads?",
          answer:
            "The contractor who responds first usually gets the conversation. The rule is simple: get back to a new lead within five minutes, while the homeowner is still on the decision. After that, you're often calling someone who already booked the next company. [Routing and a missed-call text](/marketing-automation) exist so the reply still goes out when you're on a job.",
        },
        {
          question: "Do you run our ads, or just advise?",
          answer:
            "We advise on the Google and Meta spend you already make: auditing it, setting the service area, and telling you what to cut. If you need hands-on campaign management, we'll work with your current person or help you find the right one. We're not here to sell you a bigger ad budget.",
        },
        {
          question: "How is this different from a marketing agency?",
          answer:
            "An agency sells you services. [Fractional contractor marketing](/fractional-digital-department) means one experienced person responsible for routing, LSA, ad advisory, site management, and SEO working together. No long contracts, no junior account managers, and reporting on leads and calls instead of vanity metrics.",
        },
      ],
    },
    cta: {
      eyebrow: "Talk lead flow",
      heading: "Let's look at where your leads go.",
      copy: "Tell us where your leads come from today and what happens after they come in. In 30 minutes, we'll show you where leads are leaking and whether we're the right fit. No pitch deck, no pressure.",
      directLabel: "Prefer to talk? Book a 30-minute call →",
      messageLabel: "Where do your leads come from today?",
      messagePlaceholder:
        "Referrals, Google Ads, a lead service, LSA, or the calls you miss on the jobsite. Start wherever you are.",
    },
  },
];

export function getNiche(slug: string): NicheContent | undefined {
  return niches.find((item) => item.slug === slug);
}
