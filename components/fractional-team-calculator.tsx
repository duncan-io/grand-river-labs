"use client";

import { useMemo, useState } from "react";
import { BOOK_CALL_HREF } from "@/lib/site";
import {
  DEFAULT_ASSUMPTIONS,
  DEFAULT_FRACTIONAL_MONTHLY,
  FRACTIONAL_MONTHLY_PER_PERSON,
  MAX_FRACTIONAL_MONTHLY,
  MAX_ROLE_QUANTITY,
  MAX_SALARY,
  MIN_FRACTIONAL_MONTHLY,
  ROLE_CATALOG,
  SENIORITY_LABELS,
  compareCalculator,
  createRole,
  defaultTeamRoles,
  formatPercent,
  formatSignedUsd,
  formatUsd,
  sanitizeNumber,
  suggestedFractionalMonthly,
  type CalculatorAssumptions,
  type Seniority,
  type TeamRole,
} from "@/lib/fractional-team-calculator";
import { FractionalRangeCurve } from "./fractional-range-curve";
import { Arrow } from "./site-header";

function readNumber(value: string): number {
  if (value.trim() === "") return 0;
  return Number(value);
}

export function FractionalTeamCalculator() {
  const [roles, setRoles] = useState<TeamRole[]>(() => defaultTeamRoles());
  const [assumptions, setAssumptions] = useState<CalculatorAssumptions>(
    () => ({ ...DEFAULT_ASSUMPTIONS }),
  );
  const [fractionalMonthly, setFractionalMonthly] = useState(
    DEFAULT_FRACTIONAL_MONTHLY,
  );
  const [addRoleId, setAddRoleId] = useState(ROLE_CATALOG[0].id);

  const comparison = useMemo(
    () =>
      compareCalculator({
        roles,
        assumptions,
        fractionalMonthly,
      }),
    [roles, assumptions, fractionalMonthly],
  );

  const cheaper = comparison.year1Delta > 0;

  function applyRoles(nextRoles: TeamRole[], syncInvestment = false) {
    setRoles(nextRoles);
    if (syncInvestment) {
      setFractionalMonthly(suggestedFractionalMonthly(nextRoles));
    }
  }

  function updateRole(instanceId: string, patch: Partial<TeamRole>) {
    const nextRoles = roles.map((role) =>
      role.instanceId === instanceId ? { ...role, ...patch } : role,
    );
    const teamChanged =
      patch.seniority !== undefined || patch.quantity !== undefined;
    applyRoles(nextRoles, teamChanged);
  }

  function removeRole(instanceId: string) {
    applyRoles(
      roles.filter((role) => role.instanceId !== instanceId),
      true,
    );
  }

  function addRole() {
    applyRoles([...roles, createRole(addRoleId)], true);
  }

  function resetTeam() {
    const nextRoles = defaultTeamRoles();
    setAssumptions({ ...DEFAULT_ASSUMPTIONS });
    applyRoles(nextRoles, true);
  }

  return (
    <>
      <div className="calc-layout">
          <div className="calc-inputs reveal">
            <section className="calc-panel" aria-labelledby="calc-fulltime-heading">
              <div className="calc-panel__header">
                <p className="calc-panel__kicker">Full-time</p>
                <h3 id="calc-fulltime-heading">Custom team</h3>
                <p>
                  Add or remove roles to match the in-house team you would hire.
                </p>
              </div>

              <ul className="calc-roles">
                {roles.length === 0 ? (
                  <li className="calc-roles__empty">
                    No in-house roles. Add a hire, or compare fractional with
                    nobody owning the work.
                  </li>
                ) : (
                  roles.map((role, index) => (
                    <li className="calc-role" key={role.instanceId}>
                      <div className="calc-role__top">
                        <p className="calc-role__title">{role.title}</p>
                        <button
                          type="button"
                          className="calc-role__remove"
                          aria-label={`Remove ${role.title}`}
                          onClick={() => removeRole(role.instanceId)}
                        >
                          Remove
                        </button>
                      </div>
                      <div className="calc-role__fields">
                        <label className="calc-field">
                          <span>Seniority</span>
                          <select
                            value={role.seniority}
                            onChange={(event) =>
                              updateRole(role.instanceId, {
                                seniority: event.target.value as Seniority,
                              })
                            }
                          >
                            {(Object.keys(SENIORITY_LABELS) as Seniority[]).map(
                              (seniority) => (
                                <option value={seniority} key={seniority}>
                                  {SENIORITY_LABELS[seniority]}
                                </option>
                              ),
                            )}
                          </select>
                        </label>
                        <label className="calc-field">
                          <span>People</span>
                          <input
                            type="number"
                            inputMode="numeric"
                            min={0}
                            max={MAX_ROLE_QUANTITY}
                            step={1}
                            value={role.quantity}
                            aria-label={`${role.title} headcount`}
                            onChange={(event) =>
                              updateRole(role.instanceId, {
                                quantity: sanitizeNumber(
                                  readNumber(event.target.value),
                                  0,
                                  MAX_ROLE_QUANTITY,
                                ),
                              })
                            }
                          />
                        </label>
                        <label className="calc-field">
                          <span>Salary (USD)</span>
                          <input
                            type="number"
                            inputMode="numeric"
                            min={0}
                            max={MAX_SALARY}
                            step={1000}
                            value={role.salary}
                            aria-label={`${role.title} annual salary in US dollars`}
                            onChange={(event) =>
                              updateRole(role.instanceId, {
                                salary: sanitizeNumber(
                                  readNumber(event.target.value),
                                  0,
                                  MAX_SALARY,
                                ),
                              })
                            }
                          />
                        </label>
                      </div>
                      <p className="calc-role__loaded">
                        Loaded cost{" "}
                        {formatUsd(
                          role.salary * role.quantity * (1 + assumptions.burdenRate),
                        )}
                        /yr
                        <span className="visually-hidden">
                          {` Role ${index + 1}`}
                        </span>
                      </p>
                    </li>
                  ))
                )}
              </ul>

              <div className="calc-add">
                <label className="calc-field calc-add__field">
                  <span>Add a role</span>
                  <select
                    value={addRoleId}
                    onChange={(event) => setAddRoleId(event.target.value)}
                  >
                    {ROLE_CATALOG.map((item) => (
                      <option value={item.id} key={item.id}>
                        {item.title}
                      </option>
                    ))}
                  </select>
                </label>
                <button
                  type="button"
                  className="button button-secondary calc-add__button"
                  onClick={addRole}
                >
                  Add to team
                </button>
              </div>

              <details className="calc-advanced">
                <summary>Hiring overhead</summary>
                <div className="calc-advanced__fields">
                  <label className="calc-field">
                    <span>Benefits &amp; taxes</span>
                    <input
                      type="number"
                      inputMode="decimal"
                      min={0}
                      max={80}
                      step={1}
                      value={Math.round(assumptions.burdenRate * 100)}
                      aria-describedby="calc-burden-hint"
                      onChange={(event) =>
                        setAssumptions((current) => ({
                          ...current,
                          burdenRate:
                            sanitizeNumber(readNumber(event.target.value), 0, 80) /
                            100,
                        }))
                      }
                    />
                    <small id="calc-burden-hint">
                      Percent on top of salary (payroll taxes, benefits, insurance).
                    </small>
                  </label>
                  <label className="calc-field">
                    <span>Recruiting / onboarding per hire</span>
                    <input
                      type="number"
                      inputMode="numeric"
                      min={0}
                      max={100000}
                      step={500}
                      value={assumptions.recruitingPerHire}
                      onChange={(event) =>
                        setAssumptions((current) => ({
                          ...current,
                          recruitingPerHire: sanitizeNumber(
                            readNumber(event.target.value),
                            0,
                            100000,
                          ),
                        }))
                      }
                    />
                  </label>
                  <label className="calc-field">
                    <span>Tools &amp; contractors / year</span>
                    <input
                      type="number"
                      inputMode="numeric"
                      min={0}
                      max={250000}
                      step={500}
                      value={assumptions.annualToolsAndContractors}
                      onChange={(event) =>
                        setAssumptions((current) => ({
                          ...current,
                          annualToolsAndContractors: sanitizeNumber(
                            readNumber(event.target.value),
                            0,
                            250000,
                          ),
                        }))
                      }
                    />
                  </label>
                </div>
              </details>
            </section>

            <section className="calc-panel" aria-labelledby="calc-fractional-heading">
              <div className="calc-panel__header">
                <p className="calc-panel__kicker">Fractional</p>
                <h3 id="calc-fractional-heading">GR Labs engagement</h3>
                <p>
                  Defaults to {formatUsd(DEFAULT_FRACTIONAL_MONTHLY)}/month for
                  this starting team. Adding or removing people updates it by{" "}
                  {formatUsd(FRACTIONAL_MONTHLY_PER_PERSON.junior)} for juniors,{" "}
                  {formatUsd(FRACTIONAL_MONTHLY_PER_PERSON.mid)} for mid-level,
                  and {formatUsd(FRACTIONAL_MONTHLY_PER_PERSON.senior)} for
                  seniors. You can still set a different amount.
                </p>
              </div>
              <label className="calc-field calc-field--monthly">
                <span>Monthly investment (USD)</span>
                <input
                  type="number"
                  inputMode="numeric"
                  min={MIN_FRACTIONAL_MONTHLY}
                  max={MAX_FRACTIONAL_MONTHLY}
                  step={100}
                  value={fractionalMonthly}
                  onChange={(event) =>
                    setFractionalMonthly(
                      sanitizeNumber(
                        readNumber(event.target.value),
                        MIN_FRACTIONAL_MONTHLY,
                        MAX_FRACTIONAL_MONTHLY,
                      ),
                    )
                  }
                />
              </label>
              <p className="calc-panel__note">
                {formatUsd(fractionalMonthly)}/month ·{" "}
                {formatUsd(fractionalMonthly * 12)} in year 1. No recruiting
                line, no benefits load.
              </p>
            </section>

            <div className="calc-reset-row">
              <button
                type="button"
                className="button button-secondary"
                onClick={resetTeam}
              >
                Reset team
              </button>
            </div>
          </div>

          <aside className="calc-results reveal" aria-live="polite">
            <div className="calc-results__card">
              <p className="calc-results__kicker">Year 1</p>
              <p className="calc-results__delta">
                {cheaper
                  ? `${formatUsd(comparison.year1Delta)} less with fractional`
                  : comparison.year1Delta < 0
                    ? `${formatUsd(Math.abs(comparison.year1Delta))} more with fractional`
                    : "Same year-1 cost"}
              </p>
              <p className="calc-results__percent">
                {Math.round(comparison.year1Percent) === 0
                  ? "Same year-1 cost as the in-house model"
                  : `${formatPercent(comparison.year1Percent)} than the in-house model`}
              </p>

              <div className="calc-metrics">
                <div className="calc-metric">
                  <p className="calc-metric__label">Monthly</p>
                  <p>
                    <span>{formatUsd(comparison.fullTime.monthlyOngoing)}</span>
                    <span className="calc-metric__vs">vs</span>
                    <span>{formatUsd(comparison.fractional.monthlyOngoing)}</span>
                  </p>
                  <small>Full-time ongoing vs fractional</small>
                </div>
                <div className="calc-metric">
                  <p className="calc-metric__label">Year 1</p>
                  <p>
                    <span>{formatUsd(comparison.fullTime.year1)}</span>
                    <span className="calc-metric__vs">vs</span>
                    <span>{formatUsd(comparison.fractional.year1)}</span>
                  </p>
                  <small>
                    Includes {formatUsd(comparison.fullTime.recruiting)} recruiting
                    on the hire side
                  </small>
                </div>
                <div className="calc-metric">
                  <p className="calc-metric__label">3 years</p>
                  <p>
                    <span>{formatUsd(comparison.fullTime.year3)}</span>
                    <span className="calc-metric__vs">vs</span>
                    <span>{formatUsd(comparison.fractional.year3)}</span>
                  </p>
                  <small>
                    {formatSignedUsd(comparison.year3Delta)} over three years
                  </small>
                </div>
              </div>

              <a
                className="button button-primary calc-results__cta"
                href={BOOK_CALL_HREF}
                target="_blank"
                rel="noopener noreferrer"
              >
                Book a 30-minute fit call
                <Arrow />
              </a>
            </div>
          </aside>
        </div>

        <FractionalRangeCurve monthly={fractionalMonthly} />
    </>
  );
}
