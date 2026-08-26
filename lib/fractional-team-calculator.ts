export type Seniority = "junior" | "mid" | "senior";

export type RoleCatalogItem = {
  id: string;
  title: string;
  seniority: Seniority;
  salary: number;
};

export type TeamRole = {
  instanceId: string;
  catalogId: string;
  title: string;
  seniority: Seniority;
  quantity: number;
  salary: number;
};

export type CalculatorAssumptions = {
  burdenRate: number;
  recruitingPerHire: number;
  annualToolsAndContractors: number;
};

export type CostTotals = {
  headcount: number;
  annualSalaries: number;
  annualLoaded: number;
  annualTools: number;
  recruiting: number;
  monthlyOngoing: number;
  year1: number;
  year3: number;
};

export type CalculatorComparison = {
  fullTime: CostTotals;
  fractional: CostTotals;
  year1Delta: number;
  year3Delta: number;
  monthlyDelta: number;
  year1Percent: number;
};

export const MIN_FRACTIONAL_MONTHLY = 0;
export const MAX_FRACTIONAL_MONTHLY = 25000;
export const MAX_ROLE_QUANTITY = 8;
export const MAX_SALARY = 500_000;

export const SENIORITY_LABELS: Record<Seniority, string> = {
  junior: "Junior",
  mid: "Mid-level",
  senior: "Senior",
};

export const ROLE_CATALOG: RoleCatalogItem[] = [
  {
    id: "junior-coordinator",
    title: "Junior Digital Coordinator",
    seniority: "junior",
    salary: 58_000,
  },
  {
    id: "digital-manager",
    title: "Digital Manager",
    seniority: "mid",
    salary: 92_000,
  },
  {
    id: "senior-leader",
    title: "Senior Digital Leader",
    seniority: "senior",
    salary: 145_000,
  },
  {
    id: "website-specialist",
    title: "Website Specialist",
    seniority: "mid",
    salary: 85_000,
  },
  {
    id: "analytics-specialist",
    title: "Analytics Specialist",
    seniority: "mid",
    salary: 95_000,
  },
];

export const DEFAULT_TEAM_CATALOG_IDS = [
  "senior-leader",
  "junior-coordinator",
] as const;

export const DEFAULT_FRACTIONAL_MONTHLY = 2_500;

export const FRACTIONAL_MONTHLY_PER_PERSON: Record<Seniority, number> = {
  junior: 500,
  mid: 750,
  senior: 1_000,
};

export const DEFAULT_ASSUMPTIONS: CalculatorAssumptions = {
  burdenRate: 0.3,
  recruitingPerHire: 14_000,
  annualToolsAndContractors: 18_000,
};

let roleSerial = 0;

export function clamp(value: number, min: number, max: number): number {
  return Math.min(max, Math.max(min, value));
}

export function sanitizeNumber(value: number, min = 0, max = Number.MAX_SAFE_INTEGER): number {
  if (!Number.isFinite(value)) return min;
  return clamp(Math.round(value), min, max);
}

export function getCatalogItem(catalogId: string): RoleCatalogItem {
  return ROLE_CATALOG.find((item) => item.id === catalogId) ?? ROLE_CATALOG[0];
}

export function createRole(
  catalogId: string,
  overrides: Partial<Pick<TeamRole, "seniority" | "quantity" | "salary" | "title">> = {},
): TeamRole {
  const item = getCatalogItem(catalogId);
  roleSerial += 1;

  return {
    instanceId: `${item.id}-${roleSerial}`,
    catalogId: item.id,
    title: overrides.title ?? item.title,
    seniority: overrides.seniority ?? item.seniority,
    quantity: sanitizeNumber(overrides.quantity ?? 1, 0, MAX_ROLE_QUANTITY),
    salary: sanitizeNumber(overrides.salary ?? item.salary, 0, MAX_SALARY),
  };
}

export function defaultTeamRoles(): TeamRole[] {
  return DEFAULT_TEAM_CATALOG_IDS.map((catalogId) => createRole(catalogId));
}

export function personCostForRoles(
  roles: Pick<TeamRole, "seniority" | "quantity">[],
): number {
  return roles.reduce((sum, role) => {
    return (
      sum +
      FRACTIONAL_MONTHLY_PER_PERSON[role.seniority] * Math.max(0, role.quantity)
    );
  }, 0);
}

export function defaultTeamPersonCost(): number {
  return DEFAULT_TEAM_CATALOG_IDS.reduce((sum, catalogId) => {
    const item = getCatalogItem(catalogId);
    return sum + FRACTIONAL_MONTHLY_PER_PERSON[item.seniority];
  }, 0);
}

export function suggestedFractionalMonthly(roles: TeamRole[]): number {
  return sanitizeNumber(
    DEFAULT_FRACTIONAL_MONTHLY +
      personCostForRoles(roles) -
      defaultTeamPersonCost(),
    MIN_FRACTIONAL_MONTHLY,
    MAX_FRACTIONAL_MONTHLY,
  );
}

export function formatUsd(value: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(Math.round(value));
}

export function formatSignedUsd(value: number): string {
  const absolute = formatUsd(Math.abs(value));
  if (value > 0) return `−${absolute}`;
  if (value < 0) return `+${absolute}`;
  return formatUsd(0);
}

export function formatPercent(value: number): string {
  const rounded = Math.round(value);
  if (rounded > 0) return `${rounded}% less`;
  if (rounded < 0) return `${Math.abs(rounded)}% more`;
  return "same cost";
}

function headcountOf(roles: TeamRole[]): number {
  return roles.reduce((sum, role) => sum + Math.max(0, role.quantity), 0);
}

export function calculateFullTimeCost(
  roles: TeamRole[],
  assumptions: CalculatorAssumptions,
): CostTotals {
  const headcount = headcountOf(roles);
  const annualSalaries = roles.reduce(
    (sum, role) => sum + role.salary * Math.max(0, role.quantity),
    0,
  );
  const burdenRate = clamp(assumptions.burdenRate, 0, 1);
  const annualLoaded = annualSalaries * (1 + burdenRate);
  const annualTools = Math.max(0, assumptions.annualToolsAndContractors);
  const recruiting = Math.max(0, assumptions.recruitingPerHire) * headcount;
  const year1 = annualLoaded + annualTools + recruiting;
  const year3 = annualLoaded * 3 + annualTools * 3 + recruiting;

  return {
    headcount,
    annualSalaries,
    annualLoaded,
    annualTools,
    recruiting,
    monthlyOngoing: (annualLoaded + annualTools) / 12,
    year1,
    year3,
  };
}

export function calculateFractionalCost(monthly: number): CostTotals {
  const safeMonthly = Math.max(0, monthly);
  const year1 = safeMonthly * 12;

  return {
    headcount: 0,
    annualSalaries: 0,
    annualLoaded: year1,
    annualTools: 0,
    recruiting: 0,
    monthlyOngoing: safeMonthly,
    year1,
    year3: safeMonthly * 36,
  };
}

export function compareCalculator(input: {
  roles: TeamRole[];
  assumptions: CalculatorAssumptions;
  fractionalMonthly: number;
}): CalculatorComparison {
  const fullTime = calculateFullTimeCost(input.roles, input.assumptions);
  const fractional = calculateFractionalCost(input.fractionalMonthly);
  const year1Delta = fullTime.year1 - fractional.year1;
  const year3Delta = fullTime.year3 - fractional.year3;
  const monthlyDelta = fullTime.monthlyOngoing - fractional.monthlyOngoing;
  const year1Percent =
    fullTime.year1 > 0 ? (year1Delta / fullTime.year1) * 100 : 0;

  return {
    fullTime,
    fractional,
    year1Delta,
    year3Delta,
    monthlyDelta,
    year1Percent,
  };
}
