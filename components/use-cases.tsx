import { BOOK_CALL_HREF } from "@/lib/site";
import { Arrow } from "./site-header";

const useCases = [
  {
    number: "01",
    title: "Document Extraction & Parsing",
    copy: "AI reads PDFs, contracts, and invoices, extracts the structured data you need, and pushes it into your CRM, ERP, or database—no retyping.",
  },
  {
    number: "02",
    title: "Data Cleaning & Organization",
    copy: "Duplicate detection, categorization, and format standardization. If your team spends hours cleaning things up, this is a massive unlock.",
  },
  {
    number: "03",
    title: "Workflow Automation + AI Reasoning",
    copy: "Traditional automation handles rigid rules. AI handles the gray area. Combine LLM decision-making with triggers in n8n, Make, or Zapier so operations start running themselves.",
  },
  {
    number: "04",
    title: "Knowledge Agents",
    copy: "Your company sits on years of SOPs, manuals, and docs nobody reads. Agents search, summarize, and answer questions across all of it—instantly.",
  },
  {
    number: "05",
    title: "Customer Support",
    copy: "AI support agents handle a large share of inquiries with the same inputs every time: FAQs, policies, product data, and past tickets. Humans only touch the edge cases.",
  },
  {
    number: "06",
    title: "Data Enrichment & Research",
    copy: "Pull missing fields, categorize leads, and enrich CRM records with Clay or custom agents. Removes hours of manual research from sales and ops.",
  },
  {
    number: "07",
    title: "Reporting & Insight Generation",
    copy: "Instead of scrolling dashboards, AI reads your data, spots patterns, and generates weekly executive summaries—like adding an analyst to the team.",
  },
  {
    number: "08",
    title: "Document Generation",
    copy: "Reports, product briefs, training materials. AI fills the structure using your real data. Same quality, fraction of the time.",
  },
  {
    number: "09",
    title: "Sales Team Agents",
    copy: "Meeting prep, CRM auto-updates, and proposal generation. Agents that save hours per rep each week and cut proposal time dramatically.",
  },
];

export function UseCasesSection() {
  return (
    <section className="section use-cases" id="use-cases">
      <div className="shell">
        <div className="use-cases__top reveal">
          <div>
            <p className="eyebrow">Where AI pays off</p>
            <h2 className="section-heading">Common use cases</h2>
          </div>
          <p className="section-copy">
            Practical places we put AI to work—removing friction from documents,
            data, support, and sales so your team can focus on what matters.
          </p>
        </div>

        <div className="use-cases-list reveal">
          {useCases.map((item) => (
            <article className="use-case" key={item.number}>
              <span className="use-case__number">{item.number}</span>
              <h3>{item.title}</h3>
              <p>{item.copy}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export function UseCasesCta() {
  return (
    <section className="section use-cases-cta">
      <div className="shell use-cases-cta__content reveal">
        <div>
          <p className="eyebrow">Ready when you are</p>
          <h2 className="section-heading">See where this fits your business.</h2>
        </div>
        <div className="use-cases-cta__actions">
          <p className="section-copy">
            Tell us about a process that eats time. We&apos;ll map a practical
            path from today&apos;s bottleneck to a working automation.
          </p>
          <div className="use-cases-cta__buttons">
            <a className="button button-primary" href="/#contact">
              Get in touch
              <Arrow />
            </a>
            <a
              className="button button-secondary"
              href={BOOK_CALL_HREF}
              target="_blank"
              rel="noopener noreferrer"
            >
              Book a call
              <Arrow />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
