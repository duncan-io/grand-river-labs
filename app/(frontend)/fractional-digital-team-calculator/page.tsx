import type { Metadata } from "next";
import { ContactSection } from "@/components/contact";
import { FractionalTeamCalculator } from "@/components/fractional-team-calculator";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";

export const metadata: Metadata = {
  title: "Fractional Digital Team vs Full-Time Calculator | Grand River Labs",
  description:
    "Compare the cost of the in-house team you would hire with a fractional digital department. Starts with a senior leader and a junior—add roles, edit salaries, and see the gap.",
};

export default function FractionalDigitalTeamCalculatorPage() {
  const turnstileSiteKey = process.env.TURNSTILE_SITE_KEY?.trim() ?? "";

  return (
    <div id="top">
      <SiteHeader />
      <main>
        <section className="section calc-board" id="calculator">
          <div className="shell">
            <header className="calc-page__intro">
              <h1 className="calc-page__headline">
                What would a hire actually cost you?
              </h1>
            </header>
            <FractionalTeamCalculator />
          </div>
        </section>

        <section className="section calc-notes">
          <div className="shell calc-notes__layout">
            <div>
              <p className="eyebrow">Assumptions</p>
              <h2 className="section-heading">How to read the numbers.</h2>
            </div>
            <div className="calc-notes__copy">
              <p>
                Figures are in US dollars. Loaded cost adds your benefits-and-tax
                percentage on top of salary. Year 1 includes recruiting and
                onboarding per hire. Three-year totals hold today&apos;s costs
                flat—no inflation, equity, or severance.
              </p>
              <p>
                This compares cost, not identical hours or output. A junior hire
                is not a digital lead. A senior hire is still one person. GR Labs
                engagements start at $1,500/month; actual scope is confirmed on a
                fit call.
              </p>
            </div>
          </div>
        </section>

        <ContactSection
          turnstileSiteKey={turnstileSiteKey}
          variant="cta"
          eyebrow="Talk through a scenario"
          heading="Want a number that matches your business?"
          copy="Bring the hire you were about to make—junior, senior, or a small team. A 30-minute fit call is enough to see whether a fractional digital department covers the work at a better cost."
          directLabel="Prefer to talk? Book a 30-minute fit call →"
          messageLabel="What hiring scenario are you weighing?"
          messagePlaceholder="A junior coordinator, a senior digital lead, a two-person team, or the fact that nobody owns this—start wherever you are."
        />
      </main>
      <SiteFooter />
    </div>
  );
}
